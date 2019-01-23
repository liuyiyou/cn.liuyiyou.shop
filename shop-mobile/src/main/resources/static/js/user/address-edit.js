$(document).ready(function () {
    beforeEdit();

    editAddt();
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
                    $("#consignee").val(data.consignee);
                    $("#consignTel").val(data.consignTel);
                    $("#detail_addr").val(detail.addr);
                    if(data.defaultAddr){
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
