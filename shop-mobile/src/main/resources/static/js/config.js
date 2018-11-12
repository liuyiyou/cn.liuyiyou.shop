var ConstUtil = (function () {
    var constants = {// 定义了两个常量
        DOMAIN: "http://localhost:8080",
        PIC_DOMAIN: "http://oss.yanglaoban.com/",
        WECHAT_QRCODE: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=",
        MIN_PIC_SIZE: "@115w_115h",
        MAX_PIC_SIZE: "@500w_500h",
        BASE_URL:"http://localhost:10010/",
        PROD_URL:"http://localhost:10000/",
        USER_URL:"http://localhost:10001/",
        ORDER_URL:"http://localhost:10002/"
    }
    var Func = {};
    // 定义了一个静态方法
    Func.get = function (name) {// 获取常量的方法
        return constants[name];
    }
    return Func
})();