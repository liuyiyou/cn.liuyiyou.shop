package cn.liuyiyou.shop.prod.utils;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/2
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public abstract class SkuUtils {

    public static String joinSkuJsonValName(String skuJson) {
        if (StringUtils.isEmpty(skuJson)) {
            return "";
        }
        String rst = "";
        JSONArray skuArry = JSONArray.parseArray(skuJson);
        if (!skuArry.isEmpty()) {
            List strList = new ArrayList();
            for (int i = 0; i < skuArry.size(); i++) {
                JSONObject json = (JSONObject) skuArry.get(i);
                String validName = json.getString("valid-name");
                int vEndIndex = validName.indexOf("-") > -1 ? validName.indexOf("-") : validName.length();
                String valName = validName.substring(vEndIndex + 1);
                if (!StringUtils.isEmpty(valName)) {
                    strList.add(valName);
                }
            }
            Collections.sort(strList);
            rst = org.apache.commons.lang.StringUtils.join(strList.iterator(), ",");
        }
        return rst;
    }
}
