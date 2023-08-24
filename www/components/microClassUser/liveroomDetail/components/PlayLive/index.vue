<template>
    <!--直播区-->
    <div class="play-live-section">
        <iframe allowfullscreen="true" v-if="liveCourse.courseStatus !== 3" class="live-wrap" :src="liveCourse.liveCourseUrl" allow="*"></iframe>
        <div class="status-wrap" v-if="!isLogin">
            <div class="btn2" @click="toLogin">
                <img src="./asset/images/liveroomDetail_22.png" />
                登录后，进入直播间
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayLive',
    inject: ['copyliveCourse'],
    props: {
        isLogin: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        let vm = this;
        return {
            liveCourse: vm.copyliveCourse(),
        };
    },
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
    height: 571px;
    // height: 606px;
    /*height: 610px;*/
    .live-wrap {
        width: 100%;
        height: 100%;
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
            border: 2px solid #4492ff;
            border-radius: 6px;
            color: #7ab1ff;
            img {
                width: 20px;
                height: 20px;
                margin-right: 2px;
                margin-bottom: 3px;
                vertical-align: middle;
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
</style>
