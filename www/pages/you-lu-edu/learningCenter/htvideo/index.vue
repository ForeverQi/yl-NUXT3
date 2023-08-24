<script lang="jsx">
import dayjs from 'dayjs';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
import { mapState, mapMutations } from 'vuex';
import CoursePlayView from '@/www/components/learningCenter/htvideo/course-play-view/index.vue';
import CourseDivision from '@/www/components/learningCenter/htvideo/course-division/index.vue';
import CoursePhraseQuery from '@/www/components/learningCenter/htvideo/course-phrase-query/index.vue'; // 词点快查
import CourseAnswering from '@/www/components/learningCenter/htvideo/course-answering/index.vue'; // 答疑
import CourseCatalogue from '@/www/components/learningCenter/htvideo/course-catalogue/index.vue'; // 目录
import CoursePlayTop from '@/www/components/learningCenter/htvideo/course-play-top/index.vue';
import CoursePlayBottom from '@/www/components/learningCenter/htvideo/course-play-bottom/index.vue';
import courseEvaluate from '@/www/components/learningCenter/htvideo/course-evaluate/index.vue'; // 课程评价
import courseMinHandout from '@/www/components/learningCenter/htvideo/course-min-handout/index.vue'; // 课程小讲义
import CourseChange from '@/www/components/learningCenter/htvideo/course-change/index.vue';
import CourseMaxHandout from '@/www/components/learningCenter/htvideo/course-max-handout/index.vue';
import ClassroomPractice from '@/www/components/learningCenter/htvideo/classroom-practice/ClassroomPractice.vue';
import CourseImagePreview from '@/www/components/learningCenter/htvideo/classroom-practice/CourseImagePreview.vue';

