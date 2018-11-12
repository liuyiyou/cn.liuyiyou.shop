var countryId = "";
var TAX_FREE_CHANNEL = 5;
var CANNOT_PAY_BTN_CLASS = "nav-bo-sb";
var CAN_PAY_BTN_CLASS = "nav-bo-su";
var gtype = "";
var prodEleId = "";
var gsrc = {};
var time = 3;
var gpcm = "";
var cacheBuyProd = [];
var cacheTotalPrice = 0; //缓存总金额
ConfirmPage = {
		type : 1,//来自 1是购物车，2是商品详细页
		interval : 5,
		intervalId : 0,
		userDeli:{},
		skuId : [], //保存选中的skuId
		isValid : true,
		isPayValid:true,
		limitAmt:0,
		needIdNo:null,
		wealCashRate:0,
		wealCash:0,
		useDeduct:false,
		deductMax:0,
		deductRate:0,
		prods:[],
		sum:{},
		comboId: null,
		wrapPostParam : function(reqBody){
			var param = {};
			param.reqBody = reqBody;
			param = JSON.stringify(param);
			return param;
		},
		wrapGetParam : function(reqBody, reqHeader){
			var param = {};
			if(reqHeader){
				param.reqHeader = JSON.stringify(reqHeader);
			}
			if(reqBody){
				param.reqBody = JSON.stringify(reqBody);
			}
			return param;
		},
		getProdAblum : function(ablum){
			if(ablum && ablum.indexOf('/images') == 0){
				return ablum;
			}else{
                return ablum?(ConstUtil.get("PIC_DOMAIN")+ablum):"";
			}

		},
    	getProdUrl : function (prod) {
			if(!prod.prodId){
				return 'javascript:;';
			}else {
				var url ='/prod/'+prod.prodId+'.html'+ getFromShopkeeperFlagStr();
                if (prod.type == 10){
                    url = url +'#offlineAct='+prod.actId;
                }
                return url;
            }
        },
		showLimit : function(limitAmt){
			window.clearInterval(ConfirmPage.intervalId);
			ConfirmPage.interval = 5;
			$("#limit-1000").html(ConfirmPage.interval);
			$(".weather-up,.the-light").show();
			$("#maxPriceLimit1, #maxPriceLimit2").html(limitAmt);
			var intId = self.setInterval("ConfirmPage.intervalWork(\"limit-1000\")",1000);
			ConfirmPage.intervalId = intId;
		},
		intervalWork : function(id){
			ConfirmPage.interval--;
			$("#"+id).html(ConfirmPage.interval);
			if(ConfirmPage.interval < 0){
				ConfirmPage.interval = 5;
				window.clearInterval(ConfirmPage.intervalId);
				$(".weather-up,.the-light").hide();
			}
		},
		toFix : function(input){
			var tmp = Number(input);
			return tmp.toFixed(2);
		},
		changProdSum : function(skuId, sum){
			var prodEleId = "#skuId-"+skuId;
			$(prodEleId+" .btn-rem2").html(sum);
			$(prodEleId+" .btn-rem2").attr("data-sum",sum);
			var unitPrice = $(prodEleId+"").attr("data-unitprice");
			var taxRate = $(prodEleId+"").attr("data-tax-rate");
			var minAmount = $(prodEleId+"").attr("data-min-amount");
			var total = unitPrice*sum;
			var tax = total*taxRate;
			$("#prod-tax-"+skuId).html("税费¥"+ConfirmPage.toFix(tax));
			ConfirmPage.calculateTotalPrice();
		},
		//检查购物车 每个部分的总额大于1000
		checkTotalPrice : function(sum, showAlert) {
			ConfirmPage.isValid = true;
			if(!ConfirmPage.limitAmt) {
				return true;
			}
			var total = ConfirmPage.calculateTotalPrice(sum);
			if(ConfirmPage.limitAmt > 0 && total > ConfirmPage.limitAmt){
				if(sum&&sum>1){
					ConfirmPage.isValid = false;
					if (showAlert) {
						ConfirmPage.showLimit(ConfirmPage.limitAmt);
					}
					return false;
				}
				//只有一件的时候
				var isSingle1000 = (ConfirmPage.skuId.length == 1 && ConfirmPage.limitAmt > 0 && total > ConfirmPage.limitAmt && ConfirmPage.getSumBySkuId(ConfirmPage.skuId[0]) == 1);
				if(!isSingle1000){
					ConfirmPage.isValid = false;
					if (showAlert) {
						ConfirmPage.showLimit(ConfirmPage.limitAmt);
					}
					return false;
				}
			}
			return true;
		},
		getSumBySkuId:function(skuId){
			var prodEleId = "#skuId-"+skuId;
			var unitPrice = $(prodEleId+"").attr("data-unitprice");
			var sum = $(prodEleId+" .btn-rem2").attr("data-sum");
			if(ConfirmPage.type == 1){
				sum = $(prodEleId+"").attr("data-sum");
			}
			return sum;
		},
		//计算该订单的总价格@deprecated
		calculateTotalPrice : function(val){
			var payTotal = 0;
			var taxTotal = 0;
			var total = 0;
			var array = [];
			var fright = 0;
			var minAmount = 0;
			//税费
			for(var k = 0; k<ConfirmPage.skuId.length;k++){
				var skuId = ConfirmPage.skuId[k];
				var prodEleId = "#skuId-"+skuId;
				var unitPrice = $(prodEleId+"").attr("data-unitprice");
				var sum = $(prodEleId+" .btn-rem2").attr("data-sum");
                var taxRate = $(prodEleId+"").attr("data-tax-rate");
				if(val){
					sum = val;
				}
				if(ConfirmPage.type == 1 || src == 4 ){
					sum = $(prodEleId+"").attr("data-sum");
				}
				if(sum > $(prodEleId+"").attr("data-sum")){
					var prodTotal = unitPrice*$(prodEleId+"").attr("data-sum");
				}else{
					var prodTotal = unitPrice*sum;
				}
				var prod = ConfirmPage.prods[skuId];
				if( prod.actId ){
					var sumTotal = array[prod.actId];
					if( sumTotal ){
						sumTotal += prodTotal;
					}else{
						sumTotal = prodTotal;
					}
					array[prod.actId] = sumTotal;
				}

				minAmount = $(prodEleId+"").attr("data-min-amount");

				var tax = unitPrice*sum*taxRate;
				$("#prod-tax-"+skuId).html("税费¥"+ConfirmPage.toFix(tax));
				taxTotal += tax;
			}

			if (ConfirmPage.sum.actualPrice <= 0) {
				$("#submit").addClass(CANNOT_PAY_BTN_CLASS).removeClass(CAN_PAY_BTN_CLASS);
			} else {
				$("#submit").addClass(CAN_PAY_BTN_CLASS).removeClass(CANNOT_PAY_BTN_CLASS);
			}

			checkSubmitShow();
			//满减活动
			if( ConfirmPage.sum.actDeductPrice > 0 ){
				$("#act-deduct").html("-¥"+ConfirmPage.sum.actDeductPrice.toFixed(2));
                $("#act-deduct").parent().css("display","block");
			}else{
				$("#act-deduct").parent().hide();
			}
			//首单免邮
			if( ConfirmPage.sum.firstDeduct > 0 ){
				$("#firstDeduct").html("-¥"+ConfirmPage.sum.firstDeduct.toFixed(2)).parent().show();
			}else{
				$("#firstDeduct").parent().hide();
			}
			//福利抵扣
			if( ConfirmPage.sum.deductPrice > 0 ){
				$("#deductPrice").html("-¥"+ConfirmPage.sum.deductPrice.toFixed(2)).parent().show();
			}else{
				$("#deductPrice").parent().hide();
			}
			//福利满减, 秒杀和福利0时候不能用 , #deduct-btn-div
			$("#deduct-weal, #cash-get-div, #deduct-btn-div").hide();
			ConfirmPage.useDeduct = false;
			if(ConfirmPage.sum.deductPrice > 0 && src != 3){
				$("#deduct-weal, #deduct-btn-div").show();
				ConfirmPage.useDeduct = true;
				if (ConfirmPage.useWeal) {
					$("#cash-get-div").hide();
				} else {
					$("#cash-get-div").show();
				}
			}
			var actualTotal = ConfirmPage.sum.actualPrice;
			if (ConfirmPage.useWeal && ConfirmPage.useDeduct) { //useWeal： 选择使用福利抵扣
				$('#deduct-weal').html("-¥"+ConfirmPage.toFix(ConfirmPage.sum.deductPrice));
			} else {
				$('#deduct-weal').html("-¥"+ConfirmPage.toFix(0));
				actualTotal = ConfirmPage.sum.actualPrice + ConfirmPage.sum.deductPrice;
			}
            cacheTotalPrice = actualTotal;
			$("#pay-total").html("¥" +  ConfirmPage.toFix(actualTotal));
            cacheTotalPrice = actualTotal;
			$("#wealCash").html("+&nbsp¥"+ConfirmPage.toFix(ConfirmPage.sum.deductPrice));
			return actualTotal;
		},
		delegateProdEvent : function(){
			//商品数量减少
			$(".btn-rem1").click(minusProdSum);
			//商品数量增加
			$(".btn-rem3").click(plusProdSum);
		}

};
var src = null;
var buynum = 0;
var isbuynow = false;
var buynowFreightPrice = 0;
var actId = null;
var shopActId = null;
var ifOverNum = false;
var terminalId = null;
var hasOfflineType = false;//是否有线下推广商品活动类型;
var isFromShopkeeperFlag= isFromShopkeeper();//是否店铺标识
var thirdChannelActivityProdId = null;
var idCardTag = null;


