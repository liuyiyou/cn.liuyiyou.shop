package cn.liuyiyou.shop.prod.mq;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Component
public class OrderMQConsumer {

    @KafkaListener(topics = "someTopic")
    public void processMessage(String content) {
    }
}
