package cn.liuyiyou.shop.base.controller;

import cn.liuyiyou.shop.common.web.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Controller
public class BrandIndexController extends BaseController {

    @GetMapping("/brands")
    public String brands(){
        return "brands";
    }
}
