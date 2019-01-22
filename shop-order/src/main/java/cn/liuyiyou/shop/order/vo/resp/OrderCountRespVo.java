package cn.liuyiyou.shop.order.vo.resp;

import lombok.Data;
import lombok.experimental.Accessors;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/23
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class OrderCountRespVo {


    private int needPay;
    private int needSend;
    private int needCofrim;
    private int needComment;
}
