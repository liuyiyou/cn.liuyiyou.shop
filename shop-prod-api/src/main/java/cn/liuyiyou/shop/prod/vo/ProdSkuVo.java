package cn.liuyiyou.shop.prod.vo;

import cn.liuyiyou.shop.prod.entity.ProdSku;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class ProdSkuVo extends ProdSku implements Serializable {

    String skuAttrDesc;

}
