package com.neo.sevice.impl;

import com.neo.dao.UserDao;
import com.neo.entity.User;
import com.neo.sevice.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by 刘星星 on 2018/9/1.
 */
@Service
public class UserServiceImp implements UserService {
    @Resource
    private UserDao userDao;
    @Override
    public User findByUserEmail(String email) {
        return userDao.findByUserEmail(email);
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    public User findOne(String id) {
        return userDao.findByUserId(id);
    }

    @Override
    public void delete(String id) {
        try {

            userDao.delete(id);
        }catch (Exception e){
            System.out.println(e.toString());
        }
    }
}
