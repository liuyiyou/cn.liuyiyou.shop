var _brandsDetail = {
    "page": 0,
    "pageSize": 10,
    "totalPage": 0,
    "picDomain": ConstUtil.get("PIC_DOMAIN"),
    windowHeight: $(window).height(),
    loadData: function () {
        if (!common.getQueryStr('brandId')) {
            window.location.href = "/prod/brands.html";
        }
        // $.getJSON(
        //     "/app/base/getBrandInfos?brandId=" + common.getQueryStr('brandId'),
        //     function (respBody) {
        //         _brandsDetail.initBrandsHall(respBody.catalogList);
        //         _brandsDetail.brandInfo(respBody.brandInfo);
        //     });
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
        $.getJSON( ConstUtil.get("BASE_URL") +"brand/prods/" + common.getQueryStr('brandId') + "/0-10",
            function (data) {
                if (data && data.total) {
                    _brandsDetail.totalPage = data.total;
                    _brandsDetail.page += 1;
                    _brandsDetail.fillProd(data.records);
                } else {
                    if (_brandsDetail.page == 0 || _brandsDetail.totalPage == 0) {
                        $('#prodList').html("");
                        $('#bottomLoadingWrapper').find('.text').html('暂无数据');
                    } else {

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
    cartBtnEvent: function () {
        $.fn.cartInList && $('#prodList').cartInList();
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
    },
    initBrandsHall: function (catalogList) {
        if (catalogList && catalogList.length > 0) {
            var html = "";
            for (var i = 0; i < catalogList.length; i++) {
                html += '<div class="swiper-slide">';
                html += '<a href="/prod/brands.html">';
                html += '<span class="txt">' + catalogList[i].cataName + '</span>';
                html += '<div class="img-box">';
                for (var j = 0; j < catalogList[i].recommendBrands.length; j++) {
                    var icon = catalogList[i].recommendBrands[j].brandIcon;
                    html += '<img src="' + (icon ? (ConstUtil.get("PIC_DOMAIN") + icon) : "../images/banner-default.jpg") + '" />';
                }
                html += '</div><span class="more"></span></a></div>';
            }
            $(".brands-swiper .swiper-wrapper").html(html);
            setTimeout(function () {
                var mySwiper = new Swiper('.brands-swiper .swiper-container', {
                    direction: 'vertical',
                    loop: true,
                    speed: 500,
                    autoplay: true,
                    delay: 5000
                });
            }, 1000)
        } else {
            $(".brands-hall").hide();
        }
    }
};
$(function () {
    // _brandsDetail.cartBtnEvent();
    // _brandsDetail.loadData();
    _brandsDetail.loadProd();
    _brandsDetail.bottomLoadingWrapperEvent();
});
