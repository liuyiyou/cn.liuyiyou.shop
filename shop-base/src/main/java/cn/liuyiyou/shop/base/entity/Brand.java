package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.time.LocalDate;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 品牌定义表，这里会定义所有可供选择的品牌。
该表会与类目表中的叶子类目关联，以缩小在商品上传时品牌的选择范围（选定商品的所属类目后，只能看到该类目关联的品牌）。
该表还会与商品表关联，以标识商品的品牌。
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
public class Brand extends Model<Brand> {

    private static final long serialVersionUID = 1L;

    /**
     * 品牌标识
     */
    @TableId("brand_id")
    private Integer brandId;
    /**
     * 品牌名首字母，大写
     */
    @TableField("brand_first_char")
    private String brandFirstChar;
    /**
     * 品牌中文名
     */
    @TableField("brand_name_cn")
    private String brandNameCn;
    /**
     * 品牌英文名
     */
    @TableField("brand_name_en")
    private String brandNameEn;
    /**
     * 品牌介绍
     */
    @TableField("brand_descp")
    private String brandDescp;
    /**
     * 品牌关键字，以逗号分隔
     */
    @TableField("brand_keywords")
    private String brandKeywords;
    /**
     * 品牌图标url
     */
    @TableField("brand_icon")
    private String brandIcon;
    /**
     * 品牌创建时间
     */
    @TableField("create_date")
    private LocalDate createDate;
    /**
     * 品牌最后修改时间
     */
    @TableField("last_update")
    private LocalDate lastUpdate;
    /**
     * 品牌所属国家ID
     */
    @TableField("country_id")
    private String countryId;
    /**
     * 商品图片url
     */
    @TableField("prod_img")
    private String prodImg;
    /**
     * banner图片url
     */
    @TableField("banner_img")
    private String bannerImg;


    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandFirstChar() {
        return brandFirstChar;
    }

    public void setBrandFirstChar(String brandFirstChar) {
        this.brandFirstChar = brandFirstChar;
    }

    public String getBrandNameCn() {
        return brandNameCn;
    }

    public void setBrandNameCn(String brandNameCn) {
        this.brandNameCn = brandNameCn;
    }

    public String getBrandNameEn() {
        return brandNameEn;
    }

    public void setBrandNameEn(String brandNameEn) {
        this.brandNameEn = brandNameEn;
    }

    public String getBrandDescp() {
        return brandDescp;
    }

    public void setBrandDescp(String brandDescp) {
        this.brandDescp = brandDescp;
    }

    public String getBrandKeywords() {
        return brandKeywords;
    }

    public void setBrandKeywords(String brandKeywords) {
        this.brandKeywords = brandKeywords;
    }

    public String getBrandIcon() {
        return brandIcon;
    }

    public void setBrandIcon(String brandIcon) {
        this.brandIcon = brandIcon;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getProdImg() {
        return prodImg;
    }

    public void setProdImg(String prodImg) {
        this.prodImg = prodImg;
    }

    public String getBannerImg() {
        return bannerImg;
    }

    public void setBannerImg(String bannerImg) {
        this.bannerImg = bannerImg;
    }

    @Override
    protected Serializable pkVal() {
        return this.brandId;
    }

    @Override
    public String toString() {
        return "Brand{" +
        ", brandId=" + brandId +
        ", brandFirstChar=" + brandFirstChar +
        ", brandNameCn=" + brandNameCn +
        ", brandNameEn=" + brandNameEn +
        ", brandDescp=" + brandDescp +
        ", brandKeywords=" + brandKeywords +
        ", brandIcon=" + brandIcon +
        ", createDate=" + createDate +
        ", lastUpdate=" + lastUpdate +
        ", countryId=" + countryId +
        ", prodImg=" + prodImg +
        ", bannerImg=" + bannerImg +
        "}";
    }
}
