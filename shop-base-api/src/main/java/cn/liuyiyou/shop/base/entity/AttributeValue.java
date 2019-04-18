package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。

在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。


 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("attribute_value")
public class AttributeValue implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 属性值标识
     */
    @TableId(value = "val_id", type = IdType.AUTO)
    private Integer valId;
    /**
     * 属性值
     */
    @TableField("attr_val")
    private String attrVal;
    /**
     * 属性值创建时间
     */
    @TableField("create_date")
    private LocalDate createDate;
    /**
     * 属性值最后修改时间
     */
    @TableField("last_update")
    private LocalDate lastUpdate;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;


}
