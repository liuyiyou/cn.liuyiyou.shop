package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.ISelectNav4bossService;
import cn.liuyiyou.shop.common.web.BaseController;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @since 2018-11-13
 */
@RestController
@RequestMapping("/selectNav4boss")
@CrossOrigin
public class SelectNav4bossController extends BaseController {

    @Autowired
    private ISelectNav4bossService nav4bossService;

    @GetMapping(value = "/v2/selectednavs")
    public String getSelectedNav() {
        return formatResponseParams(EXEC_OK, new JSONObject() {{
            put("navs", nav4bossService.getNav4BossList());
        }});
    }
}

