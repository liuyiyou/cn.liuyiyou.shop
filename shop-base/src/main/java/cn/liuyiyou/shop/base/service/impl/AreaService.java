package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Area;
import cn.liuyiyou.shop.base.mapper.AreaMapper;
import cn.liuyiyou.shop.base.service.IAreaService;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-05-15
 */
@Service
@com.alibaba.dubbo.config.annotation.Service(version = "${base.service.version}")
public class AreaService extends ServiceImpl<AreaMapper, Area> implements IService<Area>, IAreaService {

}
