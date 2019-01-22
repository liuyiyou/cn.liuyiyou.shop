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
});