function back() {
    var obj = {
        closeFn: function () {
           window.history.back();
        },
        message: '确认放弃付款吗？',
        confirmBtnName:'继续付款',
        closeBtnName: '去意己决',
        params: null,
    };
    showConfirmDialog(obj);
}


function loadProdInf(){
	var data = common.getQueryStr("data");
	data = decodeURIComponent(data);
	data = JSON.parse(data);
	ConfirmPage.type = data.type;
	if( data.limitAmt ){
		ConfirmPage.limitAmt = data.limitAmt;
	}
	var param = {};
	param.reqBody = data;
	src = data.src;
	terminalId = data.terminalId;
    thirdChannelActivityProdId = data.actProdId;
    if(thirdChannelActivityProdId){
        $('#couponTotal').remove();
    }
	common.showLoading();
	$.ajax({
		url:"/app/busi/activity/presub",
		type:"POST",
		dataType:"json",
		data:JSON.stringify(param),
		contentType: "application/json",
		success:function(data){
			if (data.respHeader.resultCode !=0){
                alertDialog(data.respHeader.message,function(){
                    commonGoBack();
                });
                common.hideLoading();
				return;
			}

			if(data && data.respBody){
                initCoupon(data.respBody);//初始化优惠券
				var orderList = [];
				var cart = data.respBody.array;
				var sum = data.respBody.sum;
                idCardTag = data.respBody.idCardTag;
				$("#prod-total").html("¥"+ConfirmPage.toFix(sum.totalPrice));
				$("#freigtht-total").html("¥"+ConfirmPage.toFix(sum.freightPrice));
				$("#tax-total").html("¥"+ConfirmPage.toFix(sum.taxPrice));
				var paytotal =  sum.actualPrice; //totalPrice + sum.freightPrice + sum.taxPrice - sum.;
				$('#deduct-weal').html("-¥"+ConfirmPage.toFix(sum.deductPrice));
				ConfirmPage.sum = sum;  //汇总信息
                cacheTotalPrice = paytotal;
				$("#pay-total").html("¥"+ConfirmPage.toFix(paytotal));
				if(src != 3){
					ConfirmPage.useWeal = true;
				}
				if(src == 20){
                    ConfirmPage.thirdPartyChannel = data.respBody.array[0].prods[0].thirdPartyChannel;
                    ConfirmPage.thirdChannelActivityId = data.respBody.array[0].prods[0].actId;
                }
				ConfirmPage.deductMax = data.respBody.deduction;
				ConfirmPage.deductRate = data.respBody.deductRate;
				ConfirmPage.needIdNo = 0;
			    gpcm = data.respBody.wealPcm;
				if(gpcm != undefined){
					setInterval("countDown()",1000);
					setTimeout(function(){$("#weal-pcm").hide()
						},4000);
				}
				for(var i= 0;i<cart.length;i++){
					countryId = cart[i].countryId;
					var prods = cart[i].prods;
					if (cart[i].channelId != TAX_FREE_CHANNEL) {
						ConfirmPage.needIdNo = 1;
					}
					for(var j=0;j<prods.length;j++){
						if(prods[j].shopId){
                            prods[j].shopPreview = Base64.encode(JSON.stringify(prods[j].shopId));
						}
						orderList.push(prods[j]);
						ConfirmPage.skuId.push(prods[j].skuId);
						ConfirmPage.prods[prods[j].skuId] = prods[j];
						if(prods[j].sum > prods[j].prodTotal){
							var prodEleId = "#skuId-"+prods[j].skuId;
							$(prodEleId+" .btn-rem0").html("库存不足");
							$(prodEleId+" .btn-rem0").show();
						}
					}
					//查找是否有限時購商品
					if(gtype != 4 ){
						for(var j=0;j<prods.length;j++){
							gtype = prods[j].type;
							if(gtype == 4){
								break;
							}
						}
					}
					for(var index=0;index<prods.length;index++){
						gsrc[prods[index].skuId] = prods[index].type;

					}
					ConfirmPage.wealCashRate = cart[i].wealCashRate;
				}
				template.helper("getProdAblum",ConfirmPage.getProdAblum);
				template.helper("getProdUrl",ConfirmPage.getProdUrl);
				template.helper("toFix",ConfirmPage.toFix);
				var obj = {};
				obj.prodList = orderList;

				var buynowProd = orderList[0];
				if (buynowProd && buynowProd.isbuynow == true){
					isbuynow = true;
					buynum = buynowProd.buynum;
					buynowFreightPrice = buynowProd.freightPrice;
				}

				//来自购物车1与详情页2的模版不一样
				var templName = "cart-prod";
				if(ConfirmPage.type == 2 && src != 4 ){
					templName = "detail-prod";
				}
				for(var i=0;i<obj.prodList.length;i++){
                    if(obj.prodList[i].type==10){
                        hasOfflineType =true;
                        $("#couponTotal,#show-transFee-button").hide();
                        break;
                    }
				}
                template.helper("getFromShopkeeperFlagStr", getFromShopkeeperFlagStr);//店铺标识
				var prodHtml = template(templName, obj);
				$(".prod-list").html(prodHtml);

				ConfirmPage.calculateTotalPrice();
				ConfirmPage.delegateProdEvent();

				var freightList = sum.freightList;
				var freightHtml = "";
				if (freightList && freightList.length > 0){
					for (var i in freightList){
						var freight = freightList[i];
						if (!freight || null == freight || freight == ""){
							continue;
						}
						var repofreightPrice = freight.freightPrice;
						var repoList = freight.repo;
                        var filterCountryName=[];
						if (!repoList || null == repoList || "" == repoList){
							continue;
						}
						if (repoList.length > 1){
							freightHtml +='<div class="carriage-con1 carriage-con2">';
							for (var j in repoList){
								var repo = repoList[j];
								if (!repo || null == repo || repo == ""){
									continue;
								}
                                if($.inArray(repo.countryName,filterCountryName)!=-1){
                                    continue;
                                }
                                filterCountryName.push(repo.countryName);
                                freightHtml += '<p class="fs14 cor3e">' + repoList[j].mixedWarehouse + '</p>';
							}
							freightHtml += '<span class="fr fs13 corf3">共：¥'+ConfirmPage.toFix(freight.freightPrice)+'</span></div>';
						}else{
							var repo = repoList[0];
                            freightHtml += '<div class="carriage-con1 clearfix"><span class="fl fs14 cor3e">' + repo.mixedWarehouse + '</span><span class="fr fs13 corf3">¥' + ConfirmPage.toFix(freight.freightPrice) + '</span></div>';
						}

					}
					$("#freigh-detail-div").html(freightHtml);
				}

                if(data.respBody.useCouponId){
                    var obj = $("#coupon"+data.respBody.useCouponId).find('.selectBtn')[0];
                    selectCoupon(obj,data.respBody.useCouponId)
                }
			}
			common.hideLoading();
		},
		error:function(){
            common.hideLoading();
		}
	});
}
function countDown(){
	if(time > 0){
		$("#pcm-value").html(gpcm + " " + time +"s");
		$("#weal-pcm").show();
		time--;
	}else if(time == 0 || time < 0){

	}
}
var payType = -1;
function init(){
	//店铺隐藏使用券
	if(isFromShopkeeperFlag){
		$("#couponTotal").remove();
	}

	if(common.isWeixin()){
		$("#wxpay").hide();
		$("#zfbpay").show();
		$("#unionpay").show();
		$("#pay2").addClass("check");
		payType = 2;
	}else{
		$("#wxpay").show();
		$("#zfbpay").hide();
		$("#unionpay").hide();
		$("#pay1").addClass("check");
		payType = 4;

	}

	$("#wxpay").click(function(){
		$("#pay2").removeClass("check");
		$("#pay3").removeClass("check");
		if ($("#pay1").hasClass("check")){
			$("#pay1").removeClass("check");
			payType = -1;
			ConfirmPage.isPayValid = false;
		}else{
			$("#pay1").addClass("check");
			payType = 4;
			ConfirmPage.isPayValid = true;
		}
		checkSubmitShow();
	});

	$("#zfbpay").click(function(){
		$("#pay1").removeClass("check");
		$("#pay3").removeClass("check");
		if ($("#pay2").hasClass("check")){
			$("#pay2").removeClass("check");
			payType = -1;
			ConfirmPage.isPayValid = false;
		}else{
			$("#pay2").addClass("check");
			payType = 2;
			ConfirmPage.isPayValid = true;
		}

		checkSubmitShow();
	});

	$("#unionpay").click(function(){
		$("#pay1").removeClass("check");
		$("#pay2").removeClass("check");
		if ($("#pay3").hasClass("check")){
			$("#pay3").removeClass("check");
			payType = -1;
			ConfirmPage.isPayValid = false;
		}else{
			$("#pay3").addClass("check");
			payType = 5;
			ConfirmPage.isPayValid = true;
		}
		checkSubmitShow();
	});

    selectCouponEvent();

	loadProdInf();
	var data = common.getQueryStr("data");
	data = decodeURIComponent(data);
	data = JSON.parse(data);
    if(data.comboId){
        ConfirmPage.comboId = data.comboId;
    }
	src = data.src;
    // 渠道推广活动
    userSrcActInit(src);
	actId = data.actId;
	shopActId = data.shopActId;
	var url = "/app/user/defaddr";
	if(data.selectAddr){
		loadSelectAddr(data.selectAddr)
	}else{
		loadDefAddr()
	}
	//跳到收货地址列表
	$(".data-select-addr").click(selectAddr);
	$("#no-address").click(addAddr);
	//结算
	$("#submit").click(submit);

	$("#show-transFee-button").click(function(){
		$("#show-transFee-div,.the-light").show();
		$("body").addClass("body-overflow");
	});
	$(".I-know").click(function(){
		$("#show-transFee-div,.the-light").hide();
		$("body").removeClass("body-overflow");
	});
    $(window).scroll(function(){
        inintAddressBottom();
    });

}
function inintAddressBottom() {
    var clientRect = $('.address ')[0].getBoundingClientRect();
    if(clientRect && clientRect.bottom <= 0 ){
        if($('#no-address').hasClass('show')){
            $('.address-bottom').removeClass('show');
            $('.address-bottom').addClass('hide');
        }else {
            $('.address-bottom').removeClass('hide');
            $('.address-bottom').addClass('show');
        }
    }else{
        $('.address-bottom').removeClass('show');
        $('.address-bottom').addClass('hide');
    }
}
function loadSelectAddr(id){

	var body = {};
	body.id = id;
	var param = ConfirmPage.wrapPostParam(body);
	$.ajax({
		url:"/app/user/aptudeli",
		type:"POST",
		dataType:"json",
		data:param,
		contentType:"application/json",
		success:function(data){
			if(data && data.respBody){
				var userDeli = data.respBody.userDeli;
				if(userDeli){
					ConfirmPage.userDeli = userDeli;
					$("#user-name").html(userDeli.consignee);
					var tel = userDeli.consignTel.substr(0, 3) + '****' + userDeli.consignTel.substr(7);
					$("#user-phone").html(tel);
					var addr = JSON.parse(userDeli.consignAddr);
					$("#user-address").html(addr.prov + addr.city + addr.county + addr.addr);
					$("#user-address-bottom").html(addr.prov + addr.city + addr.county + addr.addr);
				}else{
					ConfirmPage.userDeli = {};
					$("#user-name").html("");
					$("#user-phone").html("");
					$("#user-address").html("");
                    $("#user-address-bottom").html("");
				}
			}
			checkSubmitShow();
		}
	});
}
function loadDefAddr(){
	$.ajax({
		url:"/app/user/defaddr",
		type:"GET",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(data && data.respBody){
				var userDeli = data.respBody.userDeli;
				if(userDeli){
					ConfirmPage.userDeli = userDeli;
					$("#user-name").html(userDeli.consignee);
					var tel = userDeli.consignTel.substr(0, 3) + '****' + userDeli.consignTel.substr(7);
					$("#user-phone").html(tel);
					var addr = JSON.parse(userDeli.consignAddr);
					$("#user-address").html(addr.prov + addr.city + addr.county + addr.addr);
					$("#user-address-bottom").html(addr.prov + addr.city + addr.county + addr.addr);
				}
			}
			checkSubmitShow();
		}
	});
}
function checkSubmitShow(){
	var isShow = true;
	if(!ConfirmPage.userDeli.consignAddr){
		$("#no-address").addClass('show');
		$("#address").removeClass('show');
//		isShow =  false;
	}else{
		$("#no-address").removeClass('show');
		$("#address").addClass('show');
	}
//	if(!$("#pay1").hasClass("check")){
//		isShow =  false;
//	}

	if (payType == -1){
		isShow = false;
	}

	if(ConfirmPage.skuId.length <1){
		isShow =  false;
	}
	if(isShow&&ConfirmPage.isValid && ConfirmPage.isPayValid){
		$("#submit").removeClass("nav-bo-sb");
		$("#submit").addClass("nav-bo-su");
	}else{
		$("#submit").removeClass("nav-bo-su");
		$("#submit").addClass("nav-bo-sb");
	}
}

