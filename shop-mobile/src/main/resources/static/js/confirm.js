$(function () {
    $("#submit").click(function () {
        order.submit();
    });
});

var order = {
    prodId: common.getQueryStr("id"),
    submit: function () {
        var params = {
            prodId: this.prodId,
            payType: 1,
            payAmount: 212
        };
        $.ajax({
            type: "POST",
            url: ConstUtil.get("ORDER_URL") + "order/add",
            data: JSON.stringify(params),
            dataType:"json",
            contentType: "application/json",
            success: function (data) {
                alert("success");
            }
        });
    }
}
