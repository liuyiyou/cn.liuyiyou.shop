package cn.liuyiyou.shop.order.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 收货地址管理
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserDeliveryVo implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;
    private Integer uid;
    private String consignee;
    private String consignTel;
    private String consignIdno;
    private Integer consignCounty;
    private Integer consignProvince;
    private Integer consignCity;
    private Boolean defaultAddr;
    private String consignAddr;
    private Long consignId;


}