//@deprecated
function plusProdSum(){
	var skuId = $(this).attr("data-prod");
	var prodEleId = "#skuId-"+skuId;
	var sum = $(prodEleId+" .btn-rem2").html();
	var total = $(prodEleId+"").attr("data-total");
	sum++;
	if (buynum > 0 && sum > buynum ){
		$(prodEleId+" .btn-rem0").html("数量超过限制");
		$(prodEleId+" .btn-rem0").removeClass("invisibility");
		return;
	}else{
		$(prodEleId+" .btn-rem0").html("库存不足");
		$(prodEleId+" .btn-rem0").removeClass("invisibility");
		return;
	}
	if (sum <= total) {
		//这里计算订单金额，如果超过库存数量不继续进行
		if(!ConfirmPage.checkTotalPrice(sum)){
			ConfirmPage.showLimit(ConfirmPage.limitAmt);
			ConfirmPage.checkTotalPrice(--sum);
			checkSubmitShow();
			return;
		}
	}

	if(sum>total){
		$(prodEleId+" .btn-rem0").removeClass("invisibility");
		return;
	}else{
		if(!$(prodEleId+" .btn-rem0").hasClass("invisibility")){
			$(prodEleId+" .btn-rem0").addClass("invisibility");
		}
	}
	ConfirmPage.changProdSum(skuId, sum);
	$(prodEleId+"").attr("data-chg-tag", "true");
	checkSubmitShow();
}

