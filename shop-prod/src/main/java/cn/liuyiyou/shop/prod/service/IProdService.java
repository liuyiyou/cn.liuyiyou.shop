package cn.liuyiyou.shop.prod.service;

import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.vo.ProdVo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 商品基本信息表 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-30
 */
public interface IProdService extends IService<Prod> {

    ProdVo getProdById(Long id);
}
