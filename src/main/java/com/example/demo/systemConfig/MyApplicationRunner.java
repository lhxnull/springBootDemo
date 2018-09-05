package com.example.demo.systemConfig;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * Created by 刘星星 on 2018/8/23.
 * 初始化项目资源方式一
 */

@Component
public class MyApplicationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        System.out.println("*********************************");
        System.out.println("...init resources by implements ApplicationRunner");
        System.out.println(SystemConfigManager.getInstance());
        SystemConfigManager.getInstance().fillComeCodeConfigs();
        System.out.println("*********************************");
    }
}
