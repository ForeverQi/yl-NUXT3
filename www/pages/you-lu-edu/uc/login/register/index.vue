<template>
    <div class="main">
        <!-- 移动端呈现的nav导航头 -->
        <nav class="header-on-mobile">
            <a class="nav-back" href="javascript:history.back()"></a>
            优路教育会员注册
        </nav>
        <div class="register-wrap" v-if="isPc">
            <div class="register-container">
                <div class="register-web-content">
                    <div class="youlu-img"></div>
                    <no-ssr>
                        <div class="register-box">
                            <div id="render-register-containder"></div>
                        </div>
                    </no-ssr>
                </div>
            </div>
        </div>
        <div class="login-foot" v-if="isPc">
            <GlobleFotter></GlobleFotter>
        </div>
        <div class="phone-register-wrap" v-if="!isPc">
            <no-ssr>
                <div class="phone-register-box">
                    <div id="render-register-containder"></div>
                </div>
            </no-ssr>
        </div>
    </div>
</template>

<script>
import yiguan from './js/yiguan.js';
import mobileMixin from './js/mixin.mobile.login-and-register';
import foot from '@/www/components/uc/login/foot/index.vue';
import loginApi from '@/api/login.js';
import GlobleFotter from '@/layouts/components/global-footer/index.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
/**
 * 校验重定向的目标是否是优路自己的网站，如果不是，则给出醒目提示，以规避自己的法律风险
 * @param {String} url 待判定的 URL
 * @returns {Boolean}
 */
const isURLOwnedByYoulu = (() => {
    var whiteList = ['niceloo.com', 'youlu.com'];

    return (url) => {
        var flag = false;
        // var s = /^(https?:)?(\/\/)?([a-zA-Z0-9.]+)[/?]*/.exec(url);
        var s = new URL(url);
        if (s.hostname) {
            whiteList.forEach((e) => {
                if (s.hostname.endsWith(e)) {
                    flag = true;
                }
            });
        }
        return flag;
    };
})();

