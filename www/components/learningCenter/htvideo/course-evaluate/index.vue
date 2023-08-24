<template>
    <div class="evaluate-content-box">
        <courseSideTitle :title="'课程评价'"></courseSideTitle>
        <div class="evaluate-content-content">
            <evaluateSubmit
                v-if="evaluateStatus === 'notEvaluated'"
                :lable-type="lableType"
                :comment-info="commentInfo"
                @submitComment="submitComment"
            ></evaluateSubmit>
            <evaluateStatus
                v-if="evaluateStatus === 'success' || evaluateStatus === 'error'"
                :evaluate-status="evaluateStatus"
                @handleEvaluate="handleEvaluate"
            ></evaluateStatus>
            <evaluateView v-if="evaluateStatus === 'evaluated'" :comment-info="commentInfo"></evaluateView>
        </div>
    </div>
</template>

<script>
/**
 * 组件说明：
 * **/
import '@/api/cmt/api.CMT1002.cmt-comment-detail.js';
import '@/api/cmt/api.CMT1001.cmt-comment-add.js';
import { mapState } from 'vuex';
import courseSideTitle from '../course-side-title/index.vue';
import evaluateSubmit from './component/course-evaluate-submit/index.vue';
import evaluateStatus from './component/course-evaluate-status/index.vue';
import evaluateView from './component/course-evaluate-view/index.vue';

export default {
    name: 'index',
    components: { courseSideTitle, evaluateSubmit, evaluateStatus, evaluateView },
    props: {
        lableType: {
            type: String,
            default: 'TC', //默认为LC-课程评价，HT-班主任评价
        },
        // projectId: {
        //     type: String,
        //     default: 'PROJECT20191126010000000163',
        // },
    },
    data() {
        return {
            commentInfo: {},
            evaluateStatus: '', //标识评价的状态 notEvaluated未评价 evaluated已评价 success成功 error失败
        };
    },
    computed: {
        ...mapState('course/info', {
            coursewareId: 'coursewareId',
            moduleName: 'moduleName',
            courseName: 'courseName',
            catalogName: 'catalogName',
            coursewareName: 'coursewareName',
            subjectId: 'subjectId',
            projectId: 'projectId',
            teacherId: 'teacherId',
        }),
    },
    watch: {
        coursewareId: {
            //监听课程id变化，id改变需要重新获取评价详情
            handler() {
                this.getCommentDetail();
            },
        },
    },
    created() {
        this.getCommentDetail();
    },
    methods: {
        /**
         * 获取评价详情数据
         * **/
        getCommentDetail() {
            this.$callApi('cc/cmt-comment-detail', {
                commentBizid: this.coursewareId,
                onsuccess: (res) => {
                    this.commentInfo = res;
                    if (!this.commentInfo.commentId) {
                        this.evaluateStatus = 'notEvaluated';
                    } else {
                        this.evaluateStatus = 'evaluated';
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 点击提交评价的回调 此时评价数据（包括必填、非必填）已具有
         * @params {Object} data 评价数据
         * **/
        submitComment(data) {
            niceloo.api.call('cmt/cmt-comment-add', {
                ...data,
                commentBizid: this.coursewareId,
                commentBizname: `${this.moduleName}/${this.courseName}/${this.catalogName}/${this.coursewareName}`,
                projectId: this.projectId,
                subjectId: this.subjectId,
                serveruserId: this.teacherId,
                commentBiztype: 'ST',
                onsuccess: (res) => {
                    if (res.commentId) {
                        this.commentInfo.commentId = res.commentId;
                        this.evaluateSubmitEnd(true);
                    } else {
                        this.evaluateSubmitEnd(true);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 评价提交结束的回调 供父组件调用
         * @params {Boolean} flag 标识评价提交的结果 true成功 false失败
         * **/
        evaluateSubmitEnd(flag) {
            if (flag) {
                this.evaluateStatus = 'success';
            } else {
                this.evaluateStatus = 'error';
            }
        },
        /**
         * 提交结果操作按钮的回调
         * @params {String} evaluateStatus evaluated提交成功点击按钮为查看评价 notEvaluated提交失败点击按钮为继续评价
         * **/
        handleEvaluate(evaluateStatus) {
            this.evaluateStatus = evaluateStatus;
            this.getCommentDetail();
        },
    },
};
</script>

<style lang="less" scoped>
.evaluate-content-box {
    width: 100%;
    height: 100%;
    background: #2a3440;
    overflow: hidden;
    .evaluate-content-content {
        height: calc(100% - 60px);
        overflow-y: auto;
    }
}
</style>
