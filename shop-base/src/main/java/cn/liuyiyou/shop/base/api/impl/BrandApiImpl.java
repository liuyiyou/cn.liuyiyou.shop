package cn.liuyiyou.shop.base.api.impl;

import cn.liuyiyou.shop.base.api.BrandApi;
import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: liuyiyou.cn
 * @date: 2019/5/14
 * @version: V1.0
 */
@RestController
public class BrandApiImpl implements BrandApi {

    @Autowired
    private IBrandService brandService;

    /**
     * 这里不需要@RequestMapping注解，但是 @PathVariable 必须，否则无法获取id
     * @param id
     * @return
     */
    @Override
    public Brand getBrandByFeigh(@PathVariable Long id) {
        return brandService.getById(id);
    }
}
