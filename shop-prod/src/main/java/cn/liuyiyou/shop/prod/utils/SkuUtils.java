package cn.liuyiyou.shop.prod.utils;


import cn.liuyiyou.shop.prod.vo.SkuKeyValueVo;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;

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

    public static String joinSkuJsonValName(String skuJsonArray) {
        List strList = skuValues(skuJsonArray);
        return StringUtils.join(strList.iterator(), ",");
    }


    public static List<SkuKeyValueVo> skuKeyValue(String skuJsonArray) {
        List<SkuKeyValueVo> skuKeyValueVos = Lists.newArrayList();
        if (StringUtils.isEmpty(skuJsonArray)) {
            return Lists.newArrayList();
        }
        JSONArray skuArry = JSONArray.parseArray(skuJsonArray);
        if (!skuArry.isEmpty()) {
            for (int i = 0; i < skuArry.size(); i++) {
                SkuKeyValueVo skuKeyValueVo = new SkuKeyValueVo();
                JSONObject json = (JSONObject) skuArry.get(i);
                String attridName = json.getString("attrid-name");
                String validName = json.getString("valid-name");
                int vEndIndex = attridName.indexOf("-") > -1 ? attridName.indexOf("-") : attridName.length();
                int v2EndIndex = validName.indexOf("-") > -1 ? validName.indexOf("-") : validName.length();
                String vAttridName = attridName.substring(vEndIndex + 1);
                String valName = validName.substring(v2EndIndex + 1);
                skuKeyValueVo.setKey(vAttridName);
                skuKeyValueVo.setValue(valName);
                skuKeyValueVos.add(skuKeyValueVo);
            }
        }
        return skuKeyValueVos;
    }


    public static List<String> skuValues(String skuJsonArray) {
        if (StringUtils.isEmpty(skuJsonArray)) {
            return Lists.newArrayList();
        }
        List<String> strList = new ArrayList<>();
        JSONArray skuArry = JSONArray.parseArray(skuJsonArray);
        if (!skuArry.isEmpty()) {
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
        }
        return strList;
    }


    public static List<String> skuNames(String skuJsonArray) {
        if (StringUtils.isEmpty(skuJsonArray)) {
            return Lists.newArrayList();
        }
        List<String> strList = new ArrayList<>();
        JSONArray skuArry = JSONArray.parseArray(skuJsonArray);
        if (!skuArry.isEmpty()) {
            for (int i = 0; i < skuArry.size(); i++) {
                JSONObject json = (JSONObject) skuArry.get(i);
                String attridName = json.getString("attrid-name");
                int vEndIndex = attridName.indexOf("-") > -1 ? attridName.indexOf("-") : attridName.length();
                String valName = attridName.substring(vEndIndex + 1);
                if (!StringUtils.isEmpty(valName)) {
                    strList.add(valName);
                }
            }
            Collections.sort(strList);
        }
        return strList;
    }


}
