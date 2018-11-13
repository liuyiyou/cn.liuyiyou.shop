package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.BrandGroup;
import cn.liuyiyou.shop.base.service.IBrandGroupService;
import cn.liuyiyou.shop.base.vo.BaseBrandVO;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@RestController
@RequestMapping("/brandGroup")
@CrossOrigin
public class BrandGroupController extends BaseController {

    @Autowired
    private IBrandGroupService brandGroupService;

    @GetMapping(value = "/v2/searchSelectedBrand")
    public String searchSelectedBrand(@RequestParam String navId) {
        BrandGroup brandGroup = new BrandGroup();
        brandGroup.setStatus(true);
        brandGroup.setNavId(Integer.parseInt(navId));
        List<BaseBrandVO> baseBrandList = brandGroupService.searchSelectedBrands(brandGroup);
        JSONObject reqBody = new JSONObject();
        reqBody.put("brandList", baseBrandList);
        return formatResponseParams(EXEC_OK, reqBody);
    }
}

