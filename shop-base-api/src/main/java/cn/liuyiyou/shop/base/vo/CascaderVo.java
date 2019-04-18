package cn.liuyiyou.shop.base.vo;

import com.google.common.collect.Lists;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class CascaderVo implements Serializable {


    private Integer value;

    private String label;

    private List<CascaderVo> children = Lists.newArrayList();
}
