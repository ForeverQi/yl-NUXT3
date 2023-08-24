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
                    <a
                        href="/"
                        class="link-item link-item_home"
                        :class="{ active: path === '/' }"
                        :target="path === '/' ? '_self' : '_blank'"
                        @click="trackData('首页')"
                    >
                        首页
                    </a>
                    <a
                        href="/free-course"
                        class="link-item"
                        :class="{ active: path.indexOf('/free-course') === 0 }"
                        :target="path.indexOf('/free-course') === 0 ? '_self' : '_blank'"
                        @click="trackData('公开课')"
                    >
                        公开课
                    </a>
                    <a
                        href="/trial-course"
                        class="link-item"
                        :class="{ active: path.indexOf('/trial-course') === 0 }"
                        :target="path.indexOf('/trial-course') === 0 ? '_self' : '_blank'"
                        @click="trackData('体验课')"
                    >
                        体验课
                    </a>
                    <a
                        href="/pro-course"
                        class="link-item"
                        :class="{ active: path.indexOf('/pro-course') === 0 }"
                        :target="path.indexOf('/pro-course') === 0 ? '_self' : '_blank'"
                        @click="trackData('系统课')"
                    >
                        系统课
                    </a>
                    <a
                        href="/books"
                        :class="{ active: path.indexOf('/books') === 0 }"
                        :target="path.indexOf('/books') === 0 ? '_self' : '_blank'"
                        class="link-item"
                        @click="trackData('图书')"
                    >
                        图书
                    </a>
                    <a
                        href="/exam/index"
                        class="link-item"
                        :class="{ active: path.indexOf('/exam') === 0 }"
                        :target="path.indexOf('/exam/index') === 0 ? '_self' : '_blank'"
                        @click="trackData('题库')"
                    >
                        题库
                    </a>
                    <a
                        href="/ziliao"
                        class="link-item"
                        :class="{ active: path.indexOf('/ziliao') === 0 }"
                        :target="path.indexOf('/ziliao') === 0 ? '_self' : '_blank'"
                        @click="trackData('资料')"
                    >
                        资料
                    </a>
                    <div
                        class="learning-tools"
                        @mouseenter="learningToolsRecommond.length > 0 || learningToolsSecondary.length > 0 ? (isShowTool = true) : (isShowTool = false)"
                        @mouseleave="isShowTool = false"
                    >
                        <a
                            href="/tool"
                            class="link-item"
                            :class="{ active: path.indexOf('/tool') === 0 }"
                            :target="path.indexOf('/tool') === 0 ? '_self' : '_blank'"
                            @click="trackData('学习工具')"
                        >
                            学习工具
                        </a>
                        <!-- 学习工具的隐藏弹窗  -->
                        <transition name="fade">
                            <div class="learning-tools-card" v-show="isShowTool">
                                <div class="learning-tools-content">
                                    <div class="items-wrap" v-if="learningToolsRecommond.length > 0">
                                        <div class="item-box" v-for="(item, index) in learningToolsRecommond" :key="index">
                                            <image-view
                                                class="code-img"
                                                :src="$urlUtils.getViewUrl(item.learnTypeContent.imgUrl)"
                                                :alt="item.learnToolName"
                                                :type="'toolBg'"
                                                :placeholder-width="'100%'"
                                                :placeholder-height="'100%'"
                                            ></image-view>
                                            <!--<img :src="$urlUtils.getViewUrl(item.publicityPhotoUrl)" :alt="item.learnToolName" class="code-img" />-->
                                            <div>
                                                <p class="item-name">
                                                    <a v-if="item.jumpLinkUrl" :href="item.jumpLinkUrl" target="_blank">{{ item.learnToolName }}</a>
                                                    <template v-else>{{ item.learnToolName }}</template>
                                                </p>
                                                <p class="item-desc">{{ item.content.subtitle }}</p>
                                                <div class="item-tag">
                                                    <div class="item-tag-content" :class="item.lightsShowNum === 0 ? 'beyond-ellipsis' : ''">
                                                        <span class="tag-text ico" v-if="item.content.highlights1">
                                                            {{ item.content.highlights1 }}
                                                        </span>
                                                        <template v-if="item.content.highlights2 && item.lightsShowNum > 1">
                                                            <span class="tag-text ico">
                                                                {{ item.content.highlights2 }}
                                                            </span>
                                                        </template>
                                                        <template v-if="item.content.highlights3 && item.lightsShowNum > 2">
                                                            <span class="tag-text ico">
                                                                {{ item.content.highlights3 }}
                                                            </span>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="text-list" v-if="learningToolsSecondary.length > 0">
                                        <li v-for="(item, index) in learningToolsSecondary" :key="index">
                                            <label>{{ item.typeName }}：</label>
                                            <span
                                                v-for="(child, indexs) in item.childList"
                                                @mouseenter="child.isShow = true"
                                                @mouseleave="child.isShow = false"
                                                :key="indexs + 'aa'"
                                            >
                                                <template v-if="indexs < item.showNum">
                                                    <a v-if="child.jumpLinkUrl" :href="child.jumpLinkUrl" target="_blank">
                                                        {{ child.learnToolName }}
                                                    </a>
                                                    <span class="tool-name" v-else-if="child.showType === 'R'">{{ child.learnToolName }}</span>
                                                    <template v-else>{{ child.learnToolName }}</template>
                                                    <!--里层：showType 'R'二维码   'D'下载  'L'引导-->
                                                    <div class="one-text-detail" v-if="child.showType === 'R'" v-show="child.isShow">
                                                        <img :src="$urlUtils.getViewUrl(child.content.imgUrl)" alt="" />
                                                        <span class="text-name">{{ child.learnToolName }}</span>
                                                    </div>
                                                </template>
                                            </span>
                                        </li>
                                    </ul>
                                    <div class="more-txt">
                                        <a href="/tool" :target="path.indexOf('/tool') === 0 ? '_self' : '_blank'" class="link-text">查看更多学习工具</a>
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
                            <div class="user-card-container">
                                <div class="card-user-wrap">
                                    <!--:class="getUnreadTotalNum !== 0 ? 'card-user-box-msg' : ''"-->
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
                    </div>
                    <!-- 未登录展示登录入口 -->
                    <template v-else>
                        <a
                            :href="`/uc/login?redirect=${locationHref()}&pageName=${getPageName()}&sourceType=顶部导航-登录`"
                            class="link-txt"
                            @click="trackData('登录')"
                        >
                            登录
                        </a>
                        <a :href="`/uc/register?redirect=${locationHref()}&pageName=${getPageName()}`" class="register-btn" @click="trackData('免费注册')">
                            免费注册
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import '@/api/learntool/api..learnTool-columnRecommondList.js'; //获取学习工具主推区域
import '@/api/learntool/api..learnTool-columnCollegeList.js'; //获取学习工具次推区域
import '@/api/api..query-resource-web-content.js';

