$(document).ready(function () {

    //首页banner
    banner();
    //品牌精选
    brand();
});


function banner() {
    var url = BASE_BASE_URL + "/banner/list";
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var data = data.data;
                var html = '';
                data.forEach(function (item) {
                    html += '<div class="swiper-slide"><a href="' + item.url + '"><img src="' + OSS_URL + item.pic + '"/></a></div>'
                });

                $('.swiper-banner .swiper-wrapper').html(html);

                $(".swiper-banner").swiper({
                    loop: true,
                    autoplay: 3000
                });
            }
        },
        error: function (data) {
        }
    });
}


function brand() {
    var url = BASE_BASE_URL + "/brand/list";
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                var data = data.data;
                var html = '';
                data.forEach(function (item) {
                    html += '<div class="swiper-slide">' +
                        '<a href="pro_list.html?brandId=' + item.brandId + '">' +
                        '<img src="' + OSS_URL + item.brandIcon + '"/></a></div>'

                    console.info("aaaaaa"+html);
                });

                $('#brand_list').html(html);
                $(".swiper-jiushui").swiper({
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction',
                    loop: true,
                    slidesPerView: 3,
                    slidesPerColumn: 3,
                    paginationClickable: true,
                    spaceBetween: 2
                });


            }
        },
        error: function (data) {
        }
    });
}
