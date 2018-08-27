package com.example.demo.jpaDemo.dao;

import com.example.demo.jpaDemo.entity.JpaStudent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by 刘星星 on 2018/8/26.
 */
public interface JpaStudentDao extends JpaRepository<JpaStudent,String>{

    public List<JpaStudent> findAll();

    public JpaStudent getJpaStudentById(String id);
}
