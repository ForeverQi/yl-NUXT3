<template>
    <div class="empty-box">
        <img class="error-img" :src="errorData.imgPath" alt="" />
        <div class="error-text">{{ errorData.text }}</div>
        <div v-if="status === 'invalid'" class="back-index" @click="$PageUtil.goHome()">返回首页</div>
    </div>
</template>
<script>
import { errorDataMap } from './data.js';
export default {
    props: {
        status: {
            type: [Number, String],
            default: 'empty',
        },
    },
    data() {
        return {
            errorData: {},
        };
    },
    watch: {
        status: {
            handler() {
                this.queryStatusData();
            },
        },
    },
    created() {
        this.queryStatusData();
    },
    methods: {
        queryStatusData() {
            if (errorDataMap.has(this.status)) {
                this.errorData = errorDataMap.get(this.status);
            } else {
                this.errorData = errorDataMap.get('empty');
            }
        },
    },
};
</script>
<style lang="less" scoped>
.empty-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .error-img {
        width: 260px;
        height: 180px;
        margin-bottom: 14px;
    }
    .error-text {
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 19px;
    }
    .back-index {
        margin-top: 40px;
        width: 136px;
        height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;
    }
}
</style>
