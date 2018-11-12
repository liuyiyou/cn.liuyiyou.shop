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
        wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {

            }
        });
        if (_classify.isWeixinInBrowsers()) {
            $('#scan').show();
            $('#scan').click(function () {
                _classify.scanQRCodeWeixin();
            })
        }
        this.isLoadMessageInfo();
        /*点击搜索框跳转到搜索页*/
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
    scanQRCodeWeixin: function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if (result.indexOf(',') >= 0) {
                    result = result.substring(result.indexOf(',') + 1, result.length);
                }
                $.ajax({
                    type: 'GET',
                    url: '/app/home/v2/qrcode/scan?parm=' + result,
                    data: '',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.respHeader.resultCode == 0) {
                            if (data.respBody.type == 1) {
                                window.location.href = '/prod/' + data.respBody.result + '.html?result=' + result;
                            } else {
                                window.location.href = '/scan/scan-no.html?result=' + result;
                            }
                        }
                    }
                });
            }
        });
    },
    isLoadMessageInfo: function () {
        var trackId = common.getSessionStorage("trackId");
        if (trackId != undefined && trackId != null && trackId != "") {
            utils.getMessageList({mark: 'index'});
        } else {
            $('#message-num').css('display', 'none');
        }
    },
    isWeixinInBrowsers: function () {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        } else {
            return false;
        }
    },
    refreshCart: function () {
        $.ajax({
            type: "GET",
            url: "/app/busi/activity/shopsum",
            dataType: "json",
            contentType: "application/json",
            data: "",
            async: false,
            success: function (data) {
                var respBody = data.respBody;
                parentrespBody = respBody;

                if (respBody && respBody.count > 0) {
                    $("#cart1,#cart").html(respBody.count).show();
                } else {
                    $("#cart1,#cart").hide();
                }

                $("#parentExpireState").click(function () {
                    if ((respBody.parentExpiredState == false && respBody.bmclevel == 0) || respBody.expiredState == false) {
                        window.location.href = "/store/shopkeeper-selected.html";
                    }
                    else if (respBody.expiredState == true && respBody.bmclevel > 0) {
                        $("#expiredState-win,.the-light").show();
                    }
                    else if (respBody.parentExpiredState == true && respBody.bmclevel == 0) {
                        window.location.assign("/index.html");
                    }
                });
                $("#expiredState-win div").click(function () {
                    $("#expiredState-win,.the-light").hide();
                })
            }
        });
    },
    loadData: function () {
        common.ajax("GET", "/app/base/bossNavInfos", "", function (respBody) {
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
                '<a href="/prod/brands-detail.html?brandId=' + brandList[i].brandId + '">' +
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
            "/app/home/v2/searchSelectedBrand?navId=" + String(firstCatalogId),
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

