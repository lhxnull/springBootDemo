package com.neo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by lhx on 2018/8/31.
 */
@Controller
public class BaseController {
    @RequestMapping("/goURL/{file}.do")
    public String goURL( @PathVariable("file") String file) {

        return  "/" + file;
    }
}