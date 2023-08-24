import CookieUtil from './cookieUtil';
import Platform from './platform';
import ProjectUtil from './projectUtil';
import User from './user';
import UrlUtils from './urlUtils';
export default (config) => {
    let ret = {
        /**
         * 设置首次进入时的路径；用户首次（24小时为一个计时周期），前端页面要记忆（Cookie方式）落地初始页的页面路径，在登录和注册的的请求环节，传入到extention参数中。
         */
        setOriginUrl() {
            if (Platform.isClient()) {
                if (!this.getOriginUrl()) {
                    let originUrl = '';
                    try {
                        originUrl = window.top.location.href;
                    } catch (e) {
                        originUrl = window.location.href;
                    }
                    if (/redirect=(.*)/.test(originUrl)) {
                        originUrl = decodeURIComponent(UrlUtils.getRedirect());
                    }
                    CookieUtil.set('OriginUrl', originUrl, 24 * 60 * 60 * 1000, false);
                }
            }
        },
        setEndPageUrl() {
            // debugger;
            let originUrl = UrlUtils.getRedirect();
            if (!originUrl) {
                try {
                    originUrl = window.top.location.href;
                } catch (e) {
                    originUrl = window.location.href;
                }
            }
            CookieUtil.set('Promotion_EndPageUrl', originUrl, 48 * 60 * 60 * 1000, false);
        },
        getEndPageUrl() {
            // debugger;
            let originUrl = UrlUtils.getRedirect();
            if (!originUrl) {
                try {
                    originUrl = window.top.location.href;
                } catch (e) {
                    originUrl = window.location.href;
                }
            }
            return originUrl;
        },
        setEndPageName() {
            // debugger;
            let title = '';
            try {
                title = window.top.document.title;
            } catch (e) {
                title = document.title;
            }
            CookieUtil.set('Promotion_EndPageName', title, 24 * 60, false);
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
        getOptExtension_new({ originCode = '', clueWaycode = '', project = { projectId: '', projectCode: '', projectSeocode: '' }, pageName = '' }) {
            var href = global.location && global.location.href && /redirect=(.*)/.exec(global.location.href);
            if (href && href[1]) {
                var result = decodeURIComponent(href[1]);
            } else {
                let originUrl = '';
                try {
                    originUrl = global.top.location.href;
                } catch (e) {
                    originUrl = global.location.href;
                }
                result = originUrl;
            }
            // var pathname = global.top.location.pathname;
            var s = {};
            result = decodeURIComponent(result);
            // 频道页线索
            if (/(jg\.|jgtest\.|jgdev\.|jguat\.)/.test(result) || /\/dpt\/2698/.test(result)) {
                if (/jgtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(xa\.|xatest\.|xadev\.|xauat\.)/.test(result) || /\/dpt\/2699/.test(result)) {
                if (/xatest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(jj\.|jjtest\.|jjdev\.|jjuat\.)/.test(result) || /\/dpt\/2959/.test(result)) {
                if (/jjtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(jk\.|jktest\.|jkdev\.|jkuat\.)/.test(result) || /\/dpt\/2960/.test(result)) {
                if (/jktest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(cj\.|cjtest\.|cjdev\.|cjuat\.)/.test(result) || /\/dpt\/2701/.test(result)) {
                if (/cjtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000063', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                } else if (/cjuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20190411010000000143', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20190411010000000143', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                }
            } else if (/(yiwei\.|yiweitest\.|yiweidev\.|yiweiuat\.)/.test(result) || /\/dpt\/2700/.test(result)) {
                if (/yiweitest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000063', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //test
                } else if (/yiweiuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //uat/prod
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //uat/prod
                }
            } else if (/(js\.|jstest\.|jsdev\.|jsuat\.)/.test(result) || /\/dpt\/2702/.test(result)) {
                if (/jstest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                } else if (/jsuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                }
            } else if (/(fk\.|fktest\.|fkdev\.|fkuat\.)/.test(result) || /\/dpt\/2961/.test(result)) {
                if (/fktest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //test
                } else if (/fkuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //uat/prod
                }
            } else if (/(gongkao\.|gongkaotest\.|gongkaodev\.|gongkaouat\.)/.test(result) || /\/dpt\/2962/.test(result)) {
                if (/gongkaotest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //test
                } else if (/gongkaouat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //uat/prod
                }
            } else if (/(kaoyan\.|kaoyantest\.|kaoyandev\.|kaoyanuat\.)/.test(result) || /\/dpt\/2963/.test(result)) {
                if (/kaoyantest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //test
                } else if (/kaoyanuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //uat/prod
                }
            } else if (/\/((\w|\d)+)\/ziliao_(\w|\d)+_(\d|\w)+.*/.test(result)) {
                // 资料线索
                var seocodeResult = /\/((\w|\d)+)\/ziliao_(\w|\d)+_(\d|\w)+.*/.exec(result);
                if (seocodeResult) {
                    s.projectSeocode = seocodeResult[1];
                }
                if (/wwwtest/.test(result)) {
                    s.originId = 'ORIGIN20200916030000000034'; //test
                } else {
                    s.originId = 'ORIGIN20200720030000000051'; //uat/prod
                }
                s.projectId = '';
                s.projectCode = '';
            } else if (/wwwtest/.test(result)) {
                s = {
                    originId: 'ORIGIN20200916030000000034',
                }; //test
            } else {
                s = {
                    originId: 'ORIGIN20200720030000000051',
                }; //uat/prod
            }
            delete s.originId;

            // projectId: project.projectId,
            // projectCode: project.projectCode,
            // projectSeocode: project.projectSeocode,
            s.projectId = project.projectId;
            s.projectCode = project.projectCode;
            s.projectSeocode = project.projectSeocode;
            s.originCode = originCode; // 渠道名称
            s.clueWaycode = clueWaycode; // 获客方式
            s.clueEndurl = typeof window !== 'undefined' ? this.getEndPageUrl() : '';
            s.clueEndname = pageName; // 落地页的名称
            return this.getExtension(s);
        },
        // https://docs.qq.com/sheet/DTkN4bkZscFpMdmV2?tab=h6mecg&_t=1608171860358
        getOptExtension() {
            var href = global.location && global.location.href && /redirect=(.*)/.exec(global.location.href);
            if (href && href[1]) {
                var result = decodeURIComponent(href[1]);
            } else {
                let originUrl = '';
                try {
                    originUrl = global.top.location.href;
                } catch (e) {
                    originUrl = global.location.href;
                }
                result = originUrl;
            }
            // var pathname = global.top.location.pathname;
            var s = {};
            result = decodeURIComponent(result);
            // 频道页线索
            if (/(jg\.|jgtest\.|jgdev\.|jguat\.)/.test(result) || /\/dpt\/2698/.test(result)) {
                if (/jgtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(xa\.|xatest\.|xadev\.|xauat\.)/.test(result) || /\/dpt\/2699/.test(result)) {
                if (/xatest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(jj\.|jjtest\.|jjdev\.|jjuat\.)/.test(result) || /\/dpt\/2959/.test(result)) {
                if (/jjtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(jk\.|jktest\.|jkdev\.|jkuat\.)/.test(result) || /\/dpt\/2960/.test(result)) {
                if (/jktest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201218110000000002' }; //uat/prod
                }
            } else if (/(cj\.|cjtest\.|cjdev\.|cjuat\.)/.test(result) || /\/dpt\/2701/.test(result)) {
                if (/cjtest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000063', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                } else if (/cjuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20190411010000000143', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20190411010000000143', clueEsdptid: 'ORIGINDICT20201218110000000001' };
                }
            } else if (/(yiwei\.|yiweitest\.|yiweidev\.|yiweiuat\.)/.test(result) || /\/dpt\/2700/.test(result)) {
                if (/yiweitest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000063', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //test
                } else if (/yiweiuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //uat/prod
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201203020000000004' }; //uat/prod
                }
            } else if (/(js\.|jstest\.|jsdev\.|jsuat\.)/.test(result) || /\/dpt\/2702/.test(result)) {
                if (/jstest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                } else if (/jsuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: '', clueEsdptid: 'ORIGINDICT20201203020000000003' };
                }
            } else if (/(fk\.|fktest\.|fkdev\.|fkuat\.)/.test(result) || /\/dpt\/2961/.test(result)) {
                if (/fktest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //test
                } else if (/fkuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000003' }; //uat/prod
                }
            } else if (/(gongkao\.|gongkaotest\.|gongkaodev\.|gongkaouat\.)/.test(result) || /\/dpt\/2962/.test(result)) {
                if (/gongkaotest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //test
                } else if (/gongkaouat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218100000000001' }; //uat/prod
                }
            } else if (/(kaoyan\.|kaoyantest\.|kaoyandev\.|kaoyanuat\.)/.test(result) || /\/dpt\/2963/.test(result)) {
                if (/kaoyantest/.test(result)) {
                    s = { originId: 'ORIGIN20200916030000000034', schoolId: 'SCHOOL20190411010000000007', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //test
                } else if (/kaoyanuat/.test(result)) {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //test
                } else {
                    s = { originId: 'ORIGIN20200720030000000051', schoolId: 'SCHOOL20201205220000000006', clueEsdptid: 'ORIGINDICT20201218110000000004' }; //uat/prod
                }
            } else if (/\/((\w|\d)+)\/ziliao_(\w|\d)+_(\d|\w)+.*/.test(result)) {
                // 资料线索
                var seocodeResult = /\/((\w|\d)+)\/ziliao_(\w|\d)+_(\d|\w)+.*/.exec(result);
                if (seocodeResult) {
                    s.projectSeocode = seocodeResult[1];
                }
                if (/wwwtest/.test(result)) {
                    s.originId = 'ORIGIN20200916030000000034'; //test
                } else {
                    s.originId = 'ORIGIN20200720030000000051'; //uat/prod
                }
                s.projectId = '';
                s.projectCode = '';
            } else {
                var project = ProjectUtil.getProject() || {};
                if (/wwwtest/.test(result)) {
                    s = {
                        originId: 'ORIGIN20200916030000000034',
                        projectId: project.projectId,
                        projectCode: project.projectCode,
                        projectSeocode: project.projectSeocode,
                    }; //test
                } else {
                    s = {
                        originId: 'ORIGIN20200720030000000051',
                        projectId: project.projectId,
                        projectCode: project.projectCode,
                        projectSeocode: project.projectSeocode,
                    }; //uat/prod
                }
            }
            s.clueEndurl = this.getEndPageUrl();
            s.clueEndname = this.getEndPageName();
            return this.getExtension(s);
        },

        async getExtension(ops = {}) {
            let extensions = await this.getClueExtension();
            return JSON.stringify({
                ...extensions,
                ...ops,
            });
        },
        getLoginExtension() {
            //登录推送
            return this.getExtension({
                eventType: 'LOGIN',
            });
        },
        getProjectSeocode(url) {
            if (!url) return null;
            let arr = /(com|com:8888)\/(.*?)\/(open|live|class)/.exec(url) || [null, null, null];
            return arr[2];
        },
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
        async getClueExtension() {
            //线索推送 注册 和学习卡
            var user = {};
            if (User(config).getToken()) {
                user = await User(config).getUser();
            }
            var info = new Browser() || {};
            return {
                clueMobile: user.userMobile, //*是*手机号*终端*
                clueWechat: '', //*否*微信号*终端*
                clueQq: '', //*否*QQ号*终端*
                clueEmail: user.userEmail, //*否*邮箱*终端*
                clueUsername: user.userName, //*否*客户姓名*终端*
                clueFormdata: '', //*否*用户表单数据对象*终端*[说明]定义如下表*[格式]JSON: "",//
                clueStarturl: (this.getOriginUrl() && decodeURIComponent(this.getOriginUrl())) || (global.location && this.getEndPageUrl()), //*否*初始来源url: "",//终端*[说明]用户通过外链访问的第一个页面的路径*
                clueEndurl: global.location && this.getEndPageUrl(), //*否*落地来源url: "",//终端*[说明]触发推送行为时的页面的路径*
                clueEndname: global.document && global.document.title, //*否*落地名称*终端*[说明]触发推送行为时的页面的界面名称。例:资料_资料名称、题库_题库名称、公开课_公开课名称或者使用网页标题*
                brandId: user.brandId, //*是*品牌标识*终端*[说明]品牌标识[枚举]GEEDU:环球;YOULU:优路*
                originId: '', //*是*来源标识*终端*
                clueWay: '', //*否*获客方式*终端*
                projectId: '', //*是*项目标识*终端*[条件]三选一*
                projectCode: this.getProjectcode(global.location && global.location.href), //*项目编号*终端*
                projectSeocode: this.getProjectSeocode(global.location && global.location.href), //*项目SEO编号
                regionId: '', //*否*大区标识*终端*
                schoolId: '', //*否*分校标识*终端*
                agentId: '', //*否*代理商标识*终端*
                clueEsdptid: '', //*否*推广部门标识*终端*
                clueEseeid: '', //*否*推广人标识*终端*
                clueDelaytime: '', //否*延迟推送*终端*[说明]延迟推送的时间*[单位]分钟*
                eeId: '', //*否*员工标识*终端*[说明]目标员工*
                clueClientinfo: '', //*否*客户端信息对象*终端*[说明]定义如下表*[格式]
                clueClientip: '', //*是*客户端 ip: "",//网关*[说明]用户的真实
                clueClienttype: '', //*是*客户端类型*网关*[说明]和此文档的值保持一致*//[注意]从网关处获取*

                clueEdulevel: user.userEdulevel, //*否*学历*终端*[枚举]:初中;高中;大专;本科;硕士;博士*是*
                clueWorkyearnum: '', //否 工作年限 否*工作年限*终端*[说明]年限数值*是*
                clueProjectyear: '', //否项目年限 否*项目年限*终端*[说明]年限数值*是*
                clueEntrycon: '', //*否*报名条件*终端*是*
                clueProvince: '', //*否*省份*终端*[说明]省份名称*[举例]:河南*
                clueCity: user.userAreadesc, //*否*城市*终端*[说明]城市名称*[举例]:郑州*
                clueGender: user.userGender, //*否*性别*终端*[枚举]:男;女;*
                clueBirthdate: user.userBirthday, //*否*出生日期*终端*[格式]:
                clueAge: '', //年龄数值 否*年龄*终端*[说明]年龄数值*
                clueMarital: '', //*否婚否*终端*[枚举]:未婚;已婚;*
                clueCountry: '', //*否国家*终端*[说明]国家名称*[举例]:中国*
                clueLanguage: '', //*否*语言*终端*[说明]语言名称*[举例]:汉语*

                clueClientdevice: info.device, //客户端设备
                clueClientver: info.os + ' ' + info.osVersion, //客户端版本
                clueClientbrowser: info.browser + '/' + info.engine, //客户端浏览器
                clueClientbrowserver: info.version, //客户端浏览器版本
            };
        },
        async getBehaviorExtension() {
            //行为推送 登录 其他
            var user = {};
            if (User(config.env).getToken()) {
                user = await User(config.env).getUser();
            }
            var info = new Browser() || {};
            return {
                userId: user.userId, //是*用户标识*终端*
                eventType: '', //是*事件类型*终端*[说明]具体的事件类型*[枚举]LOGIN:登录;BROWSE:浏览;ORDER:下单;PAGEING:翻页; JUMP:跳转*[名词解释]浏览:浏览某一个页面;*跳转:点击超链接*
                moduleType: '', //是*模块类型*终端*[说明]具体业务模块*[枚举]OTHER:其他;OPEN:公开课;SYSTEM:系统课;EXAM:题库;DOC:资料;NEWS:新闻;CLASS购课*
                brandId: '', //是*品牌标识*终端*[说明]品牌标识 [枚举]GEEDU:环球;YOULU:优路*
                projectId: '', //否*项目标识*终端*
                behaviorStarturl: (this.getOriginUrl() && decodeURIComponent(this.getOriginUrl())) || (global.location && global.location.href), //否*初始来源 url: "",//终端*
                behaviorEndurl: global.location && global.location.href, //否*落地来源 url: "",//终端*
                behaviorEndname: global.document && global.document.title, //否*落地名称*终端*[说明]触发推送行为时的页面的界面名称。例:资料
                behaviorMemo: '', //否*行为备注信息*终端*[说明]自定义备注信息,客户端埋点说明补充*
                behaviorCreatetime: new Date().toLocaleString(), //否*行为创建时间*终端*
                behaviorClientifo: '', //否*客户端详细信息*终端*[说明]定义如下表*[格式]
                behaviorClientip: '', //是*客户端 网关*[注意]从网关处获取*
                behaviorClienttype: '', //是*客户端类型*网关*编码地址： //[注意]从网关处获取*

                behaviorClientdevice: info.device, //客户端设备
                behaviorClientver: info.os + ' ' + info.osVersion, //客户端版本
                behaviorClientbrowser: info.browser + '/' + info.engine, //客户端浏览器
                behaviorClientbrowserver: info.version, //客户端浏览器版本
            };
        },
        async mcuClueOrBeHavior(obj) {
            // 微课显示或行为数据获取
            var user = {};
            if (User(config).getToken()) {
                user = await User(config).getUser();
            }
            // 微课的登录和注册推送
            var s = {};
            // 频道页线索
            s.originCode = 'wkptwkpc';
            s.clueStarturl = typeof window !== 'undefined' ? document.referrer : this.getOriginUrl() ? this.getOriginUrl() : location.href;
            s.clueEndurl = typeof window !== 'undefined' ? location.href : '';
            s.clueEsdptcode = 'hlwyyb';
            s.projectId = obj.projectId;
            s.clueWaycode = obj.clueWaycode; // 购买试听获客方式是商品订单，其他都是引导注册
            s.clueEndname = obj.pageName;
            let remark = [];
            if (obj.remark === '优路微课-注册/登录') {
                remark.push({
                    key: 'clueRemarks',
                    value: '优路微课PC端',
                    desc: '【注册/登录】',
                });
            } else {
                let arr = /【(\W+)】((\W|[1-9a-z])+)/.exec(obj.remark);
                if (arr && arr.length === 3) {
                    remark.push({
                        key: 'clueRemarks',
                        // value: arr[2],
                        value: '优路微课PC端',
                        desc: `【${arr[1]}】`,
                    });
                } else {
                    remark.push({
                        key: 'clueRemarks',
                        // value: obj.remark,
                        value: '优路微课PC端',
                        desc: obj.remark,
                    });
                }
            }
            s.projectSeocode = '';
            s.clueFormdata = remark;
            s.clueMobile = user.userMobile ? user.userMobile : obj.phone ? obj.phone : '';
            return this.getExtension(s);
        },
    };
    ret.setOriginUrl();
    return ret;
};
