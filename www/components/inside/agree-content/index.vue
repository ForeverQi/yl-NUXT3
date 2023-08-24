<template>
    <div class="agree-dialog-window">
        <vb-window :show="isShow" class="agree-dialog-wrap">
            <div class="agree-wrap bounceInDown">
                <div class="title">
                    {{ argeeContent.title }}
                </div>
                <div class="bar"></div>
                <div class="content">
                    <div style="word-break: break-all; white-space: break-spaces; text-indent: 2em; line-height: 2" v-html="styleTxt"></div>
                </div>
                <div class="bottom-wrap">
                    <span class="btn" @click="closeAgreeDialog">已知晓并同意</span>
                </div>
            </div>
        </vb-window>
    </div>
</template>

<script>
export default {
    props: {
        argeeContent: {
            type: Object,
            default: () => {
                return {
                    title: '',
                    content: '',
                };
            },
        },
    },
    data() {
        return {
            contentDialogFlag: false,
            isShow: true,
        };
    },
    computed: {
        styleTxt() {
            // let sTxt = '鉴于本次课程是专属于优路教育一建集训营学员，且本次授课采用直播形式，为了保障集训营学员的权益，请您在授课过程中遵守以下要求：\n①课堂上不允许录音、录像、不允许拍摄、不允许有意抄誊任何教学内容，不侵害优路及授课教师的知识产权；\n②不通过互联网或其他途径散播通过本课程获取的任何形式的教学内容；\n③不向任何第三方个人或者机构透露或提供通过本课程获取的任何形式的教学内容；\n④积极配合优路做好教学内容的保密管理工作。\n本次直播优路教育采用了最前沿的数字跟踪技术，能够检测到所有课件和设备源头，会不定时的检测到学员的学习环境，一旦发现有外泄视频课件，或影响优路教育权益及品牌的行为，优路有权立即终止向您提供的所有课程服务，您无权要求退费且不再享受任何服务保障和承诺。情节严重的，优路有权追究您的法律责任。';
            let sTxt = this.argeeContent.content;
            let txt = sTxt.replaceAll(/\n/g, '</p><p>');

            return `<p>${txt}</p>`;
        },
    },
    mounted() {},
    methods: {
        closeAgreeDialog() {
            this.$emit('returnBack');
        },
        /*showPopup() {
            this.contentDialogFlag = true;
        },
        closePopup() {
            this.contentDialogFlag = false;
        },
        agreePopup() {
            this.closeAgreeDialog();
        },*/
    },
};
</script>

<style scoped lang="less">
.agree-dialog-window {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2010;
    background-color: rgba(0, 0, 0, 0.6);
}
.agree-dialog-wrap {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}

.agree-wrap {
    width: 630px;
    background: #ffffff;
    border-radius: 12px;

    .title {
        padding: 25px 30px;
        text-align: center;
        color: #000;
        font-size: 18px;
        line-height: 22px;

        /*span {
            float: right;
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url('../../../../assets/images/index/agree/close.png') center center/100% 100%;
            cursor: pointer;
        }*/
    }

    .bar {
        width: 629px;
        height: 1px;
        background: #d8d8d8;
    }

    .content {
        padding: 25px 30px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
        max-height: 500px;
        overflow-y: auto;

        p {
            margin-bottom: 20px;

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

    /*.content-pup-wrap {
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
                display: inline-block;
                width: 18px;
                height: 18px;
                background: url('../../../../assets/images/index/agree/close.png') center center/100% 100%;
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
                background: url('../../../../assets/images/index/agree/warning.png') center center/100% 100%;
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
    }*/
}
</style>
