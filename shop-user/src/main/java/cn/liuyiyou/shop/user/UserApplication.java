package cn.liuyiyou.shop.user;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@MapperScan("cn.liuyiyou.shop.user.mapper")
@RestController
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }

//    @NacosInjected
//    private NamingService namingService;

//    @RequestMapping(value = "/get", method = GET)
//    @ResponseBody
//    public List<Instance> get(@RequestParam String serviceName) throws NacosException {
//        return namingService.getAllInstances(serviceName);
//    }

    @RequestMapping(value = "/echo/{string}", method = RequestMethod.GET)
    public String echo(@PathVariable String string) {
        return "hello Nacos Discovery " + string;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
