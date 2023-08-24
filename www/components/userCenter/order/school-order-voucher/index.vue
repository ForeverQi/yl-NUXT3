<script lang="jsx">
import 'core-js/features/array/at';
import 'core-js/actual/structured-clone';
import 'core-js/features/promise';
import '@/api/order/api..query-order-collegeconfirm-viewfile.js';
import '@/api/order/api..order-collegeconfirm-update.js';

import * as PDFJS from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import SchoolOrderVoucherMsgValid from '@/www/components/userCenter/order/school-order-voucher-msg-valid/index.vue';
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default {
    components: {
        SchoolOrderVoucherMsgValid,
    },
    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            userInfo: {
                userIdcardtype: '',
                userIdcard: '',
                userName: '',
            },
            previewUrl: '',
            currentPage: 1,
        };
    },
    computed: {
        type() {
            return this.order.confirmStage === 'CollegeConfirmed' ? 'detail' : 'confirm';
        },
    },
    mounted() {
        this.initData();
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        getRatio(ctx) {
            const dpr = window.devicePixelRatio || 1;
            const bsr =
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio ||
                1;

            return dpr / bsr;
        },
        initPdf() {
            PDFJS.getDocument(this.previewUrl)
                .promise.then((pdf) => {
                    this.pdfDoc = pdf;
                    this.totalPage = pdf.numPages;
                    this.$nextTick(this.renderPage);
                })
                .catch((err) => {
                    console.warn('initPdf', err);
                });
        },
        renderPage() {
            this.pdfDoc.getPage(this.currentPage).then((page) => {
                let canvas = document.querySelector('#pdfCanvas');
                let ctx = canvas.getContext('2d');
                let ratio = this.getRatio(ctx);

                let dialogWidth = 740;
                let pageWidth = page.view[2] * ratio;
                let scale = dialogWidth / pageWidth;

                let viewport = page.getViewport({ scale });

                this.width = viewport.width * ratio;
                this.height = viewport.height * ratio;

                canvas.width = this.width;
                canvas.height = this.height;

                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

                page.render({
                    canvasContext: ctx,
                    viewport,
                }).promise.then(() => {});
            });
        },
        initData() {
            this.temp = this.tag;
            this.getPreviewUrl();
        },
        getPreviewUrl() {
            this.$callApi('order/query-order-collegeconfirm-viewfile', {
                orderId: this.order.orderId,
            })
                .then((res) => res.getData())
                .then(({ data }) => {
                    console.warn(data);
                    this.previewUrl = this.$urlUtils.getViewUrl(data);
                    this.initPdf();
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        handleCloseClick() {
            this.$baseUI.confirm({
                title: '提示',
                content: '您确定不认可录入的院校和专业信息么？',
                showCancel: true,
                confirm: () => {
                    this.collegeCancel().then(() => {
                        this.$emit('doClose', 'click');
                    });
                },
            });
        },
        collegeCancel() {
            this.loadingIntance = this.$baseUI.loading();
            return this.$callApi('order/order-collegeconfirm-update', {
                orderId: this.order.orderId,
                isAgree: 'N',
            })
                .then(() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            this.$Message.success('已取消');
                        }, 5e3);
                    });
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    this.loadingIntance.close();
                });
        },
        handleSureClick() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: SchoolOrderVoucherMsgValid,
                        modalHeader: (
                            <div class="title-wrap">
                                <h2 class="title" style="text-align: center;">
                                    手机验证
                                </h2>
                            </div>
                        ),
                    },
                    {
                        order: this.order,
                    },
                    {
                        width: '690px',
                        radius: '16px',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close' && ret === 'click') {
                        this.$emit('doClose', 'click');
                    }
                });
        },
    },
    render() {
        return (
            <div class="agreement-wrap">
                <div class="pdf-wrapper">
                    <canvas id="pdfCanvas"></canvas>
                </div>
                {this.type === 'confirm' && <hr class="dividing-line" />}
                {this.type === 'confirm' && (
                    <div class="agreement-footer">
                        <button class="btn cancel" onclick={this.handleCloseClick} type="button">
                            不同意
                        </button>
                        <button class="btn sure" onclick={this.handleSureClick} type="button">
                            确认无误
                        </button>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
canvas {
    border: 0;
    font-weight: normal;
}
.agreement-wrap {
    background-color: transparent;
    padding-left: 52px;
    padding-right: 52px;
    max-height: 80vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .pdf-wrapper {
        flex: 1;
        overflow: auto;
    }
    .dividing-line {
        border: 1px solid #ecedf6;
        border-top: none;
    }
    .agreement-footer {
        margin-top: 20px;
        text-align: center;
        .btn {
            width: 160px;
            height: 40px;
            border-radius: 8px;
            border: none;
            outline: none;
        }
        .cancel {
            background: #fff3f3;
            color: #f8323c;
        }
        .sure {
            background: linear-gradient(90deg, #ff6870, #f8323c);
            color: white;
            font-weight: bold;
            margin-left: 40px;
            &[disabled='disabled'] {
                background: gray;
            }
        }
    }
}
.agreement-bottom {
    margin: 0 auto;
    margin-top: 16px;
    width: 56px;
    height: 56px;
    cursor: pointer;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
<style lang="less">
.wrap {
    z-index: 3000 !important;
}
</style>
