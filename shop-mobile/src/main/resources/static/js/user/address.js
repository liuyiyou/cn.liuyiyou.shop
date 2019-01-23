$(document).ready(function () {
    //加载地址列表
    loadAddress();

    saveAddr();
});

function saveAddr() {
    $("#saveAddress").bind('click', function () {
        var deliverId = getQueryStr("id");
        console.info(deliverId)
        if (deliverId == 'undefined') {
        } else {

        }
    });
}

function loadAddress() {
    var url = USER_BASE_URL + "/user/delivery/list";
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
                console.info(data);
                var addrlist = '';
                data.forEach(function (item, index) {
                    addrlist += '<div class="weui-panel__bd">';
                    addrlist += '<div class="weui-media-box weui-media-box_text address-list-box">';
                    addrlist += '<a href="address_edit.html" class="address-edit"></a>';
                    addrlist += '<h4 class="weui-media-box__title"><span>' + item.consignee + '</span><span>' + item.consignTel + '</span></h4>';
                    var address = JSON.parse(item.consignAddr);
                    addrlist += '<p class="weui-media-box__desc address-txt">' + address.prov + address.city + address.county + address.addr + '</p>';
                    if (data.oversea == 1) {
                        addrlist += '<span class="default-add">默认地址</span>';
                    }
                    addrlist += '</div>';
                    addrlist += '</div>';
                })
                $("#addrlist").html(addrlist);
            }
        },
        error: function (data) {
        }
    });
}