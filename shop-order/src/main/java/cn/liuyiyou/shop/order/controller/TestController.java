package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.prod.service.DemoService;
import com.alibaba.dubbo.config.annotation.Reference;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/8
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@RestController
@CrossOrigin
@RequestMapping("/test")
@Slf4j
public class TestController {

    @Autowired
    private RestTemplate restTemplate;

    @Reference(version = "1.0.0")
    private DemoService demoService;


    @GetMapping("/testDubbo")
    public String sayHello() {
        if (Objects.isNull(demoService)) {
            throw new RuntimeException("prod-service 未启动，无法调用dubbo");
        }
        String sayHello = demoService.sayHello("dubbo");
        return sayHello;
    }

    @GetMapping("/testRibbo")
    public String test() {
        String body = restTemplate.getForEntity("http://USER-SERVICE/user/delivery", String.class).getBody();
        return body;
    }

}
