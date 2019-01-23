$.ready(function () {


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

/*****************************************************************
 jQuery Ajax封装通用类  (linjq)
 *****************************************************************/
$(function () {
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.commonAjax = function (url, data, async, type, dataType, successfn, errorfn) {
        async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
        type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
        dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
        $.ajax({
            type: type,
            async: async,
            data: data,
            url: url,
            dataType: dataType,
            success: function (d) {
                successfn(d);
            },
            error: function (e) {
                errorfn(e);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    jQuery.axs = function (url, data, successfn) {
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function (d) {
                successfn(d);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.axse = function (url, data, successfn, errorfn) {
        data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function (d) {
                successfn(d);
            },
            error: function (e) {
                errorfn(e);
            }
        });
    };


});