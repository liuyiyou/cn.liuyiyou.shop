package cn.liuyiyou.shop.prod;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * 2.x版本不需要加上 @EnableDiscoveryClient
 */
@SpringBootApplication
@MapperScan("cn.liuyiyou.shop.prod.mapper")
public class ProdApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProdApplication.class, args);
    }


    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//    @Bean
//    public KafkaTemplate<String, String> kafkaTemplate(ProducerFactory<String, String> factory) {
//        return new KafkaTemplate<>(factory);
//    }
//
//
//
//    @Autowired
//    KafkaProperties kafkaProperties;
//
//
//    @Bean
//    public Map<String, Object> producerConfigs() {
////        Map<String, Object> props = new HashMap<>();
////        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
////        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
////        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
////        return props;
//        return kafkaProperties.buildProducerProperties();
//    }
//
//    @Bean
//    public ProducerFactory<String, String> producerFactory() {
//        DefaultKafkaProducerFactory<String, String> producerFactory = new DefaultKafkaProducerFactory<>(producerConfigs());
//        producerFactory.setTransactionIdPrefix("test.transaction");
//        return producerFactory;
//    }
//
//
//    @Bean
//    public Map<String, Object> consumerConfigs() {
//        Map<String, Object> propsMap = new HashMap<>();
//        propsMap.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        propsMap.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
//        propsMap.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "100");
//        propsMap.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, "15000");
//        propsMap.put(ConsumerConfig.GROUP_ID_CONFIG,"orderGroup");
//        propsMap.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        propsMap.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        return propsMap;
//    }
//
//    @Bean
//    public KafkaListenerContainerFactory<?> kafkaListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(consumerFactory());
//        factory.getContainerProperties().setPollTimeout(3000);
//        factory.getContainerProperties().setTransactionManager(new KafkaTransactionManager<>(producerFactory()));
//        return factory;
//    }
//
//    @Bean
//    public ConsumerFactory<String, String> consumerFactory() {
//        return new DefaultKafkaConsumerFactory(consumerConfigs(), new StringDeserializer(), new StringDeserializer());
//    }

}
