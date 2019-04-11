package cn.liuyiyou.shop.prod.controller;


import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.web.BaseController;
import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.service.IProdService;
import cn.liuyiyou.shop.prod.vo.AdminProdListRespVo;
import cn.liuyiyou.shop.prod.vo.ProdListReqVo;
import cn.liuyiyou.shop.prod.vo.ProdListRespVo;
import cn.liuyiyou.shop.prod.vo.ProdVo;
import cn.liuyiyou.shop.prod.vo.SimpleProdVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 商品基本信息表 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-30
 */
@RestController
@RequestMapping("/prod")
public class ProdController extends BaseController {

    @Autowired
    private IProdService prodService;


    @GetMapping("{id}")
    public Result<ProdVo> getById(@PathVariable("id") Long id) {
        ProdVo prodvo = prodService.getProdById(id);
        return Response.success(prodvo);
    }


    @PostMapping("/list")
    public Result<IPage<ProdListRespVo>> list(@RequestBody ProdListReqVo prodListReqVo) {
        IPage<ProdListRespVo> prodListRespVoIPage = prodService.prodPage(prodListReqVo);
        return Response.success(prodListRespVoIPage);
    }

    @PostMapping("/admin-list")
    public Result<IPage<AdminProdListRespVo>> adminList(@RequestBody ProdListReqVo prodListReqVo) {
        IPage<AdminProdListRespVo> adminProdListRespVoIPage = prodService.adminProdPage(prodListReqVo);
        return Response.success(adminProdListRespVoIPage);
    }


    @GetMapping("/prods/{brandId}/{page}-{pageSize}")
    public IPage<Prod> list(@PathVariable("brandId") int brandId, @PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        Page<Prod> pageQuery = new Page<>(page, pageSize);
        LambdaQueryWrapper<Prod> wrapper = new QueryWrapper<Prod>().lambda().select().eq(Prod::getBrandId, brandId);
        IPage<Prod> prodIPage = prodService.page(pageQuery, wrapper);
        return prodIPage;
    }

}

