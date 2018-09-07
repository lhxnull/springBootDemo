CREATE TABLE `table_user` (
  `user_id` varchar(50) NOT NULL COMMENT '用户Id',
  `user_nickname` varchar(20) NOT NULL COMMENT '用户昵称',
  `user_password` varchar(32) NOT NULL COMMENT '用户密码',
  `user_email` varchar(50) NOT NULL COMMENT '用户邮箱\n    ',
  `acti_state` int(11) NOT NULL COMMENT '激活状态，0表示未激活，1表示激活',
  `acti_code` varchar(50) DEFAULT NULL COMMENT '随机验证码',
  `salt` varchar(50) NOT NULL COMMENT '随机盐，用于加密密码',
  `token_exptime` datetime NOT NULL COMMENT '用于判断邮箱链接有效时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
