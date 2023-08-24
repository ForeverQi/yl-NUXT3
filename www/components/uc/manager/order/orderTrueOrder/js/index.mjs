import agreementPurchase from '../../agreementPurchase/index.vue'; //购买协议
import defaultCourseImage from '../asset/images/default-course-pic.png';
import vbMask from '@/www/components/vbMask/index.vue';
import vbProvinceArea from '@/www/components/personalCenter/vbProvinceArea/vbProvinceArea/index.vue';
import IdCardCheck from '@/www/components/uc/manager/order/id-card-check/index.vue';
import IdCardPhone from '@/www/components/uc/manager/order/id-card-phone/index.vue';
// import User from '@/utils/user';
import { Validator } from '~/plugins/common/utils/validator.js';

import '@/api/uc/api.UC0206.query-order-rank-dict';
import '@/api/uc/api.UC0018.bind-user-identify';
import '@/api/uc/api.OC2012.confirm-userInfo';
import '@/api/uc/api.UC0031.quert-user-address-list';
import '@/api/uc/api.UC0028.add-shipping-address';
import '@/api/uc/api.OC2008.update-address';
import '@/api/uc/api.OC2003.confirm-agreement';
import '@/api/uc/api.OC2002.query-order-detail';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码
import '@/api/mc/api.MC0002.verify-sms-verifycode'; //确认验证码
import '@/api/etc/api..query-readingAgr-find-man-reading'; //是否具有强制弹出协议
import '@/api/uc/api..create-captcha.js';
let errors = {
    check: {
        required: '请勾选确认购买协议',
    },
    noticed: {
        required: '请阅读并勾选阅读须知',
    },
    payerRelationship: {
        required: '请填写付款人与本人关系',
    },
    userName: {
        required: '请输入正确的姓名',
        name: '请输入正确的姓名',
    },
    mobile: {
        required: '请输入正确的手机号码',
        mobile: '请输入正确的手机号码',
    },
    recvaddrName: {
        required: '请输入正确的姓名',
        name: '请输入正确的姓名',
    },
    idNum: {
        required: '请输入正确的证件号码',
        I: '请输入正确的证件号码',
        H: '请输入正确的证件号码',
        T: '请输入正确的证件号码',
        O: '请输入正确的证件号码',
    },
    area: {
        required: '请选择省市区',
    },
    address: {
        required: '请输入正确的地址',
        address: '长度限制范围为3到100之间',
    },
    verifyValue: {
        required: '请输入协议确认码',
        I: '协议确认码有误，请重新校验',
    },
    captchaValue: {
        required: '请输入图形确认码',
    },
};
let rules = {
    check: 'required',
    noticed: 'required',
    payerRelationship: 'required',
    userName: 'required|name',
    mobile: 'required|mobile',
    recvaddrName: 'required|name',
    idNum: 'required|I',
    area: 'required',
    address: 'required|address',
    verifyValue: 'required|I',
    captchaValue: 'required',
};
export default {
    name: '',
    components: {
        agreementPurchase,
        vbMask,
        vbProvinceArea,
    },
    filters: {
        orderitemStatus(val) {
            //订单项状态(ORIG:原班级;GEND:常规;REPD:已重读;CHAD:已转班;TRAD:已转让;DEFO:已顺开;DEFC:已顺关;CREF:已退费;OREF:已开退)
            let obj = {
                CHAD: '已转班',
                REPD: '已续学',
                TRAD: '已转班',
                CREF: '已退费',
                DEFC: '已休学',
                DEFO: '已休学',
            };
            return obj[val] || '';
        },
    },
    data() {
        return {
            /* 课程封面的默认图片 */
            defaultImg: defaultCourseImage,
            upIconTitle: '收起地址',
            readed: false,
            upIcon: true,
            recvaddrDefstatus: false, // 	收货地址默认状态
            noticed: false,
            /* 是否呈现本弹窗 */
            ifShowMe: false,
            changeArea: {}, //修改后的省市区
            paidDetails: {}, //订单详情信息
            choseItem: {}, //选中的订单信息
            userInfo: {}, //接口获取的用户信息
            changeUserInfo: {}, //页面修改的用户信息
            addressList: [], //收货地址信息
            defaultAddress: {},
            defaultArea: {},
            successArr: [false, false, false], //分别表示 协议接口成功 个人信息接口成功  地址接口成功
            idtypeList: [],
            postStatus: false,
            draweeList: [], //付款人信息
            drawee: 'OS', //默认本人
            payerRelationship: '', //预付款人关系
            /* 是否呈现协议正文弹窗 */
            ifShowAgreementDialogue: false,
            /* 协议正文弹窗 - 是否呈现 footer */
            agreementDialogue_ifShowFooter: true,
            dealList: [], //订单信息列表
            isSend: false, //是否发送短信验证码
            verifyValue: '', //验证码
            verifyToken: '', //校验凭证
            btnText: '获取确认码',
            tipMsg: '',
            placeholder: '请获取验证码并输入',
            seconds: 60,
            isVerify: false, //校验是否通过
            getInfo: {}, //用户信息
            isShowVerify: false,
            timer: null,
            loadingIntance: null,
            showIdCardFull: false,
            captchaValue: '', //图形确认码
            captchaToken: '', //图形确认码token
            imgSrc: '', //图形确认码src
        };
    },
    computed: {
        areaData() {
            let area = '';
            let isNoEmpty = Number(this.changeArea.provinceCode) && Number(this.changeArea.cityCode) && Number(this.changeArea.areaCode);
            if (isNoEmpty) {
                area = this.changeArea.provinceCode + this.changeArea.cityCode + this.changeArea.areaCode;
            } else {
                area = '';
            }
            return area;
        },
    },
    watch: {
        drawee() {
            this.payerRelationship = '';
        },
        'defaultAddress.recvaddrRegion'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
        'defaultAddress.recvaddrCity'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
        'defaultAddress.recvaddrProvince'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
        successArr: {
            deep: true,
            handler() {
                if (!this.successArr.includes(false)) {
                    //全部没ture表示3个接口都成功
                    this.$emit('success');
                    this.close();
                }
            },
        },
    },
    async mounted() {
        this.getInfo = (await this.$User.getUser()) || {};
        this.Validator = new Validator('orderForm', rules, errors);
        this.getAddressList();
        this.getIdTyes();
        this.getDrawee(); //付款人信息
        this.getCaptchaToken();
    },
    methods: {
        getIdTyes() {
            //获取证件类型
            if (sessionStorage.getItem('idcard')) {
                this.idtypeList = JSON.parse(sessionStorage.getItem('idcard'));
            } else {
                //获取证件类型
                this.$niceloo.api.call('uc/query-order-rank-dict', {
                    dicttype: 'idcard',
                    onsuccess: (data) => {
                        this.idtypeList = data.data || [];
                        if (data.data.length) {
                            sessionStorage.setItem('idcard', JSON.stringify(this.idtypeList));
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            }
        },
        getDrawee() {
            //获取收款人 列表
            if (sessionStorage.getItem('drawee')) {
                this.draweeList = JSON.parse(sessionStorage.getItem('drawee'));
            } else {
                //获取证件类型
                this.$niceloo.api.call('uc/query-order-rank-dict', {
                    dicttype: 'drawee',
                    onsuccess: (data) => {
                        this.draweeList = data.data || [];
                        if (data.data.length) {
                            sessionStorage.setItem('drawee', JSON.stringify(this.draweeList));
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            }
        },

        /**
         * 判断订单条目中是否存在要展示正文内容的第二版协议
         * @returns {Boolean}
         * @private
         */
        _ifHasContentDisplayingV2AgreementInPaidOrderItems() {
            return this.paidDetails.orderItems.some((item) => {
                if (item.orderitemOperation == 'CHAO') return false;

                let agreementUrl = !item.orderitemService ? '' : item.orderitemService.orderitemAgreementurl;
                return /.+\/[a-z]\.(?:htm|aspx)\?version=/i.test(agreementUrl);
            });
        },

        /**
         * 查询是否需要，并在需要时 强制阅读协议正文
         * @param {String} orderSubtype 订单类型
         * @param {String} agreementStatus 协议确认状态
         * @param {Object[]} orderItems 订单条目列表
         * @private
         */
        _tryToForceReadingAgreement(orderSubtype, agreementStatus, orderItems) {
            return new Promise((resolve, reject) => {
                if (null == orderItems || 0 === orderItems.length) {
                    reject();
                    return;
                }

                let forceReadingCtrlQueryingOrderItems = orderItems.filter((item) => {
                    return (
                        orderSubtype != 'REP' && //订单类型不为续学
                        agreementStatus === 'N' && //协议确认状态为未确认
                        item.orderValidstatus !== 'N' && //订单为有效
                        item.orderitemOperation !== 'CHAO' && //订单项操作类型不为转出
                        item.orderitemService &&
                        item.orderitemService.orderitemAgreementtype == 'E' && //电子协议
                        item.orderitemService.orderitemServicetype != 'B' && //协议类型不为无协议
                        item.orderitemStatus !== 'CHAD' && //订单状态不为已转班
                        item.orderitemStatus !== 'TRAD' && //不为已转让
                        item.orderitemStatus !== 'CREF' && //不为以退费
                        item.orderitemStatus !== 'DEFC' //不为已顺关
                    );
                });

                if (0 === forceReadingCtrlQueryingOrderItems.length) {
                    reject();
                    return;
                }

                /* 查询强制阅读配置。判断订单中是否有一个订单满足强制弹出协议 有的话全展示有效班级的协议 */
                this.$callApi('xieyiqueren/query-readingAgr-find-man-reading', {
                    aptReadingFindDtoList: forceReadingCtrlQueryingOrderItems.map((d) => {
                        return {
                            classId: d.skuId,
                            isOrderCenterPay: 0,
                        };
                    }),

                    onsuccess: (res) => {
                        let ifShowForceReading = res.bdFindManReadingResponses.some((i) => i.isAptReading === '1');
                        if (!ifShowForceReading) {
                            reject();
                            return;
                        }

                        this.dealList = forceReadingCtrlQueryingOrderItems;
                        this.ifShowAgreementDialogue = true;
                        this.agreementDialogue_ifShowFooter = true;

                        /* 接口返回的强制阅读控制 */
                        let seconds = Number(res.mandatoryReadingTime);
                        let isPullDown = res.downBottomReading === '1';
                        this.$nextTick(() => {
                            this.$refs.agreementPurchase.setUp({ seconds, isPullDown });
                            this.$refs.agreementPurchase.open(forceReadingCtrlQueryingOrderItems[0], this.choseItem.orderNo);
                        });

                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },

        showDialog() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: IdCardCheck,
                    },
                    {},
                    {
                        width: '360px',
                        radius: '10px',
                        padding: '0',
                        showHead: false,
                    }
                )
                .then((obj) => {
                    if (obj.ret.type === 'success') {
                        this.changeUserInfo.userIdcard = obj.ret.idCard;
                        this.showIdCardFull = true;
                    } else if (obj.ret.type === 'change') {
                        this.showDialogPhone();
                    }
                });
        },
        showDialogPhone() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: IdCardPhone,
                    },
                    {},
                    {
                        width: '360px',
                        radius: '10px',
                        padding: '0',
                        showHead: false,
                    }
                )
                .then((obj) => {
                    if (obj.ret.type === 'success') {
                        this.showIdCardFull = true;
                        this.changeUserInfo.userIdcard = obj.ret.idCard;
                    }
                });
        },

        /**
         * 展现产品购买协议
         * @param orderItem
         */
        showAgreement(orderItem) {
            console.log(1231231);

            /* 呈现协议确认弹窗 */
            this.dealList.push(orderItem);
            this.ifShowAgreementDialogue = true;

            /* 如果已经阅读过，则不需要重新提示用户再次确认 */
            this.agreementDialogue_ifShowFooter = false;

            this.$nextTick(() => {
                this.$refs.agreementPurchase.open(orderItem, this.choseItem.orderNo);
            });
        },

        /**
         * 提交确认的所有信息
         */
        checkAll() {
            this.loadingIntance = this.$baseUI.loading();
            //全部校验
            let param = {};
            //展示个人信息时且需要展示协议确认码时
            if (
                this.paidDetails.orderAgreement &&
                this.paidDetails.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                this.paidDetails.orderAgreement.agreementUserinfoconfirmstatus == 'N' &&
                this.isShowVerify
            ) {
                param = {
                    ...param,
                    verifyValue: this.verifyValue,
                };
            }
            //有协议的且不是重读订单的校验协议是否勾选
            if (
                this.paidDetails.orderSubtype != 'REP' &&
                this.paidDetails.orderAgreement &&
                this.paidDetails.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                this.paidDetails.orderAgreement.agreementStatus == 'N'
            ) {
                param = {
                    ...param,
                    check: this.readed,
                };
            }
            //需用完善信息的校验
            if (
                this.paidDetails.orderAgreement &&
                this.paidDetails.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                this.paidDetails.orderAgreement.agreementUserinfoconfirmstatus == 'N'
            ) {
                if (this.userInfo.userIdcardstatus != 'S') {
                    //未绑定过校验姓名，证件号
                    param = {
                        ...param,
                        idNum: this.changeUserInfo.userIdcard,
                        userName: this.changeUserInfo.userName,
                    };
                }
                param = {
                    ...param,
                    noticed: this.noticed,
                };
                if (this.drawee == 'OT' || this.drawee == 'OO') {
                    //付款人关系其他也要校验
                    param = {
                        ...param,
                        payerRelationship: this.payerRelationship,
                    };
                }
            }

            if (this.postStatus) {
                //有地址校验地址
                param = {
                    ...param,
                    area: this.areaData,

                    mobile: this.defaultAddress.recvaddrPhone,
                    address: this.defaultAddress.recvaddrAddress,
                    recvaddrName: this.defaultAddress.recvaddrName,
                };
            }
            console.log(param);
            this.Validator.validate(param)
                .then(() => {
                    this.toSubmit();
                })
                .catch((errorCb) => {
                    this.loadingIntance.close();
                    errorCb.showError(); //展示错误提示，如果只展示某个提示，传入对应的值errorCb.showError('name')
                });
        },
        singleCheck(param) {
            if (!this.Validator) {
                return;
            }
            this.Validator.validate(param)
                .then(() => {})
                .catch((errorCb) => {
                    let arr = Object.keys(param) || [];
                    if (arr.length > 0) {
                        errorCb.showError(arr[0]); //展示错误提示，如果只展示某个提示，传入对应的值errorCb.showError('name')
                    }
                });
        },
        changeRules() {
            //更改证件类型转换校验规则
            this.Validator.changeRules(
                { idNum: `required|${this.changeUserInfo.userIdcardtype}` }, //传入新的校验规则
                { idNum: this.changeUserInfo.userIdcard }
            ) //传入校验的key和value进行校验
                .then(() => {})
                .catch((errorCb) => {
                    errorCb.showError('idNum');
                });
        },
        choseAddress(item) {
            this.defaultAddress = { ...item };
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
            this.Validator.clear();
        },
        perfectUnserInfo() {
            //确认个人信息
            let _this = this;
            let confirmedOrderitemids = [];
            this.paidDetails.orderItems.forEach((val) => {
                if (val.orderitemStatus == 'GEND' || val.orderitemStatus === 'REPD' || val.orderitemStatus === 'CHAD') {
                    confirmedOrderitemids.push(val.oiId);
                }
            });

            this.$niceloo.api.call('uc/confirm-userInfo', {
                orderNo: this.paidDetails.orderNo,
                userinfoConfirmstatus: 'Y', //学员个人信息确认状态
                confirmedOrderitemids, //订单下班级Id列表
                orderPayer: _this.drawee, //付款人
                payerRelationship: _this.payerRelationship, //与付款人关系
                onsuccess: () => {
                    this.$User.updateUserInfo().then(() => {
                        _this.$emit('bindSuccess'); //true完善 false确认
                    });
                    _this.successArr[1] = true;
                    _this.successArr = [..._this.successArr];
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        getAddressList() {
            //获取地址列表
            this.$niceloo.api.call('uc/quert-user-address-list', {
                onsuccess: (data) => {
                    this.addressList = data.data || [];
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },

        getOrderPaidDetails() {
            //获取订单详情信息
            return new Promise((resolve, reject) => {
                this.postStatus = false;
                this.paidDetails = {};
                this.$niceloo.api.call('uc/query-order-detail', {
                    orderNo: this.choseItem.orderNo,
                    onsuccess: (data) => {
                        this.paidDetails = data || {};
                        //判断订单下有没有协议确认
                        if (this.paidDetails.orderAgreement.agreementNeedconfirmstatus === 'Y') {
                            this.isShowVerify = true;
                        } else {
                            this.isShowVerify = false;
                            this.Validator.changeRules({ verifyValue: '' });
                        }

                        /**
                         * 判断是否有需要强制阅读弹窗协议。
                         * 如果有，则先展现协议，后展现本弹窗；
                         * 如果没有，则直接展现本弹窗
                         */
                        this._tryToForceReadingAgreement(
                            this.paidDetails.orderSubtype,
                            this.paidDetails.orderAgreement.agreementStatus,
                            this.paidDetails.orderItems
                        )
                            .then(
                                () => {
                                    this.ifShowMe = false;
                                },
                                () => {
                                    this.ifShowMe = true;
                                }
                            )
                            .finally(() => {
                                this.loadingIntance.close();
                            });

                        let address = this.paidDetails.orderAddress || {};
                        //邮寄状态
                        if (this.paidDetails.orderAddressneedcompletestatus == 'Y') {
                            this.postStatus = true;
                            this.getAddressList();
                        }
                        this.defaultAddress = {
                            recvaddrName: address.oaName, //收货人姓名
                            recvaddrPhone: address.oaPhone, //练习电话
                            recvaddrAddress: address.oaAddress, //详细地址
                            provinceName: address.oaProvincename, //省名称
                            recvaddrProvince: address.oaProvince,
                            cityName: address.oaCityname, //市名称
                            recvaddrCity: address.oaCity,
                            regionName: address.oaDistrictname, //区名称
                            recvaddrRegion: address.oaDistrict,
                        };
                        resolve();
                    },
                    onerror: (err) => {
                        this.$niceloo.api.handleFailure(err);
                        this.loadingIntance.close();
                        reject();
                    },
                });
            });
        },
        toSubmit() {
            //确认订单信息
            this.successArr = [false, false, false];
            if (this.paidDetails.orderAgreement && this.paidDetails.orderAgreement.userinfoNeedconfirmstatus == 'Y') {
                //只有需要完善个人信息的订单才会走。有的订单不需要完善个人信息，而且这个用户也没有绑定个人信息
                if (this.userInfo.userIdcardstatus == 'S') {
                    //绑定过个人信息的
                    // this.orderConfire(); //订单协议确认
                    if (this.paidDetails.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                        //当这单没有确认过个人信息
                        // this.perfectUnserInfo(); //确认个人信息
                        this.orderConfire().then(() => {
                            this.perfectUnserInfo();
                        });
                    } else {
                        this.orderConfire();
                        this.successArr[1] = true;
                        this.successArr = [...this.successArr];
                    }
                } else {
                    this.bindUserInfo();
                }
            } else {
                this.orderConfire();
                this.successArr[1] = true;
                this.successArr = [...this.successArr];
            }

            //完善收货地址
            if (this.postStatus) {
                // 订单中心
                this.perfectUserAddress();
                // 是否新增地址
                // let isNewAddress = true

                // isNewAddress && this.addUcRecvaddr();
            } else {
                this.loadingIntance.close();
                this.successArr[2] = true;
                this.successArr = [...this.successArr];
            }
        },

        bindUserInfo() {
            //绑定个人信息 如果是完善，先调这个接口
            this.$niceloo.api.call('uc/bind-user-identify', {
                userIdcardtype: this.changeUserInfo.userIdcardtype,
                userIdcard: this.changeUserInfo.userIdcard,
                userName: this.changeUserInfo.userName,
                onsuccess: async () => {
                    this.perfectUnserInfo(function () {
                        this.$emit('bindSuccess', true); //首次认证成功
                    });
                    this.userInfo.userIdcardstatus = 'S'; //这里先手动修改下认证状态，以防订单确认失败导致还能继续认证。
                    let userInfo = await this.$User.getUser();
                    userInfo.userIdcardstatus = 'S';
                    this.$User.setUser(userInfo);
                    this.orderConfire(); //订单协议确认
                },
                onerror: (err) => {
                    this.loadingIntance.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },

        addUcRecvaddr() {
            // 个人中心添加收货地址
            this.$niceloo.api.call('uc/add-shipping-address', {
                recvaddrName: this.defaultAddress.recvaddrName, //姓名
                recvaddrPhone: this.defaultAddress.recvaddrPhone, //电话
                recvaddrProvince: this.changeArea.provinceCode, //省code
                recvaddrCity: this.changeArea.cityCode, //市code
                recvaddrRegion: this.changeArea.areaCode, //收货地址区
                recvaddrAddress: this.defaultAddress.recvaddrAddress, //详细地址
                recvaddrDefstatus: this.recvaddrDefstatus ? 'Y' : 'N', //	收货地址默认状态
                onsuccess: () => {
                    this.successArr[2] = true;
                    this.successArr = [...this.successArr];
                    this.loadingIntance.close();
                },
                onerror: (err) => {
                    this.loadingIntance.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        perfectUserAddress() {
            //订单中心完善地址信息
            this.$niceloo.api.call('uc/update-address', {
                orderNo: this.paidDetails.orderNo,
                orderAddress: {
                    oaName: this.defaultAddress.recvaddrName,
                    oaPhone: this.defaultAddress.recvaddrPhone,
                    oaProvince: this.changeArea.provinceCode,
                    oaCity: this.changeArea.cityCode,
                    oaDistrict: this.changeArea.areaCode,
                    oaAddress: this.defaultAddress.recvaddrAddress,
                },
                onsuccess: () => {
                    if (this.addressList.length) {
                        this.addressList.forEach((item) => {
                            if (
                                item.recvaddrName == this.defaultAddress.recvaddrName &&
                                item.recvaddrPhone == this.defaultAddress.recvaddrPhone &&
                                item.recvaddrAddress == this.defaultAddress.recvaddrAddress &&
                                item.recvaddrRegion == this.changeArea.areaCode &&
                                item.recvaddrCity == this.changeArea.cityCode &&
                                item.recvaddrProvince == this.changeArea.provinceCode
                            ) {
                                this.successArr[2] = true;
                                this.successArr = [...this.successArr];
                                this.loadingIntance.close();
                            } else {
                                this.addUcRecvaddr();
                            }
                        });
                    } else {
                        this.addUcRecvaddr();
                    }
                },
                onerror: (err) => {
                    this.loadingIntance.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        //确认订单协议接口
        orderConfire() {
            //如果这单是重读或者 不需要签协议，跳过
            if (
                this.paidDetails.orderSubtype == 'REP' ||
                (this.paidDetails.orderAgreement && this.paidDetails.orderAgreement.agreementNeedconfirmstatus == 'N')
            ) {
                this.successArr[0] = true;
                this.successArr = [...this.successArr];
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                this.$niceloo.api.call('uc/confirm-agreement', {
                    orderNo: this.choseItem.orderNo,
                    agreementStatus: 'Y',
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(() => {
                    this.successArr[0] = true;
                    this.successArr = [...this.successArr];
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    this.loadingIntance.close();
                });
        },

        areaChange(area) {
            this.changeArea = area || {};
            this.singleCheck({ area: this.areaData });
        },
        async open(item) {
            this.loadingIntance && this.loadingIntance.close();
            this.loadingIntance = this.$baseUI.loading();
            this.dealList = [];
            this.userInfo = (await this.$User.getUser()) || {};
            this.showIdCardFull = false;

            this.changeUserInfo = { ...this.userInfo };
            this.changeUserInfo.userIdcardtype = this.changeUserInfo.userIdcardtype || 'I';
            this.choseItem = item || {};
            await this.getOrderPaidDetails(); //获取订单详情i

            this.noticed = false;
            if (this.userInfo.userIdcardstatus !== 'S') {
                this.changeRules();
                this.changeUserInfo.userIdcard = '';
                this.changeUserInfo.userName = '';
                this.changeUserInfo.userIdcardtype = '';
            }

            setTimeout(() => {
                this.Validator.clear();

                // 已认证的用户不在验证身份证号和名称
                // debugger;
                if (this.userInfo.userIdcardstatus == 'S') {
                    this.Validator.changeRules({ idNum: '' });
                    this.Validator.changeRules({ name: '' });
                }
            });
        },
        close() {
            this.readed = false;
            this.seconds = 60;
            this.isSend = false;
            this.btnText = '获取确认码';
            this.defaultAddress = {};
            this.defaultArea = {};
            this.changeArea = {};
            this.upIconTitle = '收起地址';
            this.upIcon = true;
            this.recvaddrDefstatus = false;
            this.paidDetails = {};
            this.choseItems = {};
            this.userInfos = {};
            this.changeUserInfos = {};
            this.addressLists = [];
            this.successArr = [false, false, false];
            this.captchaValue = '';
            this.verifyValue = '';
            this.drawee = 'OS';
            this.payerRelationship = '';
            clearTimeout(this.timer);
            this.$nextTick(() => {
                this.ifShowMe = false;
                this.getCaptchaToken();
            });
        },
        readerFun() {
            let vm = this;
            vm.readed = !vm.readed;
            this.singleCheck({ check: this.readed });
        },
        upIconFun() {
            let vm = this;
            vm.upIcon = !vm.upIcon;
            if (vm.upIcon) {
                vm.upIconTitle = '收起地址';
            } else {
                vm.upIconTitle = '查看地址';
            }
        },

        /**
         * 事件监听器 - 协议正文被确认
         */
        onAgreementConfirmed() {
            this.onCloseAgreementDialogue();

            this.readed = true;
            this.singleCheck({ check: this.readed });
        },

        /**
         * 事件监听器 - 协议正文弹窗被关闭
         */
        onCloseAgreementDialogue() {
            this.ifShowMe = true;
            this.ifShowAgreementDialogue = false;
            this.agreementDialogue_ifShowFooter = false;

            this.dealList = [];
        },

        //获取验证码
        getMsgCode() {
            if (this.isSend) return;
            this.Validator.clear();
            this.isSend = true;
            let param = {
                captchaValue: this.captchaValue,
            };
            this.Validator.validate(param)
                .then(() => {
                    let params = {
                        smstplNo: '010005',
                        scene: 'xieyiqueren',
                        captchaData: {
                            captchaToken: this.captchaToken,
                            captchaValue: this.captchaValue,
                        },
                    };
                    this.$callRawApi({
                        api: 'mc/msg/sms/verifycode/send/vx',
                        params,
                    })
                        .then(() => {
                            this.isVerify = false;
                            this.countDown();
                        })
                        .catch((err) => {
                            this.isSend = false;
                            if (err.getCode().includes('GB2009')) {
                                this.$baseUI.alert('图形验证码有误，请重新输入');
                            } else {
                                this.$niceloo.api.handleFailure(err);
                            }
                            this.captchaValue = '';
                            this.getCaptchaToken();
                        });
                })
                .catch((errorCb) => {
                    this.isSend = false;
                    errorCb.showError('captchaValue');
                });
        },
        //校验验证码
        verifyMsgCode() {
            if (this.verifyValue) {
                this.$callApi('xieyiqueren/verify-sms-verifycode', {
                    verifyScene: 'xieyiqueren',
                    verifyValue: this.verifyValue,
                    onsuccess: (res) => {
                        this.verifyToken = res.verifyToken;
                        this.isVerify = true;
                        this.Validator.changeRules({ verifyValue: 'required' });
                    },
                    onerror: (err) => {
                        this.Validator.changeRules({ verifyValue: 'required|I' });
                        this.$niceloo.api.handleFailure(err);
                    },
                    oncomplete: () => {},
                });
            }
        },
        countDown() {
            this.isSend = true;
            this.placeholder = '请输入确认码';
            this.seconds--;
            this.btnText = this.seconds + '秒后重新发送';
            let regStr = this.getInfo.userMobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
            this.tipMsg = `确认码将发送至${regStr}，请注意查收`;
            if (this.seconds == 0) {
                this.btnText = '获取确认码';
                this.seconds = 60;
                this.captchaValue = '';
                this.isSend = false;
                this.getCaptchaToken();
                return;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 120, // 验证码宽度
                captchaHeight: 30, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.captchaToken = data.captchaToken;
                    this.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
