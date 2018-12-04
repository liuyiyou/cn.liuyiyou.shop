package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Nav4boss;
import cn.liuyiyou.shop.base.entity.SelectNav4boss;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 移动端导航推荐表（首页导航栏中选取导航） 服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
public interface ISelectNav4bossService extends IService<SelectNav4boss> {
    List<SelectNav4boss> getNav4BossList();
}
