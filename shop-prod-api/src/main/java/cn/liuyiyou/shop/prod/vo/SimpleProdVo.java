package cn.liuyiyou.shop.prod.vo;

import lombok.Data;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/10/31
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
public class SimpleProdVo {

    private Long prodId;
    private String prodName;
    private String pic;
    private Float prodPrice;
    private Float referPrice;
}
