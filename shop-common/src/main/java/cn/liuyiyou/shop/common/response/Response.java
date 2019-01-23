package cn.liuyiyou.shop.common.response;

import cn.liuyiyou.shop.common.exception.BusiException;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2018/12/19
 * @Copyright 2018 liuyiyou.cn Inc. All rights reserved
 */
public class Response {

    private final static String SUCCESS_MSG = "success";
    private final static String FAIL_MSG = "fail";

    public static <T> Result<T> success() {
        return new Result<T>().setCode(ResultCode.SUCCESS).setMsg(SUCCESS_MSG).setSuccess(true);
    }

    public static <T> Result<T> success(String msg) {
        return new Result<T>().setCode(ResultCode.SUCCESS).setMsg(msg).setSuccess(true);
    }

    public static <T> Result<T> success(T data) {
        return new Result<T>().setCode(ResultCode.SUCCESS).setMsg(SUCCESS_MSG).setSuccess(true).setData(data);
    }

    public static <T> Result<T> success(String msg, T data) {
        return new Result<T>().setCode(ResultCode.SUCCESS).setMsg(msg).setSuccess(true).setData(data);
    }


    public static <T> Result<T> fail() {
        return new Result<T>().setCode(ResultCode.FAIL).setMsg(FAIL_MSG).setSuccess(false);
    }

    public static <T> Result<T> fail(int code, String msg) {
        return new Result<T>().setCode(code).setMsg(msg).setSuccess(false);
    }

    public static <T> Result<T> fail(int code, String msg, T data) {
        return new Result<T>().setCode(code).setMsg(msg).setSuccess(false).setData(data);
    }


    public static <T> Result<T> fail(String msg) {
        return new Result<T>().setCode(ResultCode.FAIL).setMsg(msg).setSuccess(false);
    }

    public static void exception(String msg) {
        throw new BusiException(msg);
    }
}
