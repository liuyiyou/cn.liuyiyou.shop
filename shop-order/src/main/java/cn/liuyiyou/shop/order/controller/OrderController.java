package cn.liuyiyou.shop.order.controller;


import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.entity.OrderProd;
import cn.liuyiyou.shop.order.service.IOrderProdService;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.req.OrderListReqVo;
import cn.liuyiyou.shop.order.vo.resp.OrderInfoRespVo;
import cn.liuyiyou.shop.order.vo.resp.OrderListRespVo;
import cn.liuyiyou.shop.order.vo.resp.OrderProdListRespVo;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

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

    private static Map<Integer, String> statusMap = new ConcurrentHashMap<>();

    static {
        statusMap.put(1, "待支付");
        statusMap.put(2, "待发货");
        statusMap.put(3, "待确认收货");
        statusMap.put(4, "交易完成");
        statusMap.put(5, "订单关闭");

    }

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderProdService orderProdService;


    @ApiOperation("订单列表")
    @PostMapping("/list")
    public Result list(@RequestBody @NotNull OrderListReqVo orderListReqVo) {
        log.info("map大小::" + statusMap.size());
        Page<Order> pageQuery = new Page<>(orderListReqVo.getPageNum(), orderListReqVo.getPageSize());
        LambdaQueryWrapper<Order> wrapper = new QueryWrapper<Order>().lambda().select()
                .eq(Order::getUid, 1);
        if (orderListReqVo.getStatus() != null && orderListReqVo.getStatus() != 0) {
            wrapper.eq(Order::getStatus, orderListReqVo.getStatus());
        }
        wrapper.orderByDesc(Order::getOrderId);
        IPage<Order> orderIPage = orderService.page(pageQuery, wrapper);
        Page<OrderListRespVo> result = new Page<>(orderIPage.getCurrent(), orderIPage.getSize(), orderIPage.getTotal());
        List<OrderListRespVo> orderListRespVos = orderIPage.getRecords().stream().map(order -> {
            List<OrderProd> orderProds = orderProdService.list(new QueryWrapper<OrderProd>().eq("order_id", order.getOrderId()));
            List<OrderProdListRespVo> orderProdListRespVos = orderProds.stream().map(orderProd -> new OrderProdListRespVo().setOrderId(orderProd.getOrderId())
                    .setProdId(orderProd.getProdId())
                    .setProdName(orderProd.getProdName())
                    .setProdNum(orderProd.getProdNum())
                    .setRealPrice(orderProd.getRealPrice())
                    .setSkuId(orderProd.getSkuId())).collect(toList());
            return new OrderListRespVo()
                    .setOrderId(order.getOrderId())
                    .setStatus(order.getStatus())
                    .setStatusName(statusMap.get(order.getStatus()))
                    .setProds(orderProdListRespVos);
        }).collect(Collectors.toList());
        result.setRecords(orderListRespVos);
        return Response.success().setData(result);
    }

    @ApiOperation("订单详情")
    @GetMapping("/{id}")
    public Result list(@PathVariable("id") Long orderId) {
        Order order = orderService.getById(orderId);

        List<OrderProd> orderProds = orderProdService.list(new QueryWrapper<OrderProd>().eq("order_id", order.getOrderId()));
        List<OrderProdListRespVo> orderProdListRespVos = orderProds.stream().map(orderProd -> new OrderProdListRespVo().setOrderId(orderProd.getOrderId())
                .setProdId(orderProd.getProdId())
                .setProdName(orderProd.getProdName())
                .setProdNum(orderProd.getProdNum())
                .setRealPrice(orderProd.getRealPrice())
                .setSkuId(orderProd.getSkuId())).collect(toList());



        OrderInfoRespVo orderInfoRespVo = new OrderInfoRespVo()
                .setOrderId(order.getOrderId())
                .setAddress(getAddress(order.getConsignAddr()))
                .setConsignee(order.getConsignee())
                .setConsignPhone(order.getConsignPhone())
                .setStatus(order.getStatus())
                .setStatusName(statusMap.get(order.getStatus()))
                .setProds(orderProdListRespVos);
        return Response.success().setData(orderInfoRespVo);
    }


    @ApiOperation("订单提交")
    @GetMapping("/add/{id}")
    public Result add(@PathVariable("id") Long orderId) {
        //createOrder
        //createOrderProdSku
        //frezzProdSku

        return null;
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


    private String getAddress(String consignAddr) {
        if (StringUtils.isEmpty(consignAddr)) {
            return "";
        } else {
            JSONObject addrObject = JSONArray.parseObject(consignAddr);
            return addrObject.getString("prov") + addrObject.getString("city") + addrObject.getString("country") + addrObject.getString("addr");
        }
    }

}

