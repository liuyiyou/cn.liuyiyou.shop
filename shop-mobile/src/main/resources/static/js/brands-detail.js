var _brandsDetail = {
    "page": 0,
    "pageSize": 10,
    "totalPage": 0,
    "picDomain": ConstUtil.get("PIC_DOMAIN"),
    windowHeight: $(window).height(),
    loadData: function () {
        if (!common.getQueryStr('brandId')) {
            window.location.href = "/brands.html";
        }
        $.getJSON(
            ConstUtil.get("BASE_URL") + "brand/getBrandInfos?brandId=" + common.getQueryStr('brandId'),
            function (respBody) {
                _brandsDetail.brandInfo(respBody.result);
            });
    },
    brandInfo: function (brandInfo) {
        if (brandInfo.bannerImg) {
            $(".banner .banner-img").attr('src', ConstUtil.get("PIC_DOMAIN") + brandInfo.bannerImg);
        } else {
            $(".banner .banner-img").remove();
        }
        $(".logo").attr('src', ConstUtil.get("PIC_DOMAIN") + brandInfo.brandIcon);
        $("#brandNameEn").html(brandInfo.brandNameEn);
        $("#brandNameCn").html(brandInfo.brandNameCn);
        $("#prodCount").html(brandInfo.prodCount);
        $("#brandDescp").html(brandInfo.brandDescp);
    },
    loadProd: function () {
        $('#bottomLoadingWrapper').find('.text').html('加载中');
        $.getJSON(ConstUtil.get("BASE_URL") + "brand/prods/" + common.getQueryStr('brandId') + "/" + _brandsDetail.page + "-" + _brandsDetail.pageSize,
            function (data) {
                if (data && data.total) {
                    _brandsDetail.totalPage = data.pages;
                    _brandsDetail.page += 1;
                    _brandsDetail.fillProd(data.records);
                } else {
                    if (_brandsDetail.page == 0 || _brandsDetail.totalPage == 0) {
                        $('#prodList').html("");
                        $('#bottomLoadingWrapper').find('.text').html('暂无数据');
                    }
                }
            });
    },
    fillProd: function (prodList) {
        if (prodList && prodList.length > 0) {
            var content = common.getProdItemHtml(prodList, {hasCart: true});
            $("#prodList").append(content);
            $("#prodList img").lazyload({
                placeholder: "../images/banner-default.jpg",
                threshold: this.windowHeight,
                effect: "fadeIn"
            });
        }
    },
    showLoading: function () {
        _notesDetail.loading = true;
        $('#bottomLoadingWrapper').addClass('loading');
    },
    hideLoading: function () {
        _notesDetail.loading = false;
        $('#bottomLoadingWrapper').removeClass('loading');
    },
    loadEnding: function () {
        this.loading = false;
        $('#bottomLoadingWrapper').removeClass('loading').addClass('end');
        $('#bottomLoadingWrapper').find('.text').html('已经到底了');
    },
    scrollHandler: function () {
        var scrollTop = $(window).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight >= scrollHeight) {
            if ((this.page + 1) <= _brandsDetail.totalPage) {
                // 滑动到地部 调用函数 加载数据
                _brandsDetail.loadProd();
            } else {
                _brandsDetail.loadEnding();
            }
        }
    },
    bottomLoadingWrapperEvent: function () {
        var _timer = null;
        $(window).scroll(function () {
            window.clearTimeout(_timer);
            _timer = window.setTimeout(function () {
                _brandsDetail.scrollHandler();
            }, 200);
        });
    }
};
$(function () {
    _brandsDetail.loadData();
    _brandsDetail.loadProd();
    _brandsDetail.bottomLoadingWrapperEvent();
});
