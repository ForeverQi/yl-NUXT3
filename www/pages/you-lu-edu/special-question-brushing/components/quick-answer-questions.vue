<!--
 * @Author       : zhouqi
 * @description  : 快速刷题
 * @Date         : 2023-07-06 14:49:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-15 15:22:12
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\components\quick-answer-questions.vue
-->
<template>
    <div class="quick-answer-Questions">
        <div class="questions-content">
            <div class="questions-title">快速刷题</div>
            <div class="questions-card">
                <div class="card-child card1" @click="questionFun(1)">
                    <div class="card-child_top card-child_tip">随机练习</div>
                    <div class="card-child_center">随机抽题快速练习</div>
                    <div class="card-child_bottom">
                        <img src="../asset/images/rightAllow.png" />
                    </div>
                </div>
                <div class="card-child card2" @click="questionFun(2)">
                    <div class="card-child_top card-child_tip">顺序刷题</div>
                    <div class="card-child_center" v-if="brushData">{{ brushData.answerTotal }}/{{ brushData.total }}题</div>
                    <div class="card-child_bottom">
                        <img src="../asset/images/rightAllow.png" />
                    </div>
                </div>
                <div class="card-child card3" @click="questionFun(3)">
                    <div class="card-child_top card-child_tip">查看解析</div>
                    <div class="card-child_center">查看试题答案和解析</div>
                    <div class="card-child_bottom">
                        <img src="../asset/images/rightAllow.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dataMixin from '../mixins/dataMixin.js';
