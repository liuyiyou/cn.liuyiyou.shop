package cn.liuyiyou.shop.base.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 */
@Data
@Accessors(chain = true)
public class BannerVo implements Serializable {

    private String pic;
    private String url;

}
