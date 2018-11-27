package cn.liuyiyou.shop.order.controller;

import com.alibaba.fastjson.JSONObject;

import java.text.MessageFormat;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/12
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class BaseController {

    public static Integer EXEC_OK = 0;

    public String formatResponseParams(Integer resultCode, Object respBody, String... args) {
        JSONObject RespHeader = getRespHeader(resultCode, true, args);
        if (respBody != null) {
            RespHeader.put("respBody", respBody);
        }
        return RespHeader.toString();
    }


    public JSONObject getRespHeader(Integer code, boolean bHeader, String... args) {
        JSONObject headCont = getRespHeader(code, args);
        if (bHeader) {
            JSONObject jobj = new JSONObject();
            jobj.put("respHeader", headCont);
            return jobj;
        } else {
            return headCont;
        }
    }


    public JSONObject getRespHeader(Integer code, String... args) {
        String msg = "success";

        JSONObject jobj = new JSONObject();
        jobj.put("resultCode", code);
        if (args != null && args.length > 0) {
            msg = MessageFormat.format(msg, args);
        }
        jobj.put("message", msg);
        return jobj;
    }

}
