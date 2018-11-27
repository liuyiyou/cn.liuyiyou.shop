var status = common.getQueryStr("status") ? common.getQueryStr("status") : common.getSessionStorage("myOrderStatus");
var getWealCount = 0;
MyOrderPage = {
    page: 1,
    pageSize: 5,
    status: status,
    isOver: false,
    isLoaded: false,
    wrapPostParam: function (reqBody) {
        var param = new Object();
        param.reqBody = reqBody;
        param = JSON.stringify(param);
        return param;
    },
    wrapGetParam: function (reqBody, reqHeader) {
        var param = new Object();
        if (reqHeader) {
            param.reqHeader = JSON.stringify(reqHeader);
        }
        if (reqBody) {
            param.reqBody = JSON.stringify(reqBody);
        }
        return param;
    },
    cleanPage: function () {
        $(".cont-box").html("1");
        $("#order-all").html("1");
        $("#order-no-pay").html("1");
        $("#order-no-send").html("1");
        $("#order-no-confirm").html("1");
        $("#order-all-done").html("1");
    },
    getStatusStr: function (status) {
        if (status == 1) {
            return "待付款";
        } else if (status == 2) {
            return "待发货";
        } else if (status == 3) {
            return "已发货";
        } else if (status == 4) {
            return "交易成功";
        } else if (status == 5) {
            return "交易关闭";
        }
    },
    getPictUrl: function (ablum) {
        if (ablum && ablum.indexOf('/images') == 0) {
            return ablum;
        } else {
            return ablum ? (ConstUtil.get("PIC_DOMAIN") + ablum) + ConstUtil.get("MIN_PIC_SIZE") : "";
        }
    },
    getTax: function (prod) {
        var tax = prod.sum * prod.unitPrice * prod.taxRate;
        return tax.toFixed(2);
    },
    toFix: function (input) {
        input = Number(input);
        var val = input.toFixed(2);
        return val;
    },
    formatDate: function (createTime) {
        var time = new Date();
        time.setTime(createTime);
        return common.formatDate('yyyy-MM-dd', time);
    },
    version: function () {
        var myDate = new Date();
        return myDate.getTime();
    },
    delegatePageEvent: function () {
        var _this = this;
        //显示隐藏产品明细
        $(".cont-box").on("click", ".more-fa", function () {
            var show = $(this).attr("data-show");
            var subsId = $(this).attr("data-subsid");
            show = eval(show);
            if (show) {
                $(".prod-more-" + subsId).hide();
                $(this).children("img").removeClass("more1");
                $(this).children("img").addClass("more");
                $(this).children("div").children("img").removeClass("more");
                $(this).children("div").children("img").addClass("more1");
                $(this).attr("data-show", "false");
            } else {
                $(".prod-more-" + subsId).show();
                $(this).children("img").removeClass("more");
                $(this).children("img").addClass("more1");
                $(this).children("div").children("img").removeClass("more1");
                $(this).children("div").children("img").addClass("more");
                $(this).attr("data-show", "true");
            }
        });

        $('body').on('click', '.cancelReasonWrapper .item', function () {
            var _$this = $(this);
            _$this.addClass('isChecked').siblings().removeClass('isChecked');

        });
        //取消订单
        $(".cont-box").on("click", ".pay-bo2", function () {
            var subsId = $(this).attr("subsId");

            if (_this.cancelReasonActionSheetHtml) {
                _this.cancelReasonActionSheetData.actionFn = function (actionSheetApp) {
                    _this.cancelReasonAction(subsId, actionSheetApp);
                };
                common.showActionSheet(_this.cancelReasonActionSheetData);
            } else {
                _this.loadCancelSubsReason(function () {
                    _this.cancelReasonActionSheetData.actionFn = function (actionSheetApp) {
                        _this.cancelReasonAction(subsId, actionSheetApp);
                    };
                    common.showActionSheet(_this.cancelReasonActionSheetData);
                })
            }
        });

        //切换卡片
        $(".order-nav li").click(function () {
            if ($(this).hasClass("order-selected")) {
                return;
            }
            $(this).addClass("order-selected").siblings(".order-nav li").removeClass("order-selected");
            var index = $(".order-nav li").index($(this));
            if (index == 0)
                MyOrderPage.status = null;
            else
                MyOrderPage.status = index;
            $(".cont-box").html("");
            MyOrderPage.page = 1;
            MyOrderPage.isOver = false;
            common.setSessionStorage("myOrderStatus", index);
            loadUserSubs();
        });
        //返回按钮指向个人中心
        $("#go-to-myorder").click(function () {
            commonGoBack && commonGoBack();
            common.setSessionStorage("myOrderStatus", '');
        });
    },
    cancelReasonAction: function (subsId, actionSheetApp) {
        var _cancelReason = $.trim($("#cancelReasonActionSheet .isChecked").data('reason'));
        if (_cancelReason == '') {
            common.toast('请选择取消原因');
            return;
        } else {
            actionSheetApp.hide();

            var param = new Object();

            param.status = "5";
            param.subsId = subsId;
            param.cancelReason = _cancelReason;
            common.showLoading();
            $.ajax({
                type: "POST",
                url: "/app/busi/activity/subssts",
                dataType: "json",
                contentType: "application/json",
                data: MyOrderPage.wrapPostParam(param),
                success: function (respData) {
                    if (respData.respHeader.resultCode !== 0) {
                        if (respData.respBody && respData.respBody.errInf) {
                            common.toast(respData.respBody.errInf);
                        } else {
                            common.toast(respData.respHeader.message);
                        }
                    } else {
                        $(".cont-box").html("");
                        var choose = 1;
                        common.toast("取消订单成功");
                        loadUserSubs(choose);
                    }
                    $("#cancelReasonActionSheet .item").removeClass('isChecked');
                    common.hideLoading();
                },
                error: function () {
                    common.hideLoading();
                }
            });
        }

    },
    loadCancelSubsReason: function (cb) {
        var _this = this;
        common.showLoading();
        common.ajax("POST", '/app/busi/activity/cancelsubs/reason', '', function (respBody) {
            _this.renderCancelReason(respBody);
            common.hideLoading();
            cb && cb();
        });
    },
    renderCancelReason: function (respBody) {
        var _list = respBody.list;
        var _this = this;

        var _contentHtml = _list.map(function (item) {
            return '<div class="item"  data-reason="' + item.id + '">' + item.content + '</div>';
        }).join('');
        if (_contentHtml) {
            _this.cancelReasonActionSheetHtml = '<div class="cancelReasonWrapper">' + _contentHtml + '</div>';
        } else {
            _this.cancelReasonActionSheetHtml = '';
        }

        _this.cancelReasonActionSheetData = {
            id: "cancelReasonActionSheet",
            title: '取消原因',
            confirmName: '提交',
            contentHtml: _this.cancelReasonActionSheetHtml
        };

    },
    goToOrderDetail: function () {
        $('body').on('click', '.or-con', function () {
            var that = $(this);
            var link = that.find('.total-link').attr('href');
            gotoPageUrl(link)
        })
    }
}
//var myScroll;
$(function () {
    MyOrderPage.goToOrderDetail();
    if (!common.isWeixin()) {
        $("#wxpay").hide();
        $("#zfbpay").show();
        $("#unionpay").show();
        $("#pay2").addClass("check");
        payType = 2;
    } else {
        $("#wxpay").show();
        $("#zfbpay").hide();
        $("#unionpay").hide();
        $("#pay1").addClass("check");
        payType = 4;

    }

    //初始化头部卡片栏
    if (status) {
        $(".order-nav li").removeClass("order-selected");
        $(".order-nav li:eq(" + status + ")").addClass("order-selected");
    }

    MyOrderPage.cleanPage();
    // getOrderCount();
    MyOrderPage.delegatePageEvent();

    loadUserSubs();


    $(".order-confirm").hide();

    $("#close-pay-ways").click(function () {
        $(".order-confirm").hide();
    });
    //默认支付方式
    if (common.isWeixin()) {
        payType = 4;
    } else {
        payType = 2;
    }

    $("#zfbpay").click(function () {
        $("#pay3").removeClass("check");
        if ($("#pay2").hasClass("check")) {
            $("#pay2").removeClass("check");
            payType = -1;
            showSubmit();
        } else {
            $("#pay2").addClass("check");
            payType = 2;
            showSubmit();
        }

    });

    $("#unionpay").click(function () {
        $("#pay2").removeClass("check");
        if ($("#pay3").hasClass("check")) {
            $("#pay3").removeClass("check");
            payType = -1;
            showSubmit();
        } else {
            $("#pay3").addClass("check");
            payType = 5;
            showSubmit();
        }
    });

    $("#submit").click(function () {
        if (payType != -1) {
            window.location.href = "confirm-pay.html?subsId=" + paySubsId + "&payType=" + payType + "&timestamp=" + $.now();
        } else {
            alert("请选择支付方式！");
        }
    });
    $('section').on('click', '.remindDeliverBtn', function () {
        remindDeliver(this)
    });

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var height = $(this).height();
        var contentHeight = $("section div").height() + 106;
        var h = scrollTop + height - contentHeight;

        if (h >= 0) {
            if (MyOrderPage.isOver || MyOrderPage.isLoaded) {
                return;
            }
            loadUserSubs();
        }
    });
});

