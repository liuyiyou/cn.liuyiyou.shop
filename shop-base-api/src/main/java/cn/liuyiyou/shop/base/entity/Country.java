package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDate;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 国家标识，取值国家国际简称，如CN-中国
     */
    @TableId("country_id")
    private String countryId;
    /**
     * 国家名称拼音首字母，大写，如Z-中国
     */
    @TableField("country_first_char")
    private String countryFirstChar;
    /**
     * 国家中文名称
     */
    @TableField("country_name_cn")
    private String countryNameCn;
    /**
     * 国家英文名称
     */
    @TableField("country_name_en")
    private String countryNameEn;
    /**
     * 国家国旗图标url
     */
    @TableField("country_icon")
    private String countryIcon;
    /**
     * 国家状态：0-停用，1-启用
     */
    private Boolean state;
    /**
     * 国家信息创建时间
     */
    @TableField("create_date")
    private LocalDate createDate;
    /**
     * 国家信息最后修改时间
     */
    @TableField("last_update")
    private LocalDate lastUpdate;


}
