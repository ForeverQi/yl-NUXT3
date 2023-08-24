<template>
    <div class="question-mode-box">
        <div class="question-mode">
            <div v-if="solvingMode === 'do-exercise' || solvingMode === 'show'">
                <el-switch v-model="analysisValue" active-color="#f8323c" @change="changeAnalysis"></el-switch>
                <span class="mode-analysis">自动查看解析</span>
            </div>
            <div v-if="solvingMode === 'show'">
                <el-switch v-model="automaticValue" active-color="#f8323c" @change="changeAutomatic"></el-switch>
                <span class="mode-analysis">自动跳转下一题</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            analysisValue: true,
            automaticValue: false,
        };
    },
    computed: {
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            let mode = 'show';
            if (this.$route.query.solvingMode) {
                mode = this.$route.query.solvingMode;
            }
            return mode;
        },
        /**
         * 自动跳转下一题  刷题模式下按钮默认选中
         *
         * @returns {string} false: 背题模式; true: 刷题模式
         */
        // automaticValue: {
        //     /**
        //      * getter
        //      *
        //      * @returns {string} false: 背题模式; true: 刷题模式
        //      */
        //     get() {
        //         let value = false;
        //         // 做题模式，“自动跳转下一题”默认选中
        //         if (this.$route.query.solvingMode === 'do-exam') {
        //             value = true;
        //         }
        //         return value;
        //     },
        //     /**
        //      * setter
        //      *
        //      */
        //     set() {},
        // },
    },
    methods: {
        /**
         * 自动跳转下一题 开关
         *
         * @param {boolean} e  true 选择; false 未选中
         */
        changeAutomatic(e) {
            this.$emit('changeAutoNext', e);
            // if (this.$route.query.solvingMode === 'do-exam') {
            //     this.automaticValue = e;
            //     return false;
            // }
            // 跳转下一题 和 查看解析是互斥关系
            if (e) {
                this.analysisValue = !e;
                this.$emit('changeAnalysis', !e);
            }
        },
        /**
         * 自动查看解析 开关
         *
         * @param {boolean} e  true 选择; false 未选中
         */
        changeAnalysis(e) {
            this.$emit('changeAnalysis', e);
            // 跳转下一题 和 查看解析是互斥关系
            if (e) {
                this.automaticValue = !e;
                this.$emit('changeAutoNext', !e);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.question-mode-box {
    ::v-deep .question-mode {
        width: 330px;
        background: #ffffff;
        border-radius: 6px;
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
        color: #3a3d4b;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-switch__core {
            width: 35px !important;
            height: 18px;
            &::after {
                width: 14px;
                height: 14px;
            }
        }
        .el-switch.is-checked .el-switch__core::after {
            margin-left: -15px;
        }
    }
    .mode-analysis {
        margin-left: 2px;
    }
}
</style>
