package cn.liuyiyou.shop.base.mapper;

import cn.liuyiyou.shop.base.entity.AttributeValue;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。

在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。

 Mapper 接口
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
public interface AttributeValueMapper extends BaseMapper<AttributeValue> {

}
