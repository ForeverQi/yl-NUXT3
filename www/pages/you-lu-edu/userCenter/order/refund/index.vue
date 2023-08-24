<script lang="jsx">
import '@/api/uc/api.OC2002.query-order-detail.js';
import '@/api/api..do-apply-refund.js';
// 退费申请
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
export default {
    name: 'refund',
    layout: 'nullLayout',
    /**
     * @returns {object} 默认值
     */
    data() {
        return {
            html: '',
            refundContent: '',
            imgSrc: '',
            info: {},
            classId: '',
            orderId: '',
            applyStatus: 'N', //Y已申诉 N未申诉
            mobileType: false,
        };
    },
    /**
     *
     */
    mounted() {
        this.classId = this.$route.query.classId;
        this.orderId = this.$route.query.orderId;
        this.mobileType = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
        if (this.mobileType === true) {
            // 添加head头
            let oMeta = document.createElement('meta');
            oMeta.name = 'viewport';
            oMeta.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
            document.querySelector('head').append(oMeta);
        }
        this.orderDetail();
    },
    methods: {
        /**
         *
         */
        applyRefund() {
            //申请退费
            if (this.applyStatus == 'Y') {
                return;
            }
            if (!this.imgSrc || !this.refundContent) {
                this.$baseUI.alert('请填写您的成绩查询账号,上传您的成绩图片!');
                return;
            }
            let user = this.$storage.get('loginStatus') || {};
            this.$callApi('order/do-apply-refund', {
                userId: user.userId,
                orderNo: this.orderId,
                classId: this.classId,
                className: this.info.skuName,
                applybillType: 'CR', //枚举[NR:48/24小时退费申请;RR:重读申请;CR:退费申请]
                applybillReason: this.refundContent,
                applybillImg: this.imgSrc, //申诉图片url
            })
                .then(
                    (ApiResponse) => {
                        return ApiResponse.getData();
                    },
                    (err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject('apiError');
                    }
                )
                .then(() => {
                    this.$baseUI.alert('申请提交成功！后续会有老师和您联系').then(() => {
                        if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|(Mac OS X)/i.test(navigator.userAgent)) {
                            this.orderDetail();
                        } else {
                            this.orderDetail();
                            window.opener = null;
                            window.open(' ', '_self');
                            window.close();
                        }
                    });
                })
                .catch((err) => {
                    if (err === 'apiError') {
                        return;
                    }
                    this.$baseUI.alert(msg);
                });
        },
        /**
         * 获取订单详情
         */
        orderDetail() {
            this.$baseUI.loading();
            this.$callApi('uc/query-order-detail', {
                orderNo: this.orderId,
            })
                .then(
                    (ApiResponse) => {
                        return ApiResponse.getData();
                    },
                    (err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject('apiError');
                    }
                )
                .then((data) => {
                    this.orderInfo = data || {};
                    if (this.orderInfo.orderItems && this.orderInfo.orderItems.length > 0) {
                        for (let k = 0; k < this.orderInfo.orderItems.length; k++) {
                            if (this.classId == this.orderInfo.orderItems[k].skuId) {
                                if (this.orderInfo.orderSubtype == 'DEF' && this.orderInfo.orderItems[k].orderitemOperation == 'DEFO') {
                                    //顺延后
                                    this.info = this.orderInfo.orderItems[k];
                                    break;
                                }
                                if (this.orderInfo.orderSubtype == 'CHA' && this.orderInfo.orderItems[k].orderitemOperation == 'CHAI') {
                                    //转入
                                    this.info = this.orderInfo.orderItems[k];
                                    break;
                                }
                                this.info = this.orderInfo.orderItems[k];
                            }
                        }
                    }
                    // 订单项售后服务信息 申请其中一个后会被清空 以此判断该申请 是否申请过
                    this.applyStatus =
                        this.info.orderitemService.orderitemAfterservices && this.info.orderitemService.orderitemAfterservices.length > 0 ? 'N' : 'Y'; // Y已申诉 N未申诉
                    if (this.info.orderitemService.orderitemAgreementtemplateid) {
                        //如果有模版，直接拿模版
                        this.getHtmlByAjax(
                            this.$urlUtils.getViewUrl(this.info.orderitemService.orderitemAgreementurl, this.info.orderitemService.agreementFileToken || '')
                        ).then((res) => {
                            this.html = this.getHtml(res);
                        });
                    } else {
                        // let verision = this.info.orderitemService.orderitemAgreementversion || 3;
                        // TreatyUtil.getTuifeiContract48(vm.info.orderitemService.orderitemAgreementversion || 3).then((result) => {
                        //     vm.html = result;
                        // });
                    }
                })
                .catch((err) => {
                    if (err === 'apiError') {
                        return;
                    }
                    this.$baseUI.alert(err.toString());
                })
                .finally(() => {
                    this.$baseUI.loading.closeAll();
                });
        },
        /**
         *
         * @param {object} root0 请求对象
         * @param {object} root0.response 请求内容
         */
        upImgSuccess({ response }) {
            //上传成功
            if (response && response.length > 0) {
                this.imgSrc = response[0].filePath;
            }
        },
        /**
         *
         */
        delay() {
            this.imgSrc = '';
        },
        /**
         *
         * @param {string} html html字符串
         * @returns {string} 字符串
         */
        getHtml(html) {
            //取购买协议模版中的 特定标签下的内容 展示
            let ht = html || '';
            if (ht) {
                ht = ht.replace(
                    /^[\s\S]*(<\s*style.*>[\s\S]*<\s*\/\s*style\s*>)[\s\S]*(<\s*hesitationPeriod\s*>[\s\S]*<\s*\/\s*hesitationPeriod\s*>)[\s\S]*<\s*\/\s*body\s*>[\s\S]*$/i,
                    function (res, $1, $2, $3) {
                        return $1 + '<div class="content">' + $2 + '</div>';
                    }
                );
            }
            return ht;
        },
        /**
         * @param {string} url 请求url
         * @returns {*} promise对象
         */
        getHtmlByAjax(url) {
            console.log(url, '@@@@');
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                /**
                 *
                 */
                xhr.onload = function () {
                    resolve(xhr.responseText);
                };
                /**
                 *
                 */
                xhr.onerror = function () {
                    reject();
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
    },
    /**
     * @returns {*} vue jsx对象
     */
    render() {
        const classList = ['contWrap', this.mobileType === true ? 'mobile' : ''];
        const submitButton = ['submitButton', this.applyStatus == 'Y' ? 'disabied' : ''];
        const submitButtonTxt = this.applyStatus == 'Y' ? '您的申请已提交, 无须重复申请' : '符合条件提出申请';
        return (
            <div class="contWrap" class={classList}>
                <div class="contTitle"> 退费说明 </div>
                <div class="vbtreaty">
                    <div class="content" domPropsInnerHTML={this.html}></div>
                </div>
                <textarea class="f_text " placeholder="如您符合上述条件，可提出退费申请，请填写您的成绩查询账号" vModel={this.refundContent}></textarea>
                <div class="uploadWrap">
                    <div class="upload-top">
                        <span>上传成绩图片：</span>
                        <div
                            class="upload-btn"
                            onClick={() => {
                                this.$refs.vbUpload.inputClick();
                            }}
                        >
                            点击上传
                        </div>
                        <vbUploadImgAuto style="display: none" ref="vbUpload" onSuccess={this.upImgSuccess} limit="1" />
                        <span class="upWord">只能上传一张</span>
                    </div>
                    <div class="upload-bot" style={this.imgSrc ? '' : 'display: none'}>
                        <div class="delay" onClick={this.delay}></div>
                        <img src={this.$urlUtils.getViewUrl(this.imgSrc)} alt="" />
                    </div>
                </div>
                <div class={submitButton} onClick={this.applyRefund}>
                    {submitButtonTxt}
                </div>
            </div>
        );
    },
};
</script>
<style>
body {
    min-width: 100%;
    margin: 0 !important;
}
</style>
<style lang="less" scoped>
.contWrap {
    width: 690px;
    padding: 15px 30px;
    background: #fff;
    margin: 40px auto;
    .contTitle {
        color: #333;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        line-height: 70px;
    }
    .f_text {
        width: 95%;
        font-size: 14px;
        height: 80px;
        line-height: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(238, 238, 238);
        border-image: initial;
        border-radius: 3px;
        padding: 10px;
        resize: none;
        outline: none;
    }

    .upload-top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        line-height: 37px;
        margin-top: 10px;
    }
    .upload-btn {
        color: #ff562e;
        border: 1px solid #ff562e;
        border-radius: 4px;
        line-height: 35px;
        display: inline-block;
        padding: 0 15px;
        position: relative;
        cursor: pointer;
        margin: 0 5px;
    }
    .upload-bot {
        margin: 10px auto;
        position: relative;
        width: 222px;
        height: 125px;
        img {
            height: 100%;
            width: 100%;
        }
        .delay {
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url(./asset/images/f_close.png) no-repeat center center / cover;
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
        }
    }

    .submitButton {
        width: 250px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        margin: 30px auto;
        background: #f02e00;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        &.disabied {
            background: #ccc;
            cursor: not-allowed;
        }
    }
    .upWord {
        color: #ff0000;
        font-size: 14px;
    }

    .vbtreaty {
        /deep/ .content {
            font-size: 0.875rem;
            font-family: MicrosoftYaHei;
            padding: 10px 25px 10px 30px;
            overflow: auto;
            letter-spacing: 0.5px;
            .yl-plugin-header {
                display: none;
            }
            .yl-plugin-mask-layer.no-layer .yl-plugin-main {
                width: 100%;
            }
            .yl-plugin-mask-layer .yl-plugin-content .wrap.add {
                width: 100%;
            }
            p:first-child {
                font-weight: bold;
            }
            strong {
                color: #333;
                font-weight: bold;
            }
            b {
                color: #333;
                font-weight: 400;
            }
            strong p,
            b p:first-child {
                color: #333;
                font-weight: 400;
            }
            p b {
                font-weight: bold;
            }
            & p {
                line-height: 30px;
                font-size: 16px;
                color: #333;
                padding: 5px 0;
                &.center {
                    color: #333333;
                    font-size: 24px;
                    text-align: center;
                }
            }
            & ol {
                font-size: 0.875rem;
                color: #333;
                list-style-type: decimal;
                padding: 0 15px;
                & > ol {
                    padding: 0 20px;
                    margin: 0 20px;
                }
                li {
                    line-height: 1.5625rem;
                    list-style: decimal;
                    display: list-item;
                    text-align: -webkit-match-parent;
                }
            }
        }
    }
}
</style>
