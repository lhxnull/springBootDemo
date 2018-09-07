CREATE TABLE `article` (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '主键',
  `content` text COMMENT '内容',
  `date` varchar(64) DEFAULT NULL COMMENT '日期',
  `summary` text COMMENT '标签',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `category_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '类型id',
  `user_user_id` varchar(64) DEFAULT NULL COMMENT 'userid',
  PRIMARY KEY (`id`),
  KEY `FKy5kkohbk00g0w88fi05k2hcw` (`category_id`),
  KEY `FKy5kkohbk00g0w88fi05k2f2w` (`user_user_id`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2f2w` FOREIGN KEY (`user_user_id`) REFERENCES `table_user` (`user_id`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
