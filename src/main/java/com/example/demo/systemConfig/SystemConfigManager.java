package com.example.demo.systemConfig;

import com.neo.entity.User;
import com.neo.sevice.UserService;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 这是测试初始化时需要加载的comcode。
 * Created by lhx on 2018/9/4.
 */
@Component
public class SystemConfigManager {


    private UserService userService = ApplicationContextProvider.getBean(UserService.class);

    private SystemConfigManager(){}
    private static SystemConfigManager instance = new SystemConfigManager();
    public static SystemConfigManager getInstance() {
        return instance;
    }
    // 组织机构配置缓存
    private Map<String, String> comCodeLoadConfigMap = null;

    public void fillComeCodeConfigs(){
        User user = userService.findByUserEmail("571921459@qq.com");
        this.comCodeLoadConfigMap = new HashMap<>();
        this.comCodeLoadConfigMap.put("email",user.getUserEmail());
    }

    public Map<String, String> getComCodeLoadConfigMap() {
        return comCodeLoadConfigMap;
    }

}