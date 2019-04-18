package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 类目属性关联表

如果是组合属性，在这里无需关联原子成员属性。
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("category_attribute")
public class CategoryAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 类目与属性关联标识
     */
    @TableId(value = "cata_attr_id", type = IdType.AUTO)
    private Integer cataAttrId;
    /**
     * 外键，base_catalog.cata_id
     */
    @TableField("cata_id")
    private Integer cataId;
    /**
     * 外键，base_attribute.attr_id
     */
    @TableField("attr_id")
    private Integer attrId;
    /**
     * 属性名称(某一个类目私有的，会优先显示这个名称)
     */
    @TableField("attr_name")
    private String attrName;
    /**
     * 状态 1 - 启用；0 - 停用
     */
    private Boolean state;
    /**
     * 关联创建时间
     */
    @TableField("create_date")
    private LocalDateTime createDate;
    /**
     * 关联最后修改时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;


}
