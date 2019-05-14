package cn.liuyiyou.shop.prod.controller;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.service.IBrandService;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * 使用Ribbon调用微服务测试
 *
 * @author: liuyiyou.cn
 * @date: 2019/5/13
 * @version: V1.0
 */
@RestController
@RequestMapping("/test")
public class TestController {


    @Autowired
    private RestTemplate restTemplate;

    @Reference(version = "1.0.0")
    private IBrandService brandService;

    /**
     * 使用Ribbon调用微服务
     *
     * @param id
     * @return
     */
    @GetMapping("/ribbon/brand/{id}")
    public Brand getBrandByRibbon(@PathVariable("id") Long id) {
        String uri = "http://BASE-SERVICE/brand/" + id;
        JSONObject body = restTemplate.getForEntity(uri, JSONObject.class).getBody();
        assert body != null;
        if (body.getBoolean("success")) {
            JSONObject data = body.getJSONObject("data");
            return JSONObject.parseObject(data.toJSONString(), Brand.class);
        }
        return new Brand();
    }


    /**
     * 使用Dubbon调用微服务
     *
     * @param id
     * @return
     */
    @GetMapping("/dubbo/brand/{id}")
    public Brand getBrandByDubbo(@PathVariable("id") Long id) {
        Brand brand = brandService.getById(id);
        return brand;
    }


    /**
     * 使用Feigh调用微服务
     *
     * @param id
     * @return
     */
    @GetMapping("/feign/brand/{id}")
    public Brand getBrandByFeigh(@PathVariable("id") Long id) {
        Brand brand = brandService.getById(id);
        return brand;
    }
}
