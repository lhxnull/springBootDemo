这是一个springBoot Demo，数据库是mysql，jdk1.7版本，其中example包下是一些基本springboot的操作，
neo包下是基于shrio安全框架的的简单的身份验证.需要在数据库创建table_user（用户信息表）保存用户
信息，创建sql语句见webapp下user.sql。
如果想了解example包下基本springboot操作，请把neo/config/ShiroConfig.java的
filterChainDefinitionMap.put（“/ **”，“authc”）;改为.
filterChainDefinitionMap.put（“/ ** ”，“anon”）;
