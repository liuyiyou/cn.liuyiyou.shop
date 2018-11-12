package cn.liuyiyou.shop.common.exception;

import cn.liuyiyou.shop.common.resp.Code;
import cn.liuyiyou.shop.common.resp.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/9
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {BusiException.class, RuntimeException.class})
    @ResponseBody
    public Response<String> busiExceptionErrorHandler(BusiException ex) {
        log.error("myExceptionErrorHandler info:{}", ex.getMessage());
        Response<String> r = new Response<>();
        r.setMsg(ex.getMsg());
        r.setCode(ex.getCode());
        return r;
    }

    @ExceptionHandler(value = BindException.class)
    @ResponseBody
    public Response<String> bindExceptionErrorHandler(BindException ex)  {
        log.error("bindExceptionErrorHandler info:{}", ex.getMessage());
        Response<String> r = new Response<>();
        StringBuilder sb = new StringBuilder();
        FieldError fieldError = ex.getFieldError();
        sb.append(fieldError.getDefaultMessage());
        r.setMsg(sb.toString());
        r.setCode(Code.FAILED);
        return r;
    }
}
