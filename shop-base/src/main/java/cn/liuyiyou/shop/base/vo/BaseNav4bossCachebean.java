package cn.liuyiyou.shop.base.vo;

import cn.liuyiyou.shop.base.entity.Nav4boss;
import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 首页导航缓存
 * @author caoyifeng
 *
 */
public class BaseNav4bossCachebean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3779701268543565294L;
	
	//有效时间 为24小时
	public static final long EXP_TIME = 60 * 60 * 20;

	private List<Nav4boss> NavList;
	
	//类型：1-微信端,2-pc端
	private Byte navType;
	
	private Date createTime;

	// 导航栏名称 精选品牌名称
	private String selectBrandName;

	// 导航栏名称 国家馆名称
	private String globalCountryName;
	
	// 导航栏名称 首页推荐名称
	private String gindexName;
	
//	//秒杀活动集合
//	private List<BaseActivity> activityList;
	public String getGindexName() {
		return gindexName;
	}

	public void setGindexName(String gindexName) {
		this.gindexName = gindexName;
	}

	public String getSelectBrandName() {
		return selectBrandName;
	}

	public void setSelectBrandName(String selectBrandName) {
		this.selectBrandName = selectBrandName;
	}

	public String getGlobalCountryName() {
		return globalCountryName;
	}

	public void setGlobalCountryName(String globalCountryName) {
		this.globalCountryName = globalCountryName;
	}

//	//国家管
//	private List<BaseNation> nationList;
//
	//精选品牌
	private List<JSONObject> brandList;


	public List<JSONObject> getBrandList() {
		return brandList;
	}

	public void setBrandList(List<JSONObject> brandList) {
		this.brandList = brandList;
	}

	public List<Nav4boss> getNavList() {
		return NavList;
	}

//	public List<BaseNation> getNationList() {
//		return nationList;
//	}
//
//	public void setNationList(List<BaseNation> nationList) {
//		this.nationList = nationList;
//	}

	public void setNavList(List<Nav4boss> navList) {
		NavList = navList;
	}

	public Byte getNavType() {
		return navType;
	}

	public void setNavType(Byte navType) {
		this.navType = navType;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

//	public List<BaseActivity> getActivityList() {
//		return activityList;
//	}
//
//	public void setActivityList(List<BaseActivity> activityList) {
//		this.activityList = activityList;
//	}
	
}
