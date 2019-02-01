//package cn.liuyiyou.shop.order.busi;
//
//import cn.liuyiyou.shop.order.entity.Order;
//import cn.liuyiyou.shop.order.vo.SubmitVo;
//import com.alibaba.fastjson.JSONObject;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//
//import java.util.concurrent.ExecutionException;
//
///**
// * @author: liuyiyou@yanglaoban.com
// * @date: 2018/11/5
// * @version: V1.0
// * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
// */
//public interface IOrderManager {
//
//
//    /**
//     * 不使用分布式事务，会出现事务不一致
//     * @param submitVo
//     */
//    void addOrderNoTransaction(SubmitVo submitVo);
//
//
//    /**
//     * 不使用分布式事务，会出现事务不一致
//     * @param submitVo
//     */
//    void addOrderTransactionUseLocalMessage(SubmitVo submitVo);
//
//    /**
//     * 使用本地消息表
//     * @param submitVo
//     */
//    void addOrder2(SubmitVo submitVo) throws ExecutionException, InterruptedException;
//
//
//
//    void addOrder3(SubmitVo submitVo);
//
//    void addOrderTransaction();
//
//    IPage<Order> getMyOrder(JSONObject json);
//}
