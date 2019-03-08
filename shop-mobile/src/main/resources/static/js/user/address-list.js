$(document).ready(function () {
    //加载地址列表
    loadAddress();
});

function loadAddress() {
    var url = USER_BASE_URL + "/user/delivery/list";
    $.ajax({
        type: "post",
        beforeSend: function (request) {
            request.setRequestHeader("trackId", getSessionStorage("trackId"));
        },
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var addrlist = new Array();

                var addrList = data.data;
                addrList.forEach(function (item) {
                    var address = {};
                    if (item.defaultAddr == 1) {
                        address.defaultAddr = true;
                    }
                    address.consignee = item.consignee;
                    address.consigneeTel = item.consignTel;
                    var detail = JSON.parse(item.consignAddr);
                    address.detail = detail.prov + detail.city + detail.county + detail.addr;
                    address.id = item.id;
                    address.uid = item.uid;
                    addrlist.push(address);
                });
                console.info(addrlist);
                var html = template("addrlist", {"addrlist": addrlist});
                document.getElementById('address').innerHTML = html;
            }
        },
        error: function (data) {
        }
    });
}