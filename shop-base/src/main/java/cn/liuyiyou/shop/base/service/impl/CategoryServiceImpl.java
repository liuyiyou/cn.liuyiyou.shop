package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Brand;
import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.mapper.CategoryMapper;
import cn.liuyiyou.shop.base.service.ICategoryService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 类目定义表。
支持三级继承类目：
cata_type=1：一级类目
cata_type=2：二级类目
cata_type=3：三级类目

目录ID规则
一级目录： 2位 （10-99） 
二级目录： 3位 （100-999）
三级目录：4位  （1000-9999） 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {


    @Override
    public IPage<Category> getCategoryByPage(int page, int pageSize) {
        Page<Category> pageQuery = new Page<>(page,pageSize);
        LambdaQueryWrapper<Category> queryWrapper = new QueryWrapper<Category>().lambda().select();
        return this.page(pageQuery,queryWrapper);
    }
}
