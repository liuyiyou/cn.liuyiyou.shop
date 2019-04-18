package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Attribute;
import cn.liuyiyou.shop.base.mapper.AttributeMapper;
import cn.liuyiyou.shop.base.service.IAttributeService;
import cn.liuyiyou.shop.common.vo.PageVo;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 属性定义表
 * <p>
 * 总体上分3中属性：
 * <p>
 * attr_clazz = 1 是为原子属性，原子属性取个值就可以跟商品实例化。
 * <p>
 * attr_clazz = 2 是为简单组合属性，简单组合属性有几个原子属性的排列组成，比如 外包装属性：由 长宽高 三个原子属性组成，甚至由长度单位 这一个原子组成，重复三次。
 * <p>
 * attr_clazz = 3 是为限制组合属性，是比较复杂的组合属性，由多个属性之间的相互限制组成。比如：由定价计划这个属性，这个属性就是给商品定义一些价格和数量的绑定关系。
 * 比如 牛栏奶粉 产品 ， 3罐 500元， 5罐800元，10罐1000元。由  数量 单价 2个属性组成制约关系，并且可以多个制约关系并列。
 * <p>
 * <p>
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-04-12
 */
@Service
public class AttributeService extends ServiceImpl<AttributeMapper, Attribute> implements IAttributeService {

    @Override
    public IPage<Attribute> getAttributeByPage(PageVo pageVo) {
        Page<Attribute> pageQuery = new Page<>(pageVo.getPageNum(), pageVo.getPageSize());
        QueryWrapper<Attribute> queryWrapper = new QueryWrapper<>();
        IPage<Attribute> attributeIPage = this.page(pageQuery, queryWrapper);
        return attributeIPage;
    }
}