export default {
    name: 'PageHtvideo',
    layout: 'nullLayout',
    data() {
        return {
            loading: null,

            showLogo: false, // 显示logo
            showS2: false, // 三角2
        };
    },
    head() {
        return {
            title: `视频播放-学习中心-优路教育`,
        };
    },
    computed: {
        ...mapState('course/videoSize', {
            mainWidth: 'mainWidth',
            mainHeight: 'mainHeight',
            windowHeight: 'windowHeight',
            windowWidth: 'windowWidth',
        }),
        ...mapState('course/division', {
            divisionType: 'type',
            aiParctice: 'aiParctice',
        }),
        ...mapState('course/info', {
            coursewareId: 'coursewareId',
            classId: 'classId',
            coursewareName: 'coursewareName',
            playStartTime: 'playStartTime',
            moduleName: 'moduleName',
            courseId: 'courseId',
            subjectId: 'subjectId',
            courseName: 'courseName',
            catalogName: 'catalogName',
            userId: 'userId',
            projectId: 'projectId',
            coursewareHandoutOnlineUrl: 'coursewareHandoutOnlineUrl',
            showHandoutMax: 'showHandoutMax',
            studyDuration: 'studyDuration',

            showMindPic: 'showMindPic',
            mindFileInfo: 'mindFileInfo',

            paperId: 'paperId', // AI随堂练试卷ID
            answersheetId: 'answersheetId', // AI随堂练答卷标识
            isReady: 'isReady',

            ifShowPlayer: 'ifShowPlayer',
        }),
    },
    watch: {
        showHandoutMax(val, oldVal) {
            if (val !== oldVal) {
                this.changeVideoWin();
            }
        },
        isReady(val, oldVal) {
            //是否加载完成
            if (val !== oldVal && val) {
                this.loading && this.loading.close();
            }
        },
        mainWidth(val, oldVal) {
            if (val !== oldVal) {
                this.setVideoPlaySection();
            }
        },
        mainHeight(val, oldVal) {
            if (val !== oldVal) {
                this.setVideoPlaySection();
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.addBatchFn);
    },
    mounted() {
        this.loading = this.$baseUI.loading();
        window.addEventListener('beforeunload', this.addBatchFn);
        ylPlugin.login.getUser().then((userData) => {
            if (!userData) {
                this.$niceloo.app.visitor.tipLogin();
                return;
            }
            this.init(userData);
        });
        this.$bus.$on('CLOSR_CLASSROOM_practice', () => {
            this.doShowAIParctice(false);
            this.doVideoResume();
        });
        this.$bus.$on('SET_ANSWERSHEET_ID', (answersheetId) => {
            this.setCourseInfo({
                answersheetId,
            });
        });
        if (this.$platform.isIE === true) {
            let str = '您的浏览器因版本较低或兼容问题无法播放视频，为了您的看课体验，请尝试切换其他浏览器 (谷歌、360、火狐) 或';
            str += '<a href="/compatibility" style="color: #f8323c">点击此处下载浏览器</a>';
            this.$baseUI
                .alert(str, '看课出错了!', {
                    isHtml: true,
                })
                .then(() => {
                    this.$PageUtil.href('/compatibility');
                });
        }
    },
    methods: {
        ...mapMutations('course/info', {
            setCourseInfo: 'setCourseInfo',
            doVideoResume: 'doVideoResume',
        }),
        ...mapMutations('course/division', {
            doShowAIParctice: 'doShowAIParctice',
        }),
        addBatchFn() {
            this.addBatchPlayRecord();
        },
        init(userData) {
            this.setCourseInfo({
                userName: userData.userYoulunum,
                userId: userData.userId,
                isReady: false,
            });
            let subjectId = this.$route.query.subjectId;
            if (!/^subject/i.test(subjectId)) {
                subjectId = '';
            }
            this.checkRecord().then(() => {
                // 听课记录有结果之后再请求数据
                this.setCourseInfo({
                    coursewareId: this.$route.params.coursewareId,
                    classId: this.$route.params.classId,
                    ctapId: this.$route.query.ctapId,
                    subjectId,
                });
            });
        },
        upRecord(coursewareId, cb) {
            if (coursewareId === this.coursewareId) {
                // 切换的课件和当前播放的课件ID相同时不做任何操作
                return;
            }
            if (this.aiParctice === true) {
                this.doShowAIParctice(false);
                this.doVideoResume();
            }
            // 生成听课记录
            this.addBatchPlayRecord()
                .then(() => {
                    // 上报听课记录
                    return this.checkRecord();
                })
                .then(() => {
                    cb && cb();
                });
        },
        doUpRecode(params) {
            // 上报听课记录
            return this.$callApi('cc/cc-playrd-batch-add', {
                ...params,
            })
                .then(() => {
                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.resolve();
                });
        },
        checkRecord() {
            // 检查是否有历史听课记录
            let obj = this.$storage.get(`${this.userId}cc/playrd/batch/add`);
            if (obj) {
                return this.doUpRecode(obj).then(() => {
                    this.$storage.set(`${this.userId}cc/playrd/batch/add`, null);
                });
            } else {
                return Promise.resolve();
            }
        },
        addBatchPlayRecord() {
            return new Promise((resolve) => {
                // let currentPlayInfo = this.$refs.coursePlayView && this.$refs.coursePlayView.realPlayStatus();
                // currentPlayInfo = JSON.parse(currentPlayInfo);
                // if (currentPlayInfo != null && currentPlayInfo.vid !== this.coursewareId) {
                //     return resolve();
                // }

                if (this.$refs.coursePlayView && this.$refs.coursePlayView.realPlayVideoRateTime() > 0) {
                    let params = {
                        playrds: [
                            {
                                classId: this.classId, //班级标识
                                coursewareId: this.coursewareId, //课件标识
                                coursewareName: this.coursewareName,
                                playRdIP: '', //播放记录IP
                                playRdStartTime: this.playStartTime, //播放记录开始时间
                                playRdEndTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), // 播放记录产生的时间
                                playRdDevice: 'W', //播放记录播放设备
                                playRdDeviceName: this.$platform.OS, //播放记录播放设备名称
                                playRdDeviceOS: 'W', //播放记录播放设备操作系统
                                playRdDeviceVersion: this.$platform.version, //播放记录设备版本号
                                playRdMcc: `${this.moduleName}-${this.courseName}-${this.catalogName}`, //模块课程目录名称
                                playRdDuration: this.$refs.coursePlayView.realPlayVideoRateTime(), //播放记录播放时长
                                playRdOffLineStatus: 'L', //L:在线播放;O:离线播放
                                subjectId: this.subjectId, // 科目ID
                                courseId: this.courseId, // 课程ID
                            },
                        ],
                    };
                    this.$storage.set(`${this.userId}cc/playrd/batch/add`, params);
                }
                resolve();
            });
        },
        changeVideoWin() {
            // 切换视频显示窗口
            if (this.showHandoutMax === true) {
                this.$nextTick(() => {
                    this.$refs.minWin.appendChild(this.$refs.coursePlayView.$el);
                });
            } else {
                this.$refs.maxWin.appendChild(this.$refs.coursePlayView.$el);
            }
        },
        setVideoPlaySection() {
            if (this.mainWidth === 0 || this.mainHeight === 0) {
                // 两个值有一个值为0 就不在设置
                this.$refs.pageSection.style.width = '';
                this.$refs.pageSection.style.height = '';
            } else {
                this.$refs.pageSection.style.width = `${this.mainWidth}px`;
                this.$refs.pageSection.style.height = `${this.mainHeight}px`;
            }

            let windowHeight = this.$refs.pageHtvideo.offsetHeight;
            let windowWidth = this.$refs.pageHtvideo.offsetWidth;

            let h = (windowHeight - this.mainHeight) / 2;
            let w = (windowWidth - this.mainWidth) / 2;
            if (h > 57) {
                this.showLogo = true;
                this.$refs.bgLogo.style.top = h + 10 - 50 + 'px';
                this.$refs.bgLogo.style.left = (w === 0 ? 40 : w) + 'px';
            } else {
                this.showLogo = false;
            }
        },
    },
    render() {
        return (
            <div class="page-htvideo" ref="pageHtvideo">
                {this.showMindPic && (
                    <CourseImagePreview
                        onClose={() => {
                            this.setCourseInfo({
                                showMindPic: false,
                            });
                            this.doVideoResume();
                        }}
                        fileInfo={this.mindFileInfo}
                    />
                )}
                <div class="bg-logo" style={this.showLogo ? '' : 'display: none;'} ref="bgLogo"></div>
                <div class="bg-sun"></div>
                <div class="bg-s1"></div>
                <div class="bg-s2"></div>
                <div class="bg-s3"></div>
                <div class="page-section" style={this.ifShowPlayer === true ? '' : 'visibility: hidden;'} ref="pageSection">
                    <div class="page-wrap">
                        <div class="video-top">
                            <CoursePlayTop />
                        </div>
                        <div class="video-content">
                            <div class="video-section" ref="maxWin" id="pr_video">
                                {this.showHandoutMax === true && (
                                    <div class="course-change-wrap">
                                        <CourseChange />
                                    </div>
                                )}
                                {this.showHandoutMax === true && <CourseMaxHandout courseware-handout-path={this.coursewareHandoutOnlineUrl} />}
                                <CoursePlayView ref="coursePlayView" onChangeWin={this.changeVideoWin} />
                                {this.aiParctice && (
                                    <ClassroomPractice
                                        curCourse={{
                                            coursewareId: this.coursewareId,
                                        }}
                                        paperId={this.paperId}
                                        answersheetId={this.answersheetId}
                                    />
                                )}
                            </div>
                            <div class="division-section">
                                <CourseDivision
                                    onGetPlayTime={(cb) => {
                                        let currTime = this.$refs.coursePlayView.realPlayVideoRateTime();
                                        if (isNaN(currTime)) {
                                            currTime = 0;
                                        }
                                        const time = +this.studyDuration + currTime;
                                        cb && cb(time);
                                    }}
                                />
                            </div>
                            <div class="catalogue-section" style={this.divisionType === 0 ? 'width: 0' : ''}>
                                {this.showHandoutMax === true && (
                                    <div class="min-video">
                                        <div class="course-name">
                                            {this.moduleName}-{this.courseName}
                                        </div>
                                        <div class="video-wrap" ref="minWin"></div>
                                    </div>
                                )}

                                <CourseCatalogue onUp-record={this.upRecord} style={this.divisionType === 1 ? '' : 'display: none;'} />
                                {this.divisionType === 2 && <courseMinHandout courseware-handout-path={this.coursewareHandoutOnlineUrl} />}
                                {this.divisionType === 3 && <CourseAnswering />}
                                {this.divisionType === 4 && <CoursePhraseQuery project-id={this.projectId} />}
                                {this.divisionType === 7 && <courseEvaluate />}
                            </div>
                        </div>
                        <div class="video-bottom">
                            <CoursePlayBottom />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-change-wrap {
    position: absolute;
    top: 36px;
    right: 20px;
    width: 76px;
    height: 76px;
    z-index: 10;
}
.min-video {
    flex-shrink: 0;
    .course-name {
        padding: 12px 24px;
        font-size: 15px;
        text-align: left;
        color: #ffffff;
        line-height: 30px;
        background-color: #202631;
    }
    .video-wrap {
        padding: 16px 18px;
        height: 190px;
    }
}
.page-htvideo {
    position: relative;
    height: 100vh;
    min-height: 600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #232b34;
    background-image: url(./asset/images/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;

    .bg-logo,
    .bg-s1,
    .bg-s2,
    .bg-s3,
    .bg-sun {
        position: absolute;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .bg-logo {
        top: 20px;
        left: 40px;
        height: 37px;
        width: 190px;
        opacity: 0.7;
        background-image: url(./asset/images/youlu.png);
    }
    .bg-s1 {
        top: calc(70%);
        left: 40px;
        width: 40px;
        height: 48px;
        opacity: 0.7;
        background-image: url(./asset/images/s1.png);
    }
    .bg-s2 {
        display: none;
        top: 50px;
        left: calc(50%);
        width: 40px;
        height: 41px;
        background-image: url(./asset/images/s2.png);
    }
    .bg-s3 {
        right: 40px;
        top: calc(75%);
        width: 40px;
        height: 34px;
        opacity: 0.7;
        background-image: url(./asset/images/s3.png);
    }
    .bg-sun {
        width: 200px;
        height: 200px;
        top: 0;
        right: 0;
        opacity: 0.7;
        background-image: url(./asset/images/sun.png);
    }

    .page-section {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        transition: all 0.2s;
        &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            height: 50px;
            background-image: url(./asset/images/b-bg.png);
            background-repeat: no-repeat;
            background-position: center bottom;
            background-size: 100%;
        }
    }
    .page-wrap {
        position: relative;
        width: calc(100% - 80px);
        height: calc(100% - 50px);
        display: flex;
        margin: 25px 40px;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 18px;
        z-index: 1;
        overflow: hidden;
        background: #202631;
        border: solid 1px #505865;
        border-bottom-color: #393f48;
    }

    .video-top {
        display: flex;
        align-items: center;
        height: 50px;
        flex-shrink: 0;

        background: linear-gradient(180deg, #141920, #202631);
    }
    .video-bottom {
        height: 50px;
        flex-shrink: 0;

        background: linear-gradient(0deg, #141920, #202631);
    }

    .video-content {
        display: flex;
        padding: 0 20px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        margin: 0 auto;

        .video-section {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden !important;
        }

        .division-section {
            width: 60px;
            height: 100%;
            flex-shrink: 0;
            background-color: #1b212a;
        }
        .catalogue-section {
            // width: 376px;
            width: 360px;
            height: 100%;
            flex-shrink: 0;
            overflow: hidden;
            background: #2a3440;
            transition: width 0.2s ease;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
