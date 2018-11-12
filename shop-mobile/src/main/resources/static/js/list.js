$(init);

var pageSize = 12;
var cataId = 0;
var isNationProd = 1; // 是否杨老板的商品
var brandCountryId = "";
var brandIds = "";
var gPage = 0;
var order = "";
var hasStock = 1;
var minPrice = "";
var maxPrice = "";
var minUnit = "";

var gMoreProd = 1;// 是否还有更多产品
var selectedBrandList = new Array();
var displayBrandStr = "";
var selectedCountryName = "";
var countryList = null;
var loading = false;
var cataParentName = "";
var cataParentId = "";

function init() {
    cartBtnEvent();
    $(".search input").click(function () {
        var referUrl = window.location.href;
        common.setSessionStorage("referUrl", referUrl);
        window.location.href = "/search/result.html";
    });
    $("#showMoreCataBtn").click(function () {
        if ($("#cataLiAllUll li").length > 6) {
            $("#cataLiAllUll li:gt(5)").slideDown(500);
        }
        else {
            $("#cataLiAllUll li:gt(5)").slideUp(500);
        }
    });
    $("#showAllCountryImg").click(function () {
        if (!$("#showAllCountryImg img").hasClass("transition")) {
            $("#showAllCountryImg img").addClass("transition");
            $("#countryList li:gt(5)").slideDown(500);
        }
        else {
            $("#showAllCountryImg img").removeClass("transition");
            $("#countryList li:gt(5)").slideUp(500);
        }
    });
    $("#showMoreBrandBtn").click(function () {
        if (!$("#showMoreBrandBtn img").hasClass("transition")) {
            $("#showMoreBrandBtn img").addClass("transition");
            $("#brandLi li:gt(5)").slideDown(500);
        }
        else {
            $("#showMoreBrandBtn img").removeClass("transition");
            $("#brandLi li:gt(5)").slideUp(500);
        }
    });
    $("#hideSelectDiv,.masklist").click(function () {
        $("#selectDiv,.list-foot").removeClass("list2width");
        setTimeout(function () {
            $(".masklist").hide();
        }, 600)
        $(".masklist").removeClass("backlist");
        $("body").removeClass("over-hd");
    });
    $("#selectnavbo").click(function () {
        $("#list-devide,.list2-kuang1,.list2-kuang2,#hideSelectDiv,#ShowHideDiv,#hideAllImg11,#submit2,#showMoreCataBtn").show();
        $(".list2-kuang3,#selectnavbo,.selectdiv,#submit1").hide();
        $(".list2-head p").html("筛选");
        $(".isSelectTop").parent().find(".list2-kuang1-middle1").slideUp();
    });
    $("#ShowHideDiv").click(function () {
        $("#navbottom").unbind("click");
        $(".list2-kuang1,.list2-kuang2,#list-devide,#hideAllImg11,#hideSelectDiv,#ShowHideDiv,#list-devide,#showMoreCataBtn").hide();
        $(".list2-head p").html("全部分类");
        $(".list2-kuang3,.selectdiv,#selectnavbo").show();
        $("#submit2").hide();
        $("#submit1").show();
        $("#hideAllImg10").toggle();
    });
    cataId = common.getQueryStr("cataId");
    if (cataId == "") {
        cataId = 0;
        // cataId = 1102;
    }

    order = "stateDateDown";
    $("#stateDateUp").addClass("selected");

    brandCountryId = common.getQueryStr("country");
    brandIds = common.getQueryStr("brandIds");


    fetchCatalogById(cataId, brandIds, brandCountryId);
    fetchProdsBySelect(cataId, brandCountryId, brandIds, gPage, pageSize, order,
        minPrice, maxPrice, minUnit, hasStock);
    fetchNav();
    $(window).scroll(
        function () {
            var scrollTop = $(this).scrollTop();
            var height = $(this).height();
            var contentHeight = $("section").height() + 100;
            var h = scrollTop + height - contentHeight;
            //var distance = contentHeight - scrollTop - height;
            if (h >= 0) {
                fetchProdsBySelect(cataId, brandCountryId, brandIds, gPage,
                    pageSize, order, minPrice, maxPrice, minUnit,
                    hasStock);
            }
        });


    $(".list-head div").click(function () {

        var id = $(this).attr("id");
        if ($(this).hasClass("selected") && id == "stateDateUp") {
            return;
        }
        $(this).addClass("selected").siblings().removeClass("selected");
        if (id == "showSelectDiv") {
            showSelectDiv();
            $("body").addClass("over-hd");
            return;
        }


        if (id == "stateDateUp") {
            order = "stateDateUp";
            $("#priceDefault").show();
            $("#priceDown").hide();
            $("#priceUp").hide();
        } else if (id == "priceFilter") {
            if (order == "priceUp") {
                order = "priceDown";
                $("#priceDefault").hide();
                $("#priceDown").show();
                $("#priceUp").hide();
            } else {
                order = "priceUp";
                $("#priceDefault").hide();
                $("#priceDown").hide();
                $("#priceUp").show();
            }
        }
        gPage = 0;
        gMoreProd = 1;
        $("#prodList").html("");

        fetchProdsBySelect(cataId, brandCountryId, brandIds,
            gPage, pageSize, order, minPrice, maxPrice,
            minUnit, hasStock);

    });


    $("#reset").click(function () {
        $("#countryList li").removeClass("selected");
        $("#brandLi li").removeClass("selected");
        $("#selectedBrandList").html("");
        displayBrandStr = "";
    });

    $("#submit2").click(function () {
        gPage = 0;
        gMoreProd = 1;
        $("#prodList").html("");
        selectedBrandList = new Array();
        $("#brandLi li").each(function () {
            var brandId = $(this).val();
            if ($(this).hasClass("selected")) {
                selectedBrandList.push(brandId);
            } else {
                if (selectedBrandList.length > 0) {
                    $.each(selectedBrandList, function (index, item) {
                        if (item == brandId) {
                            selectedBrandList.splice(index, 1);
                        }
                    });
                }


            }
        });

        if (selectedBrandList.length > 0) {
            brandIds = "";
            $.each(selectedBrandList, function (index, item) {
                if (index == selectedBrandList.length - 1) {
                    brandIds += item;
                } else {
                    brandIds += item + ",";
                }
            });
        } else {
            brandIds = "";
        }
        var ctrId = $("#countryList .selected").attr("id")
        if (ctrId) {
            brandCountryId = $("#countryList .selected").attr("id");
        } else {
            brandCountryId = "";
        }
        if (!!cataParentId && cataParentId != "") {
            cataId = cataParentId;
        }
        $("#selectDiv,.list-foot").removeClass("list2width");
        setTimeout(function () {
            $(".masklist").hide();
        }, 500)
        $(".masklist").removeClass("backlist");
        $("body").removeClass("over-hd");
        fetchProdsBySelect(cataId, brandCountryId, brandIds, gPage, pageSize, order,
            minPrice, maxPrice, minUnit, hasStock);
    });
    var trackId = common.getQueryStr('trackId');
    if (trackId != undefined && trackId != null && trackId != "") {
        common.setSessionStorage("trackId", trackId);
    } else {
        trackId = common.getSessionStorage("trackId");
    }

    if (trackId != undefined && trackId != null && $.trim(trackId) != "") {
        refreshCart();
    }
}

