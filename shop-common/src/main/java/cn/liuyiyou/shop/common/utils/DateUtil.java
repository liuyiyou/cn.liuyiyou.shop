package cn.liuyiyou.shop.common.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class DateUtil {

    public static String getNowTimeStampStr() {
        long time = Long.valueOf(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
        return String.valueOf(time / 1000);
    }
}
