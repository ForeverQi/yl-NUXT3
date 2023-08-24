<template>
    <div class="agree-wrap">
        <div class="agree" @click="handleAgreeClick">
            <i :class="['checkbox', { active: isActive }]"></i>
            <span>我确认已阅读并了解以上信息，且自愿放弃账号内全部数据、权益资产与服务</span>
        </div>
        <button type="button" v-if="!isActive">我已清楚注销账号的风险</button>
        <button type="button" v-else class="active" @click="handleBtnClick">我已清楚注销账号的风险</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        handleAgreeClick() {
            this.isActive = !this.isActive;
        },
        handleBtnClick() {
            this.$emit('on-btn-click');
        },
    },
};
</script>

<style lang="less" scoped>
.agree-wrap {
    .agree {
        width: 460px;
        margin: 0 auto;
        font-size: 12px;
        color: #77798d;
        overflow: hidden;
        cursor: pointer;
        i {
            width: 14px;
            height: 14px;
            background: url('./asset/images/checkbox.png') no-repeat 0 0;
            background-size: 28px 14px;
            float: left;
            margin: 1px 6px 0 0;
            &.active {
                background-position: -14px 0;
            }
        }
        span {
            float: left;
        }
    }
    button {
        width: 280px;
        height: 44px;
        background: #eeeff6;
        border-radius: 22px;
        margin: 20px auto 0;
        border: none;
        cursor: pointer;
        color: #99a1af;
        font-size: 16px;
        transition: all 0.2s;
        &.active {
            background: linear-gradient(90deg, #f8323c, #ff737a 100%);
            color: #fff;
        }
    }
}
</style>