import track from '../../js/track.js';
export default {
    name: 'ModuleHeader',
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
            userData: {
                userName: '',
                userNickname: '',
                userYoulunum: '',
                userLoginname: '',
                userAvatar: '',
            },
            isShowOneToolDetail: false,
            //学习工具主推区域
            learningToolsRecommond: [],
            learningToolsSecondary: [],
            headerBgClass: {
                'header-bg-ie': false,
            },
            logoInfo: null,
        };
    },
    computed: {
        path() {
            return this.$route.path;
        },
        userName() {
            return this.userData ? this.userData.userNickname || this.userData.userYoulunum || this.userData.userLoginname : '';
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
        this.getLearningToolsRecommond();
        this.getLearningToolsSecondary();
        this.getMessageNum();
    },
    methods: {
        imageError() {
            this.imageErr = true;
        },
        getMessageNum() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                (isLogined) => {
                    /* 过程中没有失败 */
                    if (isLogined) {
                        this.$store.dispatch('message/getUnreadNum');
                    } else {
                        console.debug('处于 未登录 状态');
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err);
                }
            );
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
        //获取学习工具-主推
        getLearningToolsRecommond() {
            //learnTool/user/columnRecommondList
            this.$callApi('learntool/learnTool-columnRecommondList', {
                columnCategoryId: 'COLUMN20220000000000000000', //频道页分类标识
                onsuccess: (res) => {
                    res.forEach((item) => {
                        item.content = JSON.parse(item.content);
                        item.learnTypeContent = JSON.parse(item.learnTypeContent);
                        //计算字数
                        item.lightsShowNum = 0;
                        let num = 0;
                        if (item.content.highlights1) {
                            num = num + item.content.highlights1.length * 12 + 30;
                            if (num < 218) {
                                item.lightsShowNum = 0 + 1;
                            }
                        }
                        if (item.content.highlights2) {
                            num = num + item.content.highlights2.length * 12 + 30;
                            if (num < 218) {
                                item.lightsShowNum = 1 + 1;
                            }
                        }
                        if (item.content.highlights3) {
                            num = num + item.content.highlights3.length * 12 + 30;
                            if (num < 218) {
                                item.lightsShowNum = 2 + 1;
                            }
                        }
                    });
                    this.learningToolsRecommond = res;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //次推
        getLearningToolsSecondary() {
            //learnTool/user/columnCollegeList
            this.$callApi('learntool/learnTool-columnCollegeList', {
                columnCategoryId: 'COLUMN20220000000000000000', //频道页分类标识
                onsuccess: (res) => {
                    res.forEach((item) => {
                        item.showNum = 0;
                        let num = 0;
                        item.childList &&
                            item.childList.forEach((child, index) => {
                                child.isShow = false;
                                child.content = JSON.parse(child.content);
                                num = num + child.learnToolName.length * 14;
                                if (num < 1200 - item.typeName.length * 16 - 26) {
                                    item.showNum = index + 1;
                                }
                                num = num + 33;
                            });
                    });
                    this.learningToolsSecondary = res;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
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
                navigation_type: '主栏目导航',
            });
        },
    },
};
</script>

<style lang="less" scoped src="./css/module-header.less"></style>
