package cn.liuyiyou.shop.prod.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 商品基本信息表
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-30
 */
@Data
@Accessors(chain = true)
public class Prod implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 产品标识
     */
    @TableId("prod_id")
    private Long prodId;
    /**
     * 产品名称
     */
    @TableField("prod_name")
    private String prodName;
    /**
     * 产品关键字，逗号分隔。
     */
    @TableField("key_words")
    private String keyWords;
    /**
     * 品牌ID，base_brand.brand_id
     */
    @TableField("brand_id")
    private Integer brandId;
    /**
     * 品牌名称名字，冗余字段，前端修改了品牌名字后同步修改这里。
     */
    @TableField("brand_name")
    private String brandName;
    /**
     * 原产地 base_country.country_id
     */
    @TableField("country_id")
    private String countryId;
    /**
     * 归属类目 base_catalog.cata_id
     */
    @TableField("cata_id")
    private Integer cataId;
    /**
     * 类目描述，JSON格式, {
     * "11": "美妆个护",
     * "1101": "个护",
     * "110101": "洁面"
     * }
     * <p>
     * 目前发现2个用途：
     * 1 在管理后台显示类似 ‘美妆个护>护肤>洁面’；
     * 2 在详情页的面包屑展示。
     */
    @TableField("cata_desc")
    private String cataDesc;
    /**
     * SPU属性，只做展现用，可能对统计不好计算。 JSON数组：
     * <p>
     * [
     * {
     * "attrid-name":"71-颜色",
     * "valid-name":"11-红色"
     * },
     * {
     * "attrid-name":"72-规格",
     * "valid-name":"4-4G"
     * }
     * ]
     * ]
     */
    @TableField("spu_attr")
    private String spuAttr;
    /**
     * 创建日期
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 产品状态： 1 - 在用，0 - 无用。
     * <p>
     * 这里的原子商品，无上架下架状态。
     */
    private Integer status;
    /**
     * 状态变换日期 (上架日期下架日期)
     */
    @TableField("status_time")
    private LocalDateTime statusTime;
    /**
     * 产品图片相册(多个用逗号分开)，存放在服务器上的相对路径。
     */
    private String album;
    /**
     * 产品简述
     */
    private String brief;
    /**
     * 产品描述(静态化) 基本上都是图片
     */
    private String descp;
    /**
     * 创建人的ID
     */
    @TableField("create_suid")
    private Long createSuid;
    /**
     * 修改记录，JSON格式[{suid,datetime}]
     */
    @TableField("update_logs")
    private String updateLogs;
    /**
     * 最后一次修改的UNIX时间戳，用于排序，静态页面版本控制。
     */
    @TableField("last_update")
    private Integer lastUpdate;


}
