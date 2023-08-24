<template>
    <div class="error-book-box">
        <CollectErrorHeader :is-error="true" @handle-subject="handleSubject" @reset-data="resetData" />
        <div v-loading="loading" loading-background="#fff" class="question-type" :class="{ 'question-bank-class': questionBankStatus }">
            <div class="remove-box">
                <p class="remove-title">错题自动移除方式：</p>
                <div class="error-select select-box" @click="openOption">
                    <div class="error-select select-text">{{ removeCount[selectRemoveCount] }}</div>
                    <img class="error-select bottom" :class="{ active: showOption }" src="../asset/images/bottom2.png" alt="" />
                    <ul class="error-select options" ref="options" :class="{ active: showOption }">
                        <li v-for="(val, key, index) in removeCount" :key="index" class="error-select option-item" @click.stop="handleOption(key)">
                            <img v-if="selectRemoveCount == key" class="error-select img" src="../asset/images/remove_select2.png" alt="" />
                            <img v-else class="error-select img" src="../asset/images/remove_select.png" alt="" />
                            <p class="error-select text">{{ val }}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="list.length && !loading">
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
                        <p class="value">{{ `共有${item.questionTotal}道错题` }}</p>
                    </div>
                    <div class="operation">
                        <div class="analysis-btn" @click="openPage(item)">查看解析</div>
                        <div class="doing-btn" @click="paperGenerate(item.questionType)">重新做题</div>
                    </div>
                </div>
            </div>
            <Empty v-if="list.length === 0 && !loading" text="暂无错题本记录" />
        </div>
    </div>
</template>

<script>
import CollectErrorHeader from '@/www/components/learningCenter/collect-error-header';
import Empty from '@/www/pages/you-lu-edu/exam/exam-list/components/empty';
import '@/api/qb/api.QB3003.query-errorquestion-questiontype-list.js';
import '@/api/qb/api.QB0015.query-paper-generate.js';
import '@/api/qb/api.QB9018.errorconfig-user-info.js';
import '@/api/qb/api.QB9017.errorconfig-user-save.js';
export default {
    components: {
        CollectErrorHeader,
        Empty,
    },
    data() {
        return {
            loading: true,
            showOption: false, // 打开项目下拉框
            selectRemoveCount: 0, // 自动移除次数
            projectName: '', // 项目名称
            projectId: '',
            classUniquecode: '',
            subjectName: '', // 科目名称
            subjectId: '',
            list: [],
            removeCount: {
                0: '不自动移除',
                1: '做对1次',
                2: '做对2次',
                3: '做对3次',
            },
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
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.errorConfig();
            document.addEventListener('click', (e) => {
                var classNames = e.target.className.split(' ');
                if (classNames.indexOf('error-select') === -1 && this.$refs.options) {
                    this.showOption = false;
                }
            });
        },
        openOption() {
            this.showOption = !this.showOption;
        },
        handleOption(key) {
            // console.log(key);
            this.selectRemoveCount = key;
            this.showOption = !this.showOption;
            this.setRrrorConfig();
        },
        // 重置list为空
        resetData() {
            this.list = [];
        },
        // 查询用户错题本错题答对次数
        errorConfig() {
            niceloo.api.call('qb/errorconfig-user-info', {
                sourcetype: $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    // console.log(res);
                    this.selectRemoveCount = res.errorUserConfigValue;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    // 专项小题库-“我的题库”tab标签切换回调
                    this.$emit('apiCallBack');
                },
            });
        },
        // 设置用户错题本错题答对次数
        setRrrorConfig() {
            niceloo.api.call('qb/errorconfig-user-save', {
                errorUserConfigValue: this.selectRemoveCount,
                sourcetype: $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    // console.log(res);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 查看解析
        openPage(item) {
            this.setYGData('web_learning_center_all_parse');
            this.$PageUtil.openNewPage(
                `/learningCenter/test-question/analysis/CTB/${this.classUniquecode}/${this.subjectId}/${item.questionType}?projectName=${this.projectName}&subjectName=${this.subjectName}&projectId=${this.projectId}`
            );
        },
        // 重新做题
        paperGenerate(questionType) {
            niceloo.api.call('qb/query-paper-generate', {
                subjectId: this.subjectId,
                papertypeCode: 'CTB',
                questionType,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    var paperId = res.paperId;
                    // console.log(paperId);
                    this.setYGData('web_learning_center_begin_exercises');
                    this.$router.push(
                        `/learningCenter/do-question-test/CTB/${this.classUniquecode}/${this.subjectId}/${paperId}?projectName=${this.projectName}&subjectName=${this.subjectName}&projectId=${this.projectId}`
                    );
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 选择科目回调
        handleSubject(item) {
            // console.log(item);
            this.subjectId = item.subjectId;
            this.classUniquecode = item.classUniquecode;
            this.projectName = item.projectName;
            this.subjectName = item.subjectName;
            this.projectId = item.projectId;
            this.getData();
        },
        setYGData(functionName) {
            this.$yiguan.learningCenter(functionName, {
                page_name: '错题本',
                college_name: '',
                project_name: this.projectName,
                subject_name: this.subjectName,
            });
        },
        getData() {
            this.loading = true;
            niceloo.api.call('qb/query-errorquestion-questiontype-list', {
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
                    // console.log(this.list);
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
.error-book-box {
    margin: 24px 0;
    .question-type {
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
    .remove-box {
        padding-top: 16px;
        padding-left: 50px;
        display: flex;
        align-items: center;
        .remove-title {
            font-size: 12px;
            font-weight: 400;
            color: #99a1af;
            line-height: 14px;
        }
    }
    .select-box {
        margin-left: 12px;
        padding: 0 16px;
        position: relative;
        width: 202px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f6f7fb;
        border-radius: 4px;
        cursor: pointer;
        .select-text {
            height: 32px;
            font-size: 12px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 32px;
        }
        .bottom {
            width: 12px;
            height: 12px;
            transition: all 0.3s;
            transform: rotate(0);
            &.active {
                transform: rotate(180deg);
                transition: all 0.3s;
            }
        }
        .options {
            position: absolute;
            left: 0;
            top: 32px;
            right: 0;
            margin: 0;
            margin-top: 8px;
            padding: 0;
            height: 0;
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            border: 0px solid #e4e7ed;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            transition: all 0.3s;
            z-index: 10;
            .option-item {
                font-size: 14px;
                padding: 0 20px;
                position: relative;
                display: flex;
                align-items: center;
                color: #606266;
                height: 34px;
                line-height: 34px;
                box-sizing: border-box;
                cursor: pointer;
                .img {
                    margin-right: 10px;
                    width: 12px;
                    height: 12px;
                }
                .text {
                    font-size: 12px;
                    font-weight: 400;
                    color: #3a3d4b;
                    line-height: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &.active {
                    color: rgb(255, 46, 48);
                }
                &:hover {
                    background-color: #f5f7fa;
                }
                &.none {
                    text-align: center;
                }
            }
            &.active {
                padding: 5px 0px;
                height: 136px;
                border: 1px solid #e4e7ed;
                transition: all 0.3s;
            }
        }
    }
    .question-bank-class {
        .question-type {
            &.label-column {
                padding-left: 50px;
                padding-right: 0;

                .operation {
                    .label {
                        padding-right: 80px;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .remove-box {
            padding-left: 28px;
            padding-top: 0;
        }
    }
}
</style>
