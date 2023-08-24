<script lang="jsx">
export default {
    name: 'Agreement',
    components: {
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    data() {
        return {
            contentDialogFlag: false,
        };
    },
    methods: {
        closeAgreeDialog() {
            this.$storage.set('isAcceptAgreeMentFlag', 'Y');
            this.$emit('close', false);
        },
        showPopup() {
            this.contentDialogFlag = true;
            setTimeout(() => {
                this.contentDialogFlag = false;
            }, 3000);
        },
    },
    render() {
        return (
            <div class="agree-dialog-wrap bg-color-000">
                <div class="agree-wrap bounceInDown">
                    <div class="title">
                        优路用户隐私政策
                        <span onClick={this.showPopup}></span>
                    </div>
                    <div class="content">
                        <p>
                            欢迎使用优路教育！我们尤为重视平台用户的个人信息和隐私保护，在您使用“优路教育”服务之前，请您务必审慎阅读
                            <a href="/inside/information/agreement" target="_blank">
                                《隐私政策》
                            </a>
                            ，并充分理解协议条款内容。我们将严格按照您同意的各项条款使用您的个人信息，以便为您提供更好的服务。
                        </p>
                        <p>优路教育隐私权政策适用于优路教育提供的软件、网站、服务，包括但不限于适用于电脑、移动智能终端产品及服务。</p>
                        <p>
                            本隐私权政策旨在帮助您了解我们会收集哪些数据、为什么收集这些数据、会利用这些数据做什么以及我们如何保护这些数据。了解这些内容，对于您行使个人权利及保护您的个人信息至关重要，请您在使用优路教育产品或服务前务必抽出时间认真阅读本政策！
                        </p>
                    </div>
                    <div class="bottom-wrap">
                        <span class="btn" onClick={this.closeAgreeDialog}>
                            同意并继续
                        </span>
                    </div>
                </div>
                {this.contentDialogFlag && <div class="toast">您需要同意《隐私政策》后，才能继续使用相关服务哦~</div>}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.toast {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 454px;
    height: 40px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

    font-size: 16px;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    transform: translate(-50%, -50%) !important;
}
.agree-dialog-wrap {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 2051;
    bottom: 0;
    right: 0;
}
.bg-color-000 {
    background-color: rgba(0, 0, 0, 0.3);
}
.agree-wrap {
    width: 660px;
    background: #ffffff;
    border-radius: 16px;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    overflow: hidden;
    .title {
        position: relative;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #ffffff;
        span {
            position: absolute;
            right: 26px;
            top: 22px;
            width: 18px;
            height: 18px;
            background: url('./asset/images/close.png') center center/100% 100%;
            cursor: pointer;
        }
    }

    .content {
        padding: 32px 42px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        line-height: 20px;

        p {
            margin-bottom: 16px;

            a {
                color: #f66256;
            }
        }
    }

    .bottom-wrap {
        text-align: center;
        padding-bottom: 18px;

        .btn {
            display: inline-block;
            width: 300px;
            height: 46px;
            font-size: 16px;
            color: #ffffff;
            line-height: 46px;
            text-align: center;
            background: linear-gradient(90deg, #ff6870, #f8323c);
            border-radius: 8px;
            cursor: pointer;
        }
    }

    .content-pup-wrap {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 484px;
        background: #ffffff;
        border-radius: 12px;
        padding: 10px;
        z-index: 10001;

        .close {
            span {
                float: right;
                width: 18px;
                height: 18px;
                background: url('./asset/images/close.png') center center/100% 100%;
                cursor: pointer;
            }
        }

        .waring {
            margin-top: 20px;
            text-align: center;

            span {
                display: inline-block;
                width: 60px;
                height: 60px;
                background: url('./asset/images/warning.png') center center/100% 100%;
            }
        }

        .text {
            text-align: center;
            margin-top: 36px;
            font-size: 14px;
            color: #000;

            a {
                color: #f66256;
            }
        }

        .btn-wrap {
            margin-top: 36px;
            text-align: center;
            padding-bottom: 20px;

            span {
                display: inline-block;
                width: 305px;
                height: 44px;
                background: linear-gradient(180deg, #ff5644 0%, #e73228 100%);
                border-radius: 12px;
                font-size: 16px;
                color: #fff;
                line-height: 44px;
                cursor: pointer;
            }
        }
    }

    .openClassPopBg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: #000;
        filter: alpha(opacity=70);
        opacity: 0.3;
    }
}
</style>
