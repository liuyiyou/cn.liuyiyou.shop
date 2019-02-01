package cn.liuyiyou.shop.prod.controller;

import cn.liuyiyou.shop.prod.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/2
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@RestController
public class DemoConsumerController {

    @Autowired
    private DemoService demoService;

    @RequestMapping("/sayHello")
    public String sayHello() {
        System.out.println("service::" + demoService);
        return demoService.sayHello("liuyiyou");
    }

}
