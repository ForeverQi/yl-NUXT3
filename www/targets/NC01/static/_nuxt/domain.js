(function () {
    /**
     * 设置域名，以规避跨域问题，满足多窗口（包含 iframe）之间的通讯需要
     */
    var whiteList = ['niceloo.com', 'youlu.com', 'zywinner.com'];
    for (var i = 0; i < whiteList.length; i++) {
        if (location.host.indexOf(whiteList[i]) > 0) {
            window.document.domain = whiteList[i];
            break;
        }
    }
})();
