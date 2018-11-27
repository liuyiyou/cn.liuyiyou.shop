package cn.liuyiyou.shop.order.controller;


import cn.liuyiyou.shop.common.resp.Response;
import cn.liuyiyou.shop.order.busi.IOrderManager;
import cn.liuyiyou.shop.order.vo.SubmitVo;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/addOrderNoTransaction")
    public Response addOrderNoTransaction(@RequestBody SubmitVo submitVo) {
        orderManager.addOrderNoTransaction(submitVo);
        return Response.builder().result("success").build();
    }

    @PostMapping("/addOrderTransactionUseLocalMessage")
    public Response addOrderTransactionUseLocalMessage(@RequestBody SubmitVo submitVo) {
        orderManager.addOrderTransactionUseLocalMessage(submitVo);
        return Response.builder().result("success").build();
    }

    @GetMapping("/list")
    public Response  list(@RequestParam(value = "reqBody") String reqBody){
        JSONObject json = JSONObject.parseObject(reqBody);
        return Response.builder().result(orderManager.getMyOrder(json)).build();
    }

}

