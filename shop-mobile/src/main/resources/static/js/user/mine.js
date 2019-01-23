$(document).ready(function () {
    var url = USER_BASE_URL + "/user/get";
    $.ajax({
        type: "get",
        beforeSend: function(request) {
            request.setRequestHeader("trackId", getSessionStorage("trackId"));
        },
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var data = data.data;
                $("#nickname").text(data.nickname);
            }
        },
        error: function (data) {
        }
    });


    var url = ORDER_BASE_URL + "/user/order/count";
    $.ajax({
        type: "get",
        beforeSend: function(request) {
            request.setRequestHeader("trackId", getSessionStorage("trackId"));
        },
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var data = data.data;
                $("#needPay").text(data.needPay);
                $("#needSend").text(data.needSend);
                $("#needConfirm").text(data.needConfirm);
                $("#needComment").text(data.needComment);
            }
        },
        error: function (data) {
        }
    });
});