//@deprecated
function minusProdSum(){
	var skuId = $(this).attr("data-prod");
	var prodEleId = "#skuId-"+skuId;
	var sum = $(prodEleId+" .btn-rem2").html();
	sum--;
	if(sum<=0){
		return;
	}
	if(!$(prodEleId+" .btn-rem0").hasClass("invisibility")){
		$(prodEleId+" .btn-rem0").addClass("invisibility");
	}
	ConfirmPage.changProdSum(skuId, sum);
	if(!ConfirmPage.checkTotalPrice(sum)){
		ConfirmPage.showLimit(confirmPage.limitAmt);
	}
	$(prodEleId+"").attr("data-chg-tag", "true");
	checkSubmitShow();
}


function submit(){


	if ($("#submit").hasClass(CANNOT_PAY_BTN_CLASS)) { //判断如果含有不能支付的情况，返回
		return;
	}

	if (ifOverNum == true && gtype != 4){
		alert("秒杀商品超过购买数量");
		return;
	}

	if (ifOverNum == true && gtype == 4){
		alert("限时购商品超过购买数量");
		return;
	}

	if(!ConfirmPage.userDeli.consignAddr){
		alert("收货地址不能为空！");
		return false;
	}
    if (idCardTag) {
        if (!ConfirmPage.userDeli.isUpload){
            gotoUploadIdPage(0);
            return false;
        }
    }
	if( ConfirmPage.needIdNo && !ConfirmPage.userDeli.consignIdno ){
//		alert("身份证号码不正确，请核对修改身份证号码");
// 		$("#tip-id,.the-light").show();
// 		$("#tip-id-close").click(function(){
// 			gotoModifyPage();
// 		});
        gotoUploadIdPage(1);
		return false;
	}

	if( ConfirmPage.needIdNo || ConfirmPage.wealCash > 0 ){
//		if( !ConfirmPage.userDeli.consignIdno ){
//			alert("收货人身份证信息不能为空");
//			return false;
//		}
//		showModalDialog("请再次确认收货人"+ ConfirmPage.userDeli.consignee+"的身份证号码为"+ConfirmPage.userDeli.consignIdno,function(){
//			postSubmit();
//		});
		if( ConfirmPage.needIdNo ){
			$("#confirmConsignee").html("收货人："+ConfirmPage.userDeli.consignee);
			$("#confirmId").html("身份证："+ConfirmPage.userDeli.consignIdno);
			$("#confirmTips").show();
			$("#confirmConsignee").show();
			$("#confirmId").show();
		}else{
			$("#confirmTips").hide();
			$("#confirmConsignee").hide();
			$("#confirmId").hide();
		}

		if(ConfirmPage.wealCash > 0 ){
			$("#confirmWealCash").html("  +&nbsp￥"+parseFloat(ConfirmPage.wealCash).toFixed(2));
			$("#confirmWealCash").parent().show();
		}else{
			$("#confirmWealCash").parent().hide();
		}

		$("#to-bind-card, .the-light").hide();
		postSubmit();
	}else{
//		postSubmit();

		//先校验 ，校验成功后再提及
		var param = {};
		param.id = ConfirmPage.userDeli.id;
		param.consignIdno = ConfirmPage.userDeli.consignIdno;
		param.consignName =	ConfirmPage.userDeli.consignee;
		if(countryId != "CN"){ //国内发货不需要验证
			$.ajax({
				url : "/app/user/cuiif",
				type : "POST",
				contentType : "application/json",
				dataType : "json",
				data : JSON.stringify({"reqBody":param}),
				success : function(data){
					if(data&&data.respHeader&&data.respHeader.resultCode=="0"){
						var body = data.respBody;
						if(body.success == true){ //检验成功,添加或者更新
							postSubmit();
						}else{ //校验失败，显示失败信息
							if(body.result == "02"){
								$("#tip-id,.the-light").show();
								$("#tip-id-close").click(function(){
									// window.location.href="/busi/modify-address.html";
									gotoPageUrl("/busi/modify-address.html");
								});
							}else{
								if(body.left == 0){
									$("#tip-id3,.the-light").show();
								}else{
									$("#tip-id2,.the-light").show();
								}
							}
						}
					}else{
						data?alert(data.respBody.errInf):"";
					}
				}
			});
		}else{
			postSubmit();
		}
	}

}
function gotoUploadIdPage(tag) {
    var data = common.getQueryStr("data");
    if(data){
        data = decodeURIComponent(data);
        data = JSON.parse(data);
        if(tag ==0){
            data.idCardTag = true;
        }
        if(tag ==1){
            data.needIdNo = 1
        }
        data.formOrder = true;
    }else{
        data = {};
    }
    data.modifyAddr = ConfirmPage.userDeli.id;
    // window.location = "/busi/modify-address.html?data="+encodeURIComponent(JSON.stringify(data));
    gotoPageUrl("/busi/upload-id.html?aid="+ConfirmPage.userDeli.id+"&data="+encodeURIComponent(JSON.stringify(data)));
}
function postSubmit(){

	if (payType == -1){
		return false;
	}

	if(!ConfirmPage.checkTotalPrice(null, true) ){
		return false;
	}
	if(ConfirmPage.skuId.length <1){
		return false;
	}
	var data = {};
	var prods = [];
	var skuIdsIndex = {};
	for(var i = 0; i < ConfirmPage.skuId.length; i++){
		var obj = {};
		var skuId = ConfirmPage.skuId[i];
		if (!skuId){
			continue;
		}
		var obs =
		obj.skuId = skuId;
		var prodEleId = "#skuId-"+skuId;
		var skuIds = $(".skuId-"+skuId);
		if(skuIds.length > 1){
			if(skuIdsIndex[skuId] == null){
				obj.sum = $(skuIds[0]).attr("data-sum");
				skuIdsIndex[skuId] = 1;
				obj.type = $(skuIds[0]).attr("data-type");
			}else{
				obj.sum = $(skuIds[skuIdsIndex[skuId]]).attr("data-sum");
				obj.type = $(skuIds[skuIdsIndex[skuId]]).attr("data-type");
				skuIdsIndex[skuId] = skuIdsIndex[skuId]+1;
			}
		}else{
			obj.sum = $(prodEleId+" .btn-rem2").html();
			if(ConfirmPage.type == 1 || src == 4){
				obj.sum = $(prodEleId+"").attr("data-sum");
			}
			 obj.type = gsrc[skuId];
			//线下推广类型10  src为11 ,线下推广只能购买一件
			if(obj.type === 10){
				src=11;
			}
		}
        obj.shopId = ConfirmPage['prods'][skuId].shopId;
		prods.push(obj);
	}
//	var body = $.extend(true,{},ConfirmPage.userDeli);
//	body.consignCountry = ConfirmPage.userDeli.consignCounty;
//	body.consignPhone = Base64.encode(Utf8.encode(ConfirmPage.userDeli.consignTel));
//	var tmpDir = JSON.parse(ConfirmPage.userDeli.consignAddr);
//	body.consignAddr =  Base64.encode(Utf8.encode(tmpDir.addr));
//	body.consignee = Base64.encode(Utf8.encode(ConfirmPage.userDeli.consignee));
//	body.consignIdno = Base64.encode(body.consignIdno);
	var body = $.extend(true,{},ConfirmPage.userDeli);
	body.consignCountry = ConfirmPage.userDeli.consignCounty;
	body.consignPhone = ConfirmPage.userDeli.consignTel;
    body.deliveryId = ConfirmPage.userDeli.id
	var tmpDir = JSON.parse(ConfirmPage.userDeli.consignAddr);
	body.consignAddr = tmpDir.addr;

	var datax = common.getQueryStr("data");
	datax = decodeURIComponent(datax);
	datax = JSON.parse(datax);
	body.src = src;
	if(src == 20){
        body.mix = 20;
        body.actProdId = thirdChannelActivityProdId;
        body.actId = ConfirmPage.thirdChannelActivityId;
        body.thirdPartyChannel = ConfirmPage.thirdPartyChannel;
    }else{
        body.actId = actId;
    }
	if(ConfirmPage.conponId){
        body.couponId = ConfirmPage.conponId;
	}
	if(ConfirmPage.comboId){
        body.comboId = ConfirmPage.comboId;
	}
	body.shopActId = shopActId;
	body.prods = prods;

	body.packageId = datax.packageId;
	if(ConfirmPage.type == 1){
		body.fromCart = true;
	}else{
		body.fromCart = false;
	}
	if(ConfirmPage.useWeal){
		body.deduction = true;
	}else{
		body.deduction = false;
	}

	if(terminalId != null){
		body.terminalId = terminalId;
	}
	if(datax.timeId){
        body.timeId = datax.timeId;
    }
    //跟单追踪信息
    handleSubsTrackingInfo(body);


	var param = ConfirmPage.wrapPostParam(body);
	var myDate = new Date();
	common.showLoading();
	$.ajax({
		url:"/app/busi/activity/subs",
		type:"POST",
		dataType:"json",
		data:param,
		contentType:"application/json",
		success:function(data){
            common.hideLoading();
			var _errInf = data.respBody && data.respBody.errInf?data.respBody.errInf:data.respHeader.message;
			if(data&&data.respHeader&&data.respHeader.resultCode=="0"){
				//下单成功，什么推荐店铺id设为空
				common.setSessionStorage("shareShopId","");
				if(cacheTotalPrice===0){
					setTimeout(function(){
                        gotoPageUrl("/busi/my-order.html?status=2");
					},1000);

                }else{
                    gotoPageUrl("confirm-pay.html?subsId=" + data.respBody.subsId +"&payType=" + payType +"&timestamp=" + $.now(),'replace');
                }
			}else{
				if (_errInf == "秒杀商品超过购买数量"){
					ifOverNum = true;
				}else{
					if(gtype == 4){
						$('.the-light').show();
						$('#repertory').show();
					}else{
                        layer.open({
                            content:_errInf
                            ,skin: 'msg'
                            ,time: 3
                        });
						//alert(data.respBody.errInf);
					}
				}
			}
		},
        error:function(){
		    common.hideLoading();
        }
	});
}
$('#repertory-close').click(function(){
	$('#repertory').hide();
	$('.the-light').hide();
});

