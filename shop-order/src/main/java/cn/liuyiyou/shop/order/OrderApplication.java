package cn.liuyiyou.shop.order;

import cn.liuyiyou.shop.prod.service.DemoService;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.alibaba.dubbo.config.annotation.Reference;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

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

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Reference(version = "${prod.service.version}")
    private DemoService demoService;


//    @Bean
//    public ApplicationRunner runner() {
//        System.out.println("aaaaLL::"+demoService);
//        return args -> logger.info(demoService.sayHello("mercyblitz"));
//    }

    @Bean
    public Docket createRestApi() {
        ParameterBuilder ticketPar = new ParameterBuilder();
        List<Parameter> pars = new ArrayList<>();
        ticketPar.name("trackId").description("Token")
                .modelRef(new ModelRef("string")).parameterType("header")
                .required(false).build(); //header中的Authorization参数非必填，传空也可以

        pars.add(ticketPar.build());    //根据每个方法名也知道当前方法在设置什么参数
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("cn.liuyiyou.shop.order"))
                .paths(PathSelectors.any())
                .build().globalOperationParameters(pars);
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("订单中心 后台接口文档")
                .description("参数类型中带有optional表示该参数可为空，如果没有表示该参数必填")
                .termsOfServiceUrl("http://localhost:10002/")
                .version("1.0")
                .build();
    }


    @Bean
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
