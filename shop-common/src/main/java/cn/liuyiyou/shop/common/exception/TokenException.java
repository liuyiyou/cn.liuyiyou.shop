package cn.liuyiyou.shop.common.exception;

/***
 *
 * 权限相关异常
 * @author: liuyiyou.cn
 * @date: 2018/12/20
 * @Copyright 2018 liuyiyou.cn Inc. All rights reserved
 */
public class TokenException extends RuntimeException {

    private int code;

    public TokenException(int code, String message) {
        super(message);
        this.code = code;
    }

    public TokenException(String message) {
        super(message);
    }

    public int getCode() {
        return code;
    }
}
