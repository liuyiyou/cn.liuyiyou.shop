package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.INav4bossService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 移动端导航推荐表（首页导航栏中选取导航） 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@RestController
@RequestMapping("/nav4boss")
@CrossOrigin
public class Nav4bossController extends BaseController {

    @Autowired
    private INav4bossService nav4bossService;

    @GetMapping(value = "/v2/selectednavs")
    public String getSelectedNav() {
        return formatResponseParams(EXEC_OK, new JSONObject() {{
            put("navs", nav4bossService.getNav4BossList());
        }});
    }
}

