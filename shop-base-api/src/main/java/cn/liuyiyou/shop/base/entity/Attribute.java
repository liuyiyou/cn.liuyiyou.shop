package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Attribute implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 属性名称标识
     */
    @TableId(value = "attr_id", type = IdType.AUTO)
    private Integer attrId;
    /**
     * 属性名称
     */
    @TableField("attr_name")
    private String attrName;
    /**
     * 属性关键字，以逗号分隔
     */
    @TableField("attr_keywords")
    private String attrKeywords;
    /**
     * 组合类型：1-原子属性；2-简单组合；3-限制组合
     */
    @TableField("group_type")
    private Integer groupType;
    /**
     * 简单组合属性时的属性成员id列表。英文逗号分隔。

复杂组合时候[{attr_id,attr_id2}]

     */
    @TableField("attr_members")
    private String attrMembers;
    /**
     * 属性类型：1-关键属性(SPU);2-销售属性(SKU),3-其他属性； 其中SKU影响库存。
     */
    @TableField("attr_type")
    private Byte attrType;
    /**
     * 属性展示方式：0-输入框，1-单选框，2-复选框，3-单选下拉
     */
    @TableField("attr_display")
    private Integer attrDisplay;
    /**
     * 属性权重
     */
    @TableField("attr_weight")
    private Integer attrWeight;
    /**
     * 属性值ID，多个用,分开
     */
    @TableField("val_ids")
    private String valIds;
    /**
     * 状态 1 - 启用；0 - 停用
     */
    private Boolean state;
    /**
     * 属性创建时间
     */
    @TableField("create_date")
    private LocalDateTime createDate;
    /**
     * 属性最后修改时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;


}
