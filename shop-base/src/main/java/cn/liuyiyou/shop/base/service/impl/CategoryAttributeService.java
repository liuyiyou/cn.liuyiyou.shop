package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Attribute;
import cn.liuyiyou.shop.base.entity.AttributeValue;
import cn.liuyiyou.shop.base.entity.CategoryAttribute;
import cn.liuyiyou.shop.base.mapper.CategoryAttributeMapper;
import cn.liuyiyou.shop.base.service.IAttributeService;
import cn.liuyiyou.shop.base.service.IAttributeValueService;
import cn.liuyiyou.shop.base.service.ICategoryAttributeService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 类目属性关联表
 * <p>
 * 如果是组合属性，在这里无需关联原子成员属性。 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Service
public class CategoryAttributeService extends ServiceImpl<CategoryAttributeMapper, CategoryAttribute> implements ICategoryAttributeService {

    @Autowired
    private IAttributeValueService attributeValueService;
    @Autowired
    private IAttributeService attributeService;

    @Override
    public List<AttributeValue> getAttributeValueByCatgoryId(int categoryId) {
        List<CategoryAttribute> categoryAttribute = this.list(new LambdaQueryWrapper<CategoryAttribute>().eq(CategoryAttribute::getCataId, categoryId));
        List<Integer> attributeIds = categoryAttribute.stream().map(CategoryAttribute::getAttrId).collect(Collectors.toList());
        List<Attribute> attributes = attributeService.list(new LambdaQueryWrapper<Attribute>().in(Attribute::getAttrId, attributeIds));
        for (Attribute attribute : attributes) {
            String[] attributeValueIds = attribute.getValIds().split(",");
        }
        return null;
    }
}
