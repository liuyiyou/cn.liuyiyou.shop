package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Banner;
import cn.liuyiyou.shop.base.mapper.BannerMapper;
import cn.liuyiyou.shop.base.service.IBannerService;
import cn.liuyiyou.shop.base.service.IConfigService;
import cn.liuyiyou.shop.base.vo.BannerIcon;
import cn.liuyiyou.shop.base.vo.BannerVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static cn.liuyiyou.shop.common.utils.CollUtil.returnEmptyListIfNull;
import static com.alibaba.fastjson.JSON.parseArray;
import static java.util.stream.Collectors.groupingBy;

/**
 * <p>
 * 首页banner配置表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@Service
public class BannerServiceImpl extends ServiceImpl<BannerMapper, Banner> implements IBannerService {

    @Autowired
    private IConfigService configService;

    @Override
    public BannerVo loadBanners4HomePage() {
        LambdaQueryWrapper<Banner> bannerQueryWrapper = new QueryWrapper<Banner>().lambda().select().eq(Banner::getType, 1);
        Map<String, List<Banner>> stringListMap = dealWithBannerList(this.list(bannerQueryWrapper));
        List<BannerIcon> bannerIcons = getBannerIcons();
        BannerVo vo = new BannerVo();
        vo.setFirstBannerList(stringListMap.get("1"))
                .setFirstBannerIconList(bannerIcons)
                .setSecondBannerList(stringListMap.get("2"));
        return vo;
    }

    public List<BannerIcon> getBannerIcons() {
        List<BannerIcon> bannerIcons = parseArray(configService.getById(10087).getConfigValue(), BannerIcon.class);
        return bannerIcons;
    }


    private Map<String, List<Banner>> dealWithBannerList(List<Banner> banners) {
        return returnEmptyListIfNull(banners)
                .stream()
                .collect(groupingBy(baseBanner -> baseBanner.getPosition().toString()));
    }
}
