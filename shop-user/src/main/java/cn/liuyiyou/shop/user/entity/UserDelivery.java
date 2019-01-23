package cn.liuyiyou.shop.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("user_delivery")
public class UserDelivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * UID，user.id
     */
    private Integer uid;
    /**
     * 收货人姓名
     */
    private String consignee;
    /**
     * 联系电话(手机号码)
     */
    @TableField("consign_tel")
    private String consignTel;
    /**
     * 收货人身份证号码
     */
    @TableField("consign_idno")
    private String consignIdno;
    /**
     * 收货人所在区（对应ibalife_base.base_county.county_id）
     */
    @TableField("consign_county")
    private Integer consignCounty;
    /**
     * 收货人所在省（对应ibalife_base.base_province.prov_id）
     */
    @TableField("consign_province")
    private Integer consignProvince;
    /**
     * 收货人所在市（对应ibalife_base.base_city.city_id）
     */
    @TableField("consign_city")
    private Integer consignCity;
    /**
     * 是否是默认地址
     */
    private Boolean defaultAddr;
    /**
     * 收货人地址格式为{"addr":"奥体中心10区309室","city":"广州市","country":"天河区","prov":"广东省"}
     */
    @TableField("consign_addr")
    private String consignAddr;
    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 地址对应的联系人身份证记录id行user_consignee.id
     */
    @TableField("consign_id")
    private Long consignId;


}
