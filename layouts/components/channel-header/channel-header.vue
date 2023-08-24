<template>
    <!-- 设定高度，用于浮动元素占位 -->
    <div class="header-wrap">
        <!-- 背景色 -->
        <div
            class="header-bg"
            :class="headerBgClass"
            :style="{
                position: isFixed ? 'fixed' : 'relative',
                top: (isFixed ? top : 0) + 'px',
                'z-index': zIndex,
            }"
        >
            <!-- 内容区域 -->
            <div class="header-box">
                <div class="left-box">
                    <a href="/" class="logo-img" :target="path === '/' ? '_self' : '_blank'" @click="trackData('首页')">
                        <img src="../../asset/images/logo.png" width="129" alt="优路教育" class="logo" />
                    </a>
                    <!-- 导航LOGO -->
                    <a
                        v-if="logoInfo && imageErr"
                        :href="logoInfo.newJumpLinkUrl"
                        :target="targetType"
                        class="activity"
                        :class="{ noChangeImage: targetType === '_self' }"
                    >
                        <img :src="logoInfo.logoPath" @error="imageError" alt="优路教育" />
                    </a>
                    <div class="project-name-wrap">
                        <div
                            class="project-name"
                            @click="jumpProjectChannel"
                            @mouseenter="isShowAllProjectName = true"
                            @mouseleave="isShowAllProjectName = false"
                        >
                            {{ projectChannelInfo.columnTitle || projectChannelInfo.columnName }}
                        </div>
                        <div class="all-project-name-box" v-show="!isShowSelectProjectDialog && isShowAllProjectName && isShowName">
                            {{ projectChannelInfo.columnTitle || projectChannelInfo.columnName }}
                        </div>
                    </div>
                    <div class="change-project-wrap">
                        <div class="change-project-box" @click="openSelectProject">
                            <img class="change-project-icon" src="../../asset/images/change-project-icon.png" alt="" />
                            <div class="change-project-text">切换项目</div>
                        </div>
                        <transition name="dialog">
                            <div class="channel-list" v-show="isShowSelectProjectDialog">
                                <div class="main">
                                    <SelectProjectDialog ref="vueRefDialog" @close="closeSelectProject"></SelectProjectDialog>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <a href="/" class="link-item" :class="{ active: path === '/' }" :target="path === '/' ? '_self' : '_blank'" @click="trackData('首页')">
                        首页
                    </a>
                    <div class="course-box">
                        <div
                            class="link-item link-course-box"
                            :class="isShowCurriculum ? 'active-course' : ''"
                            @mouseenter="isShowCurriculum = true"
                            @mouseleave="isShowCurriculum = false"
                        >
                            <div>课程</div>
                            <img v-if="!isShowCurriculum" class="select-course-icon" src="../../asset/images/select-course.png" alt="" />
                            <img v-else class="select-course-icon active-icon" src="../../asset/images/selected-course.png" alt="" />
                        </div>
                        <!-- 课程隐藏弹窗 -->
                        <transition name="fade">
                            <div
                                v-show="isShowCurriculum"
                                class="select-course-box"
                                @mouseenter="isShowCurriculum = true"
                                @mouseleave="isShowCurriculum = false"
                            >
                                <span
                                    @click="jumpLookMoreCourse('/free-course')"
                                    class="link-item course-item"
                                    :class="{ active: path.indexOf('/free-course') === 0 }"
                                >
                                    公开课
                                </span>
                                <span
                                    @click="jumpLookMoreCourse('/trial-course')"
                                    class="link-item course-item"
                                    :class="{ active: path.indexOf('/trial-course') === 0 }"
                                    :target="path.indexOf('/trial-course') === 0 ? '_self' : '_blank'"
                                >
                                    体验课
                                </span>
                                <span
                                    @click="jumpLookMoreCourse('/pro-course')"
                                    class="link-item course-item"
                                    :class="{ active: path.indexOf('/pro-course') === 0 }"
                                    :target="path.indexOf('/pro-course') === 0 ? '_self' : '_blank'"
                                >
                                    系统课
                                </span>
                            </div>
                        </transition>
                    </div>
                    <a :href="bookLink" :target="path.indexOf('/books') === 0 ? '_self' : '_blank'" class="link-item" @click="trackData('图书')">图书</a>
                    <a
                        :href="`/exam/index/list/${projectInfo.projectCode}/${projectInfo.ptagId ? projectInfo.ptagId : projectInfo.projectCode}/ZJLX`"
                        @click="jumpAllExam"
                        class="link-item"
                        :class="{ active: path.indexOf('/exam') === 0 }"
                        :target="path.indexOf('/exam/index') === 0 ? '_self' : '_blank'"
                    >
                        题库
                    </a>
                    <a
                        :href="`/ziliao/all/all/all/${projectInfo.projectSeoCode}`"
                        class="link-item"
                        :class="{ active: path.indexOf('/ziliao') === 0 }"
                        :target="path.indexOf('/ziliao') === 0 ? '_self' : '_blank'"
                        @click="trackData('资料')"
                    >
                        资料
                    </a>
                    <div class="learning-tools" @mouseenter="isShowTool = true" @mouseleave="isShowTool = false">
                        <a
                            href="/tool"
                            class="link-item"
                            :class="{ active: path.indexOf('/tool') === 0 }"
                            :target="path.indexOf('/tool') === 0 ? '_self' : '_blank'"
                            @click="trackData('学习工具')"
                        >
                            学习工具
                        </a>
                        <!-- 学习工具的隐藏弹窗 -->
                        <transition name="fade">
                            <div v-show="isShowTool" class="learning-tools-card">
                                <div class="learning-tools-content">
                                    <div class="items-wrap">
                                        <div class="item-box">
                                            <img src="../../asset/images/youlu-app.png" alt="优路教育APP" class="code-img" />
                                            <div>
                                                <p class="item-name">优路教育APP</p>
                                                <p class="item-desc">专属移动课堂充电备考随时随地</p>
                                                <div class="item-tag">
                                                    <span class="tag-text ico">看课/刷题/资料</span>
                                                    <span class="tag-text ico">一站式学习</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-box">
                                            <img src="../../asset/images/youlu-gongzhonghao.jpg" alt="优路教育公众号" class="code-img" />
                                            <div>
                                                <p class="item-name">优路教育公众号</p>
                                                <p class="item-desc">职考学习备考基地</p>
                                                <div class="item-tag">
                                                    <span class="tag-text ico">干货资讯获取平台</span>
                                                    <span class="tag-text ico">考证小帮手</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-box">
                                            <img src="../../asset/images/xiaoyouduxue.jpg" alt="小优督学小程序" class="code-img" />
                                            <div>
                                                <p class="item-name">小优督学小程序</p>
                                                <p class="item-desc">你的智能学习服务管家</p>
                                                <div class="item-tag">
                                                    <span class="tag-text ico">上课提醒</span>
                                                    <span class="tag-text ico">课程更新提醒</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="more-txt">
                                        <a href="/tool" :target="path.indexOf('/tool') === 0 ? '_self' : '_blank'" class="link-text">查看更多备考学习工具</a>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <a
                        href="https://www.youlu.com/zt1/brand/2023qynx/?e_id=S-19028"
                        class="link-item qytp"
                        :target="'_blank'"
                        @click="clickYiguan('企业团培')"
                    ></a>
                </div>
                <div class="right-box">
                    <a href="/learningCenter/index/myCourse" target="_blank" class="link-txt" @click="trackData('我的课程')">我的课程</a>
                    <div class="border-separate"></div>
                    <!-- 登录状态展示登录信息 -->
                    <div v-if="userData" class="user-box" :class="getUnreadTotalNum !== 0 ? 'user-box-msg' : ''">
                        <!-- 用户头像 -->
                        <image-view :src="userData.userAvatar" class="user-img">
                            <template #placeholder>
                                <img src="../../asset/images/avatar-nomal.png" />
                            </template>
                            <template #error>
                                <img src="../../asset/images/avatar-nomal.png" />
                            </template>
                        </image-view>
                        <div class="user-name" :title="userName">{{ userName }}</div>
                        <div class="user-card">
                            <div class="card-user-wrap">
                                <div class="card-user-box">
                                    <!-- 用户头像 -->
                                    <image-view :src="userData.userAvatar" class="card-user-img">
                                        <template #placeholder>
                                            <img src="../../asset/images/avatar-nomal.png" />
                                        </template>
                                        <template #error>
                                            <img src="../../asset/images/avatar-nomal.png" />
                                        </template>
                                    </image-view>
                                    <span class="card-user-name" :title="userName">{{ userName }}</span>
                                </div>
                                <div class="card-logout" @click="clickLogout">退出</div>
                            </div>
                            <div class="entrance-box">
                                <a href="/uc/manager/personalCenter/personalInfo" target="_blank" class="link-item user">个人中心</a>
                                <!--<a href="/learningCenter/index/myCourse" target="_blank" class="link-item course">我的课程</a>-->
                                <a href="/uc/manager/order/orderClass" target="_blank" class="link-item order">我的订单</a>
                            </div>
                            <div class="entrance-box">
                                <a href="/uc/manager/message" target="_blank" class="link-item message">
                                    我的消息
                                    <span v-if="getUnreadTotalNum != 0" class="num" :class="unreadNum">
                                        {{ getUnreadTotalNum > 0 && getUnreadTotalNum &lt; 100 ? getUnreadTotalNum : '' }}
                                    </span>
                                </a>
                                <a href="/help" target="_blank" class="link-item help">帮助中心</a>
                            </div>
                        </div>
                    </div>
                    <!-- 未登录展示登录入口 -->
                    <template v-else>
                        <div class="show-login-button" @click="showLoginDialog()">登录</div>
                        <div class="register-btn" @click="showRegisterDialog()">免费注册</div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import track from '../../js/track.js';
