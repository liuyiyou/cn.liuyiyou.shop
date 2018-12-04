package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.BrandGroup;
import cn.liuyiyou.shop.base.vo.BaseBrandVO;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
public interface IBrandGroupService extends IService<BrandGroup> {

    List<BaseBrandVO> searchSelectedBrands(BrandGroup brandGroup);
}
