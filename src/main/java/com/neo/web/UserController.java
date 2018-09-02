package com.neo.web;

import com.example.demo.mailDemo.service.MailService;
import com.neo.entity.User;
import com.neo.sevice.UserService;
import com.utils.DateUtil;
import com.utils.ReadPropertiesUtil;
import com.utils.StringUtils;
import com.utils.vcode.Captcha;
import com.utils.vcode.GifCaptcha;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
        Captcha captcha = new GifCaptcha(146, 42, 4);

        /**
         * 把验证码写到浏览器后才能知道验证码的数据，才能把数据装到session中，在后台会报出异常，我认为这样设计得不好。虽然不影响使用
         * @author ：lhx
         */
        ServletOutputStream out = response.getOutputStream();
        captcha.out(out);
        request.getSession().setAttribute("captcha", captcha.text().toLowerCase());
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
    public String register(@Validated User user, BindingResult bindingResult) throws Exception {

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
        userService.save(user);
        String projectUrl = ReadPropertiesUtil.readProp("projectPath");
        String url = projectUrl+"/anon/activate.do?userId=" + user.getUserId();
        mailService.sendHtmlMail(user.getUserEmail(),"激活",url);
        return "redirect:/anon/common/countDown.do";
    }

    @RequestMapping(value = "/test")
    public String test(){
        return "redirect:/anon/common/countDown.do";

    }

    /**
     * 激活
     * @param userId
     * @param
     * @return
     */
    @RequestMapping(value = "/activate.do",method = RequestMethod.GET)
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
        attr.addAttribute("content",content);
        return "redirect:/anon/common/promptPages.do";

    }

}