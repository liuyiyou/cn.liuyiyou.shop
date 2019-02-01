package cn.liuyiyou.shop.prod.service.impl;

import cn.liuyiyou.shop.prod.service.DemoService;
import com.alibaba.dubbo.config.annotation.Service;
import org.springframework.beans.factory.annotation.Value;

@Service(version = "${prod.service.version}")
@org.springframework.stereotype.Service
public class DefaultDemoService implements DemoService {


    @Value("${dubbo.application.name}")
    private String serviceName;

    @Override
    public String sayHello(String name) {
        return String.format("[%s] : Hello, %s", serviceName, name);
    }


}
