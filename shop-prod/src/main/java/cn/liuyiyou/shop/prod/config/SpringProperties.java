package cn.liuyiyou.shop.prod.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.cloud.alibaba.nacos.NacosConfigProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/29
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Configuration
public class SpringProperties  {


    @Value("${spring.application.name}")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
