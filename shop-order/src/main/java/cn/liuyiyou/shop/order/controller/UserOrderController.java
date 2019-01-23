package cn.liuyiyou.shop.order.controller;

import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
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
@RestController
@RequestMapping("/user/order")
public class UserOrderController {

    @Autowired
    private IOrderService orderService;

    @GetMapping("/count")
    public Result<OrderCountRespVo> orderCount(HttpServletRequest request) {
        String uid = getUid(request);
        return Response.success(orderService.orderCount(Integer.valueOf(uid)));
    }
}
