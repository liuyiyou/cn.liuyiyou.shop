package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.service.IBannerService;
import cn.liuyiyou.shop.base.vo.BannerVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 首页banner配置表 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@RestController
@RequestMapping("/banner")
@CrossOrigin
public class BannerController extends BaseController {


    @Autowired
    private IBannerService bannerService;

    @GetMapping(value = "/v2/banner/load")
    public String loadBanners4HomePage() {
        BannerVo respBody = bannerService.loadBanners4HomePage();
        return formatResponseParams(EXEC_OK, respBody);
    }


}

