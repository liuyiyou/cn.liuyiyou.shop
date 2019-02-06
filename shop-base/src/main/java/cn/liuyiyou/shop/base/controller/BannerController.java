package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.IBannerService;
import cn.liuyiyou.shop.base.vo.BannerVo;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.web.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Api("Banner")
@RestController
@RequestMapping("/banner")
@CrossOrigin
public class BannerController extends BaseController {


    @Autowired
    private IBannerService bannerService;

    @ApiOperation("首页Banner")
    @GetMapping(value = "/list")
    public Result<List<BannerVo>> banners() {
        return Response.success(bannerService.list().stream().map(banner -> {
            BannerVo bannerVo = new BannerVo();
            bannerVo.setPic(banner.getPic()).setUrl(banner.getTargetUrl());
            return bannerVo;
        }).collect(Collectors.toList()).subList(1, 5));
    }


}

