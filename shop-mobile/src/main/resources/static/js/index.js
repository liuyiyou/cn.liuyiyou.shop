var index = {
    promUrl : ConstUtil.get("DOMAIN") + '/index.html',
    picDomain : ConstUtil.get("PIC_DOMAIN"),
    oss_resize_p:'?x-oss-process=image/resize,p_70',
    windowHeight : $(window).height(),
    timeFlag: false,
    skillShowOne: false,
    ts: 0,
    init : function () {
        var src = common.getQueryStr("src");
        if (!isNaN(src) && src > 0 && src.length < 5) {
            common.setSessionStorage("src", src);
        }
        this.initEvent();
        // this.isLoadMessageInfo();
        this.loadBanners();//加载Banner
        // this.loadRecommendArticle();
        // this.loadNationalPavilion();
        // this.loadBrandHouse();
        this.addReturnTopBtn();//添加返回顶部按钮事件
        this.initUserInfo(); //初始化用户信息
        this.initNavProdList();
    },
    initEvent : function () {
        /*点击搜索框跳转到搜索页*/
        $("#search").click(function(){
            var referUrl = location.href ;
            common.setSessionStorage("referUrl",referUrl);
            location.href="/search/result.html";
        });
        $("#message").click(function(){
            gotoPageUrl("/user/message-center.html");
        });
        $('.index-active').on('click','.skillContent',function(){
            window.location = '/activity/new-shopper-seckill.html?timeId='+$(this).attr("timeId");
        });
        $('#superSwiper').click(function(){
            var articleId1 = $(this).find('.swiper-slide-active').attr('data-articleId1') || $(this).find('.swiper-slide:eq(0)').attr('data-articleId1');
            var articleId2 = $(this).find('.swiper-slide-active').attr('data-articleId2') || $(this).find('.swiper-slide:eq(0)').attr('data-articleId2');
            var articleId3 = $(this).find('.swiper-slide-active').attr('data-articleId3') || $(this).find('.swiper-slide:eq(0)').attr('data-articleId3');
            var id = [articleId1,articleId2,articleId3];
            localStorage.setItem('hunterTopId', 'true'); //用于品质捕手首页文章置顶推荐，再次刷新不置顶。
            window.location.href = '/hunter/index.html?id=' + id.join('|');
        });
        $('#stellarDelivery .go').click(function(){
            window.location.href = '/hunter/star-express-list.html'; //星品速递主页
        });
        $('#qualityCatcher .go').click(function(){
            window.location.href = '/hunter/index.html'; //品质捕手主页
        });
        $('#brandHouse').click(function(){
            window.location.href = '/prod/brands.html';
        });
        $(window).scroll(
            function() {
                var scrollTop = $(this).scrollTop();
                if(scrollTop > 0){
                    $('#index-top .nav').addClass('nav-fixed');
                }else{
                    $('#index-top .nav').removeClass('nav-fixed');
                }
            });
        this.cartBtnEvent();
    },
    scanQRCodeWeixin: function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if(result.indexOf(',') >= 0){
                    result = result.substring(result.indexOf(',')+1,result.length);
                }
                $.ajax({
                    type : 'GET',
                    url : '/app/home/v2/qrcode/scan?parm=' + result,
                    data : '',
                    dataType : 'json',
                    contentType: 'application/json',
                    success : function(data) {
                        // alert('data:',data);
                        if(data.respHeader.resultCode == 0){
                            if(data.respBody.type == 1){
                                window.location.href = '/prod/' + data.respBody.result + '.html?result=' + result;
                            }else{
                                window.location.href = '/scan/scan-no.html?result=' + result;
                            }
                        }
                    }
                });
            }
        });
    },
    isLoadMessageInfo : function () {
        var trackId = common.getSessionStorage("trackId");
        if( trackId != undefined &&trackId != null && trackId != "" ){
            utils.getMessageList({mark:'index'});
        } else {
            $('#message-num').css('display','none');
        }
    },
    hasNoReadMessage: function (msgTypeListReturn) {
        var num = 0;
        msgTypeListReturn.forEach(function(i,v){
            num += (i.ids.length - i.hasReadMessage.length);
        });
        if(num !== 0){
            if(num >= 100){
                $('#message-num').css('display','block').html('99+');
            }else{
                $('#message-num').css('display','block').html(num);
            }
        }
    },
    initUserInfo : function () {
        var trackId = common.getQueryStr('trackId');
        if (trackId != undefined && trackId != null && trackId != "") {
            common.setSessionStorage("trackId", trackId);
        } else {
            trackId = common.getSessionStorage("trackId");
        }
        var openId = common.getQueryStr('openId');
        if (openId != undefined && openId != null && openId != "") {
            common.setSessionStorage("openId", openId);
        }
        if (trackId != undefined && trackId != null && $.trim(trackId) != "") {
            this.refreshCart();
        }else{
           // this.loadAdvert();
        }
    },
    refreshCart : function () {
        var _this = this;
        common.ajax('GET', '/app/busi/activity/shopsum', '', function(respBody){
            if(!respBody){
                return;
            }
            if (respBody && respBody.count > 0) {
                $("#cart1,#cart").html(respBody.count).show();
            }else{
                $("#cart1,#cart").hide();
            }
            if(respBody.crowdType){
              //  _this.loadAdvert(respBody.crowdType);
            }

            $("#parentExpireState").click(function () {
                if ((respBody.parentExpiredState == false && respBody.bmclevel == 0) || respBody.expiredState == false ){
                    window.location.href="/store/shopkeeper-selected.html";
                }
                else if(respBody.expiredState == true  && respBody.bmclevel > 0){
                    $("#expiredState-win,.the-light").show();
                }
                else if(respBody.parentExpiredState == true && respBody.bmclevel == 0){
                    window.location.assign("/index.html");
                }
            });
            $("#expiredState-win div").click(function () {
                $("#expiredState-win,.the-light").hide();
            })

            var shopId = common.getSessionStorage("shopId");
            if (shopId && ""!=shopId) {
                if(respBody != null){
                    if (respBody.bmclevel > 0){
                        $("#shopMenu").css('display','block');
                        $("#partnerMenu").css('display','none');
                    }
                    else {
                        if (respBody.parentExpiredState == true){
                            $("#shopMenu").css('display','none');
                            $("#partnerMenu").css('display','block');
                        }
                        else{
                            $("#shopMenu").css('display','block');
                            $("#partnerMenu").css('display','none');
                        }
                    }
                }

                $("#classify-a").css('display','block');
            } else {
                $("#partnerMenu").css('display','block');
                $("#shopMenu").css('display','none');
                $("#classify-a").css('display','none');
            }

            var registSrc = common.getSessionStorage("registSrc");
            if (registSrc == 2) {
                if (0 == loginWealTag) {
                    $(".the-light").show();
                    $("body").css("overflow-y", "hidden");
                    $(".be-yang-boss-partner").show();
                } else if (1 == loginWealTag) {

                    $(".the-light").show();
                    $("body").css("overflow-y", "hidden");
                }
                common.setSessionStorage("registSrc", '');

                $(".the-light, .be-yang-boss-partner, .be-yang-boss-partner2").click(
                    function() {
                        $(".the-light, .be-yang-boss-partner").hide();
                        $(".the-light, .be-yang-boss-partner2").hide();

                        $("body").css("overflow-y", "auto");
                    });
            }

        });
    },
    // loadAdvert : function (crowdType) {
    //     var params = {};
    //     var _this = this;
    //     var body = {};
    //     if(crowdType){
    //         body.crowdType = crowdType;
    //     }else {
    //         body.crowdType = 0;
    //     }
    //     body.type = 1;
    //     params.reqBody = body;
    //     $.ajax({
    //         type : "POST",
    //         url : "/app/busi/activity/gbasead/v2",
    //         data : JSON.stringify(params),
    //         dataType : "json",
    //         contentType: "application/json",
    //         success : function(data) {
    //             if( data.respHeader.resultCode == 0 ){
    //                 _this.showAdvert(data.respBody);
    //             }
    //         }
    //     });
    // },
    showAdvert : function (body) {
        var _this = this;
        var advert = body.advert,
            urlType = 0,
            typeValue = "",
            url = "",
            id = 0;
        if(advert){
            var hasAdvert = false;
            for(var i in advert){
                var obj = advert[i];
                if(obj.pic && obj.type == 1){
                    hasAdvert = true;
                    if(!common.getSessionStorage('advert')){
                        common.setSessionStorage('advert',obj.id);
                    }else if(common.getSessionStorage('advert') !== obj.id.toString()){
                        common.setSessionStorage('advert',obj.id);
                    }else if(common.getSessionStorage('advert') === obj.id.toString()) {
                        return;
                    }
                    $("#adImg").attr("src", ConstUtil.get("PIC_DOMAIN") + obj.pic+index.oss_resize_p);
                    $("#advert").show();
                    $(".the-light").show();
                    urlType = obj.urlType;
                    typeValue = obj.typeValue;
                    url = obj.url;
                    id = obj.id;
                    $("#cancel-advert,.the-light").click(function(){
                        $("#advert,.the-light").hide();
                        //反馈操作请求
                        _this.operRecord(3, id);
                    });
                    $("#adImg").click(function(){
                        $("#advert,.the-light").hide();
                        _this.operRecord(2, id,function(){
                            if(urlType == 3){ //导航跳转
                                $("li[navid="+typeValue+"]").click();
                            }else{
                                window.location.href = url;
                            }
                        });
                    });
                }
            }
            if(!hasAdvert){
                this.lotteryPop();//加载夺宝通知
            }
        }else{
            this.lotteryPop();//加载夺宝通知
        }
    },
    closeAdvert : function () {
        var _this = this;
        $("#advert,.the-light").hide();
        setTimeout(function(){_this.lotteryPop()},5000)
    },
    operRecord : function (type, id,cb) {
        var params = {};
        var body = {};
        body.type = type;
        body.id = id;
        params.reqBody = body;
        $.ajax({
            type : "POST",
            url : "/app/busi/activity/repba",
            data : JSON.stringify(params),
            dataType : "json",
            contentType: "application/json",
            complete : function() {
                cb && cb();
            },
        });
    },
    /*夺宝开奖提醒弹窗*/
    lotteryPop : function () {
        var trackId = common.getSessionStorage("trackId");

        //微信端，在有授权的情况才去请求，防止授权刷新页面，第一个就不显示弹框
        var isWeixin = index.isWeixinInBrowsers();
        if(isWeixin){
            var openId = common.getSessionStorage("openId");
            if(!openId){
                return;
            }
        }

        if(trackId == undefined || trackId == null || trackId == ""){
            initCouponPop(0);//加载优惠券弹窗
            return false;
        }
        var url = "/draw/app/activity/draw/remind";

        var str = "";
        common.ajax('POST', url, null, function (respBody) {
            if(respBody.drawRemind && respBody.drawRemind.code){
                str += '<div class="confirm confirm1">'+
                    '<div class="rulepop"> ';
                if(respBody.drawRemind.subsId){
                    str +='<div class="rulepop-a">您参与的第'+respBody.drawRemind.code+'期已开奖(已中奖)，请您上传收获地址</div> ';
                }
                else{
                    str +='<div class="rulepop-a">您参与的第'+respBody.drawRemind.code+'期夺宝已开奖，快去"个人中心－>夺宝纪录”查看开奖详情吧。</div> ';
                }
                str += '</div> '+
                    '<div class="confirm-btn clearfix"> ';
                if(respBody.drawRemind.subsId){
                    str +=  ' <div class="fl btn1" id=""><a  onclick="index.closeWindow('+respBody.drawRemind.actId+','+respBody.drawRemind.subsId+',this)"  href="javascript:;">填写地址</a> </div> ';
                }
                else{
                    str +=  ' <div class="fl btn1" id=""><a onclick="index.closeWindow('+respBody.drawRemind.actId+','+respBody.drawRemind.subsId+',this)" href="javascript:;" >查看</a></div> ';
                }
                str += '<div class="fr" style="color: #c11c1c;" onclick="index.closeWindow('+respBody.drawRemind.actId+')" id="">关闭</div> '+
                    '</div> '+
                    '</div>';
                $(".the-light").show();
                $("body").append(str);
            }else{
                initCouponPop(0);//加载优惠券弹窗
            }
        });
    },
    closeWindow : function (actId,subsId,e) {
        $(".the-light").hide();
        $(".confirm").hide();
        setTimeout(function(){initCouponPop(0);},5000); //加载优惠券弹窗
        var url = "/draw/app/activity/draw/remind/confirm";
        var reqBody = {};
        var params = {};
        var str = $(e).html();
        reqBody.actId = actId;
        params.reqBody = reqBody;
        common.ajax('POST', url, params,null, function (respBody) {
            if(respBody.resultCode == 0){
                if(str == "填写地址"){
                    window.location.href = "/pages/busi/ship-address.html?subsId="+subsId;
                }
                else if(str == "查看"){
                    window.location.href = "/pages/prod/activity/draw/draw-record.html";
                }
            }
        });
    },

    loadBanners : function () {
        var _this = this;
        $.ajax({
            type : "GET",
            url :  ConstUtil.get("BASE_URL")+"banner/v2/banner/load",
            dataType : "json",
            contentType: "application/json",
            success : function(data) {
                if( data.respHeader.resultCode == 0 ){
                    _this.fillTopBanners(data.respBody);
                    _this.fillMiddleBanners(data.respBody);
                    _this.fillTopNav(data.respBody);
                }
            }
        });
    },
    fillTopBanners : function (respBody) {
        var bannerList = respBody.firstBannerList;
        if(bannerList && bannerList.length > 0){
            $('#bannerList').html('');
            var Html ='<div class="swiper-wrapper">';
            for( var i = 0 ;  i < bannerList.length; i++ ){
                var redirectUrl = bannerList[i].redirectUrl;
                redirectUrl = redirectUrl.indexOf("v=") > 0 ? redirectUrl : (redirectUrl.indexOf("?") > 0 ? redirectUrl + "&v=" + new Date().getTime() : redirectUrl + "?v=" + new Date().getTime());
                Html += '<div class="swiper-slide">'+
                    '<a href="' + redirectUrl + '">'+
                    '<img class="swiper-lazy" data-src="' + ConstUtil.get("PIC_DOMAIN") + bannerList[i].pic +index.oss_resize_p+'">'+
                    '<div class="swiper-lazy-preloader"></div>'+
                    '</a>'+
                    '</div>';
            }
            if(bannerList.length > 1){
                Html +='</div>'+
                    '<div class="swiper-pagination swiper-pagination-h"></div>';
            }
            $('#bannerList').append(Html);
            this.swiperTopBanner();
        } else {
            $('#bannerList').hide();
        }
    },
    fillMiddleBanners : function (respBody) {
        var bannerList = respBody.secondBannerList;
        var flag = false;
        if(bannerList && bannerList.length > 0){
            $('#middleBannerList').html('');
            var Html ='<div class="swiper-wrapper">';
            for( var i = 0 ;  i < bannerList.length; i++ ){
                Html += '<div class="swiper-slide">'+
                    '<a href="' + bannerList[i].redirectUrl + '">'+
                    '<img class="swiper-lazy" src="' + ConstUtil.get("PIC_DOMAIN") + bannerList[i].pic + index.oss_resize_p+'">'+
                    '</a>'+
                    '</div>';
            }
            if(bannerList.length > 1){
                flag = true;
                Html +='</div>'+
                    '<div class="swiper-pagination swiper-pagination-h"></div>';
            }
            $('#middleBannerList').append(Html);
            this.swiperMiddleBanner(flag);
        }else{
            $('#middleBannerListBorder').hide();
        }
    },
    fillTopNav: function(respBody){
        var navList = respBody.firstBannerIconList;
        if(navList && navList.length > 0){
            var str = "";
            for (var i = 0; i < navList.length; i++) {
                str += "<a class=\"fl\" href=\""+navList[i].url+"\"><img src=\""+this.picDomain + navList[i].iconUrl + index.oss_resize_p+"\" alt=\"\"></a>";
            }
            $("#bannerbotdiv").html(str);
        }else{
            $('.bannerbotdiv').hide();
        }
    },
    swiperTopBanner : function () {
        var swiperH = new Swiper('#bannerList', {
            pagination : '.swiper-pagination-h',
            loop : true,
            autoplay : 5000,
            lazy: {
                loadPrevNext: true,
            },
            autoHeight: false,
            observer: true,
        });
    },
    swiperMiddleBanner: function (flag) {
        var sheight = $(window).width() * 240 / 1053;
        if(flag){
            var swiperH = new Swiper('#middleBannerList', {
                pagination : '.swiper-pagination-h',
                width : $(window).width(),
                loop : true,
                autoplay : 5000,
                autoplayDisableOnInteraction : false,
                preloadImages : false,
                lazyLoading : true
            });
        }
        $('#middleBannerList .swiper-slide').css('height', sheight);
        var width = $('#middleBannerList .swiper-pagination-h ').width()/2;
        $('#middleBannerList .swiper-pagination-h').css({'bottom':'12px','right':'50%','margin-right':-width +'px'});
    },
    // loadIndexActivity: function(){
    //     $.ajax({
    //         type : 'GET',
    //         url : '/app/home/v3/activity/entry/home',
    //         data : '',
    //         dataType : 'json',
    //         contentType: 'application/json',
    //         success : function(data) {
    //             if( data.respHeader.resultCode == 0 ){
    //                 if(data.respBody){
    //                     if(data.respBody[1] && data.respBody[1].length > 0){
    //                         index.rendIndexActivity($('#indexActiveOne'),data.respBody[1]);
    //                     }else{
    //                         $('#indexActiveOne').css('display','none');
    //                     }
    //                     if(data.respBody[2] && data.respBody[2].length > 0){
    //                         index.rendIndexActivity($('#indexActiveTwo'),data.respBody[2]);
    //                     }else{
    //                         $('#indexActiveTwo').css('display','none');
    //                         $('#globalWorld').css('display','none');
    //                     }
    //                     if(data.respBody[3] && data.respBody[3].length > 0){
    //                         index.rendIndexActivity($('#indexActiveThree'),data.respBody[3]);
    //                     }else{
    //                         $('#indexActiveThree').css('display','none');
    //                     }
    //                 }
    //
    //             }
    //         }
    //     });
    // },
    rendIndexActivity: function (obj,list) {
        var html = '';
        index.timeFlag = false;
        for(var i = 0; i < list.length; i++){
            var listItem = list[i];
            var combinationType = listItem.combinationType;
            switch (combinationType){
                case 0: //大图模式
                    html += index.rendIndexActivityZero(listItem);
                    break;
                case 1: //组合模式(3个)
                    html += index.rendIndexActivityOne(listItem);
                    break;
                case 2: //组合模式(4个) 秒杀板块
                    if(index.skillShowOne){
                        index.timeFlag = false;
                        break;
                    }
                    index.timeFlag = true;
                    index.skillShowOne = true;
                    html += index.rendIndexActivityTwo(listItem);
                    break;
                case 3: //中图模式
                    html += index.rendIndexActivityThree(listItem);
                    break;
                case 4: //小图模式 四个及以上的小图滚动
                    html += index.rendIndexActivityFour(listItem);
                    break;
                default:
                    break;
            }
            obj.html(html);
            if(index.timeFlag && index.skillShowOne){
                index.timer();
                index.timeFlag = false;
            }
            index.newHotPrefectureSwiper();
            obj.find('img').lazyload({placeholder : "../images/banner-default.jpg", threshold: this.windowHeight,effect: "fadeIn"});
        }
    },
    rendIndexActivityZero : function (listItem) {
        var html = '';
        if(listItem.configInfos && listItem.configInfos.length > 0){
            var configInfo = listItem.configInfos;
            html += '<div class="clearfix ia-one">' +
                '<a href="' + configInfo[0].linkUrl + '"><img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfo[0].imgUrl +index.oss_resize_p+ '"/></a>' +
                '</div>';
        }
        return html;
    },
    rendIndexActivityOne : function(listItem){
        var html = '';
        if(listItem.configInfos && listItem.configInfos.length > 0) {
            var configInfo = listItem.configInfos;
            html += '<div class="clearfix ia-two">' +
                '<a href="' + configInfo[0].linkUrl + '" class="no1"><img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfo[0].imgUrl+index.oss_resize_p + '"/></a>' +
                '<a href="' + configInfo[1].linkUrl + '" class="no2"><img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfo[1].imgUrl+index.oss_resize_p + '"/></a>' +
                '<a href="' + configInfo[2].linkUrl + '" class="no3"><img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfo[2].imgUrl +index.oss_resize_p+ '"/></a>' +
                '</div>';
        }
        return html;
    },
    rendIndexActivityTwo : function(listItem){
        var html = '';
        if(listItem.configInfos && listItem.configInfos.length > 0){
            html += '<div class="seckill-active-four ia-three clearfix"> ';
            var configInfo = listItem.configInfos;
            if(configInfo[0].activityEntryActInfoVo){
                var activityEntryActInfoVo = configInfo[0].activityEntryActInfoVo;
                if(activityEntryActInfoVo.prodList && activityEntryActInfoVo.prodList.length > 0){
                    var prodList = activityEntryActInfoVo.prodList[0];
                    if(prodList){
                        if(activityEntryActInfoVo.type == 1){
                            if( activityEntryActInfoVo.intervalTime &&  activityEntryActInfoVo.intervalTime > 0){
                                index.ts = activityEntryActInfoVo.intervalTime;
                            }
                            html += '<div class="seckill skillContent" timeId="'+ activityEntryActInfoVo.timeId +'">' +
                                '<div class="s-top">' +
                                '<h3 id="skillAdvertiseTitle"></h3>' +
                                '<div class="time skillTime" id="skillTime">' +
                                '<span class="tac">00</span><span class="mh">:</span><span class="tac">00</span><span class="mh">:</span><span class="tac">00</span>' +
                                '</div>' +
                                '</div>' +
                                '<ul class="ul-list clearfix" id="skillUl">' +
                                '<li>' +
                                '<div class="img"><img data-original="'+ConstUtil.get("PIC_DOMAIN") + prodList.pic+index.oss_resize_p+'"/></div>' +
                                '<div class="price">' +
                                '<span class="n">￥' + (prodList.prodPrice).toFixed(2) + '</span>' +
                                '<span class="o">￥' + (prodList.referPrice).toFixed(2) + '</span>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>';
                        }
                    }
                }
            }
            if(configInfo[1] && configInfo[2] && configInfo[3]){
                html += '<div class="active-four clearfix"> ' +
                    '<a href="' + configInfo[1].linkUrl + '" class="a1"><img data-original="'+ConstUtil.get("PIC_DOMAIN") + configInfo[1].imgUrl+'"/></a> ' +
                    '<a href="' + configInfo[2].linkUrl + '" class="a2"><img data-original="'+ConstUtil.get("PIC_DOMAIN") + configInfo[2].imgUrl+'"/></a> ' +
                    '<a href="' + configInfo[3].linkUrl + '" class="a3"><img data-original="'+ConstUtil.get("PIC_DOMAIN") + configInfo[3].imgUrl+'"/></a> ' +
                    '</div>'
            }
            html += '</div>';
        }
        return html;
    },
    rendIndexActivityThree : function(listItem){
        var html = '';
        if(listItem.configInfos && listItem.configInfos.length > 0){
            var configInfo = listItem.configInfos;
            html += '<div class="clearfix ia-one">' +
                '<a href="' + configInfo[0].linkUrl + '"><img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfo[0].imgUrl+index.oss_resize_p + '"/></a>' +
                '</div>';
        }
        return html;
    },
    rendIndexActivityFour : function(listItem){
        var html = '';
        if(listItem.configInfos && listItem.configInfos.length > 0){
            html += '<div class="new-hot-prefecture ia-five clearfix"><div class="swiper-wrapper">';
            var configInfos = listItem.configInfos;
            for(var i = 0; i< configInfos.length; i++){
                html += ' <div class="swiper-slide">' +
                    '<a href="' + configInfos[i].linkUrl + '">' +
                    '<img data-original="' + ConstUtil.get("PIC_DOMAIN") + configInfos[i].imgUrl+index.oss_resize_p + '"/>' +
                    '</a>' +
                    '</div>'
            }
            html += '</div></div>';
        }
        return html;
    },
    newHotPrefectureSwiper : function () {
        var newAndHotSwiper = new Swiper ('.new-hot-prefecture', {
            direction: 'horizontal',
            slidesPerView : 'auto',
            lazyLoadingOnTransitionStart : true
        }) ;
    },
    // loadRecommendArticle : function () {
    //     var param = {};
    //     var params = {};
    //     param.positions = [0,1,2];
    //     params.reqBody = param;
    //     $.ajax({
    //         type : 'POST',
    //         url : '/app/article/recommended/top',
    //         dataType : 'json',
    //         data: JSON.stringify(params),
    //         contentType: 'application/json',
    //         success : function(data) {
    //             if( data.respHeader.resultCode == 0 ){
    //                 if(data.respBody){
    //                     var allData = data.respBody;
    //                     if(allData[0] && allData[0].list && allData[0].list.length >= 3 ){
    //                         index.rendSuperInfo(allData[0].list);
    //                     }else{
    //                         $('#superInfo').css('display','none');
    //                     }
    //                     if(allData[1] && allData[1].list && allData[1].list.length > 0 ){
    //                         index.rendStellarDelivery(allData[1].list);
    //                     }else{
    //                         $('#stellarDelivery').css('display','none');
    //                     }
    //                     if(allData[2] && allData[2].list && allData[2].list.length > 0 ){
    //                         index.rendQualityCatcher(allData[2].list);
    //                     }else{
    //                         $('#qualityCatcher').css('display','none');
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // },
    rendSuperInfo : function (list) {
        var html = '';
        var length = Math.floor(list.length/3);
        for(var i = 0; i < length; i++){
            html += '<div class="swiper-slide" data-articleId1="' + list[i*3].recommendedId + '" data-articleId2="' + list[(i*3+1)].recommendedId + '" data-articleId3="' + list[(i*3+2)].recommendedId + '">' +
                '<div class="txt">' +
                '<span>' + list[i*3].article.title + '</span>' +
                '<span>' + list[(i*3+1)].article.title + '</span>' +
                '</div>' +
                '<div class="img"><div class="img-bg"></div>' +
                '<img src="' + ConstUtil.get("PIC_DOMAIN") + list[(i*3+2)].article.thumbnailPics+'?x-oss-process=image/resize,p_20'+ '" alt=""/>' +
                '</div>' +
                '</div>';
        }
        $('#superSwiper .swiper-wrapper').html(html);
        if(length > 1){
            index.superSwiper();
        }
    },
    rendStellarDelivery: function (list) {
        var html = '';
        var list = list[0].article;
        html += '<a href="/hunter/notesDetail.html?id=' + list.id + '"  class="article clearfix">' +
            '<div class="img">' +
            '<img src="' + ConstUtil.get("PIC_DOMAIN") + list.thumbnailPics+ '?x-oss-process=image/resize,p_30' + '"/>' +
            '</div>' +
            '<div class="txt">' +
            '<span class="n">' + list.title + '</span>' +
            '<span class="d">' + list.summary + '</span>' +
            '</div>' +
            '</a>';
        $('#stellarDeliveryArticle').html(html);
    },
    rendQualityCatcher: function (list) {
        var html = '';
        var list = list[0];
        var article = list.article;
        html += '<div class="person clearfix">' +
            '<a class="img" href="/hunter/personal.html?id=' + list.uid + '">';
        if(list.headImg){
            html +=         '<img src="' + list.headImg + '"/>';
        }else{
            html +=         '<img src="/images/user-index-default-icon.png"/>';
        }
        if(list.realNameStatus == 2){
            html +=         '<i class="icon-vip"></i>';
        }
        html +=     '</a>' +
            '<div class="name">' +
            '<a class="n" href="/hunter/personal.html?id=' + list.uid + '">' + list.nickName + '</a>' +
            '<span class="tag">' + list.labelName + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="article">';
        if(article.videoInfo && article.videoInfo != '' && index.isJsonFormat(article.videoInfo)){
            var videoInfo = $.parseJSON(article.videoInfo);
            if(videoInfo && videoInfo.content && videoInfo.content.cover && videoInfo.content.cover != '') {
                html += '<a class="img" href="/hunter/notesDetail.html?id=' + article.id + '"><img src="' + ConstUtil.get("PIC_DOMAIN") + videoInfo.content.cover +index.oss_resize_p+ '"/><i class="play"></i>';
            }else{
                html += '<a class="img" href="/hunter/notesDetail.html?id=' + article.id + '"><img src="' + ConstUtil.get("PIC_DOMAIN") + article.thumbnailPics +index.oss_resize_p+ '"/>';
            }
        }else{
            html += '<a class="img" href="/hunter/notesDetail.html?id=' + article.id + '"><img src="' + ConstUtil.get("PIC_DOMAIN") + article.thumbnailPics +index.oss_resize_p+ '"/>';
        }
        html += '</a>' +
            '<a class="name" href="/hunter/notesDetail.html?id=' + article.id + '">' + article.title + '</a>' +
            '<a class="dec" href="/hunter/notesDetail.html?id=' + article.id + '">' + article.summary + '</a>' +
            '</div>';
        $('#qualityCatcherArticle').html(html);
    },
    isJsonFormat: function( str ) {
        try {
            $.parseJSON(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    superSwiper: function(){
        var NavSwiper = new Swiper ('#superSwiper .swiper-container', {
            direction: 'vertical',
            autoplay: 5000,
            loop : true,
            autoplayDisableOnInteraction : false,
            preloadImages : false,
            lazyLoading : true
        });
    },
    loadNationalPavilion: function (){
        common.ajax('GET', '/app/base/nation/homePage', '', function(respBody){
            if(respBody.nations && respBody.nations.length > 0){
                index.rendNationalPavilion(respBody.nations);
            }else{
                $('#nationalPavilion').css('display','none');
            }
        });
    },
    rendNationalPavilion: function (nations) {
        var w = $(window).width() * 0.76;
        var h = $(window).width() * 0.37;
        var html = '';
        for(var i = 0;i < nations.length; i++){
            html += '<div class="swiper-slide" data-title="'+ nations[i].title +'" data-secondTitle="'+ nations[i].secondTitle +'" style="width: '+ w +'px;height: '+ h +'px;"><a href="/nation/country-detail.html?countryId=' + nations[i].countryId + '"><img src="'+ConstUtil.get("PIC_DOMAIN") + nations[i].coverImgM+index.oss_resize_p+'" /></a></div>';
        }
        $("#nationalPavilionSwiper .swiper-wrapper").html(html);
        setTimeout(function (){
            var swiperShow = new Swiper('#nationalPavilionSwiper .swiper-container', {
                effect: 'coverflow',
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                autoplay: 50000,
                autoplayDisableOnInteraction : false,
                preloadImages : false,
                lazyLoading : true,
                coverflow: {
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                },
            });
        }, 300)
    },
    loadBrandHouse: function () {
        common.ajax('GET', '/app/home/v2/brand/recommend?type=1', '', function(respBody){
            if(respBody.catalogList && respBody.catalogList.length > 0){
                index.rendBrandHouse(respBody.catalogList);
            }else{
                $('#brandHouse').css('display','none');
            }
        });
    },
    rendBrandHouse: function (catalogList) {
        var html = "";
        for(var i = 0;i < catalogList.length; i++){
            html += '<div class="swiper-slide">';
            html += '<a href="/brands.html">';
            html += '<span class="txt">'+catalogList[i].cataName+'</span>';
            html += '<div class="img-box clearfix">';
            for(var j = 0;j<catalogList[i].recommendBrands.length;j++){
                var icon = catalogList[i].recommendBrands[j].brandIcon;
                if(icon){
                    html += '<img src="' + ConstUtil.get("PIC_DOMAIN") + icon +index.oss_resize_p+'" />';
                }else{
                    html += '<img src="/images/index-sitting.png" />';
                }
            }
            html += '</div><span class="more"></span></a></div>';
        }
        $("#brandHouse .swiper-wrapper").html(html);
        setTimeout(function (){
            var mySwiper = new Swiper('#brandHouse .swiper-container', {
                direction: 'vertical',
                autoplay : 5000,
                speed    : 1000,
                loop     : true,
                autoplayDisableOnInteraction : false
            });
        }, 1000)
    },
    cartBtnEvent:function(){
        $.fn.cartInList && $('#prodList').cartInList();
    },
    getParameter : function(param){
        var query = window.location.search; //获取URL地址中？后的所有字符
        var iLen = param.length; //获取你的参数名称长度
        var iStart = query.indexOf(param); //获取你该参数名称的其实索引
        if (iStart == -1) //-1为没有该参数
            return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart); //获取第二个参数的其实索引
        if (iEnd == -1) //只有一个参数
            return query.substring(iStart); //获取单个参数的参数值
        return query.substring(iStart, iEnd); //获取第二个参数的值
    },
    getDitch : function(uid){
        var _this = this;
        if (!uid) return;
        $.ajax({
            url:"/app/report/ditch?uid="+uid,
            type:"GET",
            dataType:"json",
            contentType:"application/json",
            success:function(data){
                if (data.respHeader.resultCode == 0){
                    if (!data.respBody.ditch) return;
                    _this.addVisitCount(data.respBody.ditch);
                    common.setSessionStorage("ditch",data.respBody.ditch);
                }
            }
        });
    },
    timer : function () {
        var _this = this;
        if( _this.ts == 0 ){
            //_this.loadNewIndex();
        }else{
            setTimeout(_this.NowTime(_this.ts),1e3);
            var hh = parseInt(_this.ts / 60 / 60, 10);//计算剩余的小时数
            var mm = parseInt(_this.ts / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(_this.ts % 60, 10);//计算剩余的秒数
            hh = _this.checkTime(hh);
            mm = _this.checkTime(mm);
            ss = _this.checkTime(ss);
            var TheTime = '<span class="tac">' + hh + '</span><span class="mh">:</span><span class="tac">' + mm + '</span><span class="mh">:</span><span class="tac">' + ss + '</span>';
            if(_this.ts < 0){
                return false;
            }else{
                setTimeout(function(){
                    $('#skillTime').html(TheTime);
                    _this.timer();
                },1e3);
            }
            return TheTime;
        }
    },
    NowTime : function(){
        this.ts = this.ts - 1;
        return this.ts;
    },
    checkTime : function (a) {
        if (a < 10) {
            a = "0" + a;
        }
        return a;
    },
    addVisitCount : function (uid) {
        $.ajax({
            url:"/app/report/visitcount/add?linkId="+uid,
            type:"GET",
            dataType:"json",
            contentType:"application/json",
            success:function(data){
            }
        });
    },
    isWeixinInBrowsers : function () {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }else{
            return false;
        }
    },
    addReturnTopBtn : function () {
        $(".return-top").click(function() {
            $('html,body').animate({
                scrollTop : 0
            }, 500);
        });
        $(document).scroll(function() {
            if ($(this).scrollTop() > 1000) {
                $(".return-top").show();
            } else {
                $(".return-top").hide();
            }
        });

        if ($(document).scrollTop() > 1000) {
            $(".return-top").show();
        } else {
            $(".return-top").hide();
        }
    },
    initNavProdList: function () {
        var navHeight = $('#index-top .nav').height();
        var menuHeight = $("#partnerMenu").height();
        var minHeight = $(window).height()-navHeight-menuHeight;
        $("#navProdListWrapper").navProdList({
            minHeight:minHeight,
            offsetTop:navHeight
        });
    }
};

if(typeof window.less !=='undefined'){
    $(window).load(function(){
        index.init();
    });
}else{
    $(function(){
        index.init();
    });
}


