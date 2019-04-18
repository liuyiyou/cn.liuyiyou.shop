package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.base.BaseApplicationTests;
import cn.liuyiyou.shop.base.entity.AttributeValue;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/12
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class AttributeValueServiceTest extends BaseApplicationTests {


    @Autowired
    private AttributeValueService attributeValueService;

    @Test
    public void list() {
        List<AttributeValue> list = attributeValueService.list();

        list.forEach(System.out::println);
    }


}