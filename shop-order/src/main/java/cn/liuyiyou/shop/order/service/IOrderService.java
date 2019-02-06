package cn.liuyiyou.shop.order.service;

import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.vo.req.OrderAddReqVo;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
import cn.liuyiyou.shop.order.vo.resp.OrderInfoRespVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * C端用户产品订单表。 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
public interface IOrderService extends IService<Order> {


    String sayHello();


    /**
     * 用户各个状态下的订单数量
     *
     * @param uid
     * @return
     */
    OrderCountRespVo orderCount(int uid);


    /**
     * 用户订单列表
     *
     * @param uid
     * @param pageNum
     * @param pageSize
     * @return
     */
    IPage<Order> orderPage(int uid, int pageNum, int pageSize);

    OrderInfoRespVo getOrderInfo(Long orderId);

    Long createOrder(OrderAddReqVo orderAddReqVo);
}
