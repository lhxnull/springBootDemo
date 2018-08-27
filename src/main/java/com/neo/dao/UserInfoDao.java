package com.neo.dao;

/**
 * Created by 刘星星 on 2018/8/25.
 */
import com.neo.entity.UserInfo;
import org.springframework.data.repository.CrudRepository;

public interface UserInfoDao extends CrudRepository<UserInfo,Long> {
    /**通过username查找用户信息;*/
    public UserInfo findByUsername(String username);
}