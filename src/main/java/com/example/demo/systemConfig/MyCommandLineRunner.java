package com.example.demo.systemConfig;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by 刘星星 on 2018/8/23.
 * 初始化项目资源方式二
 */
@Component
public class MyCommandLineRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("*********************************");
        System.out.println("init CommandLineRunner-------------------");
        System.out.println("*********************************");
    }
}
