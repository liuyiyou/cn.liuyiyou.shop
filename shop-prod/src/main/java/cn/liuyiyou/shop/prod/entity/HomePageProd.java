package cn.liuyiyou.shop.prod.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 与base_selected_nation4boss和base_selected_nav4boss两个表相关联的首页推荐产品保存表(首页推荐商品表)
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@TableName("home_page_prod")
public class HomePageProd extends Model<HomePageProd> {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Long id;
    /**
     * 导航id,适合type=0的情况
     */
    @TableField("nav_id")
    private Integer navId;
    /**
     * 国家id,适合type=1的情况
     */
    @TableField("country_id")
    private String countryId;
    /**
     * 产品相关类型（0-导航推荐的商品，1-国家馆推荐的商品）
     */
    private Integer type;
    /**
     * 产品id
     */
    @TableField("boss_prod_id")
    private Long bossProdId;
    /**
     * 产品名称
     */
    @TableField("prod_name")
    private String prodName;
    /**
     * 显示价格
     */
    private Float price;
    /**
     * 商品图片
     */
    private String album;
    /**
     * 商品权重（导航推荐的商品专用）
     */
    private Integer weight;
    /**
     * 推荐标题（导航推荐的商品专用）
     */
    @TableField("prom_name")
    private String promName;
    /**
     * 促销类型类型(1-首发；2-热门)(导航推荐的商品专用）
     */
    @TableField("prom_tag")
    private Integer promTag;
    /**
     * 商品位置（国家馆推荐的商品）
     */
    private Integer cell;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNavId() {
        return navId;
    }

    public void setNavId(Integer navId) {
        this.navId = navId;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Long getBossProdId() {
        return bossProdId;
    }

    public void setBossProdId(Long bossProdId) {
        this.bossProdId = bossProdId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getPromName() {
        return promName;
    }

    public void setPromName(String promName) {
        this.promName = promName;
    }

    public Integer getPromTag() {
        return promTag;
    }

    public void setPromTag(Integer promTag) {
        this.promTag = promTag;
    }

    public Integer getCell() {
        return cell;
    }

    public void setCell(Integer cell) {
        this.cell = cell;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "HomePageProd{" +
        ", id=" + id +
        ", navId=" + navId +
        ", countryId=" + countryId +
        ", type=" + type +
        ", bossProdId=" + bossProdId +
        ", prodName=" + prodName +
        ", price=" + price +
        ", album=" + album +
        ", weight=" + weight +
        ", promName=" + promName +
        ", promTag=" + promTag +
        ", cell=" + cell +
        "}";
    }
}
