package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.prod.entity.Prod;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Slf4j
@RestController
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/prods")
    public IPage<Prod> prods() {
        String page = restTemplate.getForEntity("http://PROD-SERVICE/prod/list", String.class).getBody();
        Page<Prod> prodPage = JSONObject.parseObject(page, new TypeReference<Page<Prod>>() {
        });
//        TypeReference<Page<Prod>> typeReference = new TypeReference<Page<Prod>>() {};
//        IPage<Prod> prodIPage = JSONObject.parseObject(page, typeReference);
        return prodPage;
    }

}
