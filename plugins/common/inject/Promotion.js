import CookieUtil from './cookieUtil';
import Platform from './platform';
import storage from './storage';
import UrlUtil from '~/plugins/common/inject/urlUtils';
export default (config) => {
    let init = {
        isForce: false,
        isLogin: false, // 是否在登陆
        /**
         * 获取当前url
         * @returns string
         */
        getCurrentUrl() {
            let originUrl = '';
            this.isLogin = false;
            try {
                originUrl = window.top.location.href;
            } catch (e) {
                originUrl = window.location.href;
            }
            if (/redirect=(.*)/.test(originUrl)) {
                this.isLogin = true; // 存在redirect 即在登录页
                originUrl = decodeURIComponent(UrlUtil.getRedirect());
            }
            return originUrl;
        },
        /**
         * 获取当前页面名称
         */
        getCurrentPageName() {
            let title = '';
            try {
                title = window.top.document.title;
            } catch (e) {
                title = document.title;
            }
            return title;
        },
        setEndPageInfo({ url = '', pageName = '', projectId = '', projectCode = '', projectSeocode = '', originCode = '', clueWaycode = '' }, info) {
            if (/redirect=(.*)/.test(url)) {
                // 如果url中包含redirect不在设置落地页
                return info;
            }
            info.clueEndurl = url;
            info.clueEndname = pageName;
            if (clueWaycode) {
                info.clueWaycodeend = clueWaycode;
            }
            if (originCode) {
                info.originCodeend = originCode;
            }

            if (!projectId && !projectCode && !projectSeocode) {
                return info;
            }

            delete info.projectIdend;
            delete info.projectCodeend;
            delete info.projectSeocodeend;
            if (projectId) {
                info.projectIdend = projectId;
            } else if (projectCode) {
                info.projectCodeend = projectCode;
            } else if (projectSeocode) {
                info.projectSeocodeend = projectSeocode;
            }

            return info;
        },
        /**
         *
         * @param {*}
         * @param {*} info 初始值
         * @returns Object
         */
        setStartPageInfo({ url = '', pageName = '', projectId = '', projectCode = '', projectSeocode = '', originCode = '', clueWaycode = '' }, info) {
            // 起始url没有被设置过
            if (!info.clueStarturl) {
                // 判断 OriginUrl 是否存在
                let originUrl = this.getOriginUrl();
                let originName = this.getPageName();
                let originProjectId = '';
                let originProjectCode = '';
                let originProjectSeocode = '';
                let startOriginCode = '';
                let startClueWaycode = '';

                // this.isForce true 强制复制当前初始数据
                // 处理首次进入题库列表的时候会自动跳转至项目选择页的情况
                // 初始页面和老线索中的初始页面一致的时候
                if (!originUrl || this.isForce || originUrl === url) {
                    // 如果初始化url 没有设置就不在判断初始页面的名称是否存在
                    originUrl = url;
                    originName = pageName;

                    originProjectId = projectId;
                    originProjectCode = projectCode;
                    originProjectSeocode = projectSeocode;
                    startOriginCode = originCode;
                    startClueWaycode = clueWaycode;
                }
                info.clueStarturl = originUrl;
                info.clueEndnameorigin = originName;
                info.originCode = startOriginCode;
                info.clueWaycode = startClueWaycode;
                if (originProjectId) {
                    info.projectId = originProjectId;
                } else if (originProjectCode) {
                    info.projectCode = originProjectCode;
                } else if (originProjectSeocode) {
                    info.projectSeocode = originProjectSeocode;
                }
            } else if (url === info.clueStarturl && !this.isLogin) {
                // 开始url和当前url相同更新数据
                // 如果初始项目已经存在就不在更新
                // 1、更新名称
                info.clueEndnameorigin = pageName;
                if (clueWaycode) {
                    info.clueWaycode = clueWaycode;
                }
                if (originCode) {
                    info.originCode = originCode;
                }
                if (info.projectId || info.projectCode || info.projectSeocode) {
                    return info;
                }
                /**
                 *
                 * 2、更新项目名称
                 * 3、渠道标识
                 */

                if (projectId) {
                    info.projectId = projectId;
                } else if (projectCode) {
                    info.projectCode = projectCode;
                } else if (projectSeocode) {
                    info.projectSeocode = projectSeocode;
                }
            }
            // 起始页面被设置过的不在重新设置

            return info;
        },
        /**
         * 获取线索集合信息
         */
        getClueInfo() {
            return CookieUtil.get('clueCollect', false);
        },
        getPageName() {
            if (Platform.isClient()) {
                if (window.parent.getPromotionPageName) {
                    return window.parent.getPromotionPageName();
                }
            }
        },
        /**
         * 获取首次进入时的路径
         */
        getOriginUrl() {
            return CookieUtil.get('OriginUrl', false);
        },
        /**
         * 基础数据
         */
        getBaseInfo() {
            return new Promise((resolve) => {
                let user = storage(config).get('loginStatus');
                if (!user) {
                    user = {};
                }
                resolve({
                    eventType: 'LOGIN', // 事件类型
                    // clueId: user.clueId, // 线索唯一标识 不传
                    convertToclue: 'Y', // 是否行为转线索
                    clueLoginid: user.loginId, // 登录标识/登录ID
                    userId: user.userId, // 用户标识
                    // clueUsername: '', // 客户姓名 不在传
                    // clueMobile: '', // 手机号 不在传
                    clueStarturl: '', // 初始来源url
                    clueEndnameorigin: this.getPageName(), // 初始落地名称
                    clueEndurl: '', // 落地来源url
                    clueEndname: this.getPageName(), // 当前落地名称
                    // originId: '', // 初始渠道标识 不再传
                    originCode: 'guanwangzhuc', // 初始渠道编码
                    // originIdend: '', // 当前渠道标识 不再传
                    originCodeend: 'guanwangzhuc', // 当前渠道编码
                    clueWay: '', // 初始获客方式 中文名称
                    clueWaycode: 'zhuce', // 初始获客方式编码
                    clueWayend: '', // 当前获客方式 中文名称
                    clueWaycodeend: 'zhuce', // 当前获客方式编码
                    projectId: '', // 初始项目标识
                    projectCode: '', // 初始项目编号
                    projectSeocode: '', // 初始项目SEO编号
                    projectIdend: '', // 当前项目标识
                    projectCodeend: '', // 当前项目编号
                    projectSeocodeend: '', // 当前项目SEO编号
                    // clueEseeid: '', // 初始推广人标识 不传
                    // clueEseecode: '', // 初始推广人编码 不传
                    // clueEseeidend: '', // 当前推广人标识 不传
                    // clueEseecodeend: '', // 当前推广人编码 不传
                    clueOpenid: '', // 微信openId
                    clueUnionid: '', // 微信unionId
                    clueNickname: '', // 微信昵称
                    clueHeadimgurl: '', // 微信头像地址
                    gzh_AppId: '', // 开发者ID
                    clueAppname: '', // 微信公众号名称
                    clueCreateasystem: '', // 创建系统
                    brandId: user.brandId, // 品牌标识
                    clueClientip: '', // 客户端ip/访问ip
                    clueClienttype: 'YOULU.WEB', // 客户端类型/服务终端名称
                });
            });
        },
        /**
         * 设置线索集合信息
         *
         */
        setCLueInfo(opt) {
            if (process.server) {
                return {};
            }
            if (!opt.url) {
                opt.url = this.getCurrentUrl();
            }
            if (!opt.pageName) {
                opt.pageName = this.getCurrentPageName();
            }
            let info = this.getClueInfo();
            if (!info) {
                info = {};
            } else {
                try {
                    info = JSON.parse(info);
                } catch (e) {
                    info = {};
                }
            }
            this.isForce = !!opt.isForce;
            /**
             * 设置起始页面的信息
             */
            info = this.setStartPageInfo(opt, info);
            info = this.setEndPageInfo(opt, info);

            CookieUtil.set('clueCollect', JSON.stringify(info), 48 * 60 * 60 * 1000, false);
        },
        /**
         * 获取线索推广信息
         */
        getClueExtensionInfo({ pageName = '', clueWaycode = '', originCode = '' }) {
            if (process.server) {
                return {};
            }
            return this.getBaseInfo().then((ops) => {
                console.log(ops, '===');
                const info = this.getClueInfo();
                let baseInfo = {};
                try {
                    baseInfo = JSON.parse(info);
                } catch (e) {
                    baseInfo = {};
                }

                let s = {
                    ...ops,
                    ...baseInfo,
                };
                const url = this.getCurrentUrl();
                if (/redirect=(.*)/.test(url)) {
                    // 如果url中包含redirect不在设置落地页
                    return s;
                }
                if (pageName) {
                    s.clueEndname = pageName;
                }
                s.clueWaycodeend = clueWaycode; // 落地页获客方式
                s.originCodeend = originCode; // 落地页originCode
                return s;
            });
        },
    };

    if (process.client) {
        const indexSelectProject = storage(config).get('indexSelectProject');
        init.setCLueInfo({
            originCode: 'guanwangzhuc',
            clueWaycode: 'zhuce',
            projectCode: indexSelectProject.projectCode,
        });
    }

    // init.setCLueInfo({});
    return {
        setCLueInfo: init.setCLueInfo.bind(init), // 设置线索初始信息
        getClueExtensionInfo: init.getClueExtensionInfo.bind(init), // 获取线索推广信息
    };
};
