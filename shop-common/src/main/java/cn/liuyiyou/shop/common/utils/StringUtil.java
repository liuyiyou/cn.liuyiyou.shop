package cn.liuyiyou.shop.common.utils;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.util.StringUtils;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class StringUtil {

    public static boolean isNotEmptyString(String string) {
        return !StringUtils.isEmpty(string);
    }


    public static byte[] decodeBase64(final String input) {
        return Base64.decodeBase64(input);
    }
}
