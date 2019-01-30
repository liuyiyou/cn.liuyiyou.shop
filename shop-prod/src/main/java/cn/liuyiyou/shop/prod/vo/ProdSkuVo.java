package cn.liuyiyou.shop.prod.vo;

import cn.liuyiyou.shop.prod.entity.ProdSku;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/2
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
@Accessors(chain = true)
public class ProdSkuVo extends ProdSku {

    String skuAttrDesc;

}
