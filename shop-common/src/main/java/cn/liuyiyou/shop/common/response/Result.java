package cn.liuyiyou.shop.common.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/***
 *
 * 可以使用
 * @see org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice
 * @author: liuyiyou.cn
 * @date: 2018/12/19
 * @Copyright 2018 liuyiyou.cn Inc. All rights reserved
 */
@ApiModel(value = "返回说明")
public class Result<T> {

    @ApiModelProperty(value = "200")
    public int code;
    @ApiModelProperty(value = "参数信息")
    private String msg;
    private T data;
    private boolean success;


    public Result<T> setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public Result<T> setCode(ResultCode resultCode) {
        this.code = resultCode.code;
        return this;
    }

    public boolean isSuccess() {
        return success;
    }

    public int getCode() {
        return code;
    }

    public Result<T> setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public Result<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public T getData() {
        return data;
    }

    public Result<T> setData(T data) {
        this.data = data;
        return this;
    }
}

