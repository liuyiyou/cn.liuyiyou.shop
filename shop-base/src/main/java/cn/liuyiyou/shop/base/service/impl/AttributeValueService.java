package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.AttributeValue;
import cn.liuyiyou.shop.base.mapper.AttributeValueMapper;
import cn.liuyiyou.shop.base.service.IAttributeValueService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。
 * <p>
 * 在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Service
@com.alibaba.dubbo.config.annotation.Service(version = "${base.service.version}")
public class AttributeValueService extends ServiceImpl<AttributeValueMapper, AttributeValue> implements IAttributeValueService {


}
