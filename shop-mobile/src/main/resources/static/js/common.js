var $_ERROE_CODE = '3000';
var $_SUCCESS_CODE = '0';

// FastClick库
(function () {

    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/

    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                        if (!event.propagationStopped) {
                            callback(event);
                        }
                    }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            try {
                event.preventDefault();
            } catch (e) {

            }
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function () {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());

// Array.map 方法
(function () {
    if (!Array.prototype.map) {
        Array.prototype.map = function (fun) {
            var len = this.length;
            if (typeof fun != "function")
                throw new TypeError();

            var res = new Array(len);
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this)
                    res[i] = fun.call(thisp, this[i], i, this);
            }
            return res;
        };
    }
})();

function weixinReady() {
    var _pathname = window.location.pathname;
    //只有 地址是/user/register-bindings.html 微信端注册账号才有同步
    oauth(_pathname !== '/user/login.html');
    initWxInf();
}

$(function () {
    FastClick.attach(document.body);
    if (common.isWeixin()) {
        if (wx.miniProgram && wx.miniProgram.getEnv) {
            wx.miniProgram.getEnv(function (res) {
                var isMini = res.miniprogram;
                common.setMini(isMini);
                if (!isMini) {
                    weixinReady();
                }
            });
        } else {
            weixinReady();
        }
    }
    if (!isProdDetailsPageUrl()) {
        clientService();
    }
    //隐藏友盟统计
    if ($("[href='http://www.cnzz.com/stat/website.php?web_id=1260629455']")[0]) {
        $("[href='http://www.cnzz.com/stat/website.php?web_id=1260629455']")[0].hidden = true;
        $("[href='http://www.cnzz.com/stat/website.php?web_id=1260629455']")[0].innerHTML = "";
    }

});