function handleSubsTrackingInfo(body){
    var userSrc = common.getSessionStorage("userSrc");
    if(common.isNotEmptyString(userSrc)){
        body.mix = userSrc;
        //莫名其妙的丢单,保险点,多判断一下
        if ("2" == userSrc || 2 == userSrc || "4" == userSrc || 4 == userSrc){//2 代表返利网来源 4代表linkstars广告联盟来源
            var srcUid = common.getSessionStorage("srcUid");
            var trackingCode = common.getSessionStorage("trackingCode");
            if(common.isNotEmptyString(srcUid))  body.srcUid = srcUid;//用户在第三网推广网站的UID
            if(common.isNotEmptyString(trackingCode)) body.trackingCode = trackingCode;
        }
        if("3" == userSrc || 3 == userSrc){//3 代表店中店来源
            var physicalShopId = common.getSessionStorage("physicalShopId");
            if(common.isNotEmptyString(physicalShopId))  body.physicalShopId = physicalShopId;
        }
    }
}

function selectAddr(){
	if(ConfirmPage.needIdNo === null){
		common.toast('数据加载中...');
		return ;
	}
	var data = common.getQueryStr("data");
	data = decodeURIComponent(data);
	data = JSON.parse(data);
	data.idCardTag = idCardTag;
	data.needIdNo = ConfirmPage.needIdNo;
	data = JSON.stringify(data);
	data = encodeURIComponent(data);
	// window.location = "ship-address.html?data="+data;
	gotoPageUrl("ship-address.html?data="+data);
}
function addAddr(){
	if(ConfirmPage.needIdNo === null){
		common.toast('数据加载中...');
		return ;
	}
	var data = common.getQueryStr("data");
	data = decodeURIComponent(data);
	data = JSON.parse(data);
	data.idCardTag = idCardTag;
	data.needIdNo = ConfirmPage.needIdNo;
	data.formOrder = true;
	data = JSON.stringify(data);
	data = encodeURIComponent(data);
	// window.location = "ship-address.html?data="+data;
	gotoPageUrl("modify-address.html?data="+data);
}

