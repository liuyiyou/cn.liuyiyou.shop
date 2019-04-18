package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Attribute;
import cn.liuyiyou.shop.base.entity.AttributeValue;
import cn.liuyiyou.shop.base.service.IAttributeService;
import cn.liuyiyou.shop.base.service.IAttributeValueService;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.common.vo.PageVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


/**
 * <p>
 * 属性定义表
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Api(description = "属性相关接口")
@RestController
@RequestMapping("/attribute")
public class AttributeController {

    @Autowired
    private IAttributeService attributeService;

    @Autowired
    private IAttributeValueService attributeValueService;


    @ApiOperation("属性列表")
    @PostMapping("/list")
    public Result<IPage<Attribute>> list(@RequestBody @NotNull PageVo pageVo) {
        IPage<Attribute> attributeIPage = attributeService.getAttributeByPage(pageVo);
        return Response.success(attributeIPage);
    }


    @ApiOperation("根据属性id获取该属性的属性列表")
    @GetMapping("/{id}/values")
    public Result<List<AttributeValue>> getAttributeValueByAttributeID(@PathVariable("id") int id) {
        Attribute attribute = attributeService.getById(id);
        String[] valueIdArray = attribute.getValIds().split(",");
        List<Integer> valueIds = Arrays.stream(valueIdArray).map(Integer::valueOf).collect(Collectors.toList());
        List<AttributeValue> list = attributeValueService.list(new LambdaQueryWrapper<AttributeValue>().in(AttributeValue::getValId, valueIds));
        return Response.success(list);
    }
}

