package cn.liuyiyou.shop.prod.mapper;

import cn.liuyiyou.shop.prod.ShopProdApplicationTests;
import cn.liuyiyou.shop.prod.entity.Prod;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/10/30
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class ProdMapperTest extends ShopProdApplicationTests {

    @Autowired
    private ProdMapper prodMapper;

    @Test
    public void selectById(){
        Prod prod = prodMapper.selectById(210101031L);
        System.out.println(prod);
    }
}