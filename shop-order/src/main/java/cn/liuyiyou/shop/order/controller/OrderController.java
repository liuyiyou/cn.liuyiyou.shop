package cn.liuyiyou.shop.order.controller;


import cn.liuyiyou.shop.order.busi.IOrderManager;
import cn.liuyiyou.shop.order.vo.SubmitVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

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
public class OrderController {

    @Autowired
    private IOrderManager orderManager;

    @PostMapping("/add")
    public String add(@RequestBody SubmitVo submitVo) throws ExecutionException, InterruptedException {
        orderManager.addOrder2(submitVo);
        return "success";
    }


    @GetMapping("/test")
    public String test() throws ExecutionException, InterruptedException {
        orderManager.addOrderTransaction();
        return "success";
    }
}

