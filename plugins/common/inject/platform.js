//利用原生Js获取操作系统版本
function getOS() {
    if (!global.navigator) return '';
    var sUserAgent = navigator.userAgent;
    var isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows';
    var isMac = navigator.platform == 'Mac68K' || navigator.platform == 'MacPPC' || navigator.platform == 'Macintosh' || navigator.platform == 'MacIntel';
    if (isMac) return 'Mac';
    var isUnix = navigator.platform == 'X11' && !isWin && !isMac;
    if (isUnix) return 'Unix';
    var isLinux = String(navigator.platform).indexOf('Linux') > -1;
    if (isLinux) return 'Linux';
    if (isWin) {
        var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
        if (isWin2K) return 'Win2000';
        var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
        if (isWinXP) return 'WinXP';
        var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
        if (isWin2003) return 'Win2003';
        var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
        if (isWinVista) return 'WinVista';
        var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
        if (isWin7) return 'Win7';
        var isWin10 = sUserAgent.indexOf('Windows NT 10') > -1 || sUserAgent.indexOf('Windows 10') > -1;
        if (isWin10) return 'Win10';
    }
    return 'other';
}

function IsPC() {
    var userAgentInfo = global.navigator ? navigator.userAgent : '';
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * 获取浏览器信息
 */
function getBrowserInfo() {
    var Sys = {};
    if (!global.navigator) {
        return {
            browser: 'node',
            version: '0',
        };
    }
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version|safari).*?([\d.]+)/;
    var m = ua.match(re);
    if (m == null && ua.match(/trident/) != null) {
        m = ['', 'msie', ua.match(/rv:([\d.]+)/)[1]];
    }
    m = m || ['未知', '未知', '未知'];
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];

    return Sys;
}

let sysInfo = getBrowserInfo();

const ret = {
    type: typeof window == 'undefined' ? 'node' : 'client',
    isNode() {
        //是服务器渲染
        return ret.type == 'node';
    },
    isClient() {
        // 是浏览器执行
        return ret.type == 'client';
    },
    getLocation() {
        return ret.isNode()
            ? {
                  protocol: 'http:',
                  host: 'localhost:' + Config.serverPort,
                  hostname: 'localhost',
                  port: Config.serverPort,
                  pathname: '',
                  origin: 'http://' + 'localhost:' + Config.serverPort,
              }
            : location;
    },
    OS: getOS(), //操作系统
    browser: sysInfo.browser, //sys.browser得到浏览器的类型
    version: sysInfo.ver, //sys.ver得到浏览器的版本
    isIE: sysInfo.browser == 'msie', //是否为IE浏览器
    isPC: IsPC(),
};

export default ret;
