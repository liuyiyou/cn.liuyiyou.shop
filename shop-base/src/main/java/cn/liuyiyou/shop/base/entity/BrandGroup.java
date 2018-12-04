package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@TableName("brand_group")
public class BrandGroup extends Model<BrandGroup> {

    private static final long serialVersionUID = 1L;

    /**
     * 组ID
     */
    private Integer id;
    /**
     * 一级导航id
     */
    @TableField("nav_id")
    private Integer navId;
    /**
     * 分组名称
     */
    @TableField("group_name")
    private String groupName;
    @TableField("brand_array")
    private String brandArray;
    private Boolean status;
    private Integer weight;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNavId() {
        return navId;
    }

    public void setNavId(Integer navId) {
        this.navId = navId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getBrandArray() {
        return brandArray;
    }

    public void setBrandArray(String brandArray) {
        this.brandArray = brandArray;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "BrandGroup{" +
        ", id=" + id +
        ", navId=" + navId +
        ", groupName=" + groupName +
        ", brandArray=" + brandArray +
        ", status=" + status +
        ", weight=" + weight +
        "}";
    }
}
