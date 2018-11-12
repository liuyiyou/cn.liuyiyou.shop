package cn.liuyiyou.shop.order.busi.impl;

import cn.liuyiyou.shop.order.busi.IOrderManager;
import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.entity.OrderProd;
import cn.liuyiyou.shop.order.entity.TransactionMessage;
import cn.liuyiyou.shop.order.service.IOrderProdService;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.service.ITransactionMessageService;
import cn.liuyiyou.shop.order.third.IProdService;
import cn.liuyiyou.shop.order.vo.Prod;
import cn.liuyiyou.shop.order.vo.ProdSkuVo;
import cn.liuyiyou.shop.order.vo.SubmitVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Service
@Slf4j
public class OrderManager implements IOrderManager {

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderProdService orderProdService;
    @Autowired
    private IProdService prodService;
    @Autowired
    private ITransactionMessageService transactionMessageService;

//    @Autowired
//    private DataSourceTransactionManager dataSourceTransactionManager;

    //
    @Autowired
    private KafkaTemplate kafkaTemplate;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addOrder(SubmitVo submitVo) {
//        log.info("transactionManager::{}", dataSourceTransactionManager);
//        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
//        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW); // 事物隔离级别，开启新事务
//        TransactionStatus status = dataSourceTransactionManager.getTransaction(def); // 获得事务状态
//        try {
//            prodService.increseSaled(submitVo.getSkuId());
//
//            Order order = new Order();
//            order.setOrderId(System.currentTimeMillis());
//            order.setUid(1);
//            order.setPayType(submitVo.getPayType());
//            order.setTotalPrice(submitVo.getPayAmount());
//            orderService.save(order);
//
//            ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
//            Prod prod = prodService.getProdById(prodSkuVo.getProdId());
//
//            OrderProd orderProd = new OrderProd();
//            orderProd.setProdId(prod.getProdId());
//            orderProd.setUid(1);
//            orderProd.setSkuId(submitVo.getSkuId());
//            BeanUtils.copyProperties(prod, orderProd);
//            orderProdService.save(orderProd);
//            dataSourceTransactionManager.commit(status);
//        } catch (Exception e) {
//            log.error("订单提交失败", e);
//            //库存回滚
//            prodService.decreseSaled(submitVo.getSkuId());
//            dataSourceTransactionManager.rollback(status);
//        }

    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addOrder2(SubmitVo submitVo) throws ExecutionException, InterruptedException {

        ListenableFuture send = kafkaTemplate.send("topic-1", "key", "sku增加1");
//        kafkaTemplate.executeInTransaction(kafkaOperations ->
//                kafkaOperations.send("topic-1", "key", "sku增加1")
//        );
        send.addCallback(new ListenableFutureCallback() {
            @Override
            public void onFailure(Throwable ex) {
                ex.printStackTrace();
            }

            @Override
            public void onSuccess(Object result) {
                System.out.println(result);
            }
        });
        Order order = new Order();
        order.setOrderId(System.currentTimeMillis());
        order.setUid(1);
        order.setPayType(submitVo.getPayType());
        order.setTotalPrice(submitVo.getPayAmount());
        orderService.save(order);

        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
        Prod prod = prodService.getProdById(prodSkuVo.getProdId());

        OrderProd orderProd = new OrderProd();
        orderProd.setProdId(prod.getProdId());
        orderProd.setUid(1);
//        orderProd.setSkuId(1111L);
        BeanUtils.copyProperties(prod, orderProd);
        orderProdService.save(orderProd);


        TransactionMessage transactionMessage = new TransactionMessage();
        transactionMessage.setCreateTime(LocalDateTime.now());
        transactionMessage.setMsgStatus(false);
        transactionMessage.setMsgContent("sku增加1");
        transactionMessageService.save(transactionMessage);
    }

    @Override
    @Transactional
    public void addOrderTransaction() {
        ListenableFuture send = kafkaTemplate.send("topic-1", "key", "sku增加1");
//        kafkaTemplate.executeInTransaction(kafkaOperations ->
//                kafkaOperations.send("topic-1", "key", "sku增加1")
//        );
        send.addCallback(new ListenableFutureCallback() {
            @Override
            public void onFailure(Throwable ex) {
                ex.printStackTrace();
            }

            @Override
            public void onSuccess(Object result) {
                System.out.println(result);
            }
        });
        Order order = new Order();
        order.setOrderId(System.currentTimeMillis());
        order.setUid(1);
        order.setPayType(1);
        order.setTotalPrice(11.1F);
        orderService.save(order);

        ProdSkuVo prodSkuVo = prodService.getProdSkuById(21010100901L);
        Prod prod = prodService.getProdById(prodSkuVo.getProdId());

        OrderProd orderProd = new OrderProd();
        orderProd.setProdId(prod.getProdId());
        orderProd.setUid(1);
//        orderProd.setSkuId(1111L);
        BeanUtils.copyProperties(prod, orderProd);
        orderProdService.save(orderProd);


        TransactionMessage transactionMessage = new TransactionMessage();
        transactionMessage.setCreateTime(LocalDateTime.now());
        transactionMessage.setMsgStatus(false);
        transactionMessage.setMsgContent("sku增加1");
        transactionMessageService.save(transactionMessage);
    }

    @Override
    public void addOrder3(SubmitVo submitVo) {
        prodService.increseSaled(submitVo.getSkuId());
        Order order = new Order();
        order.setOrderId(System.currentTimeMillis());
        order.setUid(1);
        order.setPayType(submitVo.getPayType());
        order.setTotalPrice(submitVo.getPayAmount());
        orderService.save(order);

        ProdSkuVo prodSkuVo = prodService.getProdSkuById(submitVo.getSkuId());
        Prod prod = prodService.getProdById(prodSkuVo.getProdId());

        OrderProd orderProd = new OrderProd();
        orderProd.setProdId(prod.getProdId());
        orderProd.setUid(1);
        BeanUtils.copyProperties(prod, orderProd);
        orderProdService.save(orderProd);
    }
}
