var btnUnSelClaz = "cor3e submit2";
var btnSelClaz = "corfff submit1";
var selFontClz = "corfff";
var liUnClick = "cor999";
var btnUnClick = "bg888";//立即购买、加入购物车变灰
var shareShopId;
var inviAccount;
var gtype = "";
var gstatus = "";
var gprisection = "";
var gprice = {};
var gnum = {};
var gstore = {};
var nowdate = "";
var StartTime = "";
var EndTime = "";
var gnowdate = "";
var gdate = "";
var bmclevel = 0;
var isFirstSub = 0;
var FirstActId;
var IsonClickFirst;
var skuId;
var isSkuprod;
var hidPopFunc;
var IsSelect;
var showPopFunc;
var firstbuynum;
var firstbuystore = [];
var stockActId = "";
var pNum=0;
var pStore=0;
var storeUp=0;
var buynowType;
var optype; //1代表加入购物车，2代表立即购买
var upActId;//升级续费标识
var respBodyState = [];
var instBuyBtnThis = "";
var parentopenTime = "";
var initShopsumData = "";
var datadeductType = "";
var actprodDetailJSON = "";
var skuType = 1;


var isFromShopkeeperFlag= typeof isFromShopkeeper === "function" && isFromShopkeeper() || false;//是否店铺标识
function initialSkuPannel(skuType) {
    skuType = skuType;
    showPopFunc = function (skuType, btnId) {
        common.setSessionStorage("storeUpTipsCookies",1);    //购买操作恢复cookie的value
        $("#popSkuPannel, .the-light").show();
        var skuEntity = gProdCache.checkSkuComplete();
        if ($("#txtCartNum").text() == 0) {
            $("#txtCartNum").text(1);
            if (skuEntity != null) {
                gProdCache.setBuyNum(skuEntity.bossSkuId, 1);
                adjustCartNum(0, skuEntity.bossSkuId);
            }
        }
        if (skuEntity == null || gProdCache.getStock(skuEntity.bossSkuId) < parseInt($("#txtCartNum").text())) {
            $("#txtCartNum").text(1);
            if (skuEntity != null) {
                gProdCache.setBuyNum(skuEntity.bossSkuId, 1);
            }
            $("#btnCartTip").hide();
            $("#btnCartTip1").hide();
        } else if (!$("#btnCartTip").is(":visible") || !$("#btnCartTip1").is(":visible")) {
            var num = gProdCache.getBuyNum(skuEntity.bossSkuId);
            $("#txtCartNum").text(num);
            adjustCartNum(0, skuEntity.bossSkuId);
        } else {
            adjustCartNum(0, skuEntity.bossSkuId);
        }

        $("#btnBuyNow").hide();
        $("#btnPopSku").hide();
        $("#btnCartConfirm").hide();
        $("#btnCardBuy").hide();
        $("#btnSaleOff").hide();
        if (skuType === HAS_SKU) {
            //popSkuSel字数显示限制
            var popSkuSelText = $("#popSkuSel").text();
            //去除空格和换位符
            popSkuSelText = popSkuSelText.replace(/\s/g, "");
            if (popSkuSelText.length > 9) {
                popSkuSelText = popSkuSelText.substring(0, 8);
            }
            popSkuSelText = popSkuSelText + "...";
            $("#popSkuSel").html(popSkuSelText);
            var sku = gProdCache.checkSkuComplete();
            if (sku == null) {
                $("#popSkuPrice").html(priceSection);
                if (gtype == 4 && gstatus == 1) {
                    $("#popSkuPrice").html(toFixed(gprisection));
                }
                if (gtype== 6 ) {
                	$("#popSkuPrice").html(gprisection);
                }
                if (gtype== 12 ) {
                    $("#popSkuPrice").html(gprisection);
                }
                if (isAct == 0 && showCommission == 1) {
                    $("#popSkuCommission").show().find("span").html(commissionSection);
                }
            }
            //单个sku属性时
            if (gProdCache.getAttrInfoLen() == 1) {
                $("#bossProdSkuPannel ul li").each(function (i, item) {
                    var valid = $(this).attr("valid");
                    var sku = gProdCache.getSkuValToSkuInfoDic(valid);
                    if (typeof gProdCache.getStock(sku.bossSkuId) != 'undefined' && gProdCache.getStock(sku.bossSkuId) <= 0) {
                        $(this).addClass(liUnClick);
                    }
                });
            }
            if (btnId == "popSkuBtn") {
                if (saleOff == 1) {
                    $("#btnSaleOff").show();
                    return;
                }
                if ($("#btnCartTip").is(":visible") || $("#btnCartTip1").is(":visible")) {//初始化状态
                    $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    $("#btnCartConfirm").hide();
                    $("#btnCardBuy").hide();
                    $("#btnPopSku").show();
                    return;
                }
                if ($("#txtCartNum").text() != 0) {
                    $(".popBtn4detail").show().removeClass(btnUnSelClaz).addClass(btnSelClaz);
                    $(".btnPopConfirm").removeClass(btnUnClick);
                } else {
                    $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    $(".btnPopConfirm").addClass(btnUnClick);
                }
                $("#btnCartConfirm").hide();
                $("#btnCardBuy").hide();
                $("#btnPopSku").show();
            } else {
                if ($("#btnCartTip").is(":visible") || $("#btnCartTip1").is(":visible")) {//初始化状态
                    $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    $("#btnPopSku").hide();
                    $("#btnCardBuy").hide();
                    return;
                }
                if ($("#txtCartNum").text() != 0 && (!$("#btnCartTip").is(":visible") || !$("#btnCartTip1").is(":visible"))
                    && skuEntity != null) {
                    $(".popBtn4detail").show().removeClass(btnUnSelClaz).addClass(btnSelClaz);
                    $(".btnPopConfirm").removeClass(btnUnClick);
                } else {
                    $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    $(".btnPopConfirm").addClass(btnUnClick);
                }
                $("#btnPopSku").hide();
                $("#btnCardBuy").hide();
            }
        } else {
            if ($("#btnCartTip").is(":visible") || $("#btnCartTip1").is(":visible")) {//初始化状态
                $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
                $("#btnCartConfirm").hide();
                $("#popSkuSel1").hide();
                return;
            }
            if (gProdCache.getStock(minSkuId) < 1) { //没有库存的时候
                $(".popBtn4detail").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                $("#btnCartTip").show();
                $("#btnCartTip1").hide();
            }
            if ($("#txtCartNum").text() != 0) {
                $(".popBtn4detail").show().removeClass(btnUnSelClaz).addClass(btnSelClaz);
            } else {
                $(".popBtn4detail").show().removeClass(btnSelClaz).addClass(btnUnSelClaz);
            }
            $("#btnCartConfirm").hide();
            $("#popSkuSel1").hide();
        }
        buyNowBtnStatus();
    };
    hidPopFunc = function () {
        $("#popSkuPannel, .the-light").hide();
        $("body").removeClass('body-hidden');
        var selSkuId = gProdCache.getSkuIdByDesc(true, true);
        var selValNamesAr = gProdCache.getSelValidNamesAr(selSkuId);
        var skuDisplStr = "";
        if (skuType == HAS_SKU)
            if (gProdCache.getInitial() == 0) {
                for (var i in selValNamesAr) {
                    skuDisplStr += $(orignSelHtmlStr).html(selValNamesAr[i]).prop("outerHTML");
                }
                $("#skuDisplayCon").html(skuDisplStr);
                $("#popSkuPrice").html(priceSection);
                if (gtype == 4 && gstatus == 1) {
                    $("#popSkuPrice").html(toFixed(gprisection));
                }
            } else {
                var _ActSkuHtml = gProdCache.getActSkuHtml();
                if(_ActSkuHtml!=""){
                    $("#skuDisplayCon").html(_ActSkuHtml);
                }else{
                    if(gProdCache.getAttrInfoList(0)){
                        var firstValids = gProdCache.getAttrInfoList(0).valueInfoList;
                        for (var i in firstValids) {
                            skuDisplStr += $(orignSelHtmlStr).html(firstValids[i].valName).prop("outerHTML");
                        }
                        $("#skuDisplayCon").html(skuDisplStr);
                    }
                }

            }
    };
    var str = location.hash;
    FirstActId = str.match(/FirstAct=([\d]*)/i);

    if( FirstActId == undefined ){
        $("#popSkuBtn").click(function (e) {
            if ((isAct == 0) || (isOver == 0 && isAct == 1 && saleOff == 0)) {
                if(common.getQueryStr('userSrc')==='13' || thirdChannel.isSrcId()){
                    showPopFunc(skuType, 'instBuyBtn');
                }else {
                    showPopFunc(skuType, this.id);
                }
            }
        });instBuyBtn
    }else{
        FirstActId =FirstActId[1];
    }

    $("#popSkuPannel .del, .the-light").click(function () {
        $("body").removeClass("body-hidden");
        $("#shareContent").hide();
    })
    $("#popSkuPannel .del, .the-light").click(hidPopFunc);
    $("#bossProdSkuPannel li").click(function () {
        if ($(this).hasClass(liUnClick) && $("#btnBuyNow").length>0) {
            return;
        }
        if (saleOff == 1) {
            return;
        }
        $("#popSkuSel1").html("已选：");
        var pos = $(this).attr("name");
        if (pos != gProdCache.getAttrInfoLen() && !$(this).hasClass(liUnClick)) {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                //如果只有一个sku属性，那么没有选择的时候确认按钮也应该置灰
                $("#bossProdSkuPannel ul").each(function (i, item) {
                    if (i == 0) {
                        $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    }
                });
            } else {
                //属性发生了切换，那么数量就要重置为1，确认按钮也要置灰(sku属性只有一个的时候不置灰)
                var $t = $(this).addClass("selected");
                $t.siblings("li").removeClass("selected");
                $("#txtCartNum").text(1);
                //非最后一行选择状态改变，那么该行之后的已选中的属性都要清空
                $("#bossProdSkuPannel ul").each(function (i, item) {
                    if (i > parseInt(pos)) {
                        $(this).find("li").removeClass("selected");
                        $(this).find("li").removeClass(liUnClick);
                        $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                    }
                });
            }
        }else{
            ///没有货显示到货提醒按钮
            var $t = $(this).addClass("selected");
            $t.siblings("li").removeClass("selected");
        }
        showCartRemindBtn(false);
        var selObjs = $("#bossProdSkuPannel li.selected").map(function () {
            return $(this).text();
        });
        var text = $.merge([], selObjs).join(" ");
        if (text.length > 9) {
            text = text.substring(0, 8);
            text = text + "...";
        }
        $("#popSkuSel").html(text);
        var sku = gProdCache.checkSkuComplete();
        //根据返回的sku库存来改变样式
        var txtCartNum = $("#txtCartNum").text();
        $("#btnCartTip").hide();
        $("#btnCartTip1").hide();
        if (!sku || (sku !== null && gProdCache.getStock(sku.bossSkuId) < parseInt(txtCartNum))) {
            if ($("#btnCartConfirm").is(":visible")) {
                $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
            }
            var attrInfoLen = gProdCache.getAttrInfoLen();
            var isSelectlen = $("#bossProdSkuPannel").find("li.selected").length;
            if(attrInfoLen == isSelectlen){
                $("#btnBuyNow").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                $("#btnCartTip1").removeClass("btnCartLimitedTip").html("库存不足").show();
            }

        }
        if (sku == null) {
            $("#popSkuPrice").html(priceSection);
            if (showCommission == 1) {
                $("#popSkuCommission").show().find("span").html(commissionSection);
            }
            if (gtype == 4 && gstatus == 1) {
                $("#popSkuPrice").html(toFixed(gprisection));
            }else if (gtype == 6) {
                $("#popSkuPrice").html(gprisection);
            }
        }
        //遍历li，看看是否都没选中，如果都没选中，回到初始化状态
        var hasSelected = 0;
        var allObjs = $("#bossProdSkuPannel").find("li").each(function () {
            if ($(this).hasClass("selected")) {
                hasSelected = 1;
            }
        });
        if (hasSelected == 0) {
            $("#popSkuSel1").html("请选择：");
            var objs = $("#bossProdSkuPannel ul div").map(function () {
                return $(this).text();
            });
            var text = $.merge([], objs).join(" ");
            if (text.length > 9) {
                text = text.substring(0, 8);
                text = text + "...";
            }
            $("#popSkuSel").html(text);
            $("#bossProdSkuPannel").find("li").bind("click").removeClass(liUnClick);
            //单个sku属性时
            if (gProdCache.getAttrInfoLen() == 1) {
                $("#bossProdSkuPannel ul li").each(function (i, item) {
                    var valid = $(this).attr("valid");
                    var sku = gProdCache.getSkuValToSkuInfoDic(valid);
                    if (gProdCache.getStock(sku.bossSkuId) <= 0) {
                        $(this).addClass(liUnClick);
                    }
                });
            }
            gProdCache.setInitial(1);
        } else {
            gProdCache.setInitial(0);
            if (sku != null) {
                adjustCartNum(0, sku.bossSkuId);
            }
        }
    });

    $("#btnCartMore, #btnCartLess").click(function (e) {
        if (isOver == 1 || isSaleOff == 1) {
            return;
        }
        var selSkuId = gProdCache.getSkuIdByDesc(true, true);
        if (!selSkuId)
            return;
        var incr = (this.id == "btnCartMore") ? 1 : -1;//添加或者减少数量
        adjustCartNum(incr, selSkuId);
    });
    var orignSelHtmlStr = $("#skuDisplayCon").html() + "";
    if (skuType == HAS_SKU) {
        var doBtnClickFunc = function (selSkuId) {
            var selValNamesAr = gProdCache.getSelValidNamesAr(selSkuId);
            if (!selValNamesAr)
                return;
            if (gProdCache.isAddCart()) {
                var skuDisplStr = "";
                for (var i in selValNamesAr) {
                    skuDisplStr += $(orignSelHtmlStr).html(selValNamesAr[i]).prop("outerHTML");
                }
                $("#skuDisplayCon").html(skuDisplStr);
                // $("#selSkuPrice").html(gProdCache.getPriceByBossSkuId(selSkuId)).show();
                addCart(selSkuId, gProdCache.getBuyNum(selSkuId));
                hidPopFunc.call();
                /*window.setTimeout(function(){
                 location.reload();
                 },1000);*/
            } else if (gProdCache.isAddCart() !== null) {
                goOrderConfrim(selSkuId, gProdCache.getBuyNum(selSkuId));
            }
            gProdCache.isAddCart(null);
        };

        $("#addCartBtn, #instBuyBtn").click(function (e) {
            if(isAssignProd === false){
                showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
                return ;
            }
            $("body").addClass("body-hidden");
            gProdCache.isAddCart(this.id == "addCartBtn" ? true : false);
            var selSkuId = gProdCache.getSkuIdByDesc(false);
//			if (!selSkuId) {
            showPopFunc(skuType, this.id);
            var id = $(this).attr("id");
            if(id == 'addCartBtn'){
            	optype = 1;
            }else if(id == 'instBuyBtn'){
            	optype = 2;
            }
            return;
//			}
//			doBtnClickFunc(selSkuId);

        });
        //立刻秒杀弹出弹窗
        $("#buy-now-btn").click(function () {
            //返利网非指定商品判断
            if(isAssignProd === false){
                showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
                return ;
            }
            if ($(this).hasClass("bgc11")) {
                showPopFunc(skuType, this.id);
            }
        });
        //首单优惠立即购买弹出弹窗
        /*        $("#reBuyNow").click(function(){
         if ($(this).hasClass("bgc11")) {
         showPopFunc(skuType, this.id);
         if(isFirstSub && isFirstSub !=0){
         $("#originalBuyNow").show();
         }
         }
         })*/
        $("#btnCardBuy").hide();
        $("#btnCartConfirm, #btnPopInstBuy, #btnPopAddCart, #btnBuyNow, #addCartBtnConfirm, #instBuyBtnConfirm").click(function () {
            $("body").removeClass('body-hidden');
            // 渠道推广商品判断
            var isSrcAct = userSrcAct.isSrcAct();
            var trackId = common.getSessionStorage("trackId");
            if(isSrcAct){
                if(trackId){
                    userSrcAct.getUserActInfo();
                }else{
                    // 活动需要跳转到注册页面
                    userSrcAct.register();
                }
                return ;
            }
            var thirdChannelActivityId = thirdChannel.isSrcId();
            if(thirdChannelActivityId){
                if(trackId){
                    thirdChannel.goOrderConfrim();
                }else{
                    thirdChannel.loginRegister();
                }
                return;
            }

            if ($(this).hasClass(btnUnSelClaz) || $(this).hasClass(btnUnClick)) {
                return;
            }


            //判断是不是店铺
            var btnBuyNowId = $(this).attr("id");
            //如果是秒杀
            if (btnBuyNowId == 'btnBuyNow') {
                var trackId = common.getSessionStorage("trackId");
                //判断是否登录
                if (trackId && null != trackId && "" != trackId) {
                } else {
                    var hisUrl = window.location.href;
                    common.setSessionStorage("hisUrl", hisUrl);
                    gotoPageUrl("/user/login.html");
                }
            }

            var selSkuId = gProdCache.getSkuIdByDesc(true, true);
            if (!selSkuId || $(this).hasClass(btnUnSelClaz)) {
                //判断是否选全sku属性，要提示哪个属性没选中
                var validsArName = new Array(gProdCache.getAttrInfoLen());
                $("#bossProdSkuPannel ul").each(function (i, item) {
                    if ($(this).find("li").hasClass("selected")) {
                        validsArName[i] = 1;
                    }
                });
                for (var i = 0; i < gProdCache.getAttrInfoLen(); i++) {
                    if (validsArName[i] == null) {
                        var attr = gProdCache.getAttrInfoList(i);
                        $(".select-checkbox-tips").html('请选择&nbsp' + attr.attrName);
                        $(".select-checkbox-tips").show();
                        window.setTimeout(function () {
                            $(".select-checkbox-tips").hide();
                        }, 1500);
                        break;
                    }
                }
                return;
            }
            if (this.id == "btnPopInstBuy" || this.id == "btnPopAddCart" || this.id == "addCartBtnConfirm" || this.id == "instBuyBtnConfirm") {
                gProdCache.isAddCart(this.id == "btnPopAddCart" || this.id == "addCartBtnConfirm" ? true : false);
            }
            if (this.id == "btnBuyNow") {
                gProdCache.isAddCart(false);
                checkStock(selSkuId, gProdCache.getBuyNum(selSkuId));
                return;
            } else {
                doBtnClickFunc(selSkuId);
            }
        });
    } else {
        //立刻秒杀弹出弹窗
        $("#buy-now-btn").click(function () {
            //返利网非指定商品判断
            if(isAssignProd === false){
                showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
                return ;
            }
            var trackId = common.getSessionStorage("trackId");
            //判断是否登录
            if (trackId && null != trackId && "" != trackId) {

            } else {
                var hisUrl = window.location.href;
                common.setSessionStorage("hisUrl", hisUrl);
                // location.href = "/user/login.html";
                gotoPageUrl("/user/login.html");
            }

            var str = location.hash;
            FirstActId = str.match(/FirstAct=([\d]*)/i);

            if( FirstActId == undefined ){
                // checkStock(minSkuId, 1);
                if ($(this).hasClass("bgc11")) {
                    showPopFunc(skuType, this.id);
                }
            }else{
                checkFirstStock(minSkuId, 1);
            }
        });
        $("#addCartBtn").click(function (e) {
            var zeroActId = getUrlParam(/zeroAct/ig,/zeroAct=([\d]*)/i,null);
            if (zeroActId != null && respBodyState.bmclevel > 0 && respBodyState.expiredState == true && parentopenTime == 0){
                var zeroProfit = $(".zero-profit");
                $(".zero-profit").addClass("zero-profit1")
                zeroProfit.children(".zero-title").hide();
                $(".zeroactTips,.showstore1").hide();
                $(".zero-profit p.zeroWir,.zero-profit .cancel,.zero-profit .showstore2").show();
                $(".zero-profit .zeroWir").html("<span>此商品店铺购买才能享受优惠价，您目前还不是店铺。升级店铺还有更多优惠特权，快来加入吧！</span><span class=' tac cord6'>(每周四，周五，周六全网开放)</span>");
                $(".zero-profit .shop-buttom .showstore2").html("没优惠，加入购物车").css("border","1px solid #c11c1c").css("background","#fff").css("color","#c11c1c").removeClass("corfff").addClass("mb10");
                $(".zero-profit .shop-buttom p:last-child").html("升级店铺").css("border","1px solid #c11c1c").css("background","#c11c1c").css("color","#fff").attr("onclick","window.location='/busi/land.html'");
                $(".the-light2,.profit-title").show();
                zeroProfit.show();
                $("body").addClass("body-overflow");
            }
           else {
                if ($(this).hasClass(btnUnSelClaz)) {
                    return;
                }
                addCart(minSkuId, 1);
            }
        });
        $(".showstore2").click(function (e) {
            $(".zero-profit,.the-light2").hide();
            addCart(minSkuId, 1);
        });
        $("#btnCardBuy").click(function (e) {
            if ($(this).hasClass(btnUnSelClaz)) {
                return;
            }
            // 渠道推广商品判断
            var isSrcAct = userSrcAct.isSrcAct();
            var trackId = common.getSessionStorage("trackId");
            if(isSrcAct){
                if(trackId){
                    userSrcAct.getUserActInfo();
                }else{
                    // 活动需要跳转到注册页面
                    userSrcAct.register();
                }
                return ;
            }
            var thirdChannelActivityId = thirdChannel.isSrcId();
            if(thirdChannelActivityId){
                if(trackId){
                    thirdChannel.goOrderConfrim();
                }else{
                    thirdChannel.loginRegister();
                }
                return;
            }

            goOrderConfrim(minSkuId, gProdCache.getBuyNum(minSkuId));
            common.setSessionStorage("storeUpTipsCookies",1);    //加入购物车改变cookie的value
        });
        $("#btnBuyNow").click(function(){
            $("body").removeClass('body-hidden');
            //判断是不是店铺
            var btnBuyNowId = $(this).attr("id");
            //如果是秒杀
            if (btnBuyNowId == 'btnBuyNow') {
                var trackId = common.getSessionStorage("trackId");
                //判断是否登录
                if (trackId && null != trackId && "" != trackId) {

                } else {
                    var hisUrl = window.location.href;
                    common.setSessionStorage("hisUrl", hisUrl);
                    gotoPageUrl("/user/login.html");
                }

            }

            var selSkuId = gProdCache.getSkuIdByDesc(true, true);

            checkStock(selSkuId, gProdCache.getBuyNum(selSkuId));
        });
        $("#instBuyBtn").click(function (e) {
            //返利网非指定商品判断
            if(isAssignProd === false){
                showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
                return ;
            }

            var zeroActId = getUrlParam(/zeroAct/ig,/zeroAct=([\d]*)/i,null);
            if (zeroActId != null && respBodyState.bmclevel > 0 && respBodyState.expiredState == true && parentopenTime == 0){
                //alert("您的店铺已过期，请升级店铺可继续购买！")
                var zeroProfit = $(".zero-profit");
                $(".zero-profit").addClass("zero-profit1")
                zeroProfit.children(".zero-title").hide();
                $(".zeroactTips,.showstore2").hide();
                $(".zero-profit p.zeroWir,.zero-profit .cancel,.zero-profit .showstore1").show();
                $(".zero-profit .zeroWir").html("<span>此商品店铺购买才能享受优惠价，您目前还不是店铺。升级店铺还有更多优惠特权，快来加入吧！</span><span class=' tac cord6'>(每周四，周五，周六全网开放)</span>");
                $(".zero-profit .shop-buttom .showstore1").html("正价购买").css("border","1px solid #c11c1c").css("background","#fff").css("color","#c11c1c").removeClass("corfff").addClass("mb10");
                $(".zero-profit .shop-buttom p:last-child").html("升级店铺").css("border","1px solid #c11c1c").css("background","#c11c1c").css("color","#fff").attr("onclick","window.location='/busi/land.html'");
                $(".the-light2,.profit-title").show();
                zeroProfit.show();
                $("body").addClass("body-overflow");
            }
            else{
                if ($(this).hasClass(btnUnSelClaz)) {
                    return;
                }
                showPopFunc(skuType, this.id);
                common.setSessionStorage("storeUpTipsCookies",1);     //立即购买改变cookie的value
            }
            instBuyBtnThis = this.id;
        });
        $(".showstore1").click(function () {
            $(".zero-profit,.the-light2").hide();
            showPopFunc(skuType, instBuyBtnThis);
        });
        $(".zero-profit .shop-buttom .showstore").click(function (e) {
            $(".the-light2").hide();
            $(".zero-profit").hide();
            common.setSessionStorage("storeUpTipsCookies",0);   //改变cookie禁止弹窗
            window.location.reload();
        });
        $(".the-light2").click(function (e) {
           $("#share4Money,.zero-profit,.the-light2").hide();
        });
    }

}

