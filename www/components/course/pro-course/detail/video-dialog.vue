<template>
    <div class="best-shadow">
        <div class="play_main">
            <div class="play_right">
                <div class="pr_top">
                    <span class="prt_text">{{ coursewareName }}</span>
                    <div class="prt_operation">
                        <span class="close" @click="close"></span>
                    </div>
                </div>
                <div class="pr_video" style="height: 100%">
                    <vb-video ref="vbVideo"></vb-video>
                </div>
            </div>
            <div class="play_left">
                <div class="pl_tab">
                    <ul>
                        <div class="line"></div>
                        <li class="active">
                            <a>试听目录</a>
                        </li>
                    </ul>
                </div>
                <div class="pl_content">
                    <div class="plc_ml">
                        <ul>
                            <li class="title_list" ref="smlTilteP" :class="{ li_open: item1.isExtend }" :key="item1.courseId" v-for="item1 in parseCourseList">
                                <p class="titleList_p" @click="item1.isExtend = !item1.isExtend">
                                    <span class="titleList_p1" :title="item1.courseName + '(' + item1.listenTotal + '节试听)'">
                                        {{ item1.courseName }}
                                        <span class="countColor">({{ item1.listenTotal }}节试听)</span>
                                    </span>
                                    <span class="titleList_p2"></span>
                                </p>
                                <ul v-show="item1.isExtend" class="li_ularr show">
                                    <li class="sml_tilte" v-for="item2 in item1.catalogList" :key="item2.catalogId">
                                        <p>
                                            <span class="chapter"></span>
                                            <a :title="item2.catalogName">{{ item2.catalogName }}</a>
                                        </p>
                                        <ul>
                                            <li
                                                v-for="item3 in item2.coursewareList"
                                                :key="item3.coursewareId"
                                                @click.stop="playChange(item3)"
                                                :title="item3.coursewareName"
                                                :class="{ colorChange: item3.coursewareId === coursewareId }"
                                            >
                                                {{ item3.coursewareName }}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="play_bottom">
                <div class="btn">
                    <button class="buyNow" @click="toBuyNow">立即购买</button>
                </div>
                <div class="classPrice">
                    <div class="calssName">{{ classData.classtypeName }}</div>
                    <div class="price">
                        ¥
                        <template v-if="classData.minPrice > classData.stdminPrice">{{ classData.stdminPrice | veMoneyCent }}</template>
                        <template v-else>{{ classData.minPrice | veMoneyCent }}</template>
                        -¥
                        <template v-if="classData.maxPrice > classData.stdmaxPrice">{{ classData.maxPrice | veMoneyCent }}</template>
                        <template v-else>{{ classData.stdmaxPrice | veMoneyCent }}</template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vbVideo from './vbVideo.vue';
import track from '@/www/components/course/free-course/js/track.js';
export default {
    components: {
        vbVideo,
    },
    mixins: [track],
    props: {
        // 默认播放的课件vid
        defaultVid: {
            type: String,
            default: '',
        },
        // 默认播放的课件id
        defaultCoursewareId: {
            type: String,
            default: '',
        },
        // 默认播放的课件名称
        defaultCoursewareName: {
            type: String,
            default: '',
        },
        defaultCoursewareDuration: {
            type: Number,
            default: 0,
        },
        // 课程列表
        courseList: {
            type: Array,
            default: () => [],
        },
        // 产品详情
        classData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            vid: '', // 当前播放的课件vid
            coursewareName: '', // 当前播放的课件名称
            coursewareId: '', // 当前播放的课件id
            CoursewareDuration: 0, // 当前播放的课件时长
            parseCourseList: [],
            playReturn: '', // 播放器实例
        };
    },
    watch: {
        courseList: {
            handler(val) {
                const courseList = JSON.parse(JSON.stringify(val));
                this.parseCourseList = courseList.filter((item1) => {
                    item1.catalogList = item1.catalogList.filter((item2) => {
                        item2.coursewareList = item2.coursewareList.filter((item3) => item3.ctwAuditionstatus === 'Y');
                        item2.listenTotal = item2.coursewareList.length;
                        return Boolean(item2.listenTotal);
                    });
                    item1.isExtend = true;
                    item1.listenTotal = item1.catalogList.reduce((total, i) => total + i.listenTotal, 0);
                    return Boolean(item1.listenTotal);
                });
            },
            immediate: true,
        },
    },
    mounted() {
        this.vid = this.defaultVid;
        this.coursewareId = this.defaultCoursewareId;
        this.coursewareName = this.defaultCoursewareName;
        this.play();
    },
    methods: {
        //关闭试听弹窗
        close() {
            //销毁播放器
            this.playReturn && this.playReturn.destroy();
            this.$emit('close');
        },
        //点击立即购买
        toBuyNow() {
            this.$emit('click-buy');
            //暂停视频
            this.playReturn && this.playReturn.pauseVideo();
        },
        playChange(item) {
            this.vid = item.coursewareOnlineurl;
            this.coursewareId = item.coursewareId;
            this.coursewareName = item.coursewareName;
            this.coursewareDuration = item.coursewareDuration;
            this.play();
        },
        //视频播放及事件
        async play() {
            this.trackWebYouluCoursePlaying();
            this.playReturn = await this.$refs.vbVideo.playVid({
                type: 'C',
                videoId: this.vid,
                bizId: this.coursewareId,
            });
        },
        toHMS(s) {
            if (!s || s <= 0) {
                return '0:0:0';
            }
            let second = s % 60;
            let minute = 0;
            let hour = 0;
            if (s > 3600) {
                minute = Math.floor((s / 60) % 60);
                hour = Math.floor(s / 3600);
                return `${hour}:${minute}:${second}`;
            } else {
                minute = Math.floor(s / 60);
                return `0:${minute}:${second}`;
            }
        },
        trackCoursePlay() {
            let coursewareDuration = this.toHMS(this.coursewareDuration);
            this.trackWebYouluCoursePlaying({
                course_name: this.classData.classtypeName,
                project_position: this.classData.projectId,
                subject_name: '',
                course_type: '系统课',
                play_type: '试听',
                section_name: this.coursewareName,
                section_duration: coursewareDuration,
            });
        },
    },
};
</script>
<style lang="less" scoped src="./css/video-dialog.less"></style>
