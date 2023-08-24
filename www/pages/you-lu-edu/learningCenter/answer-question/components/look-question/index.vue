<template>
    <div>
        <span class="look-question" :class="lookQuestion ? 'look-question-fold' : ''" @click.stop="handleLookQuestion()">
            {{ lookQuestion ? '收起对应试题' : '查看对应试题' }}
        </span>
        <div class="" v-if="lookQuestion">
            <component
                :is="modelType[questionDetail.groupType]"
                class="question-component"
                :type="type"
                :data="questionDetail"
                :paper-source-type="paperSourceType"
                :paper-parsing="paperParsing"
                :show-knowledge="showKnowledge"
                :paper-parsing-source="paperParsingSource"
                @handle-change="handleChange"
                @click-collection="clickCollection"
                @save-change="saveChange"
                @click-remove-errquestion="clickRemoveErrquestion"
                @click-opinion="clickOpinion"
                :class="questionDetail.userAnswer ? '' : 'question-analysis1'"
            />
        </div>
    </div>
</template>

<script>
import '@/api/cc/api..question-msg.js';
import '@/api/qb/api..question-information.js';
import defaultFormat from '@/www/components/components/question/js/format.js';

export default {
    name: 'index',
    components: {
        Radio: () => import('@/www/components/components/question/question-show/radio.vue'),
        MultipleChoice: () => import('@/www/components/components/question/question-show/multiple-choice.vue'),
        Explain: () => import('@/www/components/components/question/question-show/explain.vue'),
        Fill: () => import('@/www/components/components/question/question-show/fill.vue'),
        ChooseFill: () => import('@/www/components/components/question/question-show/choose-fill.vue'),
        ClozeFill: () => import('@/www/components/components/question/question-show/cloze-fill.vue'),
        Listening: () => import('@/www/components/components/question/question-show/listening.vue'),
        CaseAnalysis: () => import('@/www/components/components/question/question-show/case-analysis.vue'),
        Compatibility: () => import('@/www/components/components/question/question-show/compatibility.vue'),
    },
    props: {
        questionId: {
            type: String,
            default: '',
        },
        isList: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            modelType: {
                single: 'Radio', // 单选题
                multiple: 'MultipleChoice', // 多选题
                indefinite: 'MultipleChoice', // 不定项选择题
                opinion: 'Explain', // 简答题
                judge: 'Radio', // 判断题
                fill: 'Fill', // 填空题
                'blank-choose': 'ChooseFill', // 选词填空
                'cloze-fill': 'ClozeFill', // 完型填空
                listening: 'Listening', // 听力题
                analysis: 'CaseAnalysis', // 案例分析
                compatibility: 'Compatibility', // 配伍题
            },
            type: true, // 答题模式
            paperSourceType: '',
            paperParsing: true,
            showKnowledge: true,
            paperParsingSource: 'parsing',
            lookQuestion: false,
            questionDetail: {
                stemTitle: '',
                type: 'analysis-indefinite',
                questionList: [],
            },
        };
    },
    methods: {
        handleChange() {},
        clickCollection() {},
        saveChange(type, item, questionId) {},
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {},
        // 意见反馈
        clickOpinion(data) {},
        //针对查看试题添加的逻辑
        handleLookQuestion() {
            if (this.lookQuestion) {
                this.lookQuestion = !this.lookQuestion;
                return;
            }
            this.getQuestionMsg()
                .then((res) => {
                    if (res.testQuestionsId || res.questionStemId) {
                        return this.getQuestionDetail(res);
                    } else {
                        return Promise.reject('试卷不存在');
                        /*throw new Error('试卷不存在');*/
                    }
                })
                .then((res1) => {
                    this.buryingPoint(res1[0].className, res1[0].subjectName);
                    this.lookQuestion = !this.lookQuestion;
                    res1[0].questionVpath = [];
                    res1[0].mediaParses.forEach((item) => {
                        if (item.mediaType === 'V') {
                            res1[0].questionVpath.push(item.mediaPath);
                        }
                    });
                    let questionList = defaultFormat({ ...res1[0] });
                    this.questionDetail = {
                        stemTitle: questionList.stemTitle,
                        type: questionList.type,
                        questionList: [],
                        number: res1[0].questionSeq,
                        analysisYiGuanData: {
                            page_name: this.isList ? '我的答疑列表' : '我的答疑-问题详情',
                            project_name: res1[0].projectName,
                            subject_name: res1[0].subjectName,
                        },
                        ...questionList,
                        ...{ showParseImmediately: true, notShowUserAnswer: false, parseonly: true },
                    };
                    if (
                        res1[0].questionStemType === 'L' ||
                        res1[0].questionStemType === 'A' ||
                        res1[0].questionStemType === 'C' ||
                        res1[0].questionStemType === 'CF' ||
                        res1[0].questionStemType === 'BC'
                    ) {
                        this.questionDetail.questionList.push({
                            ...questionList,
                            ...{ showParseImmediately: true, notShowUserAnswer: false, parseonly: true, number: 1 },
                            analysisYiGuanData: {
                                page_name: this.isList ? '我的答疑列表' : '我的答疑-问题详情',
                                project_name: res1[0].projectName,
                                subject_name: res1[0].subjectName,
                            },
                        });
                    } else {
                        this.questionDetail.stemId = '  ';
                        this.questionDetail.number = 1;
                    }
                })
                .catch((error) => {
                    if (typeof error === 'object') {
                        this.$niceloo.api.handleFailure(error);
                    } else {
                        this.$baseUI.alert('试卷不存在');
                    }
                });
        },
        getQuestionMsg() {
            return new Promise((resolve, reject) => {
                //qa/web/question/paper/get
                this.$callApi('cc/question-msg', {
                    questionId: this.questionId, // 问题标识
                    onsuccess: (res) => {
                        resolve(res);
                    },
                    onerror: (error) => {
                        reject(error);
                    },
                    oncomplete: () => {},
                });
            });
        },
        getQuestionDetail(res) {
            return new Promise((resolve, reject) => {
                //qb/business/support/question-answer/question-information
                this.$callApi('qb/question-information', {
                    questionId: res.testQuestionsId, // 试题标识
                    questionStemId: res.majorQuestionsId, // ||大题标识
                    answerSheetId: res.answerSheetId, //答卷标识
                    onsuccess: (res1) => {
                        console.log(res1);
                        resolve(res1);
                    },
                    onerror: (error) => {
                        reject(error);
                    },
                    oncomplete: () => {},
                });
            });
        },
        buryingPoint(projectName, subjectName) {
            this.$yiguan.learningCenter(this.isList ? 'web_answer_questions_list_look_question' : 'web_answer_questions_detail_look_question', {
                college_name: '',
                page_name: this.isList ? '我的答疑列表' : '我的答疑-问题详情',
                project_name: projectName,
                subject_name: subjectName,
            });
        },
    },
};
</script>

<style scoped lang="less">
.right .item .ques .look-question {
    background-color: #ffece8;
    width: 128px;
    height: 28px;
    font-size: 14px;
    text-align: center;
    color: #ff2e30;
    line-height: 28px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    margin-top: 27px;
    margin-left: -30px;
    cursor: pointer;
    display: inline-block;
    &:after {
        content: '';
        background: url('./asset/images/fold.png') no-repeat;
        background-size: 100%;
        width: 10px;
        height: 10px;
        display: inline-block;
    }
}
.look-question-fold {
    &:after {
        transform: rotate(180deg);
    }
}
/deep/.question-analysis .answer-statistics {
    display: none !important;
}
/deep/.btn-box {
    display: none !important;
}
/deep/.knowledge-explain {
    display: none;
}
/deep/.question-footer {
    display: none !important;
}
/deep/.video-content .test {
    display: none !important;
}

/deep/.question-analysis1 .answer-basic .answer-student {
    display: none !important;
}
/deep/ .question-analysis1 .study-answer-opinion {
    display: none !important;
}
</style>
