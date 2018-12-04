package cn.liuyiyou.shop.common.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/28
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class DateUtil {

    public static String getNowTimeStampStr() {
        long time = Long.valueOf(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
        return String.valueOf(time / 1000);
    }
}
