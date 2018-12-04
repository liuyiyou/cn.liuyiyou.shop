package cn.liuyiyou.shop.common.exception;

import cn.liuyiyou.shop.common.resp.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/9
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
//@ControllerAdvice
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = {RuntimeException.class})
    @ResponseBody
    public Response<String> runExceptionErrorHandler(RuntimeException ex) {
        log.error("myExceptionErrorHandler info:{}", ex.getMessage());
        Response<String> r = new Response<>();
        r.setCode(-1);
        r.setMsg(ex.getMessage());
        return r;
    }

    @ExceptionHandler(value = {BusiException.class})
    @ResponseBody
    public Response<String> busiExceptionErrorHandler(BusiException ex) {
        log.error("myExceptionErrorHandler info:{}", ex.getMessage());
        Response<String> r = new Response<>();
        return r;
    }

//    @ExceptionHandler(value = BindException.class)
//    @ResponseBody
//    public Response<String> bindExceptionErrorHandler(BindException ex) {
//        log.error("bindExceptionErrorHandler info:{}", ex.getMessage());
//        Response<String> r = new Response<>();
//        StringBuilder sb = new StringBuilder();
//        FieldError fieldError = ex.getFieldError();
//        sb.append(fieldError.getDefaultMessage());
//        r.setMsg(sb.toString());
//        r.setCode(Code.FAILED);
//        return r;
//    }
}