function fetchNav() {
    common.ajax("GET", "/app/base/bossnav", "", function (respBody) {
        fillNav(respBody.navList);
    });
}

function switchChildNav(e) {
    if (!$(e).find("img").hasClass("transition")) {
        $(e).find("img").addClass("transition")
    }
    else {
        $(e).find("img").removeClass("transition")
    }
    $(e).parent().find(".list2-kuang1-middle1").slideToggle();
    $(e).parents().siblings().find(".list2-kuang1-middle1").slideUp();
}

function CataParents(navId, navName, e) {
    $("#ShowHideDiv span").html("");
    var length = 0;
    if ($(e).find(".iconfont").hasClass("dis-no")) {
        $(e).find(".iconfont").removeClass("dis-no");
        $(e).find("p").addClass("selectPtext");
        $(e).siblings().find(".iconfont").addClass("dis-no");
        $(e).siblings().find("p").removeClass("selectPtext");
        $(e).parents().siblings().find(".iconfont").addClass("dis-no");
        $(e).parents().siblings().find("p").removeClass("selectPtext");
    }
    if ($(e).find("i").hasClass("dis-no")) {
        //cataParentId -= navId + ',';
        var position1 = cataParentId.indexOf(navId);
        var position2 = cataParentName.indexOf(navName);
        cataParentId = cataParentId.substring(0, position1) + cataParentId.substring(position1 + 5, cataParentId.length);
        cataParentName = cataParentName.substring(0, position2) + cataParentName.substring(position2 + navName.length + 1, cataParentName.length);
    } else {
        if (navId == undefined || navName == undefined || e == undefined) {
            return;
        } else {
            cataParentId = navId;
            cataParentName = navName;
            //cataParentName1 += "<li class='tac cor666 fl selected' style='background:#fff'>"+navName+"</li>";
            /*if ($(e).find(".iconfont")){
                $("#cataLiAllUl").append("<li class='tac cor666 fl selected' style='background:#fff' navId='"+navId+"'>"+cataParentName+"</li>");
            }*/
        }
    }
    $("#ShowHideDiv span").html(navName);
    $("nav .classifyname").html(cataParentName);
}

