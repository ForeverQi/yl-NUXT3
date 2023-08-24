<template>
    <div class="navList" :style="{ height: height }">
        <div class="user-wrapper">
            <img :src="user.userAvatar" class="user-avatar" />
            <p class="user-name">{{ user.userName }}</p>
            <p class="user-ylnum">优路号：{{ user.userYoulunum }}</p>
        </div>
        <ul class="navWrap">
            <template v-for="item in dataList">
                <li
                    class="navItem"
                    :key="item.router"
                    :data-value="
                        item.value === '我的消息'
                            ? getUnreadTotalNum <= 99
                                ? getUnreadTotalNum
                                : '99+'
                            : item.value === '问卷调查'
                            ? getQuestionnaireCount <= 99
                                ? getQuestionnaireCount
                                : '99+'
                            : 0
                    "
                    :class="{
                        active: item.active,
                        'red-dot': item.value === '我的消息' && getUnreadTotalNum !== 0 ? true : item.value === '问卷调查' && getQuestionnaireCount !== 0,
                    }"
                    v-if="!item.isNuxt"
                    @click="handleItemClick(item, $event)"
                >
                    <a :href="item.url" v-if="item.url" target="_blank">{{ item.value }}</a>
                    <a :href="item.router" v-else>{{ item.value }}</a>
                </li>
                <li
                    class="navItem"
                    :class="{
                        active: item.active,
                        'red-dot': item.value === '我的消息' && getUnreadTotalNum !== 0 ? true : item.value === '问卷调查' && getQuestionnaireCount !== 0,
                    }"
                    :data-value="
                        item.value === '我的消息'
                            ? getUnreadTotalNum <= 99
                                ? getUnreadTotalNum
                                : '99+'
                            : item.value === '问卷调查'
                            ? getQuestionnaireCount <= 99
                                ? getQuestionnaireCount
                                : '99+'
                            : 0
                    "
                    :key="item.value"
                    @click.capture="handleItemClick(item, $event)"
                    v-else
                >
                    <nuxt-link :to="item.router">{{ item.value }}</nuxt-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import '@/api/uc/api.CMTS1003.query-target-list-count.js';
