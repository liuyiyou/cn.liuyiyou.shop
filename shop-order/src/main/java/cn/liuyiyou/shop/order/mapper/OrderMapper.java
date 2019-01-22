package cn.liuyiyou.shop.order.mapper;

import cn.liuyiyou.shop.order.dto.OrderCountDto;
import cn.liuyiyou.shop.order.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * C端用户产品订单表。 Mapper 接口
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Repository
public interface OrderMapper extends BaseMapper<Order> {

    OrderCountDto getOrderCountByStatus(int uid);
}
