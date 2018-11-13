/**
 * Created by IBA-EDV on 2018/8/13. 购物车插件
 */
;(function ($) {
    var cartApp = {
        sum: 1,
        prodInfo: null,
        selectSku: null,//已经选择的sku
        commissionRate: null,//销售奖励比例
        valids: [],//选择的 属性值
        cacheSelectValidMap: {},// 缓存选择sku属性
        cacheSkuMap: {},// 缓存sku ,比较时循环一次后缓存，不要遍历多次
        initDom: function () {
            this._$bodyDom = $("body");
            this._$plugInCartWrapper = $("#plugInCartWrapper");
            this._$echat_icon = $("#ECHAT_icon");
            this._$prodImage = this._$plugInCartWrapper.find(".prodImage");
            this._$loadingBox = this._$plugInCartWrapper.find(".loadingBox");
            this._$prodPrice = this._$plugInCartWrapper.find(".prodPrice");
            this._$prodSkuSel = this._$plugInCartWrapper.find(".prodSkuSel");
            this._$buyProdAttr = this._$plugInCartWrapper.find(".buyProdAttr");
            this._$sumValue = this._$plugInCartWrapper.find(".sumValue");
            this._$sumTool = this._$plugInCartWrapper.find(".sumTool");
            this._$buyBtn = this._$plugInCartWrapper.find(".buyBtn");
            this._$btnBox = this._$plugInCartWrapper.find(".btnBox");
            this._$arrivalBtn = this._$plugInCartWrapper.find(".arrivalBtn");
            this._$popSkuCommission = this._$plugInCartWrapper.find(".popSkuCommission");
            this._$prodSumTips = this._$plugInCartWrapper.find(".prodSumTips");
            this._PIC_DOMAIN = window.ConstUtil && window.ConstUtil.get('PIC_DOMAIN') || 'https://oss.yanglaoban.com'
        },
        init: function (options) {
            this.valids = [];
            this.cacheSelectValidMap = {};
            this.cacheSkuMap = {};
            this.selectSku = null;
            this.prodInfo = null;
            this.sum = 1;

            if (this.hasCartHtml()) {
                this.loadProdInfo(options.prodId);
            }else{
                this.createHtml();
                this.initDom();
                this.initEvent();
                this.loadProdInfo(options.prodId);
            }
            this.hideStockTips();
            this.hideBuyBtn();

        },
        // 事件初始化
        initEvent: function () {
            this.selectProdMaskEvent();
            this.closeBtnEvent();
            this.buyProdAttrEvent();
            this.sumControllerEvent();
            this.btnBoxEvent();
        },
        // 遮罩层点击关闭
        selectProdMaskEvent: function () {
            var _this = this;
            this._$plugInCartWrapper.on('click', '.selectProdMask', function () {
                _this.hide();
            });
        },
        closeBtnEvent: function () {
            var _this = this;
            this._$plugInCartWrapper.on('click', '.closeBtn', function () {
                _this.hide();
            });
        },
        // 选择商品属性 sku
        buyProdAttrEvent: function () {
            var _this = this;
            this._$buyProdAttr.on('click', '.attrItem', function () {
                var _$this = $(this);
                if (_$this.hasClass('isSelect')) {
                    _$this.removeClass('isSelect').siblings().removeClass('isSelect');
                } else {
                    _$this.addClass('isSelect').siblings().removeClass('isSelect');
                }

                var valid = _$this.attr('valid');
                var attrid = _$this.attr('attrid');
                _this.initSum();
                _this.cacheValids(attrid, valid);
                _this.checkSku();
            });
        },
        sumControllerEvent: function () {
            var _this = this;
            this._$sumTool.on('click', '.buyMinusBtn', function () {
                _this.buyMinus();
            });
            this._$sumTool.on('click', '.buyPlusBtn', function () {
                _this.buyPlus();
            });
        },
        btnBoxEvent: function () {
            var _this = this;
            this._$btnBox.on('click', '.buyBtn.show', function () {
                _this.addShopCart();
            });
            this._$btnBox.on('click', '.arrivalBtn.notSubscribed', function () {
                _this.addRemind();
            });
        },
        cacheValids: function (attrid, valid) {
            if (this.cacheSelectValidMap[attrid] != valid) {
                this.cacheSelectValidMap[attrid] = valid;
            } else {
                this.cacheSelectValidMap[attrid] = null;
            }

            var _list = [];

            for (var index in this.cacheSelectValidMap) {
                if (this.cacheSelectValidMap[index]) {
                    _list.push(this.cacheSelectValidMap[index]);
                }
            }
            this.valids = _list;
        },
        toFixed: function (val) {
            return Number(val).toFixed(2);
        },
        // 检查选择的sku属性，处理业务
        checkSku: function () {
            var sku = this.findSkuByValids();
            this.selectSku = sku || null;
            var attr = this.getIsSelectLabel();
            if (attr) {
                this.renderProdSkuSel('已选择: ' + attr);
            } else {
                this.initRenderProdSkuSel()
            }

            // 已经选择上sku
            if (sku) {
                if (sku.store > 0) {
                    this.showBuyBtn();
                    this.hideArrivalBtn();
                    this.hideStockTips();
                } else {
                    this.hideBuyBtn();
                    this.queryRemindExist();
                    this.showStockTips();
                }
                this.renderProdPrice(this.toFixed(sku.price));
                if(sku.skuPic){
                    this.renderProdImage(sku.skuPic);
                }else{
                    this.prodInfo.album && this.prodInfo.album[0] &&this.renderProdImage(this.prodInfo.album[0]);
                }
                this.setSkuSaleRate(sku.commission);

            } else {
                this.hideBuyBtn();
                this.hideArrivalBtn();
                this.initRenderProdPrice();
                this.setSaleRate(this.cacheSaleRate);
                this.hideStockTips();
            }

        },
        // 查找 sku
        findSkuByValids: function () {
            var _sku = null;
            if (!this.prodInfo) {
                return _sku;
            }
            var skuDetail = this.prodInfo.skuDetail;
            if (!skuDetail) {
                return _sku;
            }
            this.valids.sort(this.sortNumber);
            var _key = this.valids.join(',');
            return this.cacheSkuMap[_key];
        },
        sortNumber: function (a, b) {
            return a - b;
        },
        buyMinus: function () {
            this.sum -= 1;
            this.checkSumStore();
            this.renderSumValue(this.sum);
        },
        buyPlus: function () {
            this.sum += 1;
            this.checkSumStore();
            this.renderSumValue(this.sum);
        },
        checkSumStore:function(){
            if (this.sum < 1) {
                this.sum = 1;
            }
            if (this.selectSku) {
                if(this.selectSku.store == 0 || this.sum > this.selectSku.store){
                    this.showStockTips();
                }else{
                    this.hideStockTips();
                }
            }else{
                this.sum = 1;
            }
        },
        initSum: function () {
            this.sum = 1;
            this.renderSumValue(this.sum);
        },
        renderSumValue: function (val) {
            this._$sumValue.html(val);
        },
        showPopSkuCommission: function () {
            this._$popSkuCommission.removeClass('hide');
        },
        hidePopSkuCommission: function () {
            this._$popSkuCommission.addClass('hide');
        },
        // 显示确定按钮
        showBuyBtn: function () {
            this._$buyBtn.addClass("show");
        },
        // 隐藏确定按钮
        hideBuyBtn: function () {
            this._$buyBtn.removeClass("show");
        },
        // 隐藏确定按钮
        hideArrivalBtn: function () {
            this._$arrivalBtn.removeClass("notSubscribed subscribed");
        },
        subscribedArrivalBtn: function () {
            this._$arrivalBtn.addClass('subscribed').removeClass('notSubscribed');
        },
        unsubscribeArrivalBtn: function () {
            this._$arrivalBtn.addClass('notSubscribed').removeClass('subscribed');
        },
        hideEchatIcon: function () {
            if (this._$echat_icon.length == 0) {
                this._$echat_icon = $("#ECHAT_icon");
            }
            this._$echat_icon.hide();
        },
        showEchatIcon: function () {
            if (this._$echat_icon.length == 0) {
                this._$echat_icon = $("#ECHAT_icon");
            }
            this._$echat_icon.show();
        },
        fadeEnter: function () {
            this._$plugInCartWrapper.addClass('fade-enter');
        },
        fadeLeave: function () {
            this._$plugInCartWrapper.removeClass('fade-enter');
        },
        lockBody: function () {
            this._$bodyDom.css('overflow', 'hidden');
        },
        unlockBody: function () {
            this._$bodyDom.css('overflow', '');
        },
        show: function () {
            var _this = this;
            this._$plugInCartWrapper.addClass('show');
            setTimeout(function () {
                _this.fadeEnter();
            }, 0);
            this.hideEchatIcon();
            this.lockBody();
            this.hideArrivalBtn();
            ;
        },
        hide: function () {
            this.abortLoadProdInfo();

            var _this = this;
            this.fadeLeave();
            setTimeout(function () {
                _this._$plugInCartWrapper.removeClass('show');
            }, 500);

            this.showEchatIcon();
            this.unlockBody();
        },
        createHtml: function () {
            if (this.hasCartHtml()) {
                return;
            }
            var _html = '<div class="selectProdInfoWrapper" id="plugInCartWrapper">' +
                '<div class="selectProdMask"></div>' +
                '<div class="box">' +
                '<div class="loadingBox"><div class="loadingWrapper"><div class="icon"></div></div></div>' +
                '<div class="closeBtn"></div>' +
                '<div class="buyProdInfo border-b-1px">' +
                '<div class="prodImage" ></div>' +
                '<div class="prodPrice">-</div>' +
                '<div class="prodSkuSel"></div>' +
                '<div class="popSkuCommission"></div>' +
                '</div>' +
                '<div class="buyProdAttr">' +
                // '<div class="title">规格</div>' +
                // '<div class="attrItem isSelect">规格1</div>' +
                // '<div class="attrItem ">规格2</div>' +
                // '<div class="attrItem ">规格3</div>' +
                '</div>' +
                '<div class="buyProdSum">' +
                '<span class="label">数量</span>' +
                '<div class="sumTool">' +
                '<span class="buyMinusBtn border-1px">-</span><span class="sumValue border-1px">1</span><span class="buyPlusBtn border-1px">+</span>' +
                '</div>' +
                '<span class="prodSumTips">库存不足</span>' +
                '</div>' +
                '<div class="btnBox">' +
                '<div class="buyBtn">确定</div>' +
                '<div class="arrivalBtn">到货提醒</div>' +
                '</div>' +
                '</div></div>';
            $("body").append(_html);
            this.initDom();
            return _html;
        },
        //是否添加过dom元素
        hasCartHtml: function () {
            var len = this._$plugInCartWrapper && this._$plugInCartWrapper.length || 0;
            return len > 0;
        },
        showLoading: function () {
            this._$loadingBox.addClass('show');
        },
        hideLoading: function () {
            this._$loadingBox.removeClass('show');
        },
        abortLoadProdInfo: function () {
            if (this.loadProdXHR) {
                this.loadProdXHR.abort();
            }
        },
        loadProdInfo: function (bossProdId) {
            if (typeof window.common == 'undefined') {
                console.log('common 模块未加载');
                return;
            }
            var _this = this;

            // var url = '/app/prod/v2/prodinfo';
            var url = '/app/prod/v2/proddetail/' + bossProdId;
            _this.showLoading();
            window.common.showLoading();
            _this.loadProdXHR = window.common.ajax('GET', url, '',
                function (data) {
                    if(data.skuDetail){
                        _this.prodInfo = data;
                        _this.cacheSkuList(data);
                        _this.renderProd(data);
                        _this.hideLoading();
                        _this.switchSkuTypeAddShopCart(data.skuDetail);
                    }else{
                        common.toast('网络繁忙,请重试');
                        _this.hideLoading();
                    }
                },
                function (data) {
                    if (data.resultCode !== 0 && data.message) {
                        window.common.toast(data.message);
                    }
                    _this.hideLoading();
                    window.common.hideLoading();
                },
                function () {
                    _this.hide();
                    _this.hideLoading();
                    window.common.hideLoading();
                    common.toast('网络错误,请重试');
                });
        },
        //多SKU弹框 单SKU直接添加
        switchSkuTypeAddShopCart:function(skuDetail){
            if(skuDetail.skuType == 1){
                this.show();
            }else{
                this.selectSku = skuDetail.skuProdInfoList[0];
                this.addShopCart();
            }
        },
        setSaleRate: function (commissionRateInfo) {
            if(!commissionRateInfo){
                return;
            }
            // 销售奖励
            this.cacheSaleRate = commissionRateInfo;
            this.commissionRate = commissionRateInfo.m1Rate * 0.01;
            var minCommission = this.prodInfo.minCommission;
            var maxCommission = this.prodInfo.maxCommission;
            var commissionSection = '';
            if (commissionRateInfo.rate == 0) {
                if (minCommission != 0) {
                    //非店主
                }
            } else {
                var min = minCommission * commissionRateInfo.m1Rate * 0.01;
                var max = maxCommission * commissionRateInfo.m1Rate * 0.01;
                if (min == 0 && max == 0) {
                    this.hidePopSkuCommission();
                } else {
                    if (minCommission == maxCommission) {
                        commissionSection = "¥" + min.toFixed(2);
                    } else {
                        commissionSection = "¥" + min.toFixed(2) + "-¥" + max.toFixed(2);
                    }
                }
            }
            this.renderCommission(commissionSection);
        },
        setSkuSaleRate:function(commission){
            var _commissionSection = commission * this.commissionRate;
            this.renderCommission("¥" +_commissionSection);
        },
        cacheSkuList: function (data) {
            if (!data || !data.skuDetail) {
                return;
            }
            var skuDetail = data.skuDetail;
            var skuProdInfoList = skuDetail.skuProdInfoList;

            for (var i = 0, len = skuProdInfoList.length; i < len; i++) {
                var _item = skuProdInfoList[i];
                if (_item.valids) {
                    var _valids = _item.valids.split(',');
                    _valids.sort(this.sortNumber);
                    var _key = _valids.join(',');
                    this.cacheSkuMap[_key] = _item;
                }
            }
        },
        // 渲染数据
        renderProd: function (data) {
            if (!data || !data.album) {
                return;
            }
            this.setSaleRate(data.commissionRateInfo);
            this.renderProdImage(data.album[0]);
            // this.renderProdPrice(data.minPrice, data.maxPrice);
            this.initRenderProdPrice();
            this.initRenderProdSkuSel();
            this.renderBuyProdAttr(data.skuDetail);
            this.initBuyBtn(data.skuDetail);
            this.initSum();
        },
        initBuyBtn: function (skuDetail) {
            if (skuDetail.skuType == 2) {
                this.selectSku = skuDetail.skuProdInfoList[0] || null;
                if (this.selectSku.store > 0) {
                    this.showBuyBtn();
                    this.hideArrivalBtn();
                } else {
                    this.hideBuyBtn();
                    this.queryRemindExist();
                }
            }
        },
        //渲染商品图片
        renderProdImage: function (url) {
            if (!(url.indexOf('http://') > -1 || url.indexOf('https://') > -1)) {
                url = this._PIC_DOMAIN + url;
            }
            url = url + '?x-oss-process=image/resize,p_40';
            this._$prodImage.css('background-image', 'url(' + url + ')');
        },
        // 初始化渲染价格
        initRenderProdPrice: function () {
            if (!this.prodInfo) {
                return;
            }
            var minPrice = this.toFixed(this.prodInfo.minPrice);
            var maxPrice = this.toFixed(this.prodInfo.maxPrice);

            var str = '¥' + minPrice;
            if (minPrice !== maxPrice) {
                str = '¥' + minPrice + '-¥' + maxPrice;
            }
            this._$prodPrice.html(str);
        },
        // 渲染价格
        renderProdPrice: function (price) {
            var str = '¥' + price;
            this._$prodPrice.html(str);
        },
        // 渲染选择的sku属性列表
        renderBuyProdAttr: function (skuDetail) {
            var _html = '';
            if (skuDetail.attrInfoList) {
                var list = skuDetail.attrInfoList;
                var len = list.length;
                for (var i = 0; i < len; i++) {
                    var _arr = list[i];
                    var _boxHtml = '<div class="attrtitle">' + _arr.attrName + '</div>';
                    for (var j = 0, len2 = _arr.valueInfoList.length; j < len2; j++) {
                        var _item = _arr.valueInfoList[j];
                        _boxHtml += '<div class="attrItem" attrid="' + _arr.attrId + '" valid="' + _item.valId + '">' + _item.valName + '</div>';
                    }
                    _html += '<div class="attrBox border-b-1px">' + _boxHtml + '</div>';
                }
            }
            if (_html !== '') {
                _html = '<div class="attrWrapper">' + _html + '</div>';
            }
            this._$buyProdAttr.html(_html);
        },
        // 获取可以选择的属性
        getSelectLabel: function (skuDetail) {
            var nameArray = [];
            if (!skuDetail.attrInfoList) {
                return '';
            }
            var list = skuDetail.attrInfoList;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                nameArray.push(list[i].attrName);
            }
            return nameArray.length > 0 ? nameArray.join('-') : '';
        },
        // 获取已经选择的属性名称
        getIsSelectLabel: function () {
            var list = this._$buyProdAttr.find('.attrItem.isSelect');
            var _name = list.map(function () {
                return $(this).html();
            }).get().join(' ');
            return _name;
        },
        // 初始化渲染 选择的属性
        initRenderProdSkuSel: function () {
            var skuDetail = this.prodInfo && this.prodInfo.skuDetail || null;
            if (!skuDetail) {
                return;
            }
            if (skuDetail.skuType == 2) {
                this.hideProdSkuSel();
            } else {
                var val = this.getSelectLabel(skuDetail);
                val = '请选择:' + val;
                this.renderProdSkuSel(val);
                this.showProdSkuSel();
            }
        },
        // 渲染 选择的属性
        renderProdSkuSel: function (val) {
            this._$prodSkuSel.html(val);
        },
        showProdSkuSel: function () {
            this._$prodSkuSel.removeClass('hide');
        },
        hideProdSkuSel: function () {
            this._$prodSkuSel.addClass('hide');
        },
        renderCommission: function (val) {
            if (val == "" || val == "¥0") {
                this.hidePopSkuCommission();
            } else {
                var str = '销售奖励：' + val;
                this._$popSkuCommission.html(str);
                this.showPopSkuCommission();
            }
        },
        // 添加购物车
        addShopCart: function () {
            if (typeof window.common == 'undefined') {
                console.log('common 模块未加载');
                return;
            }
            if (!this.selectSku) {
                return;
            }
            if(this.selectSku.store < this.sum){
                common.toast('库存不足');
                return;
            }
            var _this = this;
            var params = {};
            var reqBody = {};
            reqBody.skuId = this.selectSku.bossSkuId;
            reqBody.sum = this.sum;
            // if (buynowType && buynowType == 6) {
            //     reqBody.actType = buynowType;
            // } 先不考虑活动

            var reqBodyShopId = window.common.getReqBodyShopId();
            if (reqBodyShopId != '') {
                reqBody.shopId = reqBodyShopId;
            }
            params.reqBody = reqBody;
            window.common.ajax('POST', '/app/busi/activity/cartinf', params,
                function (respBody) {
                    if (respBody.errInf) {
                        common.toast(respBody.errInf);
                    }else{
                        common.toast('加入购物车成功', 2, 'success');
                        _this.hide();
                        $("#cart1,#cart").html(respBody.count).show();
                    }

                },
                function (data) {

                },
                function () {
                    common.toast('网络错误,请重试');
                }
            );
        },
        // 添加到货提醒
        addRemind: function () {
            if (typeof window.common == 'undefined') {
                console.log('common 模块未加载');
                return;
            }
            var _this = this;
            var addURL = "/app/prodarrived/remind/add";
            var reqBody = {reqBody: {bossSkuId: this.selectSku.bossSkuId}};
            window.common.ajax("POST", addURL, reqBody, null,
                function (respHeader) {
                    if (respHeader.resultCode === 0) {
                        common.toast('已开启到货提醒!');
                        _this.subscribedArrivalBtn();
                    }
                },
                function () {
                    common.toast('网络错误,请重试');
                }
            );
        },
        // 查询是否设置到货提醒
        queryRemindExist: function () {
            var _this = this;
            var addURL = "/app/prodarrived/remind/exist";
            var reqBody = {reqBody: {bossSkuId: this.selectSku.bossSkuId}};
            window.common.ajax("POST", addURL, reqBody, function (respBody) {
                if (respBody && respBody.exist) {
                    _this.subscribedArrivalBtn();
                } else {
                    _this.unsubscribeArrivalBtn();
                }
            });
        },
        showStockTips:function(){
            this._$prodSumTips.addClass('show');
        },
        hideStockTips:function(){
            this._$prodSumTips.removeClass('show');
        },

    };
    $.fn.cartInList = function (options) {
        var _options = $.extend({
            cartBtnClass:'.cartBtn'
        }, options);
        this.on('click',_options.cartBtnClass,function(a,b,c){
            event.preventDefault();
            var prodId = $(this).attr('prodid');
            if(prodId){
                $.addCart && $.addCart({prodId:prodId});
            }else{
                console.log('请设置商品ID属性prodid');
            }
            return false;

        });
    };
    $.extend({
        addCart: function (options) {
            var trackId = window.common.getSessionStorage('trackId');
            if(!trackId){
                window.common.currentPageLogin();
            }else{
                cartApp.init(options);
            }
        }
    });
})(jQuery || $);
