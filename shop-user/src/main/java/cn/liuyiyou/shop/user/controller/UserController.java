package cn.liuyiyou.shop.user.controller;


import cn.liuyiyou.shop.common.req.ReqBody;
import cn.liuyiyou.shop.common.resp.Response;
import cn.liuyiyou.shop.common.web.BaseController;
import cn.liuyiyou.shop.user.entity.User;
import cn.liuyiyou.shop.user.service.IUserService;
import cn.liuyiyou.shop.user.vo.LoginVo;
import cn.liuyiyou.shop.user.vo.Prod;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController extends BaseController {

    @Autowired
    private IUserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/prods")
    public IPage<Prod> prods() {
        String page = restTemplate.getForEntity("http://PROD-SERVICE/prod/list", String.class).getBody();
        Page<Prod> prodPage = JSONObject.parseObject(page, new TypeReference<Page<Prod>>() {
        });
        return prodPage;
    }


    @PostMapping("/login")
    public Response login(@RequestBody ReqBody reqBody) {
        LoginVo loginVo = JSONObject.parseObject(reqBody.getReqBody().toJSONString(), LoginVo.class);
        return Response.builder().data(userService.login(loginVo)).build();
    }


    @GetMapping("/get")
    public Response get(HttpServletRequest request) {
        String uid = getUid(request);
        Optional.ofNullable(uid).orElseThrow(() -> new RuntimeException("未登陆"));
        User user = userService.getById(Integer.valueOf(uid));
        return Response.builder().data(user).build();
    }


    @GetMapping("/list")
    public Response list() {
        LambdaQueryWrapper<User> userWrap = new QueryWrapper<User>()
                .lambda()
                .select().last("1= 1 limit 10");
        List<User> list = userService.list(userWrap);
        return Response.builder().data(list).build();
    }
}

