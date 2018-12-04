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

    public BusiException(String message) {
        super(message);
    }

}
