package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.base.service.DemoService;
import com.alibaba.dubbo.config.annotation.Service;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/2
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Service(
        version = "${dubbo.service.version}",
        application = "${dubbo.application.id}",
        protocol = "${dubbo.protocol.id}",
        registry = "${dubbo.registry.id}"
)
@org.springframework.stereotype.Service
public class DefaultDemoService implements DemoService {

    public String sayHello(String name) {
        return "Hello, " + name + " (from Spring Boot)";
    }

}
