package cn.liuyiyou.shop.order.vo.resp;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author: liuyiyou.cn
 * @date: 2019/4/09
 * @version: V1.0
 */
@Data
@Accessors(chain = true)
public class AdminOrderListRespVo {

    private Long orderId;
    private Integer status;
    private String statusName;
    private List<OrderProdListRespVo> prods;
    private LocalDateTime createTime;
    private String consignee;
    private Float totalPrice;
    private Integer payType;
    private String payTypeName;

}
