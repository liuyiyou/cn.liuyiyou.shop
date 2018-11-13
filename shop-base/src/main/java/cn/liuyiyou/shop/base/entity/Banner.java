package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 首页banner配置表
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
public class Banner extends Model<Banner> {

    private static final long serialVersionUID = 1L;

    /**
     * bannerId
     */
    @TableId("banner_id")
    private Integer bannerId;
    /**
     * banner类型：1-微信端,2-pc端
     */
    private Integer type;
    /**
     * 图片存储地址
     */
    private String pic;
    /**
     * 跳转目标地址
     */
    @TableField("redirect_url")
    private String redirectUrl;
    /**
     * 显示权重
     */
    private Integer weight;
    /**
     * 创建时间
     */
    @TableField("create_date")
    private LocalDateTime createDate;
    /**
     * 最后修改时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;
    /**
     * 控制端
     */
    @TableField("filter_channels")
    private String filterChannels;
    /**
     * 适用人群，1--所有用户，2--C端用户可见，3--店主可见
     */
    @TableField("apply_crowd")
    private Integer applyCrowd;
    /**
     * 有效开始时间
     */
    @TableField("start_time")
    private LocalDateTime startTime;
    /**
     * 有效结束时间
     */
    @TableField("end_time")
    private LocalDateTime endTime;
    /**
     * 首页图片banner地址
     */
    @TableField("pic_v2")
    private String picV2;
    /**
     * 图片地址的宽度
     */
    private Integer width;
    /**
     * 图片高度
     */
    private Integer height;
    /**
     * banner显示的位置 1-首页-最顶部位置,2-首页-中间的一个位置
     */
    private Integer position;


    public Integer getBannerId() {
        return bannerId;
    }

    public void setBannerId(Integer bannerId) {
        this.bannerId = bannerId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
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

    public String getFilterChannels() {
        return filterChannels;
    }

    public void setFilterChannels(String filterChannels) {
        this.filterChannels = filterChannels;
    }

    public Integer getApplyCrowd() {
        return applyCrowd;
    }

    public void setApplyCrowd(Integer applyCrowd) {
        this.applyCrowd = applyCrowd;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getPicV2() {
        return picV2;
    }

    public void setPicV2(String picV2) {
        this.picV2 = picV2;
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

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    @Override
    protected Serializable pkVal() {
        return this.bannerId;
    }

    @Override
    public String toString() {
        return "Banner{" +
        ", bannerId=" + bannerId +
        ", type=" + type +
        ", pic=" + pic +
        ", redirectUrl=" + redirectUrl +
        ", weight=" + weight +
        ", createDate=" + createDate +
        ", lastUpdate=" + lastUpdate +
        ", filterChannels=" + filterChannels +
        ", applyCrowd=" + applyCrowd +
        ", startTime=" + startTime +
        ", endTime=" + endTime +
        ", picV2=" + picV2 +
        ", width=" + width +
        ", height=" + height +
        ", position=" + position +
        "}";
    }
}
