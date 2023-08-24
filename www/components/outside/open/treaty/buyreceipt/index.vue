<template>
    <div class="buyWrap">
        <slot></slot>
        <h1 v-show="titleShow" class="agreement-title">产品购买协议</h1>
        <div style="height: 50px" v-if="downloadShow && showDownBtn && false">
            <button @click="download" class="downloadBtn">下载</button>
        </div>
        <div class="iframeW" v-html="contractContent"></div>
    </div>
</template>

<script>
import '@/api/uc/api.OC2002.query-order-detail';
import '@/api/uc/api.BD3205.query-classids-list';
import '@/api/order/api..query-delay-study-argument.js';

/* 用于通过协议地址检测是否为第二版协议的正则表达式 */
let v2AgreementUrlMatchRegExp = /.+\/[a-z]+\.(?:htm|aspx)\?version=/i;

/* 适用于第二版协议下各个子版本各个服务类型的，已上传至 正式环境 文件服务的协议模板地址 */
let v2AgreementUrlConstants = {
    /* 第二版本协议下子版本号为 1 的 不重读不退费 协议 */
    '1N': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593759940759.html',
    /* 第二版本协议下子版本号为 1 的 重读 协议 */
    '1R': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593759710576.html',
    /* 第二版本协议下子版本号为 1 的 退费 协议 */
    '1F': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593760280768.html',

    /* 第二版本协议下子版本号为 2 的 不重读不退费 协议 */
    '2N': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593760680908.html',
    /* 第二版本协议下子版本号为 2 的 重读 协议 */
    '2R': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593759390525.html',
    /* 第二版本协议下子版本号为 2 的 退费 协议 */
    '2F': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593759810442.html',

    /* 第二版本协议下子版本号为 3 的 不重读不退费 协议 */
    '3N': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593759500647.html',
    /* 第二版本协议下子版本号为 3 的 重读 协议 */
    '3R': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593760210033.html',
    /* 第二版本协议下子版本号为 3 的 退费 协议 */
    '3F': 'https://ufile.niceloo.com/api/file/download?action=view&path=2022/09/19/16635593766900062.html',
};

/**
 * 获取给定第二版本下，给定子版本号和服务类型的协议模板地址
 * @param {String|Number} subVersion 协议子版本号，如：2
 * @param {String} serviceType 服务类型。N-不重读不退费；R-重读；F-退费
 * @returns {String|undefined}
 */
let getV2AgreementTemplateUrl = (subVersion, serviceType) => {
    return v2AgreementUrlConstants[subVersion + serviceType];
};