import track from './js/track.js';
export default {
    mixins: [track],
    data() {
        return {
            height: 'auto',
            user: {
                userName: '',
                userYoulunum: ' ',
                userAvatar: require('./asset/images/avatar.png'),
            },
            dataList: [
                { value: '我的课程', isNuxt: false, icon: '', active: false, url: '/learningCenter/index/myCourse' },
                { value: '我的公开课/课单', isNuxt: true, icon: '', active: false, router: '/uc/manager/course' },
                { value: '我的题库', isNuxt: false, icon: '', active: false, url: '/exam/index' },
                { value: '我的消息', isNuxt: true, icon: '', active: false, needRedDot: true, router: '/uc/manager/message' },
                { value: '我的学管师', isNuxt: true, icon: '', active: false, router: '/uc/manager/headmaster' },
                { value: '我的优惠券', isNuxt: true, icon: '', active: false, router: '/uc/manager/coupon/list' },
                { value: '我的订单', isNuxt: true, icon: '', active: false, router: '/uc/manager/order' },
                { value: '我的申请', isNuxt: true, icon: '', active: false, router: '/uc/manager/apply' },
                { value: '我的发票', isNuxt: true, icon: '', active: false, router: '/uc/manager/invoice' }, //invoice
                { value: '学习卡开课', isNuxt: true, icon: '', active: false, router: '/uc/manager/classBegin' },
                { value: '图书赠课', isNuxt: true, icon: '', active: false, router: '/uc/manager/booksGivings' },
                { value: '账号管理', isNuxt: true, icon: '', active: false, router: '/uc/manager/personalCenter' },
                { value: '问卷调查', isNuxt: true, icon: '', active: false, needRedDot: true, router: '/uc/manager/cmt/allCmt' },
                { value: '帮助中心', isNuxt: true, icon: '', active: false, router: '/help' },
                { value: 'PC客户端', isNuxt: false, icon: '', active: false, url: 'https://www.youlu.com/zt1/yljy/pc/?e_id=S-16727' },
            ],
        };
    },
    computed: {
        ...mapGetters('message', {
            getUnreadTotalNum: 'getUnreadTotalNum',
            getQuestionnaireCount: 'getQuestionnaireCount',
        }),
    },
    watch: {
        $route() {
            this.initActiveStatus();
        },
        '$store.state.common.userLogin.popUpLogin': {
            handler() {
                typeof ylPlugin !== 'undefined' && this.getUserInfo();
            },
            immediate: true,
        },
    },
    mounted() {
        this.getUserInfo();
        this.initActiveStatus();
        this.getAjaxQuestionnaireCount();
        this.getUnreadNum();
    },
    activated() {
        this.getUserInfo();
    },
    methods: {
        ...mapActions('message', {
            getUnreadNum: 'getUnreadNum',
            getAjaxQuestionnaireCount: 'getAjaxQuestionnaireCount',
        }),
        initActiveStatus() {
            this.dataList.forEach((item) => {
                item.active =
                    this.$route?.fullPath?.indexOf(item.router) > -1 ||
                    (item?.router?.indexOf('/uc/manager/cmt') > -1 && this.$route?.fullPath?.indexOf('/uc/manager/cmt') > -1);
                if (item.value === '我的发票' && item.active === false) {
                    item.active = this.$route?.fullPath?.includes('uc/manager/receipt');
                }
            });
        },
        getUserInfo() {
            ylPlugin.login.getUser().then((res) => {
                if (res) {
                    this.user.userName = res.userNickname;
                    this.user.userYoulunum = res.userYoulunum;
                    res.userAvatar && (this.user.userAvatar = this.$urlUtils.getViewUrl(res.userAvatar));
                }
            });
        },
        handleItemClick(item, e) {
            this.clickTrack(item.value);
            if (item.value === '我的题库') {
                e.preventDefault();
                const exam = this.$storage.get('examProject');
                if (exam) {
                    let url = `/exam/index/collection/CTB/${exam.projectCode}`;
                    url = `${url}/${exam.ptagId || exam.projectCode}/ZJLX`;
                    const subjectId = this.$storage.get('examSubjectId');
                    if (subjectId) {
                        url = `${url}/${subjectId}`;
                    }
                    open(url, '_blank');
                } else {
                    open('/exam/index/choose/collection', '_blank');
                }
            }

            if (item.value === '我的优惠券') {
                this.trackWebYouluClickWodeyhjliebiao();
            }
        },
        // 埋点
        clickTrack(name) {
            const data = {
                channel_name: name, // 栏目名称
            };
            this.$yiguan.track('youlu_click_wode_channel', data);
        },
    },
};
</script>
<style scoped lang="less">
/* 右上红点 */
.red-dot {
    position: relative;
}

.red-dot::after {
    content: attr(data-value);
    box-sizing: border-box;
    position: absolute;
    top: 6px;
    left: 85px;
    max-width: 35px;
    height: 16px;
    background-color: #fe4848;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: #ffffff !important;
    line-height: 12px;
    padding: 2px 6px;
}
.navList {
    width: 222px;
    background: white;
    font-size: 16px;
    color: #333;
    padding-bottom: 40px;

    .navWrap {
        padding: 20px 16px;
    }
    .navItem {
        cursor: pointer;
        border-radius: 8px;
        padding-bottom: 14.5px;
        padding-top: 14.5px;
        a {
            position: relative;
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            padding-left: 24px;
            color: #333;
            z-index: 10;
        }

        &.active {
            background: rgba(255, 46, 48, 0.1);
            background-image: url('./asset/images/arrow-right.png');
            background-repeat: no-repeat;
            background-position: center right 19px;
            background-size: 6px 12px;
            color: #ff2e30;
            a {
                color: #ff2e30;
            }
        }

        &:hover {
            color: #333;
        }
    }
}

.user-wrapper {
    text-align: center;
    padding-top: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
}

.user-name {
    color: #3a3d4b;
    font-size: 16px;
    margin-top: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: auto;
    margin-right: auto;
    width: 115px;
}
.user-ylnum {
    color: #77798d;
    font-size: 12px;
    margin-top: 4px;
}
</style>
