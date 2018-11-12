package cn.liuyiyou.shop.prod.service.impl;

import cn.liuyiyou.shop.base.entity.Country;
import cn.liuyiyou.shop.base.service.CountryService;
import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.entity.ProdSku;
import cn.liuyiyou.shop.prod.mapper.ProdMapper;
import cn.liuyiyou.shop.prod.service.IProdService;
import cn.liuyiyou.shop.prod.service.IProdSkuService;
import cn.liuyiyou.shop.prod.utils.SkuUtils;
import cn.liuyiyou.shop.prod.vo.ProdSkuVo;
import cn.liuyiyou.shop.prod.vo.ProdVo;
import com.alibaba.dubbo.config.annotation.Reference;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * <p>
 * 商品基本信息表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-30
 */
@Service
public class ProdServiceImpl extends ServiceImpl<ProdMapper, Prod> implements IProdService {

    @Reference(version = "${dubbo.service.version}",
            application = "${dubbo.application.id}",
            url = "dubbo://localhost:12345")
    private CountryService countryService;

    @Autowired
    private IProdSkuService prodSkuService;

    @Override
    public ProdVo getProdById(Long id) {
        Prod prod = this.getById(id);
        ProdVo prodVo = new ProdVo();
        BeanUtils.copyProperties(prod, prodVo);
//        Country country = countryService.getCountryById(prod.getCountryId());
//        prodVo.setCountry(country.getCountryNameCn());
        LambdaQueryWrapper<ProdSku> skuWrapper = new QueryWrapper<ProdSku>().lambda().select().eq(ProdSku::getProdId,id);

        List<ProdSkuVo> prodSkuVos = Lists.newArrayList();
        List<ProdSku> prodSkus = prodSkuService.list(skuWrapper);
        prodSkus.forEach(prodSku -> {
            ProdSkuVo prodSkuVo = new ProdSkuVo();
            BeanUtils.copyProperties(prodSku, prodSkuVo);
            prodSkuVo.setSkuAttrDesc(SkuUtils.joinSkuJsonValName(prodSku.getSkuAttr()));
            prodSkuVos.add(prodSkuVo);
        });
        prodVo.setProdSkus(prodSkuVos);
        return prodVo;
    }
}
