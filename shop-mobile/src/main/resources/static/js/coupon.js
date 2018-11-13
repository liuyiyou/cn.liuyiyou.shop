
/**
 * 初始化未登录引导页优惠券窗口
 */
var couponRedOptions={};
function initCouponWindow(couponRedPack){
    //弹窗显示一次，关闭后今天不在显示
    var redId='';
    var uid='';
    var opa='opa-0';
    var boxClass='';
    var fn;
    if(couponRedOptions.takenNode==10){
        opa='';
        // couponRedOptions.hasLoginRedBag=true;
        common.setSessionStorage("hasLoginRedBag", 'true');
    }
    if(couponRedPack&&couponRedPack.redpackId){
        redId=couponRedPack.redpackId;
        uid=couponRedPack.uid;
        boxClass='split-red-bag';
        opa='';
        fn='goGetRedBag';
    }
    else if(couponRedPack===undefined){
        fn='couponToLogin';
    }
    var html = '<div class="coupon-modal redbag a-bouncein '+boxClass+'">' +
        '<span id="coupon-close" onclick="couponsWindowClose(this)"></span> <div class="coupon-inner">' +
        '<div class="icon"><span></span></div>' +
        '<div class="content-wrap">' +
        '<div class="msg"><h3>恭喜获得红包</h3><span class="split '+opa+'">小伙伴转发平分，大家一起抢</span></div></div>' +
        '<div class="btn-wrap" data-id="'+redId+'" data-uid="'+uid+'" onclick="'+fn+'(this)"><span class="use-btn">拆红包</span> </div></div></div>';
    if(couponRedPack==='nored'){
        return;
    }
    else{
        $('body').append('<div class="coupon-mask"></div>')
        $(html).appendTo("body");
    }

}
/**
 * 关闭优惠券弹窗
 */
function couponsWindowClose(obj){
    $(obj).parents(".coupon-modal").remove();
    $(".coupon-mask").remove();
}
function couponToLogin(obj){
    var trackId = common.getSessionStorage("trackId");
    // common.setSessionStorage("hisUrl", window.location.href);
    common.setSessionStorage("couponWindowClick",1);
    if(!trackId){//未登录
        common.setSessionStorage("hisUrl", window.location.href);
        common.setSessionStorage("currentPageLoginHisUrl", window.location.href);
        if (common.isWeixin()) {
            window.location.href = "/user/login-binding.html?coup=1";
        } else {
            window.location.href = "/user/login.html?coup=1";
        }
    }
    couponsWindowClose('#coupon-close')
}
function goGetRedBag(obj){
    var that=$(obj);
    var redId=that.attr('data-id');
    var uid=that.attr('data-uid');
    gotoPageUrl('/user/redbag-fission.html?redpackId='+redId+'&recommandUid='+uid)
}
/**
 * 初始化优惠券弹窗
 *
 */
function initCouponPop(subtype,orderSubsId,needPop,callBack){
    var key = '/app/coupon/getCouponMsg';
    key = Base64.encode(key) ;
    var dateTime = new Date().getTime();
    var transferDate = common.getSessionStorage(key);
    var params={};
    if(orderSubsId){
        params.subsId=orderSubsId
    }
    if(needPop){
        params.needPop='yes';
    }
    params.subtype=subtype;
    if(transferDate =='' || (dateTime > transferDate)){
        // subtype : 0, 其他页面调用, 会返回 拼团优惠劵提醒 或 普通优惠劵提醒
        // subtype : 1, 拼团详情页面调用, 只会返回拼团优惠劵提醒
        common.ajax("GET", "/app/coupon/getCouponMsg", params, function(respBody) {
                var type = respBody.type;
                if(type == 0){ //表示
                    var noLoginCouponActId = common.getSessionStorage("noLoginCouponActId");
                    var actId = respBody.actId;
                    if(actId && noLoginCouponActId != actId){
                        if(respBody.takenNode){//代表未登录引导登录
                            couponRedOptions.takenNode=respBody.takenNode
                        }
                        initCouponWindow();
                        common.setSessionStorage("noLoginCouponActId",actId);
                        return ;
                    }
                }else{
                    if(respBody.couponList){
                        var couponCount = respBody.couponCount;
                        var denomination = respBody.denomination;
                        var couponList = respBody.couponList;
                        if(couponCount && denomination&&couponList){
                            var num;
                            var message ='';
                            var itemHtml ='';
                            var idArr=[];
                            var shadow='';
                            if(couponList.length>4){
                                num=4;
                            }
                            else{
                                num=couponList.length;
                            }
                            if(couponList.length>3){
                                shadow='shadow';
                            }
                            else{
                                shadow='';
                            }

                            message += '<div class="coupon-modal a-bouncein"><span id="coupon-close" onclick="couponsWindowClose(this)"></span><div class="coupon-inner"> ' +
                                '<div class="title"><span>恭喜您，获得'+couponCount+'张优惠券 <br/>价值¥'+denomination+'</span></div> ' +
                                '<div class="content-wrap"> ' +
                                '<ul class="list"> ';

                            for(var i=0;i<couponList.length;i++){
                                var item=couponList[i];
                                itemHtml+='<li class="item f-cb"> <div class="item-wrap">' +
                                    '<div class="fl"> ' +
                                    '<p class="describe">'+item.name+'</p> ' +
                                    '<p class="limit">有效期'+item.days+'天</p> ' +
                                    '</div> ' +
                                    '<div class="fr condition"> ' +
                                    '<p class="price"><span class="dollar">¥</span><b>'+item.denomination+'</b></p> ' +
                                    '<p class="use">满'+item.useAmtLimit+'元使用</p> </div></div> ' +
                                    '</li> ';
                                idArr.push(item.id);
                            }
                            message+=itemHtml;
                            message +='</ul> </div> <div class="btn-wrap '+shadow+'"><a class="use-btn" href="/user/coupon-prod.html?couId='+String(idArr)+'">立即使用</a> </div></div></div>';
                            $('body').append('<div class="coupon-mask"></div>')
                            $(message).appendTo("body");
                            $('.coupon-modal').addClass('num-'+num)

                        }
                    }
                    else if(respBody.couponRedPack&&respBody.couponRedPack.redpackId){
                        var redId=respBody.couponRedPack.redpackId;
                        var uid=respBody.couponRedPack.uid;
                        // alert(respBody.couponRedPack.redpackId)
                        if(subtype==5){
                            common.setSessionStorage('paySuccessHasRedBag',true)
                        }
                        if(common.getSessionStorage("hasLoginRedBag")=='true'){
                            gotoPageUrl('/user/redbag-fission.html?redpackId='+redId+'&recommandUid='+uid)
                        }
                        else{
                            if(respBody.couponRedPack.pop==0){
                                initCouponWindow('nored');
                            }
                            else{
                                initCouponWindow(respBody.couponRedPack);
                            }

                        }
                        if(callBack){
                            callBack()
                        }
                    }
                    else{
                        common.setSessionStorage("hasLoginRedBag",0);
                    }
                }
            });
    }
}


