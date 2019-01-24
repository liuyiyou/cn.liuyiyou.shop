$(document).ready(function () {
    loadFirstCategoryList();
});


function loadFirstCategoryList() {
    var url = BASE_BASE_URL + "category/list";
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var data = data.data;
                var html = template("first_category_list_template", {"list": data});
                document.getElementById('first_category_list').innerHTML = html;
            }
        },
        error: function (data) {
        }
    });
}
