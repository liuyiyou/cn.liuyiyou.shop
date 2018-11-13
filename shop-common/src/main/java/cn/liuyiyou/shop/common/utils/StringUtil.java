package cn.liuyiyou.shop.common.utils;

import org.springframework.util.StringUtils;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/13
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class StringUtil {

    public static boolean isNotEmptyString(String string) {
        return !StringUtils.isEmpty(string);
    }
}
