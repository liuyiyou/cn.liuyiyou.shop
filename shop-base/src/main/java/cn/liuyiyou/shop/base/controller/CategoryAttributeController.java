package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.service.ICategoryAttributeService;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.vo.PageVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

/**
 * <p>
 * 类目属性关联表

如果是组合属性，在这里无需关联原子成员属性。 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@RestController
@RequestMapping("/categoryAttribute")
public class CategoryAttributeController {


    @Autowired
    private ICategoryAttributeService categoryAttributeService;







}

