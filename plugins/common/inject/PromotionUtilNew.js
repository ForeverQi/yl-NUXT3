import CookieUtil from './cookieUtil';
import Platform from './platform';
import User from './user';
import UrlUtil from './urlUtils';
export default (config) => {
    let ret = {
        /**
         * 设置首次进入时的路径；用户首次（24小时为一个计时周期），前端页面要记忆（Cookie方式）落地初始页的页面路径，在登录和注册的的请求环节，传入到extention参数中。
         */
        setOriginUrl() {
            if (Platform.isClient()) {
                if (!ret.getOriginUrl()) {
                    let originUrl = '';
                    try {
                        originUrl = window.top.location.href;
                    } catch (e) {
                        originUrl = window.location.href;
                    }
                    if (/redirect=(.*)/.test(originUrl)) {
                        originUrl = decodeURIComponent(UrlUtil.getRedirect());
                    }
                    CookieUtil.set('OriginUrl', originUrl, 48 * 60 * 60 * 1000);
                }
            }
        },
        setEndPageUrl() {
            // debugger;
            CookieUtil.set('Promotion_EndPageUrl', location.href, null, false);
        },
        getEndPageUrl() {
            // debugger;
            return CookieUtil.get('Promotion_EndPageUrl', false);
        },
        setEndPageName() {
            // debugger;
            CookieUtil.set('Promotion_EndPageName', ret.getPageName() || document.title, null, false);
        },
        getEndPageName() {
            // debugger;
            return CookieUtil.get('Promotion_EndPageName', false);
        },

        /**
         * 获取首次进入时的路径
         */
        getOriginUrl() {
            return CookieUtil.get('OriginUrl', false);
        },
        getPageName() {
            if (Platform.isClient()) {
                if (window.parent.getPromotionPageName) {
                    return window.parent.getPromotionPageName();
                }
            }
        },
        async getExtension(ops = {}) {
            return JSON.stringify({
                ...(await ret.getBaseExtension()),
                ...ops,
            });
        },
        getLoginExtension() {
            return ret.getExtension({
                ...ret.getLoginRegInfo('login'),
                sourceType: 'LOGIN',
            });
        },
        getRegExtension() {
            return ret.getExtension({
                ...ret.getLoginRegInfo('reg'),
                sourceType: 'REGIST',
            });
        },
        getSource(url) {
            if (!url) return null;
            if (url.indexOf('/exam') > 0 || url.indexOf('/mk/') > 0) return '42';
            else if (url.indexOf('/open') > 0 || url.indexOf('/os') > 0) return '55';
            else if (url.indexOf('/live') > 0) return '55';
            //'50';
            else if (url.indexOf('/class') > 0 || url.indexOf('/cc') > 0) return '441';
            else return null;
        },
        getProjectSeocode(url) {
            if (!url) return null;
            let arr = /(com|com:8888)\/(.*?)\/(open|live|class)/.exec(url) || [null, null, null];
            return arr[2];
        },
        getLoginRegInfo(type) {
            //type login reg
            var endUrl;
            if (window.parent == window) {
                endUrl = ret.getEndPageUrl() || UrlUtil.getRedirect() || location.href;
            } else {
                try {
                    endUrl = window.parent.location.href;
                } catch (e) {
                    endUrl = window.location.href;
                }
            }
            let source = ret.getSource(endUrl) || (type == 'login' ? '00' : '01');
            if (!ret.getSource(endUrl)) {
                ret.getPageName();
            }
            return {
                source,
                projectCode: ret.getProjectcode(endUrl),
                projectSeocode: ret.getProjectSeocode(endUrl),
                rcdEndurl: endUrl,
                pageName: UrlUtil.getUrlParam('endPageName') || ret.getPageName() || ret.getEndPageName() || (type == 'login' ? '自然登录' : '自然注册'), //window.parent.document.title,
            };
        },
        async getLearnCardExtension() {
            //学习卡推送
            var o = await ret.getBaseExtension();
            return ret.getExtension({
                clueStarturl: o.rcdStarturl,
                clueIdentifyid: o.identifyCode,
                clueClientbrowserver: o.exploreInfo,
                clueClientip: o.clientIp,
                projectCode: o.projectCode,
                projectSeocode: o.projectSeocode,
                clueEndurl: o.rcdEndurl,
                clueEndname: o.pageName,
                // rcdStarturl-----clueStarturl
                // identifyCode-----clueIdentifyid
                // exploreInfo-----clueClientbrowserver-
                // clientIp-----clueClientip
                // projectCode-----projectCode-
                // projectSeocode-----projectSeocode-
                // rcdEndurl-----clueEndurl-
                // pageName-----clueEndname-
            });
        },
        // getExamExtension(){
        //     return {
        //         pageName:document.title,
        //         extension:JSON.stringify({
        //             urlhost:global.location&&global.location.href,
        //             originUrl:ret.getOriginUrl(),
        //         })
        //     }
        // },
        getProjectcode(url) {
            if (!url) return null;
            let arr = /exam\/index\/list\/(.*?)\/(.*?)/.exec(url) ||
                /exam\/examinfo\/(.*?)\/(.*?)/.exec(url) ||
                /exam\/ks\/new\/(.*?)\/(.*?)/.exec(url) || [null, null];
            let code = arr[1];
            if (!code) {
                arr = /member\/mk\/list\/(.*?)\/(.*?)\/(.*?)/.exec(url) || [null, null, null];
                code = arr[2];
            }
            return code;
        },
        async getBaseExtension() {
            var user = (await User(config.env).getUser()) || {};
            return {
                identifyType: 'M',
                identifyCode: user.userMobile,
                // platform:"PC",
                sourceType: 'OTHER',
                source: '',
                exploreInfo: global.navigator && global.navigator.userAgent,
                clientIp: '',
                userName: user.userName,
                projectSeocode: ret.getProjectSeocode(global.location && global.location.href),
                projectCode: ret.getProjectcode(global.location && global.location.href),
                projectSourceid: '',
                pageId: '',
                rcdStarturl: ret.getOriginUrl() || (global.location && global.location.href),
                rcdEndurl: global.location && global.location.href,
                pageName: global.document && global.document.title,
                remark: '',
            };
        },
    };
    ret.setOriginUrl();
    return ret;
};
