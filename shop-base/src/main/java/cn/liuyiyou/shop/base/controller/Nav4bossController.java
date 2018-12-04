package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.INav4bossService;
import cn.liuyiyou.shop.common.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@RestController
@RequestMapping("/nav4boss")
@CrossOrigin
public class Nav4bossController extends BaseController {

    @Autowired
    private INav4bossService nav4bossService;

    @GetMapping(value = "/bossNavInfos")
    public String getBossNavInfos() {
        return formatResponseParams(EXEC_OK, nav4bossService.getBossNavInfos());
    }
}

