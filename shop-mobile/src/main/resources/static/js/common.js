
$(document).ready(function () {
    $(function(){
        $('.wy-header-icon-back').on('click', function () {
            commonGoBack();
        });
    });
});



function commonGoBack() {
    navigator.userAgent.indexOf("MSIE") >= 0 && navigator.userAgent.indexOf("Opera") < 0 ? "" === document.referrer ? gotoPageUrl("/") : historyGo() : (navigator.userAgent.indexOf("Firefox") >= 0 || navigator.userAgent.indexOf("Opera") >= 0 || navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("WebKit") >= 0) && "" === document.referrer ? (window.opener = null,
        gotoPageUrl("/")) : historyGo(),
        setTimeout(function () {
            gotoPageUrl("/")
        }, 3e3)
}

function getQueryStr(name) {
    var url = location.href;
    var rs = new RegExp("(^|)" + name + "=([^\&]*)(\&|$)", "gi").exec(url),
        tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
};

function historyGo() {
    var e = document.referrer
        , t = e.indexOf("/oauth.html");
    t > 0 ? gotoPageUrl("/") : -1 !== e.indexOf("mclient.alipay.com") ? gotoPageUrl("/index.html") : window.history.go(-1)
}

function gotoPageUrl(e, t) {
    "replace" == t ? window.location.replace(e) : window.location.href = e
}


var getSessionStorage = function (key) {
    return getCookie(key);
};
var setSessionStorage = function (key, value) {
    try {
        setCookie(key, value);
    } catch (e) {
        console.log("用户禁用了sessionStorage");
    }
};

var getCookie = function (Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
}

var setCookie = function (name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + "; path=/";
}

var deleteCookie = function (name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}
