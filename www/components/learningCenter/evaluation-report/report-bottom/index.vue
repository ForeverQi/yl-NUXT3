<template>
    <div class="bottom-wrap">
        <span class="praise praised" @click="saveFeedback" v-if="feedbackStatus === 'Z'">已点赞</span>
        <span class="praise" @click="saveFeedback" v-else>赞一个</span>
        <span class="problem-feedback" @click="isShow = true">问题反馈</span>
        <feed-back :show.sync="isShow" :feedback-type="'P'" :class-id="classId" :class-name="className" :project-id="projectId" />
        <div class="tips">
            <img src="./asset/images/query.png" />
            <p class="tip">如果觉得学习报告对您有帮助，给个赞或提出您的宝贵意见</p>
        </div>
    </div>
</template>

<script>
import FeedBack from '@/www/components/components/learn-center-feed-back/index.vue';
import '@/api/igt/api..feed-back-info.js';
import '@/api/igt/api..feedback-save.js';
export default {
    components: {
        FeedBack,
    },
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            feedbackStatus: '',
            isShow: false,
            showTips: false,
            classId: '',
            className: '',
        };
    },
    created() {
        this.classId = this.$route.params.classId || this.$route.query.classId;
        this.className = this.$route.query.className;
    },
    mounted() {
        if (this.classId) {
            this.getFeedbackInfo();
        }
    },
    methods: {
        getFeedbackInfo() {
            //igt/feedback/info
            this.$callApi('igt/feed-back-info', {
                classId: this.classId,
                feedbackType: 'P', //P:阶段测评；C:学习报告
                onsuccess: (result) => {
                    this.feedbackStatus = result ? result.feedbackStatus : '';
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        saveFeedback() {
            //igt/feedback/save
            this.$callApi('igt/feedback-save', {
                projectId: this.projectId,
                classId: this.classId,
                className: this.className,
                feedbackType: 'P', //P:阶段测评；C:学习报告
                feedbackStatus: this.feedbackStatus === 'Z' ? 'N' : 'Z', //状态 Z: 点赞; N:取消赞 F: 意见反馈;
                feedbackLabel: '', //反馈标签（多个英文逗号隔开）包含 考点不好找；考点听不懂；考点分析对学习没帮助；学习建议对学习没帮助
                feedbackMemo: '', //反馈说明
                picUrls: '', //图片列表
                onsuccess: (result) => {
                    this.feedbackStatus === 'Z' ? (this.feedbackStatus = '') : (this.feedbackStatus = 'Z');
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.bottom-wrap {
    margin-top: 24px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .praise {
        font-size: 14px;
        color: #545f72;
        background: url('./asset/images/praise.png') no-repeat;
        background-size: 20px 18px;
        padding-left: 27px;
        cursor: pointer;

        &.praised {
            background: url('./asset/images/praised.png') no-repeat;
            background-size: 20px 18px;
        }
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
        top: 1px;
        img {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
        .tip {
            position: absolute;
            right: -21px;
            background: #fff;
            top: 30px;
            text-align: left;
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
