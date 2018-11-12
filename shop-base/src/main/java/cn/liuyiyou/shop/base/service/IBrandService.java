package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.vo.Prod;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 品牌定义表，这里会定义所有可供选择的品牌。
该表会与类目表中的叶子类目关联，以缩小在商品上传时品牌的选择范围（选定商品的所属类目后，只能看到该类目关联的品牌）。
该表还会与商品表关联，以标识商品的品牌。 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
public interface IBrandService extends IService<Brand> {

    IPage<Brand> getBrandByPage(int page, int pageSize);


    IPage<Prod> getProdsPageByBrandId(int brandId, int page, int pageSize);
}
