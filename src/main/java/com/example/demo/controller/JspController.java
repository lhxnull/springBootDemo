package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

/**
 * Created by 刘星星 on 2018/8/19.
 */
@Controller
public class JspController {
    /**
     * 因为spring boot默认模板路径：resources/templates和static下，所以
     * 如果不改application.yml配置文件则只能转发或者重定向，不能用Model返回jsp
     * @param model
     * @return
     */
//    @RequestMapping("/demo/firstJsp")
//    public String hello(Model model){
//        model.addAttribute("now", DateFormat.getDateTimeInstance().format(new Date()));
//        return "index";
//    }
    @RequestMapping("/firstJsp")
    public void hello(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("now", DateFormat.getDateTimeInstance().format(new Date()));
        request.getRequestDispatcher("/pages/index.jsp").forward(request, response);
    }
}
