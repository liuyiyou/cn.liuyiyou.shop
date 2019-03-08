$(document).ready(function () {
    beforeEdit();

    editAddt();


    deleteAddress();
});

function beforeEdit() {
    var deliverId = getQueryStr("id");
    if (deliverId != '') {
        var url = USER_BASE_URL + "/user/delivery/" + deliverId;
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
                    var data = data.data;
                    var detail = JSON.parse(data.consignAddr);
                    $("#id").val(data.id);
                    $("#consignee").val(data.consignee);
                    $("#consignTel").val(data.consignTel);
                    $("#detail_addr").val(detail.addr);
                    if (data.defaultAddr) {
                        $("#default_addr").attr("checked", true);
                    }
                }
            },
            error: function (data) {
            }
        });
    }

}

function editAddt() {
    $("#saveAddress").click(function () {
        var params = new Object();
        params.consignee = $("#consignee").val();
        params.id = $("#id").val();
        params.consignTel = $("#consignTel").val();
        params.detailAddr = $("#detail_addr").val();
        var url = USER_BASE_URL + "/user/delivery/edit";
        $.ajax({
            type: "post",
            beforeSend: function (request) {
                request.setRequestHeader("trackId", getSessionStorage("trackId"));
            },
            data: JSON.stringify(params),
            url: url,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success) {
                    var data = data.data;
                    var detail = JSON.parse(data.consignAddr);
                    $("#consignee").val(data.consignee);
                    $("#consignTel").val(data.consignTel);
                    $("#detail_addr").val(detail.addr);
                }
            },
            error: function (data) {
            }
        });
    });
}


function deleteAddress() {

    $("#deleteAddress").click(function () {
        var params = new Object();
        var url = USER_BASE_URL + "/user/delivery/" + $("#id").val();
        $.ajax({
            type: "delete",
            beforeSend: function (request) {
                request.setRequestHeader("trackId", getSessionStorage("trackId"));
            },
            data: JSON.stringify(params),
            url: url,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success) {
                    $.toast("删除成功");
                    window.location.href="/address_list.html";
                }
            },
            error: function () {
                $.toast("删除失败");
            }
        });
    });

}