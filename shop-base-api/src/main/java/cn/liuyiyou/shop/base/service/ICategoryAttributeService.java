package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.AttributeValue;
import cn.liuyiyou.shop.base.entity.CategoryAttribute;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 类目属性关联表
 * <p>
 * 如果是组合属性，在这里无需关联原子成员属性。 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
public interface ICategoryAttributeService extends IService<CategoryAttribute> {


    List<AttributeValue> getAttributeValueByCatgoryId(int categoryId);




}