function gotoModifyPage(){
	var data = common.getQueryStr("data");
	if(data){
		data = decodeURIComponent(data);
		data = JSON.parse(data);
	}else{
		data = {};
	}
	data.modifyAddr = ConfirmPage.userDeli.id;
	// window.location = "/busi/modify-address.html?data="+encodeURIComponent(JSON.stringify(data));
	gotoPageUrl("/busi/modify-address.html?data="+encodeURIComponent(JSON.stringify(data)));
}

if(typeof window.less !=='undefind'){
    $(window).load(function(){
        init();
    });
}else{
    $(init);
}

/**
 * 初始化跟优惠券相关的数据
 */
var cacheUseCoupon = {};
function initCoupon(respBody){
    var couponUseList = respBody.couponUseList;
    var couponNotUseList = respBody.couponNotUseList;

    $("#couponTotal").show();
    if(couponUseList &&　couponUseList.length>0){
        $("#useCouponCount").html("("+couponUseList.length+")");
        var _html="";
        for(var i = 0;i<couponUseList.length;i++){
			var coupon = couponUseList[i];
			//将可用的优惠券信息缓存起来
            $("#couponTotalMsg").html(couponUseList.length +"张可用").show();
            $("#useConponDenomination").html('<span class="couponWa">不使用</span><i class="iconfont cor666 fs20">&#xe61d;</i>');
            cacheUseCoupon[coupon.couponId] = coupon;
            _html += getActCouponItemHtml(coupon);
        }
        $("#useCouponContent").html(_html);

    }
	if(!couponUseList || couponUseList.length == 0){
		$("#couponUerNot").hide();
		var html = '<p class="fs14 cor666 tac coupon-no">暂无优惠券</p>';
		$(html).appendTo("#useCouponContent");
	}
    if(couponNotUseList && couponNotUseList.length >0){
        $("#notUseCouponCount").html("("+couponNotUseList.length+")");
        var coupon = couponNotUseList[i];
        $("#notUseCouponCount").html("("+couponNotUseList.length+")");

        var notCouponContentHtml = '';
        for(var i = 0;i<couponNotUseList.length;i++) {
            var coupon = couponNotUseList[i];
            coupon.notUse = true;
            notCouponContentHtml += getActCouponItemHtml(coupon);
        }
        $("#notCouponContent").html(notCouponContentHtml);

	}

}

