package cn.liuyiyou.shop.order.vo.resp;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author: liuyiyou.cn
 * @date: 2019/1/24
 * @version: V1.0
 */
@Data
@Accessors(chain = true)
public class OrderProdListRespVo {

    private Long orderId;
    private Long skuId;
    private Long prodId;
    private String prodName;
    private Integer prodNum;
    private Float realPrice;
    private String album;
}
