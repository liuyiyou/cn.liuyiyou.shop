package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.entity.OrderProd;
import cn.liuyiyou.shop.order.mapper.OrderProdMapper;
import cn.liuyiyou.shop.order.service.IOrderProdService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * C端订单产品表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Service
public class OrderProdServiceImpl extends ServiceImpl<OrderProdMapper, OrderProd> implements IOrderProdService {

    @Override
    public List<OrderProd> getByOrderId(Long orderId) {
        List<OrderProd> orderProds = this.list(new QueryWrapper<OrderProd>().eq("orderId", orderId));
        return orderProds;
    }
}
