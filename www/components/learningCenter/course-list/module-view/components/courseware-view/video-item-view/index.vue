<script lang="jsx">
import { mapState } from 'vuex';
import '@/api/cc/api.CC3105.cc-courseware-video-auth.js';
import '@/api/cc/api.CC8002.query-coursewarepaper-generate.js';
import CourseStar from '../course-star/index.vue';
import puralPlanner from '../mixin/puralPlanner.js'; // 第三方课程跳转处理
export default {
    name: 'VideoItemView',
    mixins: [puralPlanner],
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            ctapId: 'ctapId', // 期次
            className: 'className',
        }),
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        coursewareDuration() {
            if (this.itemData.coursewareDuration < 60) {
                return `${this.itemData.coursewareDuration}秒`;
            }
            let second = this.itemData.coursewareDuration % 60;
            let minute = 0;
            let hour = 0;
            if (this.itemData.coursewareDuration > 3600) {
                minute = Math.floor((this.itemData.coursewareDuration / 60) % 60);
                hour = Math.floor(this.itemData.coursewareDuration / 3600);

                return `${hour}小时${minute}分${second}秒`;
            } else {
                minute = Math.floor(this.itemData.coursewareDuration / 60);
                return `${minute}分${second}秒`;
            }
        },
        //进度条
        percentage() {
            if (!this.itemData.studyDuration || !this.itemData.coursewareDuration) {
                return 0;
            } else {
                let rate = (this.itemData.studyDuration / this.itemData.coursewareDuration) * 100;
                if (rate >= 100) {
                    rate = 100;
                }
                return rate.toFixed(2);
            }
        },
        showLearnTime() {
            let ret = '';
            return ret;
        },
    },
    methods: {
        toCoursePlay() {
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }
            if (this.toRuralPlanner() !== false) {
                // 返回值不为false时说明是第三方课程
                return;
            }
            // 学习任务列表跳转
            let params = {
                classId: this.itemData.classId,
                coursewareId: this.itemData.coursewareId,
                playrdNeed: 'Y',
            };
            // 录播课
            if (this.itemData.coursewareVideoProvider == 'SP') {
                this.$PageUtil.openNewPage(
                    `/pro-course-learn/${this.classId}/${this.itemData.coursewareId}?source=allTask&ctapId=${this.ctapId}&subjectId=${this.subjectId}`
                );
            } else if (this.itemData.coursewareVideoProvider == 'SC') {
                // 广电圆点视频
                params.coursewareOnlineurl = this.itemData.vid;
                this.coursewareVideoAuth(params);
            }
        },
        coursewareVideoAuth(params) {
            // 视频鉴权
            let data = {
                url: 'cc/cc-courseware-video-auth',
                params,
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.$PageUtil.openNewPage(res.videoAddress);
            });
        },
        createPaper() {
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }
            if (this.toRuralPlanner() !== false) {
                // 返回值不为false时说明是第三方课程
                return;
            }
            let data = {
                url: 'cc/query-coursewarepaper-generate',
                params: {
                    coursewareId: this.itemData.coursewareId,
                    classId: this.classId,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                let url = `/learningCenter/homeworkpractice/${this.classId}/${this.itemData.moduleId}/${this.itemData.coursewareId}/${res.paperId}?ctapId=${this.ctapId}`;
                console.log('@@@', url);
                this.$PageUtil.openNewPage(url);
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        return (
            <div class="wrap" onClick={this.toCoursePlay}>
                <div class="content">
                    <div class="title">
                        <div class="name">
                            <img src={require('./asset/images/play.png')} class="img" />
                            {this.itemData.coursewareName}
                            {this.itemData.keepstudyStatus == 'Y' && <div class="mark">上次学习</div>}
                            {this.itemData.coursewareElectiveStatus === 'Y' && <div class="tags">选修</div>}
                            <img style={{ display: this.itemData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                        </div>
                        <div class="star">
                            <CourseStar value={this.itemData.knowledgeStarLevel || 0} count={this.itemData.knowledgeStarLevel || 0} />
                        </div>
                        <div class="link-wrap" style="display: none;">
                            <div class="link">AI随堂练</div>
                            <div class="link">思维导图</div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="size">课程时长：{this.coursewareDuration}</div>
                        {this.itemData.courseScheduleStatus === 'N' && (
                            <div class="progress-wrap">
                                <div class="progress-pipeline" style={{ display: this.itemData.studyStatus == 'S' ? 'block' : 'none' }}>
                                    <div class="rate" style={{ width: `${this.percentage}%` }}></div>
                                </div>
                                <div class="txt" style={{ display: this.itemData.studyStatus == 'S' || this.itemData.studyStatus == 'Y' ? 'block' : 'none' }}>
                                    {this.itemData.studyStatus == 'Y' ? `已学完` : `已学${this.percentage}%`}
                                </div>
                            </div>
                        )}
                        {this.itemData.courseScheduleStatus === 'Y' && (
                            <div class="progress-wrap">
                                <div class="txt" style={{ display: this.itemData.studyStatus == 'S' || this.itemData.studyStatus == 'Y' ? 'block' : 'none' }}>
                                    {this.itemData.studyStatus == 'Y' ? `已学完` : ``}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-group">
                        {this.itemData.keepstudyStatus == 'Y' && <div class="btn1">继续学习</div>}
                        {this.itemData.paperStatus === 'Y' && (
                            <div
                                class="exam btn"
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    this.createPaper();
                                }}
                            >
                                课后练习
                            </div>
                        )}
                        {this.itemData.keepstudyStatus !== 'Y' && <div class="btn">立即学习</div>}
                    </div>
                    {/*
                        <div class="time" style={{ display: this.itemData.studyStatus == 'S' || this.itemData.studyStatus == 'Y' ? 'block' : 'none' }}>
                            上次学习到 00:14:24
                        </div>
                    */}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 26px;
    background: #f4f5f7;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #fff5f5;
    }
    .content {
        .title {
            display: flex;
            .name {
                display: flex;
                align-items: center;
                width: 334px;
                font-size: 14px;
                color: #53586c;
                line-height: 18px;
                word-break: break-all;

                .mark {
                    display: inline-block;
                    width: 60px;
                    height: 20px;
                    color: #ffffff;
                    font-size: 12px;
                    text-align: center;
                    line-height: 20px;
                    margin-left: 6px;
                    flex-shrink: 0;
                    background-image: url(./asset/images/mark.png);
                    background-size: 100% 100%;
                }

                .lock {
                    width: 24px;
                    height: 24px;
                    margin-top: -3px;
                    display: inline-block;
                }
                .img {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                }
                .tags {
                    width: 32px;
                    height: 16px;
                    background: #2bc049;
                    border-radius: 2px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    line-height: 16px;
                    margin-left: 8px;
                    flex-shrink: 0;
                }
            }
            .star {
                padding-left: 30px;
            }

            .link-wrap {
                display: flex;

                .link {
                    margin-left: 24px;
                    color: #8d90aa;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
        }
    }
    .info {
        padding-top: 9px;
        display: flex;
        align-items: center;
        padding-left: 22px;
        .size {
            font-size: 12px;
            color: #8d90aa;
            line-height: 16px;
            width: 160px;
        }

        .progress-wrap {
            display: flex;
            align-items: center;
            height: 4px;
            margin-left: 32px;
            .progress-pipeline {
                width: 70px;
                background: #ebedf0;
                border-radius: 4px;

                .rate {
                    width: 40%;
                    height: 4px;
                    background: #fc555e;
                    border-radius: 4px;
                }
            }

            .txt {
                margin-left: 12px;
                color: #f8323c;
                font-size: 12px;
            }
        }
    }

    .btn-wrap {
        text-align: right;
        .btn-group {
            .btn1,
            .btn {
                display: inline-block;
                padding: 7px 11px;
                line-height: 1;
                font-size: 12px;
                color: #ffffff;
                background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
                border-radius: 13px;
                margin-left: 16px;
            }

            .btn1 {
                margin-left: 0;
                color: #ff2e30;
                background: #ffece8;
            }
        }
        .time {
            color: #8d90aa;
            font-size: 12px;
            line-height: 1;
            padding-top: 6px;
        }
    }
}
</style>
