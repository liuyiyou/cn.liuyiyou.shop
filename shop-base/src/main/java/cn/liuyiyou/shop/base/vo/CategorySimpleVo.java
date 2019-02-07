package cn.liuyiyou.shop.base.vo;

import com.google.common.collect.Lists;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/**
 * @author: liuyiyou.cn
 * @date: 2019/1/24
 * @version: V1.0
 */
@Data
@Accessors(chain = true)
public class CategorySimpleVo implements Serializable {

    private String parentCataName;

    private Integer cataId;

    private String cataName;

    private Integer cataType;

    private List<CategorySimpleVo> children = Lists.newArrayList();
}
