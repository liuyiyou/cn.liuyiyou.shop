package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.vo.CategorySimpleVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 类目定义表。
 * 支持三级继承类目：
 * cata_type=1：一级类目
 * cata_type=2：二级类目
 * cata_type=3：三级类目
 * <p>
 * 目录ID规则
 * 一级目录： 2位 （10-99）
 * 二级目录： 3位 （100-999）
 * 三级目录：4位  （1000-9999） 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
public interface ICategoryService extends IService<Category> {

    IPage<Category> getCategoryByPage(int page, int pageSize);

    List<Category> findListByLevel(int level);

    List<CategorySimpleVo> getCategoryTree();

    List<Category> findListByCataParentId(Integer cataParentId);
}
