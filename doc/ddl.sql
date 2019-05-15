
-- 基础库



-- 行政区划表
CREATE TABLE `area` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `level` tinyint(2) DEFAULT '0' COMMENT '级别1：省，2：市，3：县区',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 品牌表
CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL COMMENT '品牌标识',
  `brand_first_char` varchar(1) DEFAULT NULL COMMENT '品牌名首字母，大写',
  `brand_name_cn` varchar(100) DEFAULT NULL COMMENT '品牌中文名',
  `brand_name_en` varchar(100) DEFAULT NULL COMMENT '品牌英文名',
  `brand_descp` varchar(300) DEFAULT NULL COMMENT '品牌介绍',
  `brand_keywords` varchar(1024) DEFAULT NULL COMMENT '品牌关键字，以逗号分隔',
  `brand_icon` varchar(1024) DEFAULT NULL COMMENT '品牌图标url',
  `create_date` date DEFAULT NULL COMMENT '品牌创建时间',
  `last_update` date DEFAULT NULL COMMENT '品牌最后修改时间',
  `country_id` varchar(10) DEFAULT NULL COMMENT '品牌所属国家ID',
  `prod_img` varchar(1024) DEFAULT NULL COMMENT '商品图片url',
  `banner_img` varchar(1024) DEFAULT NULL COMMENT 'banner图片url',
  PRIMARY KEY (`brand_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='品牌定义表，这里会定义所有可供选择的品牌。\r\n该表会与类目表中的叶子类目关联，以缩小在商品上传时品牌的选择范围（选定商品的所属类目后，只能看到该类目关联的品牌）。\r\n该表还会与商品表关联，以标识商品的品牌。';


-- 分类表
CREATE TABLE `category` (
  `cata_id` int(11) NOT NULL COMMENT '类目标识，一级类目以1开头的两位数字；二级类目以一级类目开头再加二位数字的枚举；三级类目以二级类目开头，加二位数字的枚举；\r\n\r\n如：有父子关系的三个类目\r\n1级： 11\r\n2级： 1101~1199\r\n3级： 110101~110199\r\n\r\n\r\n',
  `cata_name` varchar(10) DEFAULT NULL COMMENT '类目名称',
  `cata_desc` varchar(100) DEFAULT NULL COMMENT '类目描述',
  `cata_type` tinyint(4) DEFAULT NULL COMMENT '类目类别：1-一级类目，2-二级类目，3-三级类目',
  `cata_parent_id` int(11) DEFAULT NULL COMMENT '所属父类目id',
  `cata_weight` int(11) DEFAULT NULL COMMENT '类目权重',
  `create_date` date DEFAULT NULL COMMENT '类目创建时间',
  `last_upate` date DEFAULT NULL COMMENT '类目最后修改时间',
  PRIMARY KEY (`cata_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='类目定义表。\r\n支持三级继承类目：\r\ncata_type=1：一级类目\r\ncata_type=2：二级类目\r\ncata_type=3：三级类目\r\n\r\n目录ID规则\r\n一级目录： 2位 （10-99） \r\n二级目录： 3位 （100-999）\r\n三级目录：4位  （1000-9999）';



