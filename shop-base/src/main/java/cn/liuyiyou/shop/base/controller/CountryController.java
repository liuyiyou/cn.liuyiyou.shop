package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Country;
import cn.liuyiyou.shop.base.service.CountryService;
import cn.liuyiyou.shop.common.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 国家（商品原产地）定义表 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
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

