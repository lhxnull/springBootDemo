package com.example.demo.entity;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by 刘星星 on 2018/8/19.
 * 这个是为了把application.yml的student注入进来
 */
@Component
@ConfigurationProperties(prefix = "student")
public class StudentProperties {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {

        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
