CREATE TABLE `category` (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '主键',
  `display_name` varchar(255) DEFAULT NULL COMMENT '类型名',
  `name` varchar(255) DEFAULT NULL,
  `user_user_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fd23sfer32er42` (`user_user_id`),
  CONSTRAINT `fd23sfer32er42` FOREIGN KEY (`user_user_id`) REFERENCES `table_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
