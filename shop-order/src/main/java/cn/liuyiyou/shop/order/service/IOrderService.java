package cn.liuyiyou.shop.order.service;

import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
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


    /**
     * 用户各个状态下的订单数量
     *
     * @param uid
     * @return
     */
    OrderCountRespVo orderCount(int uid);


    IPage<Order> orderPage(int uid);

}
