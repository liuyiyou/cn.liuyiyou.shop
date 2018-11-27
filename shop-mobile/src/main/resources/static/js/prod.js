$(function () {
    prod.loadProd();
    $("#instBuyBtn").click(function () {
        $("#popSkuPannel").show()
    });

    $("#popSkuPannel .del").click(function () {
        $("#popSkuPannel").hide()
    });

    $("#btnCardBuy").click(function () {
       var skuId = $("#submit_skuId").val();
        window.location.href = "/order-confirm.html?id=" + prod.prodId + "&skuId=" + skuId;
    });
});


var prod = {
    prodId: common.getQueryStr('id'),
    loadProd: function () {
        $.getJSON(ConstUtil.get("PROD_URL") + "prod/" + this.prodId, function (data) {
            $("#prodName").html(data.prodName);
            $("#brief").html(data.brief);
            $("#descp").html(data.descp);
            $("#ctryBrd").html(data.country + "|" + data.brandName);
            $("#country").html(data.country);
            $("#oriprice").val(999);
            ConstUtil.get("PIC_DOMAIN") + data.album.split(",")[0]
            var pic = ConstUtil.get("PIC_DOMAIN") + data.album.split(",")[0];
            $("#album").attr("src", pic);


            //sku
            var minPrice = 99999;
            var maxPrice = 0;
            var minReferPrice = 99999;
            var maxReferPrice = 0;
            data.prodSkus.forEach(function (value) {
                minPrice = Math.min(value.price, minPrice);
                maxPrice = Math.max(value.price, maxPrice);
                minReferPrice = Math.min(value.referPrice, minReferPrice);
                maxReferPrice = Math.max(value.referPrice, maxReferPrice);
            });

            $("#submit_skuId").val(data.prodSkus[0].skuId);
            if (minReferPrice == maxReferPrice) {
                $("#oriprice").html(minReferPrice)
            } else {
                $("#oriprice").html(minReferPrice + "-" + maxReferPrice)
            }
            if (minPrice == maxPrice) {
                $("#norprice").html('¥' + minPrice)
            } else {
                $("#norprice").html('¥' + minPrice + "-" + maxPrice)
            }

            $("#skuPicImg").attr("src", pic);
            $("#popSkuPrice").html('¥' + minPrice)
            return data;
        });
    }
}
