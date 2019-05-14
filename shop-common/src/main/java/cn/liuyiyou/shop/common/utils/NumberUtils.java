package cn.liuyiyou.shop.common.utils;

import cn.hutool.core.util.NumberUtil;
import org.junit.Test;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/22
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class NumberUtils {

    @Test
    public void isDigits() {
        boolean number = NumberUtil.isNumber("12.34");
        boolean number1 = NumberUtil.isNumber("-1.23");
        System.out.println(isNumber("0.3"));

    }

    public boolean isNumber(String string) {
        Boolean mathch = string.matches("^([1-9][0-9]*)+(.[0-9]{1,2})?$");
        return mathch;
    }


}
