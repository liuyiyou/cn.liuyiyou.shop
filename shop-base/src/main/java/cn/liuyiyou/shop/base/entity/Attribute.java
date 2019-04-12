package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 属性定义表

总体上分3中属性：

attr_clazz = 1 是为原子属性，原子属性取个值就可以跟商品实例化。

attr_clazz = 2 是为简单组合属性，简单组合属性有几个原子属性的排列组成，比如 外包装属性：由 长宽高 三个原子属性组成，甚至由长度单位 这一个原子组成，重复三次。

attr_clazz = 3 是为限制组合属性，是比较复杂的组合属性，由多个属性之间的相互限制组成。比如：由定价计划这个属性，这个属性就是给商品定义一些价格和数量的绑定关系。
比如 牛栏奶粉 产品 ， 3罐 500元， 5罐800元，10罐1000元。由  数量 单价 2个属性组成制约关系，并且可以多个制约关系并列。




 * </p>
 *
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
    private Boolean attrType;
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
