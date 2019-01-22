package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.dto.OrderCountDto;
import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.mapper.OrderMapper;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public OrderCountRespVo orderCount(int uid) {
        OrderCountDto orderCountDto = orderMapper.getOrderCountByStatus(uid);
        OrderCountRespVo vo = new OrderCountRespVo();
        if (orderCountDto.getStatus() == 1) {
            vo.setNeedPay(orderCountDto.getCount());
        }
        if (orderCountDto.getStatus() == 2) {
            vo.setNeedSend(orderCountDto.getCount());
        }
        if (orderCountDto.getStatus() == 3) {
            vo.setNeedCofrim(orderCountDto.getCount());
        }
        if (orderCountDto.getStatus() == 4) {
            vo.setNeedComment(orderCountDto.getCount());
        }
        return vo;
    }
}
