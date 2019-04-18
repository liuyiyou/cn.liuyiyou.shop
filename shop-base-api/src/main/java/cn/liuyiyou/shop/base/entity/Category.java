package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDate;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 类目标识，一级类目以1开头的两位数字；二级类目以一级类目开头再加二位数字的枚举；三级类目以二级类目开头，加二位数字的枚举；
     * <p>
     * 如：有父子关系的三个类目
     * 1级： 11
     * 2级： 1101~1199
     * 3级： 110101~110199
     */
    @TableId("cata_id")
    private Integer cataId;
    /**
     * 类目名称
     */
    @TableField("cata_name")
    private String cataName;
    /**
     * 类目描述
     */
    @TableField("cata_desc")
    private String cataDesc;
    /**
     * 类目类别：1-一级类目，2-二级类目，3-三级类目
     */
    @TableField("cata_type")
    private Integer cataType;
    /**
     * 所属父类目id
     */
    @TableField("cata_parent_id")
    private Integer cataParentId;
    /**
     * 类目权重
     */
    @TableField("cata_weight")
    private Integer cataWeight;
    /**
     * 类目创建时间
     */
    @TableField("create_date")
    private LocalDate createDate;
    /**
     * 类目最后修改时间
     */
    @TableField("last_upate")
    private LocalDate lastUpate;


}
