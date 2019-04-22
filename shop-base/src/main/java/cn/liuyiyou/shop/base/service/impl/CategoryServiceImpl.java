package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Category;
import cn.liuyiyou.shop.base.mapper.CategoryMapper;
import cn.liuyiyou.shop.base.service.ICategoryService;
import cn.liuyiyou.shop.base.vo.CascaderVo;
import cn.liuyiyou.shop.base.vo.CategorySimpleVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
 * 三级目录：4位  （1000-9999） 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-10-31
 */
@Service
@com.alibaba.dubbo.config.annotation.Service(version = "${base.service.version}")
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {


    @Override
    public IPage<Category> getCategoryByParentId(int parentId, int pageNum, int pageSize) {
        Page<Category> pageQuery = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Category> queryWrapper = new QueryWrapper<Category>().lambda().select();
        queryWrapper.eq(Category::getCataParentId, parentId);
        return this.page(pageQuery, queryWrapper);
    }

    @Override
    public IPage<Category> getCategoryByPage(int page, int pageSize) {
        Page<Category> pageQuery = new Page<>(page, pageSize);
        LambdaQueryWrapper<Category> queryWrapper = new QueryWrapper<Category>().lambda().select();
        return this.page(pageQuery, queryWrapper);
    }

    @Override
    public List<Category> findListByLevel(int categoryTyep) {
        List<Category> list = this.list(new QueryWrapper<Category>().eq("cata_type", categoryTyep).orderByDesc(true, "cata_weight"));
        return list;
    }

    @Override
    public List<CategorySimpleVo> getCategoryTree() {
        List<CategorySimpleVo> firstVoList = Lists.newArrayList();
        List<Category> firstCategories = findListByLevel(1);
        firstCategories.forEach(category -> {
            CategorySimpleVo firstVo = new CategorySimpleVo();
            BeanUtils.copyProperties(category, firstVo);
            List<Category> secondCategories = findListByCataParentId(category.getCataId());
            List<CategorySimpleVo> secondVos = secondCategories.stream().map(e -> {
                CategorySimpleVo secondVo = new CategorySimpleVo();
                BeanUtils.copyProperties(e, secondVo);
                secondVo.setParentCataName(e.getCataName());
                List<Category> thirdeCategories = findListByCataParentId(e.getCataId());
                List<CategorySimpleVo> thirdVoList = thirdeCategories.stream().map(e2 -> {
                    CategorySimpleVo thirdVo = new CategorySimpleVo();
                    BeanUtils.copyProperties(e, thirdVo);
                    thirdVo.setParentCataName(e2.getCataName());
                    return thirdVo;
                }).collect(Collectors.toList());
                secondVo.setChildren(thirdVoList);
                return secondVo;
            }).collect(Collectors.toList());
            firstVo.setChildren(secondVos);
            firstVoList.add(firstVo);
        });
        return firstVoList;
    }


    @Override
    public List<CascaderVo> getCascaderVo() {
        List<CascaderVo> firstVoList = Lists.newArrayList();
        List<Category> firstCategories = findListByLevel(1);
        firstCategories.forEach(category -> {
            CascaderVo firstVo = new CascaderVo();
            firstVo.setLabel(category.getCataName());
            firstVo.setValue(category.getCataId());
            List<Category> secondCategories = findListByCataParentId(category.getCataId());
            List<CascaderVo> secondVos = secondCategories.stream().map(e -> {
                CascaderVo secondVo = new CascaderVo();
                secondVo.setValue(e.getCataId());
                secondVo.setLabel(e.getCataName());

                List<Category> thirdeCategories = findListByCataParentId(e.getCataId());
                List<CascaderVo> thirdVoList = thirdeCategories.stream().map(e2 -> {
                    CascaderVo thirdVo = new CascaderVo();
                    thirdVo.setLabel(e2.getCataName());
                    thirdVo.setValue(e2.getCataId());
                    thirdVo.setChildren(null);
                    return thirdVo;
                }).collect(Collectors.toList());
                secondVo.setChildren(thirdVoList);
                return secondVo;
            }).collect(Collectors.toList());
            firstVo.setChildren(secondVos);
            firstVoList.add(firstVo);
        });
        return firstVoList;
    }

    @Override
    public List<Category> findListByCataParentId(Integer cataParentId) {
        List<Category> list = this.list(new QueryWrapper<Category>().eq("cata_parent_id", cataParentId).orderByDesc(true, "cata_weight"));
        return list;
    }
}
