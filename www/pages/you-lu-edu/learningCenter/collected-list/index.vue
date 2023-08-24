<template>
    <div class="collect-book-box" :class="{ 'question-bank-class': questionBankStatus }">
        <CollectErrorHeader :is-error="false" @handle-subject="handleSubject" @reset-data="resetData" />
        <div v-loading="loading" loading-background="#fff" class="favorites-box">
            <div v-if="list.length && !loading">
                <div class="column-item label-column">
                    <div class="column-left">
                        <p class="label">题型</p>
                        <p class="label">收藏数量</p>
                    </div>
                    <div class="operation">
                        <p class="label">操作</p>
                    </div>
                </div>
                <div v-for="(item, index) in list" :key="index" class="column-item">
                    <div class="column-left">
                        <p class="value">{{ item.questionTypeName }}</p>
                        <p class="value">{{ `共收藏${item.questionTotal}道试题` }}</p>
                    </div>
                    <div class="operation">
                        <div class="analysis-btn" @click="openPage(item)">查看解析</div>
                        <div class="doing-btn" @click="paperGenerate(item.questionType)">重新做题</div>
                    </div>
                </div>
            </div>
            <Empty v-if="list.length == 0 && !loading" text="暂无收藏夹记录" />
        </div>
    </div>
</template>

<script>
import CollectErrorHeader from '@/www/components/learningCenter/collect-error-header';
import Empty from '@/www/pages/you-lu-edu/exam/exam-list/components/empty';
import '@/api/qb/api.QB6006.query-collect-questiontype-list.js';
import '@/api/qb/api.QB0015.query-paper-generate.js';

export default {
    components: {
        CollectErrorHeader,
        Empty,
    },
    data() {
        return {
            loading: true,
            projectName: '', // 项目名称
            projectId: '', // 项目id
            classUniquecode: '',
            subjectName: '', // 科目名称
            subjectId: '',
            list: [],
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus === 'special';
        },
    },
    methods: {
        // 重置list为空
        resetData() {
            this.list = [];
        },
        // 查看解析
        openPage(item) {
            this.setYGData('web_learning_center_all_parse');
            this.$PageUtil.openNewPage(
                `/learningCenter/test-question/analysis/SCLX/${this.classUniquecode}/${this.subjectId}/${item.questionType}?projectName=${this.projectName}&subjectName=${this.subjectName}&projectId=${this.projectId}`
            );
        },
        // 重新做题
        paperGenerate(questionType) {
            niceloo.api.call('qb/query-paper-generate', {
                subjectId: this.subjectId,
                papertypeCode: 'SCLX',
                questionType,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    var paperId = res.paperId;
                    // console.log(paperId);
                    this.setYGData('web_learning_center_begin_exercises');
                    this.$router.push(
                        `/learningCenter/do-question-test/SCLX/${this.classUniquecode}/${this.subjectId}/${paperId}?projectName=${this.projectName}&subjectName=${this.subjectName}&projectId=${this.projectId}`
                    );
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 选择科目回调
        handleSubject(item) {
            this.subjectId = item.subjectId;
            this.classUniquecode = item.classUniquecode;
            this.projectId = item.projectId;
            this.projectName = item.projectName;
            this.subjectName = item.subjectName;
            this.getData();
        },
        setYGData(functionName) {
            this.$yiguan.learningCenter(functionName, {
                page_name: '收藏夹',
                college_name: '',
                project_name: this.projectName,
                subject_name: this.subjectName,
            });
        },
        getData() {
            this.loading = true;
            niceloo.api.call('qb/query-collect-questiontype-list', {
                subjectId: this.subjectId,
                sectionId: null,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    // console.log(res);
                    if (res == null || res.length == 0) {
                        this.list = [];
                    } else {
                        for (var i = 0; i < res.length; i++) {
                            var item = res[i];
                            var questionType = item.M
                                ? 'M'
                                : item.J
                                ? 'J'
                                : item.S
                                ? 'S'
                                : item.O
                                ? 'O'
                                : item.F
                                ? 'F'
                                : item.A
                                ? 'A'
                                : item.I
                                ? 'I'
                                : item.BC
                                ? 'BC'
                                : 'C';
                            const questionTypeNameMap = {
                                S: '单选题',
                                M: '多选题',
                                J: '判断题',
                                O: '简答题',
                                A: '材料分析题',
                                F: '填空题',
                                I: '不定项选择题',
                                C: '配伍题',
                                BC: '选词填空题',
                            };
                            res[i] = {
                                questionType,
                                questionTypeName: questionTypeNameMap[questionType],
                                questionTotal: item[questionType],
                            };
                        }
                        res.sort(function (a, b) {
                            var arr = ['S', 'M', 'J', 'O', 'A', 'F', 'I', 'C', 'BC'];
                            return arr.indexOf(a.questionType) - arr.indexOf(b.questionType);
                        });
                        this.list = res;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                    // 专项小题库-“我的题库”tab标签切换回调
                    this.$emit('apiCallBack');
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.collect-book-box {
    margin: 24px 0;
    .favorites-box {
        margin-top: 16px;
        min-height: 500px;
        border-radius: 6px;
        background: #fff;
        .column-item {
            box-sizing: border-box;
            margin-left: 50px;
            margin-right: 60px;
            height: 71px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f1f3f5;
            .column-left {
                display: flex;
                align-items: center;
                .value {
                    width: 250px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #3a3d4b;
                    line-height: 24px;
                }
            }
            .operation {
                display: flex;
                align-items: center;
                .analysis-btn {
                    margin-right: 16px;
                    width: 70px;
                    height: 26px;
                    line-height: 26px;
                    font-size: 12px;
                    font-weight: 400;
                    text-align: center;
                    color: #ff2e30;
                    border-radius: 13px;
                    background: #ffece8;
                    cursor: pointer;
                }
                .doing-btn {
                    width: 70px;
                    height: 26px;
                    font-size: 12px;
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    line-height: 26px;
                    background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
                    border-radius: 13px;
                    cursor: pointer;
                }
            }
            &.label-column {
                margin: 0;
                padding-left: 50px;
                padding-right: 60px;
                height: 69px;
                border-bottom: 1px solid #f1f3f5;
                .label {
                    width: 250px;
                    font-size: 16px;
                    font-weight: 700;
                    color: #3a3d4b;
                    line-height: 69px;
                }
                .operation {
                    .label {
                        padding-right: 20px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
.question-bank-class {
    margin: 0;
    .favorites-box {
        margin-top: 0;
        &.label-column {
            margin-top: 28px;
            padding: 0px 60px 30px 50px;
            box-sizing: content-box;
            height: 16px;
            .operation {
                .label {
                    padding-right: 20px;
                    text-align: right;
                    padding-right: 26px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>
