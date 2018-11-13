/**
 * Created by oukeye on 2018/9/28.
 */
;(function ($) {
    var cacheDom = {};
    var loadProdMap = {};
    var pageSize = 10;
    var swiperCache = {
        navLength: 0
    };
    var currentNav = {
        index: 0
    };
    var cacheNavs = [];
    var cacheMe = {
        moveY: 0,
    };
    var isEnding = false;
    var cacheOptions = null;

    function init(options) {
        cacheOptions = options
        cacheDom.$wrapper = cacheOptions.wrapper;
        renderHtml();
        initDom();
        initEvent();
        initAction();
    }

    // 业务行为
    function initAction() {
        if (cacheOptions.navs.length == 0) {
            loadNav();
        } else {
            rendNav(cacheOptions.navs);
        }

    }

    function renderHtml() {
        var _title = '';
        if (cacheOptions.hasTitle) {
            _title = '<div class="pluginNavTitleWrapper"><h3 class="pluginNavTitle">优选 品质</h3><p class="pluginNavSubTitle">聚集全球最in的商品</p></div>';
        }
        cacheDom.$wrapper.html('<div class="pluginNavProdListWrapper">' + _title + '<div class="navSwiper" id="pluginNavSwiper"><div class="swiper-wrapper pluginNavSwiperWrapper"></div></div><div class="pluginNavProdListBox"><div class="prodListSwiper" id="prodListSwiper"><div class="swiper-wrapper prodListSwiperWrapper"></div></div><div class="loading-tips"><span class="line"></span><span class="txt">已经到底了</span></div></div></div>');
    }

    function initDom() {
        cacheDom.$wrapper = cacheOptions.wrapper;
        cacheDom.$pluginNavTitleWrapper = cacheDom.$wrapper.find('.pluginNavTitleWrapper');
        cacheDom.$pluginNavProdListWrapper = cacheDom.$wrapper.find('.pluginNavProdListWrapper');
        cacheDom.$pluginNavSwiper = cacheDom.$wrapper.find('.navSwiper');
        cacheDom.$pluginNavProdListBox = cacheDom.$wrapper.find('.pluginNavProdListBox');
        cacheDom.$navSwiper = cacheDom.$wrapper.find('.pluginNavSwiperWrapper');
        cacheDom.$prodListSwiper = cacheDom.$wrapper.find('.prodListSwiperWrapper');
        cacheDom.$loadingTipsTxt = cacheDom.$wrapper.find('.loading-tips .txt');
        cacheDom.$loadingTips = cacheDom.$wrapper.find('.loading-tips');
    }

    function initEvent() {
        bindWindowScrollEvent();
        bindDragListEvent();
        bindCartBtnEvent();
    }

    function setMinHeight() {
        // var titleHeight = cacheDom.$pluginNavTitleWrapper.height();
        var _minHeight = cacheOptions.minHeight;
        if (_minHeight) {
            // cacheDom.$pluginNavProdListWrapper.css('min-height', _minHeight + titleHeight);
            cacheDom.$pluginNavProdListBox.css('min-height', _minHeight);
        }
        isSetMinHeight = true;
    }

    function bindWindowScrollEvent() {
        var navHeight = cacheOptions.offsetTop;
        var viewH = $(window).height();//可见高度
        var _win = $(window);
        var titleHeight = cacheDom.$pluginNavTitleWrapper.height();
        _win.scroll(function () {
            var scrollTop = _win.scrollTop();

            var navSwiperTop = cacheDom.$wrapper.offset().top - navHeight + titleHeight;
            if (scrollTop > navSwiperTop) {
                cacheDom.$pluginNavProdListWrapper.addClass('nav-swiper-fixed');
                cacheDom.$pluginNavSwiper.css('top', navHeight + 'px');
            } else {
                cacheDom.$pluginNavProdListWrapper.removeClass('nav-swiper-fixed');
                cacheDom.$pluginNavSwiper.css('top', '');
            }
            checkBottomLoadProd(viewH, _win);
        });
    }

    function checkBottomLoadProd(viewH, win) {

        var nav = loadProdMap[currentNav.navId];
        if (!nav) {
            console.log('缓存数据为空');
            return;
        }

        if (nav.page > nav.totalPage) {
            showListEnding();
            return;
        }

        var _win = win || $(window);
        var scrollTop = _win.scrollTop();
        var contentH = $(document).height();//内容高度
        if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容
            loadProd(currentNav.navId);
        } else {
            isEnding && (isEnding = false);
        }
    }

    function bindNavBtnEvent() {
        cacheDom.$navSwiper.on('click', '.swiper-slide', function () {
            var _$this = $(this);
            if (_$this.hasClass('pluginNavProdActive')) return;
            _$this.addClass('pluginNavProdActive').siblings().removeClass('pluginNavProdActive');
            var navId = _$this.attr('navid');
            var index = _$this.attr('index');
            changeNav(index, navId);
        })
    }

    function bindDragListEvent() {
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('mouseup', touchEndEvent); // PC端鼠标抬起事件
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('mouseleave', touchEndEvent); // PC端鼠标离开事件
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('touchend', touchEndEvent); // 移动端手指事件
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('touchcancel', touchEndEvent); // 移动端系统停止跟踪触摸

        cacheDom.$pluginNavProdListWrapper[0].addEventListener('mousedown', touchStartEvent); // PC端鼠标事件
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('touchstart', touchStartEvent); // 移动端手指事件

        // 移动端手指的滑动事件
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('mousemove', touchMoveEvent, {
            passive: false
        });
        cacheDom.$pluginNavProdListWrapper[0].addEventListener('touchmove', touchMoveEvent, {
            passive: false
        });
    }

    function changeNavActive(index) {
        var silides = cacheDom.$navSwiper.find(".swiper-slide");
        var _$this = $(silides[index]);
        _$this.addClass('pluginNavProdActive').siblings().removeClass('pluginNavProdActive');
    }

    function changeNav(index, navId) {
        currentNav = {
            navId: Number(navId),
            index: Number(index)
        };
        swiperCache['prodListSwiper'].slideTo(index, 300, true);
        animateFixedTop();
        navSwiperCenter();
    }

    function changeProdSileSuccess() {
        var nav = loadProdMap[currentNav.navId];
        if (nav.page <= 1) {
            loadProd(currentNav.navId);
        } else {
            var viewH = $(window).height();//可见高度
            checkBottomLoadProd(viewH);
        }
    }

    function navSwiperCenter() {
        if (swiperCache['navLength'] > 5) {
            var index = currentNav.index;
            if (index >= 1) {
                index = index - 2;
                swiperCache['navSwiper'].slideTo(index, 300, false);
            }
        }
    }

    function animateFixedTop() {
        if (isFixed()) {
            var navHeight = cacheOptions.offsetTop;
            var titleHeight = cacheDom.$pluginNavTitleWrapper.height();
            var navSwiperTop = cacheDom.$wrapper.offset().top - navHeight + titleHeight;
            $("html,body").animate({scrollTop: navSwiperTop + "px"}, 0);
        }
    }

    function loadNav() {
        common.ajax('GET', ConstUtil.get("BASE_URL") + 'nav4boss/v2/selectednavs', '', function (respBody) {
            if (respBody.navs && respBody.navs.length > 0) {
                rendNav(respBody.navs);
            } else {

            }
        });
    };

    function cacheLoadProdMap(item, index) {
        var _item = $.extend({
            navId: 0,
            page: 1,
            isLoading: false,
            index: index
        }, item);
        loadProdMap[item.navId] = _item;
    }

    var isSetMinHeight = false;

    function rendNav(navs) {
        var _len = navs && navs.length || 0;
        if (_len > 0) {
            cacheNavs = navs;

            var activeClassName = '';
            var _prodListWrapper = '';

            var swiperWrapperHtml = navs.map(function (item, index) {

                if (index == 0) {
                    activeClassName = " pluginNavProdActive"
                } else {
                    activeClassName = '';
                }

                cacheLoadProdMap(item, index);

                var navItemClassName = ' swiperSlide' + item.navId;

                var iconUrl = item.icon;

                if (!new RegExp(/^\/images\/(.)*$/).test(item.icon)) {
                    iconUrl = ConstUtil.get('PIC_DOMAIN') + item.icon;
                }

                var _html = '<div class="swiper-slide' + activeClassName + navItemClassName + '" navid="' + item.navId + '" index="' + index + '">' + '<img src="' + iconUrl + '"/>' + '<span>' + item.navName + '</span>' + '</div>';

                var _htmlContent = '<div class="swiper-slide swiper-no-swiping prodList' + activeClassName + navItemClassName + '" navId="' + item.navId + '"></div>';
                _prodListWrapper += _htmlContent;

                return _html;
            }).join('');

            if (swiperWrapperHtml) {
                cacheDom.$navSwiper.html(swiperWrapperHtml);
                if (_len < 5) {
                    cacheDom.$navSwiper.addClass('middleFlat');
                }
                swiperCache['navLength'] = _len;
                swiperCache['navSwiper'] = new Swiper('#pluginNavSwiper', {
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    freeMode: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                });
                bindNavBtnEvent();

                cacheDom.$prodListSwiper.html(_prodListWrapper);

                swiperCache['prodListSwiper'] = new Swiper('#prodListSwiper', {
                    autoHeight: true,
                    noSwiping: true,
                    effect: 'fade',
                    fade: {
                        crossFade: true,
                    },
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    on: {
                        slideChangeTransitionEnd: function () {
                            changeProdSileSuccess();
                        },
                    }
                });

                // swiperCache['navSwiper'].params.control = swiperCache['prodListSwiper'];
                // swiperCache['prodListSwiper'].params.control = swiperCache['navSwiper'];
            }
            var fristNavId = navs[0].navId;
            changeNav(0, fristNavId);
            loadProd(fristNavId);
        }
        setMinHeight();
    }

    function loadProd(navId) {

        var nav = loadProdMap[navId];
        if (!nav) {
            console.log('缓存数据为空');
            return;
        }

        if (nav.page > nav.totalPage) {
            showListEnding();
            return;
        }

        if (nav['isLoading']) {
            return;
        }
        nav['isLoading'] = true;

        var reqBody = {};
        reqBody.page = nav.page;
        reqBody.pageSize = pageSize;
        reqBody.navId = nav.navId;


        // 获取菜单上的动态参数
        var navReq = nav.req || {};

        reqBody = $.extend(reqBody, navReq);

        var params = {};

        var _method = cacheOptions.prodAjaxParams && cacheOptions.prodAjaxParams.method || 'GET';

        if (_method == 'GET' || _method == 'get') {
            params.reqBody = JSON.stringify(reqBody);
        } else {
            params.reqBody = reqBody;
        }

        showListLoading();

        var _url = cacheOptions.prodAjaxParams && cacheOptions.prodAjaxParams.url || ConstUtil.get("PROD_URL") + "homePageProd/v2/selectednavs/prods";

        var prodsName = cacheOptions.prodsName || 'prods';

        common.ajax(_method, _url, params,
            function (respBody) {
                nav['isLoading'] = false;
                var prodList = respBody[prodsName];
                if (prodList && prodList.length > 0) {
                    nav.page += 1;
                    nav.totalPage = respBody.totalPage;
                    if (respBody.page >= respBody.totalPage) {
                        showListEnding();
                    }
                    renderProd(nav, prodList);
                } else {
                    if (reqBody.page == 1) {
                        noProds(nav);
                    }
                }
            }, null, function () {
                nav['isLoading'] = false;
            });
    }

    function showNextNavProd() {
        var index = currentNav.index + 1;
        var nav = cacheNavs[index];
        if (nav) {
            changeNavActive(index);
            changeNav(index, nav.navId);
        }
    }

    function showListLoading() {
        showListTxt('加载中');
    }

    function showListEnding() {
        showListTxt('已经到底了');
        isEnding = true;
    }

    function showListTxt(text) {
        cacheDom.$loadingTipsTxt.html(text);
    }

    function renderProd(nav, prodList) {
        var swiperSlide = '.swiperSlide' + nav.navId;
        var _wrapper = cacheDom.$prodListSwiper.find(swiperSlide);

        var _keyMap = $.extend({
            pic: 'pic',
            prodPrice: 'prodPrice',
            prodName: 'prodName',
            prodId: 'prodId',
            hasCart: true,
        }, cacheOptions.prodAttrMap);

        var _html = common.getProdItemHtml(prodList, _keyMap);
        _wrapper.append(_html);
        var prodListSwiper = swiperCache['prodListSwiper'];
        prodListSwiper && prodListSwiper.update && prodListSwiper.update();

    }

    function noProds() {
        showListTxt('暂无商品');
        isEnding = true;
    }

    function isFixed() {
        return cacheDom.$pluginNavProdListWrapper.hasClass('nav-swiper-fixed');
    }

    function bindCartBtnEvent() {
        $.fn.cartInList && cacheDom.$prodListSwiper.cartInList();
    }

    function getPoint(e) {
        return {
            x: e.touches ? e.touches[0].pageX : e.clientX,
            y: e.touches ? e.touches[0].pageY : e.clientY
        }
    }

    // 鼠标或手指的按下事件
    function touchStartEvent(e) {
        cacheMe.startPoint = getPoint(e); // 记录起点
    }

    // 鼠标或手指的滑动事件
    function touchMoveEvent(e) {
        if (!cacheMe.startPoint || !isEnding) return;

        if (currentNav.index == cacheNavs.length - 1) {
            return;
        }

        var curPoint = getPoint(e); // 当前点

        var moveY = curPoint.y - cacheMe.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
        // 向上拉
        cacheMe.moveY = moveY;
        if (moveY < 0) {
            cacheDom.$pluginNavProdListBox.css('transform', 'translate3d(0,' + moveY + 'px,0)');
        }

        cacheMe.lastPoint = curPoint; // 记录本次移动的点
    }

    // 鼠标或手指的离开事件
    function touchEndEvent() {
        cacheDom.$pluginNavProdListBox.css('transform', '');
        if (!cacheMe.startPoint || !isEnding) {
            return;
        }
        if (Math.abs(cacheMe.moveY) >= 80) {
            showNextNavProd();
        }
        cacheMe.moveY = 0;
        cacheMe.startPoint = null;
    }

    $.fn.extend({
        navProdList: function (options) {
            var _options = $.extend({
                wrapper: this,
                minHeight: 0,
                offsetTop: 0,//距离顶部距离，即顶部导航高度
                navs: [],
                ajaxParams: null,
                hasTitle: true,
                prodAttrMap: {},
            }, options);
            return init(_options);
        }
    });
})(jQuery || $);

