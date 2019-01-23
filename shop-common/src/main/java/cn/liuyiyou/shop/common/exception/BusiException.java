package cn.liuyiyou.shop.common.exception;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2018/12/17
 * @Copyright 2018 liuyiyou.cn Inc. All rights reserved
 */
public class BusiException extends RuntimeException {


    public BusiException() {
    }

    public BusiException(String message) {
        super(message);
    }

    public BusiException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusiException(Throwable cause) {
        super(cause);
    }

    public BusiException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
