package cn.liuyiyou.shop.user.service;

import cn.liuyiyou.shop.user.entity.User;
import cn.liuyiyou.shop.user.vo.LoginVo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
public interface IUserService extends IService<User> {

    String login(LoginVo loginVo);
}
