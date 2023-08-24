<!--
 * @Author       : zhouqi
 * @description  : 题库基本信息
 * @Date         : 2023-07-06 14:49:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-08 09:52:48
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\components\brushing-info.vue
-->
<template>
    <div class="brushing-info-box">
        <div class="brushing-content" v-if="questionInfo">
            <div class="brushing-content_left">
                <img src="@/www/pages/you-lu-edu/exam/assets/img/zxst.png" />
            </div>
            <div class="brushing-content_right">
                <div class="content-top">{{ questionInfo.professionBankName }}</div>
                <div class="content-bottom">
                    <span v-for="(item, index) in questionInfo.questionTypeStats" :key="index">{{ item.questionTypeName }}：{{ item.questionTotal }}道</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 基本信息数据
        questionInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    /**
     *
     * @returns {object} 数据模型
     */
    data() {
        return {
            questionObject: null,
        };
    },
    watch: {
        questionInfo: {
            /**
             *
             * @param {object} newValue 新值
             */
            handler(newValue) {
                if (newValue) {
                    this.questionObject = newValue;
                }
            },
            deep: true,
        },
    },
    /**
     * mounted 生命周期
     */
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.brushing-info-box {
    width: 1200px;
    padding: 24px 40px;
    min-height: 112px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 16px;
    .brushing-content {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .brushing-content_left {
        width: 64px;
        height: 64px;
        margin-right: 16px;
        flex: none;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .brushing-content_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content-top {
        color: #3a3d4b;
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 12px;
    }
    .content-bottom {
        color: #99a1af;
        font-size: 14px;
        span {
            margin-right: 40px;
            display: inline-block;
            line-height: 20px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
