package com.exception.controller;

import com.exception.exception.DescribeException;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 刘星星 on 2018/9/4.
 */
@Controller
public class ExceptionController implements ErrorController {

    private static final String ERROR_PATH = "/error";

    @RequestMapping(value=ERROR_PATH)
    public String handleError(){
        return "/404";
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}