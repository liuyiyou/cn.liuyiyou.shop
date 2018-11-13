package cn.liuyiyou.shop.base.entity;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 *
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@TableName("nav4boss")
public class Nav4boss extends Model<Nav4boss> {

    private static final long serialVersionUID = 1L;

    //状态，0-隐藏，1-启用
    public static final int NAV_STATUS_USED = 1;
    public static final int NAV_STATUS_UNUSED = 0;

    //导航类别：1-一级导航，2-二级导航，3-三级导航
    public static final Integer NAV_LEVEL_TOP =  1;
    public static final Integer NAV_LEVEL_SEC =  2;
    public static final Integer NAV_LEVEL_THI =  3;

    //类型：1-微信端,2-pc端
    public static final Byte TYPE_WEBCHAT = (byte) 1;
    public static final Byte TYPE_PC = (byte) 2;
    /**
     * 分类导航Id
     */
    @TableId("nav_id")
    private Integer navId;
    /**
     * 导航名称
     */
    @TableField("nav_name")
    private String navName;
    /**
     * 跳转链接
     */
    @TableField("nav_url")
    private String navUrl;
    /**
     * 图标(一般只有一级导航有)(微端对应二级导航的icon，一级导航的banner)
     */
    @TableField("nav_icon")
    private String navIcon;
    /**
     * 导航类别：1-一级导航，2-二级导航，3-三级导航
     */
    @TableField("nav_level")
    private Integer navLevel;
    /**
     * banner类型：1-微信端,2-pc端
     */
    @TableField("nav_type")
    private Integer navType;
    /**
     * 权重
     */
    private Integer weight;
    /**
     * 上级导航ID
     */
    @TableField("parent_nav_id")
    private Integer parentNavId;
    /**
     * 导航显示风格：0-普通，1-高亮，2-hot
     */
    @TableField("nav_style")
    private Integer navStyle;
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
     * 导航创建时间
     */
    @TableField("status_time")
    private LocalDateTime statusTime;
    /**
     * 是否推荐，0-否，1-是
     */
    private Integer recommend;
    /**
     * 导航最后修改时间
     */
    @TableField("last_update")
    private LocalDate lastUpdate;
    /**
     * 最后修改人的ID
     */
    @TableField("update_suid")
    private Long updateSuid;
    /**
     * 移动端2级分类下的小分类文字,如面部护肤,它的小分类文字是 面膜/防晒/洁面/水乳液/霜
     */
    @TableField("second_text")
    private String secondText;
    /**
     * 分类的字体颜色
     */
    @TableField("title_color")
    private String titleColor;
    /**
     * 映射方式，0-按类目,1-按URL
     */
    @TableField("link_type")
    private Integer linkType;
    /**
     * 用来存储多个类目的映射关系与映射文本[{"cataId":"1201","reflector":" 时尚美装-美容护肤"}]
     */
    @TableField("cata_ids")
    private String cataIds;
    /**
     * [id,id,id]品牌id数组
     */
    @TableField("brand_ids")
    private String brandIds;
    /**
     * 二级导航的标题图片
     */
    @TableField("title_pic")
    private String titlePic;
    /**
     * 满减活动ID数组
     */
    @TableField("activity_ids")
    private String activityIds;
    /**
     * 分享标题
     */
    @TableField("share_title")
    private String shareTitle;
    /**
     * 分享内容
     */
    @TableField("share_content")
    private String shareContent;
    /**
     * 分享ICON
     */
    @TableField("share_icon")
    private String shareIcon;
    /**
     * 二维码底图
     */
    @TableField("qr_code_pic")
    private String qrCodePic;
    /**
     * 导航图标
     */
    @TableField("nav_iconv2")
    private String navIconv2;
    /**
     * 导航图标宽度
     */
    private Integer width;
    /**
     * 导航图标高度
     */
    private Integer height;

    @TableField(exist = false)
    private  Integer cataId;//二级类目
    @TableField(exist = false)
    private  JSONObject parameters;
    @TableField(exist = false)
    private  List<Nav4boss> childNavList;


    public List<Nav4boss> getChildNavList() {
        return childNavList;
    }

    public void setChildNavList(List<Nav4boss> childNavList) {
        this.childNavList = childNavList;
    }

    public Integer getCataId() {
        return cataId;
    }

