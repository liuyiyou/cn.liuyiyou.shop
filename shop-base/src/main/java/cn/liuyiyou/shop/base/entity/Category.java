package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * <p>
 * 类目定义表。
 * 支持三级继承类目：
 * cata_type=1：一级类目
 * cata_type=2：二级类目
 * cata_type=3：三级类目
 * <p>
 * 目录ID规则
 * 一级目录： 2位 （10-99）
 * 二级目录： 3位 （100-999）
 * 三级目录：4位  （1000-9999）
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
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
