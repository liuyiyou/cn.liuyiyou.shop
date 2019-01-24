package cn.liuyiyou.shop.order.vo.req;

import cn.liuyiyou.shop.common.vo.PageVo;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author: liuyiyou.cn
 * @date: 2019/1/24
 * @version: V1.0
 */
@Data
@Accessors(chain = true)
public class OrderListReqVo extends PageVo {

    private Integer status;

}
