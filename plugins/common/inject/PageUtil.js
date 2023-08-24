import PromotionUtil from './PromotionUtil.js';
import UrlUtil from '~/plugins/common/inject/urlUtils';

export default (config) => ({
    getOriginUrl() {
        return window.location.origin;
    },
    getMobileOriginUrl() {
        return this.getOriginUrl().replace(/\b(?:www|uc)\b/i, 'm');
    },
    /**
     * 刷新当前页面
     * @param url
     */
    reflush() {
        window.location.reload();
    },
    getStartIndex(page) {
        if (page.pageIndex <= 0) page.pageIndex = 1;
        return (page.pageIndex - 1) * page.pageSize;
    },

    openNewPage(url) {
        setTimeout(() => {
            let a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }, 100);
    },

    toLogin(parmas) {
        var pathname = '';
        try {
            pathname = window.top.location.pathname;
        } catch (e) {
            pathname = window.location.pathname;
        }
        if (pathname.startsWith('/uc/login') || pathname.startsWith('/uc/register')) {
            console.log();
        } else {
            PromotionUtil(config.env).setEndPageUrl();
            PromotionUtil(config.env).setEndPageName();
        }
        let endPageName = PromotionUtil(config.env).getEndPageName();

        this.href(UrlUtil.loginUrl + `?redirect=` + encodeURIComponent(UrlUtil.getFullUrl()) + (endPageName ? `&endPageName=${endPageName}` : ''));
    },

    href(url) {
        window.location.href = url;
    },
    replaceUrl(url) {
        window.location.replace(url);
    },

    mobileHref(url) {
        window.location.href = this.getMobileOriginUrl() + url;
    },

    goHome() {
        this.href('/');
    },

    openLoginModal() {},

    closeLoginModal() {},
    /**
     * 下载文件
     * @param path 文件服务器存储的path路径
     */
    download(path) {
        if (window.location.host.indexOf('jiaoyu361.com') > -1) {
            // 判断登录来源 -1时不可点击
            global.__implXlib_alert__('该功能在仿真环境下不支持预览!');
            return;
        }
        window.open(UrlUtil.getDownloadUrl(path));
    },
});
