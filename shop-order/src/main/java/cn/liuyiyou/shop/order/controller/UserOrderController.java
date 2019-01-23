package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static cn.liuyiyou.shop.common.web.BaseController.getUid;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/23
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Slf4j
@Api(description = "用户订单地址管理")
@RestController
@RequestMapping("/user/order")
public class UserOrderController {

    @Autowired
    private IOrderService orderService;

    @ApiOperation(value = "获取各个状态的订单数量")
    @GetMapping("/count")
    public Result<OrderCountRespVo> orderCount(HttpServletRequest request) {
        Integer uid = getUid(request);
        return Response.success(orderService.orderCount(uid));
    }
}
