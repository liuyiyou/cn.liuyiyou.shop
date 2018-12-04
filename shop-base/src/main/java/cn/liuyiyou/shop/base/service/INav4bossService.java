package cn.liuyiyou.shop.base.service;

import cn.liuyiyou.shop.base.entity.Nav4boss;
import cn.liuyiyou.shop.base.vo.BaseNav4bossCachebean;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
public interface INav4bossService extends IService<Nav4boss> {

    BaseNav4bossCachebean getBossNavInfos();
}
