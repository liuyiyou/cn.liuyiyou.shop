package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.CategoryAttribute;
import cn.liuyiyou.shop.base.mapper.CategoryAttributeMapper;
import cn.liuyiyou.shop.base.service.ICategoryAttributeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 类目属性关联表

如果是组合属性，在这里无需关联原子成员属性。 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Service
public class CategoryAttributeService extends ServiceImpl<CategoryAttributeMapper, CategoryAttribute> implements ICategoryAttributeService {

}
