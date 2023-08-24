<template>
    <transition name="msgbox-fade" @after-leave="destroy">
        <div class="vb-cupertino__wrapper" v-show="visible">
            <div class="vb-cupertino__mask" @click.stop="handleClickMask" v-if="modal"></div>
            <div class="vb-cupertino__container">
                <div class="vb-cupertino__content">
                    <span class="vb-cupertino__content-label">{{ content }}</span>
                </div>
                <div v-if="showCancelButton || showConfirmButton" class="vb-cupertino__footer">
                    <vb-button class="vb-cupertino__footer-button cancel-button" type="text" v-if="showCancelButton" @click.native="handleAction('cancel')">
                        {{ cancelButtonText }}
                    </vb-button>
                    <vb-button class="vb-cupertino__footer-button confirm-button" type="text" @click.native="handleAction('confirm')" v-if="showConfirmButton">
                        {{ confirmButtonText }}
                    </vb-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import vbButton from '@/www/components/button/button/index.vue';
// ios样式的message-box
export default {
    name: 'CupertinoMessageBox',
    components: { vbButton },
    props: {
        content: {
            type: String,
            default: '',
        },
        // 锁住滚动
        lockScroll: {
            type: Boolean,
            default: true,
        },
        showCancelButton: {
            type: Boolean,
            default: true,
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        cancelButtonText: {
            type: String,
            default: '取消',
        },
        confirmButtonText: {
            type: String,
            default: '确定',
        },
        // 点击遮罩是否关闭
        closeOnClickModal: {
            type: Boolean,
            default: true,
        },
        // 是否显示遮罩
        modal: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            visible: false,
            reslove: null,
            reject: null,
        };
    },
    mounted() {
        if (this.lockScroll && document.body.classList) {
            // document.body.classList.add("overflow-h");
        }
    },
    beforeDestroy() {
        this.lockScroll && document.body.classList && document.body.classList.remove('overflow-h');
    },
    methods: {
        show() {
            this.visible = true;
            return new Promise((resolve, reject) => {
                this.reslove = resolve;
                this.reject = reject;
            });
        },
        handleAction(type) {
            this.visible = false;
            switch (type) {
                case 'cancel':
                    this.reject();
                    break;
                default:
                    this.reslove();
                    break;
            }
        },
        destroy() {
            this.$el.parentNode.removeChild(this.$el);
            this.$destroy();
        },
        handleClickMask() {
            if (this.closeOnClickModal) {
                this.visible = true;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.vb-cupertino__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: 1000;
    .vb-cupertino__mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .vb-cupertino__container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 270px;
        max-width: 370px;
        background-color: #ffffff;
        border-radius: 8px;
        z-index: 1001;
        padding: 0 12px;
    }
    .vb-cupertino__content {
        height: 89px;
        line-height: 89px;
        .vb-cupertino__content-label {
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            color: #333333;
        }
    }
    .vb-cupertino__footer {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        text-align: justify;
    }
    .vb-cupertino__footer-button {
        display: inline-block;
        font-size: 16px;
        line-height: 35px;
        letter-spacing: 0px;
        text-align: center;
    }
    .cancel-button {
        width: 49%;
        color: #4285f5;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    .cancel-button + .confirm-button {
        width: 49%;
    }
    .confirm-button {
        width: 100%;
        color: #e73928;
    }
    .msgbox-fade-enter-active {
        -webkit-animation: msgbox-fade-in 0.3s;
        animation: msgbox-fade-in 0.3s;
    }

    .msgbox-fade-leave-active {
        -webkit-animation: msgbox-fade-out 0.3s;
        animation: msgbox-fade-out 0.3s;
    }

    @-webkit-keyframes msgbox-fade-in {
        0% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes msgbox-fade-in {
        0% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @-webkit-keyframes msgbox-fade-out {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }
    }

    @keyframes msgbox-fade-out {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }
    }
}
</style>