import '@/api/qb/api..query-profession-bank-answer-remove.js'; //专项题库清空答题记录
export default {
    mixins: [dataMixin],
    props: {
        // 基本信息数据
        questionInfo: {
            type: Object,
            default: () => ({}),
        },
        // 专项题库用户统计
        brushData: {
            type: Object,
            default: () => ({}),
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {};
    },
    watch: {
        questionInfo: {
            /**
             *
             * @param {object} newValue 新值
             */
            handler(newValue) {
                if (newValue) {
                    this.projectId = newValue.projectId;
                }
            },
            deep: true,
        },
    },
    methods: {
        /**
         * 快速刷题类型切换
         *
         * @param {number} type 1: 随机练习; 2: 顺序刷题; 3: 查看解析
         */
        async questionFun(type) {
            let url = `subjectId=${this.$route.query.subjectId}&projectId=${this.questionInfo.projectId}&sourceType=${this.$route.query.sourceType}&projectCode=${this.questionInfo.classUniqueCode}&questionBankStatus=special`;

            // 学习中心下的题库详情需要鉴权
            let errNum = 0;
            // 判断改试题是否被删除
            try {
                await this.getProfessionBankInfo().catch((error) => {
                    const errorMsg = error.getAttachedData().getMsg();
                    if (error.getAttachedData().getData().code === '40013') {
                        errNum++;
                        this.$baseUI
                            .alert(errorMsg, '提示', {
                                confirmText: '知道了',
                            })
                            .then(() => {
                                this.$PageUtil.href('/');
                            });
                    }
                });
            } catch (err) {
                console.log(err);
            }
            if (this.$route.query.sourceType === 'YOULU.STUDY') {
                url += `&classId=${this.$route.query.classId}&ctapId=${this.$route.query.ctapId}&className=${this.questionInfo.className}`;
                // 判断改试题是否被删除
                try {
                    if (errNum > 0) return false;
                    // 鉴权接口
                    await this.commonAuthorLearnCenter().then((data) => {
                        if (data === false) {
                            errNum++;
                            this.$baseUI
                                .alert('您没有该题库的做题权限', '提示', {
                                    confirmText: '知道了',
                                })
                                .then(() => {
                                    this.$PageUtil.href('/');
                                });
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            if (errNum > 0) return false;
            switch (type) {
                case 1:
                    this.randomExercise(url);
                    break;
                case 2:
                    this.rePractice(url);
                    break;
                case 3:
                    url = `/svip-exam/${this.$route.params.professionBankId}/analysis?${url}&answerType=A`;
                    this.$PageUtil.href(url);
                    break;
            }
        },
        /**
         * 随机练习相关操作
         *
         * @param {string} url 做题页的url
         */
        randomExercise(url) {
            const questionNum = this.brushData.total - this.brushData.answerTotal;
            const newUrl = `/svip-exam/${this.$route.params.professionBankId}/test?${url}&answerType=R`;
            if (questionNum > 0 && questionNum < 20) {
                this.$baseUI.confirm({
                    title: '随机练习提示',
                    content: '您的未做试题已不足20道，本次将抽取全部未做题',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    /**
                     * 点击"确定"的回调函数
                     */
                    confirm: () => {
                        this.$PageUtil.href(newUrl);
                    },
                });
            } else if (questionNum === 0) {
                this.rePracticeModel(url, 'R');
            } else {
                this.$PageUtil.href(newUrl);
            }
        },
        /**
         * 顺序刷题相关操作
         *
         *  @param {string} url 做题页的url
         */
        rePractice(url) {
            if (this.brushData.total <= this.brushData.answerTotal) {
                this.rePracticeModel(url, 'A');
            } else {
                url = `/svip-exam/${this.$route.params.professionBankId}/test?${url}&answerType=A`;
                this.$PageUtil.href(url);
            }
        },
        /**
         * 重新练习弹窗
         *
         * @param {string} url 做题页的url
         * @param {string} type 试题类型：R:随机，A:顺序
         */
        rePracticeModel(url, type) {
            this.$baseUI.confirm({
                title: '重新练习提示',
                content: '该题库下全部试题已练习完毕，是否清空练习记录重新开始？清空后刷题统计也将重置',
                showCancel: true,
                cancelText: '是，清空重做',
                confirmText: '不，查看解析',
                separateStatus: true,
                /**
                 * 点击“不，查看解析”的回调函数
                 * 点击后打开「试题解析」页，默认查看【全部解析】，并自动定位至第1题
                 */
                confirm: () => {
                    url = `/svip-exam/${this.$route.params.professionBankId}/analysis?${url}`;
                    this.$PageUtil.href(url);
                },
                /**
                 * 点击“是，清空重做”的回调函数
                 * 清空该题库/该章节下试题的练习记录，跳转至「做题页」，自动定位至第一题
                 */
                separateCancel: () => {
                    url = `/svip-exam/${this.$route.params.professionBankId}/test?${url}&answerType=${type}`;
                    this.clearTestQuestions(url);
                },
            });
        },
        /**
         * 跳转试题解析页
         *
         * @param {string} url 解析页的url
         */
        questionsAnalysis(url) {
            this.$PageUtil.href(url);
        },
        /**
         * 清空答题记录
         *
         * @param {string} url 做题页url
         */
        clearTestQuestions(url) {
            niceloo.api.call('qb/query-profession-bank-answer-remove', {
                // 专项题库标识
                professionBankId: this.$route.params.professionBankId,
                // 答题类型(A:全部;S:章节;R:随机)
                answerType: 'A',
                // 章节标识
                sectionId: '',
                // 试题标识列表;
                questionIds: [],
                // 数据来源类型
                sourceType: this.$route.query.sourceType,
                // 数据来源标识
                sourceId: this.$route.query.classId ?? '',
                onsuccess: () => {
                    this.$PageUtil.href(url);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.quick-answer-Questions {
    width: 100%;
    padding: 24px 0;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 16px;
    .questions-content {
        width: 100%;
        overflow: hidden;
    }
    .questions-title {
        color: #3a3d4b;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 24px;
        padding: 0 24px;
    }
    .questions-card {
        display: flex;
        justify-content: center;
    }
    .card-child {
        width: 240px;
        height: 96px;
        box-sizing: border-box;
        padding: 15px 38px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 20px;
        cursor: pointer;
    }
    .card1 {
        background: url('../asset/images/practice1.png') 100% 100% no-repeat;
        background-size: cover;
    }
    .card2 {
        background: url('../asset/images/practice2.png') 100% 100% no-repeat;
        background-size: cover;
    }
    .card3 {
        background: url('../asset/images/practice3.png') 100% 100% no-repeat;
        background-size: cover;
    }
    .card-child_top {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 5px;
    }
    .card-child_center {
        font-size: 12px;
        opacity: 0.7;
        color: #ffffff;
        margin-bottom: 6px;
    }
    .card-child_bottom {
        img {
            width: 22px;
            height: 13px;
        }
    }
    .card-child_tip {
        position: relative;
        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -12px;
            width: 3px;
            height: 14px;
            background: #ffffff;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
}
</style>
