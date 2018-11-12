package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.mapper.OrderMapper;
import cn.liuyiyou.shop.order.service.IOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * C端用户产品订单表。 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

}
