package cn.liuyiyou.shop.common.resp;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class Result<T> {

    private int code = 200;
    private String message = "success";
    private T data;


}
