$("#showTooltips").click(function () {
    var account = $("#account").val();
    var password = $("#password").val();
    var params = JSON.stringify({"account": account, "password": password});
    var url = "/login"
    $.ajax({
        type: "post",
        data: params,
        url: USER_BASE_URL + url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                setSessionStorage("trackId", data.data);
                gotoPageUrl("/index.html");
            }
        },
        error: function (data) {
        }
    });
});