package cn.liuyiyou.shop.order;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.transaction.KafkaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * 2.x版本不需要加上 @EnableDiscoveryClient
 */
@SpringBootApplication
@MapperScan("cn.liuyiyou.shop.order.mapper")
@EnableTransactionManagement
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }


    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


//    @Autowired
//    KafkaProperties kafkaProperties;

//    @Bean
//    public ProducerFactory<String, String> producerFactory() {
//        DefaultKafkaProducerFactory<String, String> producerFactory = new DefaultKafkaProducerFactory(kafkaProperties.getProperties());
//        producerFactory.setTransactionIdPrefix("trans");
//        return producerFactory;
//    }
//
//
//    @Bean
//    public KafkaTransactionManager dataSourceTransactionManager() {
//        return new KafkaTransactionManager<>(producerFactory());
//    }

    //org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'org.springframework.transaction.PlatformTransactionManager' available: expected single matching bean but found 2: dataSourceTransactionManager,kafkaTransactionManager
//    @Bean(name = "dataSourceTransactionManager")
//    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
//        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager(dataSource);
//        return dataSourceTransactionManager;
//    }

//
//    @Bean
//    public KafkaTemplate<String, String> kafkaTemplate() {
//        return new KafkaTemplate<>(producerFactory);
//    }

//    @Bean
//    public ProducerFactory<String, String> producerFactory() {
//        DefaultKafkaProducerFactory<String, String> producerFactory = new DefaultKafkaProducerFactory<>(producerConfigs());
//        producerFactory.setTransactionIdPrefix("test.transaction");
//        return producerFactory;
//    }
    //The 'ProducerFactory' must support transactions  需要配置 TransactionIdPrefix
//    @Autowired
//    private ProducerFactory producerFactory;

//    @Bean
//    public Map<String, Object> producerConfigs() {
////        Map<String, Object> props = new HashMap<>();
////        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
////        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
////        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
////        return props;
//        return kafkaProperties.buildProducerProperties();
//    }

//    @Bean
//    public KafkaTransactionManager<String, String> kafkaTransactionManager() {
//        return new KafkaTransactionManager<>(producerFactory);
//    }

}
