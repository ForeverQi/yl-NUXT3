<script lang="jsx">
import '@/api/cmt/api.CMT1004.cmt-comment-exist.js';
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
    name: 'CourseDivision',
    data() {
        return {
            phraseLookup: false,
            answerQuestion: false,
            isComment: false,

            lockStatus: false, // 当前课程是否有模块锁
            courseExtendInfo: {}, // 课件扩展信息
            showAIParctice: false, // 是否有智能学习课后练习

            mindFileInfo: {
                pic: '',
                downloadFilePath: '',
            },
            showMindPic: false,

            hiddenCatalogue: false,
        };
    },
    computed: {
        ...mapState('course/division', {
            divisionType: 'type',
        }),
        ...mapState('course/info', {
            showHandoutMax: 'showHandoutMax',
            enableStatus: 'enableStatus',
            interactionStatus: 'interactionStatus',
            classId: 'classId',
            coursewareId: 'coursewareId',
            ctapId: 'ctapId',

            modulId: 'modulId',
            ifHandoutHave: 'ifHandoutHave',

            projectId: 'projectId',
            userName: 'userName',
        }),
    },
    watch: {
        classId: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.init();
                }
            },
            immediate: true,
        },
        coursewareId: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.getCommentExist();
                    if (this.modulId) {
                        this.getCoursewareExtendInfo();
                    }
                }
            },
            immediate: true,
        },
        modulId: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.getCoursewareExtendInfo();
                }
            },
            immediate: true,
        },
    },
    methods: {
        ...mapMutations('course/division', {
            setType: 'setType',
            doShowAIParctice: 'doShowAIParctice',
        }),
        ...mapMutations('course/info', {
            doVideoResume: 'doVideoResume',
            doVideoPause: 'doVideoPause',
            setCourseInfo: 'setCourseInfo',
        }),
        ...mapActions('class-info/learn-tool', {
            getLearnToolsStatus: 'getLearnToolsStatus',
        }),
        init() {
            this.getLearnToolsStatus(this.classId)
                .then((res) => {
                    this.answerQuestion = res.answerQuestion;
                    this.phraseLookup = res.phraseLookup;
                })
                .catch(() => {
                    this.$baseUI.loading.closeAll();
                });
        },
        getCommentExist() {
            let data = {
                url: 'cmt/cmt-comment-exist',
                params: {
                    commentBizid: this.coursewareId,
                },
            };
            this.httpClient(data).then((res) => {
                this.isComment = !!res.exist;
            });
        },
        getCoursewareExtendInfo() {
            const params = {
                url: 'cc/query-courseware-extend-info',
                params: {
                    classId: this.classId,
                    modulId: this.modulId,
                    coursewareId: this.coursewareId,
                },
            };
            return this.httpClient(params).then((res) => {
                this.courseExtendInfo = res;
                this.showAIParctice = res.paperStatus === 'Y';
                if (res.lockedStatus === 'Y') {
                    this.lockStatus = true;
                    this.setCourseInfo({
                        lockStatus: true,
                    });
                    this.doVideoPause();
                    this.$baseUI
                        .alert(res.lockedTip, '提示', {
                            confirmText: '立即前往',
                        })
                        .then(() => {
                            let url = `/learningCenter/allTask/${this.classId}?ctapId=${this.ctapId}`;
                            if (res.frontModuleIds && res.frontModuleIds[0]) {
                                url = `${url}&moduleId=${res.frontModuleIds[0]}`;
                            }
                            this.$PageUtil.href(url);
                        });
                } else {
                    this.setCourseInfo({
                        lockStatus: false,
                    });
                    this.lockStatus = false;
                }
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
            <div class="course-division">
                <div
                    style={this.divisionType === 0 ? 'visibility: hidden' : ''}
                    class="catalogue-stow"
                    onClick={() => {
                        this.setType(0);
                        this.hiddenCatalogue = true;
                        this.$yiguan.track('web_learning_center_htvideo_click_close', {
                            college_name: '',
                            project_position: this.projectId,
                            youlu_ID: this.userName,
                            page_name: document.title,
                            project_name: this.projectId,
                        });
                    }}
                >
                    <div class="icon stow"></div>
                    <div class="txt">收起</div>
                </div>
                <div class="wrap">
                    <div
                        class={{ item: true, this: this.divisionType === 1 }}
                        onClick={() => {
                            if (this.divisionType === 1) {
                                // 已经在目录状态的不在处理
                                return;
                            }
                            this.setType(1);
                            if (this.hiddenCatalogue === true) {
                                // 从收起状态到目录状态
                                this.hiddenCatalogue = false;
                                this.$yiguan.track('web_learning_center_htvideo_click_open', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            } else {
                                this.$yiguan.track('web_learning_center_htvideo_click_catalogue', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }
                        }}
                    >
                        <div class="icon mulu"></div>
                        <div class="txt">目录</div>
                    </div>
                    {this.ifHandoutHave && (
                        <div
                            class={{ item: true, this: this.divisionType === 2 || this.showHandoutMax === true }}
                            onClick={() => {
                                if (this.showHandoutMax === true) {
                                    return;
                                }
                                this.setType(2);
                                this.$yiguan.track('web_learning_center_htvideo_click_handout', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon jiangyi"></div>
                            <div class="txt">讲义</div>
                        </div>
                    )}
                    {this.answerQuestion && (
                        <div
                            class={{ item: true, this: this.divisionType === 3 }}
                            onClick={() => {
                                this.setType(3);

                                this.$yiguan.track('web_learning_center_htvideo_click_answering', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon dayi"></div>
                            <div class="txt">学习答疑</div>
                        </div>
                    )}

                    {this.phraseLookup && (
                        <div
                            class={{ item: true, this: this.divisionType === 4 }}
                            onClick={() => {
                                this.setType(4);

                                this.$yiguan.track('web_learning_center_htvideo_click_phrase_query', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon cidiankuaicha"></div>
                            <div class="txt">词点快查</div>
                        </div>
                    )}

                    {this.interactionStatus === 'Y' && (this.courseExtendInfo.paperId || this.courseExtendInfo.answersheetId) && (
                        <div
                            class={{ item: true, this: this.divisionType === 5 }}
                            onClick={() => {
                                this.setCourseInfo({
                                    paperId: this.courseExtendInfo.paperId,
                                    answersheetId: this.courseExtendInfo.answersheetId,
                                });
                                this.doVideoPause();
                                this.doShowAIParctice(true);

                                this.$yiguan.track('web_learning_center_htvideo_click_exercises', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon aitest"></div>
                            <div class="txt">AI随堂练</div>
                        </div>
                    )}
                    {this.interactionStatus === 'Y' && this.courseExtendInfo.mindPath && (
                        <div
                            class={{ item: true }}
                            onClick={() => {
                                this.setCourseInfo({
                                    showMindPic: true,
                                    mindFileInfo: {
                                        pic: this.$urlUtils.getViewUrl(this.courseExtendInfo.mindPath),
                                        downloadFilePath: this.$urlUtils.getDownloadUrl(this.courseExtendInfo.mindPath),
                                    },
                                });

                                this.$yiguan.track('web_learning_center_htvideo_click_mind', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon mind"></div>
                            <div class="txt">思维导图</div>
                        </div>
                    )}
                    {this.interactionStatus === 'N' && this.enableStatus === 'N' && (
                        <div
                            class={{ comQues: true, item: true, this: this.divisionType === 6 }}
                            onClick={() => {
                                window.CoursePopSupport.classReportClick();

                                this.$yiguan.track('web_learning_center_htvideo_click_practise', {
                                    college_name: '',
                                    project_position: this.projectId,
                                    youlu_ID: this.userName,
                                    page_name: document.title,
                                    project_name: this.projectId,
                                });
                            }}
                        >
                            <div class="icon testRecord"></div>
                            <div class="txt">随堂记录</div>
                        </div>
                    )}
                    <div
                        class={{ item: true, this: this.divisionType === 7 }}
                        onClick={() => {
                            this.$emit('getPlayTime', (time) => {
                                if (this.isComment === false && time < 10 * 60) {
                                    this.doVideoPause();
                                    this.$baseUI.alert('听课10分钟后才能评价哦！').then(() => {
                                        this.doVideoResume();
                                    });
                                } else {
                                    this.setType(7);

                                    this.$yiguan.track('web_learning_center_htvideo_click_evaluate', {
                                        college_name: '',
                                        project_position: this.projectId,
                                        youlu_ID: this.userName,
                                        page_name: document.title,
                                        project_name: this.projectId,
                                    });
                                }
                            });
                        }}
                    >
                        <div class="icon coursePingjia"></div>
                        <div class="txt">课程评价</div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-division {
    width: 100%;
    height: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    overflow-y: auto;
}

.wrap {
    .item {
        text-align: center;
        height: 70px;
        width: 100%;
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: default;

        &.comQues {
            display: none;
        }
        &:hover,
        &.this {
            background-color: #2a3440;

            .txt {
                color: #fff;
            }

            .icon {
                &.mulu {
                    background-image: url(./asset/images/icon2/mulu.png);
                }
                &.jiangyi {
                    background-image: url(./asset/images/icon2/jiangyi.png);
                }
                &.dayi {
                    background-image: url(./asset/images/icon2/dayi.png);
                }
                &.cidiankuaicha {
                    background-image: url(./asset/images/icon2/cidiankuaicha.png);
                }
                &.aitest {
                    background-image: url(./asset/images/icon2/aitest.png);
                }
                &.mind {
                    background-image: url(./asset/images/icon2/mind.png);
                }
                &.testRecord {
                    background-image: url(./asset/images/icon2/test-record.png);
                }
                &.coursePingjia {
                    background-image: url(./asset/images/icon2/course-pingjia.png);
                }
            }
        }
        .icon {
            width: 24px;
            height: 24px;
            margin: 0 auto;
            background-size: 100% 100%;
            background-repeat: no-repeat;

            &.mulu {
                background-image: url(./asset/images/icon/mulu.png);
            }
            &.jiangyi {
                background-image: url(./asset/images/icon/jiangyi.png);
            }
            &.dayi {
                background-image: url(./asset/images/icon/dayi.png);
            }
            &.cidiankuaicha {
                background-image: url(./asset/images/icon/cidiankuaicha.png);
            }
            &.aitest {
                background-image: url(./asset/images/icon/aitest.png);
            }
            &.mind {
                background-image: url(./asset/images/icon/mind.png);
            }
            &.testRecord {
                background-image: url(./asset/images/icon/test-record.png);
            }
            &.coursePingjia {
                background-image: url(./asset/images/icon/course-pingjia.png);
            }
        }
        .txt {
            font-size: 12px;
            color: #ddd;
            padding-top: 8px;
            line-height: 16px;
        }
    }
}
.catalogue-stow {
    text-align: center;
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: default;

    .icon {
        width: 18px;
        height: 18px;
        margin: 0 auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &.stow {
            background-image: url(./asset/images/icon/stow.png);
        }
    }
    .txt {
        font-size: 14px;
        color: #ddd;
        line-height: 35px;
    }

    &:hover {
        background-color: #364353;
        .txt {
            color: #fff;
        }
        .icon {
            &.stow {
                background-image: url(./asset/images/icon2/stow.png);
            }
        }
    }
}
</style>
