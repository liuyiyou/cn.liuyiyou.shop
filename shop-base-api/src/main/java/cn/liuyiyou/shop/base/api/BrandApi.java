package cn.liuyiyou.shop.base.api;

import cn.liuyiyou.shop.base.entity.Brand;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author: liuyiyou.cn
 * @date: 2019/5/14
 * @version: V1.0
 */
@FeignClient(name = "BASE-SERVICE", value = "BASE-SERVICE")
public interface BrandApi {

    @RequestMapping(value = "/feign/{id}", method = RequestMethod.GET)
    Brand getBrandByFeigh(@PathVariable("id") Long id);
}
