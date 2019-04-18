package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Config;
import cn.liuyiyou.shop.base.mapper.ConfigMapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。

在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。

 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@Service
public class ConfigServiceImpl extends ServiceImpl<ConfigMapper, Config> implements IService<Config> {

}
