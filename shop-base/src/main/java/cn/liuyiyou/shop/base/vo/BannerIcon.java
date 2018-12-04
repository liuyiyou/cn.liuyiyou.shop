package cn.liuyiyou.shop.base.vo;

/**
 */
public class BannerIcon {

    private String iconUrl;
    private String url;
    private Byte linkType;
    private String name;
    private Float width;
    private Float height;

    public String getIconUrl() {
        return iconUrl;
    }

    public BannerIcon setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    }

    public String getUrl() {
        return url;
    }

    public BannerIcon setUrl(String url) {
        this.url = url;
        return this;
    }

    public Byte getLinkType() {
        return linkType;
    }

    public BannerIcon setLinkType(Byte linkType) {
        this.linkType = linkType;
        return this;
    }

    public String getName() {
        return name;
    }

    public BannerIcon setName(String name) {
        this.name = name;
        return this;
    }

    public Float getWidth() {
        return width;
    }

    public BannerIcon setWidth(Float width) {
        this.width = width;
        return this;
    }

    public Float getHeight() {
        return height;
    }

    public BannerIcon setHeight(Float height) {
        this.height = height;
        return this;
    }
}
