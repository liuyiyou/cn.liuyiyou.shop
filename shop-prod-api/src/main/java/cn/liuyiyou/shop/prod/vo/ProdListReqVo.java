package cn.liuyiyou.shop.prod.vo;

import lombok.Data;
import lombok.experimental.Accessors;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/5
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class ProdListReqVo {

    private Integer page;
    private Integer pageSize;
    private Integer cateId;
    private String orderBy;
    private Long brandId;

}