function adjustCartNum(num, bossSkuId) {

    var buyNumt = $("#txtCartNum").text();
    if (gtype == 4 && gstatus == 1) {
        var price = gprice[bossSkuId];
    }else if (gtype == 6) {
        var price = gprice[bossSkuId];
    }else if (gtype ==12) {//福利专区活动
        var price = gprice[bossSkuId];
    }else {
        var price = gProdCache.getPriceByBossSkuId(bossSkuId);
    }
    buyNum = parseInt(buyNumt) + num;

    //超过限购数量加号(zhx)
    if(thirdChannel.isSrcId()){
        if(pNum && buyNum > (pNum - thirdChannel.activityInfo.userParticipateSum)){
            $("#txtCartNum").text(pNum - thirdChannel.activityInfo.userParticipateSum);
            $(".shop-view span").html("每人限购"+pNum+"件");
            $(".shop-view").show();
            window.setTimeout(function () {
                $(".shop-view").hide();
            }, 2000);
            return;
        }else{
            $(".btn-rem3").css("background","#f8f8f8");
        }
    }else{
        if(pNum && buyNum>pNum){
            $("#txtCartNum").text(pNum);
            if(buyNum>pNum){
                if(gtype ==12){
                    $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                }else{
                    //弹窗提示
                    $(".shop-view span").html("每人限购"+pNum+"件");
                    $(".shop-view").show();
                    window.setTimeout(function () {
                        $(".shop-view").hide();
                    }, 2000);
                }
            }
            return;
        }else{
            $(".btn-rem3").css("background","#f8f8f8");
        }
    }
    if (buyNum < 1) {
        buyNum = 1;
        return;
    }
    if (buyNum > 1 && limitAmt > 0 && (price * buyNum) > limitAmt) {
	    $("#btnCartLimitedTip").hide();//隐藏限购提示
        $("#btnCartTip").html("政策规定本仓库多件商品总额不能高于<span class='cord6'>¥" + limitAmt + "</span>，请您分多次结算。").show();
        $("#btnCartTip1").hide();
        $("#txtCartNum").text(buyNum);
        $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnCardBuy").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnBuyNow").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $(".btnPopConfirm").addClass(btnUnClick);
        return;
    }else{
        $("#btnCartLimitedTip").show();
        $("#btnCartTip").hide();
    }
    if (isAct == 1 && gProdCache.getNum(bossSkuId) > 0 && buyNum > gProdCache.getNum(bossSkuId)) {
        // $("#btnCartTip").html("每人限购" + gProdCache.getNum(bossSkuId) + "件商品").show();
        $("#btnCartTip1").hide();
        return;
    }
    if (isType3 == 1 && buyNum > limit) {
        $("#btnCartTip").html("每人限购" + limit + "件商品").show();
        $("#btnCartTip1").hide();
        return;
    }
    if (buyNum > gProdCache.getStock(bossSkuId)) {
        $("#btnCartTip1").removeClass("btnCartLimitedTip").html("库存不足").show();
        $("#btnCartTip").hide();
        $("#txtCartNum").text(buyNum);
        $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnCardBuy").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnBuyNow").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $(".btnPopConfirm").addClass(btnUnClick);
        return;
    }else{
        $("#btnCartTip1").hide();
    }

    var num = gnum[bossSkuId];
    if (gtype == 4 && gstatus == 1 && num > 0 && buyNum > num) {
        $('#limited-pass').show();
        setTimeout("$('#limited-pass').hide()", 1000);
        return;
    }
    $("#txtCartNum").text(buyNum);
    if (buyNum > 0) {
        $("#btnCartConfirm").removeClass(btnUnSelClaz).addClass(btnSelClaz);
        $("#btnCardBuy").removeClass(btnUnSelClaz).addClass(btnSelClaz);
        $("#btnBuyNow").removeClass(btnUnSelClaz).addClass(btnSelClaz);
        $(".btnPopConfirm").removeClass(btnUnClick);
    } else {
        $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnCardBuy").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $("#btnBuyNow").removeClass(btnSelClaz).addClass(btnUnSelClaz);
        $(".btnPopConfirm").addClass(btnUnClick);
    }
    gProdCache.setBuyNum(bossSkuId, buyNum);
}

var gProdCache = (function () {
    var t = {};
    var skuStockDic = {};
    var buyNowSkuStockDic = {};
    var skuNum = {};//秒杀商品限购数量
    var skuValToSkuInfoDic = {};
    var skuIdToSkuInfoDic = {};
    var selSku = null;
    var attrInfoList = null;
    var skuProdInfoList = null;
    var buyNowSkuProdInfoList = null;
    var addCart = false;
    var totalAttrInfoLen = 0;
    var skuBuyNumDic = {};
    var skuType = null;
    var isInitial = 1;//是否回到初始化状态，目前用于请选择-标签展示，0为不需要，1为需要
    var actSkuHtml = "";//首单 线下推广活动SKU HTML;

    t.setActSkuHtml = function(html){
        actSkuHtml =html;
    };

    t.getActSkuHtml = function(){
        return actSkuHtml;
    };

    t.getAttrInfoList = function (val) {
        if(attrInfoList){
            return attrInfoList[val];
        }else{
            return;
        }
    };

    t.getAttrInfoLen = function () {
        return totalAttrInfoLen;
    };

    t.getInitial = function () {
        return isInitial;
    };

    t.setInitial = function (val) {
        isInitial = val;
    };

    t.isAddCart = function (val) {
        if (val !== undefined)
            addCart = val;
        return addCart;
    };

    t.setBuyNum = function (bossSkuId, buyNum) {
        skuBuyNumDic[bossSkuId] = buyNum;
    };
    t.getBuyNum = function (bossSkuId) {
        return skuBuyNumDic[bossSkuId];
    }
    t.getSkuValToSkuInfoDic = function (valids) {
        return skuValToSkuInfoDic[valids];
    }

    t.checkSkuComplete = function () {
        selSku = selValidSku();
        if (!selSku) {
            return null;
        }
        if (selSku.skuPic) {
            $("#skuPicImg").attr("src", ConstUtil.get("PIC_DOMAIN") + selSku.skuPic + ConstUtil.get("MIN_PIC_SIZE"));
        } else {
            $("#skuPicImg").attr("src", ConstUtil.get("PIC_DOMAIN") + mainPic + ConstUtil.get("MIN_PIC_SIZE"));
        }
        if (isAct == 0) {
            $("#popSkuPrice").html("¥" + toFixed(selSku.price));
            if (gtype == 4 && gstatus == 1) {
                var skuprice = gprice[selSku.bossSkuId];
                $("#popSkuPrice").html("¥" + toFixed(skuprice));
            }
            if (gtype == 6) {
                var skuprice = gprice[selSku.bossSkuId];
                $("#popSkuPrice").html("¥" + toFixed(skuprice));
            }
            if (gtype == 12) {
                var skuprice = gprice[selSku.bossSkuId];
                $("#popSkuPrice").html("¥" + toFixed(skuprice));
            }
            if (showCommission == 1 && selSku.commission != 0) {
                $("#popSkuCommission").show().find("span").html("¥" + toFixed(selSku.commission*commissionRate));
            } else {
                $("#popSkuCommission").hide();
            }
        } else {
            $("#popSkuPrice").html("¥" + toFixed(selSku.prodPrice));
            if (gtype == 4 && gstatus == 1) {
                $("#popSkuPrice").html("¥" + toFixed(gprice[selSku.bossSkuId]));
            }
        }
        return selSku;
    };
    t.initSkuInfo = function (data) {
        skuType = data.skuType;
        attrInfoList = data.attrInfoList;
        totalAttrInfoLen = attrInfoList ? attrInfoList.length : 0;

        if (isAct == 0) {
            skuProdInfoList = data.skuProdInfoList;
            for (var id in skuProdInfoList) {
                var sku = skuProdInfoList[id];
                var _valids = gProdCache.getValids(sku.valids);
                sku.valids = _valids;
                skuValToSkuInfoDic[_valids] = sku;
                skuIdToSkuInfoDic[sku.bossSkuId] = sku;
            }
        } else {
            buyNowSkuProdInfoList = data.buyNowSkuProdInfoList;
            for (var id in buyNowSkuProdInfoList) {
                var sku = buyNowSkuProdInfoList[id];
                if (sku.valids) {
                    var _valids = gProdCache.getValids(sku.valids);
                    skuValToSkuInfoDic[_valids] = sku;
                } else {
                    //没有sku 使用
                    skuValToSkuInfoDic[0] = sku;
                }

                skuIdToSkuInfoDic[sku.bossSkuId] = sku;
                skuNum[sku.bossSkuId] = sku.num;
            }
        }
    };
    t.getValids = function(valids){
        if(valids){
            var list = valids.split(',');
            return list.sort(function(a, b) {
                return a - b;
            }).join(',');
        }
        return valids;

    };
    //设置SKU 价格
    t.setSkuPrice = function(h5stockSku){
       var sku =  skuIdToSkuInfoDic[h5stockSku.bossSkuId];
       if(sku){
          var validsSku =  skuValToSkuInfoDic[sku.valids];
          if(typeof h5stockSku.salePrice !=='undefined'){
              validsSku.price = h5stockSku.salePrice;
              validsSku.commission = h5stockSku.commission;
          }

           for(var i=0,len=skuProdInfoList.length;i<len;i++){
               if(skuProdInfoList[i].bossSkuId == sku.bossSkuId){
                   skuProdInfoList[i].price = h5stockSku.salePrice;
                   skuProdInfoList[i].commission = h5stockSku.commission;
                   break;
               }
           }

       }
    };

    t.getSelValidNamesAr = function (selSkuId) {
        selSku = selValidSku();
        if (!selSku || !selSku.validNames)
            return null;
        return selSku.validNames.split(",")
    };

    t.getStock = function (skuId) {
    	if(optype == 2){
    		 return buyNowSkuStockDic[skuId] || 0;
    	}
        return skuStockDic[skuId] || 0;
    };

    t.getPriceByBossSkuId = function (bossSkuId) {
        if (skuType == 2) { //无SKU的时候
            if (isAct == 0) {
                return skuProdInfoList[0].price;
            } else {
                return skuIdToSkuInfoDic[bossSkuId].prodPrice;
            }
        }
        if (isAct == 0) {
            return skuIdToSkuInfoDic[bossSkuId].price;
        } else {
            return skuIdToSkuInfoDic[bossSkuId].prodPrice;
        }
    };
    //返回点选的sku属性对应的对象。 isAlert为true的时候提示错误信息。预先补全未选中的sku，预查看库存。
    var selValidSku = function (useAlert) {
        if (skuType == 2) { //无SKU的时候
            if (isAct == 0) {
                return skuProdInfoList[0];
            } else {
                return buyNowSkuProdInfoList[0];
            }
        }
        var validsAr = [];
        var selectedLength = 0;//已选属性个数
        var hasAlert = false;
        $("#bossProdSkuPannel ul").each(function (i, t) {
            var $selectAttr = $(t).find("li.selected");
            if ($selectAttr.length == 0 && !hasAlert) {
                $("#popSkuPannelWarn .warnText").html("选择" + $(t).attr("name") + "分类").show().delay(5000).fadeOut();
                hasAlert = true;
                validsAr.push(null);
                return false;
            } else {
                validsAr.push($selectAttr.attr("valid"));
                if ($selectAttr.attr("valid") != null) {
                    selectedLength++;
                }
            }
        });
        if (selectedLength == totalAttrInfoLen - 1 && totalAttrInfoLen != 1) {
            //如果长度为最大属性长度-1，则表明差一个属性就可以完成库存匹配，这里不考虑只有一个属性的情况
            var position = 0;
            for (var i = 0; i < validsAr.length; i++) {
                if (validsAr[i] == null) {
                    position = i;
                    break;
                }
            }
            $("#bossProdSkuPannel").find("ul").eq(position).find("li").each(function () {
                validsAr[i] = $(this).attr("valid");
                var valid = validsAr.join(",");
                var sku = skuValToSkuInfoDic[valid];
                if (sku != null && gProdCache.getStock(sku.bossSkuId) == 0) {//如果库存为0，该li不能点选
                    $(this).removeClass("selected");
                    $(this).addClass(liUnClick);
                } else {
                    $(this).removeClass(liUnClick);
                    if (sku != null) {
                        var buyNum = gProdCache.getBuyNum(sku.bossSkuId);
                        buyNum = $("#txtCartNum").html;
                        gProdCache.setBuyNum(sku.bossSkuId, buyNum);

                    }
                    if (validsAr.length == 1) {
                        //如果只有1个sku属性，那么确认按钮就需要变成可点击
                        $("#btnCartConfirm").removeClass(btnUnSelClaz).addClass(btnSelClaz);
                        $("#btnCardBuy").removeClass(btnUnSelClaz).addClass(btnSelClaz);
                        $("#btnBuyNow").removeClass(btnUnSelClaz).addClass(btnSelClaz);
                    }
                }
            });
            return null;
        } else if (selectedLength == totalAttrInfoLen) {
            //匹配sku属性结束
            var valids = validsAr.join(",");
            valids = gProdCache.getValids(valids);
            var sku = skuValToSkuInfoDic[valids];
            var buyNum = null;
            if(sku && typeof sku.bossSkuId !=='undefined'){
                buyNum = gProdCache.getBuyNum(sku.bossSkuId);
                if (buyNum == null) {
                    buyNum = 1;
                    gProdCache.setBuyNum(sku.bossSkuId, buyNum);
                }
            }

            $("#btnCartConfirm").removeClass(btnUnSelClaz).addClass(btnSelClaz);
            $("#btnCardBuy").removeClass(btnUnSelClaz).addClass(btnSelClaz);
            $("#btnBuyNow").removeClass(btnUnSelClaz).addClass(btnSelClaz);
            return sku;
        }
        return null;
    }

    //根据点选的
    t.getSkuIdByDesc = function (usePanel, useAlert) {
        if (usePanel) {
            selSku = selValidSku(useAlert);
        }
        if (!selSku)
            return false;

        return selSku.bossSkuId;
    };

    t.getSkuPriceByDesc = function () {
        var sku = selValidSku();
        if (!sku)
            return false;
        return sku.price;
    }

    t.setStock = function (bossSkuId, stock) {
        skuStockDic[bossSkuId] = stock;
        buyNowSkuStockDic[bossSkuId] = stock;
    };

    t.decStockBySkuId = function (bossSkuId) {
        if (!skuStockDic[bossSkuId])
            return;
        skuStockDic[bossSkuId]--;
    };

    //设置秒杀商品限购数量
    t.getNum = function (bossSkuId) {
        return skuNum[bossSkuId];
    };

    return t;
})();

