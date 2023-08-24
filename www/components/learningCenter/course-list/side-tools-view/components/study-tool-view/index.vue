<script lang="jsx">
import { mapState, mapActions } from 'vuex';
import '@/api/cc/api..query-wechat-bind-state.js';
import '@/api/cc/api..query-computer-exam-list.js';
import '@/api/api..query-third-duia.js';
import MockExamView from '../mock-exam-view/index.vue';
import DictBox from '@/www/components/dictWidget/components/DictBox/index.vue';
export default {
    name: 'StudyToolView',
    data() {
        return {
            showList: true,
            showDict: false,
            learnTools: {},
            projectInfo: {},
            bind: false, // 是否绑定小程序
            attention: false, // 是否关注公众号
            cardList: [
                {
                    key: 'answerQuestion',
                    className: 'learn-answer',
                    name: '学习答疑',
                    tip: '随时解答学习疑问',
                    doHandle: () => {
                        this.sendLog('学习答疑');
                        setTimeout(() => {
                            this.$PageUtil.openNewPage(`/learningCenter/index/answerQuestion?projectId=${this.projectId}`);
                        }, 100);
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'examSite',
                    className: 'exam-know',
                    name: '考点秒懂',
                    tip: '哪里不会学哪里',
                    doHandle: () => {
                        this.sendLog('考点秒懂');
                        setTimeout(() => {
                            this.$PageUtil.openNewPage(`/learningCenter/knowledge-strengthen?projectId=${this.projectId}`);
                        }, 100);
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'phraseLookup',
                    className: 'knowledge-inquire',
                    name: '词点快查',
                    tip: '核心词组一查即懂',
                    doHandle: () => {
                        this.sendLog('词点快查');
                        this.showDict = true;
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    // 本次隐藏
                    key: 'memoryFlash--',
                    className: 'memory-card',
                    name: '记忆闪卡',
                    tip: '记忆口诀随心记',
                    doHandle: () => {
                        this.sendLog('记忆闪卡');
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'examSystem',
                    className: 'mock-exam',
                    name: '机考系统',
                    tip: '真实体验考试场景',
                    doHandle: () => {
                        this.sendLog('机考系统');
                        this.showMockExam();
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'trainingPlatform',
                    className: 'training-platform',
                    name: '会计实操实训平台',
                    tip: '全面提升会计技能',
                    doHandle: () => {
                        this.sendLog('会计实操实训平台');
                        // this.showMockExam();
                        this.$callApi('cc/query-third-duia', { classId: this.classId })
                            .then((_reponse) => {
                                let res = _reponse.getData();
                                if (res.isUrl === true) {
                                    this.$PageUtil.openNewPage(res.url);
                                }
                            })
                            .catch((err) => {
                                this.$niceloo.api.handleFailure(err);
                            });
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'questionBook',
                    className: 'ai-wrong',
                    name: 'AI错题本',
                    tip: '错题集合',
                    doHandle: () => {
                        this.sendLog('AI错题本');
                        setTimeout(() => {
                            this.$PageUtil.openNewPage(
                                `/learningCenter/test-question/wrongly-answered-list?projectCode=${this.projectInfo.projectCode}&baseSubjectId=${this.subjectId}`
                            );
                        }, 100);
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'favorites',
                    className: 'exam-favorites',
                    name: '试题收藏夹',
                    tip: '收藏试题集合',
                    doHandle: () => {
                        this.sendLog('试题收藏夹');
                        setTimeout(() => {
                            this.$PageUtil.openNewPage(
                                `/learningCenter/test-question/collected-list?projectCode=${this.projectInfo.projectCode}&baseSubjectId=${this.subjectId}&classId=${this.classId}`
                            );
                        }, 100);
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    // 本次隐藏
                    key: 'offlineLearn--',
                    className: 'offline-learn',
                    name: '离线学习',
                    tip: '下载后可随时离线观看',
                    doHandle: () => {
                        this.sendLog('试题收藏夹');
                        this.openPCClient();
                    },
                    showHtml() {
                        return '';
                    },
                },
                {
                    key: 'xiaoYouInspector',
                    className: 'inspectors',
                    name: '小优督学',
                    tip: '推送报考通知',
                    doHandle: () => {
                        this.sendLog('小优督学');
                    },
                    showHtml: () => {
                        return (
                            <div class="qrcode">
                                {(this.showQrcode === 0 || this.showQrcode === 2) && <img class="img" src={require('./asset/images/sp-code.jpg')} />}
                                {this.showQrcode === 1 && <img class="img" src={require('./asset/images/xydx_QR_code.png')} />}
                            </div>
                        );
                    },
                },
                {
                    // 本次隐藏
                    key: 'dayPractice--',
                    className: 'day-practice',
                    name: '每日一练',
                    tip: '每日推送练习习题',
                    doHandle: () => {
                        this.sendLog('小优督学');
                        setTimeout(() => {
                            this.$PageUtil.openNewPage(`/exam/index/list/${this.projectInfo.projectCode}/${this.projectInfo.projectCode}/ZJLX`);
                        }, 100);
                    },
                    showHtml() {
                        return '';
                    },
                },
            ],
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId',
            projectId: 'projectId',
            projectName: 'projectName',
        }),
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        isShowTools() {
            let ret = false;
            Object.keys(this.learnTools).forEach((k) => {
                if (this.learnTools[k] === true) {
                    ret = true;
                }
            });
            return ret;
        },
        showQrcode() {
            /**
             * 0：未关注公众号，未关注小程序
             * 1：已关注小程序，未关注公众号
             * 2、已关注小程序，已关注公众号
             */
            if (this.bind === 'Y') {
                // 绑定小程序
                if (this.attention === 'Y') {
                    // 关注公众号
                    return 2;
                } else {
                    // 未关注
                    return 1;
                }
            }
            // 已绑定已关注
            return 2;
        },
    },
    watch: {
        projectId: {
            handler(val) {
                if (val) {
                    this.init();
                }
            },
            immediate: true,
        },
    },
    mounted() {
        // 小题库-学习中心-我的题库，不显示'AI错题本'和'试题收藏夹'
        if (this.$route.query.questionBankStatus === 'special') {
            this.cardList.forEach((item) => {
                if (item.key === 'questionBook') item.key = item.key + '--';
                if (item.key === 'favorites') item.key = item.key + '--';
            });
        }
    },
    methods: {
        ...mapActions('class-info/learn-tool', {
            getProjectAndTools: 'getProjectAndTools',
        }),
        sendLog(type) {
            const data = {
                college_name: '',
                page_name: '学习中心-课程详情',
                project_name: this.projectName ? this.projectName : this.projectId,
                tool_name: type,
            };
            this.$yiguan.learningCenter('web_learning_center_click_tool', data);
        },
        init() {
            this.getProjectAndTools({ projectId: this.projectId, classId: this.classId }).then((res) => {
                this.learnTools = res.toolsMap;
                this.projectInfo = res.projectInfo;
                if (this.learnTools.xiaoYouInspector === true) {
                    this.getBindStatus();
                }
            });
        },
        showMockExam() {
            const data = {
                url: 'cc/query-computer-exam-list',
                params: {
                    classId: this.classId,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                if (res.length === 0) {
                    this.$baseUI.alert('暂无机考试卷');
                    return;
                }
                this.showDialog(res);
            });
        },
        showDialog(list) {
            this.$baseUI.createModel(
                {
                    modalContent: MockExamView,
                    modalHeader: (
                        <div class="title-wrap">
                            <div class="title">机考系统</div>
                            <div class="tip">真实体验机考流程，提前熟悉，考试不慌</div>
                        </div>
                    ),
                },
                {
                    list,
                },
                {
                    width: '620px',
                    radius: '16px',
                }
            );
        },
        getBindStatus() {
            ylPlugin.login
                .getUser()
                .then((userData) => {
                    if (!userData) {
                        return Promise.reject();
                    }
                    return {
                        url: 'cc/query-wechat-bind-state',
                        params: {
                            userId: userData.userId,
                        },
                        isCustom: false,
                    };
                })
                .then((params) => {
                    this.httpClient(params).then((res) => {
                        this.attention = res.data[0] ? res.data[0].attention : 'N';
                        this.bind = res.data[0] ? res.data[0].bind : 'N';
                    });
                })
                .catch(() => {});
        },
        doShowList() {
            const data = {
                college_name: '',
                page_name: '学习中心-课程详情',
                project_name: this.projectName ? this.projectName : this.projectId,
            };
            this.$yiguan.learningCenter('web_learning_center_expand_tools', data);
            this.showList = !this.showList;
        },
        openPCClient() {
            let newhref = 'niceloo://@isPclinetLive@true';
            this.$clientUtil.openPcClient(newhref);
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
            <div class="study-tool-view" style={this.isShowTools ? '' : 'display: none'}>
                {this.showDict && (
                    <DictBox
                        projectId={this.projectId}
                        dictBoxShow={true}
                        onClose-dict={() => {
                            this.showDict = false;
                        }}
                    />
                )}
                <div class="head" onClick={this.doShowList}>
                    <div class="title"></div>
                    <div class={['handle', this.showList ? 'up' : 'down']}></div>
                </div>
                {this.showList && (
                    <div class="list">
                        {this.isShowTools &&
                            this.cardList.map((rs) => {
                                return (
                                    <div class={`item ${rs.className}-bg`} onClick={rs.doHandle} style={this.learnTools[rs.key] ? '' : 'display: none'}>
                                        <div class={`icon ${rs.className}`}></div>
                                        <div class="name">{rs.name}</div>
                                        <div class="tip">{rs.tip}</div>
                                        {rs.showHtml()}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.title-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 18px;
        font-weight: 700;
        line-height: 18px;
        color: #333333;
    }
    .tip {
        padding-top: 6px;
        color: #99a1af;
        font-size: 12px;
        line-height: 16px;
    }
}
.qrcode {
    display: none;
    width: 188px;
    z-index: 10;
    background-color: #fff;
    position: absolute;
    top: -25px;
    left: -205px;
    border: 1px solid #f3f3f3;
    text-align: center;
    padding: 25px 0 16px 0;
    box-shadow: 0px 2px 12px 4px rgba(11, 42, 113, 0.05);
    border-radius: 8px;
    transition: opacity 2s;
    -moz-transition: opacity 2s; /* Firefox 4 */
    -webkit-transition: opacity 2s; /* Safari 和 Chrome */
    -o-transition: opacity 2s; /* Opera */

    &::before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        top: 70px;
        right: -10px;
        margin-top: -5px;
        border: 5px solid #fff;
        border-bottom-color: transparent;
        border-top-color: transparent;
        border-right-color: transparent;
    }

    .img {
        width: 116px;
        height: 116px;
        display: inline-block;
        margin: 0 auto;
    }
}
.study-tool-view {
    margin-top: 16px;
    background-color: #fff;
    border-radius: 8px;
    padding: 5px 16px;
}
.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 23px 0;
    cursor: pointer;
    .title {
        width: 71px;
        height: 17px;
        background-image: url(./asset/images/title.png);
        background-size: 100% 100%;
    }
    .handle {
        width: 12px;
        height: 12px;
        background-size: 100% 100%;

        &.down {
            background-image: url(./asset/images/d.png);
        }
        &.up {
            background-image: url(./asset/images/u.png);
        }
    }
}
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        position: relative;
        width: 140px;
        height: 99px;
        margin-bottom: 16px;
        padding-left: 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;

        &:hover {
            .qrcode {
                display: block;
            }
        }
        &.learn-answer-bg {
            background-image: url(./asset/images/learn-answer-bg.png);
            background-size: 100% 100%;
        }

        &.exam-know-bg {
            background-image: url(./asset/images/exam-know-bg.png);
            background-size: 100% 100%;
        }

        &.knowledge-inquire-bg {
            background-image: url(./asset/images/knowledge-inquire-bg.png);
            background-size: 100% 100%;
        }
        &.mock-exam-bg {
            background-image: url(./asset/images/mock-exam-bg.png);
            background-size: 100% 100%;
        }
        &.training-platform-bg {
            background-image: url(./asset/images/kuaiji-bg.png);
            background-size: 100% 100%;
        }
        &.ai-wrong-bg {
            background-image: url(./asset/images/ai-wrong-bg.png);
            background-size: 100% 100%;
        }
        &.exam-favorites-bg {
            background-image: url(./asset/images/exam-favorites-bg.png);
            background-size: 100% 100%;
        }
        &.offline-learn-bg {
            background-image: url(./asset/images/offline-learn-bg.png);
            background-size: 100% 100%;
        }
        &.memory-card-bg {
            background-image: url(./asset/images/memory-card-bg.png);
            background-size: 100% 100%;
        }
        &.day-practice-bg {
            background-image: url(./asset/images/day-practice-bg.png);
            background-size: 100% 100%;
        }
        &.day-practice-bg {
            background-image: url(./asset/images/day-practice-bg.png);
            background-size: 100% 100%;
        }
        &.inspectors-bg {
            background-image: url(./asset/images/inspectors-bg.png);
            background-size: 100% 100%;
        }
        .icon {
            width: 20px;
            height: 20px;
            background-size: 100% 100%;

            &.learn-answer {
                background-image: url(./asset/images/learn-answer.png);
            }
            &.memory-card {
                background-image: url(./asset/images/memory-card.png);
            }
            &.exam-know {
                background-image: url(./asset/images/exam-know.png);
            }

            &.knowledge-inquire {
                background-image: url(./asset/images/knowledge-inquire.png);
            }
            &.mock-exam {
                background-image: url(./asset/images/mock-exam.png);
            }
            &.training-platform {
                background-image: url(./asset/images/kuaiji.png);
            }
            &.ai-wrong {
                background-image: url(./asset/images/ai-wrong.png);
            }
            &.exam-favorites {
                background-image: url(./asset/images/exam-favorites.png);
            }
            &.offline-learn {
                background-image: url(./asset/images/offline-learn.png);
            }
            &.inspectors {
                background-image: url(./asset/images/inspectors.png);
            }
            &.day-practice {
                background-image: url(./asset/images/day-practice.png);
            }
        }

        .name {
            padding-top: 12px;
            font-size: 14px;
            text-align: left;
            color: #3a3d4b;
            line-height: 19px;
        }

        .tip {
            padding-top: 6px;
            font-size: 12px;
            color: #b8b8c4;
            line-height: 18px;
        }
    }
}
</style>
