package cn.liuyiyou.shop.prod.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/**
 * @author: liuyiyou.cn
 * @date: 2019/1/24
 * @version: V1.0
 */
@Data
@Accessors(chain = true)
public class ProdInfoVo implements Serializable {

    private List<String> albums;

    private String prodName;
}
