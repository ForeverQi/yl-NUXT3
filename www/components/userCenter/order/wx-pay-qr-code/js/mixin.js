import '@/api/mcu/api.MCU5005.ordering_receipts_payprecreate.js';
import '@/api/mcu/api.MCU5006.pc_trade_pay.js';
import '@/api/uc/api.PC0013.query-pay-status.js';
import '@/api/mcu/api.MCU5008.pc_cash_info.js';
import '@/api/mcu/api.MCU5009.ordering_studentorder_microclass_orderdetail_post.js';
import '@/api/mcu/api.MCU5001.ordering_orderapproval_apply_post.js';

export default {
    /**
     * 数据模型
     *
     * @returns {object} ret 数据模型
     */
    data() {
        return {
            paymodeCode: 'WX',
            tradeclientCode: 'YOULUWS',
            traderecordId: '',
        };
    },
    methods: {
        /**
         * 请求
         *
         * @param {string} url 地址
         * @param {object} params 参数
         * @returns {Promise} 数据模型
         */
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        /**
         * @param {string} tradeRecordFrontUrl 跳转地址
         * @param {string} orderNo 订单编号
         * @returns {Promise} 状态机
         */
        orderingReceiptsPayprecreate(tradeRecordFrontUrl = '', orderNo = '') {
            this.traderecordId = '';
            return this.requestWrapper('order/ordering_receipts_payprecreate', {
                tradeClientCode: this.tradeclientCode,
                orderNo: orderNo || this.orderNo,
                brandId: 'YOULU',
                sceneCode: 'PC',
                tradeRecordFrontUrl,
            }).then(({ traderecordId }) => {
                this.traderecordId = traderecordId;
            });
        },
        /**
         * @param {string} paymodeCode 支付类型编码
         * @returns {Promise} 发起支付
         */
        pcTradePay(paymodeCode = '') {
            // F:form表单跳转网关；
            // Q:二维码地址；
            // U:跳转URL地址打开支付；
            // D:支付参数调起支付控件；
            // R:重复发起;
            // pc/trade/pay
            return this.requestWrapper('order/pc_trade_pay', {
                traderecordId: this.traderecordId,
                paymodeCode: paymodeCode || this.paymodeCode,
                sceneCode: 'PC',
                traderecordNonceno: this.createRandomCode(),
            }).then(({ bizType, bizContent }) => {
                if (bizType === 'F') {
                    const blank = window.open('', '_blank');
                    setTimeout(
                        () => {
                            blank.document.body.innerHTML = bizContent;
                            blank.document.forms[0].acceptCharset = 'utf-8';
                            blank.document.forms[0].submit();
                        },
                        navigator.userAgent.includes('Firefox') ? 5e2 : 0
                    );
                } else if (bizType === 'Q') {
                    this.option.text = bizContent;
                }
            });
        },
        /**
         * @returns {number} 随机值
         */
        createRandomCode() {
            return Date.now();
        },
        /**
         *生成跳转地址
         *
         * @param {*} orderInfo 订单信息
         * @param {string} host 主机
         * @returns { string } 跳转地址
         */
        createRedirectUrl(orderInfo, host = '') {
            const productType = orderInfo.orderItems[0].productType;
            //  ProductType("ECLASS" "正价体验课商品")
            // ProductType("L”，"公开课课单");
            //  ProductType("DC" "资料
            //  ProductType("TC"，"训练营");
            //  ProductType("DRA"，"引流商品")
            //  ProductType("WK""微课商品")
            //  ProductType("ATI"，"活动商品");
            //  ProductType("CARD" "学习卡商品")
            let path;
            if (productType === 'ECLASS') {
                path = '/learningCenter/index/myCourse';
            } else if (productType === 'WK') {
                path = '/learningCenter/index/myTrialCourse';
            } else if (productType === 'ATI') {
                path = '/uc/manager/order/orderOther';
            } else if (productType === 'CARD') {
                path = '/learningCenter/index/myCourse';
            } else if (productType === 'TC') {
                path = '/uc/manager/order/orderOther';
            } else if (productType === 'DRA') {
                path = '/learningCenter/index/myCourse';
            } else {
                path = '/learningCenter/index/myCourse';
            }
            return `${host}${path}`;
        },
        /**
         * @returns {Promise} 订单信息
         */
        queryCashierInfo() {
            return this.requestWrapper('order/pc_cash_info', {
                traderecordId: this.tradeRecordIdMix || this.traderecordId,
            }).then(({ platformCode, traderecordOrdertradeno }) => {
                this.platformCode = platformCode;
                this.traderecordOrdertradeno = traderecordOrdertradeno;
            });
        },
        /**
         * @returns {Promise} 订单状态
         */
        queryPaySts() {
            return this.requestWrapper('uc/query-pay-status', {
                platformCode: this.platformCode,
                traderecordOrdertradeno: this.traderecordOrdertradeno,
            });
        },
        /**
         * 下单
         *
         * @returns {Promise} 订单信息
         */
        approvalApply() {
            const productType = this.order.orderItems[0].productType;
            const params = {
                brandId: 'YOULU',
                approvalAction: '',
                applyForm: '',
                orderInfo: {
                    orderSource: this.order.orderSource,
                    orderPlatformappcode: '',
                    orderBusinesstype: 'I',
                    orderTimeoutseconds: 1800,
                },
                orderItems: this.order.orderItems.map(({ productType, skuId }) => {
                    return {
                        productType,
                        skuId,
                        oiQuantity: 1,
                    };
                }),
            };
            if (productType === 'WK') {
                // 体验课
                params.approvalAction = 'ORDCRE';
                params.applyForm = JSON.stringify({
                    coType: 'WK',
                });
                params.orderInfo.orderPlatformappcode = 'YP.TRIALCLASS.WEB';
            } else if (productType === 'ECLASS') {
                // 正价体验课
                params.approvalAction = 'ORDCRE';
                params.applyForm = JSON.stringify({
                    coType: 'ECLASS',
                });
                params.orderInfo.orderPlatformappcode = 'PORTAL.WEB';
            }
            return this.requestWrapper('order/ordering_orderapproval_apply_post', params);
        },
    },
};
