<template>
    <div v-loading="loading" loading-background="#fff" class="question-type">
        <div v-if="list.length">
            <div class="column-item label-column">
                <div class="column-left">
                    <p class="label">题型</p>
                    <p class="label">错题数量</p>
                </div>
                <div class="operation">
                    <p class="label">操作</p>
                </div>
            </div>
            <div v-for="(item, index) in list" :key="index" class="column-item">
                <div class="column-left">
                    <p class="value">{{ item.questionTypeName }}</p>
                    <p class="value">{{ `${item.questionTotal}道` }}</p>
                </div>
                <div class="operation">
                    <div class="analysis-btn" @click="openPage(item)">查看解析</div>
                    <div class="doing-btn" @click="paperGenerate(item.questionType)">重新做题</div>
                </div>
            </div>
        </div>
        <Empty v-else text="暂无错题本记录" />
    </div>
</template>

<script>
import Empty from '../../../exam-list/components/empty';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api.QB3003.query-errorquestion-questiontype-list.js';
import '@/api/qb/api.QB0015.query-paper-generate.js';

export default {
    components: {
        Empty,
    },
    mixins: [track],
    props: {
        classUniquecode: {
            type: String,
            default: '',
        },
        subjectId: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: false,
            isData: false, // 是否有数据展示按钮
            list: [],
        };
    },
    mounted() {
        console.log(this.subjectId);
        this.getData();
    },
    methods: {
        // 查看解析
        openPage(item) {
            this.$PageUtil.openNewPage(`/member/parse/CTB/${this.classUniquecode}/${this.subjectId}/${item.questionType}?projectId=${this.projectId}`);
        },
        // 重新做题
        paperGenerate(questionType) {
            niceloo.api.call('qb/query-paper-generate', {
                subjectId: this.subjectId,
                papertypeCode: 'CTB',
                questionType,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    var paperId = res.paperId;
                    console.log(paperId);
                    this.$PageUtil.href(`/member/ks/new/${this.classUniquecode}/${this.subjectId}/${paperId}?flag=CTBKS&questionType=${questionType}`);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getData() {
            this.loading = true;
            niceloo.api.call('qb/query-errorquestion-questiontype-list', {
                subjectId: this.subjectId,
                sectionId: null,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
                    if (res == null || res.length == 0) {
                        this.isData = false;
                        this.list = [];
                    } else {
                        this.isData = true;
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
                    console.log(this.list);
                    this.$emit('show-btn', this.isData);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.question-type {
    margin-top: 20px;
    min-height: 500px;
    .column-item {
        box-sizing: border-box;
        padding-left: 20px;
        height: 80px;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        .column-left {
            display: flex;
            align-items: center;
            .value {
                width: 150px;
                line-height: 80px;
                font-size: 14px;
                font-weight: 400;
                color: #3a3d4b;
                letter-spacing: 0.58px;
            }
        }
        .operation {
            display: flex;
            align-items: center;
            .analysis-btn {
                margin-right: 20px;
                width: 96px;
                height: 39px;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #3a3d4b;
                line-height: 39px;
                background: #ffffff;
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 20px;
                cursor: pointer;
            }
            .doing-btn {
                width: 96px;
                height: 39px;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
                line-height: 39px;
                background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                border-radius: 20px;
                cursor: pointer;
            }
        }
        &.label-column {
            height: 38px;
            background: #f9fafb;
            .label {
                width: 150px;
                font-size: 14px;
                font-weight: 400;
                color: #77798d;
                line-height: 38px;
                letter-spacing: 0.58px;
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
</style>
