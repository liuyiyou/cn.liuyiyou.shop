package cn.liuyiyou.shop.base.vo;

import lombok.Data;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
public class SimpleProdVo {

    private Long prodId;
    private String prodName;
    private String pic;
    private Float prodPrice;
    private Float referPrice;
}