$("#submit1").click(function () {
    $("#cataLiAllUl,#cataLiAll,#showMoreCataBtn").show();
    $(".isSelectTop").parent().find(".list2-kuang1-middle1").slideUp();
    var cata = cataParentName;
    $("#cataLiAll").html("");
    $(".list2-head p").html("筛选");
    /* for (var i = 0; i< cata.length-1; i++){
         var obj = {};
         obj = cata[i]
     }*/
    var element = "<li class='tac cor666 fl selected' style='background:#fff'>" + cata + "</li>";
    $("#cataLiAll").html(element);
    if (brandIds != "") {
        $("#list-devide").show();
        devideShowHide = true;
    }
    CataParentsById();
    $("#list-devide,.list2-kuang1,.list2-kuang2,#hideSelectDiv,#ShowHideDiv,#hideAllImg11,#submit2").show();
    $(".list2-kuang3,#selectnavbo,.selectdiv,#submit1").hide();
    $("#navDevide").html("分类");
})

function CataParentsById() {
    var sdata = {
        "reqBody": {
            "cataParentId": cataParentId
        }
    };
    common.ajax("POST", "/app/base/catatt/v2", sdata, function (respBody) {
        fillBrand(respBody.catalogBrandList);
        fillCountry(respBody.countryList);
        //fillCata(respBody.catalogList);
    });
}

function fillNav(navList) {
    if (navList.length > 0) {
        for (var i in  navList) {
            var nav = navList[i];
            if (JSON.stringify(nav).indexOf("childNavList") > -1) {
                var content = '<div class="list2-kuang-top bortom">' +
                    '<div onclick="switchChildNav(this)" class="clearfix list-nav-select">' +
                    '<div style="width: 90%;" class="fl tac fs13"><div class="fl">' + nav.navName + '</div><span style="text-align: right;" class="fs12 fr corea6" id=""></span></div>' +
                    '<div class="fr tac">' +
                    '<img src="../images/goup.png">' +
                    '</div>' +
                    '</div>'
                var childNavList = nav.childNavList;
                for (var j in childNavList) {
                    var childNav = childNavList[j];
                    var _isSelect = childNav.parameters.cataId == cataId ? " selectPtext " : "";
                    var _disno = childNav.parameters.cataId == cataId ? "" : " dis-no ";
                    var isSelectTop = childNav.parameters.cataId == cataId ? " isSelectTop " : "";
                    content += '<div class="list2-kuang1-middle1 dis-no ' + isSelectTop + '" onclick="CataParents(' + childNav.parameters.cataId + ',\'' + childNav.navName + '\', this)" name="' + childNav.navId + '">' +
                        '<div class="cont-middle clearfix">' +
                        '<p class="fl fs13' + _isSelect + '">' + childNav.navName + '</p>' +
                        /*'<i class="iconfont fr fs20 corea6 dis-no" style="'+(childNav.parameters.cataId==cataId?'display:block;':'display:none;')+'">&#xe615;</i>'+*/
                        '<i class="iconfont fr fs20 corea6 ' + _disno + '">&#xe615;</i>' +
                        '</div>' +
                        '</div>';
                    if (childNav.parameters.cataId == cataId) {
                        $("#cataLiAll").append("<li class='tac cor666 fl selected' style='background:#fff' cataId=" + childNav.parameters.cataId + ">" + childNav.navName + "</li>");
                        $("nav .classifyname").html(childNav.navName);
                    }
                }
                content += '</div>'
                $(".list2-kuang3").append(content);
                $(".isSelectTop").parent().find(".list2-kuang1-middle1").slideDown();
            }
        }
    }
}

