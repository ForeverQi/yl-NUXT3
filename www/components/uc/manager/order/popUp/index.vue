<template>
    <div class="wrap" v-if="isShow">
        <div class="pop-up">
            <div class="warning">!</div>
            <div class="title">{{ title }}</div>
            <div class="des">{{ des }}</div>
            <div class="btn-wrap">
                <div class="cancel" v-if="cancelFlag" @click="cancelFn">{{ cancel }}</div>
                <div class="btn" @click="confirmFn">{{ confirm }}</div>
            </div>
            <div class="close" @click="close">x</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pop-up',
    props: {
        title: {
            type: String,
            default: '',
        },
        des: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
        confirm: {
            type: String,
            default: '确 定',
        },
        cancel: {
            type: String,
            default: '暂不确认',
        },
        cancelFlag: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow: this.show,
        };
    },
    watch: {
        show(val) {
            this.isShow = val;
            this.$emit('update:show', val);
        },
    },
    methods: {
        close() {
            this.isShow = false;
            this.$emit('close');
        },
        confirmFn() {
            this.isShow = false;
            this.$emit('confirmFn');
        },
        cancelFn() {
            this.isShow = false;
            this.$emit('cancel');
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    position: fixed !important;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
}
.pop-up {
    margin: 200px auto;
    width: 400px;
    height: 292px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 0px 20px 6px rgba(171, 171, 171, 0.15);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .warning {
        width: 47px;
        height: 47px;
        background: #f2b247;
        border-radius: 50%;
        font-size: 30px;
        text-align: center;
        line-height: 47px;
        margin-top: 43px;
        color: #fff;
    }
    .title {
        margin-top: 20px;
        height: 16px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: #3a3d4b;
        line-height: 16px;
    }
    .des {
        margin-top: 14px;
        width: 300px;
        height: 48px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #53586c;
        line-height: 24px;
    }
    .btn-wrap {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
            width: 140px;
            height: 40px;
            background: linear-gradient(135deg, #ff0000, #ff4c3d 98%);
            border-radius: 4px;
            font-size: 16px;
            color: #fff;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }
        .cancel {
            width: 140px;
            height: 40px;
            background: #f4f4f5;
            border-radius: 4px;
            font-size: 16px;
            text-align: center;
            color: #3a3d4b;
            line-height: 40px;
            cursor: pointer;
            margin-right: 20px;
        }
    }

    .close {
        width: 17px;
        height: 17px;
        border: 1px solid #c7c8ca;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c7c8ca;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 14px;
        border-radius: 50%;
    }
}
</style>
