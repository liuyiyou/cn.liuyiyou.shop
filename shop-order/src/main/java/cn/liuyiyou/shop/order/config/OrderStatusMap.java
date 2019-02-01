package cn.liuyiyou.shop.order.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/1
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class OrderStatusMap {


    public static Map<Integer, String> STATUS_MAP = new ConcurrentHashMap<>();

    static {
        STATUS_MAP.put(1, "待支付");
        STATUS_MAP.put(2, "待发货");
        STATUS_MAP.put(3, "待确认收货");
        STATUS_MAP.put(4, "交易完成");
        STATUS_MAP.put(5, "订单关闭");

    }
}