function showSelectDiv() {
    $(".masklist").show();
    $(".masklist").addClass("backlist");
    $("#selectDiv,.list-foot").addClass("list2width");
    $("body").addClass("over-hd");
    if ($("#list-devide ul").html() != "") {
        $("#list-devide").css("min-height", "35px").addClass("sadf");
    }
    else {
        $("#list-devide").css("min-height", "0");
        $("#navbottom").css("border-bottom", "none");
    }
    if (selectedBrandList) {
        if (selectedBrandList.length > 0) {
            $("#brandLi li").each(function () {
                var brandId = $(this).val();
                $.each(selectedBrandList, function (index, item) {
                    if (item == brandId) {
                        $(this).addClass("selected");
                    }
                });
            });
        }
    }

    if (brandCountryId) {
        $("#countryList li ").each(function () {
            var cid = $(this).attr('id');
            if (cid == brandCountryId) {
                $(this).addClass("selected").siblings().removeClass("selected");
                ;
            }
        });
    }
}

function refreshCart() {
    common.ajax('GET', '/app/busi/activity/shopsum', "",
        function (respBody) {
            if (respBody.count) {
                $("#cart").html(respBody.count);
                if (respBody.count > 0) {
                    $("#cart").show();
                } else {
                    $("#cart").hide();
                }
            }
        });
}

/** 根据类型id请求数据 */
function fetchCatalogById(cataId, brandIds, countryId) {
    var sdata = {
        "reqBody": {
            "cataParentId": cataId,
            "brandIds": brandIds,
            "countryId": countryId
        }
    };

    $.ajax({
        type: "POST",
        url: "/app/base/catatt",
        data: JSON.stringify(sdata),
        dataType: "json",
        contentType: "application/json",
        async: true,
        success: function (data) {
            obj = eval(data);
            if (data.respHeader.resultCode == 0) {
                fillBrand(data.respBody.catalogBrandList);
                fillCountry(data.respBody.countryList);
            } else {
                alert(data.respHeader.message);
            }

        }
    });
}

function fillBrand(brandList) {
    $("#brandLi").html("");
    if (brandList) {
        var brand = null;
        var content = "";
        for (var i in brandList) {
            brand = brandList[i];
            content += '<li class="fs12 fl tac cor3e " id="brand' + i + '" value="'
                + brand.brandId
                + '">'
                + (brand.brandNameCn == '' ? brand.brandNameEn
                    : brand.brandNameCn) + '</li>';
        }
        $("#brandLi").html(content);
        if (brandList.length <= 6) {
            $("#showMoreBrandText").hide();
            $("#showMoreBrandImg").hide();
            $("#hideMoreBrandImg").hide();
        }
        $("#brandLi li:gt(5)").hide();
        //如果从Url中取得的品牌Id有值
        if (brandIds) {
            var brandids = brandIds.split(',');
            $("#brandLi li").each(function () {
                var brand = $(this).val();
                var pthis = $(this).attr("id");
                var pname = $(this).html();
                $.each(brandids, function (i, item) {
                    if (brand == item) {
                        $("#" + pthis).addClass("selected");
                        displayBrandStr = pname;
                        $("#selectedBrandList").html(common.truncAndEllipsis(displayBrandStr, 20));
                    }
                });
            });
        }
        $("#brandLi li").click(function () {

            if ($(this).hasClass("selected")) {
                $(this).siblings().removeClass("selected");
                $(this).removeClass("selected");
                var brandName = $(this).text();
                var brandId = $(this).val();
                var len = brandName.length;
                var blen = displayBrandStr.length;
                displayBrandStr = brandName;
                $("#selectedBrandList").html(common.truncAndEllipsis(displayBrandStr, 20));
            } else {
                var len = $("#brandLi .selected").length;
                if (len >= 5) {
                    //alert("只能选择5个品牌");
                    $(".tips-five").show();
                    setTimeout(function () {
                        $(".tips-five").hide();
                    }, 2000)
                    return;
                }

                $(this).addClass("selected").siblings().removeClass("selected");
                var brandId = $(this).val();
                var brandName = $(this).text();
                displayBrandStr = brandName;
                $("#selectedBrandList").html(common.truncAndEllipsis(displayBrandStr, 20));
            }

        });
    }
}

function fillCountry(countryList) {
    $("#countryList").html("");
    if (countryList) {
        countryList = countryList;
        var country = null;
        var content = "";
        for (var i in countryList) {
            country = countryList[i];
            content += '<li class="fl fs12 tac cor666" id=' + country.countryId + '>' + country.countryNameCn + '馆' + '</li>';
        }
        $("#countryList").html(content);
        $("#countryList li:gt(5)").hide();
        $("#countryList li").click(function () {
            var cid = $(this).attr('id');

            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected").siblings().removeClass("selected");
                $("#selectedCountryName").html("");
            } else {
                $(this).addClass("selected").siblings().removeClass("selected");
                if (countryList) {
                    $.each(countryList, function (index, item) {
                        if (item.countryId == cid) {
                            $("#selectedCountryName").html("&nbsp;&nbsp;&nbsp;" + item.countryNameCn);
                        }
                    });
                }

            }
        });
    }
}

