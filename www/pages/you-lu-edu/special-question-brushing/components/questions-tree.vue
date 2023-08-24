<template>
    <div class="tree-component">
        <div class="tree-component-content" :class="{ childTreeBox: !isChildren }">
            <div class="tree-box" :class="{ childTree: isChildren }">
                <!-- 目录 -->
                <div class="tree-directory" @click="changeShowStatus">
                    <div class="tree-directory_img" v-if="!isChildren">
                        <img :src="arrowImgRul" v-if="childListStatus" />
                    </div>
                    <span>{{ treeData.sectionName }}</span>
                </div>
                <!-- 做题进度 -->
                <div class="tree-progress">
                    <span>{{ treeData.answerTotal }}/{{ treeData.questionTotal }}道</span>
                </div>
                <!-- 正确率 -->
                <div class="tree-accuracy">
                    <span>{{ treeData.rightRate }}%</span>
                </div>
                <!-- 操作 -->
                <div class="tree-operate" @click="brushOperate">
                    <img src="../asset/images/questionOperate.png" />
                </div>
            </div>
            <template v-if="childListStatus">
                <div class="tree-children-box" v-show="ifShowQuestion">
                    <QuestionsTree v-for="item in treeData.childList" :key="item.sectionId" :tree-data="item" :is-children="true" />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import dataMixin from '../mixins/dataMixin.js';
export default {
    name: 'QuestionsTree',
    mixins: [dataMixin],
    inject: ['questionCompile'],
    props: {
        // 树形数据
        treeData: {
            type: Object,
            default: () => ({}),
        },
        /**
         * @returns {boolean} 是否是子树数据  true -是; false-不是
         */
        isChildren: {
            type: Boolean,
            default: false,
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            /**
             * @returns { boolean } 是否显示子树数据，true - 显示；false - 不显示
             */
            ifShowQuestion: false,
        };
    },
    computed: {
        /**
         * @returns {string} 根据子树的显示状态返回相应的上下箭头图片
         */
        arrowImgRul() {
            let url = '';
            if (this.ifShowQuestion) {
                url = require('../asset/images/up.png');
            } else {
                url = require('../asset/images/down.png');
            }
            return url;
        },
        /**
         * 子树是否有数据
         *
         * @returns {boolean} true: 有数据；false: 无数据
         */
        childListStatus() {
            return this.treeData.childList && this.treeData.childList.length;
        },
    },
    methods: {
        /**
         * 改变子树的显示状态
         */
        changeShowStatus() {
            this.ifShowQuestion = !this.ifShowQuestion;
        },
        /**
         * 操作按钮
         */
        async brushOperate() {
            // 学习中心下的题库详情需要鉴权
            let errNum = 0;
            let url = `subjectId=${this.$route.query.subjectId}&projectId=${this.questionCompile.questionInfo.projectId}&sourceType=${this.$route.query.sourceType}&questionBankStatus=special&answerType=S&sectionId=${this.treeData.sectionId}&projectCode=${this.questionCompile.questionInfo.classUniqueCode}`;
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
                url += `&classId=${this.$route.query.classId}&ctapId=${this.$route.query.ctapId}&className=${this.questionCompile.questionInfo.className}&sourceId=${this.$route.query.classId}`;
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
            if (errNum === 0) {
                if (this.treeData.questionTotal <= this.treeData.answerTotal) {
                    this.$baseUI.confirm({
                        title: '重新练习提示',
                        content: '该章节下试题已练习完毕，是否清空练习记录重新开始？清空后做题进度也将重置',
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
                            url = `/svip-exam/${this.$route.params.professionBankId}/test?${url}`;
                            this.clearTestQuestions(url);
                        },
                    });
                } else {
                    url = `/svip-exam/${this.$route.params.professionBankId}/test?${url}`;
                    this.$PageUtil.href(url);
                }
            }
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
                answerType: 'S',
                // 章节标识
                sectionId: this.treeData.sectionId,
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
.tree-component {
    .tree-box {
        font-size: 14px;
        color: #3a3d4b;
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        height: 68px;
    }

    .tree-directory {
        width: 472px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 20px;
        box-sizing: border-box;

        &:hover {
            color: #ff2e30;
        }
    }

    .tree-directory_img {
        width: 12px;
        height: 12px;
        margin-right: 12px;
        transform: translateY(-2px);

        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

    .tree-progress,
    .tree-accuracy,
    .tree-operate {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            width: 16px;
            height: 16px;
        }
    }

    .childTree {
        height: 52px;
        .tree-directory {
            padding-left: 44px;
            box-sizing: border-box;
        }
    }
    .childTreeBox {
        margin-left: 40px;
    }
}
</style>
