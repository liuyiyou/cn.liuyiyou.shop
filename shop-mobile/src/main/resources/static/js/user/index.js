var needLogin = common.needLogin(true);
var userIndex = {
    init: function () {
        this.loadDetail();
    },
    loadDetail: function () {
        var reqBody = new Object();
        var url = ConstUtil.get("USER_URL") + "/user/detail";
        var params = new Object();
        params.reqBody = reqBody;
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(params),
            success: function (data) {
                console.info(data);
                var result = data.result;
                $("#person-name").html(result.nickname);
                $("#m-user-headimg-id").attr("src", result.headimg);
                $("#m-level-name").html('五星店铺');
                $("#m-level-tab").html('<img src="/images/lv-copper.png">');
                $("#couponCount").html(result.couponCount);
                if (result.unpaidCount > 0) {
                    $("#unpaidCount").html(result.unpaidCount);
                    $("#unpaidCount").show();
                } else {
                    $("#unpaidCount").hide();
                }
                if (result.paidCount > 0) {
                    $("#paidCount").html(result.paidCount);
                    $("#paidCount").show();
                } else {
                    $("#paidCount").hide();
                }
                if (result.deliveredCount > 0) {
                    $("#deliveredCount").html(result.deliveredCount);
                    $("#deliveredCount").show();
                } else {
                    $("#deliveredCount").hide();
                }
            }
        });
    }
};
if (typeof window.less !== 'undefined') {
    $(window).load(function () {
        userIndex.init();
    });
} else {
    $(function () {
        userIndex.init();
    });
}



