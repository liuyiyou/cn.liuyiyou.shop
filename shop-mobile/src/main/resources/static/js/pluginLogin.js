;(function ($) {
    var cacheDom = {};
    var loginType = 1;//1密码 2 验证码
    var optionsCache = null;
    var _sendSmsTimer = null;
    var _sendSmsRemainingTime = 60;

    function init(options) {
        optionsCache = options;
        var $wrapper = renderHtml(options);
        initDom($wrapper);
        initEvent();
        initAction();
        return {
            hide: hide
        }
    }

    function getHeaderHtml() {
        var _html = '<div class="head"><div class="nav"><div class="ib-nav-left-wrapper"><div class="iba-nav-back backBtn"></div></div><div class="iba-nav-title">登录注册</div><div class="ib-nav-right-wrapper"></div></div></div>';
        return _html;
    }

    function getTitleHtml() {
        var _html = '<div class="loginBoxTitle">您需要先登录</div><div class="loginBoxSubTitle">未注册的手机号，将自动创建洋老板账号</div>';
        return _html;
    }

    function getAgreementBtnHtml() {
        var _html = '<div class="agreementWrapper"><div class="agreement"><div class="agreeCheck checked"></div><span>已阅读并同意<a href="javascript:;" class="agreementBtn">《洋老板用户服务协议》</a></span></div></div>';
        return _html;
    }

    function getAgreementHtml() {
        return "";
    }

    function renderAgreementHtml() {
        var html = getAgreementHtml();
        cacheDom.$agreementContent.html(html);
    }

    function showAgreement() {
        if (cacheDom.$agreementContent.html() == '') {
            renderAgreementHtml();
        }
        cacheDom.$agreementPopupWrapper.addClass('show');
    }

    function hideAgreement() {
        cacheDom.$agreementPopupWrapper.removeClass('show');
    }

    function renderHtml(options) {
        var dom = $(options.id);
        var headerHtml = options.type === 'default' ? getHeaderHtml() : '';
        var titleHtml = options.type === 'centerPopup' ? getTitleHtml() : '';
        var agreementHtmlDefault = options.type === 'centerPopup' ? getAgreementBtnHtml() : '';
        var agreementHtmlBottom = options.type === 'default' ? getAgreementBtnHtml() : '';

        var html = '<div class="pluginLoginWrapper ' + options.type + '"><div class="pluginLoginMask"></div>' + headerHtml + '<div class="loginBox">' + titleHtml + '<div class="loginCloseBtn"></div><div class="accountWrapper"><div class="labelIcon"></div><input type="text"class="account"maxlength="11"placeholder="请输入手机号码"/></div><div class="loginCodeWrapper"><div class="labelIcon"></div><input type="text"class="loginCode"maxlength="6"placeholder="请输入验证码"/><div class="getCodeBtn">获取验证码</div></div><div class="loginPwdWrapper"><div class="labelIcon"></div><input type="password"class="loginPwd"placeholder="请输入密码"/><div class="showPwdBtn"></div><div class="retrievePwdBtn">找回密码</div></div>' + agreementHtmlDefault + '<div class="loginBtn">确定</div><div class="subToolWrapper"><div class="voiceCodeWrapper">接收不到短信，接听<span class="voiceText">语音验证码</span></div><div class="changeRegisterBtn">新账号注册</div><div class="pwdLoginBtn changeLoginBtn">密码登录</div><div class="codeLoginBtn changeLoginBtn">验证码登录</div></div><div class="agreementPopupWrapper"><div class="agreementTitle">洋老板用户服务协议</div><div class="agreementContent"></div><div class="agreementCloseBtn">返回</div></div></div>' + agreementHtmlBottom + '</div>';

        html = $(html);
        dom.append(html);
        return html;
    }

    // 业务行为
    function initAction() {
        initStyleShow();
        show();
    }

    function initStyleShow() {
        if (loginType == 1) {
            changeLoginType('pwdLogin');
        } else {
            changeLoginType('codeLogin');
        }
    }

    function initDom($wrapper) {
        cacheDom.$wrapper = $wrapper;
        cacheDom.$pwdLoginBtn = $wrapper.find(".pwdLoginBtn");
        cacheDom.$codeLoginBtn = $wrapper.find(".codeLoginBtn");
        cacheDom.$loginBox = $wrapper.find(".loginBox");
        cacheDom.$account = $wrapper.find(".account");
        cacheDom.$showPwdBtn = $wrapper.find(".showPwdBtn ");
        cacheDom.$loginPwd = $wrapper.find(".loginPwd ");
        cacheDom.$loginCode = $wrapper.find(".loginCode ");
        cacheDom.$getCodeBtn = $wrapper.find(".getCodeBtn ");
        cacheDom.$loginBtn = $wrapper.find(".loginBtn ");
        cacheDom.$closeBtn = $wrapper.find(".loginCloseBtn ");
        cacheDom.$backBtn = $wrapper.find(".backBtn ");
        cacheDom.$changeRegisterBtn = $wrapper.find(".changeRegisterBtn ");
        cacheDom.$voiceText = $wrapper.find(".voiceText ");
        cacheDom.$voiceCodeWrapper = $wrapper.find(".voiceCodeWrapper ");
        cacheDom.$retrievePwdBtn = $wrapper.find(".retrievePwdBtn");
        cacheDom.$agreementBtn = $wrapper.find(".agreementBtn");
        cacheDom.$agreementPopupWrapper = $wrapper.find(".agreementPopupWrapper");
        cacheDom.$agreementContent = $wrapper.find(".agreementContent");
        cacheDom.$agreementCloseBtn = $wrapper.find(".agreementCloseBtn");

    }

    function initEvent() {
        bindPwdLoginBtnEvent();
        bindCodeLoginBtnEvent();
        bindAccountEvent();
        bindShowPwdBtnEvent();
        bindLoginPwdEvent();
        bindLoginCodeEvent();
        bindLoginBtnEvent();
        bindCloseBtnEvent();
        bindBackBtnEvent();
        bindGetCodeBtnEvent();
        bindChangeRegisterBtnEvent();
        bindVoiceTextEvent();
        bindRetrievePwdBtnEvent();
        bindAgreementBtnEvent();
        bindAgreementCloseBtnEvent();
    }

    function bindAgreementCloseBtnEvent() {
        cacheDom.$agreementCloseBtn.click(function () {
            hideAgreement();
        });
    }

    function bindAgreementBtnEvent() {
        cacheDom.$agreementBtn.click(function () {
            showAgreement();
        });
    }

    function bindRetrievePwdBtnEvent() {
        cacheDom.$retrievePwdBtn.click(function () {
            window.location.href = '/user/forget-password.html';
        });
    }

    function bindVoiceTextEvent() {
        cacheDom.$voiceText.click(function () {
            sendVoiceSms();
        });
    }

    function bindGetCodeBtnEvent() {
        cacheDom.$getCodeBtn.click(function () {
            if (cacheDom.$getCodeBtn.hasClass('active')) {
                sendSms();
            }
        });
    }

    function bindBackBtnEvent() {
        cacheDom.$backBtn.click(function () {
            optionsCache.backFn && optionsCache.backFn();
        });
    }

    function bindCloseBtnEvent() {
        cacheDom.$closeBtn.click(function () {
            hide();
        });
    }

    function hide() {
        setTimeout(function () {
            fadeLeave();
        }, 0);
        setTimeout(function () {
            cacheDom.$wrapper.removeClass('show');
        }, 100);
        resetSendSmsStatus();
    }

    function show() {
        cacheDom.$wrapper.addClass('show');
        setTimeout(function () {
            fadeEnter();
        }, 0);
        resetSendSmsStatus();
    }

    function fadeEnter() {
        cacheDom.$wrapper.addClass('fade-enter');
    }

    function fadeLeave() {
        cacheDom.$wrapper.removeClass('fade-enter');
    }

    function bindLoginBtnEvent() {
        cacheDom.$loginBtn.click(function () {
            if ($(this).hasClass('active')) {
                loginBtnEventHandler();
            }
        });
    }

    function isLoginUrl(url) {
        if (url.indexOf("/user/logining.html") < 0 && url.indexOf("/user/login-binding.html") < 0) {
            return false;
        }
        return true;
    }

    function loginBtnEventHandler() {
        var param = getLoginRegisterParam();
        postLoginRegister(param);
    }

    function getLoginRegisterParam() {
        var reqBody = {};
        var account = getAccountVal();
        reqBody.account = Base64.encode(account);
        var password = getLoginPwdVal();
        reqBody.password = Base64.encode(MD5.md5(password));
        var param = {};
        param.reqBody = $.extend(optionsCache.data, reqBody);
        return param;
    }

    function postLoginRegister(param) {
        common.showLoading();
        $.ajax({
            url: ConstUtil.get("USER_URL") + "user/login",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            success: function (data) {
                loginSuccess(data);
            }
        });

        // common.ajax("POST", ConstUtil.get("USER_URL") + "user/login", param, respBodyFunc, function (data) {
        //     common.hideLoading();
        //     // if (data.code == 0) {
        //     //     common.setSessionStorage("rid", "");
        //     // } else {
        //     //     common.toast(data.msg)
        //     // }
        // }, function () {
        //     common.hideLoading();
        //     common.toast('网络繁忙,请稍后重试')
        // });
    }

    function respBodyFunc(data) {
        loginSuccess(data);
    }

    function loginSuccess(data) {
        var trackId = data.result;
        common.setSessionStorage("trackId", trackId);
        $(".submit").hide();
        $(".preSubnit").show();
        common.toast('登录成功');
        if (data.modifyPassword === true && optionsCache.isPage) {
            common.setSessionStorage("msgcode", getLoginCodeVal());
            common.setSessionStorage("account", Base64.encode(getAccountVal()));
            var url = "/user/forgot-password.html?fromFirstLogin=1";
            if (common.getQueryStr("coup")) {
                url = url + "&coup=1";
            }
            window.location.href = url;
        } else {
            common.setSessionStorage('up2m', '');
            common.setSessionStorage("rid", "");
            if (data.user && data.user.account) {
                common.setSessionStorage('account', Base64.encode(data.user.account));
            }
            var hisUrl = common.getSessionStorage('hisUrl');
            var mobile = common.getQueryStr("mobile"); //有此参数代表是更换手机号码跳转过来的
            if (!optionsCache.isPage) {
                hide();
                optionsCache.success(data);
            } else if (hisUrl && !isLoginUrl(hisUrl)) {
                common.setSessionStorage('hisUrl', "");
                common.setSessionStorage('registerBackUrl', "");
                common.setSessionStorage('currentPageLoginHisUrl', "");
                gotoPageUrl(hisUrl, "replace");
            } else if (mobile && mobile == 1) {
                gotoPageUrl("/user/account.html");
            } else {
                gotoPageUrl("/index.html");
            }
        }
    }

    function bindShowPwdBtnEvent() {
        cacheDom.$showPwdBtn.click(function () {
            if (cacheDom.$showPwdBtn.hasClass('active')) {
                cacheDom.$showPwdBtn.removeClass('active');
                cacheDom.$loginPwd.attr('type', 'password');
            } else {
                cacheDom.$showPwdBtn.addClass('active');
                cacheDom.$loginPwd.attr('type', 'text');
            }
        });
    }

    function bindAccountEvent() {
        cacheDom.$account.on('input propertychange ', function () {
            bindAccountEventHandler();
        });
        cacheDom.$account.click(function () {
            cacheDom.$account.focus()
        });
    }

    function bindLoginPwdEvent() {
        cacheDom.$loginPwd.on('input propertychange ', function () {
            loginBtnStatusHandler();
        });
        cacheDom.$loginPwd.click(function () {
            cacheDom.$loginPwd.focus()
        });
    }

    function bindLoginCodeEvent() {
        cacheDom.$loginCode.on('input propertychange ', function () {
            loginBtnStatusHandler();
        });
        cacheDom.$loginCode.click(function () {
            cacheDom.$loginCode.focus()
        });
    }

    function bindAccountEventHandler() {
        var val = cacheDom.$account.val();
        val = val.replace(/\D/g, '');
        cacheDom.$account.val(val);
        getCodeBtnStatusHandler(val);
        loginBtnStatusHandler();

    }

    function getCodeBtnStatusHandler(val) {
        if (loginType === 1) {
            return;
        }
        if (!val) {
            val = getAccountVal();
        }
        if (val.length >= 11 && _sendSmsRemainingTime == 60) {
            unDisableGetCodeBtn();
        } else {
            disableGetCodeBtn();
        }
    }

    function loginBtnStatusHandler() {
        var isPass = checkLoginBtnStatus();
        if (isPass) {
            cacheDom.$loginBtn.addClass('active');
        } else {
            cacheDom.$loginBtn.removeClass('active');
        }

    }

    function checkLoginBtnStatus() {
        var isPassAccount = checkAccount();
        if (!isPassAccount) {
            return false;
        }
        var isPassLoginSecret = false;
        if (loginType === 2) {
            isPassLoginSecret = checkLoginCode();
        } else {
            isPassLoginSecret = checkLoginPwd();
        }
        if (!isPassLoginSecret) {
            return false;
        }
        return true;
    }

    function checkLoginCode() {
        var code = getLoginCodeVal();
        if (code) {
            return true;
        }
        return false;
    }

    function checkLoginPwd() {
        var pwd = getLoginPwdVal();
        if (pwd && pwd.length >= 6) {
            return true;
        }
        return false;
    }

    function getAccountVal() {
        return $.trim(cacheDom.$account.val());
    }

    function getLoginCodeVal() {
        return $.trim(cacheDom.$loginCode.val());
    }

    function getLoginPwdVal() {
        return cacheDom.$loginPwd.val();
    }

    function checkAccount() {
        var account = getAccountVal();
        if (account.length !== 11) {
            return false;
        }
        return true;
    }

    function disableGetCodeBtn() {
        cacheDom.$getCodeBtn.removeClass('active');
    }

    function unDisableGetCodeBtn() {
        cacheDom.$getCodeBtn.addClass('active');
    }

    function bindPwdLoginBtnEvent() {
        cacheDom.$pwdLoginBtn.click(function () {
            changeLoginType('pwdLogin');
        });
    }

    function bindCodeLoginBtnEvent() {
        cacheDom.$codeLoginBtn.click(function () {
            changeLoginType('codeLogin');
        });
    }

    function bindChangeRegisterBtnEvent() {
        cacheDom.$changeRegisterBtn.click(function () {
            changeLoginType('codeLogin');
        });
    }

    function changeLoginType(type) {
        cacheDom.$loginBox.removeClass('codeLogin pwdLogin').addClass(type);
        if (type == 'codeLogin') {
            loginType = 2;
            clearLoginCode();
        } else {
            loginType = 1;
            clearLoginPwd();
        }
        getCodeBtnStatusHandler();
    }

    function clearLoginPwd() {
        cacheDom.$loginPwd.val('');
        loginBtnStatusHandler();
    }

    function clearLoginCode() {
        cacheDom.$loginCode.val('');
        loginBtnStatusHandler();
    }

    function sendSms() {
        var account = getAccountVal();
        if (!checkAccount()) {
            common.toast('请输入正确的手机号码');
            return;
        }
        account = Base64.encode(account);

        var url = "/app/user/smsgcode";
        var params = {
            "reqBody": "{'account':'" + account + "'}"
        };
        disableGetCodeBtn();
        common.ajax("GET", url, params, null, sendsmscallback, function () {
            common.toast('网络繁忙,请重试');
            unDisableGetCodeBtn();
        });
    }

    function sendsmscallback(data) {
        if (data.resultCode === 0) {
            common.toast('验证码发送成功');
            _sendSmsTimer = setInterval(function () {
                runSendSmsTimer()
            }, 1000);
        } else {
            common.toast(data.message);
        }
    }

    function runSendSmsTimer() {
        _sendSmsRemainingTime -= 1;
        renderRemainingTime();
    }

    function renderRemainingTime() {

        if (_sendSmsRemainingTime > 0) {
            var _text = '重新发送(' + _sendSmsRemainingTime + ')';
            cacheDom.$getCodeBtn.html(_text);
            disableGetCodeBtn();
        } else {
            resetSendSmsStatus('重新发送');
            unDisableGetCodeBtn();
        }
    }

    function resetSendSmsStatus(btnText) {
        btnText = btnText ? btnText : '获取验证码';
        cacheDom.$getCodeBtn.html(btnText);
        clearInterval(_sendSmsTimer);
        _sendSmsRemainingTime = 60;
        getCodeBtnStatusHandler();
    }

    function sendVoiceSms() {
        if (!checkAccount()) {
            common.toast('请输入正确的手机号');
            return;
        }

        var account = getAccountVal();

        account = Base64.encode(account);

        var url = "/app/user/sms/voice/{" + account + "}";

        common.showLoading();
        disableGetCodeBtn();
        common.ajax("GET", url, null, null, sendVoiceSmscallback, function () {
            common.toast('网络繁忙,请重试');
            common.hideLoading();
            unDisableGetCodeBtn();
        });
    }

    function sendVoiceSmscallback(data) {
        common.hideLoading();
        unDisableGetCodeBtn();
        if (data.resultCode === 0) {
            if (optionsCache.isPage !== true) {
                common.toast('我们将以电话形式告知您<br>验证码');
            } else {
                alert('我们将以电话的形式告知您验证码<br/> 请注意接听', null, '我知道了', 'loginAlert');

            }
            if (_sendSmsRemainingTime !== 60) {
                clearInterval(_sendSmsTimer);
            }
            _sendSmsRemainingTime = 60;
            _sendSmsTimer = setInterval(function () {
                runSendVoiceSmsTimer()
            }, 1000);
        } else {
            common.toast(data.message);
        }
    }

    function showVoiceCodeWrapper() {
        cacheDom.$voiceCodeWrapper.removeClass('hide');
    }

    function hideVoiceCodeWrapper() {
        cacheDom.$voiceCodeWrapper.addClass('hide');
    }

    function runSendVoiceSmsTimer() {
        _sendSmsRemainingTime -= 1;
        if (_sendSmsRemainingTime < 1) {
            showVoiceCodeWrapper();
        } else {
            hideVoiceCodeWrapper();
        }
        renderRemainingTime();
    }

    $.extend({
        showLoginPopup: function (options) {
            var _options = $.extend({
                id: 'body',
                mask: true,
                type: 'default',
                isPage: false,
                backFn: function () {
                },
                success: function () {
                },
                data: {},
            }, options);

            return init(_options);
        }
    });
})(jQuery || $);
