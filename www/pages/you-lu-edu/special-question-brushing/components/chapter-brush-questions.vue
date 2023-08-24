<!--
 * @Author       : zhouqi
 * @description  : 章节刷题
 * @Date         : 2023-07-06 14:49:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-12 18:06:27
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\components\chapter-brush-questions.vue
-->
<template>
    <div class="chapter-brush-questions">
        <div class="chapter-box">
            <div class="chapter-title">章节刷题</div>
            <div class="chapter-content">
                <!-- 表头 -->
                <div class="chapter-header">
                    <div class="header-directory">目录</div>
                    <div class="header-progress">做题进度</div>
                    <div class="header-accuracy">正确率</div>
                    <div class="header-operate">操作</div>
                </div>
                <!-- 树形结构数据 -->
                <div class="chapter-tree">
                    <QuestionsTree :tree-data="item" v-for="(item, index) in treeData" :key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionsTree from './questions-tree.vue';
import '@/api/qb/api..query-profession-bank-section-tree.js';
export default {
    components: {
        QuestionsTree,
    },
    props: {
        treeData: {
            type: Array,
            default: () => [],
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {};
    },
    /**
     * mounted 生命周期
     */
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.chapter-brush-questions {
    width: 852px;
    min-height: 200px;
    background: #ffffff;
    border-radius: 8px;
    padding: 24px 0 44px;
    .chapter-title {
        padding: 0 24px;
        font-size: 18px;
        color: #3a3d4b;
        font-weight: 700;
        margin-bottom: 24px;
    }
    .chapter-header {
        display: flex;
        height: 38px;
        background-color: #f9fafb;
        color: #77798d;
        margin: 0 40px;
        box-sizing: border-box;
        .header-directory {
            width: 472px;
            height: 38px;
            font-size: 14px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .header-progress,
        .header-accuracy,
        .header-operate {
            width: 100px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .chapter-tree {
        padding-right: 40px;
        box-sizing: border-box;
    }
}
</style>
