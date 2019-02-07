package cn.liuyiyou.shop.common.vo;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@ApiModel("分页查询统一字段")
public class PageVo {

    @ApiModelProperty(value = "页码", required = true)
    @NotNull(message = "页码不能为空")
    private Integer pageNum;

    @ApiModelProperty(value = "每页显示条数", required = true)
    @NotNull(message = "每页条数不能为空")
    private Integer pageSize;

    @ApiModelProperty("查询参数")
    private String searchValue;

    @ApiModelProperty("排序字段")
    private String orderByColumn;

    @ApiModelProperty("是否降序")
    private boolean desc = false;

    @JsonIgnore
    @JSONField(serialize = false)
    public Integer getIndex() {
        return (pageNum - 1) * pageSize;
    }
}
