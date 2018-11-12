package cn.liuyiyou.shop.order.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * C端订单产品表
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@TableName("order_prod")
public class OrderProd extends Model<OrderProd> {

    private static final long serialVersionUID = 1L;

    /**
     * 子采购单ID
     */
    @TableId("order_id")
    private Long orderId;
    /**
     * 产品ID
     */
    @TableField("prod_id")
    private Long prodId;
    /**
     * 商品编码，来源于prod_attr.prod_code
     */
    @TableField("sku_id")
    private Long skuId;
    /**
     * 用户ID
     */
    private Integer uid;
    /**
     * 产品名称
     */
    @TableField("prod_name")
    private String prodName;
    /**
     * 产品属性，JSON格式，冗余信息，展示用。
     */
    @TableField("prod_attr")
    private String prodAttr;
    /**
     * 产品单价
     */
    @TableField("unit_price")
    private Float unitPrice;
    /**
     * 产品数量
     */
    @TableField("prod_num")
    private Integer prodNum;
    /**
     * 产品总价
     */
    @TableField("total_price")
    private Float totalPrice;
    /**
     * 产品对应国家馆（ibalife_prod.product.origin）
     */
    @TableField("county_id")
    private String countyId;
    /**
     * 商品条形码
     */
    private String barcode;
    /**
     * 商品图片
     */
    private String album;
    /**
     * 参加优惠或扣减后真实价格
     */
    @TableField("real_price")
    private Float realPrice;
    /**
     * 商品退货退款状态
     */
    @TableField("refund_status")
    private Integer refundStatus;
    /**
     * 评论状态：0-未评论，1-已评论
     */
    @TableField("comment_status")
    private Integer commentStatus;


    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getProdAttr() {
        return prodAttr;
    }

    public void setProdAttr(String prodAttr) {
        this.prodAttr = prodAttr;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getProdNum() {
        return prodNum;
    }

    public void setProdNum(Integer prodNum) {
        this.prodNum = prodNum;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCountyId() {
        return countyId;
    }

    public void setCountyId(String countyId) {
        this.countyId = countyId;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Float getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(Float realPrice) {
        this.realPrice = realPrice;
    }

    public Integer getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(Integer refundStatus) {
        this.refundStatus = refundStatus;
    }

    public Integer getCommentStatus() {
        return commentStatus;
    }

    public void setCommentStatus(Integer commentStatus) {
        this.commentStatus = commentStatus;
    }

    @Override
    protected Serializable pkVal() {
        return this.orderId;
    }

    @Override
    public String toString() {
        return "OrderProd{" +
        ", orderId=" + orderId +
        ", prodId=" + prodId +
        ", skuId=" + skuId +
        ", uid=" + uid +
        ", prodName=" + prodName +
        ", prodAttr=" + prodAttr +
        ", unitPrice=" + unitPrice +
        ", prodNum=" + prodNum +
        ", totalPrice=" + totalPrice +
        ", countyId=" + countyId +
        ", barcode=" + barcode +
        ", album=" + album +
        ", realPrice=" + realPrice +
        ", refundStatus=" + refundStatus +
        ", commentStatus=" + commentStatus +
        "}";
    }
}
