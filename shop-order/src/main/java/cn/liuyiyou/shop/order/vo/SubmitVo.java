package cn.liuyiyou.shop.order.vo;

import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.entity.OrderProd;
import lombok.Data;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/2
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
public class SubmitVo {

//    private Order order;
//    private OrderProd orderProd;
//    private Long prodId;
    private Long skuId;
    private int payType;
    private Float payAmount;

}
