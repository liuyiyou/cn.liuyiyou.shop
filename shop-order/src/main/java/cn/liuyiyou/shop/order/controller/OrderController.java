package cn.liuyiyou.shop.order.controller;


import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.order.service.IOrderProdService;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.req.OrderAddReqVo;
import cn.liuyiyou.shop.order.vo.req.OrderListReqVo;
import cn.liuyiyou.shop.order.vo.resp.OrderListRespVo;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.validation.constraints.NotNull;

/**
 * <p>
 * C端用户产品订单表。 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@RestController
@CrossOrigin
@RequestMapping("/order")
@Slf4j
public class OrderController {

    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderProdService orderProdService;


    @GetMapping("/sayHello")
    public String sayHello() {
        return orderService.sayHello();
    }

    @GetMapping("/testRibbo")
    public String test() {
        String body = restTemplate.getForEntity("http://USER-SERVICE/user/delivery", String.class).getBody();
        return body;
    }

    @ApiOperation("订单列表")
    @PostMapping("/list")
    public Result list(@RequestBody @NotNull OrderListReqVo orderListReqVo) {
        Page<OrderListRespVo> result = orderService.getOrderList(orderListReqVo);
        return Response.success().setData(result);
    }


    @ApiOperation("订单详情")
    @GetMapping("/{id}")
    public Result list(@PathVariable("id") Long orderId) {
        return Response.success(orderService.getOrderInfo(orderId));
    }


    @ApiOperation("订单提交")
    @PostMapping("/add")
    public Result<Long> add(@RequestBody OrderAddReqVo orderAddReqVo) {
        return Response.success(orderService.createOrder(orderAddReqVo));
    }


    @ApiOperation("取消")
    @GetMapping("/cancel/{id}")
    public Result cancel(@PathVariable("id") Long orderId) {
        //closeOrder
        //returnProdSku
        return null;
    }

    @ApiOperation("订单支付")
    @GetMapping("/pay/{id}")
    public Result pay(@PathVariable("id") Long orderId) {
        //updateOrderStatus
        //prodSkuAddSaled
        //callThirdPay
        return null;
    }

    @ApiOperation("确认收货")
    @GetMapping("/confirm/{id}")
    public Result confirm(@PathVariable("id") Long orderId) {
        //updateOrderStatus
        //userAddScore
        //prodSkuAddSaled
        //
        return null;
    }

    @ApiOperation("订单删除")
    @DeleteMapping("/{id}")
    public Result delete(@PathVariable("id") Long orderId) {
        //validator only allowed  delete closed order
        //logicsDelete
        //prodSkuAddSaled
        //callThirdPay
        return null;
    }


}

