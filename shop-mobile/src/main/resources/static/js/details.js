var gProdTotal = 0;
var gSkuId = 0;
$(function () {
    var prodId = common.getQueryStr("pid");
    loadProd(prodId);

    $(".nav-bot ul li:nth-child(2)").click(function () {
        addCart();
    })

    $(".pay-now .pay-now-mid .more").click(function () {
        adjustBuyNowNum(1);
    })


    $(".pay-now .pay-now-mid .less").click(function () {
        adjustBuyNowNum(-1);
    })


    $(".main_visual").hover(function () {
        $("#btn_prev,#btn_next").fadeIn()
    }, function () {
        $("#btn_prev,#btn_next").fadeOut()
    });


    $(".main_visual").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            $("#btn_next").click();
        }, 5000);
    });

    window.setInterval(function () {
        var a0 = $(".border").width();
        $(".details-img").css("width", a0);
    }, 0)

    $(".nav-bot #show").click(function () {
        $(".pay-now,.the-light").show();
    });
    $(".the-light").click(function () {
        $(".part-in,.the-light").hide();
    });
    $(".pay-now .pay-now-nav span").click(function () {
        $(".part-in").show();
        $(".pay-now").hide();
    });

    $("#cart").click(function () {
        window.location.href = "/busi/cart.html";
    });
    $("#go-subs-confirm").click(function () {
        var num = $(".pay-now-mid .num").html();
        var param = new Object();
        param.skuId = gSkuId;
        param.sum = Number(num);
        param.type = 2;
        param = JSON.stringify(param);
        param = encodeURIComponent(param);
        window.location.href = "/busi/order-confirm.html?data=" + param;
    });
})

function loadProd(prodId) {
    var params = new Object();
    var reqBody = new Object();
    reqBody.prodId = prodId;
    params.reqBody = reqBody;
    common.ajax('POST', '/app/prod/detail', params, fillProd, "");
    common.ajax('GET', '/app/busi/activity/shopsum', "", setCartCount, "");
}

function setCartCount(data) {
    if (data && data.count) {
        $("#cart").html(data.count);
    }
}

function fillProd(respBody) {
    //填充页面商品信息
    gSkuId = respBody.skuList[0].skuId;
    var picDomain = ConstUtil.get("PIC_DOMAIN");
    var albumArray = respBody.album.split(",");
    $("#album").html("");
    for (i in albumArray) {
        var content = '<li><img class="img_3" src="' + picDomain + albumArray[i] + '"></li>';
        $("#album").append(content);
    }

    $("#prodName").html(respBody.prodName);
    if (respBody.brief != "") {
        $("#brief").html(respBody.brief);
    } else {
        $("#brief").hide();
    }
    var price = eval(respBody.priceRule)[0][2];
    $("#price").html("￥" + price);

    $("#ctryBrd").html(respBody.countryNameCn + " | " + respBody.brandNameCn);

    $("#origin").html(respBody.originNameCn + "直邮");

    $("#taxRate").html((parseFloat(respBody.taxRate) * 100) + "%");

    if (respBody.prodTotal == 0) {
        $("#prodTotal").html("暂时无货");
        $(".nav-botb").show();
    } else {
        gProdTotal = respBody.prodTotal;
        $("#prodTotal").html("库存充足");
    }

    var descp = respBody.descp.replace(/<img/g, "<img style='width:" + $("#descp").width() + "px;'");

    $("#descp").html(descp);

    $(".pay-now-line").html("<h1>" + respBody.prodName + "</h1><h2>￥" + price + "</h2>");

    //调整页面商品信息CSS、JS事件
    $dragBln = false;

    $(".main_image").touchSlider({
        flexible: true,
        speed: 200,
        btn_prev: $("#btn_prev"),
        btn_next: $("#btn_next"),
        paging: $(".flicking_con a"),
        counter: function (e) {
            $(".flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
        }
    });

    $(".main_image").bind("mousedown", function () {
        $dragBln = false;
    });

    $(".main_image").bind("dragstart", function () {
        $dragBln = true;
    });

    $(".main_image a").click(function () {
        if ($dragBln) {
            return false;
        }
    });

    timer = setInterval(function () {
        $("#btn_next").click();
    }, 5000);

    $(".main_image").bind("touchstart", function () {
        clearInterval(timer);
    }).bind("touchend", function () {
        timer = setInterval(function () {
            $("#btn_next").click();
        }, 5000);
    });

    window.setInterval(function () {
        var a0 = $(".main_image img").height();
        $(".main_image").css("height", a0);
    }, 0)
}

function addCart() {
    var params = new Object();
    var reqBody = new Object();
    reqBody.skuId = gSkuId;
    reqBody.sum = 1;
    params.reqBody = reqBody;
    common.ajax('POST', '/app/busi/activity/cartinf', params, setCartCount, addCartAfter);
}

function addCartAfter(data) {
    if (data && data.resultCode == "0") {
        $(".shop-view,.the-light").show();
        window.setTimeout(function () {
            $(".shop-view,.the-light").hide();
        }, 500);
    }
}

function adjustBuyNowNum(num) {
    var j = $(".pay-now .pay-now-mid .num").text();
    j = parseInt(j) + num;

    if (j <= 0 || j > gProdTotal) {
        return;
    }

    $(".pay-now .pay-now-mid .num").text(j);
}