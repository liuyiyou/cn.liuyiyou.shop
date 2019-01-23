package cn.liuyiyou.shop.common.exception;

import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.util.List;


/**
 * 全局异常处理
 *
 * @author: liuyiyou
 * @date: 2017/11/17
 * Time: 下午1:55
 */
@RestControllerAdvice
@Slf4j
@Configuration
public class GlobalExceptionHandler {


    @ExceptionHandler(DefaultException.class)
    public Result defaultExceptionHandler(Exception e) {
        log.error("404异常", e);
        String message = e.getMessage();
        JSONObject erroInfo = JSON.parseObject(message);
        int status = erroInfo.getInteger("status");
        switch (status) {
            case 404:
                return Response.fail(erroInfo.getInteger("status"), "找不到页面");
            case 403:
                return Response.fail(erroInfo.getInteger("status"), "没有权限访问");
            case 405:
                return Response.fail(erroInfo.getInteger("status"), "不支持的访问方法");
        }
        return Response.fail(erroInfo.getInteger("status"), e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public Result accessDeniedExceptionHandler(AccessDeniedException e) {
        log.error("权限异常", e);
        return Response.fail(403, "没有权限访问", e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public Result defaultErrorHandler(Exception e) {
        log.error("系统异常", e);
        return Response.fail(500, "系统出问题了", e.getMessage());
    }

    @ExceptionHandler(BusiException.class)
    public Result busiExceptionHandler(Exception e) {
        log.debug("业务异常", e);
        return Response.fail(500, e.getMessage());
    }

    @ExceptionHandler(BadSqlGrammarException.class)
    public Result BadSqlGrammarExceptionHandler(Exception e) {
        log.error("SQL语法错误", e);
        return Response.fail(500, "SQL语法错误", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public Result methodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error("类型转换异常:{}", e);
        return Response.fail("类型检查异常，请检查入参类型");
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<String> validatorException(MethodArgumentNotValidException e) {
        log.debug("校验异常", e);
        List<ObjectError> allErrors = e.getBindingResult().getAllErrors();
        String error = allErrors.get(0).getDefaultMessage();
        return Response.fail(error);

    }


}
