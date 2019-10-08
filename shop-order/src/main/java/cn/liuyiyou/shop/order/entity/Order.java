package cn.liuyiyou.shop.order.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 * C端用户产品订单表。
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@TableName("t_order")
@Data
@Accessors(chain = true)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 订单ID
     */
    @TableId(value = "order_id", type = IdType.AUTO)
    private Long orderId;
    /**
     * 创建订单的用户ID
     */
    private Integer uid;
    /**
     * 用户生成订单的时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 订单商品总价(元)
     */
    @TableField("total_price")
    private Float totalPrice;
    /**
     * 收货人身份证号码
     */
    @TableField("consign_idno")
    private String consignIdno;
    /**
     * 收货人信息: 默认填入用户的user.uname
     */
    private String consignee;
    /**
     * 收货人电话： 默认填入user 表里面的 account
     */
    @TableField("consign_phone")
    private String consignPhone;
    /**
     * 收货人地址
     */
    @TableField("consign_addr")
    private String consignAddr;
    /**
     * 订单状态： 1 待支付 2 已支付待发货 3 已发货 4 交易已完成 5 订单超时关闭
     */
    private Integer status;
    /**
     * 订单的退货退款状态：6-部分退货退款，7-整单退货退款
     */
    @TableField("return_status")
    private Integer returnStatus;
    /**
     * 订单退货退款状态变更时间
     */
    @TableField("return_time")
    private LocalDateTime returnTime;
    /**
     * 该订单发生的退货退款金额
     */
    @TableField("return_amount")
    private Float returnAmount;
    /**
     * 发货状态：1：部分发货，2：全部发货，和status共同控制
     */
    @TableField("send_status")
    private Integer sendStatus;
    /**
     * 取消订单的原因
     */
    @TableField("cancel_reason")
    private String cancelReason;
    /**
     * 收货人所在区（对应liuyiyou.cn_base.base_county.county_id）
     */
    @TableField("consign_country")
    private Integer consignCountry;
    /**
     * 收货人所在省（对应liuyiyou.cn_base.base_province.prov_id）
     */
    @TableField("consign_province")
    private Integer consignProvince;
    /**
     * 收货人所在市（对应liuyiyou.cn_base.base_city.city_id）
     */
    @TableField("consign_city")
    private Integer consignCity;
    /**
     * 支付方式 1-线下付款,2-支付宝,3-易宝,4-微信,5-银联,6-网付通,7-苹果支付,8-招商银行,9-余额支付,10-余额微信混合支付,11-余额支付宝混合支付,12-余额银联混合支付,13-通联代付,14-小程序支付
     */
    @TableField("pay_type")
    private Integer payType;
    /**
     * 订单交易流水号
     */
    private String tranno;
    /**
     * 创建订单的用户帐号
     */
    private String uaccount;
    /**
     * 订单来源（1表示网站，2表示微商城）
     */
    private Integer src;
    /**
     * 订单操作人Id
     */
    @TableField("op_uid")
    private Integer opUid;
    /**
     * 订单支付时间
     */
    @TableField("pay_time")
    private LocalDateTime payTime;
    /**
     * 订单发货时间
     */
    @TableField("send_time")
    private LocalDateTime sendTime;
    /**
     * 订单配送完成时间
     */
    @TableField("distribute_time")
    private LocalDateTime distributeTime;
    /**
     * 订单完成时间
     */
    @TableField("done_time")
    private LocalDateTime doneTime;
    /**
     * 最后修改日期
     */
    @TableField("last_update_time")
    private LocalDateTime lastUpdateTime;

    @TableField(exist = false)
    private List<OrderProd> orderProds;

}
