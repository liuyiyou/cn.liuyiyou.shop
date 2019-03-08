package cn.liuyiyou.shop.user.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Data
public class LoginVo {

    @NotNull(message = "用户名不能为空")
    String account;
    @NotNull(message = "用户密码不能为空")
    String password;
}
