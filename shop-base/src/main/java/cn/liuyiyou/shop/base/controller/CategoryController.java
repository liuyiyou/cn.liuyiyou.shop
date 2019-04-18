package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.service.ICategoryService;
import cn.liuyiyou.shop.base.vo.CascaderVo;
import cn.liuyiyou.shop.base.vo.CategorySimpleVo;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.web.BaseController;
import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Api(description = "用户管理相关接口")
@RestController
@RequestMapping("/category")
public class CategoryController extends BaseController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/list/{page}-{pageSize}")
    public IPage<Category> list(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        return categoryService.getCategoryByPage(page, pageSize);
    }

    @GetMapping("/list/{parentId}")
    public Result<IPage<Category>> getCategoryByParentId(@PathVariable("parentId") int parentId,
                                                         @RequestParam("pageNum") int pageNum, @RequestParam("pageSize") int pageSize) {
        return Response.success(categoryService.getCategoryByParentId(parentId, pageNum, pageSize));
    }


    @GetMapping("/{id}")
    public Result<Category> getById(@PathVariable("id") int id) {
        return Response.success(categoryService.getById(id));
    }


    @ApiOperation(value = "从一级类目往下获取")
    @GetMapping("/listTree")
    public Result<List<CategorySimpleVo>> getCategoryTree() {
        return Response.success(categoryService.getCategoryTree());
    }

    @ApiOperation(value = "从一级类目往下获取")
    @GetMapping("/tree")
    public Result<List<CascaderVo>> getCategoryAdminTree() {
        return Response.success(categoryService.getCascaderVo());
    }

    @ApiOperation(value = "获取一级类目")
    @GetMapping("/list")
    public Result<List<Category>> firtCatagoryList() {
        return Response.success(categoryService.findListByLevel(1));
    }

}

