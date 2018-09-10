CREATE TABLE `article` (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '主键',
  `content` text COMMENT '内容',
  `date` varchar(64) DEFAULT NULL COMMENT '日期',
  `summary` text COMMENT '标签',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `user_user_id` varchar(64) DEFAULT NULL COMMENT 'userid',
  `category_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKy5kkohbk00g0w88fi05k2f2w` (`user_user_id`),
  KEY `dfdfwef32fdsf24` (`category_id`),
  CONSTRAINT `dfdfwef32fdsf24` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2f2w` FOREIGN KEY (`user_user_id`) REFERENCES `table_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
