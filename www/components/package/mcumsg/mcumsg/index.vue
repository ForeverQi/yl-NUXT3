<template>
    <div v-show="show" class="mcu_wrap" :class="{ mobile: mobileType }">
        <div class="mcu_tipbox">
            <div class="mcu_top">
                <p class="mcu_tit">
                    {{ title }}
                </p>
            </div>
            <div class="mcu_con">
                <p ref="autoContentHeight">{{ content }}</p>
            </div>
            <div class="mcu_bm" v-if="showConfirm || showCancel">
                <button class="btn mcu_cancel" v-show="showCancel" @click="cancel">{{ cancelText }}</button>
                <button class="btn mcu_confirm" v-show="showConfirm" @click="ok">{{ confirmText }}</button>
            </div>
            <button class="close" @click="cancel"></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            title: '',
            content: '',
            showCancel: '',
            showConfirm: '',
            confirmText: '',
            success: '',
            autoHeiht: '',
            mobileType: false,
        };
    },
    watch: {
        autoHeiht(val) {
            if (val > 24) {
                this.$refs.autoContentHeight.style.textAlign = 'left';
            } else {
                this.$refs.autoContentHeight.style.textAlign = 'center';
            }
        },
    },
    updated() {
        this.$nextTick(() => {
            this.autoHeiht = this.$refs.autoContentHeight.offsetHeight;
        });
    },
    methods: {
        showModal(ops) {
            const { title, content, showCancel, showConfirm, confirmText, cancelText } = ops;
            this.title = title || '提示';
            this.content = content || '';
            this.showCancel = showCancel !== false;
            this.showConfirm = showConfirm !== false;
            this.confirmText = confirmText || '确定';
            this.cancelText = cancelText || '取消';
            this.success = ops.success || function () {};
            this.show = true;

            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        hide() {
            this.show = false;
        },
        ok() {
            this.success({ confirm: true });
            this.hide();
            this.resolve({ confirm: true });
        },
        cancel() {
            this.hide();
            this.reject({ confirm: false });
        },
    },
};
</script>

<style lang="less" scoped>
.mcu_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    /deep/ .openClassPopBg {
        z-index: 3000;
    }
}

.mcu_tipbox {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 3001;
    text-align: center;
    transform: translate(-50%, -145px);
    min-width: 328px;
    max-width: 90vw;
    background: white;
    box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
    border-radius: 10px;
    overflow: hidden;

    .mcu_top {
        width: 100%;
        max-height: 50vh;
        overflow: auto;

        .mcu_tit {
            padding: 25px 30px 0;
            color: #333333;
            font-weight: 700;
            font-size: 20px;
        }
    }
    .mcu_con {
        margin-top: 35px;
        p {
            width: 302px;
            margin: 0 auto;
            text-align: center;
            font-size: 14px;
            color: #333333;
            line-height: 24px;
            word-break: break-all;
        }
    }

    .mcu_bm {
        margin: 38px 0 25px;
        display: inline-flex;
        .btn {
            display: inline-block;
            font-size: 14px;
            color: #333333;
            min-width: 120px;
            border-radius: 8px;
            cursor: pointer;
            padding-bottom: 8px;
            padding-top: 8px;
            padding-left: 15px;
            padding-right: 15px;
            flex: 1;
        }
        .mcu_cancel {
            margin-right: 24px;
            border: 1px solid #d6d6d6;
            background-color: white;
            color: #666666;
        }
        .mcu_cancel:hover {
            color: #3a85fe;
            background-color: rgba(58, 133, 154, 0.1);
            border: 1px solid #3a85fe;
        }

        .mcu_confirm {
            background: linear-gradient(90deg, #3a85fe 0%, #025eff 100%);
            color: white;
        }
    }
    .close {
        position: absolute;
        width: 40px;
        height: 40px;
        top: 10px;
        right: 10px;
        background-color: transparent;
    }
    .close::before,
    .close::after {
        position: absolute;
        content: ' ';
        background-color: #727b8a;
        left: 20px;
        width: 1px;
        height: 20px;
        top: 10px;
    }

    .close::before {
        transform: rotate(45deg);
    }

    .close::after {
        transform: rotate(-45deg);
    }
}
</style>