import SelectProjectDialog from './components/select-project-dialog.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import loginApi from '@/api/login.js';
import '@/api/channel/api..query-info-by-seoCode.js';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/api..query-resource-web-content.js';

export default {
    name: 'module-header',
    components: {
        SelectProjectDialog,
    },
    mixins: [track],
    props: {
        // 布局是否要求相对页面定位(浮动在顶部)
        isFixed: {
            type: Boolean,
            default: true,
        },
        // 页面定位时据页面顶部的像素距离,isFixed为true时才有意义
        top: {
            type: Number,
            default: 0,
        },
        // 定位的层级
        zIndex: {
            type: Number,
            default: 50,
        },
    },
    data() {
        return {
            imageErr: true,
            isShowTool: false,
            isShowCurriculum: false,
            projectChannelInfo: '',
            isShowSelectProjectDialog: false,
            isShowAllProjectName: false,
            projectInfo: {},
            channelCode: '',
            projectIds: '',
            userData: {
                userName: '',
                userNickname: '',
                userYoulunum: '',
                userLoginname: '',
                userAvatar: '',
            },
            bookLink: '',
            headerBgClass: {
                'header-bg-ie': false,
            },
            logoInfo: null,
        };
    },
    fetch() {
        const { channelCode } = this.$route.params;
        this.channelCode = channelCode;
        return this.queryProjectChannelInfo();
    },
    computed: {
        path() {
            return this.$route.path;
        },
        userName() {
            return this.userData ? this.userData.userNickname || this.userData.userYoulunum || this.userData.userLoginname : '';
        },
        isShowName() {
            let name = this.projectChannelInfo.columnTitle || this.projectChannelInfo.columnName;
            return name.length > 6;
        },
        unreadNum() {
            if (this.getUnreadTotalNum > 0 && this.getUnreadTotalNum < 10) {
                return 'num-one';
            } else if (this.getUnreadTotalNum < 100) {
                return 'num-two';
            } else {
                return 'num-more';
            }
        },
        targetType() {
            let type = '_self';
            if (this.logoInfo?.jumpLinkUrl) {
                type = '_blank';
            }
            return type;
        },
        ...mapGetters({
            getUnreadTotalNum: 'message/getUnreadTotalNum',
        }),
    },
    watch: {
        '$store.state.common.userLogin.popUpLogin': {
            handler() {
                // 登录状态发生变化更新用户信息
                if (typeof ylPlugin !== 'undefined') {
                    ylPlugin.login.getUser().then((userData) => {
                        this.userData = userData;
                    });
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.headerBgClass['header-bg-ie'] = this.$platform.isIE;
        this.obTainLogo();
        this.getMessageNum();
    },
    methods: {
        ...loginRegisterTrack,
        imageError() {
            this.imageErr = true;
        },
        getMessageNum() {
            return new Promise((resolve, reject) => {
                var promise = ylPlugin.login.isLogined();
                promise.then(
                    (isLogined) => {
                        /* 过程中没有失败 */
                        if (isLogined) {
                            this.$store.dispatch('message/getUnreadNum');
                            resolve();
                        } else {
                            reject();
                            console.debug('处于 未登录 状态');
                        }
                    },
                    (err) => {
                        /* 过程中有失败 */
                        console.error(err);
                        reject();
                    }
                );
            });
        },
        // 查询项目频道页信息
        queryProjectChannelInfo() {
            return new Promise((resolve) => {
                this.$callApi('channel/query-info-by-seoCode', {
                    // 频道编码
                    columnSeoNo: this.channelCode,
                    onsuccess: (data) => {
                        this.projectChannelInfo = data;
                        if (data && data.projectIds) {
                            this.projectIds = data.projectIds.split(',')[0];
                            /*if (projectToBookLinkMap.has(this.projectIds)) {
                                this.bookLink = projectToBookLinkMap.get(this.projectIds);
                            } else {
                                this.bookLink = projectToBookLinkMap.get('default');
                            }*/
                        }
                        resolve();
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {
                        resolve();
                    },
                });
            }).then(() => {
                this.queryProjectInfo();
            });
        },
        // 查询项目频道页关联的第一个项目信息
        queryProjectInfo() {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-project-detail', {
                    // 项目seo编码
                    projectId: this.projectIds,
                    onsuccess: (data) => {
                        this.projectInfo = data;
                        this.bookLink = this.jumpLookMoreBooks('/books');
                        resolve();
                    },
                    onerror: () => {},
                    oncomplete: () => {},
                });
            });
        },
        // 退出登录
        clickLogout() {
            ylPlugin.login.logout();
        },

        // 获取当前页面地址
        locationHref() {
            return encodeURIComponent(window.location.href);
        },
        // 获取标题
        getPageName() {
            if (typeof document !== 'undefined') {
                return encodeURIComponent(document.title);
            }
            return encodeURIComponent('优路教育-点亮职业人生');
        },
        closeSelectProject() {
            this.isShowSelectProjectDialog = false;
        },
        openSelectProject() {
            if (this.isShowSelectProjectDialog) {
                this.isShowSelectProjectDialog = false;
            } else {
                this.isShowSelectProjectDialog = true;
                this.$nextTick(() => {
                    this.$refs.vueRefDialog.showSelect();
                });
            }
        },
        jumpLookMoreBooks(route) {
            let linkUrl = `${route}/all/all`;
            if (this.projectInfo) {
                linkUrl = `${route}/all/${this.projectInfo.projectSeoCode}`;
            }
            if (this.projectInfo && this.projectInfo.ptagId) {
                linkUrl = `${route}/all/all/${this.projectInfo.ptagId}`;
            }
            return linkUrl;
        },
        // 跳转系统课更多
        jumpLookMoreCourse(route = '/pro-course') {
            let linkUrl = `${route}/all/all`;
            if (this.projectInfo) {
                linkUrl = `${route}/all/${this.projectInfo.projectSeoCode}`;
            }
            if (this.projectInfo && this.projectInfo.ptagId) {
                linkUrl = `${route}/all/all/${this.projectInfo.ptagId}`;
            }
            this.$PageUtil.openNewPage(linkUrl);
            const dataMap = new Map([
                ['/free-course', '公开课'],
                ['/trial-course', '体验课'],
                ['/pro-course', '系统课'],
            ]);
            this.trackData(dataMap.get(route));
        },
        // 跳转题库
        jumpAllExam() {
            // 清楚浏览器存储的科目id
            this.$storage.set('examSubjectId', '');
            this.trackData('题库');
        },
        // 跳转项目频道页
        jumpProjectChannel() {
            const { channelCode } = this.$route.params;
            let jumpLinkUrl = `/channel/${channelCode}`;
            // 如果是当前频道页 直接刷新即可
            if (this.$route.path === jumpLinkUrl) {
                location.reload();
            } else {
                this.$router.replace(jumpLinkUrl);
            }
        },
        // 拉起登录弹窗
        async showLoginDialog() {
            const clueExtension = await this.$Promotion.getClueExtensionInfo({
                originCode: 'guanwangzhuc',
                clueWaycode: 'zhuce',
            });
            this.trackData('登录');
            // ylPlugin.login
            //     .showLogin_verifyByWx3({
            //         clue: { clueExtension },
            //         onstatechange: (state) => {
            //             if (state.isQRCodeScanned) {
            //                 console.log(state);
            //                 this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
            //             }
            //         },
            //     })
            this.$ylPlugin.showLoginModal(
                { clue: { clueExtension } },
                { pageName: document.title || '项目频道页', entranceResource: '项目频道页-顶部登录', courseType: '-', pageType: '项目频道页' }
            );
            // .then(
            //     (res) => {
            //         if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
            //             // 登陆方式为微信需要推送线索参数
            //             // this.pushWxClue(clueExtension);
            //         }

            //         // 易观上报
            //         this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '项目频道页', '登录', '登录弹窗');
            //     },
            //     (error) => {
            //         console.log(error);
            //         // 易观上报
            //         this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '项目频道页', '登录', '登录弹窗');
            //     }
            // );
        },

        // 拉起注册弹窗
        async showRegisterDialog() {
            // const clueExtension = await this.$PromotionUtil.getOptExtension_new({
            //     originCode: 'guanwangzhuc',
            //     clueWaycode: 'zhuce',
            //     project: { projectId: this.projectIds, projectCode: this.projectInfo.projectCode, projectSeocode: this.projectInfo.projectSeoCode },
            //     pageName: this.getPageName(),
            // });
            const clueExtension = await this.$Promotion.getClueExtensionInfo({
                originCode: 'guanwangzhuc',
                clueWaycode: 'zhuce',
            });
            this.trackData('免费注册');
            ylPlugin.login
                .showRegister({
                    clue: { clueExtension },
                    onstatechange: (state) => {
                        if (state.isQRCodeScanned) {
                            console.log(state);
                            this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                        }
                    },
                })
                .then(
                    (res) => {
                        if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                            // 登陆方式为微信需要推送线索参数
                            // this.pushWxClue(clueExtension);
                        }
                        // 易观上报
                        this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '项目频道页', '登录', '登录弹窗');
                    },
                    (error) => {
                        console.log(error);
                        // 易观上报
                        this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '项目频道页', '登录', '登录弹窗');
                    }
                );
        },
        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
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
        // 易观埋点
        clickYiguan(name) {
            this.trackWebYouluClickTheHoverButton({
                bottom_title: name,
                navigation_type: '主栏目导航',
                page_name: document.title || '',
            });
        },
        // 企业团培埋点
        doTrackB(name) {
            const userInfo = this.$storage.get('loginStatus') || {};
            this.$yiguan.track('web_youlu_click_bduanlanmu', {
                column_name: name,
                is_login_in: !!userInfo.userId,
                is_student: userInfo.studentDeposittype === 'T',
            });
        },
        /**
         * 获取导航LOGO
         */
        obTainLogo() {
            niceloo.api.call('public/query-resource-web-content', {
                // 模块编码(首页 LOGO 频道页题库模块一广告位：ADIMAGE)
                moduleCode: 'LOGO',
                // 频率页栏目标识
                columnId: 'COLUMN20220000000000000000',
                onsuccess: (data) => {
                    if (data && data.logoPath) {
                        this.logoInfo = data;
                        this.logoInfo.logoPath = this.$urlUtils.getViewUrl(data.logoPath);
                        this.logoInfo.newJumpLinkUrl = data.jumpLinkUrl ? data.jumpLinkUrl : 'javascript:;';
                    }
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 点击一级导航栏目
        trackData(name) {
            this.$yiguan.track('youlu_click_column', {
                bottom_title: name,
                page_name: document.title,
                navigation_type: '频道页导航',
            });
        },
    },
};
</script>

<style lang="less" scoped src="./css/module-header.less"></style>
