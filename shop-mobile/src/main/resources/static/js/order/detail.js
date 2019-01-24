$(document).ready(function () {
    loadOrder();
});

function loadOrder() {
    var orderId = getQueryStr("id");
    var url = ORDER_BASE_URL + "/order/" + orderId;
    $.ajax({
        type: "get",
        beforeSend: function (request) {
            request.setRequestHeader("trackId", getSessionStorage("trackId"));
        },
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var order = data.data;
                var html = template("order_info_template", order);
                document.getElementById('order_info').innerHTML = html;

            }
        },
        error: function (data) {
        }
    });
}