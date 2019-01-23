package cn.liuyiyou.shop.user.controller;


import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import cn.liuyiyou.shop.user.entity.UserDelivery;
import cn.liuyiyou.shop.user.service.IUserDeliveryService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static cn.liuyiyou.shop.common.web.BaseController.getUid;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@RestController
@RequestMapping("/user/delivery")
public class UserDeliveryController {

    @Autowired
    private IUserDeliveryService userDeliveryService;

    @GetMapping("/list")
    public Result<List<UserDelivery>> list(HttpServletRequest request) {
        String uid = getUid(request);
        List<UserDelivery> userDeliveries = userDeliveryService.list(new QueryWrapper<UserDelivery>().eq("uid", uid));
        return Response.success(userDeliveries);
    }
}

