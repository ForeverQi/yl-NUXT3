<script lang="jsx">
export default {
    name: 'DialogView',
    props: {
        width: {
            type: String,
            default: '',
        },
        height: {
            // 弹窗高度
            type: String,
            default: '',
        },
        radius: {
            type: String,
            default: '',
        },
        lockScroll: {
            type: Boolean,
            default: true,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        showHead: {
            type: Boolean,
            default: true,
        },
        isTransparent: {
            // 背景是否透明
            type: Boolean,
            default: false,
        },
        isShadow: {
            type: Boolean,
            default: true,
        },
        padding: {
            // 显示区域不在展示padding
            type: String,
            default: '',
        },
        fixedStatus: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        style() {
            let style = {};
            if (this.width) {
                style.width = this.width;
            }
            if (this.radius) {
                style.borderRadius = this.radius;
                style.overflow = 'hidden';
            }
            if (this.height) {
                style.height = this.height;
            }
            return style;
        },
    },
    watch: {
        lockScroll: {
            immediate: true,
            handler(val) {
                if (val === true) {
                    // 锁定body
                    document.body.style.overflow = 'hidden';
                }
            },
        },
    },
    destroyed() {
        document.body.style.overflow = 'auto';
    },
    render() {
        const style = {};
        if (this.padding !== '') {
            style.padding = this.padding;
        }
        console.log(style, '@@');
        return (
            <div class={this.fixedStatus === false ? 'yl-dialog__wrap' : 'yl-dialog__wrap-fixed'}>
                <div class={['yl-dialog', this.haveShadow ? '' : 'no-shadow', this.fixedStatus === false ? '' : 'margin-top']} style={this.style}>
                    {this.showHead && (
                        <div class="yl-dialog__header">
                            {this.$slots.title ? this.$slots.title : <span class="yl-dialog__title">提示</span>}
                            {this.showClose && (
                                <div
                                    class="yl-dialog__headerbtn"
                                    onClick={() => {
                                        this.$emit('do-close');
                                    }}
                                >
                                    <img src={require('./asset/images/close.png')} class="img" />
                                </div>
                            )}
                        </div>
                    )}

                    <div class={['el-dialog__body', this.isTransparent ? 'transparent' : '']} style={style}>
                        {this.$slots.default}
                    </div>
                    {this.$slots.footer && <div class="yl-dialog__footer">{this.$slots.footer}</div>}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.yl-dialog__wrap {
    // z-index调整为999，避免和错误提示信息层级冲突
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.4);
}
.yl-dialog__wrap-fixed {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    margin: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.4);
}
.yl-dialog {
    position: relative;
    // margin: 10vh auto 50px auto;
    background: transparent;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
    width: 50%;
    overflow: hidden;

    &.margin-top {
        margin: 10vh auto 50px auto;
    }

    &.no-shadow {
        box-shadow: none;
    }
}
.yl-dialog__header {
    padding: 20px 20px 10px;
    background-color: #fff;

    .yl-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
    }

    .yl-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        width: 16px;
        height: 16px;

        .img {
            width: 100%;
            height: 100%;
        }
    }
}
.el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    background-color: #fff;

    &.transparent {
        background-color: transparent;
    }
}
</style>
