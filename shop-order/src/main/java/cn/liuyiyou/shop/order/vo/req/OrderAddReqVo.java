package cn.liuyiyou.shop.order.vo.req;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/1
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class OrderAddReqVo implements Serializable {

    private Long skuId;
    private Integer prodNum;

}
