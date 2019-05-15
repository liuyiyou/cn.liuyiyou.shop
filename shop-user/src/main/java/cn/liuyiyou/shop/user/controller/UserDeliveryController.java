package cn.liuyiyou.shop.user.controller;


import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.user.entity.UserDelivery;
import cn.liuyiyou.shop.user.service.IUserDeliveryService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static cn.liuyiyou.shop.common.web.BaseController.getUid;

/**
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@Api(description = "用户收获地址管理")
@RestController
@RequestMapping("/user/delivery")
public class UserDeliveryController {

    @Autowired
    private IUserDeliveryService userDeliveryService;

    @ApiOperation(value = "获取收货地址列表")
    @PostMapping("/list")
    public Result<List<UserDelivery>> list(HttpServletRequest request) {
        Integer uid = getUid(request);
        List<UserDelivery> userDeliveries = userDeliveryService.list(new QueryWrapper<UserDelivery>().eq("uid", uid));
        return Response.success(userDeliveries);
    }


    @ApiOperation(value = "获取收货地址详情")
    @GetMapping("/{id}")
    public Result<UserDelivery> get(@PathVariable("id") Long id, HttpServletRequest request) {
        Integer uid = getUid(request);
        UserDelivery userDelivery = userDeliveryService.getById(id);
        Assert.isTrue(userDelivery.getUid().equals(uid), "只允许编辑自己的收获地址");
        return Response.success(userDelivery);
    }

    @ApiOperation(value = "根据UId获取默认收货地址")
    @GetMapping("")
    public Result<UserDelivery> getByUid(HttpServletRequest request) {
        Integer uid = getUid(request);
        if (uid == null) {
            uid = 1;
        }
        UserDelivery userDelivery = userDeliveryService.getById(2);
//        Assert.isTrue(userDelivery.getUid().equals(uid), "只允许编辑自己的收获地址");
        return Response.success(userDelivery);
    }


    @ApiOperation(value = "编辑收货地址")
    @PostMapping("/edit")
    public Result<Boolean> edit(@RequestBody UserDelivery userDelivery, HttpServletRequest request) {
        Integer uid = getUid(request);
        Assert.notNull(userDelivery.getId(), "编辑地址，ID不能为空");
        Assert.isTrue(userDelivery.getUid().equals(uid), "只允许编辑自己的收获地址");
        boolean result = userDeliveryService.updateById(userDelivery);
        return Response.success(result);
    }




    @ApiOperation(value = "新增收货地址")
    @PutMapping("/add")
    public Result<Boolean> add(@RequestBody UserDelivery userDelivery, HttpServletRequest request) {
        Integer uid = getUid(request);
        Assert.isNull(userDelivery.getId(), "编辑地址，ID必须为空");
        Assert.isTrue(userDelivery.getUid().equals(uid), "只允许编辑自己的收获地址");
        boolean result = userDeliveryService.save(userDelivery);
        return Response.success(result);
    }


    @ApiOperation(value = "删除收货地址")
    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable("id") Long id, HttpServletRequest request) {
        Integer uid = getUid(request);
        UserDelivery userDelivery = userDeliveryService.getById(id);
        Assert.notNull(userDelivery, "编辑地址，ID不能为空");
        Assert.isTrue(userDelivery.getUid().equals(uid), "只允许删除自己的收获地址");
        boolean result = userDeliveryService.removeById(id);
        return Response.success(result);
    }
}

