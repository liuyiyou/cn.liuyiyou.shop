package cn.liuyiyou.shop.prod.controller;


import cn.liuyiyou.shop.common.web.BaseController;
import cn.liuyiyou.shop.prod.entity.HomePageProd;
import cn.liuyiyou.shop.prod.service.IHomePageProdService;
import cn.liuyiyou.shop.prod.service.IProdService;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 与base_selected_nation4boss和base_selected_nav4boss两个表相关联的首页推荐产品保存表(首页推荐商品表) 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
@RestController
@RequestMapping("/homePageProd")
@CrossOrigin
public class HomePageProdController extends BaseController {

    @Autowired
    private IHomePageProdService homePageProdService;

    @RequestMapping(value = "/v2/selectednavs/prods", method = RequestMethod.GET)
    public IPage<HomePageProd> getSelectedNavProd(@RequestParam(value = "reqBody") String reqBody) {
        JSONObject body = JSONObject.parseObject(reqBody);
        String pageString = body.getString("page");
        String pageSizeString = body.getString("pageSize");
        Page<HomePageProd> pageQuery = new Page<>(1, 10);
        if (!StringUtils.isEmpty(pageString) && !StringUtils.isEmpty(pageSizeString)) {
            pageQuery = new Page<>(Integer.parseInt(pageString), Integer.parseInt(pageSizeString));
        }
        LambdaQueryWrapper<HomePageProd> bannerQueryWrapper = new QueryWrapper<HomePageProd>()
                .lambda()
                .select()
                .eq(HomePageProd::getNavId, body.getInteger("navId")).orderByDesc(HomePageProd::getWeight);
        IPage<HomePageProd> page = homePageProdService.page(pageQuery, bannerQueryWrapper);
        return page;
    }

}

