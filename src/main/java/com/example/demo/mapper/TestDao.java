//package com.example.demo.mapper;
//
//import com.example.demo.entity.Student;
//import org.apache.ibatis.annotations.Mapper;
//import org.apache.ibatis.annotations.Param;
//import org.apache.ibatis.annotations.Select;
//
//import java.util.List;
///**
// *没有jpa所以注释了，这种方式也挺好，可以直接注解写sql
// */
//@Mapper
//public interface TestDao {
//
//    @Select("select * from prpstudent")
//    public List<Student> find();
//
//    @Select("select * from prpstudent where id= #{id}")
//    public Student queryById(@Param("id") String id);
//}