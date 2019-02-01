package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.prod.service.DemoService;
import com.alibaba.dubbo.config.annotation.Reference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/30
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@RestController
public class DubboClientController {

    //, url = "dubbo://localhost:20880/cn.liuyiyou.shop.prod.service.DemoServie"
    @Reference(version = "1.0.0")
    private DemoService demoService;


    @GetMapping("/sayHello")
    public String sayHello() {

        //service::cn.liuyiyou.shop.prod.service.impl.DefaultDemoService@44bd5250
        System.out.println("service::" + demoService);
        String sayHello = demoService.sayHello("dubbo");
        return sayHello;
    }
}