function getActCouponItemHtml(couponListCon) {

    var giveFlag = "";
    var useBtnHtml = '';
    if (!couponListCon.notUse) {
        useBtnHtml = '<a href="javascript:;" class="selectBtn" couponid="' + couponListCon.couponId + '"></a>';
    } else {
        giveFlag = "notUse";
    }

    var _html = '<div class="iba-coupon-bg ' + giveFlag + '" id="coupon' + couponListCon.couponId + '"><h3 class="iba-coupon-tit "><p class="name">' + couponListCon.name + '</p>' + useBtnHtml + '</h3><div class="pr boxBottom"><div class="couponStateIcon"></div><div class="tac iba-coupon-conL"><p class="denomination"><span class="icon">¥</span><span class="value">' + couponListCon.denomination + '</span></p><p class="useAmtLimit">' + couponListCon.useAmtLimit + '</p></div><div class="iba-coupon-conR"><div class="box"><p class="fullCoupon">' + couponListCon.fullCoupon + '</p><p class="timeLimit">' + couponListCon.timeLimit + '</p></div></div></div></div>';
    return _html;
}

function selectCouponEvent(){
    $("#useCouponContent").on('click','.selectBtn',function(){
        var _$this = $(this);
        var couponId = _$this.attr('couponid');
        selectCoupon(_$this[0],couponId);
    });
}