function initWxInf() {
    wx && wx.ready(function () {
        wx.hideOptionMenu();
        wx.showMenuItems({
            menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });

    var params = {
        "reqBody": {url: window.location.href}
    };
    var param = JSON.stringify(params);
    $.ajax({
        type: "POST",
        url: "/app/weixin/getsignpackage",
        dataType: "json",
        contentType: "application/json",
        data: param,
        async: false,
        success: function (data) {
            var result = eval(data);
            var data = result.respBody;

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'getNetworkType',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay'
                ]
            });
        }
    });
}

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function () {
        var context = scope || this;
        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function oauth(async) {
    var openId = common.getSessionStorage("openId");
    if (openId == undefined || openId == null || openId == "") {
        openId = common.getQueryStr("openId");
    }
    if (common.isWeixin() && (openId == undefined || openId == null || openId == "")) {
        var target = common.getSessionStorage("hisUrl");
        if (target == undefined || target == null || target == "") {
            target = location.href;
        }

        target = target.replace(ConstUtil.get("DOMAIN"), "");

        //不能传授权页面
        if (target.indexOf("https://open.weixin.qq.com") > -1) {
            target = "/index.html"
        }
        var body = new Object();

        //如果是授权失败的再次授权，需要把这个传进去
        var reParamsId = common.getSessionStorage("reParamsId");
        if (undefined != reParamsId && null != reParamsId && reParamsId != "") {
            body.reParamsId = reParamsId;
        }


        body.target = target;

        var params = new Object();
        params.reqBody = JSON.stringify(body);
        if (typeof async === 'undefined') {
            async = true;
        }
        common.ajax("GET", "/app/weixin/oauthurl", params, function (respBody) {
            common.setSessionStorage("reParamsId", "");
            // location.href = respBody.oauthUrl;
            gotoPageUrl(respBody.oauthUrl);
        }, null, null, null, async);
    }
}


var ajaxLock = "";
var callbackCacheListObj = {};
var common = (function ($) {
    /*生成请求的key*/
    var getKey = function (method, url, param) {
        var key = method + url;
        if (param) {
            key += JSON.stringify(param);
        }
        return "ajaxLock" + key + "ajaxLock";
    };
    var getReqBodyShopId = function () {
        var shopPreview = common.getQueryStr('shopPreview');
        var shareShopPreview = common.getQueryStr('shareShopPreview');
        var reqBodyShopId = '';
        //缓存存在shopId 并且有店铺标识
        if (shareShopPreview) {
            reqBodyShopId = shareShopPreview;
        } else if (shopPreview) {
            reqBodyShopId = shopPreview;
        }
        return decodeURI(reqBodyShopId);
    }
    var ajax = function (method, url, param, callbackWithBody, callbackWithHead, onerror, cache, async) {
        var cacheKey;
        var _callbackMD5 = MD5.md5(callbackWithBody ? callbackWithBody.toString() : "" + callbackWithBody ? callbackWithHead.toString() : "" + callbackWithBody ? onerror.toString() : "");

        if (cache) {
            cacheKey = url + JSON.stringify(param) + Math.floor((new Date().getTime()) / (300 * 1000));
            var val = window.localStorage.getItem(cacheKey);
            if (val) {
                var cacheData = JSON.parse(val);
                if (callbackWithBody && cacheData.respBody) {
                    callbackWithBody(cacheData.respBody);
                }
                if (callbackWithHead) {
                    callbackWithHead(cacheData.respHeader);
                } else {
                    if (cacheData.respHeader.resultCode != 0) {
                        alert(cacheData.respHeader.message);
                    }
                }
                return;
            } else {
            }
        }

        var key = getKey(method, url, param);
        if (typeof this.promise_ == "undefined") {
            this.promise_ = {};
        }
        //使用jquery ajax() 返回的promise对象进行拦截相同接口地址详情参数的请求
        if (this.promise_[key] && this.promise_[key].state() === 'pending') {
            var callbackCache = function (respBody, respHeader, XMLHttpRequest, textStatus, errorThrown) {
                callbackWithBody && callbackWithBody(respBody);
                callbackWithHead && callbackWithHead(respHeader);
                onerror && onerror(XMLHttpRequest, textStatus, errorThrown);
            };
            // 根据  请求地址和参数 + 请求回调方法的MD5值  作为Kye 缓存处理方法
            callbackCacheListObj[key + _callbackMD5] = callbackCache;
            return this.promise_[key];
        }
        ajaxLock += key;

        var paramStr = JSON.stringify(param);
        if (method == "GET") {
            paramStr = param;
        }

        if (typeof async === 'undefined') {
            async = true;
        }

        this.promise_[key] = $.ajax({
            url: url, // 跳转到 action
            data: paramStr,
            type: method,
            cache: false,
            contentType: "application/json",
            dataType: 'json',
            async: !!async,
            success: function (data) {
                window.localStorage.setItem(cacheKey, JSON.stringify(data));
                ajaxLock = ajaxLock.replace(key, "");

                /*营销接口返回的数据判断*/
                var message = data.message;
                var success = data.success;

                if (success === false && message == "needLogin") {
                    goLogin(url, method);
                    return;
                }
                if (success === false && message == "needRoles") {
                    toast("无权限执行此操作");
                    return;
                }
                /*营销接口返回的数据判断*/

                if (callbackWithHead) {
                    callbackWithHead(data.respHeader);
                } else {
                    if (data.respHeader.resultCode != 0) {
                        alert(data.respHeader.message);
                    }
                }
                if (callbackWithBody && data.respBody) {
                    callbackWithBody(data.respBody);
                }

                // 根据接口地址和参数查询缓存是否有相同的接口请求处理页面
                for (var _key in callbackCacheListObj) {
                    if (_key.indexOf(key) >= 0) {
                        var _fn = callbackCacheListObj[_key];
                        _fn && _fn(data.respBody, data.respHeader);
                        _fn = null;
                        callbackCacheListObj[_key] = null;
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                ajaxLock = ajaxLock.replace(key, "");
                if (onerror)
                    onerror(XMLHttpRequest, textStatus, errorThrown);

                for (var _key in callbackCacheListObj) {
                    if (_key.indexOf(key)) {
                        var _fn = callbackCacheListObj[_key];
                        _fn && _fn(null, null, XMLHttpRequest, textStatus, errorThrown);
                    }
                }

            }
        });
        return this.promise_[key];
    };

    var goLogin = function (url, type) {
        common.setSessionStorage("trackId", "");
        common.setSessionStorage("isParent", "");
        var hisUrl = window.location.href;
        common.setSessionStorage("hisUrl", hisUrl);
        var openId = common.getSessionStorage("openId");
        if (url == "/app/busi/activity/cartinf" && type == "POST") {
            common.setSessionStorage("isAddCart", "1");
        }
        if (common.isWeixin()) {
            gotoPageUrl("/user/login-binding.html", "replace");
        } else {
            gotoPageUrl("/user/login.html", "replace");

        }
    };

    var validatePhone = function (account) {
        var re = new RegExp(/^[1][0-9]{10}$/);
        if (!re.test(account)) {
            return false
        } else {
            return true;
        }
    }

    //获取连接中的参数
    var getQueryStr = function (name) {
        var url = location.href;
        var rs = new RegExp("(^|)" + name + "=([^\&]*)(\&|$)", "gi").exec(url),
            tmp;
        if (tmp = rs) {
            return tmp[2];
        }
        return "";
    };


    /* 获取URL上的get参数 */
    var getRequestParams = function () {
        var url = window.location.search; // 获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf('?') !== -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    };
    var formatDate = function (pattern, date) {
        //如果不设置，默认为当前时间
        if (!date) date = new Date();
        if (typeof(date) === "string") {
            if (date == "") date = new Date();
            else date = new Date(date.replace(/-/g, "/"));
        }
        /*补00*/
        var toFixedWidth = function (value) {
            var result = 100 + value;
            return result.toString().substring(1);
        };

        /*配置*/
        var options = {
            regeExp: /(yyyy|M+|d+|h+|m+|s+|ee+|ws?|p)/g,
            months: ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September',
                'October', 'November', 'December'],
            weeks: ['Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday',
                'Saturday']
        };

        /*时间切换*/
        var swithHours = function (hours) {
            return hours < 12 ? "AM" : "PM";
        };

        /*配置值*/
        var pattrnValue = {
            "yyyy": date.getFullYear(),                      //年份
            "MM": toFixedWidth(date.getMonth() + 1),           //月份
            "dd": toFixedWidth(date.getDate()),              //日期
            "hh": toFixedWidth(date.getHours()),             //小时
            "mm": toFixedWidth(date.getMinutes()),           //分钟
            "ss": toFixedWidth(date.getSeconds()),           //秒
            "ee": options.months[date.getMonth()],           //月份名称
            "ws": options.weeks[date.getDay()],              //星期名称
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "h": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "p": swithHours(date.getHours())
        };

        return pattern.replace(options.regeExp, function () {
            return pattrnValue[arguments[0]];
        });
    };

    //本地存储
    var setStorage = function (key, value) {
        var lcstor = window.localStorage;
        if (lcstor)
            lcstor[key] = value;
    };

    var getStorage = function (key) {
        var lcstor = window.localStorage;
        if (lcstor) {
            for (i in lcstor) {
                if (i == key)
                    return lcstor[i];
            }
        }
    };

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

    var setSessionStorageByExpires = function (key, value, expireMillSeconds) {
        try {
            setCookieByExpires(key, value, expireMillSeconds);
        } catch (e) {
            console.log("用户禁用了sessionStorage");
        }
    };

    var limitInputEnCn = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            $("#" + id).val(value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, ""));
        });
    }

    var truncAndEllipsis = function (str, len) {
        var finalStrLen = 0;
        var finalStr = "";

        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                finalStrLen += 2;
            } else {
                finalStrLen++;
            }
            finalStr += str.charAt(i);
            if (finalStrLen >= len) {
                return finalStr + "...";
            }
        }
        return finalStr;

    }


    /************************************************************************
     |    函数名称： setCookie                                                |
     |    函数功能： 设置cookie函数                                            |
     |    入口参数： name：cookie名称；value：cookie值                        |
     *************************************************************************/
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

    /************************************************************************
     |    函数名称： setCookie                                                |
     |    函数功能： 设置cookie函数                                            |
     |    入口参数： name：cookie名称；value：cookie值  expires: 过期时间(毫秒)|
     *************************************************************************/
    var setCookieByExpires = function (name, value, expires) {
        var LargeExpDate = new Date();
        if (expires != null) {
            LargeExpDate.setTime(LargeExpDate.getTime() + expires);
        }
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + "; path=/";
    }

    /************************************************************************
     |    函数名称： getCookie                                                |
     |    函数功能： 读取cookie函数                                            |
     |    入口参数： Name：cookie名称                                            |
     *************************************************************************/
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

    /************************************************************************
     |    函数名称： deleteCookie                                            |
     |    函数功能： 删除cookie函数                                            |
     |    入口参数： Name：cookie名称                                        |
     *************************************************************************/
    var deleteCookie = function (name) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        setCookie(name, "", expdate);
    }

    var isWeixin = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    };

    var isTerminal = function () {
        var data = common.getQueryStr("data");
        var terminalId = null;
        if (data) {
            data = decodeURIComponent(data);
            data = JSON.parse(data);
            terminalId = data.terminalId;
        } else {
            terminalId = common.getQueryStr("terminalId");
        }

        if (terminalId) {
            return true;
        }

        return false;
    }

    var isNotEmptyString = function (str) {
        if (str != undefined && str != "" && str != null) {
            return true;
        }
        return false;
    }

    var changeParam = function (name, value) {

        var url = window.location.href;
        var newUrl = "";

        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match("[\?]")) {
                newUrl = url + "&" + tmp;
            } else {
                newUrl = url + "?" + tmp;
            }
        }

        // location.href = newUrl;
        gotoPageUrl(newUrl);
    };
    var changeParams = function (url, name, value) {

        var newUrl = "";

        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match("[\?]")) {
                newUrl = url + "&" + tmp;
            } else {
                newUrl = url + "?" + tmp;
            }
        }

        return newUrl;
    };

    var toast = function (text, second, typeClass) {
        var tipID = document.getElementById('_commonToast');
        if (!tipID) {
            tipID = document.createElement('div');
            tipID.setAttribute('id', '_commonToast');
            document.getElementsByTagName('body')[0].appendChild(tipID);
        }
        ;
        tipID.innerHTML = text;
        if (typeClass) {
            tipID.className = typeClass;
        } else {
            tipID.className = '';
        }
        tipID.style.display = 'block';
        typeof tipTimeOut != 'undefined' && tipTimeOut && clearTimeout(tipTimeOut);
        window.tipTimeOut = setTimeout(function () {
            tipID.style.display = 'none';
        }, (second || 2) * 1000);
    };
    /*跳转到登录页*/
    var toLogin = function () {
        if (isWeixin() == false) {
            //非微信内置浏览器
            setSessionStorage("hisUrl", location.href);
            gotoPageUrl("/user/login.html", "replace");
        } else {
            //微信内置浏览器
            setSessionStorage("hisUrl", location.href);
            gotoPageUrl("/user/login-binding.html", "replace");
        }
    };
    //登录页面可以返回当前页面
    var currentPageLogin = function () {
        setSessionStorage("currentPageLoginHisUrl", location.href);
        //登录页面，按返回按钮跳转地址
        if (isWeixin() == false) {
            //非微信内置浏览器
            setSessionStorage("hisUrl", location.href);
            gotoPageUrl("/user/login.html", "replace");
        } else {
            //微信内置浏览器
            setSessionStorage("hisUrl", location.href);
            gotoPageUrl("/user/login-binding.html", "replace");
        }
    };
    var showLoading = function (text) {
        if (!text) {
            text = "加载中..."
        }
        var tipID = document.getElementById('_commonLoading');
        if (!tipID) {
            var _html = "<div id='_commonLoading'>" +
                "<div class='loadingWrapper'>" +
                "<div class='icon'></div>" +
                "<div class='text'>" + text + "</div>" +
                "</div>" +
                "</div>";
            var $tipID = $(_html);
            $("body").append($tipID);
            tipID = $tipID[0];
        } else {
            $(tipID).fadeIn();
        }
        $(tipID).find(".text").html(text);

        return tipID;
    };
    var hideLoading = function () {
        $("#_commonLoading").fadeOut();
    };

    var countActionSheetId = 0;
    var showActionSheet = function (obj) {

        var _obj = {
            title: '标题',
            contentHtml: '',
            confirmName: '确定',
            subTitle: '',
            class: '',
            actionFn: function () {
            },
            cancelFn: function () {
            }
        };

        var _app = {};
        _app.hide = function () {

            _$dom.find('.actionSheet').removeClass('actionSheetEnter');
            $("body").removeClass('body-overflow');
            setTimeout(function () {
                _$dom.hide();
            }, 500);
        };
        _app.show = function () {
            _$dom.show();//find('.actionSheet').addClass('.actionSheetEnter');
            $("body").addClass('body-overflow');

            var actionSheet = $('#' + _obj.id + ' .actionSheet');
            var actionSheetContent = $('#' + _obj.id + ' .actionSheetContent');
            var _h = actionSheet.css("height");
            var _h2 = actionSheetContent.css("height");
            if (_h != _h2 || parseInt(_h2) < 250) {
                _h = parseInt(_h)
                _h = _h < 250 ? 250 : _h;
                actionSheetContent.css('height', _h + "px");
            }
            setTimeout(function () {
                _$dom.find('.actionSheet').addClass('actionSheetEnter');
            }, 200);
        };
        _obj.actionFn = function () {
            _app.hide();
        };
        _obj = $.extend(true, {}, _obj, obj);
        if (!_obj.id) {
            var _id = countActionSheetId - 1;
            _id = 'actionSheet' + _id;
            _obj.id = _id;
        }
        var _$dom = document.getElementById(_obj.id);
        if (!_$dom) {
            if (!_obj.id) {
                var _newId = 'actionSheet' + countActionSheetId;
                countActionSheetId += 1;
                obj.id = _newId
            }
            if (_obj.subTitle != '') {
                _obj.subTitle = '<div class="subTitle">' + _obj.subTitle + '</div>'
            }
            var str = '<div class="actionSheetCommonWrapper ' + _obj.class + '" id="' + obj.id + '">' +
                '<div class="actionSheetMask"></div>' +
                '<div class="actionSheet">' +
                '<div class="title">' +
                ' <i class="iconfont closeBtn">&#xe62c;</i>' +
                '<h3 class="text">' + _obj.title + '</h3>' + _obj.subTitle +
                '</div>' +
                '<div class="actionSheetContent">' + _obj.contentHtml +
                '</div>' +
                '<div class="footerWrapper">' +
                '<div class="itemBtn" id="actionSheetCommon-confirm">' + _obj.confirmName + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            _$dom = $(str);
            $("body").append(_$dom);
            _app.show();

        } else {
            _$dom = $(_$dom);
            _app.show();
        }

        _$dom.find('.closeBtn').click(function () {
            _app.hide();
        });
        _$dom.find('.actionSheetMask').click(function () {
            _app.hide();
        });
        $("#actionSheetCommon-confirm").click(function () {
            _obj.actionFn(_app);
        });
    };

    //制保留2位小数，如：2，会在2后面补上00.即2.00
    var toDecimal2 = function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    };

    var getProdItemHtml = function (list, keyMap) {
        var picDomain = ConstUtil.get("PIC_DOMAIN");
        var content = "";
        var pic = keyMap && keyMap['pic'] ? keyMap['pic'] : 'pic';
        var prodPrice = keyMap && keyMap['prodPrice'] ? keyMap['prodPrice'] : 'prodPrice';
        var prodName = keyMap && keyMap['prodName'] ? keyMap['prodName'] : 'prodName';
        var prodId = keyMap && keyMap['prodId'] ? keyMap['prodId'] : 'prodId';
        var hasCartBtn = !!(keyMap && keyMap['hasCart'] ? keyMap['hasCart'] : false);
        var cartHtml = '';

        if (list.length > 0) {
            for (var i = 0, len = list.length; i < len; i++) {
                var prod = list[i];
                var _tagHtml = getProdTagHtml(prod);
                var _taxationHtml = getProdTaxationHtml(prod);
                if (hasCartBtn) {
                    cartHtml = getCartHtml(prod[prodId])
                } else {
                    cartHtml = '';
                }
                var prodLink = '';
                if (prod.isCombo === true) {
                    prodLink = '/package/package-detail.html?comboId=' + prod[prodId];
                } else {
                    prodLink =   '/prod.html?id=' + prod[prodId];//+ '.html'+(prod.lastUpdate?'?version='+prod.lastUpdate:'');
                }
                var _referPrice = typeof prod.referPrice !== 'undefined' ? '¥' + prod.referPrice.toFixed(2) : '';
                var _prodPrice = typeof prod[prodPrice] !== 'undefined' ? '<span>¥</span>' + prod[prodPrice].toFixed(2) : '--';
                var _prodName = prod[prodName] ? prod[prodName] : prod.prodName;
                content += "<a href=javascript:gotoPageUrl('" + prodLink + "') class='prodItem'>"
                    + '<div class="prodImage"><img class="img" src="' + picDomain + "/" + prod[pic] + '?x-oss-process=image/resize,p_40">' + (prod.condiction ? '<div class="fullIcon">参加满' + prod.condiction + '减' + prod.deduction + '活动 </div>' : '') + '</div>'
                    + '<div  class="prodName">' + _prodName + '</div>'
                    + _tagHtml
                    + '<div class="priceWrapper">'
                    + '<div class="prodPrice">' + _prodPrice + '</div>'
                    + '<div class="referPrice">' + _referPrice + '</div></div>'
                    + '<div class="saleTotalWrapper">'
                    + _taxationHtml
                    + '销量<span class="saleTotal">' + (prod.saledTotal || 0) + '</span>' + cartHtml + '</div></a>';
            }
        }
        return content;
    };
    var getCartHtml = function (prodId) {
        return '<div class="cartBtn" prodid="' + prodId + '">购物车</div>';
    };
    var getProdTaxationHtml = function (prod) {
        var TaxationHtml = '';
        if (prod.freightPrice === 0) {
            TaxationHtml += '<div class="tagIcon">包邮</div>';
        }
        if (prod.taxRate === 0) {
            TaxationHtml += '<div class="tagIcon">包税</div>';
        }
        return TaxationHtml;
    };
    var getProdTagHtml = function (prod) {
        var tagIconHtml = '';
        if (prod.hotFlag) {
            tagIconHtml += '<div class="tagIcon">爆款</div>';
        }
        if (prod.newFlag) {
            tagIconHtml += '<div class="tagIcon">新品</div>';
        }
        if (prod.promotionType == 3) {
            tagIconHtml += '<div class="tagIcon">满减</div>';
        }
        if (prod.promotionType == 11) {
            tagIconHtml += '<div class="tagIcon">任选</div>';
        }
        if (prod.promotionType == 13) {
            tagIconHtml += '<div class="tagIcon">折扣</div>';
        }
        if (prod.couponFlag == 1) {
            tagIconHtml += '<div class="tagIcon">券</div>';
        }
        if (prod.saleChannel) {
            switch (prod.saleChannel) {
                case 10:
                    tagIconHtml += '<div class="tagIcon directMailIcon">直邮</div>';
                    break;
                case 20:
                    tagIconHtml += '<div class="tagIcon taxCompletionIcon">完税</div>';
                    break;
                case 30:
                    tagIconHtml += '<div class="tagIcon bondedIcon">保税</div>';
                    break;
            }
        }
        if (tagIconHtml) {
            tagIconHtml = '<div class="prodTag">' + tagIconHtml + '</div>';
        }
        return tagIconHtml;
    };
    var _cacheIsMini = false;
    var setMini = function (isMini) {
        _cacheIsMini = isMini;
    };
    var isMini = function () {
        return _cacheIsMini;
    };
    return {
        getProdTaxationHtml: getProdTaxationHtml,
        getProdTagHtml: getProdTagHtml,
        getProdItemHtml: getProdItemHtml,
        showLoading: showLoading,
        hideLoading: hideLoading,
        toast: toast,
        ajax: ajax,
        getQueryStr: getQueryStr,//获取页面URL参数的值 *****************************************弃用
        getRequestParams: getRequestParams,//获取页面URL参数的值  ***新增
        formatDate: formatDate,//格式化日期，具体用法utils.formatDate("yyyy-MM-dd",date);
        setStorage: setStorage,//设置本地缓存
        getStorage: getStorage,//获取本地缓存
        getSessionStorage: getSessionStorage,//获取sessionStorage的值
        setSessionStorage: setSessionStorage,//给sessionStorage添加值
        setSessionStorageByExpires: setSessionStorageByExpires,//给sessionStorage添加值(自定义过期时间)
        isWeixin: isWeixin,//是否微信内置浏览器
        truncAndEllipsis: truncAndEllipsis,
        limitInputEnCn: limitInputEnCn,
        changeParam: changeParam,
        changeParams: changeParams,
        deleteCookie: deleteCookie,
        isTerminal: isTerminal,
        isNotEmptyString: isNotEmptyString,
        toLogin: toLogin,
        currentPageLogin: currentPageLogin,
        getReqBodyShopId: getReqBodyShopId,
        showActionSheet: showActionSheet,
        toDecimal2: toDecimal2,
        setMini: setMini,
        isMini: isMini,
        goLogin: goLogin,
        validatePhone: validatePhone
    }
})(window.jQuery || $);
(function ($, common) {
    var ajax = $.ajax;
    $.ajax = function (tmp) {
        var trackId = common.getSessionStorage("trackId");
        var channel = "4";
        if (!common.isWeixin()) {
            channel = "5";
        }
        if (common.isTerminal()) {
            channel = "7";
        }
        var identity = "";
        if (tmp && tmp.url) {
            // 增加请求头
            tmp.headers ? tmp.headers.trackId = trackId : tmp.headers = {
                trackId: trackId
            };
            tmp.headers.channel = channel;
            tmp.headers.identity = identity;
            // 增加返回成功方法代理
            var completeFunction = tmp.complete;
            tmp.complete = function (XMLHttpRequest, textStatus) {
                if (XMLHttpRequest.readyState == 4) {
                    var trackId = XMLHttpRequest.getResponseHeader('trackId');
                    var logined = XMLHttpRequest.getResponseHeader('needLogin');
                    if (tmp.url.indexOf('/draw/app/') < 0) {
                        trackId ? common.setSessionStorage("trackId", trackId) : "";//设置cookie
                    }
                    if (logined && eval(logined)) {
                        common.goLogin(tmp.url, tmp.type);

                    }
                }
                completeFunction ? completeFunction(XMLHttpRequest, textStatus) : "";
            }
            return ajax(tmp);
        }
    }
})($, common);


