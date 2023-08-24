<template>
    <div class="card-box">
        <div class="error-all" :class="{ 'special-question_analysis': questionBankStatus }">
            <div class="error" :class="{ active: active === 'error' }" @click="clickTab('error')">错题解析</div>
            <div class="spe-height"></div>
            <div class="all" :class="{ active: active === 'all' }" @click="clickTab('all')">全部解析</div>
        </div>
        <div class="report" v-if="!questionBankStatus" :class="{ active: active === 'report' }" @click="clickTab('report')">测评报告</div>
    </div>
</template>

<script>
export default {
    props: {
        // 当前选中的tab,支持.sync
        active: {
            type: String,
            default: '',
        },
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
        clickTab(key) {
            if (key === this.active) {
                return;
            }
            this.$emit('update:active', key);
            this.$emit('change', key);
        },
    },
};
</script>

<style lang="less" scoped>
.card-box {
    display: flex;
    justify-content: space-between;
}
.spe-height {
    width: 2px;
    height: 14px;
    background: #d8d8d8;
    border-radius: 2px;
    flex-shrink: 0;
}
.error-all {
    box-sizing: border-box;
    width: 202px;
    height: 47px;
    padding: 16px 16px 16px 15px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    color: #3a3d4b;
    .error,
    .all {
        text-align: center;
        cursor: pointer;
    }
    .error.active,
    .all.active {
        color: #ff2e30;
        font-weight: 700;
    }
    .error {
        margin-right: 20px;
    }
    .all {
        margin-left: 20px;
    }
    margin-right: 10px;
}
.report {
    width: 118px;
    height: 47px;
    background: #ffffff;
    border-radius: 4px;
    line-height: 47px;
    text-align: center;
    cursor: pointer;
    color: #3a3d4b;
    &.active {
        color: #ff2e30;
        background: #ffece8;
    }
}

.special-question_analysis {
    width: 100%;
    margin-right: 0;
    .error,
    .all {
        flex: 1;
    }
}
</style>
