package cn.liuyiyou.shop.order.third.impl;

import cn.liuyiyou.shop.order.third.IProdService;
import cn.liuyiyou.shop.order.vo.Prod;
import cn.liuyiyou.shop.order.vo.ProdSkuVo;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
@Service
@Slf4j
public class ProdServiceImpl implements IProdService {

    @Autowired
    private RestTemplate restTemplate;


    @Override
    public Prod getProdById(Long prodId) {
        String url = "http://PROD-SERVICE/prod/" + prodId;
        log.info("url::{}", url);
        String result = restTemplate.getForEntity(url, String.class).getBody();
        Prod prod = JSONObject.parseObject(result, Prod.class);
        return prod;
    }

    @Override
    public ProdSkuVo getProdSkuById(Long skuId) {
        String url = "http://PROD-SERVICE/prodSku/" + skuId;
        log.info("url::{}", url);
        String result = restTemplate.getForEntity(url, String.class).getBody();
        ProdSkuVo prodSkuVo = JSONObject.parseObject(result, ProdSkuVo.class);
        return prodSkuVo;
    }

    @Override
    public boolean increseSaled(Long skuId) {
        String url = "http://PROD-SERVICE/prodSku/increseSaled/" + skuId;
        log.info("url::{}", url);
        String result = restTemplate.getForEntity(url, String.class).getBody();
        log.info("result::{}", result);
        return true;
    }

    @Override
    public boolean decreseSaled(Long skuId) {
        String url = "http://PROD-SERVICE/prodSku/decreseSaled/" + skuId;
        log.info("url::{}", url);
        String result = restTemplate.getForEntity(url, String.class).getBody();
        log.info("result::{}", result);
        return true;
    }
}


