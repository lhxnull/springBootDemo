package com.example.initService.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by 刘星星 on 2018/8/23.
 */
@WebServlet(urlPatterns = "/dispatchServlet/*")
public class myServlet extends baseServlet {


    public String select(HttpServletRequest req){
        String str = req.getParameter("key");
        return str;
    }

}
