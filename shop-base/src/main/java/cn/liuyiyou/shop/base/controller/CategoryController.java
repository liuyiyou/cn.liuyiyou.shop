package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.service.ICategoryService;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 类目定义表。
 * 支持三级继承类目：
 * cata_type=1：一级类目
 * cata_type=2：二级类目
 * cata_type=3：三级类目
 * <p>
 * 目录ID规则
 * 一级目录： 2位 （10-99）
 * 二级目录： 3位 （100-999）
 * 三级目录：4位  （1000-9999） 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
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


    @ApiOperation(value = "从一级类目往下获取")
    @GetMapping("/listTree")
    public Result<List<CategorySimpleVo>> getCategoryTree() {
        return Response.success(categoryService.getCategoryTree());
    }

    @ApiOperation(value = "获取一级类目")
    @GetMapping("/list")
    public Result<List<Category>> firtCatagoryList() {
        return Response.success(categoryService.findListByLevel(1));
    }

}

