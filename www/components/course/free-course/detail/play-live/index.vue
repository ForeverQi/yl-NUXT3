<template>
    <!--直播区-->
    <div class="play-live-section">
        <!--v-if="liveCourse.courseStatus !== 3"-->
        <iframe class="live-wrap" :src="liveCourseUrl" allow="*" allowfullscreen="true"></iframe>
        <div class="status-wrap" v-if="!isLogin">
            <div class="btn2" @click="toLogin">
                <span class="login-enter-icon"></span>
                登录后，进入直播间
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayLive',
    props: {
        isLogin: {
            type: Boolean,
            default: true,
        },
        liveCourse: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    computed: {
        liveCourseUrl() {
            let url = this.liveCourse.liveCourseUrl;
            if (url.indexOf('?') > -1) {
                url += '&ignoreWxAuth=Y';
            } else {
                url += '?ignoreWxAuth=Y';
            }
            return url;
        },
    },
    /*fetch() {
        return Promise.resolve();
    },*/
    mounted() {
        if (this.liveCourse.courseStatus === 1 || this.liveCourse.courseStatus === 2) {
            this.trackCoursePlay();
        }
    },
    methods: {
        toLogin() {
            this.$emit('to-login');
        },
        trackCoursePlay(track = {}) {
            this.$yiguan.mcuTrack('wk_course_play', {
                course_name: this.liveCourse.goodsName,
                mycourse_subject_name: this.liveCourse.subjectName,
                web_is_order: this.liveCourse.appointmentStatus === 'Y',
                course_type: '直播间课程',
                paly_type: '看回放',
                ail_page_source: location.href,
                ...track,
            });
        },
    },
};
</script>

<style lang="less" scoped>
/*直播区*/
.play-live-section {
    position: relative;
    height: 551px;
    overflow: hidden;
    // height: 606px;
    /*height: 610px;*/
    .live-wrap {
        width: 100%;
        height: 100%;
        // margin-left: -5%;
        // margin-top: -3%;
    }
    .status-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.6);
        .btn2 {
            width: 238px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #ff2e30;
            border-radius: 6px;
            color: #ff2e30;
            font-size: 18px;
            span {
                width: 20px;
                height: 20px;
                margin-right: 2px;
                margin-bottom: 3px;
                vertical-align: middle;
                background: url('./asset/images/login-enter-icon.png');
                display: inline-block;
                background-size: 100%;
            }
            &:hover {
                background: linear-gradient(90deg, #ff6870, #f8323c);
                color: #ffffff;
                border: 0;
                .login-enter-icon {
                    background: url('./asset/images/login-enter-icon_hover.png');
                    background-size: 100%;
                }
            }
        }
    }
}
.popup-footer {
    width: 150px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: #fff;
    background-image: linear-gradient(to right, #3a85fe, #025eff);
    border-radius: 8px;
    cursor: pointer;
}
iframe {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
}
</style>
