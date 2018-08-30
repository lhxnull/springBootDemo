package com.neo.web;

import com.utils.vcode.Captcha;
import com.utils.vcode.GifCaptcha;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by lhx on 2018/8/30.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    /**
     * 生成验证码（Gif版本）
     *
     * @param response
     */
    @RequestMapping(value = "/getGifCode", method = RequestMethod.GET)
    public void getGifCode(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/gif");

        // gif格式动画验证码 宽，高，位数。
        Captcha captcha = new GifCaptcha(146, 42, 4);

        /**
         * 把验证码写到浏览器后才能知道验证码的数据，才能把数据装到session中，在后台会报出异常，我认为这样设计得不好。虽然不影响使用
         * @author ：ozc
         */
        ServletOutputStream out = response.getOutputStream();
        captcha.out(out);
        request.getSession().setAttribute("captcha", captcha.text().toLowerCase());


    }
}