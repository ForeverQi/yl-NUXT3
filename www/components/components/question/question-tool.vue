<template>
    <div class="tool-wrap">
        <div class="item calculator" @click.self="showCalculator = !showCalculator">
            <img class="item-img" src="./asset/images/calculator-ico.png" />
            计算器
            <question-calculator :show="showCalculator" class="question-calculator" />
        </div>
        <div class="spe-height" v-if="showDictionary"></div>
        <!-- <div class="item doctor" v-if="showPoint" @click="$emit('goUnderstand')">考点秒懂</div> -->
        <div class="item book" v-if="showDictionary" @click="$emit('showDict')">
            <img class="item-img" src="./asset/images/book-ico.png" />
            词点快查
        </div>
    </div>
</template>

<script>
import QuestionCalculator from '../calculator/index.vue';
import '@/api/bd/api..query-show-dict-status.js';

export default {
    components: {
        QuestionCalculator,
    },
    props: {
        showPoint: {
            type: Boolean,
            default: false,
        }, // 是否展示考点秒懂
        showDictionary: {
            type: Boolean,
            default: false,
        }, // 是否展示词点快查
    },
    data() {
        return {
            showCalculator: false,
            showDict: false,
        };
    },
    watch: {
        showCalculator(val) {
            val && this.$emit('clickCalculator');
        },
    },
};
</script>

<style lang="less" scoped>
.tool-wrap {
    padding: 16px 31px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    // justify-content: space-between;

    .item {
        flex: 1;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #3a3d4b;
        line-height: 14px;
        background-repeat: no-repeat;
        background-size: 14px 14px;
        background-position: 0 center;
        position: relative;
        cursor: pointer;
        // &.doctor {
        //     margin-right: 30px;
        //     background-image: url('./asset/images/doctor-ico.png');
        // }

        .item-img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }
    }
    .spe-height {
        width: 2px;
        height: 14px;
        background: #d8d8d8;
        border-radius: 2px;
        flex-shrink: 0;
    }
}

.question-calculator {
    top: 30px;
    left: 0;
    z-index: 20;
}
</style>
