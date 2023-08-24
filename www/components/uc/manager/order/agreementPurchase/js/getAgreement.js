import '@/api/uc/api.OC2002.query-order-detail.js';
import '@/api/uc/api.BD3205.query-classids-list.js';
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
 *
 * @param {string | number} subVersion 协议子版本号，如：2
 * @param {string} serviceType 服务类型。N-不重读不退费；R-重读；F-退费
 * @returns {string | undefined} 返回协议地址
 */
let getV2AgreementTemplateUrl = (subVersion, serviceType) => {
    return v2AgreementUrlConstants[subVersion + serviceType];
};

export default {
    orderId: '',
    classId: '',
    $context: null,
    $orderInfoPromise: null,
    info: {},
    /**
     * 初始化对象
     *
     * @param {object} obj 初始化对象
     * @returns {object} 自身对象
     */
    init(obj) {
        this.$orderInfoPromise = null;
        this.$context = obj.context;
        this.orderId = obj.orderId ?? '';
        // this.classId = obj.classId ?? '';

        return this;
    },
    /**
     * 获取协议信息
     *
     * @param {string} classId 班级id
     * @param {string} className 班级名称
     * @returns {string} 协议地址或者协议内容
     */
    getAgreementInfo(classId, className) {
        if (this.orderId) {
            return this.queryAndFetchContractByOrderNumber(classId).then((content) => {
                return {
                    title: className,
                    content,
                };
            });
        } else {
            return this.queryAndFetchContractByClassId(classId).then((content) => {
                return {
                    title: className,
                    content,
                };
            });
        }
    },
    /**
     * 获取产生订单号的协议信息
     *
     * @param {string} classId 班级ID
     * @returns {string} 协议地址或者协议内容
     */
    queryAndFetchContractByOrderNumber(classId) {
        if (!this.$orderInfoPromise) {
            this.$orderInfoPromise = this.getOrderInfo();
        }

        return this.$orderInfoPromise.then((orderInfo) => {
            /* 从订单多个条目中，找到要展现协议正文的条目 */
            let info = {};
            if (orderInfo.orderItems && orderInfo.orderItems.length > 0) {
                for (let k = 0; k < orderInfo.orderItems.length; k++) {
                    if (classId == orderInfo.orderItems[k].skuId) {
                        info = orderInfo.orderItems[k];
                        break;
                    }
                }
            }
            /* 协议是否已被签收 */
            let isConfirmed = orderInfo.orderAgreement.agreementStatus === 'Y';
            /* 第二版协议的特征1：协议地址不为空，且匹配既定正则 */
            let isV2Agreement1 =
                null != info.orderitemService.orderitemAgreementurl && v2AgreementUrlMatchRegExp.test(info.orderitemService.orderitemAgreementurl);

            /* 第二版协议的特征2：协议地址为空，模板ID为空 */
            let isV2Agreement2 =
                (null == info.orderitemService.orderitemAgreementurl || '' == info.orderitemService.orderitemAgreementurl) &&
                null == info.orderitemService.orderitemAgreementtemplateid;
            let isV2Agreement = isV2Agreement1 || isV2Agreement2;
            let v2AgreementSubVersion = !isV2Agreement ? null : info.orderitemService.orderitemAgreementversion || 3;

            if (!isV2Agreement) {
                /* 为空，或其它取值，说明是第三版格式（本身就是第三版，或第二版清洗为第三版格式）的协议 */
                if (info.orderitemService.orderitemAgreementurl) {
                    let contractUrl = this.$context.$urlUtils.getViewUrl(
                        info.orderitemService.orderitemAgreementurl,
                        info.orderitemService.agreementFileToken || ''
                    );
                    return this.fetchContract(contractUrl, info);
                } else if (orderInfo.orderPaystatus == 'U' || orderInfo.orderPaystatus == 'P') {
                    // U:待付款;P:部分付款;A:已付款;M:多付款;F:不付款;
                    return this.queryAndFetchContract(
                        {
                            assemblyType: 'B',
                            classId: this.classId,
                            orderNo: this.orderId || '',
                        },
                        info
                    );
                } else if (
                    orderInfo.orderSubtype === 'REP' &&
                    orderInfo.classOrderSubType === 'YAN' &&
                    orderInfo.orderAgreement.agreementNeedconfirmstatus === 'Y' && // 需要确认协议
                    orderInfo.orderAgreement.agreementStatus === 'N' // 未确认协议
                ) {
                    // 延考续学
                    const data = {
                        atplId: info.orderitemService.orderitemAgreementtemplateid,
                        oldOrderNo: orderInfo.sourceOrderNo,
                        oldClassNames: orderInfo.sourceSkuName,
                        newOrderNo: orderInfo.orderNo,
                        newClassNames: info.skuName,
                        userName: '',
                        userIdcardtype: '',
                        userIdcardno: '',
                        userMobile: '',
                        signTime: '',
                        prewStatus: 'preview',
                    };
                    return this.$context
                        .$callApi('order/query-delay-study-argument', {
                            ...data,
                        })
                        .then((resp) => {
                            const data = resp.getData();
                            return fetchContract(this.$urlUtils.getViewUrl(data.filePath, data.fileKey));
                        });
                } else {
                    //协议模版，放到页面里
                    return this.queryAndFetchContract(
                        {
                            assemblyType: 'A',
                            classId,
                            orderNo: this.orderId,
                            atplId: info.orderitemService.orderitemAgreementtemplateid,
                            className: info.skuName,
                            classPrice: info.skuAmount / 100,
                            payType: '实付',
                            payPrice: info.oiAmount / 100,
                            classAserclause: info.orderitemService.orderitemAgreementclause, //补充条款
                            classCategory: info.classCategory, //班级类别(M:全科;S:单科)
                            subjectPay: info.subjectPay, //单科价格列表
                        },
                        info
                    );
                }
            } else {
                return this.fetchContract(
                    getV2AgreementTemplateUrl(v2AgreementSubVersion, info.orderitemService.orderitemServicetype),
                    info,
                    !isConfirmed
                        ? /* 尚未签署协议，原文展示模板内容 */
                          (content) => {
                              console.error('尚未填充正确的 所购课程、甲方信息');
                              let tmpObj = document.createElement('div');
                              tmpObj.innerHTML = content;
                              let obj = tmpObj.querySelector('.skuName');
                              obj && (obj.innerHTML = info.productName);
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
                              obj && (obj.innerHTML = info.productName);

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
        });
    },
    /**
     * 获取没有产生订单时的协议
     *
     * @param {string} classId 班级ID
     * @returns {Promise<string>} promise
     */
    queryAndFetchContractByClassId(classId) {
        return this.$context
            .$callApi('uc/query-classids-list', {
                classId,
            })
            .then((resp) => {
                const info = resp.getData();
                return this.queryAndFetchContract(
                    {
                        assemblyType: 'B',
                        classId,
                    },
                    info
                );
            })
            .catch((err) => {
                this.$context.$niceloo.api.handleFailure(err);
                return Promise.reject();
            });
    },

    /**
     * 获取订单详情
     *
     * @returns {Promise<string>} 协议内容
     */
    getOrderInfo() {
        return this.$context
            .$callApi('uc/query-order-detail', {
                orderNo: this.orderId,
            })
            .then((resp) => {
                let data = resp.getData();

                return data;
            });
    },

    /**
     * 查询并展现协议正文
     *
     * @param {object} payload 入参
     * @param {object} info 班级信息对象
     * @returns {Promise<string>} 协议内容
     */
    queryAndFetchContract(payload, info) {
        if (!payload) return Promise.reject();
        return this.$context
            .$callRawApi({
                api: 'bd/class/agreement/info',
                params: payload,
            })
            .then((resp) => {
                let data = resp.getData();

                if (data && data.filePath) {
                    let contractUrl = this.$context.$urlUtils.getViewUrl(data.filePath);
                    return this.fetchContract(contractUrl, info).then((content) => {
                        return this._showContractContent(content);
                    });
                } else {
                    return Promise.resolve(
                        this._showContractContent('<div style="color: #999999; text-align: center; padding: 20px;">未能获取到协议正文 [1]</div>')
                    );
                }
            })
            .catch((_failure) => {
                return Promise.resolve(
                    this._showContractContent(
                        '<div style="color: #999999; text-align: center; padding: 20px;">未能获取到协议正文 [' + _failure.getDescription() + ']</div>'
                    )
                );
            });
    },
    /**
     * 展现协议正文
     *
     * @param {string} [content] 协议正文 HTML
     * @returns {string} 协议正文
     */
    _showContractContent(content) {
        content = content || '';
        let reg = /(img{)\n\s+(width:100% !important;)\n(})/gim;
        return content.replace(reg, '');
    },
    /**
     * 根据给定的 url 加载并展现协议正文
     *
     * @param {string} url 协议URL
     * @param {object} info 班级对象
     * @param {Function} [transformer] 协议正文转换器
     * @returns {Promise<string>} 协议正文
     */
    fetchContract(url, info = {}, transformer) {
        if (info.orderitemService && !info.orderitemService.orderitemAgreementtemplateid) {
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

                resolve(content);
            };
            xhr.onerror = () => {
                reject('获取失败！');
            };
            xhr.open('GET', url);
            xhr.send();
        });
    },
};
