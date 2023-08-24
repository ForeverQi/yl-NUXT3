<template>
    <div class="wrap">
        <bmask></bmask>
        <div class="mk_tipbox">
            <div class="mkp_top">
                <div class="mkp_tit">
                    <img v-if="type == 'success'" class="titleIcon" src="./asset/images/msgSuccess.png" />
                    <img v-if="type == 'fail'" class="titleIcon" src="./asset/images/msgFail.png" />
                    <img v-if="type == 'warn'" class="titleIcon" src="./asset/images/msgWarn.png" />
                    <span v-html="title"></span>
                </div>
                <div class="mkp_con">
                    <p ref="autoContentHeight">{{ content }}</p>
                </div>
            </div>
            <div class="mkp_bm">
                <span class="btn mkp_cancel" v-show="showCancel" @click="cancel">{{ cancelText }}</span>
                <span class="btn mkp_confirm" @click="ok">{{ confirmText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import bmask from '../bmask/index.vue';
export default {
    name: 'maskConfirm',
    components: {
        bmask,
    },
    props: {
        type: {
            type: String,
            default: '',
        },

        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        showCancel: {
            type: Boolean,
            default: false,
        },
        cancelText: {
            type: String,
            default: '',
        },
        confirmText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            autoHeiht: '',
            show: false,
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
    mounted() {
        this.$nextTick(() => {
            this.autoHeiht = this.$refs.autoContentHeight.offsetHeight;
        });
    },
    methods: {
        ok() {
            this.$emit('ok');
        },
        cancel() {
            this.$emit('cancel');
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

.mk_tipbox {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 3001;
    text-align: center;
    /* width: 500px; */
    // margin: -150px -250px;
    transform: translate(-50%, -145px);
    width: 382px;
    max-width: 90vw;
    min-height: 245px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
    border-radius: 4px;
    .mkp_top {
        width: 100%;
        min-height: 165px;
        max-height: 50vh;
        background: linear-gradient(90deg, rgba(240, 72, 72, 1) 0%, rgba(255, 173, 129, 1) 100%);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        overflow: auto;
        .mkp_tit {
            padding: 40px 39px 0;
            color: #333333;
            font-size: 20px;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            // line-height: 57px;
            text-shadow: 1px 2px 10px rgba(175, 0, 0, 0.7);
            .titleIcon {
                vertical-align: middle;
                margin-bottom: 4px;
            }
        }
        .mkp_con {
            margin-top: 25px;
            p {
                width: 302px;
                margin: 0 auto;
                text-align: left;
                font-size: 14px;
                color: rgba(255, 255, 255, 1);
                line-height: 24px;
                word-break: break-all;
            }
        }
    }
    .mkp_bm {
        margin: 27px 0 5px;
        .btn {
            display: inline-block;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            width: 100px;
            height: 28px;
            line-height: 28px;
            background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
            border-radius: 4px;
            cursor: pointer;
        }
        .mkp_cancel {
            margin-right: 36px;
            width: 100px;
            height: 28px;
            border: 1px solid rgba(249, 92, 92, 1);
            border-radius: 4px;
            background: rgba(255, 255, 255, 1);
            color: rgba(249, 92, 92, 1);
        }
        .mkp_confirm {
            // margin-left: 36px;
        }
    }
}
</style>
