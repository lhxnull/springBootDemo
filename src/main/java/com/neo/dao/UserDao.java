package com.neo.dao;

import com.neo.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by 刘星星 on 2018/9/1.
 */
public interface UserDao extends CrudRepository<User,Long> {

    public User findByUserEmail(String email);

    public User save(User user);

    public User findByUserId(String userId);

    @Modifying
    @Query("delete from table_user where user_id=:userId")
    public void delete(@Param("userId") String userId);
}
