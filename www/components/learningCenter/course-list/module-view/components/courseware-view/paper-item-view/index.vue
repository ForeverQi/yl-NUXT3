<script lang="jsx">
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import '@/api/qb/api..courseware-paper-authentication.js';
import '@/api/igt/api..courseware-answer-info.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
import puralPlanner from '../mixin/puralPlanner.js'; // 第三方课程跳转处理
import ModeSelection from '@/www/pages/you-lu-edu/special-question-brushing/components/mode-selection/mode-selection.vue';
export default {
    name: 'PaperItemView',
    mixins: [puralPlanner],
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            answerStyle: '',
            // 做题模式:do-exam ; do-exercise: 背题模式
            solvingMode: '',
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            projectName: 'projectName', // 项目名称
            ctapId: 'ctapId', // 期次
            pypId: 'pypId',
            electiveShowStatus: 'electiveShowStatus',
            className: 'className', // 班级名称
        }),
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId', // 科目ID
            currentSubject: 'currentSubject', // 当前选择科目
        }),
        questionTotal() {
            let total = 0;
            try {
                total = this.itemData.coursewarePaper.questionTotal;
            } catch (e) {
                total = 0;
            }
            return total;
        },
        answerQuestionTotal() {
            let total = 0;
            try {
                total = this.itemData.coursewarePaper.answerQuestionTotal;
            } catch (e) {
                total = 0;
            }
            return total;
        },
        percentage() {
            if (!this.questionTotal || !this.answerQuestionTotal) {
                return 0;
            } else {
                let rate = Math.round((this.answerQuestionTotal / this.questionTotal) * 100);
                if (rate > 100) {
                    rate = 100;
                }
                return rate;
            }
        },
        answerBtnText() {
            if (
                this.itemData.coursewarePaper?.answerStyle === 'FZJK1' ||
                this.itemData.coursewarePaper?.answerStyle === 'FZJK2' ||
                this.itemData.coursewarePaper?.answerStyle === 'FZJK3'
            ) {
                return '去机考';
            } else if (this.itemData.stageAnswerSheetId && this.itemData.stageAnswerSheetStatus === 'G') {
                return '继续做题';
            } else if (this.itemData.coursewarePaper?.answerStyle === 'NORMAL') {
                return '去做题';
            }
            return '去做题';
        },
    },
    methods: {
        toExamDetail() {
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }

            // if (this.toRuralPlanner() !== false) {
            //     // 返回值不为false时说明是第三方课程
            //     return;
            // }
            this.paperAuthentication().then(() => {
                this.haveAuthority();
            });
        },
        paperAuthentication() {
            const data = {
                url: 'qb/courseware-paper-authentication',
                params: {
                    classId: this.classId,
                    paperId: this.itemData.paperId,
                    coursewareId: this.itemData.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.answerStyle = res.answerStyle;
            });
        },
        haveAuthority() {
            this.addPaperRecord().then(() => {
                this.getCoursewareAnswersheetInfo().then((res) => {
                    let answersheetInfo = res;
                    if (!answersheetInfo) {
                        that.$baseUI.alert('试卷不正确，请联系客服');
                        return '';
                    }
                    if (this.answerBtnText === '去做题') {
                        this.changeMode(answersheetInfo);
                    } else if (this.answerBtnText === '继续做题') {
                        const userInfo = this.$storage.get('loginStatus') || {};
                        let modeObj = this.$storage.get('problemSolvingMode') || {};
                        const str = `${userInfo.userId}-${this.itemData.paperId}`;
                        if (modeObj) {
                            if (Object.keys(modeObj).includes(str)) {
                                this.solvingMode = modeObj[str];
                                this.doJump(answersheetInfo);
                            } else {
                                this.changeMode(answersheetInfo);
                            }
                        } else {
                            this.changeMode(answersheetInfo);
                        }
                    } else {
                        this.doJump(answersheetInfo);
                    }
                });
            });
        },
        getCoursewareAnswersheetInfo() {
            // 获取试卷信息
            const params = {
                url: 'zhinengxuexi/courseware-answer-info',
                params: {
                    paperId: this.itemData.paperId,
                    classId: this.classId,
                    coursewareId: this.itemData.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                return res;
            });
        },
        doJump(answersheetInfo) {
            const fullPath = encodeURIComponent(`${this.$route.fullPath}&classId=${this.classId}&coursewareId=${answersheetInfo.coursewareId}`);
            let url = '';
            if (this.answerStyle === 'NORMAL') {
                url = `/learningCenter/do-paper-test/${this.subjectId}/${this.itemData.paperId}/${this.itemData.coursewareId}/${
                    answersheetInfo.paperTypeCode
                }/${this.classId}?className=${encodeURIComponent(this.className)}&ctapId=${this.ctapId}&solvingMode=${this.solvingMode}`;
            } else if (this.answerStyle === 'FZJK1') {
                url = `/exam/examinfo/${answersheetInfo.classUniquecode}/${this.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${this.ctapId}&enableStatus=Y`;
            } else if (this.answerStyle === 'FZJK2') {
                url = `/exam/examinfo/${answersheetInfo.classUniquecode}/${this.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${this.ctapId}&enableStatus=Y`;
            } else if (this.answerStyle === 'FZJK3') {
                // PageUtil.href(`/emulation/fire-exam/login?classUniquecode=${this.classUniquecode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${classId}&coursewareId=${coursewareId}&ctapId=${this.$route.query.ctapId}`);
                url = `/emulation/fire-exam/login?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${this.subjectId}&paperId=${answersheetInfo.paperId}&classId=${this.classId}&coursewareId=${answersheetInfo.coursewareId}&ctapId=${this.ctapId}`;
            }
            const data = {
                college_name: '',
                page_name: '学习中心-课程详情',
                project_name: this.projectName ? this.projectName : this.projectId,
                subject_name: this.currentSubject.subjectName ? this.currentSubject.subjectName : this.currentSubject.subjectId,
                button_name: this.answerBtnText,
            };
            this.$yiguan.learningCenter('web_learning_center_course_detail_btn', data);
            setTimeout(() => {
                this.$PageUtil.href(url);
            }, 100);
        },
        toReport() {
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }

            if (this.toRuralPlanner() !== false) {
                // 返回值不为false时说明是第三方课程
                return;
            }
            this.getCoursewareAnswersheetInfo().then((res) => {
                let url = `/learningCenter/paper-test-result/${this.itemData.paperId}/${res.answerSheetId}/${this.subjectId}/${res.paperTypeCode}/${this.itemData.coursewareId}/${this.classId}`;
                url += `?className=${encodeURIComponent(this.className)}&ctapId=${this.ctapId}&solvingModeParse=do-exercise`;
                const data = {
                    college_name: '',
                    page_name: '学习中心-课程详情',
                    project_name: this.projectName ? this.projectName : this.projectId,
                    subject_name: this.currentSubject.subjectName ? this.currentSubject.subjectName : this.currentSubject.subjectId,
                    button_name: '查看报告',
                };
                this.$yiguan.learningCenter('web_learning_center_course_detail_btn', data);
                setTimeout(() => {
                    this.$PageUtil.href(url);
                }, 100);
            });
        },
        addPaperRecord() {
            // 播放记录添加
            let data = {
                playrds: [
                    {
                        classId: this.classId, //班级标识
                        coursewareId: this.itemData.coursewareId, //课件标识
                        coursewareName: this.itemData.coursewareName,
                        playRdIP: '', //播放记录IP
                        playRdStartTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdEndTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdDevice: 'W', //播放记录播放设备
                        playRdDeviceName: '', //播放记录播放设备名称
                        playRdDeviceOS: 'W', //播放记录播放设备操作系统
                        playRdDeviceVersion: this.$platform.version, //播放记录设备版本号
                        playRdMcc: '', // 有后端确定该字段是否为必传字段 模块课程目录名称
                        playRdDuration: 0, //播放记录播放时长
                        playRdOffLineStatus: 'P', //L:在线播放;O:离线播放
                        subjectId: this.subjectId, // 科目ID
                        courseId: this.itemData.courseId, // 课程IDS
                    },
                ],
            };

            return this.httpClient({
                url: 'cc/cc-playrd-batch-add',
                params: data,
            }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
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
        /**
         * 做题模式选择的弹窗
         */
        changeMode(answersheetInfo) {
            this.$baseUI
                .createModel(
                    {
                        modalHeader: (
                            <div class="paper-title-wrap">
                                <div class="title">模式选择</div>
                            </div>
                        ),
                        modalContent: ModeSelection,
                    },
                    {},
                    {
                        width: '328px',
                        height: '230px',
                        radius: '16px',
                        padding: '0',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close') {
                        // 背题模式（可随时看解析）
                        if (ret === 1) {
                            this.solvingMode = 'do-exercise';
                            this.problemSolvingMode();
                            this.doJump(answersheetInfo);
                        } else if (ret === 2) {
                            this.solvingMode = 'do-exam';
                            this.problemSolvingMode();
                            // 做题模式（交卷后看解析）
                            this.doJump(answersheetInfo);
                        }
                    }
                });
        },
        /**
         * 做题模式数据的存储
         */
        problemSolvingMode() {
            const userInfo = this.$storage.get('loginStatus') || {};
            const modeObj = this.$storage.get('problemSolvingMode') || {};
            const str = `${userInfo.userId}-${this.itemData.paperId}`;
            modeObj[str] = this.solvingMode;
            this.$storage.set('problemSolvingMode', modeObj);
        },
    },
    render() {
        return (
            <div class="wrap">
                <div class="content">
                    <div class="title">
                        <div class="name">
                            <img src={require('./asset/images/shijuan.png')} class="img" />
                            {this.itemData.coursewareName}
                            {this.itemData.coursewareElectiveStatus === 'Y' && <div class="tags">选修</div>}
                            <img style={{ display: this.itemData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                        </div>
                    </div>
                    <div class="info">
                        <div class="size">习题总数：{this.questionTotal}</div>
                        <div class="progress-wrap">
                            <div class="progress-pipeline" style={{ display: this.itemData.studyStatus == 'S' ? 'block' : 'none' }}>
                                <div class="rate" style={{ width: `${this.percentage}%` }}></div>
                            </div>
                            <div class="txt" style={{ display: this.itemData.studyStatus == 'S' || this.itemData.studyStatus == 'Y' ? 'block' : 'none' }}>
                                {this.itemData.studyStatus == 'Y' ? `已学完` : `已学${this.percentage}%`}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-group">
                        {this.itemData.stageAnswerSheetId && this.itemData.stageAnswerSheetStatus === 'A' && (
                            <div class="btn report" onClick={this.toReport}>
                                查看报告
                            </div>
                        )}

                        <div class="btn" onClick={this.toExamDetail}>
                            {this.answerBtnText}
                        </div>
                    </div>
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
                .lock {
                    width: 24px;
                    height: 24px;
                    vertical-align: bottom;
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

                &.report {
                    color: #f8323c;
                    background: #fff7f5;
                    border: 1px solid #f8323c;
                    cursor: pointer;
                }
            }

            .btn1 {
                margin-left: 0;
                color: #ff2e30;
                background: #ffece8;
            }

            .img {
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-right: 4px;
                margin-top: -3px;
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
.paper-title-wrap {
    text-align: center;
    margin-bottom: 18px;
    .title {
        font-size: 18px;
        color: #333333;
        font-weight: 700;
    }
}
</style>
