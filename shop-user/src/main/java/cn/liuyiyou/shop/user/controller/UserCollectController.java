package cn.liuyiyou.shop.user.controller;

import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/8
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@RestController
public class UserCollectController {

    @ApiOperation("用户收藏")
    @GetMapping("/user/collect")
    public Result collect() {
        return Response.success();
    }
}
