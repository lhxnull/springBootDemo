CREATE TABLE `category` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `display_name` varchar(255) DEFAULT NULL COMMENT '类型名',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
