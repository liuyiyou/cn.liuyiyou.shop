package cn.liuyiyou.shop.base.controller;


import cn.liuyiyou.shop.base.entity.Area;
import cn.liuyiyou.shop.base.service.IAreaService;
import cn.liuyiyou.shop.common.response.Response;
import cn.liuyiyou.shop.common.response.Result;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-05-15
 */
@Api(description = "省市区接口")
@RestController
@RequestMapping("/area")
public class AreaController {

    @Autowired
    private IAreaService areaService;

    @ApiOperation(value = "根据id获取行政区划")
    @GetMapping("/{id}")
    public Result<Area> getById(@PathVariable Long id) {
        Area area = areaService.getById(id);
        return Response.success(area);
    }


    @ApiOperation(value = "根据pid获取行政区划")
    @GetMapping("/p/{pid}")
    public Result<List<Area>> getByPid(@PathVariable Long pid) {
        List<Area> areas = areaService.list(new LambdaQueryWrapper<Area>().eq(Area::getPid, pid));
        return Response.success(areas);
    }


    @GetMapping("/tree")
    public void getAreaService() {
        List<Area> list = areaService.list(new LambdaQueryWrapper<Area>().eq(Area::getLevel, 3));
        list.forEach(area -> {
            Long id = area.getId();
            String thirdLevelId = String.valueOf(id);
            String pidStr = thirdLevelId.substring(0, 4) + "00";
            Long parentId = Long.valueOf(pidStr);
            area.setPid(parentId);
            areaService.updateById(area);
        });

        list = areaService.list(new LambdaQueryWrapper<Area>().eq(Area::getLevel, 2));
        list.forEach(area -> {
            Long id = area.getId();
            String thirdLevelId = String.valueOf(id);
            String pidStr = thirdLevelId.substring(0, 2) + "0000";
            Long parentId = Long.valueOf(pidStr);
            area.setPid(parentId);
            areaService.updateById(area);
        });

        list = areaService.list(new LambdaQueryWrapper<Area>().eq(Area::getLevel, 1));
        list.forEach(area -> {
            area.setPid(0L);
            areaService.updateById(area);
        });
    }
}

