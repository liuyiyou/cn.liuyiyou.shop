package cn.liuyiyou.shop.base.controller;


import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;

/**
 * <p>
 * 属性值定义表，为枚举型的属性定义一些可选范围的值。

在实例化的时候，需要将值拷贝到 产品实例记录。在这里不存在的值，在维护产品的时候不需要添加到这里。

 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@Controller
@RequestMapping("/config")
public class ConfigController {

}

