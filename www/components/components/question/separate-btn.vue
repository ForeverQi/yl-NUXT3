<template>
    <div class="separate-btn-box">
        <!-- 目前试题没有显示全部试题的情况 -->
        <div
            v-if="paperSourceType !== 'questionModel' && allCount > 1 && questionBankStatus != 'special' && !solvingMode"
            class="all"
            @click="$emit('click-all')"
        >
            全部试题
        </div>
        <div v-if="questionIndex !== 0" class="next" @click="$emit('click-back')">上一题</div>
        <div v-if="questionIndex !== allCount - 1" class="next" @click="$emit('click-next')">下一题</div>
        <div v-if="paperParsingSource !== 'parsing' && questionIndex === allCount - 1" class="save" @click="$emit('click-save')">提交</div>
    </div>
</template>

<script>
export default {
    props: {
        // 试卷解析解析来源: parsing
        paperParsingSource: {
            type: String,
            default: '',
        },
        allCount: {
            type: Number,
            default: 0,
        },
        questionIndex: {
            type: Number,
            default: 0,
        },
        // 试卷类型: errorBook 错题本 collectBook 收藏夹 questionModel 弹窗做题 空 普通试卷
        paperSourceType: {
            type: String,
            default: '',
        },
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            return this.$route.query.solvingMode;
        },
    },
};
</script>

<style lang="less" scoped>
.separate-btn-box {
    padding: 27px 0 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    user-select: none;
    .save {
        width: 240px;
        height: 40px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        color: #fff;
        line-height: 40px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 20px;
        cursor: pointer;
        margin: 0 27px; // 2022.720修改-Lect
    }
    .all,
    .next {
        margin: 0 27px; // 2022.720修改-Lect
        width: 240px;
        height: 40px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        color: #ff2e30;
        line-height: 40px;
        border: 1px solid #ff0705;
        border-radius: 20px;
        cursor: pointer;
    }
}
</style>
