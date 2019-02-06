package cn.liuyiyou.shop.prod.service.impl;

import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.entity.ProdSku;
import cn.liuyiyou.shop.prod.mapper.ProdMapper;
import cn.liuyiyou.shop.prod.service.IProdService;
import cn.liuyiyou.shop.prod.service.IProdSkuService;
import cn.liuyiyou.shop.prod.utils.SkuUtils;
import cn.liuyiyou.shop.prod.vo.ProdListReqVo;
import cn.liuyiyou.shop.prod.vo.ProdListRespVo;
import cn.liuyiyou.shop.prod.vo.ProdSkuVo;
import cn.liuyiyou.shop.prod.vo.ProdVo;
import cn.liuyiyou.shop.prod.vo.SkuKeyListValueVo;
import cn.liuyiyou.shop.prod.vo.SkuKeyValueVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * <p>
 * 商品基本信息表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-30
 */
@Service
@com.alibaba.dubbo.config.annotation.Service(version = "${prod.service.version}")
public class ProdServiceImpl extends ServiceImpl<ProdMapper, Prod> implements IProdService {


    @Autowired
    private IProdSkuService prodSkuService;


    @Override
    public IPage<ProdListRespVo> prodPage(ProdListReqVo prodListReqVo) {
        Page<Prod> pageQuery = new Page<>(prodListReqVo.getPage(), prodListReqVo.getPageSize());
        QueryWrapper<Prod> prodQueryWrapper = new QueryWrapper<>();
        if (prodListReqVo.getBrandId() != null) {
            prodQueryWrapper.eq("brand_id", prodListReqVo.getBrandId());
        }
        IPage<Prod> prodIPage = this.page(pageQuery, prodQueryWrapper);
        IPage<ProdListRespVo> prodListRespVoIPage = new Page<>(prodIPage.getCurrent(), prodIPage.getSize(), prodIPage.getTotal());
        List<ProdListRespVo> listRespVos = prodIPage.getRecords().stream().map(prod -> {
            ProdListRespVo prodListRespVo = new ProdListRespVo();
            prodListRespVo.setAlbum(prod.getAlbum().split(",")[0])
                    .setCommentNum(Math.round(1000))
                    .setPrice(Math.round(10000) * 1.1F)
                    .setProdId(prod.getProdId())
                    .setProdName(prod.getProdName());

            return prodListRespVo;
        }).collect(Collectors.toList());
        prodListRespVoIPage.setRecords(listRespVos);
        return prodListRespVoIPage;
    }

    @Override
    public ProdVo getProdById(Long id) {
        Prod prod = this.getById(id);
        Optional.ofNullable(prod).orElseThrow(() -> new RuntimeException("商品不存在"));
        ProdVo prodVo = new ProdVo();
        BeanUtils.copyProperties(prod, prodVo);
        prodVo.setAlbums(Arrays.asList(prod.getAlbum().split(",")));
        LambdaQueryWrapper<ProdSku> skuWrapper = new QueryWrapper<ProdSku>().lambda().select().eq(ProdSku::getProdId, id);
        List<SkuKeyValueVo> skuKeyValueVoList = Lists.newArrayList();
        List<ProdSkuVo> prodSkuVos = Lists.newArrayList();
        List<ProdSku> prodSkus = prodSkuService.list(skuWrapper);
        prodSkus.forEach(prodSku -> {
            ProdSkuVo prodSkuVo = new ProdSkuVo();
            BeanUtils.copyProperties(prodSku, prodSkuVo);
            prodSkuVo.setSkuAttrDesc(SkuUtils.joinSkuJsonValName(prodSku.getSkuAttr()));
            skuKeyValueVoList.addAll(SkuUtils.skuKeyValue(prodSku.getSkuAttr()));
            prodSkuVos.add(prodSkuVo);
        });
        prodVo.setProdSkus(prodSkuVos);

        List<SkuKeyListValueVo> skuKeyListValueVos = Lists.newArrayList();
        Map<String, List<SkuKeyValueVo>> map = skuKeyValueVoList.stream().collect(Collectors.groupingBy(SkuKeyValueVo::getKey));
        map.forEach((k, v) -> {
            SkuKeyListValueVo skuKeyListValueVo = new SkuKeyListValueVo();
            skuKeyListValueVo.setKey(k);
            skuKeyListValueVo.setValues(v.stream().map(SkuKeyValueVo::getValue).collect(Collectors.toList()));
            skuKeyListValueVos.add(skuKeyListValueVo);
        });
        prodVo.setSkuKeyListValue(skuKeyListValueVos);
        return prodVo;
    }
}
