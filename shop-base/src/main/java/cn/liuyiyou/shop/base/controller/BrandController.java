package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.service.IBrandService;
import cn.liuyiyou.shop.base.vo.Prod;
import cn.liuyiyou.shop.base.vo.SimpleProdVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 品牌定义表，这里会定义所有可供选择的品牌。
 * 该表会与类目表中的叶子类目关联，以缩小在商品上传时品牌的选择范围（选定商品的所属类目后，只能看到该类目关联的品牌）。
 * 该表还会与商品表关联，以标识商品的品牌。 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
@RestController
@CrossOrigin
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    private IBrandService brandService;

    @GetMapping("/list/{page}-{pageSize}")
    public IPage<Brand> list(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        return brandService.getBrandByPage(page, pageSize);
    }

    @GetMapping("/prods/{brandId}/{page}-{pageSize}")
    public IPage<SimpleProdVo> prods(@PathVariable("brandId") int brandId, @PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        IPage<Prod> prods = brandService.getProdsPageByBrandId(brandId, page, pageSize);
        Page<SimpleProdVo> simpleProdVoPage = new Page<>();
        List<SimpleProdVo> simpleProdVos = new ArrayList<>();
        prods.getRecords().forEach(prod -> {
            SimpleProdVo simpleProdVo = new SimpleProdVo();
            simpleProdVo.setPic(prod.getAlbum().split(",")[0]);
            simpleProdVo.setProdId(prod.getProdId());
            simpleProdVo.setProdName(prod.getProdName());
            simpleProdVo.setProdPrice(Float.valueOf(String.valueOf(Math.random()*100)));
            simpleProdVo.setReferPrice(Float.valueOf(String.valueOf(Math.random()*120)));
            simpleProdVos.add(simpleProdVo);
        });
        simpleProdVoPage.setRecords(simpleProdVos);
        simpleProdVoPage.setTotal(prods.getTotal());
        simpleProdVoPage.setCurrent(prods.getCurrent());
        simpleProdVoPage.setSize(prods.getSize());
        return simpleProdVoPage;
    }
}

