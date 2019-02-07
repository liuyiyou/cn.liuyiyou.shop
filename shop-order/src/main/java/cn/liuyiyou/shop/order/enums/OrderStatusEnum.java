package cn.liuyiyou.shop.order.enums;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public enum OrderStatusEnum {

    NEED_PAY(1,"待支付"),
    NEED_SEND(2,"待发货"),
    NEED_CONFIRM(3,"待确认收货"),
    SUCCESS(4,"交易完成"),
    CANCEL(5,"订单关闭");


    private Integer code;
    private String desc;

    OrderStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