/** 根据条件获取当前所有商品 */
function fetchProdsBySelect(cataId, countryId, brandIds, page, pageSize, order,
                            minPrice, maxPrice, minUnit, hasStock) {
    if (gMoreProd == 0) {
        return;
    }

    if (loading) {
        return;
    }
    loading = true;

    var reqBody = new Object();
    var params = new Object();
    if (cataId != 0) {
        // dataObj = dataObj + "cataId="+ cataId;
        reqBody.cataId = cataId
    }

    if (brandIds != "") {
        reqBody.brandIds = brandIds;
    }

    if (countryId != "") {
        reqBody.brandCountryId = brandCountryId;
    }
    if (order != "") {
        reqBody.order = order;
    }
    if (minPrice != "") {
        reqBody.minPrice = minPrice;
    }
    if (maxPrice != "") {
        reqBody.maxPrice = maxPrice;
    }
    if (minUnit != "") {
        reqBody.minUnit = minUnit;
    }
    if (hasStock != 0) {
        //reqBody.hasStock = hasStock;
    }
    reqBody.page = gPage;
    reqBody.pageSize = pageSize;
    reqBody.isNationProd = 1;
    params.reqBody = reqBody;
    $("#scroller-pullUp img").show();
    $("#pullUp-msg").show();
    $("#pullUp-msg").html("正在加载中");
    $.ajax({
        type: "POST",
        url: "/app/prod/v2/list",
        dataType: "json",
        data: JSON.stringify(params),
        contentType: "application/json",
        success: function (data) {
            var obj = eval(data);
            if (obj.respHeader.resultCode == 0) {
                if (obj.respBody.prodList) {
                    fillProds(obj.respBody.prodList);
                    if (obj.respBody.prodList.length > 0) {
                        gPage += 1;
                    }

                    if (obj.respBody.prodList.length < pageSize || obj.respBody.prodList.length == 0) {
                        gMoreProd = 0;// 没有更多了
                        $("#scroller-pullUp .loadingIcon").hide();
                        $("#pullUp-msg").html(gPage == 0 ? "没有找到商品" : "已加载完成");
                        $("#pullUp-msg").show();
                    }
                } else {
                    $("#scroller-pullUp .loadingIcon").hide();
                    $("#pullUp-msg").html(gPage == 0 ? "没有找到商品" : "已加载完成");
                    $("#pullUp-msg").show();
                }

            } else {
                alert(obj.respHeader.message);
                $("#scroller-pullUp .loadingIcon").hide();
                $("#pullUp-msg").hide();
            }
            loading = false;
        }, error: function () {
            loading = false;
            $("#scroller-pullUp .loadingIcon").hide();
            $("#pullUp-msg").html(gPage == 0 ? "没有找到商品" : "已加载完成");
            $("#pullUp-msg").show();
        }
    });
}

function fillProds(data) {
    if (data) {

        $("#scroller-pullUp img").hide();
        $("#pullUp-msg").hide();

        var _html = common.getProdItemHtml(data, {hasCart: true});

        $("#prodList").append(_html);

    }
}

function cartBtnEvent() {
    $.fn.cartInList && $('#prodList').cartInList();
}

function getProdTagHtml(prod) {
    var tagIconHtml = '';
    if (prod.hotFlag) {
        tagIconHtml += '<div class="tagIcon">爆款</div>';
    }
    if (prod.newFlag) {
        tagIconHtml += '<div class="tagIcon">新品</div>';
    }
    if (prod.saleChannel) {
        switch (prod.saleChannel) {
            case 10:
                tagIconHtml += '<div class="tagIcon directMailIcon">直邮</div>';
                break;
            case 20:
                tagIconHtml += '<div class="tagIcon taxCompletionIcon">完税</div>';
                break;
            case 30:
                tagIconHtml += '<div class="tagIcon bondedIcon">保税</div>';
                break;
        }
    }
    if (tagIconHtml) {
        tagIconHtml = '<div class="prodTag">' + tagIconHtml + '</div>';
    }
    return tagIconHtml;
}
