package com.exception.controller;

import com.exception.exception.DescribeException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 刘星星 on 2018/9/4.
 */
@Controller
public class ExceptionController {

    @RequestMapping("/nException")
    public String nException() throws Exception {
        throw new Exception("这里有个错误异常") ;
    }


}