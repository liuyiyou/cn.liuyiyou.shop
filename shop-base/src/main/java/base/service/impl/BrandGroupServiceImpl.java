package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.entity.BrandGroup;
import cn.liuyiyou.shop.base.mapper.BrandGroupMapper;
import cn.liuyiyou.shop.base.service.IBrandGroupService;
import cn.liuyiyou.shop.base.service.IBrandService;
import cn.liuyiyou.shop.base.vo.BaseBrandVO;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static cn.liuyiyou.shop.common.utils.CollUtil.isNotEmpty;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@Service
public class BrandGroupServiceImpl extends ServiceImpl<BrandGroupMapper, BrandGroup> implements IBrandGroupService {

    @Autowired
    private IBrandService brandService;

    @Override
    public List<BaseBrandVO> searchSelectedBrands(BrandGroup brandGroup) {
        List<BaseBrandVO> baseBrandList = new ArrayList<>();
        List<BrandGroup> baseBrandGroups = this.list(new QueryWrapper<BrandGroup>().eq("nav_id", brandGroup.getNavId()).eq("status", brandGroup.getStatus()));
        if (isNotEmpty(baseBrandGroups)) {
            List<Integer> brandIds = null;
            List<JSONObject> brandIdObjs = JSONObject.parseArray(baseBrandGroups.get(0).getBrandArray(), JSONObject.class);
            if (isNotEmpty(brandIdObjs)) {
                brandIds = new ArrayList<>();
                sortJson(brandIdObjs);
                for (JSONObject jon : brandIdObjs) {
                    brandIds.add(jon.getInteger("id"));
                }
            }
            if (isNotEmpty(brandIds)) {
                List<Brand> brands = (List<Brand>) brandService.listByIds(brandIds);
                if (isNotEmpty(brands)) {
                    brands.removeAll(Collections.singleton(null));
                    brands.forEach(e -> {
                        BaseBrandVO brandVO = new BaseBrandVO();
                        brandVO.setBrandId(e.getBrandId());
                        brandVO.setBrandIcon(e.getBrandIcon() == null ? "" : e.getBrandIcon());
                        baseBrandList.add(brandVO);
                    });
                }
            }
        }
        return baseBrandList;
    }

    private void sortJson(List<JSONObject> brandIdObjs) {
        Collections.sort(brandIdObjs, (f1, f2) -> {
            if (null == f1.getInteger("wt")) {
                f1.put("wt", 0);
            }
            if (null == f2.getInteger("wt")) {
                f2.put("wt", 0);
            }
            if (f1.getInteger("wt") > f2.getInteger("wt")) {
                return -1;
            } else if (f1.getInteger("wt") < f2.getIntValue("wt")) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}
