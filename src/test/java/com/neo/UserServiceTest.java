package com.neo;

import com.neo.entity.User;
import com.neo.sevice.UserService;
import com.utils.MD5Utils;
import com.utils.MathUtil;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.UUID;

/**
 * Created by 刘星星 on 2018/9/1.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void insert(){
        System.out.println(MD5Utils.md5("111111").toString());
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setUserNickname("22222");
        user.setSalt(MathUtil.getRandom620(4));
        String password = new Md5Hash("111111", user.getSalt(), 1).toString();
        user.setUserPassword(password);
        user.setUserEmail("571921459@qq.com");
        user.setActiState(0);
        user.setTokenExptime(new Date());
        user.setActiCode("test");
        userService.save(user);
    }
}
