package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.mapper.BrandMapper;
import cn.liuyiyou.shop.base.service.IBrandService;
import cn.liuyiyou.shop.common.vo.PageVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * <p>
 * 品牌定义表，这里会定义所有可供选择的品牌。
 * 该表会与类目表中的叶子类目关联，以缩小在商品上传时品牌的选择范围（选定商品的所属类目后，只能看到该类目关联的品牌）。
 * 该表还会与商品表关联，以标识商品的品牌。 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
@Service
@Slf4j
@com.alibaba.dubbo.config.annotation.Service(version = "${base.service.version}")
public class BrandServiceImpl extends ServiceImpl<BrandMapper, Brand> implements IBrandService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public IPage<Brand> getBrandByPage(PageVo pageVo) {
        Page<Brand> pageQuery = new Page<>(pageVo.getPageNum(), pageVo.getPageSize());
        LambdaQueryWrapper<Brand> queryWrapper = new QueryWrapper<Brand>().lambda().select();
        return this.page(pageQuery, queryWrapper);
    }

//    @Override
//    public IPage<Prod> getProdsPageByBrandId(int brandId, int page, int pageSize) {
//        String url = "http://PROD-SERVICE/prod/prods/" + brandId + "/" + page + "-" + pageSize;
//        log.info("url::{}",url);
//        String result = restTemplate.getForEntity(url, String.class).getBody();
//        JSONObject object = JSONObject.parseObject(result);
//        Page<Prod> prodPage = new Page<>();
//        prodPage.setTotal(object.getLong("total"));
//        List<Prod> records = JSONObject.parseArray(object.getString("records"), Prod.class);
//        prodPage.setRecords(records);
//        return prodPage;
//    }
}
