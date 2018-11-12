package cn.liuyiyou.shop.prod.controller;


import cn.liuyiyou.shop.prod.entity.ProdSku;
import cn.liuyiyou.shop.prod.service.IProdSkuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 商品基本信息表 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
 */
@RestController
@RequestMapping("/prodSku")
@CrossOrigin //其他前端使用 $.getJSON()调用接口的时候，method不是get而是option，加上该注解解决跨域问题
public class ProdSkuController {

    @Autowired
    private IProdSkuService prodSkuService;

    @GetMapping("/{skuId}")
    public ProdSku getById(@PathVariable("skuId") Long skuId) {
        ProdSku prodSku = prodSkuService.getById(skuId);
        return prodSku;
    }


    @GetMapping("/increseSaled/{skuId}")
    public boolean increseSaled(@PathVariable("skuId") Long skuId) {
        ProdSku prodSku = prodSkuService.getById(skuId);
        prodSku.setSaled(prodSku.getSaled() + 1);
        prodSkuService.updateById(prodSku);
        return true;
    }


    @GetMapping("/decreseSaled/{skuId}")
    public boolean decreseSaled(@PathVariable("skuId") Long skuId) {
        ProdSku prodSku = prodSkuService.getById(skuId);
        prodSku.setSaled(prodSku.getSaled() - 1);
        prodSkuService.updateById(prodSku);
        return true;
    }

}

