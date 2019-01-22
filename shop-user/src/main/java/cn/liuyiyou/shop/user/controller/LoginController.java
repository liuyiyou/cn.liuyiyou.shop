package cn.liuyiyou.shop.user.controller;

import cn.liuyiyou.shop.common.resp.Response;
import cn.liuyiyou.shop.user.service.IUserService;
import cn.liuyiyou.shop.user.vo.LoginVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: liuyiyou.cn
 * @date: 2019/1/22
 * @version: V1.0
 */
@RestController
public class LoginController {


    @Autowired
    private IUserService userService;

    @PostMapping("/login")
    public Response login(@RequestBody LoginVo loginVo) {
        return Response.builder().data(userService.login(loginVo)).success(true).build();
    }

}
