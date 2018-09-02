package com.neo.entity;

import java.io.Serializable;

/**
 *
 * 存储用户的身份信息
 * Created by 刘星星 on 2018/9/2.
 */
public class ActiveUser implements Serializable {

    private String userId;
    private String userEmail;
    private String userNickname;

    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }
}
