package cn.liuyiyou.shop.prod.vo;

import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.entity.ProdSku;
import lombok.Data;

import java.util.List;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/10/31
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
public class ProdVo extends Prod {

    private String country;

    List<ProdSkuVo> prodSkus;

}
