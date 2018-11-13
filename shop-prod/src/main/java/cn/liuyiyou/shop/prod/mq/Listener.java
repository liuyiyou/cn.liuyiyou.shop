package cn.liuyiyou.shop.prod.mq;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Slf4j
@Component
public class Listener {

//    @KafkaListener(topics = {"topic-1"})
//    @Transactional()
//    public void listen(ConsumerRecord<?, ?> record) {
//        log.info("kafka的key: " + record.key());
//        log.info("kafka的value: " + record.value().toString());
//    }
}
