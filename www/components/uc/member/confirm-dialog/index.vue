<template>
    <div>
        <div class="wrap" v-if="showDialog">
            <bmask></bmask>
            <div class="confirm-dialog">
                <div class="dialog-title">{{ title }}</div>
                <div class="el-icon-close close" @click.stop="hideConfirm"></div>
                <div class="dialog_con">
                    <div class="tip-img"><img src="./asset/images/u7.png" /></div>
                    <p ref="autoContentHeight" v-html="content"></p>
                </div>
                <div class="dialog_bm" v-if="btnType == 'btn'">
                    <span class="btn cancel" @click="doCancel">取消</span>
                    <span class="btn" :class="item.classList" v-for="(item, index) in btns" :key="index" @click="item.handle">{{ item.txt }}</span>
                </div>
                <div class="dialog_bm" v-if="btnType == 'input'">
                    <div class="inp-wrap">
                        <div class="tip"><span v-if="showTip">验证错误，请重新输入。</span></div>
                        <el-input class="inp" v-model="inpTxt" v-focus />
                    </div>
                    <span class="btn confirm" @click="doHandle">确定</span>
                </div>
            </div>
        </div>
        <div v-if="isShowToast" class="toast">
            {{ toastContent }}
        </div>
    </div>
</template>
<script>
import bmask from '@/www/components/loading/bmask/index.vue';
export default {
    components: {
        bmask,
    },
    directives: {
        focus: {
            inserted(el, binding) {
                el.querySelector('input').focus();
            },
        },
    },
    data() {
        return {
            showDialog: false,
            isShowToast: false,
            toastContent: '',
            content: '',
            title: '',
            inpTxt: '', // 用户输入字符串
            verifyTxt: '', // 验证字符串
            showTip: false,
            btnType: 'btn', // btn 全部按钮，input，一个输入框一个按钮
            btns: [
                {
                    txt: '清空当前科目',
                    classList: ['confirm'],
                    handle: () => {},
                },
                {
                    txt: '清空全部科目',
                    classList: ['confirm'],
                    handle: () => {},
                },
            ],
        };
    },
    methods: {
        showWebToast(opt) {
            this.isShowToast = true;
            this.toastContent = opt.txt || '';

            setTimeout(() => {
                this.isShowToast = false;
            }, opt.time || 2000);
        },
        showConfirm(opt) {
            if (opt.btnType) {
                this.btnType = opt.btnType;
            } else {
                this.btnType = 'btn';
            }
            this.inpTxt = '';
            this.verifyTxt = opt.verifyTxt ? opt.verifyTxt : '';
            this.content = opt.content;
            this.title = opt.title;
            this.btns = opt.btns;

            this.showDialog = true;
        },
        hideConfirm() {
            this.showDialog = false;
        },
        doCancel() {
            this.hideConfirm();
        },
        doHandle() {
            if (this.inpTxt == this.verifyTxt) {
                this.showTip = false;
                this.$emit('doHandle');
            } else {
                this.showTip = true;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.wrap {
    /deep/ .openClassPopBg {
        z-index: 3000;
    }
}
.toast {
    padding: 10px 20px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    border-radius: 10px;
}

.confirm-dialog {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 3001;
    text-align: center;
    transform: translate(-50%, -145px);
    width: 326px;
    max-width: 90vw;
    min-height: 245px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
    border-radius: 4px;
    .close {
        position: absolute;
        right: 13px;
        top: 13px;
        font-size: 18px;
        color: #999999;
        cursor: pointer;
    }

    .dialog-title {
        height: 55px;
        line-height: 55px;
        font-size: 16px;
        text-align: center;
        color: #333333;
    }

    .dialog_con {
        background: #fffbe6;
        border: 1px solid #ffe58f;
        border-radius: 2px;
        padding: 10px 45px;
        text-align: left;
        position: relative;
        .tip-img {
            position: absolute;
            left: 23px;
            top: 13px;
            width: 14px;
            height: 14px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        p {
            margin: 0 auto;
            font-size: 14px;
            color: #666666;
            line-height: 22px;
            word-break: break-all;
        }
    }
    .dialog_bm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 27px;
        // margin: 15px  5px;

        .inp {
            // width: 200px;
            // height: 35px;
            // box-sizing: border-box;
            // border: 1px solid #d8d8d8;
            // border-radius: 2px;
            // outline: none;
            // padding: 0 10px;
        }
        .tip {
            color: #ff2e30;
            font-size: 12px;
            line-height: 30px;
            height: 30px;
        }
        .btn {
            display: inline-block;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            width: 200px;
            box-sizing: border-box;
            height: 32px;
            padding: 0 15px;
            line-height: 32px;
            background: linear-gradient(90deg, #ff2e30, #ff957a);
            border-radius: 4px;
            cursor: pointer;
        }
        .cancel {
            margin-top: 20px;
            height: 32px;
            width: 200px;
            line-height: 32px;
            box-sizing: border-box;
            border: 1px solid rgba(249, 92, 92, 1);
            border-radius: 4px;
            background: rgba(255, 255, 255, 1);
            color: rgba(249, 92, 92, 1);
        }
        .confirm {
            height: 35px;
            line-height: 35px;
            text-align: center;
            display: inline-block;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            border-radius: 3px;
            margin-top: 16px;

            &.enter {
                width: 100px;
            }
        }
    }
}
</style>
