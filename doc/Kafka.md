在1.x中，如果要配置kafka需要这样
```java
    @Bean
    public ProducerFactory<Integer, String> producerFactory() {
        return new DefaultKafkaProducerFactory<Integer,String>(producerConfigs());
    }
    @Bean
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<String,Object>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.180.128:9092");
        props.put("acks", "all");
        props.put("retries", 0);
        props.put("batch.size", 16384);
        props.put("linger.ms", 1);
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.IntegerSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        return props;
    }
    @Bean
    public KafkaTemplate<Integer, String> kafkaTemplate() {
        return new KafkaTemplate<Integer, String>(producerFactory());
    }
```

而在2.x中，很多都有了默认配置项，只要这样既可：

```java
     @Autowired
    KafkaProperties kafkaProperties;

    @Autowired
    private ProducerFactory producerFactory;


    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory);
    }

   
    @Bean
    public Map<String, Object> producerConfigs() {
        return kafkaProperties.buildProducerProperties();
    }

    @Bean
    public KafkaTransactionManager<String, String> kafkaTransactionManager() {
        return new KafkaTransactionManager<>(producerFactory);
    }
```

做了2.x上面的配置之后，做如下配置
```properties
# 指定kafka 代理地址，可以多个
spring.kafka.bootstrap-servers=localhost:9092
# 指定listener 容器中的线程数，用于提高并发量
spring.kafka.listener.concurrency=3

spring.kafka.producer.retries=2
# 每次批量发送消息的数量
spring.kafka.producer.batch-size=1000
# 指定默认消费者group id
spring.kafka.consumer.group-id=orderGroup
# 指定默认topic id
spring.kafka.template.default-topic=topic-1

spring.kafka.producer.transaction-id-prefix=test.transaction

```
发现虽然能启动成功，但是请求一直不行，能到控制层，但是如果下一层里面有 @Autowired KafkaTemplate 则不会跳入，去掉这个注释
最后发现是这个注释引起的
//    @Bean
//    public KafkaTransactionManager<String, String> kafkaTransactionManager() {
//        return new KafkaTransactionManager<>(producerFactory);
//    }



去掉该注释后：报错 Producer factory does not support transactions

加上这个后：
spring.kafka.producer.transaction-id-prefix=test.transaction 又回到卡死状态，所以应该是这条属性引起的


在java代码里去掉所有的东西，配置文件和发送方式如下

spring.kafka.producer.transaction-id-prefix=test.transaction
+
 kafkaTemplate.send("topic-1", "key", "sku增加1");
 
 还是卡死
 
 
 https://github.com/spring-projects/spring-kafka/issues/513 
 看到这个试一下，把kafka放到虚拟机上，但是连不上
 
 
 https://blog.csdn.net/shangboerds/article/details/39033267