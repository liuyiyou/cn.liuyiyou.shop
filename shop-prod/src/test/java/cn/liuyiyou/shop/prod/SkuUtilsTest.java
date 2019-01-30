package cn.liuyiyou.shop.prod;

import cn.liuyiyou.shop.prod.utils.SkuUtils;
import cn.liuyiyou.shop.prod.vo.SkuKeyValueVo;
import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/1/30
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class SkuUtilsTest {

    @Test
    public void joinSkuJsonValName() {
        String skuAttrStr = "[{\"attrid-name\":\"823-规格\",\"valid-name\":\"2174-400ml\"},{\"attrid-name\":\"823-规格\",\"valid-name\":\"2175-500ml\"}]";
        String result = SkuUtils.joinSkuJsonValName(skuAttrStr);
        System.out.println(result);
    }

    @Test
    public void test() {
        List<SkuKeyValueVo> skuKeyValueVoList = Lists.newArrayList();
        SkuKeyValueVo skuKeyValueVo = new SkuKeyValueVo();
        skuKeyValueVo.setKey("颜色").setValue("红色");
        skuKeyValueVoList.add(skuKeyValueVo);

        skuKeyValueVo = new SkuKeyValueVo();
        skuKeyValueVo.setKey("尺寸").setValue("25");
        skuKeyValueVoList.add(skuKeyValueVo);

        skuKeyValueVo = new SkuKeyValueVo();
        skuKeyValueVo.setKey("颜色").setValue("蓝色");
        skuKeyValueVoList.add(skuKeyValueVo);

        skuKeyValueVo = new SkuKeyValueVo();
        skuKeyValueVo.setKey("尺寸").setValue("24");
        skuKeyValueVoList.add(skuKeyValueVo);



        Map<String, List<SkuKeyValueVo>> map = skuKeyValueVoList.stream().collect(Collectors.groupingBy(SkuKeyValueVo::getKey));
        map.forEach((k, v) -> {
            System.out.println(k);
            System.out.println(v.stream().map(SkuKeyValueVo::getValue).collect(Collectors.toList()));
        });
    }
}
