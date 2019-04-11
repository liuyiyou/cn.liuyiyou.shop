package cn.liuyiyou.shop.order.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/1
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class OrderPayTypeMap {


    public static Map<Integer, String> STATUS_MAP = new ConcurrentHashMap<>();

    //支付方式 1-线下付款,2-支付宝,3-易宝,4-微信,5-银联,6-网付通,7-苹果支付,8-招商银行,9-余额支付,10-余额微信混合支付,11-余额支付宝混合支付,12-余额银联混合支付,13-通联代付,14-小程序支付',
    static {
        STATUS_MAP.put(-1, "未支付");
        STATUS_MAP.put(1, "线下付款");
        STATUS_MAP.put(2, "支付宝");
        STATUS_MAP.put(3, "易宝");
        STATUS_MAP.put(4, "微信");
        STATUS_MAP.put(5, "银联");
        STATUS_MAP.put(6, "网付通");
        STATUS_MAP.put(7, "苹果支付");
        STATUS_MAP.put(8, "招商银行");
        STATUS_MAP.put(9, "余额支付");
    }
}
