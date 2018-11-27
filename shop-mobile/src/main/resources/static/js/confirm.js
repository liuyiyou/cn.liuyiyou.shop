$(function () {
    $("#submit").click(function () {
        order.submit();
    });
});

var order = {
    prodId: common.getQueryStr("id"),
    skuId: common.getQueryStr("skuId"),
    submit: function () {
        var params = {
            prodId: this.prodId,
            payType: 1,
            skuId: this.skuId
        };
        $.ajax({
            type: "POST",
            url: ConstUtil.get("ORDER_URL") + "order/addOrderNoTransaction",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                window.location.href = "/my-order.html"
            }
        });
    }
}