//重写window方法

function showModalDialog(message, callback, params, callbackobj, confirmBtnName, title) {
    if ($(".confirm-mask").length > 0) {
        return;
    }
    if (!confirmBtnName) {
        confirmBtnName = '确定'
    }
    var _title = '';
    if (title) {
        _title = '<div class="title">' + title + '</div>';
    }
    var str = '<div class="mask confirm-mask"></div>' +
        '<div class="confirm">' + _title +
        '<div class="content">' + message + '</div>' +
        '<div class="btn-container">' +
        '<div id="closeWindow">取消</div>' +
        '<div id="confirm">' + confirmBtnName + '</div>' +
        '</div>' +
        '</div>';

    $("body").append(str);
    $(".confirm-mask,#closeWindow").click(function () {
        $(".confirm-mask").remove();
        $(".confirm").remove();
    });
    $("#confirm").click(function () {
        $(".confirm-mask").remove();
        $(".confirm").remove();
        callback.apply(callbackobj, params);
    });

}

function showConfirmDialog(params) {
    var _params = $.extend({
        message: '',
        callback: function () {
        },
        closeFn: function () {
        },
        callbackobj: this,
        confirmBtnName: '确定',
        closeBtnName: '取消',
        params: null,
    }, params);
    //message,callback,params,callbackobj,confirmBtnName,title
    if ($(".confirm-mask").length > 0) {
        return;
    }
    var _title = '';
    if (_params.title) {
        _title = '<div class="title">' + _params.title + '</div>';
    }
    var str = '<div class="mask confirm-mask"></div>' +
        '<div class="confirm">' + _title +
        '<div class="content">' + _params.message + '</div>' +
        '<div class="btn-container">' +
        '<div id="closeWindow">' + _params.closeBtnName + '</div>' +
        '<div id="confirm">' + _params.confirmBtnName + '</div>' +
        '</div>' +
        '</div>';

    $("body").append(str);
    $(".confirm-mask,#closeWindow").click(function () {
        $(".confirm-mask").remove();
        $(".confirm").remove();
        _params.closeFn && _params.closeFn();
    });
    $("#confirm").click(function () {
        $(".confirm-mask").remove();
        $(".confirm").remove();
        _params.callback.apply(_params.callbackobj, params);
    });

}

