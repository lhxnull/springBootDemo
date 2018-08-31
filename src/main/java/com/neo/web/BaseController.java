package com.neo.web;

import com.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by lhx on 2018/8/31.
 * 公用跳转页面。
 */
@Controller
public class BaseController {
    @RequestMapping("/goURL/{fileder}/{file}.do")
    public String goURL( @PathVariable("fileder") String fileder,@PathVariable("file") String file) {
        System.out.println(fileder+"----"+file);
        return  "/"+fileder+"/" + file;
    }
    @RequestMapping("/anon/{fileder}/{file}.do")
    public String goURL111( @PathVariable("fileder") String fileder,@PathVariable("file") String file) {
        System.out.println(fileder+"----"+file);
        return  "/"+fileder+"/" + file;
    }
}