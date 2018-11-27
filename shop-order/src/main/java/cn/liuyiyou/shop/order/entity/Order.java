package cn.liuyiyou.shop.order.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order extends Model<Order> {

    private static final long serialVersionUID = 1L;

    /**
     * 订单ID
     */
    @TableId("order_id")
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
     * 收货人所在区（对应ibalife_base.base_county.county_id）
     */
    @TableField("consign_country")
    private Integer consignCountry;
    /**
     * 收货人所在省（对应ibalife_base.base_province.prov_id）
     */
    @TableField("consign_province")
    private Integer consignProvince;
    /**
     * 收货人所在市（对应ibalife_base.base_city.city_id）
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

    public List<OrderProd> getOrderProds() {
        return orderProds;
    }

    public void setOrderProds(List<OrderProd> orderProds) {
        this.orderProds = orderProds;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getConsignIdno() {
        return consignIdno;
    }

    public void setConsignIdno(String consignIdno) {
        this.consignIdno = consignIdno;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getConsignPhone() {
        return consignPhone;
    }

    public void setConsignPhone(String consignPhone) {
        this.consignPhone = consignPhone;
    }

    public String getConsignAddr() {
        return consignAddr;
    }

    public void setConsignAddr(String consignAddr) {
        this.consignAddr = consignAddr;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getReturnStatus() {
        return returnStatus;
    }

    public void setReturnStatus(Integer returnStatus) {
        this.returnStatus = returnStatus;
    }

    public LocalDateTime getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(LocalDateTime returnTime) {
        this.returnTime = returnTime;
    }

    public Float getReturnAmount() {
        return returnAmount;
    }

    public void setReturnAmount(Float returnAmount) {
        this.returnAmount = returnAmount;
    }

    public Integer getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(Integer sendStatus) {
        this.sendStatus = sendStatus;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public Integer getConsignCountry() {
        return consignCountry;
    }

    public void setConsignCountry(Integer consignCountry) {
        this.consignCountry = consignCountry;
    }

    public Integer getConsignProvince() {
        return consignProvince;
    }

    public void setConsignProvince(Integer consignProvince) {
        this.consignProvince = consignProvince;
    }

    public Integer getConsignCity() {
        return consignCity;
    }

    public void setConsignCity(Integer consignCity) {
        this.consignCity = consignCity;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public String getTranno() {
        return tranno;
    }

    public void setTranno(String tranno) {
        this.tranno = tranno;
    }

    public String getUaccount() {
        return uaccount;
    }

    public void setUaccount(String uaccount) {
        this.uaccount = uaccount;
    }

    public Integer getSrc() {
        return src;
    }

    public void setSrc(Integer src) {
        this.src = src;
    }

    public Integer getOpUid() {
        return opUid;
    }

    public void setOpUid(Integer opUid) {
        this.opUid = opUid;
    }

    public LocalDateTime getPayTime() {
        return payTime;
    }

    public void setPayTime(LocalDateTime payTime) {
        this.payTime = payTime;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public LocalDateTime getDistributeTime() {
        return distributeTime;
    }

    public void setDistributeTime(LocalDateTime distributeTime) {
        this.distributeTime = distributeTime;
    }

    public LocalDateTime getDoneTime() {
        return doneTime;
    }

    public void setDoneTime(LocalDateTime doneTime) {
        this.doneTime = doneTime;
    }

    public LocalDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(LocalDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.orderId;
    }

    @Override
    public String toString() {
        return "Order{" +
        ", orderId=" + orderId +
        ", uid=" + uid +
        ", createTime=" + createTime +
        ", totalPrice=" + totalPrice +
        ", consignIdno=" + consignIdno +
        ", consignee=" + consignee +
        ", consignPhone=" + consignPhone +
        ", consignAddr=" + consignAddr +
        ", status=" + status +
        ", returnStatus=" + returnStatus +
        ", returnTime=" + returnTime +
        ", returnAmount=" + returnAmount +
        ", sendStatus=" + sendStatus +
        ", cancelReason=" + cancelReason +
        ", consignCountry=" + consignCountry +
        ", consignProvince=" + consignProvince +
        ", consignCity=" + consignCity +
        ", payType=" + payType +
        ", tranno=" + tranno +
        ", uaccount=" + uaccount +
        ", src=" + src +
        ", opUid=" + opUid +
        ", payTime=" + payTime +
        ", sendTime=" + sendTime +
        ", distributeTime=" + distributeTime +
        ", doneTime=" + doneTime +
        ", lastUpdateTime=" + lastUpdateTime +
        "}";
    }
}