function alertDialog(message, callback, params) {
    if ($(".alertDialog-mask").length > 0) {
        return;
    }
    var str = '<div class="alertDialog-mask"></div>' +
        '<div class="confirm">' +
        '<div class="content">' + message + '</div>' +
        '<div class="btn-container">' +
        '<div id="alertDialog-confirm" class="sure">确定</div>' +
        '</div>' +
        '</div>';

    $("body").append(str);
    $("#alertDialog-confirm").click(function () {
        $(".alertDialog-mask").remove();
        $(".confirm").remove();
        callback.apply(callback, params);
    });

}

function alert(message, titleCenter, btnName, customClass) {
    if ($(".alert-mask").length > 0) {
        return;
    }
    if (typeof btnName === 'undefined') {
        btnName = '确定'
    }
    var html = '<div class="alertPluginWrapper ' + (customClass ? customClass : '') + '"><div class="mask alert-mask" style="display: block"></div>' +
        '<div class="confirm">' +
        '<div class="content ' + titleCenter + '">' + message + '</div>' +
        '<div class="btn-container">' +
        '<div id="confirm" class="sure">' + btnName + '</div>' +
        '</div>' +
        '</div></div>';
    html = $(html);

    $("body").append(html);
    html.on('click', '.alert-mask,.sure', function () {
        html.unbind('click');
        html.remove();
    });

}

var Base64 = {}; // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode = function (str, utf8encode) { // http://tools.ietf.org/html/rfc4648
    utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode;
    var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c, plain, coded;
    var b64 = Base64.code;

    plain = utf8encode ? str.encodeUTF8() : str;

    c = plain.length % 3; // pad string to length of multiple of 3
    if (c > 0) {
        while (c++ < 3) {
            pad += '=';
            plain += '\0';
        }
    }
    // note: doing padding here saves us doing special-case packing for trailing
    // 1 or 2 chars

    for (c = 0; c < plain.length; c += 3) { // pack three octets into four
        // hexets
        o1 = plain.charCodeAt(c);
        o2 = plain.charCodeAt(c + 1);
        o3 = plain.charCodeAt(c + 2);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hextets to index into code string
        e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3)
            + b64.charAt(h4);
    }
    coded = e.join(''); // join() is far faster than repeated string
                        // concatenation in IE

    // replace 'A's from padded nulls with '='s
    coded = coded.slice(0, coded.length - pad.length) + pad;

    return coded;
}
Base64.decode = function (str, utf8decode) {
    utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode;
    var o1, o2, o3, h1, h2, h3, h4, bits, d = [], plain, coded;
    var b64 = Base64.code;

    coded = utf8decode ? str.decodeUTF8() : str;

    for (var c = 0; c < coded.length; c += 4) { // unpack four hexets into three
        // octets
        h1 = b64.indexOf(coded.charAt(c));
        h2 = b64.indexOf(coded.charAt(c + 1));
        h3 = b64.indexOf(coded.charAt(c + 2));
        h4 = b64.indexOf(coded.charAt(c + 3));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >>> 16 & 0xff;
        o2 = bits >>> 8 & 0xff;
        o3 = bits & 0xff;

        d[c / 4] = String.fromCharCode(o1, o2, o3);
        // check for padding
        if (h4 == 0x40)
            d[c / 4] = String.fromCharCode(o1, o2);
        if (h3 == 0x40)
            d[c / 4] = String.fromCharCode(o1);
    }
    plain = d.join(''); // join() is far faster than repeated string
                        // concatenation in IE

    return utf8decode ? plain.decodeUTF8() : plain;
}
/**
 * Url解码
 **/
