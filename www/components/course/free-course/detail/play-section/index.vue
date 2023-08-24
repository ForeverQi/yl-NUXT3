<template>
    <div class="class-top-box">
        <img src="./asset/images/liveroomDetail_01.png" alt="" class="left-img" />
        <img src="./asset/images/liveroomDetail_02.png" alt="" class="right-img" />
        <div class="play-live-content">
            <!--面包屑-->
            <div class="bread-crumb">
                <span v-for="(item, index) in breadCrumbList" :key="index">
                    <span v-if="index === breadCrumbList.length - 1" :class="index == breadCrumbList.length - 1 ? 'bread-crumb-name-active' : ''">
                        {{ item.name }}
                    </span>
                    <span v-else @click="toIndex(index)" class="toindex">{{ item.name }}</span>
                    <img src="./asset/images/liveroomDetail_03.png" v-show="index != breadCrumbList.length - 1" alt="" class="bread-crumb-img" />
                </span>
            </div>
            <!--回放区-->
            <play-video
                v-if="liveCourse.courseStatus === 3"
                ref="playVideo"
                :live-course="liveCourse"
                :is-login="isLogin"
                @to-login="toLogin"
                @to-login2="toLogin2"
            ></play-video>
            <!--直播区-->
            <play-live v-else @to-login="toLogin" :is-login="isLogin" :live-course="liveCourse"></play-live>
        </div>
        <!--已登录，不失效 未关注服务号-->
        <side-fixed-section :page-show="true">
            <div class="attention-service-tip" @click="attentionService" v-if="!isConcernServiceNumber">
                <img src="./asset/images/service_no.jpg" alt="" />
                <span>关注服务号，上课提醒</span>
            </div>
        </side-fixed-section>
        <sweep-yards-attention
            :show.sync="isShowSweepYardsAttention"
            position-type="点击公开课详情页-关注服务号浮窗"
            :user="user"
            @change-attention-status="handleAttentionStatus"
        ></sweep-yards-attention>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayLive from '../../detail/play-live/index.vue';
import PlayVideo from '../../detail/play-video/index.vue';
import mixin from '../js/mixin.js';
import SweepYardsAttention from '../../detail/sweep-yards-attention/index.vue';
import SideFixedSection from '@/www/components/components/side-fixed-section/index.vue';
import track from '@/www/components/course/free-course/js/track.js';
export default {
    name: 'PlaySection',
    components: {
        PlayLive,
        PlayVideo,
        SweepYardsAttention,
        SideFixedSection,
    },
    mixins: [mixin, track],
    data() {
        return {
            breadCrumbList: [
                { name: '优路首页', href: '/' },
                { name: '公开课', href: '' },
                { name: '', href: '' },
            ],
            isLogin: true, //true已登录，false未登录
            isConcernServiceNumber: true, //关注服务号-浮窗
            isShowSweepYardsAttention: false, //关注服务号-弹窗
            isClassOnLine: false,
            user: null,
        };
    },
    fetch() {
        this.breadCrumbList[2].name = this.liveCourse.goodsName;
        return Promise.resolve();
    },
    computed: {
        ...mapState('open', ['liveCourse', 'projectSeoCode', 'projectCode']),
    },
    mounted() {
        this.getBindStatus(); //获取微信绑定状态
    },
    methods: {
        //面包屑跳转微课首页
        toIndex(index) {
            if (index !== 2) {
                this.breadCrumbList[1].href = `/free-course/all/${this.projectSeoCode}`;
                console.log(this.breadCrumbList[1].href);
                this.$router.push(this.breadCrumbList[index].href);
            }
        },
        //课程在线去登录
        async toLogin() {
            this.handleLiveLoginTrack();
            await this.getIsOffline(this.$route.params.liveId);
            this.isClassOnLine && this.ylLoginByPwd('直播课-登录引导');
        },
        // 课程在线去登录
        async toLogin2(entranceResource) {
            this.handleLiveLoginTrack();
            await this.getIsOffline(this.$route.params.liveId);
            this.isClassOnLine && this.ylLoginByPwd(entranceResource);
        },
        //关注服务号(添加逻辑)
        attentionService() {
            ylPlugin.login.getUser().then(
                (user) => {
                    if (null == user) {
                        return;
                    }
                    this.user = user;
                    this.isShowSweepYardsAttention = true;
                },
                (err) => {
                    console.error('实例ID获取失败：' + err);
                }
            );
        },
        //关注成功失败的回调
        handleAttentionStatus(value) {
            this.isConcernServiceNumber = value;
            // this.followUpServiceNumberTrack({ is_success: value });
        },
        handleLiveLoginTrack() {
            this.trackWebYouluLiveLogin({
                course_name: this.liveCourse.goodsName,
                project_id: this.liveCourse.projectId,
                subject_id: this.liveCourse.subjectId,
            });
        },
        followUpServiceNumberTrack(track = {}) {
            this.trackWebYouluFollowUpServiceNumber({
                is_success: true,
                page_name: this.liveCourse.goodsName + '_优路教育',
                course_type: '公开课',
                project_id: this.liveCourse.projectId,
                // subject_name: this.liveCourse.subjectId,
                follow_timing: '点击公开课详情页-关注服务号浮窗',
                ...track,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.class-top-box {
    height: 695px;
    background-color: #0f0f1e;
    position: relative;

    .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 413px;
        height: 292px;
        z-index: 2;
    }

    .right-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 459px;
        height: 354px;
        z-index: 2;
    }

    .play-live-content {
        width: 1200px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 2;
    }

    /*面包屑*/

    .bread-crumb {
        font-size: 14px;
        color: #808080;
        height: 65px;
        line-height: 65px;
        padding-left: 8px;

        .toindex {
            cursor: pointer;
        }

        .bread-crumb-name-active {
            color: #ffffff;
        }

        .bread-crumb-img {
            width: 6px;
            height: 11px;
            margin-left: 8px;
            margin-right: 16px;
            vertical-align: middle;
            display: inline-block;
        }
    }
}

/deep/.attention-service-tip {
    position: fixed;
    right: 0px;
    top: -140px;
    z-index: 99;
    width: 165px;
    height: 127px;
    background-image: url('./asset/images/attention_service _tip.png');
    background-size: 158px 104px;
    background-repeat: no-repeat;
    background-position-x: right;
    cursor: pointer;

    img {
        position: absolute;
        width: 88px;
        height: 88px;
        float: right;
        top: 7px;
        right: 31px;
        box-sizing: border-box;
    }
    span {
        width: 158px;
        height: 32px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border: 1px solid #fff0f0;
        border-radius: 17px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        display: inline-block;
        position: absolute;
        bottom: 0;
    }
}
</style>
