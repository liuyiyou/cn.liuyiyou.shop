package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.ISelectNav4bossService;
import cn.liuyiyou.shop.common.web.BaseController;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
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

