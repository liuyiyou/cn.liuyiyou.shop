package cn.liuyiyou.shop.order.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

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
@Data
@Accessors(chain = true)
public class OrderProd implements Serializable {

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
     * 产品对应国家馆（liuyiyou.cn_prod.product.origin）
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

}
