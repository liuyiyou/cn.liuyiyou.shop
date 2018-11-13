package cn.liuyiyou.shop.base.vo;

import cn.liuyiyou.shop.base.entity.Banner;

import java.util.List;

/**
 */
public class BannerVo {
    private List<Banner> firstBannerList;
    private List<BannerIcon> firstBannerIconList;
    private List<Banner> secondBannerList;

    public List<Banner> getFirstBannerList() {
        return firstBannerList;
    }

    public BannerVo setFirstBannerList(List<Banner> firstBannerList) {
        this.firstBannerList = firstBannerList;
        return this;
    }

    public List<BannerIcon> getFirstBannerIconList() {
        return firstBannerIconList;
    }

    public BannerVo setFirstBannerIconList(List<BannerIcon> firstBannerIconList) {
        this.firstBannerIconList = firstBannerIconList;
        return this;
    }

    public List<Banner> getSecondBannerList() {
        return secondBannerList;
    }

    public BannerVo setSecondBannerList(List<Banner> secondBannerList) {
        this.secondBannerList = secondBannerList;
        return this;
    }
}
