package cn.liuyiyou.shop.order.service;

import cn.liuyiyou.shop.order.entity.OrderProd;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * C端订单产品表 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
public interface IOrderProdService extends IService<OrderProd> {

    /**
     * 根据订单状态获取订单的商品
     * @param orderId
     * @return
     */
    List<OrderProd> getByOrderId(Long orderId);
}
