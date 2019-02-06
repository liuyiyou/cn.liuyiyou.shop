$(document).ready(function () {
    //加载地址列表


    loadOrders(0,'tab1');

    $(function(){
        $('.weui-navbar__item').on('click', function () {
            $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');

            $(".weui-tab__panel .weui_tab_bd_item_active").removeClass('weui_tab_bd_item_active');
            var data_toggle =jQuery(this).attr("href");

            var tab = data_toggle.slice(1,data_toggle.length);
            var status = jQuery(this).attr("data-id");

            console.info("tab::"+ tab+"\tstatus::"+ status);
            $(data_toggle).addClass("weui_tab_bd_item_active");

            loadOrders(status,tab);

        });
    });


});

function loadOrders(status,tableId) {
    var url = ORDER_BASE_URL + "/order/list";
    var params = new Object();
    params.pageNum = 1;
    params.pageSize = 10;
    params.status = status;
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
                document.getElementById(tableId).innerHTML = html;

            }
        },
        error: function (data) {
        }
    });
}