function remindDeliver(e) {
    var remindId = ($(e).attr("remind"));
    $.ajax({
        url: "/app/busi/subs/reminddeliver-" + remindId,
        type: "POST",
        dataType: "json",
        data: null,
        contentType: "application/json",
        success: function (data) {
            if (data.respHeader) {
                common.toast(data.respHeader.message)
            }
        }
    });
}

////提示获得的福利
function showActivityInfo() {
    $("#first-order-to-my-weal,#double11-activity-to-my-weal,#Christmas-activity-weal,#weal-activity-to-my-weal").click(function () {
        location.href = "/user/my-benefits-package.html";
    });

    $("#double11-activity-cancel").click(function () {
        $("#double11-activity,.the-light").hide();
    });
    $("#Christmas-activity-close").click(function () {
        $("#Christmas-activity,.the-light").hide();
    });
    $("#weal-activity-cancel").click(function () {
        $("#weal-activity,.the-light").hide();
    });
    var subsId = common.getSessionStorage("lastPaySubsId");
//	var subsId = 15056;
    if (subsId && subsId != "" && subsId > 0) {
        getOrderWeal(subsId);
    }
}

function renderRefundStatus(subStatus, prod) {
    if (subStatus == 1 || prod.prodId == 0) {
        return {refundStatus: prod.refundStatus, name: ''};
    }
    if (subStatus == 5 && typeof prod.refundStatus == 'undefined') {
        return {refundStatus: prod.refundStatus, name: ''};
    }
    var name = null;
    switch (prod.refundStatus) {
        case -1:
            name = '';
            break;
        case 0:
            name = '退款中';
            break;
        case 1:
            name = '退款中';
            break;
        case 2:
            name = '退款中';
            break;
        case 3:
            name = '退款中';
            break;
        case 4:
            name = '退款中';
            break;
        case 5:
            name = '退款关闭';
            break;
        case 6:
            name = '退款成功';
            break;
        default:
            name = '';
            break;
    }
    return {refundStatus: prod.refundStatus, name: name};
}

