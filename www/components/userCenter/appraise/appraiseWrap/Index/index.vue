<template>
    <div class="appraise-wrap">
        <appraise-teacher :item-data="itemData" />
        <appraise-intro :item-data="itemData" v-if="itemData.brief" />

        <component
            v-for="(item, index) in itemData.questions"
            :key="item.id"
            :is="isComponent(item)"
            :item-data="item"
            :show-index="index + 1"
            @updateData="setData"
        ></component>

        <div class="time" v-if="type === 'show'">{{ itemData.evaluateDate }}</div>
        <div class="submit" v-if="type !== 'show'" @click="doSubmit">提交</div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import AppraiseTeacher from '../components/AppraiseTeacher/index.vue';
import AppraiseIntro from '../components/AppraiseIntro/index.vue';
import AppraiseScore from '../components/AppraiseScore/index.vue';
import AppraiseSingle from '../components/AppraiseSingle/index.vue';
import AppraiseCheckbox from '../components/AppraiseCheckbox/index.vue';
import AppraiseTextarea from '../components/AppraiseTextarea/index.vue';
import '@/api/cmt/api.CMTS1004.question-info.js';
import '@/api/cmt/api.CMTS1005.question-save.js';
export default {
    components: {
        AppraiseTeacher,
        AppraiseIntro,
        AppraiseScore,
        AppraiseSingle,
        AppraiseCheckbox,
        AppraiseTextarea,
    },
    props: {
        type: {
            type: String,
            default: 'show',
        },
        appraiseId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            itemData: {},
            questions: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions('message', {
            getAjaxQuestionnaireCount: 'getAjaxQuestionnaireCount',
        }),
        init() {
            this.getData();
        },
        getData() {
            let params = {
                id: this.appraiseId,
            };
            this.$niceloo.api.call('cmt/question-info', {
                ...params,
                onsuccess: (res) => {
                    if (res.evaluateStatus === 'Y' && this.type !== 'show') {
                        // 已评价
                        this.$router.replace(`/uc/manager/cmt/answerInfo/${this.appraiseId}`);
                        return;
                    }
                    res.questions.map((r) => {
                        if (r.questionType === 'G') {
                            let num = parseInt(r.replyContent);
                            if (isNaN(num)) {
                                num = 0;
                            }
                            r.replyContent = num;
                        }

                        return r;
                    });
                    this.itemData = res;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        isComponent(item) {
            // 计算需要使用那个组件
            if (item.questionType === 'G') {
                // 评分
                return AppraiseScore;
            } else if (item.questionType === 'A') {
                // 回复
                return AppraiseTextarea;
            } else if (item.questionType === 'S' && item.optionType === 'S') {
                // 单选题
                return AppraiseSingle;
            } else if (item.questionType === 'S' && item.optionType === 'M') {
                // 多选题
                return AppraiseCheckbox;
            }

            return '';
        },
        setData(key, val) {
            if (val.replyContent || val.replyPictures) {
                this.questions[key] = val;
            } else {
                delete this.questions[key];
            }
        },
        doSubmit() {
            let questionArr = [];
            Object.keys(this.questions).forEach((k) => {
                let item = this.questions[k];
                questionArr.push({
                    id: item.id,
                    questionType: item.questionType,
                    replyContent: item.replyContent,
                    replyPictures: item.replyPictures,
                });
            });
            console.log(questionArr.length, this.itemData.questions.length, '===');
            if (questionArr.length < this.itemData.questions.length) {
                this.$baseUI.alert('请填写全部问卷后再提交！！');
                return;
            }
            let form = {
                id: this.appraiseId,
                questions: questionArr,
            };
            console.log(form, 'form');
            let that = this;
            this.$niceloo.api.call('cmt/question-save', {
                ...form,
                onsuccess: (res) => {
                    this.getAjaxQuestionnaireCount();
                    this.$baseUI.alert('提交成功！', '提示', {
                        success() {
                            that.$PageUtil.href('/uc/manager/cmt/allCmt');
                        },
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.appraise-wrap {
    padding: 14px 30px;
}
.time {
    padding-top: 10px;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: right;
}

.submit {
    margin: 0 auto;
    width: 242px;
    height: 40px;
    font-size: 16px;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    margin-top: 56px;
    cursor: pointer;
    background: linear-gradient(90deg, #f07963 0%, #e73928 100%);
    border-radius: 18px;
    box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
}
</style>
