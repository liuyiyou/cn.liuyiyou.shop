package cn.liuyiyou.shop.order.vo.req;

import cn.liuyiyou.shop.common.vo.PageVo;
import lombok.Data;
import lombok.experimental.Accessors;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class OrderListReqVo extends PageVo {

    private Integer status;

}
