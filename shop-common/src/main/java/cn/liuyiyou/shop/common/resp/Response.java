package cn.liuyiyou.shop.common.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/9
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Response<T> {

    /* * 返回结果集
     */
    private T data;
    /**
     * 返回消息
     */
    private String msg = "success";
    /**
     * 响应码
     */
    private int code = 0;
}