export default {
    name: 'login',
    components: { foot, GlobleFotter },
    mixins: [mobileMixin],
    layout: 'nullLayout',
    data() {
        return {
            showPwdWeakTip: false,
            yiguan,
        };
    },
    head() {
        return this.$head({
            title: '优路教育_注册_点亮职业人生',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    mounted() {
        this.renderRegister();
    },
    methods: {
        ...loginRegisterTrack,

        //重定向
        goRedirect() {
            let redirect = this.$urlUtils.getRedirect();
            let page = this.$urlUtils.getUrlParam('page');
            if (redirect) {
                if (isURLOwnedByYoulu(redirect)) {
                    if (redirect.indexOf('logoutConfirm') > -1 || redirect.indexOf('logoutReason') > -1 || redirect.indexOf('logoutExamine') > -1) {
                        return this.$PageUtil.goHome();
                    }
                    this.$PageUtil.href(redirect);
                } else {
                    // TODO 将 /target 从 pcweb 迁移至 nuxt
                    this.$PageUtil.href(`/target?url=${encodeURIComponent(redirect)}`);
                    // this.$router.push(`/target?url=${redirect}`);
                }
            } else if (page) {
                this.$router.push(page);
            } else {
                this.$PageUtil.goHome();
            }
        },
        // 渲染注册
        async renderRegister() {
            // const { pageName, endPageName } = this.$route.query;
            // const extension = await this.$PromotionUtilNew.getLoginExtension();
            const clueExtension = await this.$Promotion.getClueExtensionInfo({
                originCode: 'guanwangzhuc',
                clueWaycode: 'zhuce',
            });
            // const regExtension = await this.$PromotionUtilNew.getRegExtension();
            const params = {
                containerDomElemenet: 'render-register-containder',
                clue: { clueExtension },
                ontipbindphonenumber: this.report,
                onswitchwxlogin: this.wxLoginReport,
                onstatechange: (state) => {
                    if (state.isQRCodeScanned) {
                        console.log(state);
                        this.trackScanWx3Login('登录界面', this.$route.query.pageName || document.title);
                    }
                },
            };
            ylPlugin.login.showRegister({ ...params }).then(
                (res) => {
                    console.log('youlu_login_in', JSON.stringify(res));
                    this.report(true, '', res.loginMethod);
                    if (res && ['pwd', 'sms', 'wx1', 'wx2', 'wx3'].includes(res.loginMethod)) {
                        // 登陆方式为微信需要推送线索参数
                        if (['wx1', 'wx2', 'wx3'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                            this.pushWxClue();
                        }
                        if (res.loginMethod === 'pwd' && res.isWeakPassword === 'Y') {
                            this.$baseUI.confirm({
                                title: '温馨提示',
                                content: '当前密码复杂度过低，为了您的账号安全，请尽快修改密码',
                                confirmText: '立即修改',
                                cancelText: '暂不修改',
                                showCancel: true,
                                confirm: () => {
                                    this.goChangePassword();
                                },
                                cancel: () => {
                                    this.goRedirect();
                                },
                            });
                        } else {
                            setTimeout(() => {
                                this.goRedirect();
                            }, 100);
                        }
                    }
                },
                (error) => {
                    console.log(error);
                    this.report(false, error.msg, error.loginMethod);
                }
            );
        },
        /**
         * @description 上报
         * @param status 上报状态 true 成功  false 失败
         * @param message 上报的错误消息
         * @param loginMethod 方法
         */
        report(status = true, message = '', loginMethod) {
            let loginResource = /pageName=(.*)&?/.exec(decodeURIComponent(location.search));
            loginResource = loginResource && loginResource[1] ? loginResource[1] : '首页';
            if (['wx1', 'wx2', 'wx3', 'wx1ScanCode', 'wx2ScanCode', 'wx3ScanCode'].includes(loginMethod)) {
                loginResource = '优路教育web网站';
            }
            // 方法相对应中文的Map
            const loginMethodsMap = new Map([
                ['wx1ScanCode', ''],
                ['wx2ScanCode', ''],
                ['wx3ScanCode', ''],
                ['wx1', '微信扫码登录'],
                ['wx2', '微信扫码登录'],
                ['wx3', '微信扫码登录'],
                ['pwd', '账号登录'],
                ['sms', '短信登录'],
                ['register', '注册'],
            ]);
            // 方法相对应上报类型的Map
            const loginMethodToReportType = new Map([
                ['wx1ScanCode', 'login_in_sucess'],
                ['wx2ScanCode', 'login_in_sucess'],
                ['wx3ScanCode', 'login_in_sucess'],
                ['wx1', 'login_in_new'],
                ['wx2', 'login_in_new'],
                ['wx3', 'login_in_new'],
                ['pwd', 'login_in_new'],
                ['sms', 'login_in_new'],
                ['register', 'register_new'],
            ]);
            const reportType = loginMethodToReportType.get(loginMethod);

            this.$yiguan.track(reportType, {
                login_success: status,
                fail_reason: message,
                login_resource: loginResource,
                login_method: loginMethodsMap.get(loginMethod),
                superProperty: this.yiguan(),
            });
            let redirect = this.$route.query.redirect || '';
            let sourceType = redirect.indexOf('learningCenter') > -1 ? '学习中心' : redirect.indexOf('exam') > -1 ? '题库' : '-';
            if (loginMethod !== 'register') {
                // 新加入的登录埋点事件
                this.$yiguan.track('youlu_login_in', {
                    login_method: loginMethodsMap.get(loginMethod),
                    is_success: status,
                    fail_reason: message,
                    page_type: '-',
                    course_type: '-',
                    login_type: '页面登录',
                    page_name: this.$route.query.pageName || document.title,
                    entrance_resource: this.$route.query.sourceType || sourceType,
                });
            }

            // 易观上报
            this.trackLoginOrRegister(status, message, loginMethod, this.$route.query.pageName || document.title, '免费注册', '登录界面');
        },
        // 微信上报
        wxLoginReport() {
            this.$yiguan.track('click_wx_QRcode', {
                login_resource: '优路教育web网站',
            });
        },
        // 推送微信线索
        async pushWxClue() {
            const { pageName, endPageName } = this.$route.query;
            let clues = await this.$PromotionUtil.getOptExtension_new({
                originCode: 'guanwangzhuc',
                clueWaycode: 'zhuce',
                project: {},
                pageName: pageName || endPageName,
            });
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension: clues,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
        // 跳转到修改密码页面
        goChangePassword() {
            this.$PageUtil.href(`/uc/manager/personalCenter/accountSafe`);
        },
    },
};
</script>
<style>
@import './css/login.css';
</style>
<style scoped lang="less">
nav {
    border: 0;
    font-weight: normal;
    display: block;
}
.header-on-mobile {
    display: none;
}
.main {
    overflow: hidden;
}
/* 没有确定展现环境时暂且隐藏 */
.main:not([data-env]) {
    visibility: hidden;
}
/* 确定环境后再展现 */
.main[data-env] {
    visibility: visible;
}
@import './css/register.mob.less';
</style>
