//package com.example.demo.dateSourceConfig;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.apache.commons.dbcp.BasicDataSource;
//
///**
// * Created by 刘星星 on 2018/8/21.
// * 这三个类是没用jpa的普通jdbc需要map所以被注释了
// */
//@Configuration
////这个注解导入刚才增加的jdbc配置文件
//@PropertySource("classpath:jdbc.properties")
//public class DataSourceConfiguration {
//    @Value("${jdbc.driver}")
//    private String driver;
//    @Value("${jdbc.url}")
//    private String url;
//    @Value("${jdbc.username}")
//    private String username;
//    @Value("${jdbc.password}")
//    private String password;
//    @Value("${jdbc.maxActive}")
//    private int maxActive;
//    @Value("${jdbc.maxIdel}")
//    private int maxIdel;
//    @Value("${jdbc.maxWait}")
//    private long maxWait;
//
//
//    @Bean
//    public BasicDataSource dataSource(){
//        BasicDataSource dataSource = new BasicDataSource();
//        dataSource.setDriverClassName(driver);
//        dataSource.setUrl(url);
//        dataSource.setUsername(username);
//        dataSource.setPassword(password);
//        dataSource.setMaxActive(maxActive);
//        dataSource.setMaxIdle(maxIdel);
//        dataSource.setMaxWait(maxWait);
//        dataSource.setValidationQuery("SELECT 1");
//        dataSource.setTestOnBorrow(true);
//        return dataSource;
//    }
//}
