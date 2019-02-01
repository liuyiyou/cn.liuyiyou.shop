package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.config.OrderStatusMap;
import cn.liuyiyou.shop.order.dto.OrderCountDto;
import cn.liuyiyou.shop.order.entity.Order;
import cn.liuyiyou.shop.order.entity.OrderProd;
import cn.liuyiyou.shop.order.mapper.OrderMapper;
import cn.liuyiyou.shop.order.service.IOrderProdService;
import cn.liuyiyou.shop.order.service.IOrderService;
import cn.liuyiyou.shop.order.vo.resp.OrderCountRespVo;
import cn.liuyiyou.shop.order.vo.resp.OrderInfoRespVo;
import cn.liuyiyou.shop.order.vo.resp.OrderProdListRespVo;
import cn.liuyiyou.shop.prod.service.DemoService;
import cn.liuyiyou.shop.prod.service.IProdService;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * <p>
 * C端用户产品订单表。 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Service
@Slf4j
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {


    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private IOrderProdService orderProdService;

    @Reference(version = "1.0.0")
    private DemoService demoService;


    @Reference(version = "1.0.0")
    private IProdService prodService;


    @Override
    public String sayHello() {
        System.out.println("service::" + demoService);
        String sayHello = demoService.sayHello("dubbo");
        return sayHello;
    }

    @Override
    public OrderInfoRespVo getOrderInfo(Long orderId) {
        Order order = this.getById(orderId);
        List<OrderProd> orderProds = orderProdService.list(new QueryWrapper<OrderProd>().eq("order_id", order.getOrderId()));
        List<OrderProdListRespVo> orderProdListRespVos = orderProds.stream().map(orderProd -> new OrderProdListRespVo().setOrderId(orderProd.getOrderId())
                .setProdId(orderProd.getProdId())
                .setProdName(orderProd.getProdName())
                .setProdNum(orderProd.getProdNum())
                .setAlbum(prodService.getById(orderProd.getProdId()).getAlbum())
                .setRealPrice(orderProd.getRealPrice())
                .setSkuId(orderProd.getSkuId())).collect(toList());


        OrderInfoRespVo orderInfoRespVo = new OrderInfoRespVo()
                .setOrderId(order.getOrderId())
                .setAddress(getAddress(order.getConsignAddr()))
                .setConsignee(order.getConsignee())
                .setConsignPhone(order.getConsignPhone())
                .setStatus(order.getStatus())
                .setStatusName(OrderStatusMap.STATUS_MAP.get(order.getStatus()))
                .setProds(orderProdListRespVos);
        return orderInfoRespVo;
    }

    @Override
    public IPage<Order> orderPage(int uid, int pageNum, int pageSize) {
        Page page = new Page(pageNum, pageSize);
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


    private String getAddress(String consignAddr) {
        if (StringUtils.isEmpty(consignAddr)) {
            return "";
        } else {
            JSONObject addrObject = JSONArray.parseObject(consignAddr);
            return addrObject.getString("prov") + addrObject.getString("city") + addrObject.getString("country") + addrObject.getString("addr");
        }
    }

}
