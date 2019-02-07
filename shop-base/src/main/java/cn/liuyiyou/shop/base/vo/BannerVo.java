package cn.liuyiyou.shop.base.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@Accessors(chain = true)
public class BannerVo implements Serializable {

    private String pic;
    private String url;

}
