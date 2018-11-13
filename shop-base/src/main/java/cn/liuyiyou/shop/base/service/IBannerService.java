package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Banner;
import cn.liuyiyou.shop.base.vo.BannerVo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 首页banner配置表 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
public interface IBannerService extends IService<Banner> {

    BannerVo loadBanners4HomePage();
}
