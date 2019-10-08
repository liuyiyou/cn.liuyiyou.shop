package cn.liuyiyou.shop.prod.mq;

import org.springframework.stereotype.Component;

/**
 * @author: liuyiyou@liuyiyou.cn
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 liuyiyou.cn Inc. All rights reserved.
 */
@Component
public class OrderMQConsumer {

//    @KafkaListener(topics = "someTopic")
    public void processMessage(String content) {
    }
}
