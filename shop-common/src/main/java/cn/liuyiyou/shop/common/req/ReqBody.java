package cn.liuyiyou.shop.common.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqBody {
    int page;
    int pageSize;
}
