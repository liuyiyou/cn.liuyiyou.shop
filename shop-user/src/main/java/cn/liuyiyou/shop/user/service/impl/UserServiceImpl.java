package cn.liuyiyou.shop.user.service.impl;

import cn.liuyiyou.shop.user.entity.User;
import cn.liuyiyou.shop.user.mapper.UserMapper;
import cn.liuyiyou.shop.user.service.IUserService;
import cn.liuyiyou.shop.user.vo.LoginVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.apache.tomcat.util.codec.binary.Base64.decodeBase64;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public String login(LoginVo loginVo) {
        LambdaQueryWrapper<User> skuWrapper = new QueryWrapper<User>()
                .lambda()
                .select()
                .eq(User::getAccount, new String(decodeBase64(loginVo.getAccount().getBytes())));
        User user = userMapper.selectOne(skuWrapper);
        return getLoginTrackId(user);
    }


    private String getLoginTrackId(User user) {
        return user.getUid().toString();
    }
}