function getOrderWeal(subsId) {
    var param = new Object();
    var reqBody = new Object();
    reqBody.subsId = subsId;
    param.reqBody = JSON.stringify(reqBody);

    common.ajax("GET", "/app/user/activity/order/weal", param, function (body) {
        if (body.subsStatus == 2) {
        } else if (body.subsStatus == 1) {
            //如果支付回调有延时，这里需要异步再取一下
            if (getWealCount > 3) {
                return;
            }
            getWealCount++;
            setTimeout("getOrderWeal(" + subsId + ")", getWealCount * 1000);
        }

    }, function (head) {

    });
}


function loadUserSubs(choose) {
    MyOrderPage.isLoaded = true;
    $("#scroller-pullUp").show().find('img').show().end().find('#pullUp-msg').hide();
    var param = {};
    $("#no-order-img").hide();
    param.pageSize = MyOrderPage.pageSize;
    if (choose == 1) {
        param.page = 1;
    } else {
        param.page = MyOrderPage.page;
    }
    MyOrderPage.page++;
    param.status = MyOrderPage.status;
    var _param = MyOrderPage.wrapGetParam(param);
    $.ajax({
        url: ConstUtil.get("ORDER_URL") + "/order/list",
        type: "GET",
        dataType: "json",
        data: _param,
        contentType: "application/json",
        success: function (data) {
            if (data.result) {
                template.helper("getStatusStr", MyOrderPage.getStatusStr);
                template.helper("getPictUrl", MyOrderPage.getPictUrl);
                template.helper("toFix", MyOrderPage.toFix);
                template.helper("formatDate", MyOrderPage.formatDate);
                template.helper("version", MyOrderPage.version);
                template.helper("log", window.console.log);
                template.helper("status", MyOrderPage.status);
                template.helper("renderRefundStatus", renderRefundStatus);
                template.helper("hasRefundProd", hasRefundProd);
                console.info(data.result);
                var subsHtml = template("subs-inf", data.result);
                $(".cont-box").append(subsHtml);
                MyOrderPage.isLoaded = false;
            }
        }
    });
}

