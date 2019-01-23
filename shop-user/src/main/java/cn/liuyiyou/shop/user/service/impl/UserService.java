package cn.liuyiyou.shop.user.service.impl;

import cn.liuyiyou.shop.common.utils.DateUtil;
import cn.liuyiyou.shop.common.utils.MD5ToAnyP;
import cn.liuyiyou.shop.user.entity.User;
import cn.liuyiyou.shop.user.mapper.UserMapper;
import cn.liuyiyou.shop.user.service.IUserService;
import cn.liuyiyou.shop.user.vo.LoginVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.apache.tomcat.util.codec.binary.Base64.decodeBase64;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@Service
public class UserService extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public String login(LoginVo loginVo) {
        LambdaQueryWrapper<User> skuWrapper = new QueryWrapper<User>()
                .lambda()
                .select()
                .eq(User::getAccount, new String(decodeBase64(loginVo.getAccount().getBytes())));
        User user = userMapper.selectOne(skuWrapper);
        Optional.ofNullable(user).orElseThrow(() -> new RuntimeException("账号或密码不正确"));
        return getLoginTrackId(user);
    }


    private String getLoginTrackId(User user) {
        String timeStamp = DateUtil.getNowTimeStampStr();
        StringBuffer sb = new StringBuffer();
        MD5ToAnyP md5 = new MD5ToAnyP();
        sb.append(md5.getMD5ofStr(user.getUid().toString())).append("-");
        sb.append(new String(Base64.encodeBase64(user.getUid().toString().getBytes()))).append("-");
        sb.append(new String(Base64.encodeBase64(timeStamp.getBytes())));
        return sb.toString();
    }

}
