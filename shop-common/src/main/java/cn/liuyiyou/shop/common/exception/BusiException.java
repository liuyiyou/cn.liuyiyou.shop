package cn.liuyiyou.shop.common.exception;

import cn.liuyiyou.shop.common.resp.Code;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/9
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class BusiException extends RuntimeException {

    public BusiException() {
    }

    public BusiException(String msg, int code) {
        this.msg = msg;
        this.code = code;
    }

    /**
     * 异常信息
     */
    private String msg;

    /**
     * 具体异常码
     */
    private int code = Code.FAILED;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
