package cn.liuyiyou.shop.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@TableName("user_delivery")
public class UserDelivery extends Model<UserDelivery> {

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
     * 是否海外收货人：1表示国内；2表示海外
     */
    private Integer oversea;
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


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getConsignTel() {
        return consignTel;
    }

    public void setConsignTel(String consignTel) {
        this.consignTel = consignTel;
    }

    public String getConsignIdno() {
        return consignIdno;
    }

    public void setConsignIdno(String consignIdno) {
        this.consignIdno = consignIdno;
    }

    public Integer getConsignCounty() {
        return consignCounty;
    }

    public void setConsignCounty(Integer consignCounty) {
        this.consignCounty = consignCounty;
    }

    public Integer getConsignProvince() {
        return consignProvince;
    }

    public void setConsignProvince(Integer consignProvince) {
        this.consignProvince = consignProvince;
    }

    public Integer getConsignCity() {
        return consignCity;
    }

    public void setConsignCity(Integer consignCity) {
        this.consignCity = consignCity;
    }

    public Integer getOversea() {
        return oversea;
    }

    public void setOversea(Integer oversea) {
        this.oversea = oversea;
    }

    public String getConsignAddr() {
        return consignAddr;
    }

    public void setConsignAddr(String consignAddr) {
        this.consignAddr = consignAddr;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Long getConsignId() {
        return consignId;
    }

    public void setConsignId(Long consignId) {
        this.consignId = consignId;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "UserDelivery{" +
        ", id=" + id +
        ", uid=" + uid +
        ", consignee=" + consignee +
        ", consignTel=" + consignTel +
        ", consignIdno=" + consignIdno +
        ", consignCounty=" + consignCounty +
        ", consignProvince=" + consignProvince +
        ", consignCity=" + consignCity +
        ", oversea=" + oversea +
        ", consignAddr=" + consignAddr +
        ", createTime=" + createTime +
        ", consignId=" + consignId +
        "}";
    }
}
