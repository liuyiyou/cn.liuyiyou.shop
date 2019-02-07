$(document).ready(function () {
    prodList();
});


function prodList() {
    var brandId = getQueryStr("brandId");
    var cataId = getQueryStr("cataId");
    var url = PROD_BASE_URL + "/prod/list";
    var params = {};
    params.page = 1;
    params.pageSize = 10;
    params.brandId = brandId;
    params.cataId = cataId;
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function (data) {
            if (data.success) {
                var data = data.data;
                console.info(data.records);
                var html = template("prod_list_template", {"list": data.records});
                document.getElementById('prod_list').innerHTML = html;
            }
        },
        error: function (data) {
        }
    });
}
