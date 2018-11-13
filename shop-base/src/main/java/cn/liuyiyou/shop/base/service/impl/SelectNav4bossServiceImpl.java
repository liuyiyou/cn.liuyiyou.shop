package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.SelectNav4boss;
import cn.liuyiyou.shop.base.mapper.SelectNav4bossMapper;
import cn.liuyiyou.shop.base.service.ISelectNav4bossService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * <p>
 * 移动端导航推荐表（首页导航栏中选取导航） 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@Service
public class SelectNav4bossServiceImpl extends ServiceImpl<SelectNav4bossMapper, SelectNav4boss> implements ISelectNav4bossService {

    @Override
    public List<SelectNav4boss> getNav4BossList() {
        LambdaQueryWrapper<SelectNav4boss> bannerQueryWrapper = new QueryWrapper<SelectNav4boss>()
                .lambda()
                .select()
                .eq(SelectNav4boss::getStatus, 1).orderByDesc(SelectNav4boss::getWeight);

        List<SelectNav4boss> nav4bossList = this.list(bannerQueryWrapper);
        Optional.ofNullable(nav4bossList).ifPresent(list -> {
            list.forEach(e -> {
                e.setBanner(null);
                e.setBannerV2(null);
                e.setCreateTime(null);
                e.setHeight(null);
                e.setLastUpdate(null);
                e.setStatus(null);
                e.setStatusTime(null);
                e.setUpdateSuid(null);
                e.setWeight(null);
            });
        });
        return nav4bossList;
    }
}