function refreshStock(bossSkuId, bossProdId) {

    var reqBody = {};
    if (bossSkuId) {
        reqBody.skuId = parseInt(bossSkuId);
    } else {
        reqBody.prodId = parseInt(bossProdId);
    }
    var reqBodyShopId =  common.getReqBodyShopId();
    if(reqBodyShopId!=''){
        reqBody.shopId = reqBodyShopId;
    }
    var str = location.hash;
    stockActId = getActId()?getActId():null;
    if(stockActId){
        reqBody.actId = stockActId;
    }
    var userSrc = userSrcAct.isSrcAct();
    if(userSrc){
        reqBody.activityChannel = userSrc;
    }
    var thirdChannelActivityId = thirdChannel.isSrcId();
    if(thirdChannelActivityId){
        reqBody.thirdChannelActivityId = thirdChannelActivityId;
        if (bossSkuId) {
            thirdChannel.skuId = parseInt(bossSkuId);
        } else {
            thirdChannel.prodId = parseInt(bossProdId);
        }
    }
    common.ajax("GET", "/app/prod/v2/h5stock", {"reqBody": JSON.stringify(reqBody)}, function (respBody) {
        var firstActStock = respBody.isFirstAct;
        $('#prodImgTacIcon').append(getFreightPriceTaxRate(respBody.freightPrice,respBody.taxRate));
        if(!firstActStock && typeof respBody.minPrice !=='undefined'){
            if(respBody.minPrice === respBody.maxPrice){
                priceSection = '¥'+respBody.minPrice.toFixed(2);
            }else {
                priceSection =  '¥'+respBody.minPrice.toFixed(2)+'-¥'+respBody.maxPrice.toFixed(2);
            }
            $('#norprice').html(priceSection).show();
            if(typeof respBody.minCommission !== 'undefined'){
                window.minCommission = respBody.minCommission;
                window.maxCommission = respBody.maxCommission;
                if(window.saleRate){
                    setSaleRate(window.saleRate);
                }
            }
        }

        if(respBody.skuInfoList && !firstActStock){
            for(var i=0;i<respBody.skuInfoList.length;i++){
                var _sku = respBody.skuInfoList[i];
                gProdCache.setSkuPrice(_sku)
            }
        }
        if (respBody.popStatus == 1) {
            $("#popMatter").show();
        } else {
            $("#popMatter").hide();
        }
        if (respBody.status != 1) {
            //如果该商品已经删除或者下架
            saleOff = 1;
            $(".saleon").hide();
            $("#popSkuBtn").hide();
            $("#saleOff").show();
        } else if (bossProdId && respBody.skuInfoList) {
            if(respBody.skuInfoList.length > 1){
                isSkuprod = 1;
            }
            for (var i in respBody.skuInfoList) {
                var skuInfo = respBody.skuInfoList[i];
                gProdCache.setStock(skuInfo.bossSkuId, skuInfo.store);
            }
            if (respBody.stock > 0) {
                $("#nav-bot").show();
                $("#stockInfo").html("发货");
            } else {
                $("#stockInfo").html("暂时无货");
                //下线推广不显示
                if(!str.match(/offlineAct=([^"]*)/i)){
                     // $(".nav-botb").show();
                }
                if ( firstActStock && firstActStock == 1){
                        $("#reBuyNow").hide();
                        $(".nav-botb-fst").show();
                        $(".nav-botb-fst").html("暂时无货");
                }
            }
        } else if (bossSkuId) {
            gProdCache.setStock(bossSkuId, respBody.stock);
            if (respBody.stock > 0) {
                $("#nav-bot").show();
                $("#stockInfo").html("发货");
            } else {
                $("#stockInfo").html("暂时无货");

                //下线推广不显示
                if(!str.match(/offlineAct=([^"]*)/i)){
                    $(".nav-botb").data("bossSkuId",bossSkuId).show();
                    initNoSkuRemindBtn(bossSkuId);
                }
                // if(thirdChannel.isSrcId()){
                //     $('#thirdChannelLootALl').html('抢光啦').show();
                // }
                if ( firstActStock && firstActStock == 1){
                	$("#reBuyNow").hide();
                	$(".nav-botb-fst").show();
                	$(".nav-botb-fst").html("暂时无货");
                }
            }
        }

        // 推广初始化
        userSrcAct.init(respBody.isPushNewProd);
        //拉新活动
        thirdChannel.init(respBody.detailType,respBody);

        loadFlashActivity(prodId);
        fetchProdexplain();
    });
}
function getFreightPriceTaxRate(freightPrice,taxRate) {
    var _html='';
    if(freightPrice===0){
        _html += '<div class="tag freightPrice">包邮</div>'
    }if(taxRate===0){
        _html += '<div class="tag taxRate">包税</div>'
    }
    return _html;
}
function getActivityInfo() {

    if (shopActId) {
        return;
    }
    var url = "/app/prod/v2/activity/exist";
    common.ajax("GET", url, {reqBody: JSON.stringify({bossProdId: prodId})}, function (respBody) {
        datadeductType = respBody.deductType;
        if (respBody.deductType != 2){
            //可使用福利
            var actionNameNav = "";
            if (respBody.deductType == 1) {
                actionNameNav = "[满减]";
                //后台返回数据已经排序，前端直接拼接满减信息
                var _subActivityHtml = respBody.fullReductRuleVos.map(function(item){
                    return '满'+item.condiction+'减'+item.deduction;
                }).join('，');
                $("#noWelfare").html("活动商品，达到满减不参与销售奖励");
                $("#noWelfare2").html("活动商品，达到满减不参与销售奖励");
            }else if (respBody.deductType == 3) {
                actionNameNav = "[任选]";
                $("#sub-activity-pic").html("任选");
                //后台返回数据已经排序，前端直接拼接满减信息
                var _subActivityHtml = respBody.fullReductRuleVos.map(function(item){
                    return item.deduction+'元任选'+item.condiction+'件';
                }).join('，');

                $("#noWelfare").html("活动商品，达到任选不参与销售奖励");
                $("#noWelfare2").html("活动商品，达到任选不参与销售奖励");
            }else if (respBody.deductType == 4) {
                actionNameNav = "[折扣]";
                $("#sub-activity-pic").html("折扣");
                //后台返回数据已经排序，前端直接拼接满减信息
                var _subActivityHtml = respBody.fullReductRuleVos.map(function(item){
                    return "满"+item.condiction+'件'+item.deduction+'折';
                }).join('，');

                $("#noWelfare").html("活动商品，达到折扣不参与销售奖励");
                $("#noWelfare2").html("活动商品，达到折扣不参与销售奖励");
            }

            //适用人群类型
            if(typeof respBody.personStr =='string'&&  respBody.personStr!=""){
                _subActivityHtml=_subActivityHtml+respBody.personStr;
            }
            $("#sub-activity-content").html(_subActivityHtml).show();
            var _actHtml = '<div class="item">';
            _actHtml+='<div class="actName">'+actionNameNav+'</div>';
            _actHtml+='<div class="actContent">'+_subActivityHtml+'</div>';
            _actHtml+= isFromShopkeeperFlag?"":'<div class="actDetailBtn"><a href="/'+respBody.actPath+'">查看活动<i class="iconfont cor999 fs20">&#xe61d;</i></a></div>';
            _actHtml+='</div>';
            if(isFromShopkeeperFlag){//店铺
                $("#activityActionSheet .actionSheetContent").addClass("noRightBtn");
            }
            $("#activityActionSheet .actionSheetContent").html(_actHtml);
            actId = respBody.actId;
            isType3 = 1;
            limit = respBody.limit;
            //参加了满减少活动，就不显示福利了
            $("#price_weal_fuli_con").hide();
            $("#price_weal_fuli_con1").hide();
            $("#noWelfare").show();
            $("#noWelfare2").show();
            //设置成为店铺的弹框
            var storeUpTips =common.getSessionStorage("storeUpTipsCookies");    //获取cookie的value

            //if (storeUpTips != 0 && respBody.personStr == "(限店铺用户)"){
            if ((storeUpTips == 1 || !storeUpTips) && respBody.personStr == "(限店铺用户)"){
                initShowUpgradeTips();
            }
            // 抵扣活动，二者互斥不能同时参加
            $("#activity").show();
        }
        else if (respBody.deductType == 2) {
            //限制使用福利直接隐藏div
            if (respBody.limitedWelfare && respBody.limitedWelfare == 1) {
                $("#price_weal_fuli_con").hide();
                $("#price_weal_fuli_con1").hide();
                $("#noWelfare").hide();
                $("#noWelfare2").hide();
            } else {
            }

            $("#activity").hide();
        }

    });
}

function  brandInfo(){
    var url = "/app/prod/v2/activity/brandInfo";
    common.ajax("GET", url, {reqBody: JSON.stringify({bossProdId: prodId})}, function (respBody) {
        if(respBody == null){
            return false;
        }
        if(typeof respBody.shopName !=="undefined" && respBody.shopName !== ""){
            $("#shopName").html(respBody.shopName);
            $("#shopNameWrapper").show();

        }

        //产品品牌
        if(typeof respBody.ProdBrandId != "undefined"){
            $("#prodBrandTitle .textIconWrapper").click(function(){
                var backUrl = window.location.href;
                // 这个是回调连接
                common.setSessionStorage("backProdUrl",backUrl);
                // window.location.href = "/prod/list.html?brandIds="+respBody.ProdBrandId;
                gotoPageUrl("/prod/list.html?brandIds="+respBody.ProdBrandId);
            });
            //品牌名称
            var prodBrandNameCN = respBody.ProdBrandNameCN;
            var prodBrandNameEN = respBody.ProdBrandNameEN;
            prodBrandNameEN = prodBrandNameCN =="" || prodBrandNameEN == '' ? prodBrandNameEN : '('+ prodBrandNameEN +')';

            var _name = prodBrandNameCN+prodBrandNameEN;
            $("#prodBrandTitle .prodBrandName").html(_name);

            //该品牌有56件商品在售
            var _countTips = '该品牌有'+respBody.ProdBrandCount+'件商品在售';
            $("#prodBrandTitle .prodBrandCount").html(_countTips);

            //品牌logo
            var prodBrandPic = respBody.ProdBrandPic;
            if(typeof prodBrandPic != 'undefined' && prodBrandPic != ''){
                var src = 'url(https://oss.yanglaoban.com/'+prodBrandPic+')';
                var prodBrandImg = '<img src="'+ src +'" alt="'+_name+'>';
                $("#prodBrandPic").css('background-image',src);

            }else {
                $("#prodBrandTitle").addClass('nation-bo2-noLabel')
            }

            //是否收藏

            changeCollectState(respBody.isCollect);
        }

        renderAllRelateBrandProds(respBody.allRelateBrandProds);

        renderAllSeeProds(respBody.allSeeProds);
    });
}
function renderAllRelateBrandProds(list){
    var _html = '';
    if(list && list.length>0){
        _html = '<div class="swiper-wrapper">';
        for(var i=0,len=list.length;i<len;i++){
            var _item = list[i];
            _html += '<div class="swiper-slide" style="width: 29%"><div class="more-banner"><a href="/prod/'+_item.bossProdId+'.html"target="_self"><img class="img_3 swiper-lazy"src="'+ConstUtil.get('PIC_DOMAIN')+_item.pic+'"><h1 class="cor3e fs14">'+_item.prodName+'</h1><h2 class="fs14 cord6">¥'+_item.minPrice+'</h2></a></div></div>'
        }
        _html += '</div>';
        $("#prodBrandList").html(_html);
        new Swiper('#prodBrandList', {
            direction: 'horizontal',
            slidesPerView : 'auto',
            lazyLoading:true,
            lazyLoadingOnTransitionStart : true,
            watchSlidesVisibility:true,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
        });
    }
}

function renderAllSeeProds(list){
    var _html = '';
    if(list && list.length>0){
        _html = '<div class="swiper-wrapper">';
        for(var i=0,len=list.length;i<len;i++){
            var _item = list[i];
            _html += '<div class="swiper-slide" style="width: 29%"><div class="more-banner"><a href="/prod/'+_item.bossProdId+'.html"target="_self"><img class="img_3 swiper-lazy"src="'+ConstUtil.get('PIC_DOMAIN')+_item.pic+'"><h1 class="cor3e fs14">'+_item.prodName+'</h1><h2 class="fs14 cord6">¥'+_item.minPrice+'</h2></a></div></div>'
        }
        _html += '</div>';
    }else{
        $("#recommend-title").remove();
    }

    $("#recommend").html(_html);
    new Swiper('#recommend', {
        direction: 'horizontal',
        slidesPerView : 'auto',
        lazyLoading:true,
        lazyLoadingOnTransitionStart : true,
        watchSlidesVisibility:true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
    });
}

//显示活动 普通用户购买升级提示
function handleShowUpgradeTips(){
    var zeroProfit = $(".zero-profit");
    zeroProfit.children(".zero-title").hide();
    $(".zeroactTips").hide();
    $(".zero-profit p.zeroWir,.zero-profit .cancel,.showstore").show();
    $(".zero-profit .zeroWir").html("<p class='fs15 tac'>您还不是店铺</p><p class='fs15 tac'>不能参与本场活动优惠</p>");
    $(".zero-profit .shop-buttom .showstore").html("没优惠，继续购买").css("border","1px solid #c11c1c").css("background","#fff").css("color","#c11c1c").removeClass("corfff").attr("onclick","");
    $(".zero-profit .shop-buttom p:last-child").html("成为店铺享优惠").css("border","1px solid #c11c1c").css("background","#c11c1c").css("color","#fff").attr("onclick","window.location='/busi/land.html'");
    $(".the-light2").show();
    zeroProfit.show();
    $("body").addClass("body-overflow");
}

//满减活动，属于店铺活动，普通用户购买升级提示 可以使用0利润弹框，需要修改标题
function initShowUpgradeTips(){
    //用户级别
    var level = common.getSessionStorage("level");
    if(level < 1){
        //移除加入购物车点击事件 移除立即下单点击事件
        $("#addCartBtn,#instBuyBtn").unbind("click").click(function(){
            handleShowUpgradeTips();
        });
    }
}

/*显示福利抵扣
*
* */
function showWealFuli(price) {
    if (!price) {
        $("#price_weal_fuli_con").hide();
        $("#price_weal_fuli_con1").hide();
        return;
    }

    if (gtype == 4) {
        $("#price_weal_fuli").html("¥" + toFixed(gprisection * 0.1)).show();
        $("#price_weal_fuli2").html("¥" + toFixed(gprisection * 0.1)).show();
    } else {
        $("#price_weal_fuli").html("¥" + toFixed(price)).show();
        $("#price_weal_fuli2").html("¥" + toFixed(price)).show();
    }
    $("#price_weal_fuli_con").show();
    $("#price_weal_fuli_con1").show();
    $("#noWelfare").hide();
    $("#noWelfare2").hide();
}

function getBuyNowInfo(incrVirtualStock) {
    if (shopActId) {
        return;
    }
    var reqBody = {};
    reqBody.actId = parseInt(prodDetailJSON.flashSaleId);
    reqBody.bossProdId = parseInt(prodId);
    if(prodDetailJSON.timeId){
        reqBody.timeId = prodDetailJSON.timeId;
    }
    var url = "/app/prod/v2/activity/buynowinfo";

    // common.showLoading();
    common.ajax("GET", url, {reqBody: JSON.stringify(reqBody)}, function (respBody) {
        $('#prodImgTacIcon').append(getFreightPriceTaxRate(respBody.freightPrice,respBody.taxRate));
        $("#virtual").html(respBody.virtualStock);
        actprodDetailJSON = respBody;
        gProdCache.initSkuInfo(respBody);
        renderProdSkuPannel(actprodDetailJSON.attrInfoList);

        var referPrice = respBody.buyNowSkuProdInfoList && respBody.buyNowSkuProdInfoList.length>0 && respBody.buyNowSkuProdInfoList[0].referPrice || 0;
        for (var i in respBody.buyNowSkuProdInfoList) {
            var skuInfo = respBody.buyNowSkuProdInfoList[i];
            gProdCache.setStock(skuInfo.bossSkuId, skuInfo.store);
            referPrice = referPrice > skuInfo.referPrice?referPrice:skuInfo.referPrice;
        }
        if(respBody.attrInfoList){
            $("#popSkuBtn, #bossProdSkuPannel, h1.selectSku").show();
        }
        if(referPrice>0){
            referPrice = referPrice.toFixed(2);
            $("#prodPrice").html('¥'+referPrice);
        }
        if (respBody.popStatus == 1) {
            $("#popMatter").show();
        } else {
            $("#popMatter").hide();
        }
        if(respBody.bmclevel > 0){
            $(".act-info").html("活动商品，不参与销售奖励");
        }
        if(respBody.freightPrice == 0){
            $("#prod-explain .shopExName[name=1]").html("商品包邮");
            $("#prod-explain .shopExName[name=2]").html("商品包邮");
        }
        //已下架
        if (respBody.buyNowProdStatus == 0) {
            $(".shop-over2").hide();
            $(".shop-over1").hide();
            $(".shop-over").hide();
            $("#saleOff").show();
            saleOff = 1;
            $("#buy-time-info").html("<span>00</span>:<span>00</span>:<span>00</span>");
            return;
        }
        //活动提前结束要更改状态
        if(respBody.activity && respBody.activity.status == 0){
            $(".sekillTimerTxt").html("距离开始还剩");
            $(".buy-now-tis").show().html("即将开始");
            $(".shop-over2").hide();//秒杀中
            $(".shop-over").show();//已抢光
            $(".shop-over1").hide();//秒杀结束
        }else if(respBody.activity && respBody.activity.status == 1){
            $(".sekillTimerTxt").html("距离结束还剩");
            if(respBody.isSaleOff){
                isSaleOff = 1;
                $(".buy-now-tis").show().html("来不及了，好货已抢光！");
                $(".shop-over2").hide();//秒杀中
                $(".shop-over").show();//已抢光
                $(".shop-over1").hide();//秒杀结束
            }else if(respBody.limitNum > 0){
                isSaleOff = 0;
                $(".selected-scroll-cont .cont-box .btn-add-less").append("<li class='btn-rem0'>限购"+respBody.limitNum+"件(已购"+respBody.userParticipateSum+"件)</li>");
                if(respBody.limitNum == respBody.userParticipateSum){
                    $(".buy-now-tis").show().html("限购"+respBody.limitNum+"件，已购"+respBody.userParticipateSum+"件");
                    $(".shop-over2").hide();//秒杀中
                    $(".shop-over").show();//已抢光
                    $(".shop-over1").hide();//秒杀结束
                }
                if(respBody.limitNum > respBody.userParticipateSum){
                    $(".shop-over2").show();//秒杀中
                    $(".shop-over").hide();//已抢光
                    $(".shop-over1").hide();//秒杀结束
                }
            }
            // else if(respBody.limitNum > 0 && respBody.limitNum == respBody.userParticipateSum){
            //     isSaleOff = 0;
            //     $(".buy-now-tis").show().html("限购"+respBody.limitNum+"件，已购"+respBody.userParticipateSum+"件");
            //     $(".selected-scroll-cont .cont-box .btn-add-less").append("<li class='btn-rem0'>限购"+respBody.limitNum+"件(已购"+respBody.userParticipateSum+"件)</li>");
            //     $(".shop-over2").hide();//秒杀中
            //     $(".shop-over").show();//已抢光
            //     $(".shop-over1").hide();//秒杀结束
            // }
            else if(respBody.prodStore == 0 && respBody.prodFrozeStore > 0 && !respBody.isSaleOff){
                isSaleOff = 1;
                $(".buy-now-tis").show().html("好货已抢光，还有机会，耐心等待！");
                $(".shop-over2").hide();//秒杀中
                $(".shop-over").show();//已抢光
                $(".shop-over1").hide();//秒杀结束
            }else{
                isSaleOff = 0;
                $(".buy-now-tis").css("display", "none");
                $(".shop-over2").show();
                $(".shop-over1").hide();
                $(".shop-over").hide();
            }
        }
        // if (respBody.isSaleOff) {
        //     isSaleOff = 1;
        //     $(".shop-over2").hide();
        //     $(".shop-over1").hide();
        //     $(".shop-over").show();
        //     $(".buy-now-tis").show().html("已抢光");
        //     return;
        // } else {
        //     isSaleOff = 0;
        // }
        // if (respBody.activity.status == 0) {
        //     $("#buy-now-btn").unbind("click");
        // } else if (respBody.activity.status == 1) {
        //     $("#buy-now-btn").addClass("bgc11");
        //     setInterval("setLeftTime(" + intervalTime + ")", "1000");
        //     $("#buy-time-info").html(setLeftTime(intervalTime));
        // } else if (respBody.activity.status == 2) {
        //     $(".shop-over").hide();
        //     $(".shop-over2").hide();
        //     $(".shop-over1").show();
        // }
        // if (respBody.activity.status == 2) {
        //     $(".shop-over2").hide();//秒杀中
        //     $(".shop-over").hide();//已抢光
        //     $(".shop-over1").show();//秒杀结束
        //     return;
        // }
        //已抢光
        // if (respBody.isSaleOff) {
        //     isSaleOff = 1;
        //     $(".shop-over2").hide();
        //     $(".shop-over1").hide();
        //     $(".shop-over").show();
        //     $(".shop-tips").show();
        //     $(".shop-over .over-time").html(respBody.saleOff);
        //     return;
        // } else {
        //     isSaleOff = 0;
        // }
        if (respBody.activity.status == 1) {
            //秒杀进行中
            initialSkuPannel(prodDetailJSON.skuType);
            status = 1;
            intervalTime = respBody.activity.endTime - respBody.curDate;
            $("#buy-now-btn").addClass("bgc11");
            renderBuyTime(intervalTime);
        }
        if (respBody.activity.status == 0) {
            //秒杀开始自动更变状态
            intervalTime = respBody.activity.startTime - respBody.curDate;
            renderBuyTime(intervalTime);
        }
        if(respBody.activity.status == 2){
            $(".shop-over2").hide();//秒杀中
            $(".shop-over").hide();//已抢光
            $(".shop-over1").show();//秒杀结束
            return;
        }
        common.hideLoading();
        fetchProdexplain();
    });
}
function renderBuyTime(intervalTime){
    interId = setInterval(function (){
        setLeftTimeFn(intervalTime);
    }, "1000");
    if(interId <= 0){
        $("#buy-time-info").html("<span>00</span>:<span>00</span>:<span>00</span>");
    }
}
function setLeftTimeFn(time) {
    secondInPage += 1000;
    var leftTime = time - secondInPage;
    if (leftTime > 0) {
        var hours = Math.floor(leftTime / (3600 * 1000));
        hours = hours < 10 ? ("0" + hours) : hours;
        var leave2 = leftTime % (3600 * 1000);
        var minutes = Math.floor(leave2 / (60 * 1000))
        minutes = minutes < 10 ? ("0" + minutes) : minutes;
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        seconds = seconds < 10 ? ("0" + seconds) : seconds;
        var str = "<span>" + hours + "</span>:<span>" + minutes + "</span>:<span>" + seconds + "</span>";
        $("#buy-time-info").html(str);
        return str;
    } else if (leftTime <= 0) {
        var str = "<span>00</span>:<span>00</span>:<span>00</span>";
        $("#buy-time-info").html(str);
        setLeftTimeFn(intervalTime);
        getBuyNowInfo();
        return str;
    }
}
//点击立即秒杀后检查库存是否充足，再下单
function checkStock(bossSkuId, buyNum) {
    var reqBody = {};
    reqBody.actId = parseInt(prodDetailJSON.flashSaleId);
    reqBody.bossProdSkuId = parseInt(bossSkuId);
    reqBody.buyNum = parseInt(buyNum);
    goOrderConfrim(bossSkuId, buyNum);
    // var url = "/app/prod/v2/activity/checkstock";
    // common.ajax("GET", url, {reqBody: JSON.stringify(reqBody)}, null, function (respHeader) {
    //     var resp = respHeader;
    //     if (respHeader.resultCode == 0) {//正确执行
    //         $("#popSkuPannel").hide();
    //         goOrderConfrim(bossSkuId, buyNum);
    //     } else if (resultCode.resultCode == 40240 || resultCode.resultCode == 40241) {
    //         $("#popSkuPannel").hide();
    //         $(".shop-view span").html("商品库存不足");
    //         $(".shop-view,.the-light").show();
    //         window.setTimeout(function () {
    //             $(".shop-view,.the-light").hide();
    //         }, 2000);
    //     }
    // });
}

function checkFirstStock(bossSkuId, buyNum) {
	if(!bossSkuId){
		return;
	}
    var reqBody = {};
    var buyNum = $("#txtCartNum").html();
    reqBody.actId = parseInt(FirstActId);
    reqBody.bossProdSkuId = parseInt(bossSkuId);
    reqBody.buyNum = parseInt(buyNum);
    var url = "/app/prod/v2/activity/checkstock";
    common.ajax("GET", url, {reqBody: JSON.stringify(reqBody)}, null, function (respHeader) {
        var resp = respHeader;
        if (respHeader.resultCode == 0) {//正确执行
            $("#popSkuPannel").hide();
            goFirstOrderConfrim(bossSkuId, buyNum,FirstActId);
        } else if ( respHeader.resultCode && (respHeader.resultCode == 40240 || respHeader.resultCode == 40241)) {
            $("#popSkuPannel").hide();
            $(".shop-view span").html("商品库存不足");
            $(".shop-view,.the-light").show();
            window.setTimeout(function () {
                $(".shop-view,.the-light").hide();
            }, 2000);
        }
    });
}

function toFixed(val) {
    return Number(val).toFixed(2);
}

function buyNowBtnStatus() {
    if (isOver == 1) {
        $("#btnBuyNow").hide();
        $("#btnBuyNowSaleOff").hide();
        $("#btnBuyNowEnd").show();
    }
    if (isSaleOff == 1) {
        $("#btnBuyNow").hide();
        $("#btnBuyNowEnd").hide();
        $("#btnBuyNowSaleOff").show();
    }
}

function getShopActivityInfo() {
    if (!shopActId) {
        return false;
    }

    $("#nav-bot").hide();
    $("#spike-nav-bot").hide();

    var reqBody = new Object();
    reqBody.actId = shopActId;

    var params = new Object();
    params.reqBody = JSON.stringify(reqBody);

    common.ajax('GET', '/app/user/shop/actdtl2', params, function (respBody) {
        ordersrc = 5;
        var dtl = respBody.dtl;
        $("#actPrice").html('¥' + dtl.actPrice.toFixed(2));
        $("#prodName").html(dtl.prodName);
        $("#pay-name").html(dtl.prodName);
        $("#pay-price").html('¥' + dtl.actPrice.toFixed(2));
        if (dtl.actDesc) {
            $("#brief").html(dtl.actDesc);
        }
        if (dtl.actFreightPrice) {
            $("#freight").html('<li class="cor3e">邮费</li><li>¥ ' + dtl.actFreightPrice.toFixed(2) + '</li>');
        } else {
            $("#freight").html('<li class="cor3e">邮费</li><li>包邮</li>');
        }
        if (dtl.status == 1) {
            $("#actStatus").html("活动未开始");
            $("#shopBuynowBtn").addClass("disabled");
        } else if (dtl.status == 2) {
            $("#actStatus").html("活动进行中");
            $("#shopBuynowBtn").click(function () {
                $(".pay-now,.the-light").show();
            });

            gProdCache.setStock(skuId, parseInt(dtl.actStock) - parseInt(dtl.actSales));
            buynowNum = dtl.actLimitNum;

            $(".pay-now .pay-now-mid .more").click(function () {
                adjustBuyNowNum(1);
            });

            $(".pay-now .pay-now-mid .less").click(function () {
                adjustBuyNowNum(-1);
            });
        } else {
            $("#actStatus").html("活动已结束");
            $("#shopBuynowBtn").addClass("disabled");
        }

        $("#price").hide();
        $("#shopBuynowPrice").show();
        $("#shopBuynowBtn").show();
    });
}

function adjustBuyNowNum(num) {
    var j = $(".pay-now .pay-now-mid .num").text();
    var price = parseFloat($(".pay-now-line h2").html().substring(1));

    j = parseInt(j) + num;

    if (j <= 0) {
        return;
    }

    if (j > gProdCache.getStock(skuId)) {
        alert("库存不足");
        return;
    }

    if (buynowNum != null && j > buynowNum) {
        if (shopActId) {
            alert("活动限制购买数量为:" + buynowNum);
        } else {
            alert("秒杀限制购买数量为:" + buynowNum);
        }
        return;
    }


    $(".pay-now .pay-now-mid .num").text(j);

    if (j > 1 && limitAmt > 0 && (price * j) > limitAmt) {
        $("#error").show();
        $(".pay-now-nav span").hide();
        $(".pay-now-nav p").show();
    } else {
        $("#error").hide();
        $(".pay-now-nav span").show();
        $(".pay-now-nav p").hide();
    }
}

function setCartCount(data, skuId) {
    if (data.count) {
        gProdCache.decStockBySkuId(skuId);

        if (data.count) {
            $("#cartNum").html(data.count);
            $("#cartNum1").html(data.count);
            if (data.count > 0) {
                $(".btnCartNum").show();
            }
        }

        $(".shop-view,.the-light").show();
        window.setTimeout(function () {
            $(".shop-view,.the-light").hide();
        }, 2000);
    } else if (data.errInf) {
        alert(data.errInf);
    }
}

// function goPartner() {
//     // location.href = "/user/partner.html";
//     gotoPageUrl("/user/partner.html");
// }
//
// function goPartnerPlan() {
//     // location.href = "/user/partner-plan.html";
//     gotoPageUrl("/user/partner-plan.html");
//
// }

function refreshUserShop(shopId) {
    var reqBody = new Object();
    reqBody.shopId = shopId;

    var params = new Object();
    params.reqBody = JSON.stringify(reqBody);
    common.ajax("GET", "/app/user/shop/baseinfo1", params, function (respBody) {
        $("#shopName").html(respBody.shop.name);
        if (respBody.shop.logo) {
            if (respBody.shop.logo.indexOf("http") >= 0) {
                $("#shopLogo").attr("src", respBody.shop.logo);
            } else {
                $("#shopLogo").attr("src", ConstUtil.get("PIC_DOMAIN") + respBody.shop.logo);
            }
        }
        $(".nation-bo3").show();
    });
}
var refreshCartICacheIsPartner = "";
function refreshCart(prodId,skuId) {
    common.ajax("GET", "/app/busi/activity/shopsum", "", function (respBody) {
        initShopsumData = respBody;
        if(respBody){
            respBodyState = respBody;
            var physicalShopId = common.getSessionStorage("physicalShopId");
            var physical = common.getQueryStr("physicalShopId");
            if (respBody.count) {
                $(".btnCartNum").html(respBody.count);
                if (respBody.count > 0) {
                    $(".btnCartNum").show();
                }
            }

            if (respBody.bmclevel) {
                bmclevel = respBody.bmclevel;
                if (bmclevel && bmclevel > 0) {
                    $("#nShoper").hide();
                    $("#iShoper").css("display", "block");
                }
            }
            if (respBody.bmclevel < 1) {
                $("#popMatter").hide();
            }
            if (respBody.expiredState == true){
                 $("#sh").show();
                 $("#price_sale_comm_con1 .label").html('升级店铺可优惠:');
                $("#onSaleStatus").html("我要开店").addClass("upBulletinBtn").show().unbind('click').click(function(){
                    handleOpenShop();
                });
            }
            //非店铺
            if (respBody.bmclevel != 0 && (!!physicalShopId && physicalShopId != "") || respBody.bmclevel != 0 && (!!physical && physical != "")) {
                $("#price_sale_comm_con1").hide();
                $("#nShoper").hide();
            }else{
                //查询商品在店铺是否上架
                getProdOnsaleStatus();
            }
            if( respBody.isFirstSub != undefined  && IsonClickFirst == 1 ){
                if (respBody.isFirstSub == 0 ) {
                    $("body").addClass("body-hidden");
                    gProdCache.isAddCart(false);
                    checkFirstStock(skuId, gProdCache.getBuyNum(skuId));
                    return;
                }else{

                    var FirstAct = getUrlHashParam(/FirstAct/ig,/FirstAct=([^"]*)/i);
                    var offlineAct = getUrlHashParam(/offlineAct/ig,/offlineAct=([^"]*)/i);
                    if(FirstAct){
                        $("#originalBuyNow").show().find('.con').html('您已发生过消费，不符合首单优惠条件');
                    }else if(offlineAct){
                        $("#originalBuyNow").show().find('.con').html('您已发生过消费，不符合线下推广条件');
                    }

                    $("#popSkuPannel").hide();
                    $(".the-light").show();
                    $("#originalBuyNow .bottom .no").click(function(){
                        $("#originalBuyNow").hide();
                        $(".the-light").hide();
                    });
                    $("#originalBuyNow .bottom .sure").click(function(){
                        $("#originalBuyNow").hide();
                        $(".the-light").hide();
                        // window.location.href='/prod/' + prodId + '.html';
                        gotoPageUrl('/prod/' + prodId + '.html');
                    });
                    //首单隐藏分享赚
                    $("#iShoper").hide();
                }
            }
        }
    });
    // 合伙人活动已经取消
/*  if(refreshCartICacheIsPartner === "") {
        common.ajax("GET", "/app/user/partnersts", "", function (respBody) {
            refreshCartICacheIsPartner = respBody.isPartner;
            if (respBody.isPartner == 1) {
                $(".part-in li[onclick='goPartner()']").hide();
            }
        });
    }*/
}

function showJoinTeam() {

	var shareDate = common.getSessionStorage("shareDate");
	var recommandUid = common.getSessionStorage("recommandUid");
	if (!recommandUid){
		//从url里取的，需要url解码一下
		recommandUid = common.getQueryStr("recommandUid");
		if (recommandUid){
			recommandUid = decodeURIComponent(recommandUid)
		}
	}
    if ((!shareShopId || null == shareShopId || "" == shareShopId) && !recommandUid && !shareDate) {
        return;
    }

    $("#get-weal-tips").click(function () {
        $("#join-team-main-div,.the-light").show();
        //不可拉动
        $("body").addClass("over-hd");
    });
    $("#join-team-button").click(function () {
        $("#join-team-second,.the-light").show();
        $("#join-team-main-div").hide();
    });
    $("#cancel-join-team-main").click(function () {
        $("#join-team-main-div,.the-light").hide();
        $("body").removeClass("over-hd");
    });
    $("#cancel-join").click(function () {
        $("#join-team-second,.the-light").hide();
        $("body").removeClass("over-hd");
    });
    $("#confim-join").click(function () {
        joinTeam();
    });
    $("#join-success").click(function () {
        location.reload();
    });
    var body = new Object();
    body.shopId = shareShopId;
    body.recommandUid = recommandUid;
    body.shareDate = shareDate;

    var params = new Object();
    params.reqBody = JSON.stringify(body);

    common.ajax("GET", "/app/user/shop/canjoinTeam", params, function (respBody) {
        $("#get-weal-tips").show();
        inviAccount = respBody.invitorAccount;
        //写加入团队相关信息
        var invitorName = respBody.invitorName;
        var showAccount = respBody.showAccount;
        if (!invitorName || null == invitorName || "" == invitorName) {
            invitorName = "";
            $("#team-name").html(showAccount);
        } else {
            $("#team-name").html(invitorName);
        }

        $("#team-name2").html(invitorName + "(" + showAccount + ")");
    }, function (respHead) {
        if (respHead.resultCode == 0) {
            //可以加入团队
            $("#get-weal-tips").show();
        } else {
            //不能加入团队，要在这里隐藏
            $("#get-weal-tips").hide();
        }
    });
}

function getShareInfo() {

	showJoinTeam();

    shareShopId = common.getQueryStr("shareShopId");
    if (!shareShopId || null == shareShopId || "" == shareShopId) {
        // 大屏商品详情二维码进入洋老板H5商品详情页
        var _isShare= common.getQueryStr("isShare");
        var _shareShopPreview = common.getQueryStr("shareShopPreview");
        if(_shareShopPreview && _isShare=='1'){
            shareShopId = _shareShopPreview;
            common.setSessionStorage("shareShopId", shareShopId);
        }else{
            shareShopId = common.getSessionStorage("shareShopId");
        }
    } else {
        common.setSessionStorage("shareShopId", shareShopId);
    }
    title = $("#prodName").html();

    imgUrl = $(".img_3").eq(0).attr("src");
    desc = "";
    promUrl = location.href;

    if (common.isWeixin()) {
        var target = promUrl;
        var body = new Object();
        var trackId = common.getSessionStorage("trackId");
        if (undefined != trackId && null != trackId && '' != trackId && 'null' != trackId) {
            var recommandUid = trackId.split("-")[1];
            body.recommandUid = recommandUid;
        }
        var shopId = common.getSessionStorage("shopId");
        target = target.replace(ConstUtil.get("DOMAIN"), "");
        if (shareShopId && null != shareShopId && "" != shareShopId) {//店铺分享
            body.shopId = shareShopId;
        } else if (shopId && null != shopId && "" != shopId) {
            body.shopId = shopId;
        }

        body.target = target;

        var params = new Object();
        params.reqBody = JSON.stringify(body);

        /*common.ajax("GET", "/app/weixin/oauthurl", params, function (respBody) {
         promUrl = respBody.oauthUrl;
         wx.ready(function () {
         wx.showMenuItems({
         menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
         });
         });
         });*/
    }
}

function getActId(){
    var actId  = getUrlParam(/FirstAct/ig,/FirstAct=([\d]*)/i, function(){

    });
    if(actId == null){
        actId  = getUrlParam(/zeroAct/ig,/zeroAct=([\d]*)/i,function(){//0利润
            $("#nShoper").html('<div class="nation-bo clearfix cor3e fs14 store-partner border-b-1px"><div class="fl fs14 cor666 ">活动商品，不参与销售奖励</div></div>')
                .removeClass("nShoper").removeAttr("id").show();
            $("#iShoper").remove();
            $("#popSkuCommission").remove();
        });
    }
    if(actId == null){
        actId  = getUrlParam(/welfare/ig,/welfare=([[\d]*)/i,function(){//福利专区活动
            initWelfare();//初始化福利专区样式
        });
    }
    if(actId == null){
        actId  = getUrlParam(/offlineAct/ig,/offlineAct=([\d]*)/i,function(){//线下推广渠道ID
            $(".first-reduce").show();
            $(".first-reduce").siblings("ul").hide();
            $("#upBuyNow,.nav-botb").hide();

            //分享按钮 推荐商品 sku 隐藏
            $("#share,#recommend,#recommend-title,#popSkuBtn,#coupon,#prod-explain .prod-explain-item,#activity,.nation-bo1,.nation-bo3").remove();
        });
    }
    return actId;
}

function loadFlashActivity(prodId) {
    // 判断是否渠道推广活动
    var _userSrc = userSrcAct.isSrcAct();
    if(_userSrc){
        return;
    }
    // 判断是否第三渠道活动
    var _thirdChannelActivityId = thirdChannel.isSrcId();
    if(_thirdChannelActivityId){
        return;
    }
    // 店铺处理，分享操作
    if(isFromShopkeeperFlag){
        addPromotion(8,prodId);
        $("#share").unbind('click').click(function(){
            commshared(8,prodId);
        });
        $("#norprice").show();
        // return ;
    }
    var reqBody = new Object();
    reqBody.prodId = prodId;

    var actId = getActId();

    if (actId == null){
        $("#norprice").show();
    }
    if( FirstActId ){
        reqBody.actId = FirstActId;
    }

    common.ajax("GET", "/app/busi/activity/buynow/flash", {"reqBody": JSON.stringify(reqBody)}, function (respBody) {

        var baseActivity = respBody.baseActivity;
        //活动详情页不显示 基础库存 没有货 提示
        if(baseActivity){
            $(".nav-botb").hide()
            $("#btnCartRemind,#addSkuRemindBtn,#addRemindBtn").remove();
        }
        buynowType = respBody.buynowType;
        var buyNowSkuProdInfoList = respBody.buyNowSkuProdInfoList;
        nowdate = respBody.nowdate;
        if (baseActivity && buynowType){
            if ( buynowType == 4 ){
                var value = baseActivity.id + "-"+ prodId;
                addPromotion(9,value);
                $("#share").unbind('click').click(function(){
                    commshared(9,value);
                })
            }
            if (buynowType == 5){
                var value = baseActivity.id + "-"+ prodId;
                addPromotion(11,value);
                $("#share").unbind('click').click(function(){
                    commshared(11,value);
                })
            }
        }
        else if( buynowType!= 4 && buynowType!= 5 && isAct!= 1) {
            value = prodId;
            addPromotion(8,value);
            $("#share").unbind('click').click(function(){
                commshared(8,value);
            })
        }
        if (baseActivity != null && baseActivity.type == 4) {
            if (baseActivity.startTime > nowdate) {
                StartTimer(respBody);
                var limitedwill = '';
                limitedwill = '<div class="limited-will"><ul class="clearfix"><li class="fl fs14 cor333">此商品参加</br>限时购活动</li><li class="fl fs14 cor333"><a class="fs14" href="/activity/limited.html?bossProdId=' + prodId + '&startTime=' + baseActivity.startTime + '">点击查看</a></li>'
                    + '<li class="fr fs14 cor333 tac"><p class="corfff">距离开始</p><p class="cor333" id="StartTimer"></p></li><li class="triangle-left fr"></li></ul></div>'
                $("#limited").html(limitedwill);
            } else {
                EndTimer(respBody);
                gtype = baseActivity.type;
                gstatus = baseActivity.status;
                gprisection = buyNowSkuProdInfoList[0].prodPrice;
                for (var i in buyNowSkuProdInfoList) {
                    var prod = buyNowSkuProdInfoList[i];
                    gprice[prod.bossSkuId] = prod.prodPrice;
                    gnum[prod.bossSkuId] = prod.num;
                    gstore[prod.bossSkuId] = prod.store;
                }

                $('#norprice').hide();
                $('#oriprice').hide();

                //限制使用福利直接隐藏div
                if (respBody.limitedWelfare && respBody.limitedWelfare == 1) {
                    $("#price_weal_fuli_con").hide();
                    $("#price_weal_fuli_con1").hide();
                    $("#noWelfare").html("特惠商品，暂不参与福利抵扣").show();
                    $("#noWelfare2").show();
                } else {
                    $("#price_weal_fuli").html("¥" + toFixed(gprisection * 0.1)).show();
                }


//				$('#price_weal_fuli').html('¥'+toFixed(buyNowSkuProdInfoList[0].prodPrice * 0.1));//限時購福利
                var limiteding = '';
                limiteding = '<div class="limited-ing"><ul class="clearfix"><li class="fl">¥' + toFixed(buyNowSkuProdInfoList[0].prodPrice) + '</li>'
                    + '<li class="fl fs14 cor333">结束后恢复:¥<span>' + toFixed(buyNowSkuProdInfoList[0].referPrice) + '</span></li>'
                    + '<li class="fr fs14 cor333 tac"><p class="corfff">距离结束</p><p class="cor333" id="endtimer"></p></li>'
                    + '<li class="triangle-left fr"></li></ul></div>'
                $("#limited").html(limiteding);
            }
        }
        else if (buynowType && buynowType == 6) { //0利润商品
       	 var value = baseActivity.id + "-"+ prodId;
         addPromotion(19,value);
         $("#share").unbind('click').click(function(){
             commshared(19,value);
         });

        	initZeroProfit(respBody);
        }
        else if (buynowType && (buynowType == 5 || buynowType == 10)) {
            //如果是首单优惠活动或者 线下推广,则不显示福利抵扣和销售奖励,不显示说明
            var norprice_icon='新人价';
            if(buynowType==10){
                $(".nation-bo1").hide();
                norprice_icon='线下推广';
            }
            firstbuynum = respBody.buyNowSkuProdInfoList[0].num;
            $("#nShoper").hide();
            $("#iShoper").hide();
            // $("#prod-explain .prod-explain-item").hide(); 产品部确定不需要隐藏
            $("#nav-bot ul").hide();
            $("#price_weal_fuli_con1").hide();
            $("#price_sale_comm_con1").hide();
            $("#activity").hide();
            $("#sub-activity-pic").hide();
            $("#sub-activity").html("首单商品");
            $("#popSkuCommission").hide();
            $("#activity").click(function(){
                // window.location.href="/store/firstmail-free.html";
                gotoPageUrl("/store/firstmail-free.html");
            });
            $("#sub-activity").show();
            $("#reBuyNow").show();
            //$("#WeChat-QR").hide();
            //alert("aaa");
            isFirstSub = respBody.isFirstSub;
            if( buyNowSkuProdInfoList ){
                buyNowSkuProdInfoList = respBody.buyNowSkuProdInfoList;
                $("#oriprice").html('¥' + buyNowSkuProdInfoList[0].referPrice);
                $("#norprice").html('<e class="fs14">'+norprice_icon+'¥</e>' + buyNowSkuProdInfoList[0].prodPrice);
                $("#norprice").show();
                $(".reduce").show().html('立省¥' + (buyNowSkuProdInfoList[0].referPrice - (buyNowSkuProdInfoList[0].prodPrice?buyNowSkuProdInfoList[0].prodPrice:0)).toFixed(2));

                //缓存限购数量和库存,库存为0时，立即购买置灰(zhx)
                for(var i=0;i<buyNowSkuProdInfoList.length;i++){
                	pStore=buyNowSkuProdInfoList[i].store;
                	if(pStore){
                		pStore+=parseInt(pStore);
                	}
                }

                if(pStore==0){
                	$("#reBuyNow").removeClass("bgc11c1c");
                    $("#reBuyNow").html('暂时无货').css("background","#999").unbind("click");
                }
                //修改数量按钮颜色,当限购一件事置灰加号按钮
                pNum=buyNowSkuProdInfoList[0].num;
                $(".btn-rem1,.btn-rem3").css({"color":"#ccc","cursor":"not-allowed"});
                if(pNum==1){
                	$(".btn-rem3").css("background","#999");
                }

                var SkuSpan1 = '';
                var SkuSpan2 = '<ul class="clearfix " name="尺码选择"><div class="fs14">尺码选择</div>';
                for( var i = 0 ; i < buyNowSkuProdInfoList.length ; i++ ){
                    var GetSkuaattr = buyNowSkuProdInfoList[i].skuAttr;
                    if( GetSkuaattr.length > 3 ){
                        var s = eval(buyNowSkuProdInfoList[i].skuAttr);
                        var s1 = s[0]["valid-name"].split("-");
                        SkuSpan1 += '<span class="fl spetion">' + s1[1] + '</span>';
                        SkuSpan2 += '<li class="fl fs12" valid="' + s1[0] + '" name="0">' + s1[1] + '</li>'
                    }
                }
                //保存活动的sku html
                gProdCache.setActSkuHtml(SkuSpan1);

                $("#skuDisplayCon").html(SkuSpan1);
                SkuSpan2 +='</div></ul>';
                $("#bossProdSkuPannel").html(SkuSpan2);

                $("#bossProdSkuPannel li").click(function () {
                    if ($(this).hasClass(liUnClick)) {
                        return;
                    }
                    if (saleOff == 1) {
                        return;
                    }
                    $("#popSkuSel1").html("已选：");
                    var pos = $(this).attr("name");
                    if (pos != gProdCache.getAttrInfoLen() && !$(this).hasClass(liUnClick)) {
                        if ($(this).hasClass("selected")) {
                            $(this).removeClass("selected");
                            //如果只有一个sku属性，那么没有选择的时候确认按钮也应该置灰
                            $("#bossProdSkuPannel ul").each(function (i, item) {
                                if (i == 0) {
                                    $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                                }
                            });
                        } else {
                            //属性发生了切换，那么数量就要重置为1，确认按钮也要置灰(sku属性只有一个的时候不置灰)
                            var $t = $(this).addClass("selected");
                            $t.siblings("li").removeClass("selected");
                            $("#txtCartNum").text(1);
                            //非最后一行选择状态改变，那么该行之后的已选中的属性都要清空
                            $("#bossProdSkuPannel ul").each(function (i, item) {
                                if (i > parseInt(pos)) {
                                    $(this).find("li").removeClass("selected");
                                    $(this).find("li").removeClass(liUnClick);
                                    $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                                }
                            });
                        }
                    }
                    var selObjs = $("#bossProdSkuPannel li.selected").map(function () {
                        return $(this).text();
                    });
                    var text = $.merge([], selObjs).join(" ");
                    if (text.length > 9) {
                        text = text.substring(0, 8);
                        text = text + "...";
                    }
                    $("#popSkuSel").html(text);
                    var sku = gProdCache.checkSkuComplete();
                    //根据返回的sku库存来改变样式
                    var txtCartNum = $("#txtCartNum").text();
                    $("#btnCartTip").hide();
                    $("#btnCartTip1").hide();
                    if (sku !== null && gProdCache.getStock(sku.bossSkuId) < parseInt(txtCartNum)) {
                        if ($("#btnCartConfirm").is(":visible")) {
                            $("#btnCartConfirm").removeClass(btnSelClaz).addClass(btnUnSelClaz);
                        }
                    }
                    if (sku == null) {
                        $("#popSkuPrice").html(priceSection);
                        if (showCommission == 1) {
                            $("#popSkuCommission").show().find("span").html(commissionSection);
                        }
                        if (gtype == 4 && gstatus == 1) {
                            $("#popSkuPrice").html(toFixed(gprisection));
                        }
                    }else{
                        if($("#bossProdSkuPannel li").hasClass("selected")){
                            var UlIndex = $("#bossProdSkuPannel ul li").index(this);
                            var ShowSKUPrice = buyNowSkuProdInfoList[UlIndex].prodPrice;
                            $("#popSkuPrice").html('单价：¥' + ShowSKUPrice);
                        }
                    }
                    //遍历li，看看是否都没选中，如果都没选中，回到初始化状态
                    var hasSelected = 0;
                    var allObjs = $("#bossProdSkuPannel").find("li").each(function () {
                        if ($(this).hasClass("selected")) {
                            hasSelected = 1;
                        }
                    });
                    if (hasSelected == 0) {
                        $("#popSkuSel1").html("请选择：");
                        var objs = $("#bossProdSkuPannel ul div").map(function () {
                            return $(this).text();
                        });
                        var text = $.merge([], objs).join(" ");
                        if (text.length > 9) {
                            text = text.substring(0, 8);
                            text = text + "...";
                        }
                        $("#popSkuSel").html(text);
                        $("#bossProdSkuPannel").find("li").bind("click").removeClass(liUnClick);
                        //单个sku属性时
                        if (gProdCache.getAttrInfoLen() == 1) {
                            $("#bossProdSkuPannel ul li").each(function (i, item) {
                                var valid = $(this).attr("valid");
                                var sku = gProdCache.getSkuValToSkuInfoDic(valid);
                                if (gProdCache.getStock(sku.bossSkuId) <= 0) {
                                    $(this).addClass(liUnClick);
                                }
                            });
                        }
                        gProdCache.setInitial(1);
                    } else {
                        gProdCache.setInitial(0);
                        if (sku != null) {
                            adjustCartNum(0, sku.bossSkuId);
                        }
                    }
                    IsSelect = hasSelected;
                    //首单隐藏销售奖励
                	$("#popSkuCommission").hide();
                });
            }
        }

        if (baseActivity != null && buynowType == 12) {
            //福利专区活动
            var value = baseActivity.id + "-"+ prodId;
            addPromotion(29,value);
            $("#share").unbind('click').click(function(){
                commshared(29,value);
            });

            initWelfare(respBody);
        }
        else if(baseActivity == null&&checkUpAct()){
       	 	showUpAct("活动已结束");
        }else if(!baseActivity){
            $("#price_weal_fuli_con").hide();
            $("#price_weal_fuli_con1").hide();
            var _iswelfareActId = getUrlHashParam(/welfare/ig,/welfare=([[\d]*)/i);
            if(reqBody.actId){
                //商品没有参加福利专区
                $("#addCartBtn").hide();
                $("#instBuyBtn").hide();
                $("#nav-bot .nav-botb-fst").html("已下架").show();
                $("#norprice").show();
            }
        }
    });
}

$("#reBuyNow").click(function(){

    //返利网非指定商品判断
    if(isAssignProd === false){
        showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
        return ;
    }

    if( isSkuprod == 1 && IsSelect !== 1 ){
        $("#popSkuPannel,.the-light,#reBuyNow").show();
        $("#btnPopSku,#join-team-second,#btnSaleOff").hide();
        $("#btnCartConfirm").click(hidPopFunc);
        $(".prod-details .nav-bot").css("z-index","10003");
        // IsSelect = 1;
    }else if( isSkuprod == 1 && IsSelect == 1 ){
        if($("#popSkuPannel").css('display')=='none'){
            $("#popSkuPannel,.the-light,#reBuyNow").show();
            return;
        }
        if( firstbuynum == 0 || firstbuynum >= $("#txtCartNum").html() ){
            $(".prod-details .nav-bot").css("z-index","10003");
            IsonClickFirst = 1;
            var selSkuId = gProdCache.getSkuIdByDesc(true, true);
        }else{
            isSkuprod = 1;
            IsSelect = 0;
            $("#txtCartNum").html(firstbuynum);
            $("#firstbuynum").show();
            setTimeout(function(){
                $("#firstbuynum").hide();
            },3000);
            return;
        }
        refreshCart(prodId,selSkuId);
    }else if( isSkuprod == 0 && IsSelect == 1 ){
        if( firstbuynum == 0 ){
            IsonClickFirst = 1;
            var selSkuId = gProdCache.getSkuIdByDesc(true);
            refreshCart(prodId,selSkuId);
        }else if( firstbuynum < $("#txtCartNum").html() ){
            isSkuprod = 0;
            IsSelect = 0;
            $("#txtCartNum").html(firstbuynum);
            $("#firstbuynum").show();
            setTimeout(function(){
                $("#firstbuynum").hide();
            },3000);
            return;
        }else{
            IsonClickFirst = 1;
            var selSkuId = gProdCache.getSkuIdByDesc(true);
            refreshCart(prodId,selSkuId);
        }

    }else{
    	//无库存不能购买(zhx)
		if(pStore == 0){
			return;
		}

        $("#popSkuPannel,#reBuyNow,.the-light").show();
        $("#popSkuPannel").addClass("showBtnAddLess");

        $("#popSkuPannel .sel-img,#btnCardBuy,#btnSaleOff,#btnCartConfirm,#btnPopSku").hide();
        isSkuprod = 0;
        IsSelect = 1;
        /*$("body").addClass("body-hidden");
         gProdCache.isAddCart(this.id == "addCartBtn" ? true : false);
         var selSkuId = gProdCache.getSkuIdByDesc(false);
         showPopFunc(2, this.id);
         return;*/
    }
});

function NowTime() {
    gnowdate = gnowdate + 1000;
    return gnowdate;
}

function StartTimer(respBody) {
    startTime = respBody.baseActivity.startTime;
    if (gnowdate == '') {
        gnowdate = respBody.nowdate;
    }
    setTimeout(NowTime(), 1000);
    var ts = (startTime) + 24 * 3600 * 1000 - (gnowdate);//计算剩余的毫秒数
    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
    var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    var TheTime = "<span>" + hh + "</span>:<span>" + mm + "</span>:<span>" + ss + "</span>";
    if (ts < 0) {
        return false;
    } else {
        setTimeout(function () {
            StartTimer(respBody);
        }, 1000);
    }
    //return TheTime;
    $("#StartTimer").html(TheTime);
}

function EndTimer(respBody) {
    endTime = respBody.baseActivity.endTime;
    if (gnowdate == '') {
        gnowdate = respBody.nowdate;
    }

    setTimeout(NowTime(), 1000);
    var ts = (endTime) - (gnowdate);//计算剩余的毫秒数
    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
    var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    var TheTime = '<span>' + hh + '</span>:<span>' + mm + '</span>:<span>' + ss + '</span>';
    if (ts < 0) {
        return false;
    } else {
        setTimeout(function () {
            EndTimer(respBody);
        }, 1000);
    }
    //return TheTime;
    $("#endtimer").html(TheTime);
}

function checkTime(a) {
    if (a < 10) {
        a = "0" + a;
    }
    return a;
}

function joinTeam() {
    var params = new Object();
    var reqBody = new Object();
    reqBody.invitCode = Base64.encode(inviAccount);
    params.reqBody = reqBody;
    $("#join-team-second").hide();
    common.ajax("POST", "/app/userbmc/invUser", params, function (respBody) {
        //成功加入团队
        joinsuccess();
    }, callbackWithHead);

}

function callbackWithHead(head) {
    if (head.resultCode != 0) {
        //加入不成功
        alert(head.message);
    } else {
        //成功加入团队
        joinsuccess();
    }
}

function joinsuccess() {
    //成功加入团队
    $("#join-success").show();
    $("body").removeClass("over-hd");
    $(".the-light").hide();
    setTimeout(function () {
        $("#join-success").hide();
        location.reload();
    }, 2000);

}

function closeMwin() {
    $("#buynow_window").hide();
    $(".the-light").hide();
}

function loadFirtBuyProd(prodId){
    var reqBody = new Object();
    reqBody.prodId = prodId;
    common.ajax("GET","/app/busi/activity/buynow/reducation", {"reqBody": JSON.stringify(reqBody)}, function(respBody){
        var baseActivity = respBody.baseActivity;
        var buyNowSkuProdInfoList = respBody.buyNowSkuProdInfoList;
        nowdate = respBody.nowdate;
        if(baseActivity != null && baseActivity.type == 4){
            if(baseActivity.startTime > nowdate){
                StartTimer(respBody);
                var limitedwill = '';
                limitedwill = '<div class="limited-will"><ul class="clearfix"><li class="fl fs14 cor333">此商品参加</br>限时购活动</li><li class="fl fs14 cor333"><a class="fs14" href="/activity/limited.html?bossProdId='+prodId+'&startTime='+baseActivity.startTime+'">点击查看</a></li>'
                    + '<li class="fr fs14 cor333 tac"><p class="corfff">距离开始</p><p class="cor333" id="StartTimer"></p></li><li class="triangle-left fr"></li></ul></div>'
                $("#limited").html(limitedwill);
            }else{
                EndTimer(respBody);
                gtype = baseActivity.type;
                gstatus = baseActivity.status;
                gprisection = buyNowSkuProdInfoList[0].prodPrice;
                for(var i in buyNowSkuProdInfoList){
                    var prod = buyNowSkuProdInfoList[i];
                    gprice[prod.bossSkuId] = prod.prodPrice;
                    gnum[prod.bossSkuId] = prod.num;
                    gstore[prod.bossSkuId] = prod.store;
                }
                $('#norprice').hide();
                $('#oriprice').hide();

                //限制使用福利直接隐藏div
                if (respBody.limitedWelfare && respBody.limitedWelfare == 1){
                    $("#price_weal_fuli_con").hide();
                    $("#price_weal_fuli_con1").hide();
                    $("#noWelfare").show();
                    $("#noWelfare2").show();
                }else{
                    $("#price_weal_fuli").html("¥"+toFixed(gprisection * 0.1)).show();
                }


//					$('#price_weal_fuli').html('¥'+toFixed(buyNowSkuProdInfoList[0].prodPrice * 0.1));//限時購福利
                var limiteding = '';
                limiteding = '<div class="limited-ing"><ul class="clearfix"><li class="fl">¥'+ toFixed(buyNowSkuProdInfoList[0].prodPrice) +'</li>'
                    + '<li class="fl fs14 cor333">结束后恢复:¥<span>'+ toFixed(buyNowSkuProdInfoList[0].referPrice) +'</span></li>'
                    + '<li class="fr fs14 cor333 tac"><p class="corfff">距离结束</p><p class="cor333" id="endtimer"></p></li>'
                    + '<li class="triangle-left fr"></li></ul></div>'
                $("#limited").html(limiteding);
            }
        }

    },function(){});
}

//打开分享赚奖励弹窗
function shared(type,value) {
    $("#share4Money").show();
    $(".the-light2").show();
    var trackId = common.getSessionStorage("trackId");
    var reqBodyShopId =  common.getReqBodyShopId();
    var codeUrl ="/app/user/all/qrcode?trackId="+trackId+"&type="+type+"&value="+value;
    if(reqBodyShopId!=''){
        codeUrl = codeUrl+"&shareShopPreview="+reqBodyShopId;
    }
    $("#my-shop-qrcode").attr("src",codeUrl);
    $("#share4Money").show();
    $(".the-light2").show();
    $("#sharemfr").click(function() {
        $("#share-guide").show();
        $("#share-C").hide();
        $("#share4Money").hide();
        $("#share-guide-close").click(function(){
            $(".the-light2").hide();
            $("#share-guide").hide();
        })
    })
    $("#sharemmo").click(function() {
        $("#share-guide").show();
        $("#share4Money").hide();
        $("#share-guide-close").click(function(){
            $(".the-light2").hide();
            $("#share-guide").hide();
        })
    });
    $("#WeChat-QR").click(function(){
        $(".the-light2").show();
        $("#share-QR").show();
        $("#share4Money").hide();
    });
    $(".share-close").click(function(){
        $("#share-QR").hide();
        $(".the-light2").hide();
    })
    $("#close").click(function () {
        $("#share4Money").hide();
        $(".the-light2").hide();
    })

    $("#close").click(function () {
        $("#share4Money").hide();
        $(".the-light2").hide();
    })
}

function commshared(type,value){
    var trackId = common.getSessionStorage("trackId");
    if (trackId != undefined && trackId != null && $.trim(trackId) != "") {
        common.ajax('GET', '/app/busi/activity/shopsum', "", function(respBody) {
            if(respBody.bmclevel <1 || respBody.expiredState == true){
                $(".the-light2").show();
                $("#share-C").show();
                $("#sharefr").click(function() {
                    $("#share-guide").show();
                    $("#share-C").hide();
                    $("#share-guide-close").click(function(){
                        $("#share-C").hide();
                        $(".the-light2").hide();
                        $("#share-guide").hide();
                    })
                })
                $("#sharemo").click(function() {
                    $("#share-guide").show();
                    $("#share-C").hide();
                    $("#share-guide-close").click(function(){
                        $("#share-C").hide();
                        $(".the-light2").hide();
                        $("#share-guide").hide();
                    })
                })
                $("#close-C").click(function () {
                    $("#share-C").hide();
                    $(".the-light2").hide();
                })
            }else{
                var trackId = common.getSessionStorage("trackId");
                var codeUrl ="/app/user/all/qrcode?trackId="+trackId+"&type="+type+"&value="+value;
                var reqBodyShopId = common.getReqBodyShopId();
                if(reqBodyShopId!=''){
                    codeUrl = codeUrl+"&shareShopPreview="+reqBodyShopId;
                }
                $("#my-shop-qrcode").attr("src",codeUrl);
                $("#share4Money").show();
                $(".the-light2").show();
                $("#sharemfr").click(function() {
                    $("#share-guide").show();
                    $("#share-C").hide();
                    $("#share4Money").hide();
                    $("#share-guide-close").click(function(){
                        $(".the-light2").hide();
                        $("#share-guide").hide();
                    })
                })
                $("#sharemmo").click(function() {
                    $("#share-guide").show();
                    $("#share4Money").hide();
                    $("#share-guide-close").click(function(){
                        $(".the-light2").hide();
                        $("#share-guide").hide();
                    })
                });
                $("#WeChat-QR").click(function(){
                    $(".the-light2").show();
                    $("#share-QR").show();
                    $("#share4Money").hide();
                });
                $(".share-close").click(function(){
                    $("#share-QR").hide();
                    $(".the-light2").hide();
                })
                $("#close").click(function () {
                    $("#share4Money").hide();
                    $(".the-light2").hide();
                })
            }
        });
    }
    else{
        $(".the-light2").show();
        $("#share-C").show();
        $("#sharefr").click(function() {
            $("#share-guide").show();
            $("#share-C").hide();
            $("#share-guide-close").click(function(){
                $("#share-C").hide();
                $(".the-light2").hide();
                $("#share-guide").hide();
            })
        })
        $("#sharemo").click(function() {
            $("#share-guide").show();
            $("#share-C").hide();
            $("#share-guide-close").click(function(){
                $("#share-C").hide();
                $(".the-light2").hide();
                $("#share-guide").hide();
            })
        })
        $("#close-C").click(function () {
            $("#share-C").hide();
            $(".the-light2").hide();
        })
    }
}

function goBack(){
    if(/offlineAct=([^"]*)/i.test(location.hash)){
        history.go(-1);
    }else{
        var isShare = common.getSessionStorage("isShare");
        if (1== isShare){
            // location.replace("/index.html");
            gotoPageUrl("/index.html","replace");
        }else{
            history.go(-1);
        }
    }

}

function sortNumber(a,b){
    return a - b ;
}

function getUrlParam(patt,patt2,func){
	var FirstAct = patt.test(location.hash);
    var str = location.hash;
    if( FirstAct && FirstAct == true ){
        FirstActId = str.match(patt2);
        FirstActId = FirstActId[1];
    }
    if(FirstActId ){
    	if(func && typeof func == 'function'){
        	func();
        }
        return FirstActId;
    }
    return null;
}
/*由于getUrlParam() 修改了 全局变量FirstActId 不方便修改 另声明一个放回获取hash值的方法*/
function getUrlHashParam(patt,patt2){
    var _hasParam = patt.test(location.hash);
    var str = location.hash;
    if( _hasParam && _hasParam == true ){
        var _value = str.match(patt2);
        _value = _value[1];
    }
    if(_value ){
        return _value;
    }
    return null;
}
/**
 * 初始化福利专区活动
 */
var cacheInitWelfare = null;
function initWelfare(data){
    //分享提示文案
    $("#pomitit").html("分享");
    $("#share4Money").addClass("welfareWrapper");

    $("#nav-bot,#btnPopSku").addClass("onlyInstBuyBtn");
    $("#onSaleStatus,#shopNameWrapper,#coupon,#activity,#prodBrandTitle,#prodBrandList,#recommend-title,#recommend,#popSkuCommission").remove();
    $("#prod-explain .shopExName[name=1]").html("包邮");
    $("#prod-explain .shopExName[name=2]").html("包邮");
    $("#price_sale_comm_con1").html("福利专区商品，不参与销售奖励");

    if(typeof data =="undefined"){
       return;
    }
    cacheInitWelfare = data;
    var baseActivity = data.baseActivity;
    var totalStore = 0;
    var buyNowSkuProdInfoList = data.buyNowSkuProdInfoList;
    if(baseActivity) {
        gtype = buynowType;
        gstatus = baseActivity.status;
        var referPrices = new Array();
        var prodPrices = new Array();
        var valids = new Array();
        var skuDisplayCon = "";
        var _welfareDeduction = 0 ;
        var _cachProdPrice = 0;
        var _buyNum = data.subsNumInWeal?Number(data.subsNumInWeal):0;
        if(buyNowSkuProdInfoList[0].num !== 0){
            pNum = buyNowSkuProdInfoList[0].num -_buyNum;
        }

        for (var i in buyNowSkuProdInfoList) {
            var prod = buyNowSkuProdInfoList[i];
            gprice[prod.bossSkuId] = prod.prodPrice;
            gnum[prod.bossSkuId] = prod.num;
            gstore[prod.bossSkuId] = prod.store;
            referPrices.push(prod.referPrice);
            prodPrices.push(prod.prodPrice);
            valids.push(prod.valids);
            skuDisplayCon += '<span class="fl spetion">'+prod.validNames +'</span>';
            gProdCache.setStock (prod.bossSkuId, prod.store); //缓存库存
            totalStore = totalStore + prod.store;
            //活动价最低的福利折扣显示
            if(_cachProdPrice==0){
                _welfareDeduction = prod.welfareDeduction;
                _cachProdPrice = prod.prodPrice;
            }else{
                if(prod.prodPrice < _cachProdPrice){
                    _welfareDeduction = prod.welfareDeduction;
                }
            }
        }

        limitedBuyTips(data);
        showWealFuli(_welfareDeduction);
        $("#skuDisplayCon").html(skuDisplayCon);
        referPrices.sort(sortNumber);
        prodPrices.sort(sortNumber);
        $("#oriprice").html('¥' + referPrices[referPrices.length -1]); //设置最高价
        if(prodPrices[0] == prodPrices[prodPrices.length -1]){
            gprisection = '¥' +toFixed(prodPrices[0]);
        }else{
            gprisection = '¥' +toFixed(prodPrices[0]) +"-"+toFixed(prodPrices[prodPrices.length -1]);
        }
        $("#norprice").html(gprisection);
        $("#norprice").show();
        actId = data.baseActivity.id;
        var opemTime = data.openTime;
        var li = $("#bossProdSkuPannel ul li");
        for(var i = 0 ;i <li.length;i++){
            if(valids.indexOf($(li[i]).attr("valid"))== -1) {
                $($(li[i])).remove();
            }
        }

        //库存不足
        if(totalStore < 1){
            $("#addCartBtn").hide();
            $("#instBuyBtn").hide();
            $("#popSkuBtn").unbind("click");//取消sku点击事件
            $("#nav-bot .nav-botb-fst").html("已抢光").show();
        }else if(pNum <=0 && buyNowSkuProdInfoList[0].num !=0){
            //达到限购数量
            $("#addCartBtn").hide();
            $("#instBuyBtn").hide();
            $("#nav-bot .nav-botb-fst").html("限购"+buyNowSkuProdInfoList[0].num+"件,已购"+_buyNum+"件").show();
        }
    }

}
//限购提示
function limitedBuyTips(data){
    var _limitedNum = data.buyNowSkuProdInfoList[0]?data.buyNowSkuProdInfoList[0].num:0;
    if(_limitedNum!==0){
        var _buyNum = data.subsNumInWeal? data.subsNumInWeal:0;
        var _buyNumTips = _buyNum!=0?"(已购"+_buyNum+"件)":"";
        var _limitedTips = "限购"+_limitedNum+"件" + _buyNumTips;
        $("#btnCartLimitedTip").html(_limitedTips).addClass("btnCartLimitedTip").show();//限购提示
    }
}
/**
 * 初始化0利润商品
 */
function initZeroProfit(data){
	 $(".del").unbind("click"); //移除加入购物车点击事件
	 $(".del").click(function(){
		 $(".the-light").hide();
		 $("#popSkuPannel").hide();
	 });
	$("#selSkuPrice").remove();
	var openTime = data.openTime;
	var baseActivity = data.baseActivity;
	var buyNowSkuProdInfoList = data.buyNowSkuProdInfoList;
	var totalStore = 0;
	 if(baseActivity) {
         gtype = buynowType;
         gstatus = baseActivity.status;
         var referPrices = new Array();
         var prodPrices = new Array();
         var valids = new Array();
         var skuDisplayCon = "";
         for (var i in buyNowSkuProdInfoList) {
             var prod = buyNowSkuProdInfoList[i];
             gprice[prod.bossSkuId] = prod.prodPrice;
             gnum[prod.bossSkuId] = prod.num;
             gstore[prod.bossSkuId] = prod.store;
             referPrices.push(prod.referPrice);
             prodPrices.push(prod.prodPrice);
             valids.push(prod.valids);
             skuDisplayCon += '<span class="fl spetion">'+prod.validNames +'</span>';
             gProdCache.setStock (prod.bossSkuId, prod.store); //缓存库存
             totalStore = totalStore + prod.store;
         }
         $("#skuDisplayCon").html(skuDisplayCon);
         referPrices.sort(sortNumber);
		 prodPrices.sort(sortNumber);
		$("#oriprice").html('¥' + referPrices[referPrices.length -1]); //设置最高价
		if(prodPrices[0] == prodPrices[prodPrices.length -1]){
			gprisection = '¥' +toFixed(prodPrices[0]);
		}else{
			 gprisection = '¥' +toFixed(prodPrices[0]) +"-"+toFixed(prodPrices[prodPrices.length -1]);
		}
		$("#norprice").html('<e class="fs14">零利润价</e>' + gprisection);
         $("#norprice").show();
     	actId = data.baseActivity.id;
     	var opemTime = data.openTime;
     	var li = $("#bossProdSkuPannel ul li");
     	for(var i = 0 ;i <li.length;i++){
		  if(valids.indexOf($(li[i]).attr("valid"))== -1) {
			  $($(li[i])).remove();
		  }
     	}
     	//库存不足
        if(totalStore < 1){
     	   $("#addCartBtn").hide();
     	   $("#instBuyBtn").hide();
     	   $("#storeEmtpyBtn").show();
        }
        //未开放
  	  if(opemTime == 0){
  		  var level = common.getSessionStorage("level");
  		if(level < 1){
			  $("#addCartBtn").unbind("click"); //移除加入购物车点击事件
			  $("#instBuyBtn").unbind("click"); //移除立即下
            // 单点击事件
			  $("#skuDisplayCon").unbind("click");
			  $("#popSkuBtn").unbind("click");
			  $("#addCartBtn").click(function(){
				  $(".the-light2").show();
				  $(".zero-profit").show();
			  })
			  $("#instBuyBtn").click(function(){
				  $(".the-light2").show();
				  $(".zero-profit").show();
			  })
			  $("#skuDisplayCon").click(function(){
				  $(".the-light2").show();
				  $(".zero-profit").show();
			  })
			  $("#popSkuBtn").click(function(){
				  $(".the-light2").show();
				  $(".zero-profit").show();
			  })
		  }
  	  }
     }
}

function hideZero(){
	 $(".the-light2").hide();
	 $(".zero-profit").hide();
     $("body").removeClass("body-overflow");
}
// 优惠券
function getCoupons(){
    $("#coupon").click(function(){
        showActionSheet("#coupon-pop");
    });
}
var couponObj = (function($){
    var couponPage = 1;
    var couponPageSize = 10;
    var loadCoupons  = function() {
        var param = new Object();
        var reqBody = new Object();
        reqBody.bossProdId = prodId;
        reqBody.page = couponPage;
        reqBody.pageSize = couponPageSize;
        param.reqBody = JSON.stringify(reqBody);

        $.ajax({
            type: "GET",
            url: "/app/coupon/list4prod",
            contentType: "application/json",
            dataType: "json",
            data: param,
            success: function (data) {
                var respBody = data.respBody;
                if(respBody && respBody.couponList){
                    initCouponsList(respBody.couponList);
                }
            }
        });
    }
        var setPage = function(){
            page ++ ;
        };
        return{
            setPage:setPage,
            loadCoupons:loadCoupons,
        }

})(window.jQuery || $);

function initCouponsList(couponList){
    if(couponList.length == 0 ){
        return
    }else{
        $("#coupon").show();
    }
    var couponHtml = '';
    var couponListLth;
    if(couponList.length < 3){
        couponListLth = couponList.length;
    }else if(couponList.length >= 3){
        couponListLth = 3;
    }
    for(var j = 0;j < couponListLth;j++){
        var couponListCon = couponList[j];
        var couponProdHtml = '<span class="coupon">'
            +couponListCon.displayName
            +'</span>';
        $(couponProdHtml).appendTo( $("#couponProd"));
    }

    for(var i = 0;i < couponList.length;i++){
        var couponListCon = couponList[i];
        couponHtml += getActCouponItemHtml(couponListCon);
    }
    $(".coupon-height").html(couponHtml);

    couponPopEvent();
}
function couponPopEvent(){
    $("#coupon-pop").on('click','.receiveBtn',function(){
        var actId = $(this).attr('actid');
        getCard(actId)
    });
}

function getActCouponItemHtml(couponListCon) {

    var giveFlag = "";
    var useBtnHtml = '';
    if (!couponListCon.received) {
        useBtnHtml = '<a href="javascript:;" class="receiveBtn" actid="' + couponListCon.actId + '">立即领取</a>';
    } else {
        giveFlag = "received";
    }

    var type = 0;
    if(couponListCon.giftPack){
        type = 1;
    }

    var _html = '<div class="iba-coupon-bg ' + giveFlag + '" id="coupon' + couponListCon.actId + '"><h3 class="iba-coupon-tit "><p class="name">' + couponListCon.name + '</p>' + useBtnHtml + '</h3><div class="pr boxBottom"><div class="couponStateIcon"></div><div class="tac iba-coupon-conL"><p class="denomination"><span class="icon">¥</span><span class="value">' + couponListCon.denomination + '</span></p><p class="useAmtLimit">' + couponListCon.useAmtLimit + '</p></div><div class="iba-coupon-conR"><div class="box"><p class="fullCoupon">' + couponListCon.fullCoupon + '</p><p class="timeLimit">' + couponListCon.timeLimit + '</p><a href="/user/coupon-state.html?t='+type+'&actId=' + couponListCon.actId + '" class="couponState">查看说明 ></a></div></div></div></div>';
    return _html;
}

/**
 * 领取优惠券
 * @param actId
 */
function getCard(actId){
    var trackId = common.getSessionStorage("trackId");
    if(!trackId || trackId==''){
        common.setSessionStorage("hisUrl", window.location.href);
        if(common.isWeixin()){
            // window.location.href ="/user/login-binding.html";
            gotoPageUrl("/user/login-binding.html");
        }else{
            // window.location.href ="/user/login.html";
            gotoPageUrl("/user/login.html");
        }
    }else{
        var url = "/app/coupon/take/"+actId;

        $.ajax({
            type : "POST",
            url : url,
            dataType : "json",
            contentType: "application/json",
            success : function(data) {
                var respHeader = data.respHeader;
                var hasNext = respHeader.hasNext;
                var resultCode = respHeader.resultCode;
                if(resultCode == 0 && hasNext== false){
                    resultCode = 105;
                }
                if(resultCode== 103 || resultCode ==105 ||  resultCode==106){
                    changeStyle(actId,resultCode);
                }
                common.toast(respHeader.message);
            },
            error:function(){
                common.toast('网络繁忙,请重试');
            }
        });
    }
}

function changeStyle(actId, code) {
    code = code + '';
    var _statusContent = $("#coupon" + actId);
    switch (code) {
        case '103':
            //已结束
            _statusContent.removeClass('notStart unreceived  received sellOut').addClass('end');
            break;
        case '105':
            // 已领取
            _statusContent.removeClass('notStart unreceived  sellOut end').addClass('received');
            break;
        case '106':
            // 已领完
            _statusContent.removeClass('notStart unreceived  received  end').addClass('sellOut');
            break;
    }
}

/**
 * 判断是否是店铺升级/续费
 */
function checkUpAct(){
	var str = location.hash;
	upAct = str.match(/upAct=([^"]*)/i);
	if(upAct){
		return true;
	}
	return false;
}

/**
 * 店铺升级续费商品套餐文字显示
 */
function showUpAct(str){
	 $("#upBuyNow").hide();
	 $(".nav-botb-fst").show();
	 $(".nav-botb-fst").html(str);
}

/**
 * 店铺升级/续费检查库存
 */
function checkUpStock(bossSkuId, buyNum) {
	if(!upActId){
		return;
	}

    var reqBody = {};
    actId = upActId;
    ordersrc = 8;
    reqBody.actId = upActId;
    reqBody.bossProdSkuId = parseInt(bossSkuId);
    reqBody.buyNum = parseInt(buyNum);
    var url = "/app/prod/v2/activity/checkstock";
    common.ajax("GET", url, {reqBody: JSON.stringify(reqBody)}, null, function (respHeader) {
        var resp = respHeader;
        if (respHeader.resultCode == 0) {//正确执行
            goOrderConfrim(bossSkuId, buyNum);
        } else if (resultCode.resultCode == 40240 || resultCode.resultCode == 40241) {
            $(".shop-view span").html("商品库存不足");
            $(".shop-view,.the-light").show();
            window.setTimeout(function () {
                $(".shop-view,.the-light").hide();
            }, 2000);
        }
    });
}

// 取消收藏
function deleteCollect(){
    var deleteURL = "/app/collect/delete";
    var reqBody = {reqBody:{ bossProdId: prodId}};
    common.ajax("POST",deleteURL,reqBody, function (respBody) {
        if(respBody.success === false){
            if(respBody.message === "您还未收藏该商品"){
                changeCollectState(0);
                common.toast(respBody.message);
            }else{
                common.toast(respBody.message);
            }
        }else{
            common.toast(respBody.message);
            changeCollectState(0);
        }
    });
}
// 添加收藏
function addCollect(){
    var addURL = "/app/collect/add";
    var reqBody = {reqBody:{ bossProdId: prodId}};
    common.ajax("POST",addURL,reqBody, function (respBody) {
        if(respBody.success === false){
            common.toast(respBody.message);
            if(respBody.message === "您已经收藏该商品"){
                changeCollectState(1);
            }
        }else{
            common.toast('收藏成功');
            changeCollectState(1);
        }
    });
}
//修改收藏状态
function changeCollectState(isCollect){
    if(isCollect === 1){
        $("#collectWrapper i").removeClass("icon-icon5").addClass("icon-xing-");
    }else if(isCollect === 0){
        $("#collectWrapper i").removeClass("icon-xing-").addClass("icon-icon5");
    }
}
function showBuyread(){
    var subMenuWrapper = $("#subMenuWrapper");
    subMenuWrapper.hide();
    //显示购物须知弹框
    showActionSheet("#buyreadActionSheet");
}
//获取说明内容
function fetchProdexplain() {
    var CROSS_BORDER_TAXRATE = 4;//跨境综合税说明id
    var prodexplainData = $("#prodExplainActionSheet .prodexplainData");
    //没有数据时获取数据
    if(prodexplainData.length==0){
        if(typeof exPath !=="undefined"){
            var id =exPath.match(/id=([,|\d]*)/i);
            var tax =exPath.match(/tax=([,|\d]*)/i);
            var ids = id[1].split(",");
            if (ids != null) {
                var list = eval('('+ "[]" +')');
                $.each(ids, function(i, item){
                    var json = {};
                    json["exId"] = item;
                    if(item == CROSS_BORDER_TAXRATE && typeof tax[1] !="undefined") {
                        json["tax"] = tax[1];
                    }
                    list.push(json);
                });
                var url = "/app/prod/v2/prodexplain";
                var reqBody = new Object();
                reqBody.list = list;
                if(prodDetailJSON.timeId){
                    reqBody.timeId = prodDetailJSON.timeId;
                }
                if(thirdChannel.detailType == 1){
                    reqBody.thirdChannelActivityId = thirdChannel.isSrcId();
                    reqBody.freightPrice = thirdChannel.activityInfo && thirdChannel.activityInfo.freightPrice || 0;
                }else{
                    reqBody.freightPrice = actprodDetailJSON.freightPrice;
                    reqBody.actId = getActId();
                    reqBody.bossProdId = prodId;
                }
                var params = new Object();
                params.reqBody = JSON.stringify(reqBody);
                common.ajax("GET", url, params, function(data) {
                    var exList = data.exList;
                    var _html = jQuery.map(exList, function(item){
                        var name = cacheInitWelfare != null && item.type==2?"包邮":item.name;
                        var descp = cacheInitWelfare != null && item.type==2?"活动商品":item.pdesc;
                        var _h = '<div class="item prodexplainData">'+
                            '<div class="itemTitle">'+name+'</div>'+
                            '<p class="itemContent">'+descp+'</p>'+
                            '</div>';
                        return _h;
                    });
                    $("#prodExplainContent").html(_html.join(""));
                    var _tagHtml = jQuery.map(exList, function(item){
                        var tagName = cacheInitWelfare != null && item.type==2?"包邮":item.name;
                        var _t = '<span class="prod-explain-item redNode"></span><span class="shopExName" name="'+item.id+'">'+tagName+'</span>'
                        return _t;
                    });
                    $(".shopExName ,.prod-explain-item").remove();
                    $("#stockInfo").after(_tagHtml.join(""));
                });
            }
        }
    }

}
//显示某个弹框
function showActionSheet(id,callback,enterClassName){
    $(id).show();
    enterClassName = enterClassName || "actionSheetEnter";
    var actionSheet = $(id+" .actionSheet");
    var actionSheetContent = $(id+" .actionSheetContent");
    var _h = actionSheet.css("height");
    var _h2 = actionSheetContent.css("height");
    if(_h != _h2 || parseInt(_h2 )< 250){
        _h = parseInt(_h)
        _h = _h < 250 ? 250 : _h;
        actionSheetContent.css('height',_h+"px");
    }
    setTimeout(function(){
            actionSheet.addClass(enterClassName);
    },0);

    $("body").addClass("body-overflow");

    callback && callback();
}

//弹框关闭
function closeActionSheet(){
    $(".actionSheetWrapper").bind("click",function(e){
        var _that =this;
        if(e.target == this || e.target.className.match(/.*closeBtn\.*/i)){
            $(_that).find(".actionSheet").removeClass("actionSheetEnter actionSheetCenterEnter");
            setTimeout(function(){
                $(_that).hide();
            },300);
            $("body").removeClass("body-overflow");
        }
    });
}
var picDomain = ConstUtil.get("PIC_DOMAIN");

function loadShopRight(){
    $.ajax({
        url:"/app/busi/activity/zeroprofit/banner",
        type:"GET",
        dataType:"json",
        contentType:"application/json",
        success:function(data){
            parentopenTime = data.respBody.openTime;
            bannerDetail(data);
        }
    });
}

function bannerDetail(data) {
    var respBody = data.respBody;
    openTimeChinese = respBody.openTimeChinese;
    var picHtml = "";
    picHtml += '('+openTimeChinese+')';
    $("#openTime").html(picHtml);
}

//判断是否是返利网指定商品 ，如果是非指定商品显示弹框
var isAssignProd = true;// //true为指定商品，false为非指定商品 ; 不是返利网入口时 为 true
function  assignprods(){
  // 返利网标识 userSrc==2
    var userSrc = common.getSessionStorage("userSrc");
    if(userSrc!== '2'){
        isAssignProd = true;
    }else{
        var url = "/app/busi/fanli/assignprods";

        common.ajax("GET", url, {reqBody: JSON.stringify({bossProdId: prodId})}, function (respBody) {
            if(typeof respBody.result !=="undefined"){
                isAssignProd = !!respBody.result;
            }
        });
    }

}

function buyOriginalPrice(url){
    //返利网非指定商品判断
    if(isAssignProd === false){
        showActionSheet("#fanliActionSheet",null,"actionSheetCenterEnter");
        return ;
    }else{
        // window.location.href = url;
        gotoPageUrl(url);
    }
}

//查询店铺是否上架商品
var prodOnsaleStatus = "";
function  getProdOnsaleStatus(){
    if(isFromShopkeeperFlag){
        return;
    }
    //福利专区cacheInitWelfare标识不查询
    if(cacheInitWelfare != null && prodOnsaleStatus!="" && typeof (prodOnsaleStatus.status) != "undefined"){
        return;
    }
    var url = "/app/user/shop/prod-onsale-status/"+prodId;

    common.ajax("GET", url, null, function (respBody) {
        // "status": 0  // 状态：0表示未上架；1表示已上架
        prodOnsaleStatus = respBody;
        if(typeof respBody.status !=="undefined"){
            if(respBody.status === 0){
                $("#onSaleStatus").html("上架店铺").addClass("putOnSaleBtn").show().click(onsaleProd);
            }else if(respBody.status === 1){
                 $("#onSaleStatus").show();
            }
        }
    });
}
var onsaleProdLoading = false;
function onsaleProd(){
    if(onsaleProdLoading===true){
        return;
    }
    onsaleProdLoading = true;
    var reqBody = new Object();
    reqBody.prodId = prodId;
    reqBody.status = 1;
    reqBody.type = 1;//上架商品
    var params = new Object();
    params.reqBody = reqBody;

    common.ajax("POST","/app/user/shop/prod",params,"", function(respHeader){
        if(respHeader.resultCode === 0){
            common.toast("商品上架成功");
            $("#onSaleStatus").html("已上架").removeClass("putOnSaleBtn").unbind("click");
        }else if(respHeader.resultCode ===50028){
            common.toast('最多只能上架300个商品',1,'warning');
        }else {
            common.toast(respHeader.message);
        }
        onsaleProdLoading = false;
    });
}

/* 虚拟抽奖商品显示*/
function virtualProd(){
    var _url = window.location.href;
    var  _isVirtual = _url.match(/\/prod\/230010100201\.html/i);
    if(_isVirtual){
        $("#iShoper,#baseBrandWrapper,#prod-explain,#activity,#coupon,#shopNameWrapper").remove()
    }
}

//评价模块对象
var assessObj = {
    bossProdId: 0,
    // "hasImages":1,
    // "scoreLevel":3,
    type:"1",//前端查询类型：1全部2好评3中评4差评5有图
    page:1,
    pageSize: 10,
    isLoading:false,
    totalPage:1,
    isShow:false,
    cacheScrollTop:0,
    commentStatistics:{
        allCount:0,
        positiveCount:0,
        moderateCount:0,
        negativeCount:0,
        withImagesCount:0
    },
    queryAssessListXhr:null,
    //初始化评价
    initAssess :function (){
        this._scrollerPullUp = $("#scroller-pullUp");
        this._assessBox =$("#assessBox");
        this._bigPicWrapper = $("#bigPicWrapper");
        this._assessBtn = $("#assessBtn");
        this._reloadBtn = $("#reloadBtn");
        this._assessMenu = $("#assessMenu");
        this._titleText = $("#title_text");
        this._assessWrapper = $("#assessWrapper");
        this._sectionWrapper = $("#sectionWrapper");

        var _that = this;
        var _timer =  0;

        this._assessBox.scroll(function() {
            window.clearTimeout(_timer);
            _timer =  window.setTimeout(function(){
                _that.scrollAssessLoad();
            },200);
        });

        var _width = $(window).width();
        this._swiperBigPicSwiper = new Swiper('#bigPicSwiper', {
            pagination : '#bigPicSwiperPagination',
            autoHeight : true,
            slidesPerView:1,
            width: _width,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            paginationType: 'fraction',
        });
        this._assessBox.on("click"," .assessImgWrapper",function(e){
            var _index = $(e.target).data("index");
            var _list = $(this).find(".square");
            var _html = _list.map(function(){
                var _img = $(this).data("src");
                return '<div class="swiper-slide"><img src="'+_img+'"></div>'
            }).get();
            $("#bigPicSwiperWrapper").html(_html);
            if(typeof _index === "undefined"){
                _index = 0;
            }
            _that._swiperBigPicSwiper.slideTo(_index);
            _that._bigPicWrapper.addClass("show");
        });

        this._bigPicWrapper.bind("click",function(e){
            _that._bigPicWrapper.removeClass("show");
        });

        /*顶部评价导航按钮*/
        this._assessBtn.click(function(){
            _that.showAssess();
            $(this).addClass("active").siblings().removeClass("active");
        });

        //首次加载异常重新加载
        this._reloadBtn.click(function(){
            _that.reloadAssessList();
        });

        var _timer = 0;
        this._assessMenu.on("click",".item",function(){
            var _this = $(this);
            _this.addClass("active").siblings().removeClass("active");

            window.clearTimeout(_timer);
            _timer = window.setTimeout(function(){
                var _type = _this.attr("type");
                _that.type = _type;
                _that.initSearch();
            },500);

        });
        this.queryAssessList(this.addAssessMode)
    },
    initSearch:function(){
        this.page = 1;
        this.totalPage = 1;
        this._scrollerPullUp.show();
        this._assessBox.removeClass("empty");
        this.clearAssessList();
        this.scrollAssessLoad();
    },
    clearAssessList:function(){
        this._assessBox.find(".assessItem").remove();
    },
    //滚动加载数据
    scrollAssessLoad:function (){
        var clientRect = this._scrollerPullUp[0].getBoundingClientRect();
        var _assessBoxClientRect = this._assessBox[0].getBoundingClientRect();
        if(clientRect.top!==0 && clientRect.top<_assessBoxClientRect.bottom){
            this.queryAssessList();
        }
    },
    // 显示评论
    showAssess:function (){
        this.isShow = true;
        this.cacheScrollTop = $(window).scrollTop();
        this._assessWrapper.addClass("show");
        this._sectionWrapper.addClass("showAccessWrapper");
        this._titleText.removeClass("dis-no");
        this.scrollAssessLoad();
    },
    // 隐藏评论
    hideAssess:function (){
        this.isShow = false;
        this._assessWrapper.removeClass("show");
        this._sectionWrapper.removeClass("showAccessWrapper");
        $('html,body').animate({scrollTop: (this.cacheScrollTop+1)+'px'}, 0);
    },
    //没有评价
    showEmptyAssess:function (){
        this._assessBox.addClass("empty");
    },
    //查询到最后一页
    endofAssess:function (){
        this._scrollerPullUp.hide();
    },
    hideReloadBtn:function(){
        this._reloadBtn.hide();
    },
    showReloadBtn:function(){
        this._scrollerPullUp.hide();
        this._reloadBtn.show();
    },
    // 重新加载评价列表
    reloadAssessList:function (){
        this._assessBox.removeClass("empty");
        this.bossProdId= prodId;
        this.page=1;
        this._scrollerPullUp.show();
        this.queryAssessList();
    },
    switchSearchType:function(){
        var reqBody= {
            bossProdId: prodId,
            page: this.page,
            pageSize: this.pageSize
        };
        // "hasImages":1, //可选参数,传入1代表只查询有图的评论
        // "scoreLevel":3, //可选参数,评价等级,1-差评,2-中评,3-好评

      //  type:1,//前端查询类型：1全部2好评3中评4差评5有图
       switch(this.type){
           case "1":
               break;
           case "2":
               reqBody.scoreLevel = 3;
               break;
           case "3":
               reqBody.scoreLevel = 2;
               break;
           case "4":
               reqBody.scoreLevel = 1;
               break;
           case "5":
               reqBody.hasImages = 1;
               break;
           default:
               break;
        }
        return reqBody;
    },
    renderStatistics:function(respBody){
        if(typeof respBody.commentStatistics == "undefined"){
            console.log("评价统计异常");
            return ;
        }
        var _commentStatistics = respBody.commentStatistics;
        if(_commentStatistics.allCount !== this.commentStatistics.allCount){
            this.commentStatistics.allCount = _commentStatistics.allCount;
            $("#assessAllCount").html(_commentStatistics.allCount);
        }
        if(_commentStatistics.positiveCount !== this.commentStatistics.positiveCount){
            this.commentStatistics.positiveCount = _commentStatistics.positiveCount;
            $("#assessPositiveCount").html(_commentStatistics.positiveCount);
        }
        if(_commentStatistics.moderateCount !== this.commentStatistics.moderateCount){
            this.commentStatistics.moderateCount = _commentStatistics.moderateCount;
            $("#assessModerateCount").html(_commentStatistics.moderateCount);
        }
        if(_commentStatistics.negativeCount !== this.commentStatistics.negativeCount){
            this.commentStatistics.negativeCount = _commentStatistics.negativeCount;
            $("#assessNegativeCount").html(_commentStatistics.negativeCount);
        }
        if(_commentStatistics.withImagesCount !== this.commentStatistics.withImagesCount){
            this.commentStatistics.withImagesCount = _commentStatistics.withImagesCount;
            $("#assessWithImagesCount").html(_commentStatistics.withImagesCount);
        }

    },
    // 查询评价列表
    queryAssessList:function (callBack){
        var _that = this;
        if(this.page>this.totalPage){
            return;
        }
        if(this.queryAssessListXhr!=null){
            this.queryAssessListXhr.abort() ;
        }
        this.bossProdId = prodId;
        var param = {};
        param.reqBody = this.switchSearchType();
        this.isLoading = true;

        this.queryAssessListXhr =  common.ajax("POST", "/app/comment/list", param, function (respBody) {
            _that.isLoading = false;
            //渲染统计数据
            _that.renderStatistics(respBody);
            var commentList = respBody.commentList;
            if(commentList && commentList.length>0){
                _that.totalPage = respBody.totalPage;
                if(_that.page>=_that.totalPage){
                    _that.endofAssess();
                }
                _that.page+=1;
                _that.renderAssess(respBody);
                if(callBack){
                    callBack(commentList[0],respBody.commentStatistics.allCount)
                }
            }else{
                if(respBody.totalPage==0){
                    _that.showEmptyAssess();
                }
                _that.endofAssess();
            }
            _that.hideReloadBtn();
        },null,function(){
            _that.isLoading = false;
            if(_that.page==1){
                _that.showReloadBtn();
            }
        });
    },
    //格式化日期
    formatDate:function (createTime) {
        var time = new Date();
        time.setTime(createTime);
        return common.formatDate('yyyy-MM-dd', time);
    },
    getAccessImageList:function (str){
        var _re = [];
        if(typeof str =="undefined" || str == ""){
            return _re
        }
        var _list =  str.split(",");
        for(var i=0;i<_list.length;i++){
            if(_list[i]!=""){
                _re.push(this.assessObj.getImgUrl(_list[i]));
            }
        }
        return _re;
    },
    getImgUrl:function(url){
        var _domain = ConstUtil.get("PIC_DOMAIN");
        if(url.indexOf("http:")==0 || url.indexOf("https:")==0){
            return url;
        }else{
            if(url.indexOf("/")==0){
                url = url.substring(1,url.length);
            }
            return _domain+url;
        }
    },
    getHeadImg:function(url){
        var _domain = ConstUtil.get("PIC_DOMAIN");
        if(typeof url === "undefined" || url =="" ){
            return "../images/user-index-default-icon.png";
        }else{
            if(url.indexOf("http:")==0 || url.indexOf("https:")==0){
                return url;
            }else{
                if(url.indexOf("/")==0){
                    url = url.substring(1,url.length);
                }
                return _domain+url;
            }
        }

    },
    // 渲染评价列表
    renderAssess:function (respBody){
        template.helper("getAccessImageList", this.getAccessImageList);
        template.helper("formatDate", this.formatDate);
        template.helper("getImgUrl", this.getImgUrl);
        template.helper("getHeadImg", this.getHeadImg);
        var prodHtml = template("assessList", respBody);
        this._scrollerPullUp.before(prodHtml);
        //再次检查列表是否满屏
        this.scrollAssessLoad();
    },
    addAssessMode:function(firstItem,sum){
            var html='<div id="assessMode" class="bortom10"> ' +
                '<p class="clearfix title"><span class="fl hd">宝贝评价（'+sum+'）</span><span class="fr arrow">查看全部<i class="iconfont fs20"></i></span></p> ' +
                '<div class="cont"> <img class="ava" src="'+(firstItem.headimg?firstItem.headimg:'../images/user-index-default-icon.png')+'"/> <div> ' +
                '<p class="name">'+firstItem.creatorName+' </p> ' +
                '<p class="detail">'+firstItem.content+'</p> ' +
                '</div> </div> </div>';
            $('#prodBrandTitle').before(html)
        assessObj.addAssessModeClick()
    },
    addAssessModeClick:function(){
        var _that=this;
        $('#assessMode').on('click',function(){
            _that.showAssess();
            $(this).addClass("active").siblings().removeClass("active");
        })
    }

};
// 添加到货提醒
function addRemind(bossSkuId,successCallback){
    var addURL = "/app/prodarrived/remind/add";
    var reqBody = {reqBody:{ bossSkuId: bossSkuId}};
    common.ajax("POST",addURL,reqBody, null,function(respHeader){
        if(respHeader.resultCode === 0){
            typeof successCallback === "function" && successCallback(respHeader);
        }
    });
}
// 查询是否设置到货提醒
function queryRemindExist(bossSkuId,successCallback){
    var addURL = "/app/prodarrived/remind/exist";
    var reqBody = {reqBody:{ bossSkuId: bossSkuId}};
    common.ajax("POST",addURL,reqBody, function (respBody) {
        typeof successCallback === "function" && successCallback(respBody.exist);
    });
}

//显示SKU版面的到货提醒
function showCartRemindBtn(useLogin){
    var _btnCartRemind = $("#btnCartRemind");
    if(useLogin){
        queryCartRemindBtnState(useLogin);
    }else{
        var trackId = common.getSessionStorage("trackId");
        if(trackId || trackId!=''){
            queryCartRemindBtnState();
        }else{
            var _bossSkuId = gProdCache.getSkuIdByDesc(true, true);
            if(_bossSkuId == false){
                _btnCartRemind.hide();
                return ;
            }
            var _stock = gProdCache.getStock(_bossSkuId);
            if(_stock>0){
                _btnCartRemind.hide();
            }else{
                if(thirdChannel.isSrcId()){
                    _btnCartRemind.unbind('click').html('抢光了').show().css({'background':'#999','color': '#fff'});
                }else{
                    _btnCartRemind.show();
                }

            }
        }
    }
}

//SKU版面的到货提醒查询
function queryCartRemindBtnState(){
    var _btnCartRemind = $("#btnCartRemind");
    if(_btnCartRemind.length>0){
        var _bossSkuId = gProdCache.getSkuIdByDesc(true, true);
        if(_bossSkuId == false){
            _btnCartRemind.hide();
            return ;
        }
        var _stock = gProdCache.getStock(_bossSkuId);
        if(_stock>0){
            _btnCartRemind.hide();
        }else{
            if(thirdChannel.isSrcId()){
                _btnCartRemind.unbind('click').html('抢光了').show().css({'background':'#999','color': '#fff'});
                return;
            }
            _btnCartRemind.removeClass("actived").show();
            queryRemindExist(_bossSkuId,function(exist){
                if(exist ===true){
                    _btnCartRemind.addClass("actived");
                }else{
                    _btnCartRemind.removeClass("actived");
                }
            })
        }

    }

}

//
function initNoSkuRemindBtn(bossSkuId){
    var trackId = common.getSessionStorage("trackId");
    if(trackId || trackId!=''){
        queryRemindExist(bossSkuId,function(exist){
            if(exist === true){
                $(".nav-botb").addClass("actived");
            }else{
                $(".nav-botb").removeClass("actived");
            }
        });
    }

}
$(document).ready(function(){
    pageSetGIO();

    if(!checkUpAct()){
        getCoupons();
        couponObj.loadCoupons();
    }
    $("#popSkuCommission").hide();
    $("#nShoper").show();
    $("#iShoper").hide();
    // $("#nsh").hide();
    if (!!initShopsumData.bmclevel && initShopsumData.bmclevel >0){
        $("#nShoper").hide();
        $("#iShoper").show();
    }
    $(".WeChat").click(function () {
        $("#shield").show();
        $(".prod-details").css("overflow", "hidden");
        $("#shield").click(function () {
            $("#shield").hide();
            $(".prod-details").css("overflow", "auto");
        })
    })
    $("#originalBuyNow").click(function(){

    })
    //升级续费提交按钮
    $("#upBuyNow").click(function(){
        gProdCache.isAddCart(false);
        checkUpStock(minSkuId, 1);
    });
    //特定虚拟商品隐藏信息处理
    virtualProd();

    // 取消零利润
    // loadShopRight();

    $(".prod-details .pf .return").click(function () {
        common.deleteCookie("storeUpTipsCookies");     //返回删除cookie
    });

    var subMenu = $("#subMenu");
    var subMenuWrapper = $("#subMenuWrapper");
    var moreBtn = $("#moreBtn");
    moreBtn.click(function(){
        subMenuWrapper.show();
    });
    subMenuWrapper.bind('click touchstart',function(e){
        subMenuWrapper.hide();
    });
    subMenu.bind('click touchstart touchmove',function(e){
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    });

    closeActionSheet();

    $("#prod-explain").click(function(){
        //显示说明弹框
        showActionSheet("#prodExplainActionSheet");
    });

    $("#collectWrapper").click(function(){
        var isCollect = $(this).find(".icon-icon5").length >0;
        if(isCollect ){
            addCollect();
        }else{
            deleteCollect();
        }
    });

    /*店铺判断*/
    if(isFromShopkeeperFlag){
        $("#prodBrandTitle,#prodBrandList,#recommend-title,#recommend,#nsh,#coupon,#shopNameWrapper,#get-weal-tips").remove();
    }else{
        //品牌信息
        brandInfo();
    }
    assignprods();

    //初始评价界面
    assessObj.initAssess();

    $("#addRemindBtn").click(function(){
        if(!$(this).hasClass("actived")){
            var _bossSkuId = $(this).data("bossSkuId");
            addRemind(_bossSkuId,function(){
                common.toast("已开启到货提醒!");
                $("#addRemindBtn").addClass("actived").unbind("click");
            });
        }
    });

    $("#btnCartRemind").click(function(){
        if(!$(this).hasClass("actived")){
            var _bossSkuId = gProdCache.getSkuIdByDesc(true, true);
            addRemind(_bossSkuId,function(){
                common.toast("已开启到货提醒!");
                $("#btnCartRemind").addClass("actived");
            });
        }
    });
    var kolChannel = common.getQueryStr("kolChannel");
    if(kolChannel){
        getDitch(kolChannel);
    }

    upBulletinBtnEvent();
    // fetchProdexplain()

});
function getDitch(kolChannel) {
    if (!kolChannel) return;
    $.ajax({
        url:"/app/report/ditch?uid="+kolChannel,
        type:"GET",
        dataType:"json",
        contentType:"application/json",
        success:function(data){
            if (data.respHeader.resultCode == 0){
                if (!data.respBody.ditch) return;
                addVisitCount(data.respBody.ditch);
                common.setSessionStorage("ditch",data.respBody.ditch);
            }
        }
    });
}
/*统计浏览量*/
function addVisitCount(kolChannel){
    $.ajax({
        url:"/app/report/visitcount/add?linkId="+kolChannel,
        type:"GET",
        dataType:"json",
        contentType:"application/json",
        success:function(data){

        }
    });
}


function setSaleRate(respBody){
    shareCommission = minCommission * respBody.m1Rate * 0.01;
    commissionRate = respBody.m1Rate * 0.01;
    $("#shareCommission").html("¥"+shareCommission.toFixed(2));
    //如果商品奖励为0的时候,分享赚按钮不显示
    if(minCommission == 0 ){
        $("#sh").hide();
        $("#popSkuCommission").hide();
    }
    if(respBody.rate == 0) {
        var commission = minCommission;
        if (commission != 0) {
            $("#price_sale_comm_con").find("span.value").html("¥"+shareCommission.toFixed(2));
            $("#shop_comm_fuli_morebtn").show();
        }
    } else {
        $("#prod-explain").find("li .shopExName").each(function(){
            if($(this).attr("name") == 2){//满300包邮，如果是店铺要改为满199
                //$(this).attr("name", shopExId);
                $(this).html(shopExName);
            }
        });
        var min = minCommission* respBody.m1Rate * 0.01;
        var max = maxCommission* respBody.m1Rate * 0.01;
        if(min && max && min == 0 && max == 0){
            $("#sh").hide();
            $("#popSkuCommission").hide();
        }
        if (min != 0 || max != 0) {
            if (minCommission == maxCommission) {
                $("#price_sale_comm_con").find("span.value").html("¥"+min.toFixed(2));
                $("#price_sale_comm_con1").find("span.value").html("¥"+min.toFixed(2));
                commissionSection = "¥" + min.toFixed(2);
            } else {
                $("#price_sale_comm_con span.value").html("¥" + min.toFixed(2) + "-" + max.toFixed(2));
                $("#price_sale_comm_con1 span.value").html("¥" + min.toFixed(2) + "-" + max.toFixed(2));
                commissionSection = "¥" + min.toFixed(2) + "-" + max.toFixed(2);
            }
            $("#price_sale_comm_con").show();
            $("#price_sale_comm_con1").show();
            showCommission = 1;
            if (min == 0 && max == 0) {
                showCommission = 0;
            }
        }
    }
}
function getPackageInfo(bossProdId) {
    var reqBodyShopId =  common.getReqBodyShopId();
    var params ={};
    var reqBody={};
    var url = '/app/combo/package/list';
    reqBody.bossProdId = prodId;
    reqBody.shopId = reqBodyShopId;
    params.reqBody = reqBody;
    common.ajax('POST',url,params,function (respBody) {
        if(respBody.comboPackageList.length > 0){
            $('#packageProds-title').show();
            renderPackage(respBody.comboPackageList)
        }else{
            $('#packageProds-title').hide();
        }
    })
}
function renderPackage(list) {
    var html = '';
    if(list.length===1){
        html = '<div id="onePackage">' +
            '                <div class="packageItem">' +
            '                    <a href="'+'/package/package-detail.html?comboId='+list[0].comboId+'">' +
            '                        <img class="img_3 swiper-lazy" src="'+ConstUtil.get("PIC_DOMAIN")+list[0].comboAlbum+'"/>' +
            '                        <div>' +
            '                            <h1 class="cor3e fs14">'+list[0].comboName+'</h1>' +
            '                            <div class="packagePrice">' +
            '                                <span>'+'¥'+list[0].salePrice+'</span>' +
            '                                <span>'+'¥'+list[0].referPrice+'</span>' +
            '                            </div>' +
            '                            <p>'+'组合购买立省¥'+list[0].savePrice+'</p>' +
            '                        </div>' +
            '                    </a>' +
            '                </div>' +
            '            </div>'
    }else {
        html = '<div class="swiper-container swiper-container-h pb25 recommend" id="packageList">' +
            '                <div class="swiper-wrapper">';
        for(var i in list){
            var item = list[i];
            html += '<div class="swiper-slide" style="width: 80%">' +
                '                        <div class="swiper-item">' +
                '                           <a href="'+'/package/package-detail.html?comboId='+item.comboId+'">' +
                '                               <img class="img_3 swiper-lazy" src="../images/banner-default.jpg" data-src="'+ConstUtil.get("PIC_DOMAIN")+item.comboAlbum+'"/>' +
                '                               <div>' +
                '                                   <h1 class="cor3e fs14">'+item.comboName+'</h1>' +
                '                                   <div class="packagePrice">' +
                '                                       <span>'+'¥'+item.salePrice+'</span>' +
                '                                       <span>'+'¥'+item.referPrice+'</span>' +
                '                                   </div>' +
                '                                   <p>'+'组合购买立省¥'+item.savePrice+'</p>' +
                '                               </div>' +
                '                           </a>' +
                '                        </div>' +
                '                    </div>'
        }
        html += '                        </div>' +
            '                    </div>';
    }
    $('#packageProds-title').after(html)
    var recommend = new Swiper('#packageList', {
        direction: 'horizontal',
        slidesPerView : 'auto',
        lazyLoading:true,
        lazyLoadingOnTransitionStart : true,
        watchSlidesVisibility:true
    });
}

/*渠道推广定制需求*/
var userSrcAct = {
    shareMap:{
        '11':126,//新候机宝
        '12':120,//猎聘网活动
        '13':122,// 爱豆活动
        '16':34// 任务宝
    },
    orderSrcMap:{
        '11':19,
        '12':17,
        '13':18,
        '16':22
    },
    getOrderSrc:function(userSrc){
        return this.orderSrcMap[userSrc];
    },
    isSrcAct:function(){
        var userSrc = common.getQueryStr("userSrc");
        if (!this.orderSrcMap[userSrc]) {
            return false;
        }
        return userSrc;
    },
    init: function (isPushNewProd) {
        //是否渠道到推广
        var userSrc = this.isSrcAct();
        if (!userSrc) {
            return;
        }
        common.setSessionStorage("userSrc", userSrc);

        if(isPushNewProd){
            this.shareActionEvent(userSrc);
            this.shareBtnEvent();
            this.render(userSrc);
        }
    },
    shareActionEvent:function(userSrc){
        //微信分享
        if(common.isWeixin()){
            addPromotion(this.shareMap[userSrc],prodId);
        }
        $(share.shareC+share.shareG).appendTo("#shareContent");
    },
    shareBtnEvent:function(){
        $("#share").unbind('click').click(function(){
            share.shareClick();
        });
    },
    render: function (userSrc) {
        ordersrc = this.orderSrcMap[userSrc];// 订单来源
        pNum = 1; // 限购1件
        $("#coupon,#prodBrandTitle,#prodBrandList,#recommend-title,#recommend,#onSaleStatus,#popSkuCommission,#price_sale_comm_con1,#nShoper,#activity,#packageProds-title,#onePackage").remove();
        $("#nav-bot,#btnPopSku").addClass("onlyInstBuyBtn");
    },
    getUserActInfo:function(){
        var _this = this;
        common.showLoading();
        var userSrc = _this.isSrcAct();
        if(userSrc == '12' || userSrc == '16'){
            var reqBody = {
                src: userSrc,
                bossProdId: prodId
            };
            common.ajax("GET", "/app/busi/activity/liepin/whetherfirstsubs", {reqBody : JSON.stringify(reqBody)}, function (respBody) {
                common.hideLoading();
                if(respBody){
                    if(respBody.isFirstSub !== true){
                        common.toast('非首单用户，不享受此优惠');
                    }else{
                        var url = _this.getOrderConfrimUrl(minSkuId, gProdCache.getBuyNum(minSkuId));
                        gotoPageUrl(url);
                    }
                }
            },function(){
                common.hideLoading();
            });
        }else{
            common.ajax("GET", "/app/busi/activity/shopsum", "", function (respBody) {
                common.hideLoading();
                if(respBody){

                    if(respBody.userSrc != userSrc){
                        common.toast('您不是新用户，不享受此优惠');
                    }else if(respBody.isFirstSub !== 0){
                        hidPopFunc();
                        showModalDialog && showModalDialog('您已有订单记录，非首单用户不可以享受此优惠，可前往我的订单查看',function(){
                            window.location.href = '/busi/my-order.html';
                        },this,'','我的订单');
                    }else{
                        var url = _this.getOrderConfrimUrl(minSkuId, gProdCache.getBuyNum(minSkuId));
                        gotoPageUrl(url);
                    }
                }
            },function(){
                common.hideLoading();
            });
        }
    },
    getOrderConfrimUrl: function (bossSkuId, buyNum) {
        if (!buyNum || isNaN(buyNum)) {
            return;
        }
        var param = new Object();
        param.skuId = bossSkuId;
        param.sum = buyNum;
        param.type = 2;
        param.limitAmt = limitAmt;
        param.src = ordersrc;

        var reqBodyShopId = common.getReqBodyShopId();
        if (reqBodyShopId != '') {
            param.shopId = reqBodyShopId;
        }
        var paramEnc = encodeURIComponent(JSON.stringify(param));
        var url = "/busi/order-confirm.html?data=" + paramEnc;
        return url;
    },
    register:function(){
        common.setSessionStorage("hisUrl",location.href);
        // 注册成功后，跳转地址
        common.setSessionStorage("registerBackUrl",this.getOrderConfrimUrl(minSkuId, gProdCache.getBuyNum(minSkuId)));
        if( common.isWeixin()){
            gotoPageUrl("/user/register-bindings.html");
        }else{
            gotoPageUrl("/user/register.html");
        }
    },
};

/*第三渠道推广需求 拉新活动*/
var thirdChannel = {
    activityInfo: null,
    ts: 0,
    thirdChannelActivityId: null, //活动ID
    attractiveActivityProdId: null, //活动商品ID
    bossProdId: null,
    detailType: 0,
    init: function (detailType, data) {
        //是否渠道到推广
        var thirdChannelActivityId = this.isSrcId();
        if (!thirdChannelActivityId) {
            return;
        }
        common.setSessionStorage("userSrc", 20);
        thirdChannel.detailType = detailType;
        if(detailType == 1){
            this.activityInfo = data.activityInfo;
            this.attractiveActivityProdId = data.skuInfoList[0].attractiveActivityProdId;
            this.bossProdId = data.skuInfoList[0].bossProdId;
            this.attrInfoList = data.attrInfoList;
            this.shareActionEvent();
            this.shareBtnEvent();
            this.render();
            this.initEvent();
            addPromotion(36, this.thirdChannelActivityId + '-' + this.attractiveActivityProdId + '-' + this.bossProdId);
        }
    },
    initEvent: function(){
        var _this = this;
        $('#thirdChannelActStatus .go').click(function(){
            if(!$(this).hasClass('gray-status')){
                gotoPageUrl('/index.html')
            }
        });
        $('#appDownClose').click(function(){
            common.setSessionStorageByExpires(_this.thirdChannelActivityId + 'AppDown', 1, new Date().getTime() + 3600*24);
            $('#appDown').hide();
            $('#prod-details-header').removeClass('top50');
            $('#sectionWrapper').removeClass('top50');
            $('#assessWrapper').removeClass('top98');
        });
    },
    isSrcId: function () {
        var thirdChannelActivityId = common.getQueryStr('thirdChannelActivityId');
        if(!thirdChannelActivityId){
            return false;
        }
        this.thirdChannelActivityId = thirdChannelActivityId;
        return thirdChannelActivityId;
    },
    shareActionEvent:function(){
        //微信分享
        if(common.isWeixin()){
            // addPromotion(this.shareMap[userSrc],prodId);
        }
        $(share.shareC+share.shareG).appendTo("#shareContent");
    },
    shareBtnEvent:function(){
        $("#share").unbind('click').click(function(){
            share.shareClick();
        });
    },
    render: function () {
        // ordersrc = this.orderSrcMap[userSrc];// 订单来源
        pNum = this.activityInfo.limitNum; // 限购件数件，如果是0不限购
        $("#coupon,#prodBrandTitle,#prodBrandList,#recommend-title,#recommend,#onSaleStatus,#popSkuCommission,#price_sale_comm_con1,#nShoper,#iShoper,#activity,#packageProds-title,#onePackage").remove();
        $("#nav-bot,#btnPopSku").addClass("onlyInstBuyBtn");
        this.renderNotifyInfoStatus();
        this.renderAppSuspensionInfo(this.activityInfo.suspensionInfo);
        this.renderProdName();
        this.renderFreightPrice();
        this.renderLimitedBuyTips();
        renderProdSkuPannel(this.attrInfoList);
        $("#btnCartMore, #btnCartLess").unbind('click');
        initialSkuPannel(skuType);
    },
    renderAppSuspensionInfo: function(suspensionInfo) {
        var closeAppDown = common.getSessionStorage(this.thirdChannelActivityId + 'AppDown');
        if(closeAppDown == 1){
            return;
        }
        suspensionInfo && suspensionInfo.map(function(item){
            if(item.type == 1){
                var _html = '<div class="app-down" id="appDown">\n' +
                    '    <img src="'+ConstUtil.get('PIC_DOMAIN') + item.picUrl+'" id="appDownImg"/>\n' +
                    '    <i class="icon-close" id="appDownClose"></i>\n' +
                    '    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ibalife.ibaboss" class="btn-down" id="btnAppDown">立即下载</a>\n' +
                    '</div>'
                $('body').prepend(_html);
                $('#appDown').show();
                $('#prod-details-header').addClass('top50');
                $('#sectionWrapper').addClass('top50');
                $('#assessWrapper').addClass('top98');
            }
        });
    },
    renderNotifyInfoStatus: function () {
        var notifyInfoStatus = this.activityInfo.notifyInfoStatus;
        var limitNum = this.activityInfo.limitNum;
        var _this = this;
        var tipsHtml = '', goHtml = '';
        if(notifyInfoStatus == 0){
            $('#popSkuBtn').show();
            $('#thirdChannelActStatus').hide();
            return;
        }
        if(notifyInfoStatus == 1){
            _this.renderNoBeginStatus(); /*未开始*/
            return;
        }
        if(notifyInfoStatus == 9){
            _this.renderLootAllStatus(); /*抢光啦*/
            return;
        }
        switch (notifyInfoStatus) {
            case 2:
                tipsHtml = '非新用户，不能参与此活动';
                goHtml = '更多惊喜活动，上洋老板商城';
                break;
            case 3:
                tipsHtml = '非活动注册用户，不能参与此活动';
                goHtml = '更多惊喜活动，上洋老板商城';
                break;
            case 4:
                tipsHtml = '同一用户不可重复享受优惠';
                goHtml = '更多惊喜活动，上洋老板商城';
                break;
            case 5:
                tipsHtml = '已购买过此商品，不可重复';
                goHtml = '更多惊喜活动，上洋老板商城';
                break;
            case 6:
                tipsHtml = '已选购其他商品';
                break;
            case 7:
                tipsHtml = '限购'+limitNum+'件，已购'+limitNum+'件';
                break;
            case 8:
                tipsHtml = '不符合活动规则';
                goHtml = '更多惊喜活动，上洋老板商城';
                break;
            case 10:
                tipsHtml = '活动已结束';
                goHtml = _this.getWeixinSuspensionInfoHtml();
                break;
        }
        $('#nav-bot').hide();
        $('#popSkuBtn').hide();
        if(goHtml != ''){
            $('#thirdChannelActStatus').show().find('.go').html(goHtml).show().end().find('.tips').html(tipsHtml).show();
        }else{
            $('#thirdChannelActStatus').show().find('.tips').html(tipsHtml).show();
        }

    },
    renderNoBeginStatus: function(){
        var restTime = this.activityInfo.restTime;
        $('#nav-bot').hide();
        $('#popSkuBtn').hide();
        $('#thirdChannelActStatus').show().find('.tips').hide();
        if(restTime > 300){
            $('#thirdChannelActStatus .go').addClass('gray-status').html('活动未开始').show();
        }else{
            this.ts = restTime;
            this.timer();
        }
    },
    renderLootAllStatus: function(){
        $('#nav-bot').hide();
        $('#popSkuBtn').hide();
        $('#saleOff').hide();
        $('#thirdChannelActStatus').show().find('.go').addClass('gray-status').html('抢光啦').show().end().find('.tips').hide();
    },
    renderProdName: function(){
        var prodTitle = this.activityInfo.prodTitle;
        var prodSubtitle = this.activityInfo.prodSubtitle;
        $('#prodName').html(prodTitle);
        $('#brief').html(prodSubtitle);
    },
    renderFreightPrice: function(){
        var freightPrice = this.activityInfo.freightPrice;
        if(freightPrice == 0){
            $("#prod-explain .shopExName[name=1]").html("商品包邮");
            $("#prod-explain .shopExName[name=2]").html("商品包邮");
        }else{
            $("#prod-explain .shopExName[name=1]").html("运费"+freightPrice+"元");
            $("#prod-explain .shopExName[name=2]").html("运费"+freightPrice+"元");
        }
    },
    renderLimitedBuyTips: function(){
        var _limitedNum = this.activityInfo.limitNum;
        if(_limitedNum !== 0){
            var userParticipateSum = this.activityInfo.userParticipateSum;
            var _buyNumTips = userParticipateSum !== 0 ? '(已购' + userParticipateSum + '件)' : '';
            var _limitedTips = '限购' + _limitedNum + '件' + _buyNumTips;
            $('#btnCartLimitedTip').html(_limitedTips).addClass('btnCartLimitedTip').show();//限购提示
        }
    },
    getWeixinSuspensionInfoHtml: function(){
        var suspensionInfo = this.activityInfo.suspensionInfo;
        if(suspensionInfo){
            var _html = suspensionInfo.map(function(item){
                if(item.type == 2){
                    var _html = '<img src="'+ConstUtil.get('PIC_DOMAIN') + item.picUrl+'" width="100%"/>'
                    return _html;
                }
            }).join('');
            return _html;
        }
        return '';
    },
    goOrderConfrim: function(){
        var selSkuId = gProdCache.getSkuIdByDesc(true, true);
        var buyNum = gProdCache.getBuyNum(selSkuId);
        if (!buyNum || isNaN(buyNum)) {
            return;
        }
        var param = new Object();
        param.skuId = selSkuId;
        param.bossProdId = this.bossProdId;
        param.sum = buyNum;
        param.type = 2;
        param.limitAmt = limitAmt;
        param.src = 20;
        param.actProdId = thirdChannel.attractiveActivityProdId;

        var reqBodyShopId = common.getReqBodyShopId();
        if (reqBodyShopId != '') {
            param.shopId = reqBodyShopId;
        }
        var paramEnc = encodeURIComponent(JSON.stringify(param));
        var url = "/busi/order-confirm.html?data=" + paramEnc;
        gotoPageUrl(url);
        // return url;
    },
    loginRegister: function(){
        $.showLoginPopup({
            type:'centerPopup',
            data:{
                thirdPartyChannel: thirdChannel.activityInfo.channelId,
            },
            success: function(){
                var reqBody = {};
                if (thirdChannel.skuId) {
                    reqBody.skuId = parseInt(thirdChannel.skuId);
                } else {
                    reqBody.prodId = parseInt(thirdChannel.prodId);
                }
                reqBody.thirdChannelActivityId = thirdChannel.thirdChannelActivityId;
                common.ajax('GET', '/app/attractive/activity/prod/detail/h5/status', {'reqBody': JSON.stringify(reqBody)}, function (respBody) {
                    if(respBody.notifyInfoStatus == 0){
                        thirdChannel.goOrderConfrim();
                    }else{
                        window.location.reload();
                    }
                },function (respHeader) {
                    if (respHeader.resultCode !== 0) {
                        common.toast(respHeader.message);
                    }
                });
            }
        });
    },
    timer: function () {
        var _this = this;
        if( _this.ts == 0 ){
            window.location.reload();
        }else{
            setTimeout(_this.nowTime(_this.ts),1e3);
            var mm = parseInt(_this.ts / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(_this.ts % 60, 10);//计算剩余的秒数
            mm = _this.checkTime(mm);
            ss = _this.checkTime(ss);
            var TheTime = '<span class="tac">' + mm + '</span><span class="mh">:</span><span class="tac">' + ss + '</span>';
            if(_this.ts < 0){
                return false;
            }else{
                setTimeout(function(){
                    $('#thirdChannelActStatus .go').addClass('gray-status').html('活动即将开始&nbsp; ' + TheTime).show();
                    _this.timer();
                },1e3);
            }
            return TheTime;
        }
    },
    nowTime: function () {
        this.ts = this.ts - 1;
        return this.ts;
    },
    checkTime : function (a) {
        if (a < 10) {
            a = "0" + a;
        }
        return a;
    },
}

function renderProdSkuPannel(attrInfoList){
    if(!attrInfoList || attrInfoList.length==0){
        return;
    }
    $("#skuDisplayCon").empty();
    var _html = "";
    for (var i = 0; i<attrInfoList.length; i++) {
        var item = attrInfoList[i];
        _html += ' <ul class="clearfix " name="' + item.attrName + '">';
        _html += '<div class="fs14">' + item.attrName + '</div>';
        for (var a = 0, len2 = item.valueInfoList.length; a < len2; a++) {
            var valueInfo = item.valueInfoList[a];
            _html += '<li class="fl fs12" valId="'+valueInfo.valId+'" name="'+i+'">'+valueInfo.valName+'</li>';
            $("#skuDisplayCon").append("<span class='fl spetion'>"+ valueInfo.valName +"</span>");
        }
        _html += ' </ul>';
    }
    $("#bossProdSkuPannel").html(_html);
}

function handleOpenShop(){
    var trackId = common.getSessionStorage("trackId");
    if(trackId){
        if (bmclevel && bmclevel > 0) {
            window.location.href = '/up-bulletin/land.html';
        }else{
            window.location.href = '/user/shop-introduce.html';
        }
    }else{
        window.location.href = '/user/shop-introduce.html';
    }

}

function upBulletinBtnEvent(){
    $("#upBulletinBtn").click(function(){
        handleOpenShop();
    });
}

function pageSetGIO() {
    typeof gio == 'function' && gio('page.set', pageSetGIOOptions);
}
