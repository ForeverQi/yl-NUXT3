<template>
    <div v-show="show" class="wrap" :class="{ mobile: mobileType }">
        <div class="mk_tipbox">
            <div class="mkp_top">
                <div class="mkp_tit">
                    <span v-html="title"></span>
                    <img v-if="type === 'confirm' || showClose" src="./asset/images/close.png" class="close" @click="cancel" />
                </div>
                <div class="mkp_con">
                    <span v-if="isHtml" ref="autoContentHeight" v-html="content"></span>
                    <span v-else ref="autoContentHeight">{{ content }}</span>
                    <div class="hint" v-show="!!hint" v-html="hint"></div>
                </div>
            </div>
            <div class="mkp_bm">
                <span class="btn mkp_cancel" v-show="showCancel" @click="cancel('separate')">{{ cancelText }}</span>
                <span class="btn mkp_confirm" @click="ok">{{ confirmText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaskConfirm',
    data() {
        return {
            hint: '',
            show: false,
            type: '',
            title: '',
            content: '',
            showCancel: '',
            confirmText: '',
            success: '',
            autoHeiht: '',
            mobileType: false,
            isHtml: false,
            showClose: false,
            separateStatus: false,
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
    created() {
        // if (Platform.isClient()) {
        //     this.mobileType = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
        // }
    },
    updated() {
        this.$nextTick(() => {
            this.autoHeiht = this.$refs.autoContentHeight.offsetHeight;
        });
    },
    methods: {
        /**
             title: '提示',
             content: ops.content,
             showCancel:false,
             confirmText: '重试',
             success
             */
        showModal(ops) {
            //显示提示
            /**
             * 服务器错误统一处理
             *   exception: org.springframework.jdbc.BadSqlGrammarException:
             *   refused: Connection refused (Connection refused)
             *   unknown: UNKNOWN_ERROR
             */
            let regArr = ['unknown', 'refused', 'exception', '解析失败:状态码', '响应体', '后端服务', '请求失败', 'kube', '未知错误', '连接失败', 'api'];
            const regRule = new RegExp(regArr.join('|'), 'i');
            // 去除 ops.hint 的判断
            if (regRule.test(ops.content)) {
                ops.content = '服务器繁忙，请稍后重试';
            }

            this.hint = ops.hint || '';
            this.type = ops.type || '';
            this.title = ops.title || '提示';
            this.content = ops.content || '';
            this.showCancel = ops.showCancel == null ? true : ops.showCancel;
            this.confirmText = ops.confirmText || '确定';
            this.cancelText = ops.cancelText || '取消';
            this.success = ops.success || function () {};
            this.show = true;
            this.isHtml = ops.isHtml ? ops.isHtml : false;
            this.showClose = !!ops.showClose;
            this.separateStatus = ops.separateStatus;
        },
        hide() {
            //隐藏提示
            this.show = false;
        },
        ok() {
            //确认
            this.success({ confirm: true });
            this.hide();
        },
        /**
         * 区分取消事件和关闭事件
         * @param {string} type separate 取消事件
         */
        cancel(type) {
            //取消
            this.hide();
            if (this.separateStatus === true && type === 'separate') {
                this.success({ separateCancel: true });
            } else {
                this.success({ cancel: true });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
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

.mk_tipbox {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 3001;
    text-align: center;
    transform: translate(-50%, -145px);
    width: 328px;
    max-width: 90vw;
    min-height: 210px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
    background: #ffffff;
    border-radius: 16px;
    .mkp_top {
        width: 100%;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        .mkp_tit {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 18px;
            position: relative;
            font-size: 18px;
            span {
                font-weight: 900;
                color: #333333;
            }

            .close {
                position: absolute;
                right: 23px;
                top: 22px;
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
        }
        .mkp_con {
            padding: 42px 14px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            max-height: 400px;
            overflow-y: auto;
            color: #333333;
            line-height: 19px;
            word-break: break-all;
            span {
                word-break: break-all;
            }
        }
    }
    .mkp_bm {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 32px;
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            width: 120px;
            height: 38px;
            background: #ffffff;
            border: 1px solid #d6d6d6;
            border-radius: 8px;
            cursor: pointer;
            box-sizing: border-box;
            color: #666666;
        }
        .mkp_cancel {
            margin-right: 24px;
        }
        .mkp_confirm {
            background: linear-gradient(90deg, #ff6870, #f8323c);
            color: #ffffff;
            border: none;
        }
    }
}
.hint {
    font-size: 12px;
    color: #999;
    // position: absolute;
    line-height: 25px;
}
</style>