var UrlUtils = {};
/**
 * Url编码
 **/
UrlUtils.encode = function (unzipStr) {
    var zipstr = "";
    var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
    var tt = "";
    for (var i = 0; i < unzipStr.length; i++) {
        var chr = unzipStr.charAt(i);
        var c = UrlUtils.StringToAscii(chr);
        tt += chr + ":" + c + "n";
        if (parseInt("0x" + c) > 0x7f) {
            zipstr += encodeURI(unzipStr.substr(i, 1));
        } else {
            if (chr == " ")
                zipstr += "+";
            else if (strSpecial.indexOf(chr) != -1)
                zipstr += "%" + c.toString(16);
            else
                zipstr += chr;
        }
    }
    return zipstr;
}

/**
 * Url解码
 **/
UrlUtils.decode = function (zipStr) {
    var uzipStr = "";
    for (var i = 0; i < zipStr.length; i++) {
        var chr = zipStr.charAt(i);
        if (chr == "+") {
            uzipStr += " ";
        } else if (chr == "%") {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                ;
                i += 8;
            } else {
                uzipStr += UrlUtils.AsciiToString(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }
    return uzipStr;
}

UrlUtils.StringToAscii = function (str) {
    return str.charCodeAt(0).toString(16);
}

UrlUtils.AsciiToString = function (asccode) {
    return String.fromCharCode(asccode);
}

var MD5 = {};
/*
 * 用于生成字符串对应的md5值 @param string string 原始字符串 @return string 加密后的32位md5字符串
 */
MD5.md5 = function (string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }

    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string
                .charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount]
            | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    ;

    function md5_WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue
                + WordToHexValue_temp.substr(
                    WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    ;

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d))
        .toLowerCase();

}

window.onload = function () {
    setTimeout(function () {
        if ($("._ih").length > 0) {
            $("._ih").css("display", "none");
            console.log("rm ih");
        }
    }, 1000);
}


