//package cn.liuyiyou.shop.order.busi.impl;
//
//import cn.liuyiyou.shop.order.busi.IOrderManager;
//import cn.liuyiyou.shop.order.entity.Order;
//import cn.liuyiyou.shop.order.entity.OrderProd;
//import cn.liuyiyou.shop.order.entity.TransactionMessage;
//import cn.liuyiyou.shop.order.service.IOrderProdService;
//import cn.liuyiyou.shop.order.service.IOrderService;
//import cn.liuyiyou.shop.order.service.ITransactionMessageService;
//import cn.liuyiyou.shop.order.third.IProdService;
//import cn.liuyiyou.shop.order.vo.Prod;
//import cn.liuyiyou.shop.order.vo.ProdSkuVo;
//import cn.liuyiyou.shop.order.vo.SubmitVo;
//import com.alibaba.fastjson.JSONObject;
//import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.concurrent.ExecutionException;
//
///**
// * @author: liuyiyou@yanglaoban.com
// * @date: 2018/11/5
// * @version: V1.0
// * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
// */
//@Service
//@Slf4j
//public class OrderManager implements IOrderManager {
//
//    @Autowired
//    private IOrderService orderService;
//    @Autowired
//    private IOrderProdService orderProdService;
//    @Autowired
//    private IProdService prodService;
//    @Autowired
//    private ITransactionMessageService transactionMessageService;
//
//    //
////    @Autowired
////    private KafkaTemplate kafkaTemplate;
//
//
//    public static Long gerOrderId() {
//        return Long.valueOf(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
//    }
//
//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public void addOrderNoTransaction(SubmitVo submitVo) {
//
//        Long orderId = gerOrderId();
//
//        //所属db为shop_order
//        Order order = new Order();
//        order.orderId(orderId)
//                .uid(1)
//                .payType(submitVo.getPayType())
//                .createTime(LocalDateTime.now())
//        ;
//        orderService.save(order);
//        log.info("新增订单成功");
//
//        Prod prod = prodService.getProdById(submitVo.getProdId());
//        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
//        OrderProd orderProd = new OrderProd();
//        orderProd.setOrderId(orderId);
//        orderProd.setProdId(prod.getProdId());
//        orderProd.setUid(1);
//        orderProd.setSkuId(prodSkuVo.getSkuId());
//        BeanUtils.copyProperties(prod, orderProd);
//        orderProdService.save(orderProd);
//        log.info("新增订单商品成功");
//
//        //所属db为shop_order
//        TransactionMessage transactionMessage = new TransactionMessage();
//        transactionMessage.setCreateTime(LocalDateTime.now());
//        transactionMessage.setMsgStatus(false);
//        transactionMessage.setMsgContent("sku增加1");
//        transactionMessageService.save(transactionMessage);
//
//        //这是调用微服务 所属db为shop_prod
//        prodService.increseSaled(submitVo.getSkuId());
//    }
//
//    @Override
//    public void addOrderTransactionUseLocalMessage(SubmitVo submitVo) {
//
//
//        //这是调用微服务 所属db为shop_prod(要让这个进行回滚)
//        prodService.increseSaled(submitVo.getSkuId());
//
//
//        //所属db为shop_order
//        Order order = Order.builder()
//                .orderId(System.currentTimeMillis())
//                .uid(1)
//                .payType(submitVo.getPayType())
//                .createTime(LocalDateTime.now())
//                .build();
//        orderService.save(order);
//
//        //所属db为shop_order
//        TransactionMessage transactionMessage = new TransactionMessage();
//        transactionMessage.setCreateTime(LocalDateTime.now());
//        transactionMessage.setMsgStatus(false);
//        transactionMessage.setMsgContent("sku增加1");
//        transactionMessageService.save(transactionMessage);
//
//        //这是调用微服务 所属db为shop_prod
//        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
//        Prod prod = prodService.getProdById(prodSkuVo.getProdId());
//
//        OrderProd orderProd = new OrderProd();
//        orderProd.setProdId(prod.getProdId());
//        orderProd.setUid(1);
////        orderProd.setSkuId(submitVo.getSkuId());
//        BeanUtils.copyProperties(prod, orderProd);
//        orderProdService.save(orderProd);
//
//
//    }
//
//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public void addOrder2(SubmitVo submitVo) throws ExecutionException, InterruptedException {
//
////        ListenableFuture send = kafkaTemplate.send("topic-1", "key", "sku增加1");
////        kafkaTemplate.executeInTransaction(kafkaOperations ->
////                kafkaOperations.send("topic-1", "key", "sku增加1")
////        );
////        send.addCallback(new ListenableFutureCallback() {
////            @Override
////            public void onFailure(Throwable ex) {
////                ex.printStackTrace();
////            }
////
////            @Override
////            public void onSuccess(Object result) {
////                System.out.println(result);
////            }
////        });
//        Order order = Order.builder()
//                .orderId(System.currentTimeMillis())
//                .uid(1)
//                .payType(submitVo.getPayType())
//                .createTime(LocalDateTime.now())
//                .build();
//        order.setOrderId(System.currentTimeMillis());
//        order.setUid(1);
//        order.setPayType(submitVo.getPayType());
//        order.setTotalPrice(submitVo.getPayAmount());
//        orderService.save(order);
//
//        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
//        Prod prod = prodService.getProdById(prodSkuVo.getProdId());
//
//        OrderProd orderProd = new OrderProd();
//        orderProd.setProdId(prod.getProdId());
//        orderProd.setUid(1);
////        orderProd.setSkuId(1111L);
//        BeanUtils.copyProperties(prod, orderProd);
//        orderProdService.save(orderProd);
//
//
//        TransactionMessage transactionMessage = new TransactionMessage();
//        transactionMessage.setCreateTime(LocalDateTime.now());
//        transactionMessage.setMsgStatus(false);
//        transactionMessage.setMsgContent("sku增加1");
//        transactionMessageService.save(transactionMessage);
//    }
//
//    @Override
//    @Transactional
//    public void addOrderTransaction() {
////        ListenableFuture send = kafkaTemplate.send("topic-1", "key", "sku增加1");
//////        kafkaTemplate.executeInTransaction(kafkaOperations ->
//////                kafkaOperations.send("topic-1", "key", "sku增加1")
//////        );
////        send.addCallback(new ListenableFutureCallback() {
////            @Override
////            public void onFailure(Throwable ex) {
////                ex.printStackTrace();
////            }
////
////            @Override
////            public void onSuccess(Object result) {
////                System.out.println(result);
////            }
////        });
//        Order order = new Order();
//        order.setOrderId(System.currentTimeMillis());
//        order.setUid(1);
//        order.setPayType(1);
//        order.setTotalPrice(11.1F);
//        orderService.save(order);
//
//        ProdSkuVo prodSkuVo = prodService.getProdSkuById(21010100901L);
//        Prod prod = prodService.getProdById(prodSkuVo.getProdId());
//
//        OrderProd orderProd = new OrderProd();
//        orderProd.setProdId(prod.getProdId());
//        orderProd.setUid(1);
////        orderProd.setSkuId(1111L);
//        BeanUtils.copyProperties(prod, orderProd);
//        orderProdService.save(orderProd);
//
//
//        TransactionMessage transactionMessage = new TransactionMessage();
//        transactionMessage.setCreateTime(LocalDateTime.now());
//        transactionMessage.setMsgStatus(false);
//        transactionMessage.setMsgContent("sku增加1");
//        transactionMessageService.save(transactionMessage);
//    }
//
//    @Override
//    public void addOrder3(SubmitVo submitVo) {
//        prodService.increseSaled(submitVo.getSkuId());
//        Order order = new Order();
//        order.setOrderId(System.currentTimeMillis());
//        order.setUid(1);
//        order.setPayType(submitVo.getPayType());
//        order.setTotalPrice(submitVo.getPayAmount());
//        orderService.save(order);
//
//        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
//        Prod prod = prodService.getProdById(prodSkuVo.getProdId());
//
//        OrderProd orderProd = new OrderProd();
//        orderProd.setProdId(prod.getProdId());
//        orderProd.setUid(1);
//        BeanUtils.copyProperties(prod, orderProd);
//        orderProdService.save(orderProd);
//    }
//
//    /**
//     * todo: uid要使用当前登陆的用户
//     *
//     * @param json
//     * @return
//     */
//    @Override
//    public IPage<Order> getMyOrder(JSONObject json) {
//        Integer page = json.getInteger("page");
//        Integer pageSize = json.getInteger("pageSize");
//        Page<Order> pageQuery = new Page<>(page, pageSize);
//        LambdaQueryWrapper<Order> wrapper = new QueryWrapper<Order>().lambda().select()
//                .eq(Order::getUid, 1);
//        //相当于 if(json.getInteger("status") !=null)
//        Optional<Integer> status = Optional.ofNullable(json.getInteger("status"));
//        status.filter(integer -> integer > 0).ifPresent(integer -> {
//            wrapper.eq(Order::getStatus, integer);
//        });
//        wrapper.orderByDesc(Order::getOrderId);
//        IPage<Order> result = orderService.page(pageQuery, wrapper);
//        result.getRecords().forEach(order -> {
//            Map<String, Object> map = new HashMap<>();
//            map.put("order_id", order.getOrderId());
//            Collection<OrderProd> orderProds = orderProdService.listByMap(map);
//            order.setOrderProds(List.class.cast(orderProds));
//        });
//        return result;
//    }
//
//    public static void main(String[] args) {
//        Integer id = 0;
//        Optional<Integer> ddd = Optional.ofNullable(id);
//        ddd.ifPresent(integer -> {
//            System.out.println("xxx");
//        });
//    }
//}
