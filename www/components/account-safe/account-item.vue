<template>
    <div class="account-item-container">
        <div class="account-item-box">
            <div class="account-item-title">{{ title }}</div>
            <div class="account-item-line"></div>
            <div class="account-item-desc">{{ describe }}</div>
        </div>
        <div class="button-text" :class="[type === 'cancelBind' ? 'cancel-bind-button' : '']" @click="handleClick">{{ buttonText }}</div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '账号密码',
        },
        describe: {
            type: String,
            default: '如您需要更改当前账号密码，请点击【修改密码】',
        },
        buttonText: {
            type: String,
            default: '修改密码',
        },
        type: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleClick() {
            this.$emit('sure', this.type);
        },
    },
};
</script>
<style lang="less" scoped>
.account-item-container {
    box-sizing: border-box;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    .account-item-box {
        width: 700px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #e1e5ef;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .account-item-title {
            width: 88px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 14px;
        }
        .account-item-line {
            margin-right: 10px;
            width: 1px;
            height: 12px;
            background: #d9d9d9;
        }
        .account-item-desc {
            font-size: 14px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 14px;
        }
    }
    .button-text {
        width: 90px;
        height: 40px;
        background: linear-gradient(90deg, #ff6870, #f8323c 100%);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .cancel-bind-button {
        background: #ffeaea;
        color: #ff2e30;
    }
}
</style>
