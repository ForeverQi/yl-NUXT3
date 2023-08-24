<template>
    <div class="errorMsg" v-if="config.show">
        <div class="openClassPopBg" style="background: rgb(0, 0, 0)"></div>
        <div class="mk_tipbox">
            <div class="mkp_top">
                <div class="mkp_tit">
                    <span>提示</span>
                </div>
                <div class="mkp_con">
                    <p style="text-align: center">{{ config.message }}</p>
                </div>
            </div>
            <div class="mkp_bm">
                <span v-if="config.showCancel" class="btn mkp_cancel" @click="handleCancel">取消</span>
                <span class="btn mkp_confirm" @click="handleConfirm">确定</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            config: {
                show: false,
                message: '提示信息',
                showCancel: false,
                cancel: null,
                confirm: null,
            },
        };
    },
    methods: {
        handleCancel() {
            this.config.show = false;
            this.config.cancel && this.config.cancel();
        },
        handleConfirm() {
            this.config.show = false;
            this.config.confirm && this.config.confirm();
        },
    },
};
</script>
<style lang="less">
.errorMsg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .openClassPopBg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        background: #000;
        filter: alpha(opacity=70);
        opacity: 0.3;
    }
    .mk_tipbox {
        position: fixed;
        top: 40%;
        left: 50%;
        z-index: 3001;
        text-align: center;
        transform: translate(-50%, -145px);
        width: 382px;
        max-width: 90vw;
        min-height: 245px;
        background: #ffffff;
        box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
        border-radius: 4px;

        .mkp_top {
            width: 100%;
            min-height: 165px;
            max-height: 50vh;
            background: linear-gradient(90deg, #f04848 0%, #ffad81 100%);
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            overflow: auto;
            .mkp_tit {
                padding: 40px 39px 0;
                color: #333333;
                font-size: 20px;
                font-size: 18px;
                color: #ffffff;
                text-shadow: 1px 2px 10px rgba(175, 0, 0, 0.7);
            }
            .mkp_con {
                margin-top: 25px;
                p {
                    width: 302px;
                    margin: 0 auto;
                    text-align: left;
                    font-size: 14px;
                    color: #ffffff;
                    line-height: 24px;
                    word-break: break-all;
                }
            }
        }
        .mkp_bm {
            .btn {
                display: inline-block;
                font-size: 14px;
                color: #ffffff;
                width: 100px;
                height: 28px;
                line-height: 28px;
                background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
                border-radius: 4px;
                cursor: pointer;
            }
            margin: 27px 0 5px;
            .mkp_cancel {
                margin-right: 36px;
                width: 100px;
                height: 28px;
                border: 1px solid #f95c5c;
                border-radius: 4px;
                background: #ffffff;
                color: #f95c5c;
            }
        }
    }
}
</style>
