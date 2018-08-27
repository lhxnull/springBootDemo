package com.example.demo.jpaDemo.service;

import com.example.demo.jpaDemo.entity.JpaStudent;

import java.util.List;

/**
 * Created by 刘星星 on 2018/8/26.
 */
public interface JpaStudentService {

    public List<JpaStudent> findAll();

    public JpaStudent getJpaStudentById(String id);
}
