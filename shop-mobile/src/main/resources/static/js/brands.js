$(function () {
    _brands.loadData();
});
var _brands = {
    "picDomain": "https://oss.yanglaoban.com/",
    loadData: function () {
        $.getJSON("http://localhost:10010/brand/list/1-10", function (data) {
            _brands.renderBrand(data.records);
        });
    },
    renderBrand: function (brandList) {
        if (brandList && brandList.length > 0) {
            $(".brands-item").append('<h2>' + 'XX' + '</h2><ul class="clearfix"></ul>');
            for (var i = 0; i < brandList.length; i++) {
                var img = brandList[i].prodImg ? brandList[i].prodImg : brandList[i].brandIcon
                $(".brands-item ul").append(
                    '<li>' +
                    '<a href="/brands-detail.html?brandId=' + brandList[i].brandId + '">' +
                    '<img  src="' + (img ? _brands.picDomain + img : "") + '" />' +
                    '<span>' + brandList[i].brandNameCn + '</span>' +
                    '</a>' +
                    '</li>')
            }
            $(".brands-item img").lazyload({
                placeholder: "/images/banner-default.jpg",
                threshold: this.windowHeight,
                effect: "fadeIn"
            });
        }
    }
};