    public void setCataId(Integer cataId) {
        this.cataId = cataId;
    }

    public JSONObject getParameters() {
        return parameters;
    }

    public void setParameters(JSONObject parameters) {
        this.parameters = parameters;
    }

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

    public String getNavIcon() {
        return navIcon;
    }

    public void setNavIcon(String navIcon) {
        this.navIcon = navIcon;
    }

    public Integer getNavLevel() {
        return navLevel;
    }

    public void setNavLevel(Integer navLevel) {
        this.navLevel = navLevel;
    }

    public Integer getNavType() {
        return navType;
    }

    public void setNavType(Integer navType) {
        this.navType = navType;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getParentNavId() {
        return parentNavId;
    }

    public void setParentNavId(Integer parentNavId) {
        this.parentNavId = parentNavId;
    }

    public Integer getNavStyle() {
        return navStyle;
    }

    public void setNavStyle(Integer navStyle) {
        this.navStyle = navStyle;
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

    public Integer getRecommend() {
        return recommend;
    }

    public void setRecommend(Integer recommend) {
        this.recommend = recommend;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Long getUpdateSuid() {
        return updateSuid;
    }

    public void setUpdateSuid(Long updateSuid) {
        this.updateSuid = updateSuid;
    }

    public String getSecondText() {
        return secondText;
    }

    public void setSecondText(String secondText) {
        this.secondText = secondText;
    }

    public String getTitleColor() {
        return titleColor;
    }

    public void setTitleColor(String titleColor) {
        this.titleColor = titleColor;
    }

    public Integer getLinkType() {
        return linkType;
    }

    public void setLinkType(Integer linkType) {
        this.linkType = linkType;
    }

    public String getCataIds() {
        return cataIds;
    }

    public void setCataIds(String cataIds) {
        this.cataIds = cataIds;
    }

    public String getBrandIds() {
        return brandIds;
    }

    public void setBrandIds(String brandIds) {
        this.brandIds = brandIds;
    }

    public String getTitlePic() {
        return titlePic;
    }

    public void setTitlePic(String titlePic) {
        this.titlePic = titlePic;
    }

    public String getActivityIds() {
        return activityIds;
    }

    public void setActivityIds(String activityIds) {
        this.activityIds = activityIds;
    }

    public String getShareTitle() {
        return shareTitle;
    }

    public void setShareTitle(String shareTitle) {
        this.shareTitle = shareTitle;
    }

    public String getShareContent() {
        return shareContent;
    }

    public void setShareContent(String shareContent) {
        this.shareContent = shareContent;
    }

    public String getShareIcon() {
        return shareIcon;
    }

    public void setShareIcon(String shareIcon) {
        this.shareIcon = shareIcon;
    }

    public String getQrCodePic() {
        return qrCodePic;
    }

    public void setQrCodePic(String qrCodePic) {
        this.qrCodePic = qrCodePic;
    }

    public String getNavIconv2() {
        return navIconv2;
    }

    public void setNavIconv2(String navIconv2) {
        this.navIconv2 = navIconv2;
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

    @Override
    protected Serializable pkVal() {
        return this.navId;
    }

    @Override
    public String toString() {
        return "Nav4boss{" +
                ", navId=" + navId +
                ", navName=" + navName +
                ", navUrl=" + navUrl +
                ", navIcon=" + navIcon +
                ", navLevel=" + navLevel +
                ", navType=" + navType +
                ", weight=" + weight +
                ", parentNavId=" + parentNavId +
                ", navStyle=" + navStyle +
                ", status=" + status +
                ", createTime=" + createTime +
                ", statusTime=" + statusTime +
                ", recommend=" + recommend +
                ", lastUpdate=" + lastUpdate +
                ", updateSuid=" + updateSuid +
                ", secondText=" + secondText +
                ", titleColor=" + titleColor +
                ", linkType=" + linkType +
                ", cataIds=" + cataIds +
                ", brandIds=" + brandIds +
                ", titlePic=" + titlePic +
                ", activityIds=" + activityIds +
                ", shareTitle=" + shareTitle +
                ", shareContent=" + shareContent +
                ", shareIcon=" + shareIcon +
                ", qrCodePic=" + qrCodePic +
                ", navIconv2=" + navIconv2 +
                ", width=" + width +
                ", height=" + height +
                "}";
    }
}
