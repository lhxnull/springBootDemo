package com.neo.web;

import com.example.demo.mailDemo.service.MailService;
import com.neo.entity.User;
import com.neo.sevice.UserService;
import com.utils.*;
import com.utils.vcode.Captcha;
import com.utils.vcode.GifCaptcha;
import org.apache.catalina.Session;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/**
 * Created by lhx on 2018/8/30.
 */
@Controller
@RequestMapping("/anon")
public class UserController {
    @Resource
    private UserService userService;
    @Resource
    private MailService mailService;
    /**
     * 生成验证码（Gif版本）
     *
     * @param response
     */
    @RequestMapping(value = "/getGifCode", method = RequestMethod.GET)
    public void getGifCode(HttpServletResponse response, HttpServletRequest request) throws IOException {
        System.out.println("gifffffffffffffffffffffffffffffffffffff");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/gif");

        // gif格式动画验证码 宽，高，位数。
        GifCaptcha captcha = new GifCaptcha(146, 42, 4);

        /**
         * 把验证码写到浏览器后才能知道验证码的数据，才能把数据装到session中，在后台会报出异常，我认为这样设计得不好。虽然不影响使用
         * 已改
         * @author ：lhx
         */
        char[] rands = captcha.getMessage();
        WebUtils.setValue2Session(request,"captcha",captcha.text().toLowerCase());
        System.out.println("验证码`````````````````````````````````````````````````````");
        System.out.println(request.getSession().getAttribute("captcha"));
        System.out.println("`````````````````````````````````````````````````````");
        ServletOutputStream out = response.getOutputStream();
        captcha.out(out,rands);
    }

    /**
     *校验账户是否已经存在
     * @param userEmail
     * @param writer
     * @throws Exception
     */
    @RequestMapping(value = "/validateEmail",method = RequestMethod.POST)
    public void validateEmail(@RequestParam("userEmail") String userEmail, PrintWriter writer) throws Exception {
        User user = userService.findByUserEmail(userEmail);
        if (user != null && StringUtils.isNotBlank(user.getUserId())){
            writer.write("hasEmail");
        }else{
            writer.write("noEmail");
        }
    }

    /**
     * 注册
     * @param user
     * @param bindingResult
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public String register(@Validated User user, BindingResult bindingResult,RedirectAttributes attr) throws Exception {

        System.out.println("注册");
        //如果参数不对，就直接返回注册页面
        List<ObjectError> allErrors = bindingResult.getAllErrors();
        if (allErrors != null && allErrors.size() > 0) {
            return "redirect:/anon/pages/toRegister.do";
        }
        /**
         * 想让实体类自动的注入id,还有密码加密。。。。。
         */
        user.setUserId(UUID.randomUUID().toString());
        user.setActiState(User.ACTIVATION_UNSUCCESSFUL);
        user.setTokenExptime(new Date());
        user.setSalt(MathUtil.getRandom620(4));
        String password = new Md5Hash(user.getUserPassword(), user.getSalt(), 1).toString();
        user.setUserPassword(password);
        userService.save(user);
        String projectUrl = ReadPropertiesUtil.readProp("projectPath");
        String url = projectUrl+"/anon/activate.do?userId=" + user.getUserId();
        mailService.sendHtmlMail(user.getUserEmail(),"激活",url);
        attr.addAttribute("title","注册提示");
        attr.addAttribute("content","请到您的邮箱完成激活");
        return "redirect:/anon/common/base.do";
//        return "redirect:/anon/common/countDown.do";
    }

    /**
     * 激活
     * @param userId
     * @param
     * @return
     */
    @RequestMapping(value = "/activate.do")
    public String activate(@RequestParam("userId")String userId, RedirectAttributes attr){

        User user = userService.findOne(userId);
        String content = "";
        if(user != null){
            //得到当前时间和邮件时间对比,24小时内
            if (System.currentTimeMillis() - user.getTokenExptime().getTime() < 86400000) {
                user.setActiState(User.ACTIVATION_SUCCESSFUL);
                userService.save(user);
                content = "恭喜您成功激活账户";
            } else {
                content = "激活链接已超时，请重新注册";

                //删除记录已便用户再次注册
                userService.delete(userId);

            }
        }
        attr.addAttribute("title","激活提示");
        attr.addAttribute("content",content);
        return "redirect:/anon/common/base.do";
//        return "redirect:/anon/common/promptPages.do";

    }

    /**
     * 发送重置密码邮件
     * @param userEmail
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "forgetPassword")
//    @ResponseBody
    public String forgetPassword(String userEmail,RedirectAttributes attr) throws Exception {

        //在form表单提交时已经判断判断是否有该用户了。
        User user = null;
        if(StringUtils.isNotBlank(userEmail)){

            user = userService.findByUserEmail(userEmail);
        }
        String projectUrl = ReadPropertiesUtil.readProp("projectPath");
        String url = projectUrl+"anon/pages/resetView.do?userId=" + user.getUserId();
        mailService.sendHtmlMail(userEmail,"重置",url);
        //设置邮件发送时间、30分钟链接失效
        user.setTokenExptime(new Date());
        userService.save(user);
        attr.addAttribute("title","重置密码提示");
        attr.addAttribute("content","请到您指定的邮箱完成重置密码操作");
        return "redirect:/anon/common/base.do";

    }

    /**
     * 重置密码
     * @param user
     * @return
     */
    @RequestMapping(value = "/resetPassword")
    @ResponseBody
    public Map<String, Object> resetPassword(User user) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        if (user != null && user.getUserId() != null) {
            User user1 = userService.findOne(user.getUserId());
            //得到当前时间和邮件时间对比,24小时
            if (System.currentTimeMillis() - user1.getTokenExptime().getTime() < 86400000) {
                String password = new Md5Hash(user.getUserPassword(), user.getSalt(), 1).toString();
                user1.setUserPassword(password);
                User user2 = userService.save(user1);
                if (user2 != null){
                    resultMap.put("message", "修改成功");
                } else {
                    resultMap.put("message", "修改失败");
                }
            } else {
                resultMap.put("message", "链接已超时，请重新进行操作");

            }
            return resultMap;
        }
        return null;
    }

}