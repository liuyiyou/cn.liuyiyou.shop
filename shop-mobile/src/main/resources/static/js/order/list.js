$(document).ready(function () {
    //加载地址列表
    loadOrders();
});

function loadOrders() {
    var url = ORDER_BASE_URL + "/order/list";
    var params = new Object();
    params.pageNum = 1;
    params.pageSize = 10;
    params.status = 1;
    $.ajax({
        type: "post",
        beforeSend: function (request) {
            request.setRequestHeader("trackId", getSessionStorage("trackId"));
        },
        url: url,
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var list = data.data.records;
                var html = template("all_order_template", {"list": list});
                document.getElementById('tab1').innerHTML = html;

            }
        },
        error: function (data) {
        }
    });
}