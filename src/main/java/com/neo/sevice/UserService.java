package com.neo.sevice;

import com.neo.entity.User;

/**
 * Created by 刘星星 on 2018/9/1.
 */
public interface UserService  {

    public User findByUserEmail(String email);

    public User save(User user);

    public User findOne(String id);

    public void delete(String id);
}
