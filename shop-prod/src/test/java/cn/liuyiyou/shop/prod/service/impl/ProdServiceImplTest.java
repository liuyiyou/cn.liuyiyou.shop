package cn.liuyiyou.shop.prod.service.impl;

import cn.liuyiyou.shop.prod.entity.Prod;
import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/23
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class ProdServiceImplTest {

    @Test
    public void optionalTest(){
        List<Prod> prods = prods();
        System.out.println(prods.size());
    }


    public List<Prod> prods() {
        ArrayList<Prod> prods = Lists.newArrayList();
        IntStream.range(1, 10).forEach(i -> {
            Prod prod = new Prod();
            prods.add(prod);
        });
        return prods;
    }

}