function selectCoupon(obj,couponId){
	$("#couponDataContent").find(".isSelect").removeClass("isSelect");
    $(obj).addClass("isSelect");
    cacheTotalPrice = ConfirmPage.sum.actualPrice;
	if(couponId){
		var conpon = cacheUseCoupon[couponId];
		if(conpon && conpon!=null){
			//获取优惠券价值，回填
			$("#useConponDenomination").html('<span class="couponWa">-¥'+ConfirmPage.toFix(conpon.denomination)+'</span><i class="iconfont cor666 fs20">&#xe61d;</i>');


			var _notUseCouponPrice = ConfirmPage.sum.freightPrice + ConfirmPage.sum.taxPrice-ConfirmPage.sum.firstDeduct;
			var _useCouponPrice = cacheTotalPrice - _notUseCouponPrice;
            var payTotal = _useCouponPrice -conpon.denomination  ;

            var _couponDenomination = payTotal>0?conpon.denomination:_useCouponPrice;

            $("#couponPrice").html("-¥"+ConfirmPage.toFix(_couponDenomination));

            //使用优惠券不能使用福利了
			if(ConfirmPage.sum.deductPrice > 0){
                $("#deductPrice").parent().hide();
                payTotal += ConfirmPage.sum.deductPrice;
			}
			payTotal = payTotal > 0 ?  payTotal + _notUseCouponPrice :_notUseCouponPrice;
            cacheTotalPrice = payTotal;
            $("#pay-total").html("¥"+ConfirmPage.toFix(payTotal));
            ConfirmPage.conponId = conpon.couponId;
            $("#couponH1").show();
		}
	}else{
        ConfirmPage.calculateTotalPrice();
        if(ConfirmPage.sum.deductPrice > 0){
            $("#deductPrice").parent().show();
		}
        $("#useConponDenomination").html('<span class="couponWa">不使用</span><i class="iconfont cor666 fs20">&#xe61d;</i>');
        //显示原来的价格
        $("#pay-total").html("¥"+ConfirmPage.toFix(cacheTotalPrice));
        ConfirmPage.conponId = null;
        delete ConfirmPage.conponId;
        $("#couponH1").hide();
    }
    $('#couponListContent').hide();
}

function changeCouponList(obj,type){
	$("#couponTitle").find(".cur").removeClass("cur");
	$(obj).addClass("cur");
	if(type==1){
		$("#useCouponDiv").show();
        $("#notUseCouponDiv").hide();
	}
    if(type==2){
        $("#useCouponDiv").hide();
        $("#notUseCouponDiv").show();
    }
}
//渠道活动初始化
function userSrcActInit(src){
    if(src == '17' || (src == '18') || (src == '19') || (src == '22')){
        $("#couponTotal").remove();
    }
}
