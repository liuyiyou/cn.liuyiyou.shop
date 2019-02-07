package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.order.service.IOrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

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
public class DubboAndCloudController {


    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    private IOrderService orderService;

    @GetMapping("/sayHello")
    public String sayHello() {
        return orderService.sayHello();
    }

    @GetMapping("/testRibbo")
    public String test() {
        String body = restTemplate.getForEntity("http://USER-SERVICE/user/delivery", String.class).getBody();
        return body;
    }

}