export default {
    name: 'BuyReceipt',
    props: {
        orderId: {
            type: String,
            default: '',
        },
        classId: {
            type: String,
            default: '',
        },
        titleShow: {
            type: Boolean,
            default: false,
        },
        downloadShow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            /* 协议地址 */
            contractUrl: '',

            /* 协议正文内容 */
            contractContent: '',

            _timer: null,

            info: { orderitemService: {} },

            /* 是否显示下载按钮 */
            showDownBtn: true,
        };
    },

    watch: {
        orderId: {
            immediate: true,
            handler(newV, oldV) {
                if (newV === oldV) return;

                this.queryAndFetchContractByOrderNumberOrClassId();
            },
        },
        classId: {
            immediate: true,
            handler(newV, oldV) {
                if (newV === oldV) return;

                this.queryAndFetchContractByOrderNumberOrClassId();
            },
        },
    },

    methods: {
        /**
         * 重置变量状态
         */
        _reset() {
            this.contractUrl = '';
            this.info = {};
        },

        /**
         * 展现协议正文
         * @param {String} [content] 协议正文 HTML
         */
        _showContractContent(content) {
            content = content || '';
            let reg = /(img{)\n\s+(width:100% !important;)\n(})/gim;
            this.contractContent = content.replace(reg, '');
            this.$emit('analysis');
        },

        /**
         * 根据给定的 url 加载并展现协议正文
         * @param {string} url 协议URL
         * @param { (string) => string } [transformer] 协议正文转换器
         */
        fetchContract(url, transformer) {
            if (this.info.orderitemService && !this.info.orderitemService.orderitemAgreementtemplateid) {
                // TODO 上线时去除
                url = url.replace('ufileuat', 'ufile');
            }

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    let content = xhr.responseText;

                    if (typeof transformer === 'function') {
                        try {
                            content = transformer(content) || '';
                        } catch (e) {
                            console.error('未能补充协议正文');
                            console.error(e);
                        }
                    }

                    this._showContractContent(content);
                    resolve();
                };
                xhr.onerror = () => {
                    this.$baseUI.alert('获取失败！');
                    reject();
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },

        /**
         * 查询并展现协议正文
         */
        queryAndFetchContract(payload) {
            if (!payload) return;

            this.$callRawApi({
                api: 'bd/class/agreement/info',
                params: payload,
            })
                .then((resp) => {
                    let data = resp.getData();

                    if (data && data.filePath) {
                        this.contractUrl = this.$urlUtils.getViewUrl(data.filePath);
                        this.fetchContract(this.contractUrl);
                    } else {
                        this._showContractContent('<div style="color: #999999; text-align: center; padding: 20px;">未能获取到协议正文 [1]</div>');
                    }
                })
                .catch((_failure) => {
                    this._showContractContent(
                        '<div style="color: #999999; text-align: center; padding: 20px;">未能获取到协议正文 [' + _failure.getDescription() + ']</div>'
                    );
                });
        },

        /**
         * 依据 订单编号 查询并展现协议正文
         */
        queryAndFetchContractByOrderNumber() {
            this._reset();
            // Mask.showLoading();
            this.$callApi('uc/query-order-detail', {
                orderNo: this.orderId,
                onsuccess: (data) => {
                    var orderInfo = data || {};

                    /* 从订单多个条目中，找到要展现协议正文的条目 */
                    if (orderInfo.orderItems && orderInfo.orderItems.length > 0) {
                        for (let k = 0; k < orderInfo.orderItems.length; k++) {
                            if (this.classId == orderInfo.orderItems[k].skuId) {
                                this.info = orderInfo.orderItems[k];
                                break;
                            }
                        }
                    }
                    /* 协议是否已被签收 */
                    let isConfirmed = orderInfo.orderAgreement.agreementStatus === 'Y';

                    /* 第二版协议的特征1：协议地址不为空，且匹配既定正则 */
                    let isV2Agreement1 =
                        null != this.info.orderitemService.orderitemAgreementurl &&
                        v2AgreementUrlMatchRegExp.test(this.info.orderitemService.orderitemAgreementurl);
                    /* 第二版协议的特征2：协议地址为空，模板ID为空 */
                    let isV2Agreement2 =
                        (null == this.info.orderitemService.orderitemAgreementurl || '' == this.info.orderitemService.orderitemAgreementurl) &&
                        null == this.info.orderitemService.orderitemAgreementtemplateid;
                    let isV2Agreement = isV2Agreement1 || isV2Agreement2;
                    let v2AgreementSubVersion = !isV2Agreement ? null : this.info.orderitemService.orderitemAgreementversion || 3;
                    // 没有协议模板ID的订单都不在展示下载按钮（目前仅第三版协议有模板ID）
                    if (null == this.info.orderitemService.orderitemAgreementtemplateid) {
                        this.showDownBtn = false;
                    }
                    if (!isV2Agreement) {
                        /* 为空，或其它取值，说明是第三版格式（本身就是第三版，或第二版清洗为第三版格式）的协议 */
                        if (this.info.orderitemService.orderitemAgreementurl) {
                            this.contractUrl = this.$urlUtils.getViewUrl(
                                this.info.orderitemService.orderitemAgreementurl,
                                this.info.orderitemService.agreementFileToken || ''
                            );
                            this.fetchContract(this.contractUrl);
                        } else if (orderInfo.orderPaystatus == 'U' || orderInfo.orderPaystatus == 'P') {
                            // U:待付款;P:部分付款;A:已付款;M:多付款;F:不付款;
                            this.queryAndFetchContract({
                                assemblyType: 'B',
                                classId: this.classId,
                                orderNo: this.orderId || '',
                            });
                        } else if (
                            orderInfo.orderSubtype === 'REP' &&
                            orderInfo.classOrderSubType === 'YAN' &&
                            orderInfo.orderAgreement.agreementNeedconfirmstatus === 'Y' && // 需要确认协议
                            orderInfo.orderAgreement.agreementStatus === 'N' // 未确认协议
                        ) {
                            // 延考续学
                            const data = {
                                atplId: this.info.orderitemService.orderitemAgreementtemplateid,
                                oldOrderNo: orderInfo.sourceOrderNo,
                                oldClassNames: orderInfo.sourceSkuName,
                                newOrderNo: orderInfo.orderNo,
                                newClassNames: this.info.skuName,
                                userName: '',
                                userIdcardtype: '',
                                userIdcardno: '',
                                userMobile: '',
                                signTime: '',
                                prewStatus: 'preview',
                            };
                            this.$callApi('order/query-delay-study-argument', {
                                ...data,
                                onsuccess: (data) => {
                                    this.fetchContract(this.$urlUtils.getViewUrl(data.filePath, data.fileKey));
                                },
                            });
                        } else {
                            //协议模版，放到页面里
                            this.queryAndFetchContract({
                                assemblyType: 'A',
                                classId: this.classId,
                                orderNo: this.orderId,
                                atplId: this.info.orderitemService.orderitemAgreementtemplateid,
                                className: this.info.skuName,
                                classPrice: this.info.skuAmount / 100,
                                payType: '实付',
                                payPrice: this.info.oiAmount / 100,
                                classAserclause: this.info.orderitemService.orderitemAgreementclause, //补充条款
                                classCategory: this.info.classCategory, //班级类别(M:全科;S:单科)
                                subjectPay: this.info.subjectPay, //单科价格列表
                            });
                        }
                    } else {
                        /* 说明是第二版协议 */

                        this.fetchContract(
                            getV2AgreementTemplateUrl(v2AgreementSubVersion, this.info.orderitemService.orderitemServicetype),
                            !isConfirmed
                                ? /* 尚未签署协议，原文展示模板内容 */
                                  (content) => {
                                      console.error('尚未填充正确的 所购课程、甲方信息');
                                      let tmpObj = document.createElement('div');
                                      tmpObj.innerHTML = content;
                                      let obj = tmpObj.querySelector('.skuName');
                                      obj && (obj.innerHTML = this.info.productName);
                                      return tmpObj.innerHTML;
                                  }
                                : /* 已经签署协议，需填充内容后展示。走到这里，说明虽然签署了，但尚未被清洗 */
                                  (content) => {
                                      /**
                                       * 1. 填充 所购课程
                                       * 2. 填充 甲方信息
                                       * 3. 呈现 乙方章
                                       */
                                      // TODO
                                      console.error('尚未填充正确的 所购课程、甲方信息');
                                      let tmpObj = document.createElement('div');
                                      tmpObj.innerHTML = content;
                                      console.log('@@@#', orderInfo);
                                      let obj = tmpObj.querySelector('.skuName');
                                      obj && (obj.innerHTML = this.info.productName);

                                      obj = tmpObj.querySelector('.userName');
                                      obj && (obj.innerHTML = orderInfo.studentInfo.userName);
                                      obj = tmpObj.querySelector('.userCardType');
                                      obj && (obj.innerHTML = orderInfo.studentInfo.userIdcardtypename);
                                      obj = tmpObj.querySelector('.userCardNum');
                                      obj && (obj.innerHTML = orderInfo.studentInfo.userIdcard);
                                      obj = tmpObj.querySelector('.agreementConfirmedtime');
                                      obj && (obj.innerHTML = orderInfo.orderAgreement.agreementConfirmedtime);

                                      obj = tmpObj.querySelector('.userLoginname');
                                      obj && (obj.innerHTML = orderInfo.studentInfo.userLoginname);
                                      obj = tmpObj.querySelector('.userMobile');
                                      obj && (obj.innerHTML = orderInfo.studentInfo.userMobile);

                                      obj = tmpObj.querySelector('img.tbody-image');
                                      obj && (obj.style.opacity = '1');

                                      return tmpObj.innerHTML;
                                  }
                        );
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },

        /**
         * 依据 班级ID 查询并展现协议正文
         */
        queryAndFetchContractByClassId() {
            this._reset();

            this.$callApi('uc/query-classids-list', {
                classId: this.classId,
                onsuccess: (data) => {
                    this.info = data.classes[0] || {};
                    this.queryAndFetchContract({
                        assemblyType: 'B',
                        classId: this.classId,
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },

        queryAndFetchContractByOrderNumberOrClassId() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                if (this.orderId) {
                    this.queryAndFetchContractByOrderNumber();
                } else {
                    this.queryAndFetchContractByClassId();
                }
            }, 100);
        },

        doDownload(contractUrl) {
            let address = '';
            if (this.info.orderitemService && this.info.orderitemService.orderitemAgreementtemplateid) {
                if (/^http/.test(contractUrl)) {
                    //有的数据会返回全链接，带HTTPS的那中，坑的很。
                    address = contractUrl;
                } else {
                    address = window.location.protocol + contractUrl;
                }
            } else {
                address = contractUrl;
            }

            this.$treatyUtil.download({
                address,
                fileName: this.info.orderitemService && this.info.orderitemService.orderitemAgreementtemplateid ? '产品购买协议.pdf' : '优路购买协议.pdf',
                isOld: this.info.orderitemService && !this.info.orderitemService.orderitemAgreementtemplateid,
            });
            this.$yiguan.track('protocol_download', {
                class_ID: this.classId,
                class_name: this.info.skuName,
                protocol_download_date: this.$DateUtil.dateFmt('YYYY-MM-DD hh:mm:ss', new Date()), //下载时间
                first_category: this.info.parentProjectName, //课程一级分类
                second_category: this.info.projectName, //程二级分类
            });
        },

        download() {
            let vm = this;
            if (
                vm.info.orderitemService &&
                vm.info.orderitemService.orderitemAgreementtemplateid &&
                vm.info.orderitemService.orderitemAgreementurl &&
                vm.info.orderitemService.agreementFileToken
            ) {
                // 需要用token的协议，为了防止协议token过期，下载的时候重新获取一次token信息
                this.$callApi('uc/query-order-detail', {
                    orderNo: vm.orderId,
                    onsuccess: (data) => {
                        if (!data) {
                            // data 为空的时候添加默认值
                            data = {};
                        }
                        let info = {};
                        let contractUrl = vm.contractUrl;
                        if (data.orderItems && data.orderItems.length > 0) {
                            for (let k = 0; k < data.orderItems.length; k++) {
                                if (vm.classId == data.orderItems[k].skuId) {
                                    info = data.orderItems[k];
                                    break;
                                }
                            }

                            if (
                                info.orderitemService &&
                                info.orderitemService.orderitemAgreementtemplateid &&
                                info.orderitemService.orderitemAgreementurl &&
                                info.orderitemService.agreementFileToken
                            ) {
                                contractUrl = this.$urlUtils.getViewUrl(info.orderitemService.orderitemAgreementurl, info.orderitemService.agreementFileToken);
                            }
                        }
                        this.doDownload(contractUrl);
                    },
                });
            } else {
                let url = vm.contractUrl;
                if (vm.info.orderitemService && !vm.info.orderitemService.orderitemAgreementtemplateid) {
                    url = url.replace('ufileuat', 'ufile');
                }
                this.doDownload(url);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.iframeW /deep/ #entry {
    display: block !important;
}
.iframeW /deep/ .buyWrap .agreement-title {
    height: 75px;
    background: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(68, 68, 68, 0.05);
    color: #3e3a39;
    font-size: 20px;
    text-align: center;
    line-height: 75px;
}

.iframeW /deep/ .v3 .cmbr_con {
    position: relative;
    min-height: 184px;
}
.iframeW /deep/ .v3 .cm_label {
    position: absolute;
    top: 73px;
    left: -25px;
    white-space: nowrap;
}
.iframeW /deep/ .v3 .imgWrap {
    position: absolute;
    z-index: 1;
}
.iframeW /deep/ .v3 .cmbl_con {
    line-height: 30px;
}
.iframeW /deep/ .iframeW b {
    font-weight: bold;
}
.iframeW /deep/ .iframeW p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.iframeW /deep/ .iframeW h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.vbtreaty {
    font-size: 0.875rem;
    font-family: MicrosoftYaHei;
    padding: 10px 25px 10px 30px;
    /*padding: 0.625rem 3%;*/
    /*background: #fff;*/
    overflow: auto;
    letter-spacing: 0.5px;
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
        // font-weight: bold;
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
.buyWrap {
    max-width: 1020px;
    min-height: 50vh;
    margin: 0 auto;

    .clsName {
        line-height: 60px;
        border: 1px solid #f2f2f2;
        color: #666;
        font-size: 14px;
        margin: 10px 25px 0 30px;
        padding: 0 10px;
    }

    .agreement-title {
        height: 75px;
        background: #ffffff;
        box-shadow: 0px 4px 10px 0px rgba(68, 68, 68, 0.05);
        color: #3e3a39;
        font-size: 20px;
        text-align: center;
        line-height: 75px;
    }
    position: relative;
    // padding-top: 50px;
    .downloadBtn {
        position: absolute;
        right: 25px;
        top: 20px;
        font-size: 14px;
        color: #999;
        padding-left: 20px;
        line-height: 20px;
        background: url('./asset/images/nod_xz.png') no-repeat left center;
        cursor: pointer;
        margin-bottom: 10px;
        border: none;
        &:hover {
            opacity: 0.7;
        }
    }
    .cmbl_con {
        font-size: 16px;
        line-height: 30px;
        margin-bottom: 10px;
    }
    .cmb_tit {
        font-size: 16px;
        line-height: 40px;
    }
    .cmbl_con {
        color: #666;
        font-size: 15px;
        line-height: 40px;
    }
    .cm_label {
        color: #666;
        font-size: 15px;
        line-height: 30px;
    }
}
.imgWrap {
    width: 180px;
    height: 180px;
    display: inline-block;
    img {
        height: 100%;
        width: 100%;
    }
}
.cmbr_con {
    display: flex;
    flex-direction: column;

    &.end {
        align-items: flex-end;
    }
}
.v3 {
    .cmbr_con {
        position: relative;
    }
    .cm_label {
        position: absolute;
        top: 73px;
        left: -25px;
    }
    .imgWrap {
        position: relative;
        z-index: 1;
    }
    .cmbl_con {
        line-height: 30px;
    }
}
</style>
