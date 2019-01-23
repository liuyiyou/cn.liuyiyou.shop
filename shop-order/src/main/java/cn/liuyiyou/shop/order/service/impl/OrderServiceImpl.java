package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.dto.OrderCountDto;
import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.mapper.OrderMapper;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public IPage<Order> orderPage(int uid,int pageNum,int pageSize) {
        Page page = new Page(pageNum,pageSize);
        IPage pageResult = this.page(page, new QueryWrapper<Order>().eq("uid", uid));
        return pageResult;
    }

    @Override
    public OrderCountRespVo orderCount(int uid) {
        List<OrderCountDto> orderCountDtos = orderMapper.getOrderCountByStatus(uid);
        OrderCountRespVo vo = new OrderCountRespVo();
        orderCountDtos.forEach(orderCountDto -> {
            if (orderCountDto.getStatus() == 1) {
                vo.setNeedPay(orderCountDto.getCount());
            }
            if (orderCountDto.getStatus() == 2) {
                vo.setNeedSend(orderCountDto.getCount());
            }
            if (orderCountDto.getStatus() == 3) {
                vo.setNeedConfirm(orderCountDto.getCount());
            }
            if (orderCountDto.getStatus() == 4) {
                vo.setNeedComment(orderCountDto.getCount());
            }
        });
        return vo;
    }
}
