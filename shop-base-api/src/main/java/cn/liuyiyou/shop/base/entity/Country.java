package cn.liuyiyou.shop.base.entity;

import java.time.LocalDate;

/**
 * <p>
 * 国家（商品原产地）定义表
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
 */
public class Country {

    private static final long serialVersionUID = 1L;

    /**
     * 国家标识，取值国家国际简称，如CN-中国
     */
    private String countryId;
    /**
     * 国家名称拼音首字母，大写，如Z-中国
     */
    private String countryFirstChar;
    /**
     * 国家中文名称
     */
    private String countryNameCn;
    /**
     * 国家英文名称
     */
    private String countryNameEn;
    /**
     * 国家国旗图标url
     */
    private String countryIcon;
    /**
     * 国家状态：0-停用，1-启用
     */
    private Boolean state;
    /**
     * 国家信息创建时间
     */
    private LocalDate createDate;
    /**
     * 国家信息最后修改时间
     */
    private LocalDate lastUpdate;


    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getCountryFirstChar() {
        return countryFirstChar;
    }

    public void setCountryFirstChar(String countryFirstChar) {
        this.countryFirstChar = countryFirstChar;
    }

    public String getCountryNameCn() {
        return countryNameCn;
    }

    public void setCountryNameCn(String countryNameCn) {
        this.countryNameCn = countryNameCn;
    }

    public String getCountryNameEn() {
        return countryNameEn;
    }

    public void setCountryNameEn(String countryNameEn) {
        this.countryNameEn = countryNameEn;
    }

    public String getCountryIcon() {
        return countryIcon;
    }

    public void setCountryIcon(String countryIcon) {
        this.countryIcon = countryIcon;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
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


    @Override
    public String toString() {
        return "Country{" +
                ", countryId=" + countryId +
                ", countryFirstChar=" + countryFirstChar +
                ", countryNameCn=" + countryNameCn +
                ", countryNameEn=" + countryNameEn +
                ", countryIcon=" + countryIcon +
                ", state=" + state +
                ", createDate=" + createDate +
                ", lastUpdate=" + lastUpdate +
                "}";
    }
}
