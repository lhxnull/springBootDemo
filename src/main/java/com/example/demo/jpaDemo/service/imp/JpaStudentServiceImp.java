package com.example.demo.jpaDemo.service.imp;

import com.example.demo.jpaDemo.dao.JpaStudentDao;
import com.example.demo.jpaDemo.entity.JpaStudent;
import com.example.demo.jpaDemo.service.JpaStudentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 刘星星 on 2018/8/26.
 */
@Service
public class JpaStudentServiceImp implements JpaStudentService{
    @Resource
    private JpaStudentDao jpaStudentDao;

    @Override
    public List<JpaStudent> findAll(){
        return  jpaStudentDao.findAll();
    }
    @Override
    public JpaStudent getJpaStudentById(String id){
        return jpaStudentDao.getJpaStudentById(id);
    }
}