function clientService(title, imageUrl, memo, originalPrice, actualPrice, linkUri) {
    //线下推广 详情页 不显示客服
    if (/offlineAct=([^"]*)/i.test(location.hash)) {
        return;
    }
    //申请售后页面不显示客服
    var _reg = new RegExp(location.host + "\/busi\/refund\.html", "i");
    if (_reg.test(location.href)) {
        return;
    }

    //品质捕手模块不需要客服
    var _reg = new RegExp(location.host + "\/hunter\/", "i");
    if (_reg.test(location.href)) {
        return;
    }
    //搜索页面 搜索结果页面不显示客服
    var _reg = new RegExp(location.host + "\/search\/", "i");
    if (_reg.test(location.href)) {
        return;
    }

    var _reg = new RegExp(location.host + "/busi/confirm-pay.html", "i");
    if (_reg.test(location.href)) {
        return;
    }
    var _reg = new RegExp(location.host + "/busi/confirm-pay-new.html", "i");
    if (_reg.test(location.href)) {
        return;
    }
    var _reg = new RegExp(location.host + "/activity/prize", "i");
    if (_reg.test(location.href)) {
        return;
    }
    var _reg = new RegExp(location.host + "/activity/act-", "i");
    if (_reg.test(location.href)) {
        return;
    }

    var echatUrl = "https://v.rainbowred.com/visitor/echat.js?companyId=35";
    var notDisplay = document.getElementById("dnotDisplay");
    if (!notDisplay) {
        if (withNonNullParams(title, imageUrl, memo, originalPrice, actualPrice, linkUri) && isProdDetailsPageUrl()) {
            echatUrl = appendEchatUrl(title, originalPrice, actualPrice, imageUrl, memo, linkUri, echatUrl);
        }
        var echatUserInfo = common.getStorage("echatUserInfo");

        // if (!isNonNullValue(echatUserInfo)) {
        // 	common.ajax("GET", "/app/busi/echat/userInfo", null, function(respBody){
        // 		//append user info
        // 		if (isNonNullValue(respBody.userinfo)) {
        // 			common.setStorage("echatUserInfo", respBody.userinfo);
        // 			echatUrl += "&metaData="+respBody.userinfo;
        // 		}
        // 		async_load(echatUrl, "echatmodulejs");
        // 	}, null, null, false);
        // } else {
        // 	echatUrl += "&metaData="+echatUserInfo;
        // 	async_load(echatUrl, "echatmodulejs");
        // }
    }
}

function appendEchatUrl(title, originalPrice, actualPrice, imageUrl, memo, linkUri, echatUrl) {
    var visEvt = {};
    visEvt.title = encodeURIComponent(title);
    visEvt.content = encodeURIComponent("<div style = 'color: rgb(139, 139, 143);text-overflow:ellipsis;overflow:hidden;'><div style='color:#666;line-height:20px'>原价：<span style='text-decoration:line-through'>" + originalPrice + "</span></div><div style='color:#666;line-height:20px'>促销：<span style='color:red'>" + actualPrice + "</span></div></div>");
    visEvt.eventId = encodeURIComponent("PROD_DETAIL" + new Date().getMilliseconds());
    visEvt.imageUrl = encodeURIComponent(imageUrl);
    visEvt.memo = encodeURIComponent(memo);
    visEvt.url = encodeURIComponent(linkUri);
    echatUrl += "&visEvt=" + JSON.stringify(visEvt);
    return echatUrl;
}

function isNonNullValue(val) {
    return !(val == undefined || val == null || val == "");
}

function withNonNullParams(title, imageUrl, memo, originalPrice, actualPrice, linkUri) {
    return isNonNullValue(title) && isNonNullValue(imageUrl) && isNonNullValue(memo) && isNonNullValue(originalPrice) && isNonNullValue(actualPrice) && isNonNullValue(linkUri);
}

function isProdDetailsPageUrl() {
    return new RegExp(/^((https|http)?:\/\/)[^\s]+\/prod\/\d+\.html/).test(window.location.href);
}

function async_load(src, id) {
    $("#" + id).remove();
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    s.charset = "UTF-8";
    s.id = id;

    var scriptList = $("script");
    var lastScript = scriptList[scriptList.length - 1];
    lastScript.parentNode.appendChild(s);
}

function touchScroll() {
    //得到各种元素
    var nav = $("#nav-container")[0];
    var navul = $("#nav-container ul")[0];
    var navullis = $("#nav-container ul li");
    var navW = $(window).width();

    //宽度
    var width = 0;
    $("#nav-container ul li").each(function (index, element) {
        width += $(this).width() + 25;
    });
    navul.style.width = width + "px";

    nav.addEventListener("touchstart", touchstartHandler);
    nav.addEventListener("touchmove", touchmoveHandler);
    nav.addEventListener("touchend", touchendHandler);

    var startX = 0;
    var nowX = 0;
    var dX = 0;

    var lastTwoPoint = [0, 0];

    //开始滑动
    function touchstartHandler(event) {
        navul.style.webkitTransition = "none";    //去掉过渡
        navul.style.transition = "none";    //去掉过渡
        startX = event.touches[0].pageX;    //记录起点
    }

    //滑动过程
    function touchmoveHandler(event) {
        event.preventDefault();
        dX = event.touches[0].pageX - startX;    //差值

        //反映差值
        navul.style.webkitTransform = "translateX(" + (nowX + dX) + "px)";
        navul.style.transform = "translateX(" + (nowX + dX) + "px)";

        //记录最后两点的x值
        lastTwoPoint.shift();
        lastTwoPoint.push(event.touches[0].pageX);
    }

    //结束滑动
    function touchendHandler(event) {
        nowX += dX;

        //多走最后两点路程的5倍路程
        nowX += (lastTwoPoint[1] - lastTwoPoint[0]) * 5;
        if (nowX > 0) {
            nowX = 0;
        }

        if (nowX < -parseInt(navul.style.width) + navW) {
            nowX = -parseInt(navul.style.width) + navW;
        }

        //  console.log(-parseInt(navul.style.width) + navW)
        //过渡时间
        //非线性衰减
        var t = Math.sqrt(Math.abs(lastTwoPoint[1] - lastTwoPoint[0])) / 10;

        navul.style.webkitTransition = "all " + t + "s cubic-bezier(0.1, 0.85, 0.25, 1) 0s";
        navul.style.transition = "all " + t + "s cubic-bezier(0.1, 0.85, 0.25, 1) 0s";

        //反映多走的5倍路程：
        navul.style.webkitTransform = "translateX(" + nowX + "px)";
        navul.style.transform = "translateX(" + nowX + "px)";
    }
}

/***微信分享****/
function addPromotion(type, value, menuShareAppMessageFunc, menuShareTimelineFunc, succCallback) {
    //AppShare.wxshare2(type,value);

    var params = {};
    var reqBody = {};
    reqBody.value = value;
    reqBody.type = type;

    if (type == 13) {
        reqBody.shareShopId = common.getSessionStorage("shareShopId");
        if (typeof reqBody.shareShopId == "undefined" || reqBody.shareShopId == "" || reqBody.shareShopId == false) {
            reqBody.shareShopId = common.getQueryStr("shareShopId");
        }
    }
    if (type == 8) {
        var reqBodyShareId = common.getReqBodyShopId();
        if (reqBodyShareId) {
            reqBody.shareShopPreview = reqBodyShareId
        }
    }
    params.reqBody = JSON.stringify(reqBody);

    var shareTitle = ""
    var shareUrl = "";
    var shareDesc = "";
    var shareImg = "";
    var menuShareTimeline = new Object();
    var menuShareAppMessage = new Object();
    common.ajax('GET', '/app/base/share/info', params, function (respBody) {
        window._cacheBaseShareInfo = respBody;
        share.initQrCodeIcon(window._cacheBaseShareInfo && window._cacheBaseShareInfo.isShowQrcode || 0);

        if (respBody.shareTitle) {
            shareTitle = respBody.shareTitle;
            menuShareTimeline.shareTitle = shareTitle;
            menuShareAppMessage.shareTitle = shareTitle;
        }
        if (respBody.shareUrl) {
            shareUrl = respBody.shareUrl;
            menuShareTimeline.shareUrl = shareUrl;
            menuShareAppMessage.shareUrl = shareUrl;
        }
        if (respBody.shareDesc) {
            shareDesc = respBody.shareDesc;
            menuShareTimeline.shareDesc = shareDesc;
            menuShareAppMessage.shareDesc = shareDesc;
        }
        if (respBody.shareImg) {
            shareImg = respBody.shareImg;
            menuShareTimeline.shareImg = shareImg;
            menuShareAppMessage.shareImg = shareImg;
        }
        if (menuShareAppMessageFunc && menuShareAppMessageFunc != null && typeof(menuShareAppMessageFunc) == 'function') {
            var _menuShareAppMessage = menuShareAppMessageFunc(menuShareAppMessage, respBody);
            if (typeof _menuShareAppMessage !== 'undefined') {
                menuShareAppMessage = _menuShareAppMessage;
            }
        }
        if (menuShareTimelineFunc && menuShareTimelineFunc != null && typeof(menuShareTimelineFunc) == 'function') {
            var _menuShareTimeline = menuShareTimelineFunc(menuShareTimeline, respBody);
            if (typeof _menuShareTimeline !== 'undefined') {
                menuShareTimeline = _menuShareTimeline;
            }
        }

        wx.ready(function () {
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        });
    });

    wx.ready(function () {

        wx.checkJsApi({
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });


        wx.onMenuShareAppMessage({
            title: menuShareAppMessage.shareTitle, // 分享标题
            link: menuShareAppMessage.shareUrl, // 分享链接
            desc: menuShareAppMessage.shareDesc, // 分享描述
            imgUrl: menuShareAppMessage.shareImg, // 分享图标
            success: function (res) {
                // 用户点击了分享后执行的回调函数
                succCallback && succCallback(res);
            }

        });

        wx.onMenuShareTimeline({
            title: menuShareTimeline.shareTitle, // 分享标题
            link: menuShareTimeline.shareUrl, // 分享链接
            desc: menuShareTimeline.shareDesc, // 分享描述
            imgUrl: menuShareTimeline.shareImg, // 分享图标
            success: function (res) {
                // 用户点击了分享后执行的回调函数
                succCallback && succCallback(res);
            }
        });
    });

}

/***微信分享底部弹窗***/
function wxSharePop(type, value) {

    var trackId = common.getSessionStorage("trackId");
    var bmclevel = common.getSessionStorage("level");
    if (trackId != undefined && trackId != null && $.trim(trackId) != "" && bmclevel > 0) {
        var codeUrl = "/app/user/all/qrcode?trackId=" + trackId + "&type=" + type + "&value=" + value;
        $("#my-shop-qrcode").attr("src", codeUrl);
        $("#share").click(function () {
            $(".the-light").show();
            $("#share-M").slideDown(500);
        });
        $("#share-guide1").click(function () {
            $("#share-guide").show();
            $("#share-M").slideUp(500);
        });
        $("#WeChat-QR").click(function () {
            $(".the-light").show();
            $("#share-QR").show();
            $("#share-M").slideUp(500);
        });
        $(".share-close").click(function () {
            $("#share-QR").hide();
            $(".the-light").hide();
        })
        $("#share-guide-close").click(function () {
            $("#share-guide").hide();
            $(".the-light").hide();
        });
        $("#close-M").click(function () {
            $(".the-light").hide();
            $("#share-M").slideUp(500);
        });
    } else {


        $("#share").click(function () {
            $(".the-light").show();
            $("#share-C").slideDown(500);

        });
        $("#close-C").click(function () {
            $(".the-light").hide();
            $("#share-C").slideUp(500);
        });

        $("#share-guide2").click(function () {
            $("#share-guide").show();
            $("#share-C").slideUp(500);
        });
        $("#share-guide-close").click(function () {
            $("#share-guide").hide();
            $(".the-light").hide();
        });
    }
}

var share = {
    // 分享二维码按钮icon
    qrCodeIcon: '<li class="fr" onclick="share.shareQR()"><img src="/images/WeChat-QR.png"></li>',
    shareM: '<div class="the-light"></div><div class="share1 iphoneX-share-b" id="share1">'
        + '<h3 class="tac fs18 pr">分享<i class="iconfont cor3e" onclick="share.shareClose()">&#xe62c;</i></h3>'
        + '<ul class="clearfix"><div class="fl clearfix" ><li class="fl" onclick="share.shareGuide()"><img src="/images/WeChat-friends.png">'
        + '</li><li class="fl tac" onclick="share.shareGuide()"><img src="/images/WeChat-Moments.png"></li></div>'
        + '<li class="fl qrCodeIcon"></li></ul></div>',
    //默认 M用户分享样式
    shareMoney: '<div class="the-light"></div><div class="share-gain iphoneX-share-b " id="share1"><h3 class="tac fs18 pr"><span id="pomitit" class="fw">分享</span><span>'
        + '<i class="iconfont cor3e" onclick="share.shareClose()">&#xe62c;</i></span></h3><div class="gain-con" id="gaincon">'
        + '<p class="fs12 clearfix">当小伙伴通过您的分享，进入洋老板商城购物确认收货时，您将获得推荐奖励。</span></p></div>'
        + '<ul class="clearfix"><div class="fl clearfix"><li class="fl" onclick="share.shareGuide()"><img src="/images/WeChat-friends.png"></li>'
        + '<li class="fl tac" onclick="share.shareGuide()"><img src="/images/WeChat-Moments.png"></li></div><li class="fl qrCodeIcon"></li></ul></div>',
    //默认 M用户分享没有说明样式
    shareNoMoney: '<div class="the-light"></div><div class="share-gain iphoneX-share-b " id="share1"><h3 class="tac fs18 pr not-shoper">分享'
        + '<i class="iconfont cor3e" onclick="share.shareClose()">&#xe62c;</i></h3>'
        + '<ul class="clearfix not-money"><div class="fl clearfix"><li class="fl" onclick="share.shareGuide()"><img src="/images/WeChat-friends.png"></li>'
        + '<li class="fl tac" onclick="share.shareGuide()"><img src="/images/WeChat-Moments.png"></li></div><li class="fl qrCodeIcon"></li></ul></div>',
    //默认C用户分享样式
    shareC: '<div class="the-light"></div><div class="share1 iphoneX-share-b" id="share1">'
        + '<h3 class="tac fs18 pr">分享<i class="iconfont cor3e" onclick="share.shareClose()">&#xe62c;</i></h3>'
        + '<ul class="clearfix no-QR"><li class="fl" onclick="share.shareGuide()"><img src="/images/WeChat-friends.png"></li>'
        + '<li class="fr"  onclick="share.shareGuide()"><img src="/images/WeChat-Moments.png"></li></ul></div>',
    //分享指引		
    shareG: '<div class="share2 pf dis-no" id="share-guide"><img src="/images/share-guidance.png">'
        + '<p class="fs15 corfff" onclick="share.shareClose()">我知道了</p></div>',

    QRCode: '<div class="share3 tac dis-no" id="share3"><div class="pr"><input id="QRCodePath" type="hidden" value="${shareQRCode}"/>' +
        '<img class="share-QR" id="share-QRCodeImg" ><img class="share-close" src="/images/share-close.png" onclick="share.shareClose()">'
        + '</div><p class="corfff fs18">长按图片保存到手机中</p></div>',
    /**
     * 分享公共函数
     * @param type 分享类型
     * @param value 值
     * @param business 个性化函数（每个分享的业务逻辑可能不一致，如果传入，则按照此逻辑执行）
     * @param callBack 回调函数（用于执行完后的操作）
     */
    shareFun: function (type, value, QRCodePath, business, callBack) {
        var trackId = common.getSessionStorage("trackId");
        if (trackId != undefined && trackId != null && $.trim(trackId) != "") {
            if (QRCodePath == null || QRCodePath == '' || QRCodePath == 'undefined') {
                var trackId = common.getSessionStorage("trackId");
                share.QRCode = share.QRCode.replace("${shareQRCode}", '/app/user/all/qrcode?trackId=' + trackId + '&type=' + type + '&value=' + value);
            } else {
                share.QRCode = share.QRCode.replace("${shareQRCode}", QRCodePath);
            }
            if (typeof window._cacheBaseShareInfo !== 'undefined') {
                share._renderShare(business);
            } else {
                addPromotion(type, value, function (data) {
                    share._renderShare(business);
                    return data;
                });
            }

        } else {
            //默认显示样式
            $(share.shareC + share.shareG).appendTo("#shareContent");
        }
        if (typeof callBack == 'function') {
            callBack();
        }
    },
    _renderShare: function (business) {
        common.ajax('GET', '/app/busi/activity/shopsum', "", function (respBody) {
            share.initQrCodeIcon(window._cacheBaseShareInfo && window._cacheBaseShareInfo.isShowQrcode || 0);
            if (respBody) {
                if (typeof business == 'function') {
                    business(respBody);
                } else {
                    share.defultBusiness(respBody);
                }
            }
        });
    },
    initQrCodeIcon: function (isShowQrCode) {
        if (isShowQrCode !== 1) {
            share.qrCodeIcon = '';
            //商品详情页的二维码图标按钮
            $("#WeChat-QR").remove();
            share.shareM = share.shareM.replace('<ul class="clearfix">', '<ul class="clearfix no-QR">');
            share.shareMoney = share.shareMoney.replace('<ul class="clearfix">', '<ul class="clearfix no-QR">');
            share.shareNoMoney = share.shareNoMoney.replace('<ul class="clearfix not-money">', '<ul class="clearfix  not-money no-QR">');
        }
        share.shareM = share.shareM.replace('<li class="fl qrCodeIcon"></li>', share.qrCodeIcon);
        share.shareMoney = share.shareMoney.replace('<li class="fl qrCodeIcon"></li>', share.qrCodeIcon);
        share.shareNoMoney = share.shareNoMoney.replace('<li class="fl qrCodeIcon"></li>', share.qrCodeIcon);

    },
    defultBusiness: function (respBody, type) {
        if (type == 108) {
            $(share.shareC + share.shareG).appendTo("#shareContent");
            return;
        }
        if (type == 109 || type == 110 || type == 117 || type == 118) {
            $(share.shareC + share.shareG).appendTo("#shareContent");
            return;
        }
        //显示C用户的分享
        if (respBody.bmclevel < 1 || respBody.expiredState == true) {
            $(share.shareC + share.shareG).appendTo("#shareContent");
            //显示M用户的分享
        } else {
            $(share.shareMoney + share.shareG + share.QRCode).appendTo("#shareContent");
        }
    },
    shareBusiness2: function (respBody) {
        //显示C用户的分享
        if (respBody.bmclevel < 1 || respBody.expiredState == true) {
            $(share.shareC + share.shareG).appendTo("#shareContent");
            //显示M用户的分享
        } else {
            $(share.shareM + share.shareG + share.QRCode).appendTo("#shareContent");
        }
    },
    shareClick: function () {
        $("#share-guide").hide();
        $("#share3").hide();
        $("#share1").show();
        $(".the-light").show();
        $("#shareContent").show();
        var QRCodePath = $("#QRCodePath").val();
        if (QRCodePath != '' && QRCodePath != 'undefined') {
            $("#share-QRCodeImg").attr("src", QRCodePath);
        }

    },
    shareClose: function () {
        $(".the-light").hide();
        $("#shareContent").hide();
    },
    shareGuide: function () {
        $("#share1").hide();
        $("#share-guide").show();
    },
    shareQR: function () {
        $("#share1").hide();
        $("#share3").show();
    }
};
/**
 * 测试流量监控
 */
$(function () {
    var hostUrl = window.location.href;
    if (hostUrl.indexOf("yanglaoban.com") > -1) {
        (function (window) {
            !function (e, t, n, g, i) {
                e[i] = e[i] || function () {
                    (e[i].q = e[i].q || []).push(arguments)
                }, n = t.createElement("script"), tag = t.getElementsByTagName("script")[0], n.async = 1, n.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag)
            }(window, document, "script", "assets.growingio.com/2.1/gio.js", "gio");
            gio('init', '8e02c9564a1ceac9', {});
            var trackId = common.getSessionStorage("trackId");
            if (trackId && trackId !== '') {
                var getLoginUserInfo = null;
                try {
                    var _loginUserInfoCache = common.getSessionStorage("loginUserInfo");
                    if (_loginUserInfoCache != '') {
                        getLoginUserInfo = JSON.parse(_loginUserInfoCache);
                    }
                } catch (e) {
                    console.info(e);
                }
                if (!getLoginUserInfo || typeof getLoginUserInfo.uid === 'undefined') {
                    var setLoginUserInfo = {};
                    var url = '/app/user/detail';
                    var params = {};
                    var reqBody = {};
                    params.reqBody = reqBody;
                    common.ajax('POST', url, params, function (respBody) {
                        setLoginUserInfo.uid = respBody.uid;
                        setLoginUserInfo.account = respBody.account;
                        setLoginUserInfo.levelName = respBody.levelName;
                        common.setSessionStorage("loginUserInfo", JSON.stringify(setLoginUserInfo));
                        gio('setUserId', setLoginUserInfo.uid);
                        gio('people.set', {
                            'account': setLoginUserInfo.account,
                            'levelName': setLoginUserInfo.levelName
                        });
                    }, null, null, null, false);
                } else {
                    gio('setUserId', getLoginUserInfo.uid);
                    gio('people.set', {'account': getLoginUserInfo.account, 'levelName': getLoginUserInfo.levelName});
                }
            }
            gio('send');
        })(window);
    }
});

/**
 * 分享返回主页（参数：share为1），普通跳转返回上一页
 */
function back() {
    var isShare = getUrlParam("share");
    if (isShare == "1") {
        // window.location.href="/index.html";
        gotoPageUrl("/index.html");
    } else {
        history.go(-1)
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//H5页面增加下载提示
$(function () {
        addShopkeeper();
        var ua = window.navigator.userAgent.toLowerCase();
        var index = '<a  href="/index.html">'
            + '<div class="navl nav-backIndex">'
            + '</div>'
            + '</a>';
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            //线下推广详情页不显示  //商品详情页不显示
            if (!/#offlineAct=/ig.test(location.hash) && !/\/prod\//ig.test(location.href)) {
                $("#share").before(index);
            }

            //打开APP功能
            //     if (navigator.userAgent.match(/android/i)){
            //         install()
            //     }
            //     if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
            //         appInstall()
            //     }
            // }
            // function install() {
            //     var install='<div class="clearfix appInstalled" id="installTips">'
            //         +'<img class="fl" src="../images/draw_list_icon.jpg" alt="">'
            //         +'<p class="fl">100%正品 全球好货<br>一个让您满意的跨境电商APP</p>'
            //         +'<div class="fr"  id="openLoad" onclick="clickD()">立即打开</div>'
            //         +'<i class="fr iconfont cor333" onclick="closeInstallTips()">&#xe626;</i>'
            //         +'</div>'
            //     $(document.body).append(install)
            // }
            // function appInstall() {
            //     var appInstall='<div class="clearfix appInstalled" id="installTips">'
            //         +'<img class="fl" src="../images/draw_list_icon.jpg" alt="">'
            //         +'<p class="fl">100%正品 全球好货<br>一个让您满意的跨境电商APP</p>'
            //         +'<div class="fr"  id="openLoad" onclick="javascript:window.location.href=\'/app/user/app-download.html\'">立即打开</div>'
            //         +'<i class="fr iconfont cor333" onclick="closeInstallTips()">&#xe626;</i>'
            //         +'</div>'
            //     $(document.body).append(appInstall);
            // }
            // window.closeInstallTips = function() {
            //     $("#installTips").css('display','none');
            // }
            // window.clickD = function () {
            //     var state = null;
            //     try {
            //         var isInstalled; //下面是安卓端APP接口调用的地址，自己根据情况去修改
            //         var ifrSrc = 'com.ibalife.ibaboss://ibaboss/startApp?';
            //         var ifr = document.createElement('iframe');
            //         ifr.style.display = 'none';
            //         ifr.onload = function() {
            //             isInstalled = true;
            //             alert(isInstalled);
            //         };
            //         ifr.src = ifrSrc;
            //         document.body.appendChild(ifr);
            //     } catch (e) {
            //     }
            //     if (state) {
            //         window.close();
            //     } else {
            //         window.location = "/app/user/app-download.html";
            //     }
        }
    }
)

/**
 * 返回前一页（或返回首页）
 * <如果没有前一页历史，则直接返回首页</li>
 */
function commonGoBack() {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE
        if (document.referrer === '') {
            gotoPageUrl("/");
        } else {
            historyGo();
        }
    } else { //非IE浏览器
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0) {

            if (document.referrer === '') {
                window.opener = null;
                gotoPageUrl("/");
            } else {
                historyGo();
            }
        } else { //未知的浏览器
            historyGo();
        }
    }

    setTimeout(function () {
        gotoPageUrl("/");
    }, 3000);
}