function getOrderCount() {
    var param = new Object();
    param = MyOrderPage.wrapGetParam(param);
    $.ajax({
        url: ConstUtil.get("ORDER_URL") + "/order/count",
        type: "GET",
        dataType: "json",
        data: param,
        contentType: "application/json",
        success: function (data) {
            if (data.respBody) {
                if (!data.respBody.unpaidCount) {
                    $("#order-no-pay").hide();
                } else {
                    $("#order-no-pay").html(data.respBody.unpaidCount);
                }
                if (!data.respBody.paidCount) {
                    $("#order-no-send").hide();
                } else {
                    $("#order-no-send").html(data.respBody.paidCount);
                }

                if (!data.respBody.deliveredCount) {
                    $("#order-no-confirm").hide();
                } else {
                    $("#order-no-confirm").html(data.respBody.deliveredCount);
                }

                if (!data.respBody.doneCount) {
                    $("#order-success").hide();
                } else {
                    $("#order-success").html(data.respBody.doneCount);
                }
            }
        }
    });
}

function doSureOrder(subsId, needCommentProdNum, prodId) {
    var reqBody = new Object();
    reqBody.subsId = subsId;
    reqBody.status = "4";
    var params = MyOrderPage.wrapPostParam(reqBody);
    $.ajax({
        url: "/app/busi/activity/subssts",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: params,
        success: function (data) {
            if (data && data.respHeader && data.respHeader.resultCode == "0") {
                gotoPageUrl("/busi/confirm-receipt.html?subsId=" + subsId + "&needCommentProdNum=" + needCommentProdNum + "&prodId=" + prodId);
            } else if (data && data.respBody && data.respBody.errInf) {
                alert(data.respBody.errInf);
            } else if (data && data.respHeader) {
                alert(data.respHeader.message);
            }
        }
    });
}

function sureOrder(subsId, sendStatus, needCommentProdNum, prodId) {
    if (sendStatus == 1) {
        common.toast('仍有待发货商品，无法确认收货')
    }
    else {
        showModalDialog("确定是否已经收到货品？", doSureOrder, [subsId, needCommentProdNum, prodId]);
    }
}

var payType = -1;
var paySubsId = 0;

function selectPayAlert(subsId, totalmoney, src, subsno) {
    selectPay(subsId, totalmoney, src, subsno);
}

function selectPay(subsId, totalmoney, src, subsno) {
//	if (common.isWeixin()){
    var payType = 4;
    if (common.isWeixin()) {
        payType = 4;
    } else {
        payType = 10;
    }
    if (src == 9) {
        // var newStr = subsno.toString();
        var newSubsId = subsno.substring(4, subsno.length);
        window.location.href = "/pages/busi/confirm-pay.html?subsId=" + newSubsId + "&payType=" + payType + "&timestamp=" + $.now() + getFromShopkeeperFlagStr();
    } else {
        window.location.href = "confirm-pay.html?subsId=" + subsId + "&timestamp=" + $.now() + getFromShopkeeperFlagStr();
    }
    common.setSessionStorage("myOrderChannel", true);


}

function showSubmit() {
    if (payType != -1) {
        if ($("#submit").hasClass("nav-bo-sb")) {
            $("#submit").addClass("nav-bo-su");
            $("#submit").removeClass("nav-bo-sb");
        }
    } else {
        if ($("#submit").hasClass("nav-bo-su")) {
            $("#submit").removeClass("nav-bo-su");
            $("#submit").addClass("nav-bo-sb");
        }
    }
}

function hasRefundProd(prodList) {
    var _re = false;
    for (var i = prodList.length; i--;) {
        var _prod = prodList[i];
        if (typeof _prod.refundStatus != 'undefined' && (_prod.refundStatus != 5 && _prod.refundStatus != 6)) {
            _re = true;
            break;
        }
    }
    return _re;
}
