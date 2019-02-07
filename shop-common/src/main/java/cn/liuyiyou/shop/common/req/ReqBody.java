package cn.liuyiyou.shop.common.req;

import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqBody {
    int page;
    int pageSize;

    JSONObject reqBody;
}
