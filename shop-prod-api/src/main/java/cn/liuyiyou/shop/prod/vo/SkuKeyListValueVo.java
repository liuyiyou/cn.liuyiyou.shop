package cn.liuyiyou.shop.prod.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/30
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
public class SkuKeyListValueVo implements Serializable {

    private String key;
    private List<String> values;
}
