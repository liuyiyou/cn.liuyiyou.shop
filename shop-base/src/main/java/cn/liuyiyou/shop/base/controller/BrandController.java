package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.service.IBrandService;
import cn.liuyiyou.shop.base.vo.SimpleProdVo;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.web.BaseController;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@RestController
@CrossOrigin
@RequestMapping("/brand")
public class BrandController extends BaseController {

    @Autowired
    private IBrandService brandService;


    @GetMapping("/list")
    public Result<List<Brand>> list() {
        List<Brand> brands = brandService.getBrandByPage(1, 20).getRecords();
        return Response.success(brands);
    }


    @GetMapping("/list/{page}-{pageSize}")
    public IPage<Brand> list(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        return brandService.getBrandByPage(page, pageSize);
    }

    @GetMapping("/getBrandInfos")
    public Result<Brand> getBrandInfos(@RequestParam("brandId") Integer brandId) {
        return Response.success(brandService.getById(brandId));
    }


}

