var index = {
    hasNoReadMessage: function (msgTypeListReturn) {
        var num = 0;
        msgTypeListReturn.forEach(function (i, v) {
            num += (i.ids.length - i.hasReadMessage.length);
        });
        if (num !== 0) {
            if (num >= 100) {
                $('#message-num').css('display', 'block').html('99+');
            } else {
                $('#message-num').css('display', 'block').html(num);
            }
        }
    }
}
var _classify = {
    "picDomain": ConstUtil.get("PIC_DOMAIN"),
    windowHeight: $(window).height(),
    init: function () {
        $("#search").click(function () {
            var referUrl = location.href;
            common.setSessionStorage("referUrl", referUrl);
            location.href = "/search/result.html?from=3";
        });
        $("#message").click(function () {
            gotoPageUrl("/user/message-center.html");
        });
        var trackId = common.getSessionStorage("trackId");
        if (trackId != undefined && trackId != null && $.trim(trackId) != "") {
            this.refreshCart();
        }
        var shopId = common.getSessionStorage("shopId");
        if (shopId && "" != shopId && trackId != undefined && trackId != null && trackId != "") {
            if (parentrespBody.bmclevel > 0) {
                $("#shopMenu").css("display", "block");
                $("#partnerMenu").hide();
            } else {
                if (parentrespBody.parentExpiredState == true) {
                    $("#shopMenu").hide();
                    $("#partnerMenu").show();
                }
                else {
                    $("#shopMenu").css("display", "block");
                    $("#partnerMenu").hide();
                }
            }
            $("#classify-a").css("display", "block");
        } else {
            $("#partnerMenu").css("display", "block");
            $("#shopMenu").hide();
            $("#classify-a").hide();
        }
    },
    loadData: function () {
        common.ajax("GET", ConstUtil.get("BASE_URL")+"nav4boss/bossNavInfos", "", function (respBody) {
            _classify.renderNavList(respBody.navList);
        });
    },
    renderNavList: function (navList) {
        if (navList && navList != "") {
            for (var i = 0; i < navList.length; i++) {
                $(".aside-left").append('<h2 data-id="' + navList[i].navId + '">' + navList[i].navName + '</h2>');
                $(".article-right").append('<div class="article-right-item"><div class="prod"><ul class="clearfix"></ul></div><div class="brand"><ul class="clearfix"></ul></div></div>');
                for (var j = 0; j < navList[i].childNavList.length; j++) {
                    var navIcon = navList[i].childNavList[j].navIcon;
                    $(".article-right-item").eq(i).find(".prod ul").append(
                        '<li class="fl fs12 tac">' +
                        '<a href="' + navList[i].childNavList[j].navUrl + '">' +
                        '<img src="' + (navIcon ? _classify.picDomain + navIcon : '') + '">' +
                        '<span>' + navList[i].childNavList[j].navName + '</span>' +
                        '</a>' +
                        '</li>');
                }
            }
            _classify.serchBrand(navList[0].navId, 0);
            $(".article-right-item").eq(0).css('display', 'block');
            $(".aside-left h2").eq(0).addClass('active');
            $(".article-right-item .prod img").lazyload({
                placeholder: "../images/banner-default.jpg",
                threshold: this.windowHeight,
                effect: "fadeIn"
            });
        }
    },
    renderBrandList: function (brandList, index) {
        for (var i = 0; i < brandList.length; i++) {
            $(".article-right-item").eq(index).find(".brand ul").append(
                '<li class="fl fs12 tac">' +
                '<a href="/brands-detail.html?brandId=' + brandList[i].brandId + '">' +
                '<img data-original="' + (brandList[i].brandIcon ? _classify.picDomain + brandList[i].brandIcon : "") + '">' +
                '</a>' +
                '</li>');
        }
        $(".article-right .brand img").lazyload({
            placeholder: "../images/banner-default.jpg",
            threshold: this.windowHeight,
            effect: "fadeIn"
        });
    },
    tab: function () {
        $(".aside-left").on('click', 'h2', function () {
            $(".aside-left h2").removeClass('active');
            $(this).addClass("active");
            $(".article-right-item").hide().eq($(this).index()).show();
            $(".classify-bigkuang article.fr").scrollTop(0);
            if ($(".article-right-item").eq($(this).index()).find(".brand ul").html() == "") {
                _classify.serchBrand($(this).attr("data-id"), $(this).index());
            }
        });
    },
    serchBrand: function (firstCatalogId, index) {
        common.ajax(
            "GET",
            ConstUtil.get("BASE_URL")+"brandGroup/v2/searchSelectedBrand?navId=" + String(firstCatalogId),
            "",
            function (respBody) {
                _classify.renderBrandList(respBody.brandList, index);
            });
    }
};
$(function () {
    _classify.loadData();
    _classify.tab();
    _classify.init();
    setTimeout(function () {
        $(".content-main").height($(window).height() - $("#index-top").outerHeight(true) - $("#shopMenu").outerHeight(true));
    }, 1000);
});

