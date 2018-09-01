package com.neo.entity;

import org.hibernate.validator.constraints.Email;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Date;

/**
 * Created by 刘星星 on 2018/9/1.
 */
@Entity(name = "table_user")
public class User {
    @Id
//    @GeneratedValue
    @Column(name = "user_id")
    private String userId;


    @NotNull(message="{user.not.null}")
    @Size(min=2,max=15,message="{user.userNickname.length.error}")
    @Column(name = "user_nickname")
    private String userNickname;

    @NotNull(message="{user.not.null}")
    @Size(min=6,max=12,message="{user.userPassword.length.error}")
    @Column(name = "user_password")
    private String userPassword;

    @NotNull(message="{user.not.null}")
    @Email(message="{user.userEmail.not.correct}")
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "acti_state")
    private Integer actiState;

    //激活成功与激活失败常量
    public static final int ACTIVATION_SUCCESSFUL = 1;
    public static final int ACTIVATION_UNSUCCESSFUL = 0;

    @Column(name = "acti_code")
    private String actiCode;

    private String salt;

    @Column(name = "token_exptime")
    private Date tokenExptime;

    public Date getTokenExptime() {
        return tokenExptime;
    }

    public void setTokenExptime(Date tokenExptime) {
        this.tokenExptime = tokenExptime;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getActiState() {
        return actiState;
    }

    public void setActiState(Integer actiState) {
        this.actiState = actiState;
    }

    public String getActiCode() {
        return actiCode;
    }

    public void setActiCode(String actiCode) {
        this.actiCode = actiCode;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
