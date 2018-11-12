$(function () {
    prod.loadProd();

    $("#instBuyBtn").click(function () {
        window.location.href = "/order-confirm.html?id=" + prod.prodId;
    });
});


var prod = {
    prodId: common.getQueryStr('id'),
    loadProd: function () {
        $.getJSON(ConstUtil.get("PROD_URL") + "prod/" + this.prodId, function (data) {
            console.info(data);
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
        });
    }
}