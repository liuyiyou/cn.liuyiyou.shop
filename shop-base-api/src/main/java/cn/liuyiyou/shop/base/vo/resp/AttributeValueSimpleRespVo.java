package cn.liuyiyou.shop.base.vo.resp;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.experimental.Accessors;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/12
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class AttributeValueSimpleRespVo {

    @ApiModelProperty("属性值标识")
    private Integer valId;


    @ApiModelProperty("属性值")
    private String attrVal;
}
