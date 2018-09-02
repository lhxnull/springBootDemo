package com.neo.config;

import com.neo.entity.ActiveUser;
import com.neo.entity.User;
import com.neo.sevice.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;
/**
 * Created by 刘星星 on 2018/8/25.
 */
public class MyShiroRealm extends AuthorizingRealm {
    @Resource
    private UserService userService;
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//        System.out.println("权限配置-->MyShiroRealm.doGetAuthorizationInfo()");
//        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
//        UserInfo userInfo  = (UserInfo)principals.getPrimaryPrincipal();
//        for(SysRole role:userInfo.getRoleList()){
//            authorizationInfo.addRole(role.getRole());
//            for(SysPermission p:role.getPermissions()){
//                authorizationInfo.addStringPermission(p.getPermission());
//            }
//        }
//        return authorizationInfo;
        return null;
    }

    /*主要是用来进行身份认证的，也就是说验证用户输入的账号和密码是否正确。*/
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {
        System.out.println("MyShiroRealm.doGetAuthenticationInfo()");
        //获取用户的输入的账号.
        String username = (String)token.getPrincipal();
        //得到密码
        String password = new String((char[])token.getCredentials());
        System.out.println(token.getCredentials());
        //通过username从数据库中查找 User对象，如果找到，没找到.
        //实际项目中，这里可以根据实际情况做缓存，如果不做，Shiro自己也是有时间间隔机制，2分钟内不会重复执行该方法
        User user = userService.findByUserEmail(username);
        System.out.println("----->>userInfo="+user);
        if(user == null || User.ACTIVATION_UNSUCCESSFUL==user.getActiState()){
            return null;
        }

        //将数据存到用户的身份信息实体中
        ActiveUser activeUser = new ActiveUser();
        activeUser.setUserId(user.getUserId());
        activeUser.setUserEmail(user.getUserEmail());
        activeUser.setUserNickname(user.getUserNickname());
        activeUser.setPassword(password);


        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                activeUser,
                user.getUserPassword(),
                this.getName());
        return authenticationInfo;
    }

}
