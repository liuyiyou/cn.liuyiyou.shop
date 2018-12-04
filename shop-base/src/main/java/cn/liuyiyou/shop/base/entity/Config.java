package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。

在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。


 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
public class Config extends Model<Config> {

    //精选品牌配置
    public final static Integer CONFIG_BRAND_CHOICE = 10031;

    private static final long serialVersionUID = 1L;

    @TableId("config_id")
    private Integer configId;
    @TableField("config_value")
    private String configValue;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;
    /**
     * 使用模块 0 - 通用；1-系统；2-用户模块；3-产品模块;
     */
    private Integer modual;
    /**
     * 状态：0-未启用;1-启用
     */
    private Integer state;
    /**
     * 属性值创建时间
     */
    @TableField("create_date")
    private LocalDateTime createDate;
    /**
     * 属性值最后修改时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;
    /**
     * 备注字段，详细说明 config_value 怎么配，代表什么意思。
     */
    private String remark;


    public Integer getConfigId() {
        return configId;
    }

    public void setConfigId(Integer configId) {
        this.configId = configId;
    }

    public String getConfigValue() {
        return configValue;
    }

    public void setConfigValue(String configValue) {
        this.configValue = configValue;
    }

    public Long getUpdateSuid() {
        return updateSuid;
    }

    public void setUpdateSuid(Long updateSuid) {
        this.updateSuid = updateSuid;
    }

    public Integer getModual() {
        return modual;
    }

    public void setModual(Integer modual) {
        this.modual = modual;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDateTime lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    protected Serializable pkVal() {
        return this.configId;
    }

    @Override
    public String toString() {
        return "Config{" +
        ", configId=" + configId +
        ", configValue=" + configValue +
        ", updateSuid=" + updateSuid +
        ", modual=" + modual +
        ", state=" + state +
        ", createDate=" + createDate +
        ", lastUpdate=" + lastUpdate +
        ", remark=" + remark +
        "}";
    }
}
