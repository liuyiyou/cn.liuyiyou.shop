package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * <p>
 * 移动端导航推荐表（首页导航栏中选取导航）
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@TableName("select_nav4boss")
public class SelectNav4boss extends Model<SelectNav4boss> {

    private static final long serialVersionUID = 1L;

    /**
     * 导航id
     */
    @TableId("nav_id")
    private Integer navId;
    /**
     * 导航名称
     */
    @TableField("nav_name")
    private String navName;
    /**
     * 导航跳转url
     */
    @TableField("nav_url")
    private String navUrl;
    /**
     * 导航banner
     */
    private String banner;
    /**
     * 导航banner第二版
     */
    @TableField("banner_v2")
    private String bannerV2;
    /**
     * 导航banner第二版宽度
     */
    private Integer width;
    /**
     * 导航banner第二版高度
     */
    private Integer height;
    /**
     * 权重
     */
    private Integer weight;
    /**
     * 状态，0-隐藏，1-启用
     */
    private Integer status;
    /**
     * 导航创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 导航状态修改时间
     */
    @TableField("status_time")
    private LocalDateTime statusTime;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;
    /**
     * 最后修改时间
     */
    @TableField("last_update")
    private LocalDate lastUpdate;
    /**
     * 图标地址
     */
    private String icon;


    public Integer getNavId() {
        return navId;
    }

    public void setNavId(Integer navId) {
        this.navId = navId;
    }

    public String getNavName() {
        return navName;
    }

    public void setNavName(String navName) {
        this.navName = navName;
    }

    public String getNavUrl() {
        return navUrl;
    }

    public void setNavUrl(String navUrl) {
        this.navUrl = navUrl;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getBannerV2() {
        return bannerV2;
    }

    public void setBannerV2(String bannerV2) {
        this.bannerV2 = bannerV2;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getStatusTime() {
        return statusTime;
    }

    public void setStatusTime(LocalDateTime statusTime) {
        this.statusTime = statusTime;
    }

    public Long getUpdateSuid() {
        return updateSuid;
    }

    public void setUpdateSuid(Long updateSuid) {
        this.updateSuid = updateSuid;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Override
    protected Serializable pkVal() {
        return this.navId;
    }

    @Override
    public String toString() {
        return "SelectNav4boss{" +
        ", navId=" + navId +
        ", navName=" + navName +
        ", navUrl=" + navUrl +
        ", banner=" + banner +
        ", bannerV2=" + bannerV2 +
        ", width=" + width +
        ", height=" + height +
        ", weight=" + weight +
        ", status=" + status +
        ", createTime=" + createTime +
        ", statusTime=" + statusTime +
        ", updateSuid=" + updateSuid +
        ", lastUpdate=" + lastUpdate +
        ", icon=" + icon +
        "}";
    }
}
