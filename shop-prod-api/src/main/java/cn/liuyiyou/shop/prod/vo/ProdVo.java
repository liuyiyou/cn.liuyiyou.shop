package cn.liuyiyou.shop.prod.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author: liuyiyou@liuyiyou.cn
 * @date: 2018/10/31
 * @version: V1.0
 * @Copyright: 2018 liuyiyou.cn Inc. All rights reserved.
 */
@Data
public class ProdVo implements Serializable {
    private List<String> albums;
    private Long prodId;
    private String prodName;
    private Integer brandId;
    private String brandName;
    private Integer cataId;
    private String country;
    private List<ProdSkuVo> prodSkus;
    List<SkuKeyListValueVo> skuKeyListValue;


}
