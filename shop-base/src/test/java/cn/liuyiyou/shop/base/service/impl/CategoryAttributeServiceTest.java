package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.base.BaseApplicationTests;
import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.entity.CategoryAttribute;
import cn.liuyiyou.shop.base.service.ICategoryService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/12
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class CategoryAttributeServiceTest extends BaseApplicationTests {


    @Autowired
    private CategoryAttributeService categoryAttributeService;
    @Autowired
    private ICategoryService categoryService;


    @Test
    public void getAllAttributeByCataId() {
        List<Category> thirdCategories = categoryService.findListByLevel(3);
        Integer integer = thirdCategories.stream().findAny().map(Category::getCataId).orElse(-1);
        List<CategoryAttribute> list = categoryAttributeService.list(new LambdaQueryWrapper<CategoryAttribute>().eq(CategoryAttribute::getCataId, integer));
        list.forEach(System.out::println);

    }

}