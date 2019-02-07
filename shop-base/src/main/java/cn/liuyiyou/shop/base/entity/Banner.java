package cn.liuyiyou.shop.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class Banner implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * bannerId
     */
    @TableId("banner_id")
    private Integer bannerId;
    /**
     * 图片存储地址
     */
    private String pic;
    /**
     * 跳转目标地址
     */
    @TableField("target_url")
    private String targetUrl;
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
     * 图片地址的宽度
     */
    private Integer width;
    /**
     * 图片高度
     */
    private Integer height;


}
