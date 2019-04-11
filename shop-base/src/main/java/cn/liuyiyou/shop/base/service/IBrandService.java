package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.common.vo.PageVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
public interface IBrandService extends IService<Brand> {

    IPage<Brand> getBrandByPage(PageVo pageVo);

}
