package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Country;
import cn.liuyiyou.shop.base.service.CountryService;
import cn.liuyiyou.shop.common.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@RestController
@RequestMapping("/country")
public class CountryController extends BaseController {
    @Autowired
    private CountryService countryService;

    @GetMapping("/{id}")
    public Country getCountryById(@PathVariable("id") String id) {
        return countryService.getCountryById(id);
    }
}

