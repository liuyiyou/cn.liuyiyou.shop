package cn.liuyiyou.shop.order.vo;

import lombok.Data;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
public class SubmitVo {

    //    private Order order;
//    private OrderProd orderProd;
    private Long prodId;
    private Long skuId;
    private int payType;
    private Float payAmount;

}
