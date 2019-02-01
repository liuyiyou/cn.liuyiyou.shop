package cn.liuyiyou.shop.prod.service.impl;

import cn.liuyiyou.shop.prod.entity.ProdSku;
import cn.liuyiyou.shop.prod.mapper.ProdSkuMapper;
import cn.liuyiyou.shop.prod.service.IProdSkuService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 商品基本信息表 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-02
 */
@Service
@com.alibaba.dubbo.config.annotation.Service(version = "${prod.service.version}")
public class ProdSkuServiceImpl extends ServiceImpl<ProdSkuMapper, ProdSku> implements IProdSkuService {

}