function historyGo() {
    var referrer = document.referrer;
    var re = referrer.indexOf('/oauth.html') || referrer.indexOf('/app/user/ivt4app') || referrer.indexOf('/connect/oauth2/authorize');

    if (re > 0) {
        gotoPageUrl("/");
    } else {
        // var urlFlag=referrer.indexOf('m.ibaboss.com') || referrer.indexOf('m.yanglaoban.com');
        if (referrer.indexOf('mclient.alipay.com') !== -1) {
            gotoPageUrl("/index.html");
        } else {
            window.history.go(-1);
        }
    }

}

//首页转成店铺地址
function changeShopKeeperUrl(url) {
    if (url.match(/\/index.html([^"]*)/i)) {
        // index.html 首页地址转换为店铺地址
        return url.replace(/^\/index\.html(.*)$/, "/store/shopkeeper-selected.html$1");
    } else {
        return url;
    }
}

function addShopkeeper() {
    if (isFromShopkeeper()) {
        var a_list = $('a[href*=".html"]');
        a_list.each(function () {
            var _that = $(this);
            var _href = _that.attr("href");
            _href = changeShopKeeperUrl(_href);

            var _html_url = _href.replace(/\?/, "&");
            _html_url = _html_url.replace(/\.html/, ".html?fromShopkeeper=" + isFromShopkeeper("value"));
            $(this).attr("href", _html_url);
        });
    }
}

function gotoPageUrl(url, type) {
    if (!isFromShopkeeper()) {
        if (type == "replace") {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    } else {
        if (url.match(/^\/index.html.*$/i)) {
            url = "/store/shopkeeper-selected.html"
        }
        var isFlag = !!url.match(/.*fromShopkeeper.*/i);
        if (!isFlag) {
            var _html_url = url.replace(/\?/, "&");
            _html_url = _html_url.replace(/\.html/, ".html?fromShopkeeper=" + isFromShopkeeper('value'));
            if (type == "replace") {
                window.location.replace(_html_url);
            } else {
                window.location.href = _html_url;
            }
        } else {
            if (type == "replace") {
                window.location.replace(url);
            } else {
                window.location.href = url;
            }
        }

    }
}

// 是否店铺页面 type='value' 返回值；
function isFromShopkeeper(type) {
    var urlParameter = window.location.search;
    var fromShopkeeper = urlParameter.match(/fromShopkeeper=([\d]*)/i);
    if (fromShopkeeper) {
        fromShopkeeper = fromShopkeeper[1];
    }
    if (typeof type == "undefined") {
        type = 1;
    }
    if (type == 1) {
        return fromShopkeeper == '1';
    } else if (type == 'value') {
        return fromShopkeeper;
    }
}

function getFromShopkeeperFlagStr(type) {
    var _splieStr = type == 1 ? "?" : "&";
    return isFromShopkeeper() ? _splieStr + "fromShopkeeper=" + isFromShopkeeper("value") : "";
}

/*非店铺链接显示*/
function noFromShopkeeperFlagShow(domStr) {
    if (!isFromShopkeeper()) {
        $(domStr).show();
    }
}

function addVisitAndSetDitchToCookies() {
    var kolChannel = common.getQueryStr("kolChannel");
    if (!kolChannel) {
        return;
    }
    $.ajax({
        url: "/app/report/visitcount/add?linkId=" + kolChannel,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {

        }
    });
    common.setSessionStorage("ditch", kolChannel);
}

;(function () {
    function checkReferrer() {
        var regexp = /\.(sogou|soso|baidu|google|youdao|yahoo|bing|118114|biso|gougou|ifeng|ivc|sooule|niuhu|biso)(\.[a-z0-9\-]+){1,2}\//ig;
        var where = document.referrer;
        if (regexp.test(where)) {
            alertDialog('洋老板新域名已启用', function () {
                window.location.replace('http://shop.yanglaoban.com');
            });
        }
    }

    var _host = window.location.host;
    if (_host.indexOf('ibaboss.com') > -1) {
        checkReferrer();
    }
})();



