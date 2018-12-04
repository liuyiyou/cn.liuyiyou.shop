package cn.liuyiyou.shop.base.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

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


    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public Integer getCataId() {
        return cataId;
    }

    public void setCataId(Integer cataId) {
        this.cataId = cataId;
    }

    public String getCataDesc() {
        return cataDesc;
    }

    public void setCataDesc(String cataDesc) {
        this.cataDesc = cataDesc;
    }

    public String getSpuAttr() {
        return spuAttr;
    }

    public void setSpuAttr(String spuAttr) {
        this.spuAttr = spuAttr;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getStatusTime() {
        return statusTime;
    }

    public void setStatusTime(LocalDateTime statusTime) {
        this.statusTime = statusTime;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getDescp() {
        return descp;
    }

    public void setDescp(String descp) {
        this.descp = descp;
    }

    public Long getCreateSuid() {
        return createSuid;
    }

    public void setCreateSuid(Long createSuid) {
        this.createSuid = createSuid;
    }

    public String getUpdateLogs() {
        return updateLogs;
    }

    public void setUpdateLogs(String updateLogs) {
        this.updateLogs = updateLogs;
    }

    public Integer getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Integer lastUpdate) {
        this.lastUpdate = lastUpdate;
    }


    @Override
    public String toString() {
        return "Prod{" +
                ", prodId=" + prodId +
                ", prodName=" + prodName +
                ", keyWords=" + keyWords +
                ", brandId=" + brandId +
                ", brandName=" + brandName +
                ", countryId=" + countryId +
                ", cataId=" + cataId +
                ", cataDesc=" + cataDesc +
                ", spuAttr=" + spuAttr +
                ", createTime=" + createTime +
                ", status=" + status +
                ", statusTime=" + statusTime +
                ", album=" + album +
                ", brief=" + brief +
                ", descp=" + descp +
                ", createSuid=" + createSuid +
                ", updateLogs=" + updateLogs +
                ", lastUpdate=" + lastUpdate +
                "}";
    }
}
