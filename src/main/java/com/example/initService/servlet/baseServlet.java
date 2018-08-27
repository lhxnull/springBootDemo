package com.example.initService.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 * Created by 刘星星 on 2018/8/23.
 */
public abstract class baseServlet extends HttpServlet {

    /**
     * 默认情况下service是根据请求类型转到doGet或者doPost方法，但是如果重写了就不会在执行doGet或者doPost方法。
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     *
     */
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String method = req.getRequestURL().
                substring(req.getRequestURL().lastIndexOf("/")+1);
        Class cls = this.getClass();
        try {
            Method met = cls.getMethod(method,HttpServletRequest.class);
            Object result = met.invoke(this,req);
            System.out.println(result);
            resp.getWriter().write(result.toString());
        }  catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
