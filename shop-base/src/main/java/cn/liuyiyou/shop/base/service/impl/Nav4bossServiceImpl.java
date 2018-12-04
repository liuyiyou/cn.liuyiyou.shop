package cn.liuyiyou.shop.base.service.impl;

import cn.liuyiyou.shop.base.entity.Nav4boss;
import cn.liuyiyou.shop.base.mapper.Nav4bossMapper;
import cn.liuyiyou.shop.base.service.INav4bossService;
import cn.liuyiyou.shop.base.vo.BaseNav4bossCachebean;
import cn.liuyiyou.shop.common.utils.StringUtil;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static cn.liuyiyou.shop.base.entity.Nav4boss.NAV_STATUS_USED;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-13
 */
@Service
public class Nav4bossServiceImpl extends ServiceImpl<Nav4bossMapper, Nav4boss> implements INav4bossService {


    @Override
    public BaseNav4bossCachebean getBossNavInfos() {
        return buildBossNav();
    }

    public BaseNav4bossCachebean buildBossNav() {
        BaseNav4bossCachebean cachebean = new BaseNav4bossCachebean();
        List<Nav4boss> navList = findBaseNav4boss();
        List<Nav4boss> topNavList = new ArrayList<>();
        Map<String, HashMap<String, Nav4boss>> navMap = new HashMap<>();
        String parentNavId = null;
        HashMap<String, Nav4boss> childNavMap = null;
        for (Nav4boss nav : navList) {
            if (null == nav) {
                continue;
            }
            if (StringUtil.isNotEmptyString(nav.getCataIds())) {
                JSONObject obj = new JSONObject();
                List<Integer> cataList = JSONObject.parseArray(nav.getCataIds(), Integer.class);
                if (null != cataList && cataList.size() > 0) {
                    obj.put("cataId", cataList.get(0));
                    nav.setParameters(obj);
                    nav.setNavUrl("/prod/list.html?cataId=" + cataList.get(0));
                }
            } else if (StringUtil.isNotEmptyString(nav.getNavUrl())) {
                JSONObject obj = new JSONObject();
                String url = nav.getNavUrl();
                String[] strs = url.split("[?]");
                String[] paramsarr = strs[1].split("[&]");
                for (String st : paramsarr) {
                    String[] keyVal = st.split("[=]");
                    if (keyVal.length > 0) {
                        obj.put(keyVal[0], keyVal[1]);
                    }

                }
                nav.setParameters(obj);
            } else {
                JSONObject obj = new JSONObject();
                obj.put("cataId", 0);
                nav.setParameters(obj);
            }
            if (Nav4boss.NAV_LEVEL_TOP.equals(nav.getNavLevel())) {
                topNavList.add(nav);
            } else {
                if (null == nav.getParentNavId()) {
                    parentNavId = "0";
                } else {
                    parentNavId = String.valueOf(nav.getParentNavId());
                }
                childNavMap = navMap.get(parentNavId);
                if (null == childNavMap) {
                    childNavMap = new HashMap<>();
                }
                childNavMap.put(String.valueOf(nav.getNavId()), nav);
                navMap.put(parentNavId, childNavMap);
            }
        }
        if (topNavList.size() > 0) {
            topNavList = sortNavListByWeight(topNavList);
            for (Nav4boss topNav : topNavList) {
                buildChildNavList(topNav, navMap);
            }
        }
        cachebean.setNavList(topNavList);
        return cachebean;
    }

    public List<Nav4boss> findBaseNav4boss() {
        return this.list(new QueryWrapper<Nav4boss>().eq("nav_type", "1").eq("status", NAV_STATUS_USED));
    }


    private Nav4boss buildChildNavList(Nav4boss nav, Map<String, HashMap<String, Nav4boss>> navMap) {
        if (null == nav) {
            return null;
        }
        String key = null;
        Nav4boss childNav = null;
        String parentNavId = null;
        HashMap<String, Nav4boss> childNavMap = null;

        List<Nav4boss> childNavList = new ArrayList<>();
        parentNavId = String.valueOf(nav.getNavId());

        childNavMap = navMap.get(parentNavId);
        if (null != childNavMap) {
            Iterator<String> it = childNavMap.keySet().iterator();
            while (it.hasNext()) {
                key = it.next();
                childNav = childNavMap.get(key);
                //再检查一下他的上级是不是真的是当前的上级
                if (nav.getNavId().equals(childNav.getParentNavId())) {
                    //如果是二级，还要再查三级的
                    if (Nav4boss.NAV_LEVEL_SEC.equals(childNav.getNavLevel())) {
                        childNav = buildChildNavList(childNav, navMap);
                    }
                    if (nav.getStatus().equals(NAV_STATUS_USED)) {
                        childNavList.add(childNav);
                    }
                }
            }
            childNavList = sortNavListByWeight(childNavList);
            nav.setChildNavList(childNavList);
        }
        return nav;
    }

    private List<Nav4boss> sortNavListByWeight(List<Nav4boss> navList) {
        if (null != navList && navList.size() > 1) {
            Collections.sort(navList, (f1, f2) -> {
                if (null == f1.getWeight()) {
                    f1.setWeight(0);
                }
                if (null == f2.getWeight()) {
                    f2.setWeight(0);
                }
                if (f1.getWeight().intValue() > f2.getWeight().intValue()) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }
        return navList;
    }


}
