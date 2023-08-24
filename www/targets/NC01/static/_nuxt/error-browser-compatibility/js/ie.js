var s = document.getElementById('ie');
var entry = document.getElementById('main_nuxt');
s.innerHTML =
    '' +
    '<div class="m-container">' +
    '<img class="logo" src="/_nuxt/error-browser-compatibility/asset/images/logo.png"/>' +
    '<img class="content-left" src="/_nuxt/error-browser-compatibility/asset/images/tips-img.png"/>' +
    '<div class="content-right">' +
    '<div class="tips-wrap">' +
    '        <div>启禀小主：</div>' +
    '        <span class="mb12">由于您的浏览器版本过低，很多精彩课程都被拒之殿外啦~</span>' +
    '        <span>为了保证小主的更好体验 您可以</span>' +
    '    </div>' +
    '    <div class="btn-wrap">' +
    '        <div class="btn-1 mgb20"><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载谷歌浏览器</a></div>' +
    '        <div class="btn-2 mgb20"><a href="https://www.firefox.com.cn/" target="_blank">下载火狐浏览器</a></div>' +
    '        <div class="btn-2 mgr40"><a href="https://www.microsoft.com/zh-cn/edge" target="_blank">下载edge浏览器</a></div>' +
    '        <div class="btn-2"><a href="https://browser.360.cn/ee/" target="_blank">下载360极速浏览器</a></div>' +
    '    </div>' +
    '</div>' +
    '</div>' +
    '<ul class="intro-wrap">' +
    '<li>' +
    '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_1.png"/>' +
    '    <div class="intro">主要从事建工、消防、招教、经济、公考、考研等领域的职业考试培训服务，服务网络遍布全国</div>' +
    '    <span class="intro-index">01</span>' +
    '</li>' +
    '<li>' +
    '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_2.png"/>' +
    '   <div class="intro">自有的教学和教务团队，形成了丰富的课程产品矩阵和标准化的教学管理体系</div>' +
    '    <span class="intro-index">02</span>' +
    '</li>' +
    '<li>' +
    '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_3.png"/>' +
    '    <div class="intro">线上教学为主、线上和线下结合的融合式教学，融入实景模型、智能题库、移动课堂等技术开展知识服务</div>' +
    '    <span class="intro-index">03</span>' +
    '</li>' +
    '<li>' +
    '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_4.png"/>' +
    '    <div class="intro">集OMO教学、学习平台及应用研发、图书出版发行于一体的大型知识服务实体和综合性教育服务机构</div>' +
    '    <span class="intro-index">04</span>' +
    '</li>' +
    '</ul>';

function getVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp.$1);
        if (fIEVersion === 7) {
            return 7;
        } else if (fIEVersion === 8) {
            return 8;
        } else if (fIEVersion === 9) {
            return 9;
        } else if (fIEVersion === 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}
var version = getVersion();
if (version && version < 11 && version !== -1 && version !== 'edge') {
    s.style.display = 'block';
    entry.style.display = 'none';
} else {
    entry.style.display = 'block';
}

document.body.style.visibility = '';
