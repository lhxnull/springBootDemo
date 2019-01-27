package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 刘星星 on 2018/8/19.
 * @Controller表明该类内的所有方法默认返回页面路径，加了@ResponseBody的方法返回数据。

 @RestController则是相当于@Controller@ResponseBody两个注解，该类返回的都是数据，不返回页面
 */
@RestController//该注解是 @Controller 和 @ResponseBody 注解的合体版
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {
        return "Hello Spring Boot!";
    }
}
