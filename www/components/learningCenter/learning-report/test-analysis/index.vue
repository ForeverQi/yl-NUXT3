<template>
    <div>
        <div class="test-analysis">
            <span class="test-analysis-text">考点掌握分析</span>
            <span class="praise" :class="feedbackStatus === 'Z' ? 'cancel-praise' : ''" @click="saveFeedback">
                {{ feedbackStatus === 'Z' ? '已点赞' : '赞一个' }}
            </span>
            <span class="problem-feedback" @click="isShow = true">问题反馈</span>
            <feed-back :show.sync="isShow" :feedback-type="'C'" :class-id="$route.params.classId" :class-name="className" :project-id="projectId"></feed-back>
            <div class="tips">
                <img src="./asset/images/query.png" alt />
                <p class="tip">如果觉得学习报告对您有帮助，给个赞或提出您的宝贵意见</p>
            </div>
        </div>
        <test-analysis-list :data-subject="dataSubject"></test-analysis-list>
    </div>
</template>

<script>
import TestAnalysisList from '../../learning-report/test-analysis-list/index.vue';
import FeedBack from '@/www/components/components/learn-center-feed-back/index.vue';
import '@/api/igt/api..feed-back-info.js';
import '@/api/igt/api..feedback-save.js';
export default {
    name: 'testAnalysis',
    components: {
        FeedBack,
        TestAnalysisList, //考点分析列表
    },
    props: {
        projectId: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
        dataSubject: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            feedbackStatus: '',
            isShow: false,
        };
    },
    mounted() {
        this.getFeedbackInfo();
    },
    methods: {
        getFeedbackInfo() {
            //igt/feedback/info
            this.$callApi('igt/feed-back-info', {
                classId: this.$route.params.classId,
                feedbackType: 'C', //P:阶段测评；C:学习报告
                onsuccess: (result) => {
                    //'Z'，'C'
                    this.feedbackStatus = result ? result.feedbackStatus : '';
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        saveFeedback() {
            //igt/feedback/save
            this.$callApi('igt/feedback-save', {
                projectId: this.projectId,
                classId: this.$route.params.classId,
                className: this.className,
                feedbackType: 'C', //P:阶段测评；C:学习报告
                feedbackStatus: this.feedbackStatus === 'Z' ? 'N' : 'Z', //状态 Z: 点赞; N:取消赞 F: 意见反馈;
                feedbackLabel: '', //反馈标签（多个英文逗号隔开）包含 考点不好找；考点听不懂；考点分析对学习没帮助；学习建议对学习没帮助
                feedbackMemo: '', //反馈说明
                picUrls: '', //图片列表
                onsuccess: (result) => {
                    this.feedbackStatus = this.feedbackStatus === 'Z' ? 'N' : 'Z';
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.test-analysis {
    height: 62px;
    padding-left: 30px;
    background: url('./asset/images/title-bg.png') no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 32px;
    margin-top: 16px;
    .test-analysis-text {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
        color: #121f64;
    }

    .praise {
        font-size: 14px;
        color: #545f72;
        background: url('./asset/images/praise.png') no-repeat;
        background-size: 20px 18px;
        padding-left: 27px;
        cursor: pointer;
    }
    .cancel-praise {
        background: url('./asset/images/praise-cancel.png') no-repeat;
        background-size: 20px 18px;
    }
    .problem-feedback {
        font-size: 14px;
        color: #545f72;
        background: url('./asset/images/problem-feedback.png') no-repeat;
        background-size: 14px 15px;
        background-position-y: 3px;
        padding-left: 22px;
        margin-left: 40px;
        margin-right: 20px;
        cursor: pointer;
    }

    .tips {
        position: relative;
        img {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        .tip {
            position: absolute;
            right: -21px;
            background: #fff;
            top: 37px;
            box-shadow: 0px 1px 4px 2px rgba(0, 0, 0, 0.08);
            font-size: 12px;
            color: #8d90aa;
            line-height: 18px;
            padding: 10px;
            z-index: 10;
            width: 120px;
            text-align: center;
            display: none;
        }
        .tip::before {
            content: '';
            height: 0;
            border-style: solid;
            border-width: 7px;
            border-color: transparent transparent #fff transparent;
            position: absolute;
            right: 22px;
            top: -14px;
            width: 0;
            z-index: 1;
        }
        .tip::after {
            content: '';
            height: 0;
            border-style: solid;
            border-width: 7px;
            border-color: transparent transparent rgba(0, 0, 0, 0.04) transparent;
            position: absolute;
            right: 22px;
            top: -15px;
            width: 0;
        }
        &:hover {
            .tip {
                display: block;
            }
        }
    }
}
</style>
