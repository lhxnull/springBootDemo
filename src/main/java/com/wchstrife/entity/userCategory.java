//package com.wchstrife.entity;
//
//import javax.persistence.*;
//
///**
// * Created by 刘星星 on 2018/9/9.
// * 想把Category和user做成manytomany但是懒得弄了。
// * 封印吧先
// */
//@Entity
//@Table(name = "user_category")
//public class userCategory {
//
//    @Id
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    private Integer id;
//    @Column(name = "user_id")
//    private String userId;
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }
//
//    public void setCategoryid(String categoryid) {
//        this.categoryid = categoryid;
//    }
//
//    public Integer getId() {
//
//        return id;
//    }
//
//    public String getUserId() {
//        return userId;
//    }
//
//    public String getCategoryid() {
//        return categoryid;
//    }
//
//    @Column(name = "category_id")
//    private String categoryid;
//}
