package cn.liuyiyou.shop.prod.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/30
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class SkuKeyValueVo implements Serializable {

    private String key;

    private String value;
}
