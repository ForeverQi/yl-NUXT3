<template>
    <div class="edu-mask" v-show="show">
        <div class="info-wrap">
            <button class="close" @click="handleCloseClick" type="button">
                <img src="./asset/images/close.png" class="icon" />
            </button>
            <div class="info-header">
                <h2>缴费须知</h2>
            </div>
            <p v-html="content" class="content-wrapper" ref="content" @scroll="handleContentScroll"></p>
            <button class="ok" :disabled="isCanNotRead" @click="handleOkClick">同意</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        content: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isCanNotRead: true,
        };
    },
    watch: {
        show(newV) {
            if (newV) {
                this.$nextTick(this.calIsCanScroll);
            }
        },
    },
    mounted() {
        this.$nextTick(this.calIsCanScroll);
    },
    methods: {
        handleCloseClick() {
            this.$refs.content.scroll(0, 0);
            this.$emit('update:show', false);
        },
        calIsCanScroll() {
            this.isCanNotRead = this.$refs.content.scrollHeight > this.$refs.content.clientHeight;
        },
        handleContentScroll() {
            if (this.isCanNotRead) {
                if (Math.ceil(this.$refs.content.clientHeight + this.$refs.content.scrollTop) >= this.$refs.content.scrollHeight - 10) {
                    this.isCanNotRead = false;
                }
            }
        },
        handleOkClick() {
            this.$refs.content.scroll(0, 0);
            this.$emit('success');
            this.$emit('update:show', false);
        },
    },
};
</script>
<style lang="less" scoped>
.edu-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 3000;
    .info-wrap {
        min-width: 30%;
        overflow: auto;
        background-color: white;
        display: inline-block;
        border-radius: 10px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px 20px;
        height: 50%;
        .user-form {
            margin: 20px 20px 0;
            .item-val {
                width: 32px;
                height: 36px;
                background-color: white;
                border-bottom: 1px solid #d9dbe5;
                outline: none;
                box-sizing: border-box;
                text-align: center;
                font-weight: bold;
                font-size: 22px;
            }
            .item-val:nth-child(n + 2) {
                margin-left: 8px;
            }
        }

        .info-footer {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 28px;
            .btn {
                width: 218px;
                height: 38px;
                border: none;
                outline: none;
                border-radius: 19px;
            }
            .sure {
                background: linear-gradient(270deg, #ff8d74, #ff2e30);
                color: white;
                font-weight: bold;
                &[disabled='disabled'] {
                    background: gray;
                }
            }
        }

        .info-header {
            position: relative;
            h2 {
                font-size: 20px;
                text-align: center;
                margin-top: 10px;
            }
        }
        .close {
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 1000;
            cursor: pointer;
            .icon {
                width: 12px;
                height: 12px;
            }
        }
        .ok {
            border: none;
            outline: none;
            background-color: #f8323c;
            color: white;
            text-align: center;
            padding: 8px 10px;
            box-sizing: border-box;
            margin-top: 10px;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            &:disabled {
                background-color: lightgray;
            }
        }
    }
}
.tips {
    color: #f8323c;
    font-size: 12px;
    text-align: center;
    margin-top: 8px;
}
.tips-card {
    margin-top: 24px;
    color: #8d90aa;
    font-size: 12px;
    text-align: center;
}
.content-wrapper {
    height: calc(100% - 50px);
    overflow: auto;
}
</style>
