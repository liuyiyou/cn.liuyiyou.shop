package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Banner;
import cn.liuyiyou.shop.base.mapper.BannerMapper;
import cn.liuyiyou.shop.base.service.IBannerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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


}
