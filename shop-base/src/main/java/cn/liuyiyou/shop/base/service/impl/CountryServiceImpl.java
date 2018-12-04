package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Country;
import cn.liuyiyou.shop.base.mapper.CountryMapper;
import cn.liuyiyou.shop.base.service.CountryService;
import com.alibaba.dubbo.config.annotation.Service;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 * 国家（商品原产地）定义表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
 */
@Service(
        version = "${dubbo.service.version}",
        application = "${dubbo.application.id}",
        protocol = "${dubbo.protocol.id}",
        registry = "${dubbo.registry.id}"
)
@org.springframework.stereotype.Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryMapper countryMapper;

    @Override
    public Country getCountryById(String coutryId) {
        return countryMapper.selectById(coutryId);
    }
}
