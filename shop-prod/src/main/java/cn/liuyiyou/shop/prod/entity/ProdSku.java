package cn.liuyiyou.shop.prod.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 商品基本信息表
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
 */
@TableName("prod_sku")
public class ProdSku extends Model<ProdSku> {

    private static final long serialVersionUID = 1L;

    /**
     * 产品标识
     */
    @TableId("sku_id")
    private Long skuId;
    /**
     * sku产品名称(该字段冗余，暂不对外显示),值为spu名称+规格型号
     */
    @TableField("sku_name")
    private String skuName;
    /**
     * 所属的product; 外键product.prod_id 
     */
    @TableField("prod_id")
    private Long prodId;
    /**
     * SKU属性，JSON数组：

[
    {
        "attrid-name":"71-颜色",
        "valid-name":"11-红色"
    },
    {
        "attrid-name":"72-规格",
        "valid-name":"4-4G"
    }
]
     */

    @TableField("sku_attr")
    private String skuAttr;


    @TableField("store")
    private Integer store;

    @TableField("saled")
    private Integer saled;

    @TableField("freez")
    private Integer freez;



    /**
     * sku编码
     */
    @TableField("sku_code")
    private String skuCode;
    /**
     * 销售价
     */
    private Float price;
    /**
     * 参考价格
     */
    @TableField("refer_price")
    private Float referPrice;
    /**
     * sku主图,存放在服务器上的相对路径
     */
    @TableField("sku_pic")
    private String skuPic;
    /**
     * 产品状态： 0 - 无用 , 1 - 在用, 2 - 不启用。
     */
    private Integer status;
    /**
     * 创建日期
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 状态变换日期 (上架日期下架日期)
     */
    @TableField("status_time")
    private LocalDateTime statusTime;
    /**
     * 创建人的ID
     */
    @TableField("create_suid")
    private Long createSuid;
    /**
     * 最后一次修改的UNIX时间戳，用于排序，静态页面版本控制。
     */
    @TableField("last_update")
    private Integer lastUpdate;


    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }

    public String getSkuName() {
        return skuName;
    }

    public void setSkuName(String skuName) {
        this.skuName = skuName;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    public String getSkuAttr() {
        return skuAttr;
    }

    public void setSkuAttr(String skuAttr) {
        this.skuAttr = skuAttr;
    }

    public String getSkuCode() {
        return skuCode;
    }

    public void setSkuCode(String skuCode) {
        this.skuCode = skuCode;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getReferPrice() {
        return referPrice;
    }

    public void setReferPrice(Float referPrice) {
        this.referPrice = referPrice;
    }

    public String getSkuPic() {
        return skuPic;
    }

    public void setSkuPic(String skuPic) {
        this.skuPic = skuPic;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getStatusTime() {
        return statusTime;
    }

    public void setStatusTime(LocalDateTime statusTime) {
        this.statusTime = statusTime;
    }

    public Long getCreateSuid() {
        return createSuid;
    }

    public void setCreateSuid(Long createSuid) {
        this.createSuid = createSuid;
    }

    public Integer getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Integer lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Integer getStore() {
        return store;
    }

    public void setStore(Integer store) {
        this.store = store;
    }

    public Integer getSaled() {
        return saled;
    }

    public void setSaled(Integer saled) {
        this.saled = saled;
    }

    public Integer getFreez() {
        return freez;
    }

    public void setFreez(Integer freez) {
        this.freez = freez;
    }

    @Override
    protected Serializable pkVal() {
        return this.skuId;
    }

    @Override
    public String toString() {
        return "ProdSku{" +
        ", skuId=" + skuId +
        ", skuName=" + skuName +
        ", prodId=" + prodId +
        ", skuAttr=" + skuAttr +
        ", skuCode=" + skuCode +
        ", price=" + price +
        ", referPrice=" + referPrice +
        ", skuPic=" + skuPic +
        ", status=" + status +
        ", createTime=" + createTime +
        ", statusTime=" + statusTime +
        ", createSuid=" + createSuid +
        ", lastUpdate=" + lastUpdate +
        "}";
    }
}
