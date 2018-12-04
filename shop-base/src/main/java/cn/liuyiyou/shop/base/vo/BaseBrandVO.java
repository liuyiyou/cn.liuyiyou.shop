package cn.liuyiyou.shop.base.vo;

public class BaseBrandVO {
    private Integer brandId;
    private String brandIcon;
    private String bannerImg;
    private String brandDescp;
    private String brandNameCn;
    private String brandNameEn;
    private Integer prodCount;
    private String prodImg;

    public String getBannerImg() {
        return bannerImg;
    }

    public void setBannerImg(String bannerImg) {
        this.bannerImg = bannerImg;
    }

    public String getBrandDescp() {
        return brandDescp;
    }

    public void setBrandDescp(String brandDescp) {
        this.brandDescp = brandDescp;
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

    public Integer getProdCount() {
        return prodCount;
    }

    public void setProdCount(Integer prodCount) {
        this.prodCount = prodCount;
    }

    public String getProdImg() {
        return prodImg;
    }

    public void setProdImg(String prodImg) {
        this.prodImg = prodImg;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandIcon() {
        return brandIcon;
    }

    public void setBrandIcon(String brandIcon) {
        this.brandIcon = brandIcon;
    }
}
