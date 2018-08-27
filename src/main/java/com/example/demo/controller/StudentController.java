package com.example.demo.controller;

//import com.example.demo.entity.StudentProperties;
import com.example.demo.entity.StudentProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 刘星星 on 2018/8/19.
 * 这个是读取application.yml文件里属性的
 */
@RestController
@RequestMapping("/demo")
public class StudentController {
    @Autowired
    private StudentProperties stu;

    @Value("${type}")
    private String type;

    @RequestMapping("/studentName")
    public String hello(){

        return type;
    }

    //遇到的坑：https://github.com/spring-projects/spring-boot/issues/4847
    //aspectj-maven-plugin中的`<sources />或者在maven-compiler-plugin中添加
    // <proc> none </proc>或者将它们加在一起，要不不能注入
    @RequestMapping("/yml")
    public String getYml(){
        return stu.getName();
    }
}
