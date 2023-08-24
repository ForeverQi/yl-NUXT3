<template>
    <div class="order-confirm-wrapper">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div class="notice-wrapper" v-if="isShowNotice">
            <div class="notice-content">
                <img src="./asset/images/notice.png" width="20" height="20" class="icon" />
                声明：优路教师从未授权任何形式的个人代收费行为，有奖举报电话：010-51653988
                <button class="close" @click="handleCloseClick"></button>
            </div>
        </div>
        <div class="order-pay-wrapper">
            <div class="pay-title" v-if="orderNo && isBeforeOrder === false">
                <span class="pay-title-item">订单编号：</span>
                <span class="pay-title-value">{{ order.orderNo }}</span>
                <span class="pay-title-item pay-title-item-date">订单日期：</span>
                <span class="pay-title-value">{{ order.orderCreateddate }}</span>
                <span class="stench"></span>
                <div class="pay-title-timer-value-wrapper" v-if="isCancel" style="color: #666">订单已取消</div>
                <div class="pay-title-timer-value-wrapper" v-else-if="isTimeout" style="color: #666">订单已超时</div>
                <div class="pay-title-timer-value-wrapper" v-else-if="isNeedTimer">
                    <template v-if="hour > 0 || minute > 0 || second > 0">
                        <span class="pay-title-timer">剩余支付时间</span>
                        <template v-if="hour > 0">
                            <span class="pay-title-timer-value">{{ hour }}</span>
                            :
                        </template>
                        <span class="pay-title-timer-value">{{ minute }}</span>
                        :
                        <span class="pay-title-timer-value">{{ second }}</span>
                    </template>
                    <span v-else style="color: #666">订单已超时</span>
                </div>
                <div class="pay-title-timer-value-wrapper" v-else>待支付</div>
            </div>
            <div class="pay-content">
                <img src="./asset/images/flag.png" class="flag flag-course" />
                <h4 class="pay-content-title">已选课程</h4>
                <ul class="course-list">
                    <li class="course-item" v-for="item in order.orderItems" :key="item.oiId">
                        {{ item.skuName }}
                        <span class="course-price">¥{{ parseFloat(item.skuAmount / 100) }}</span>
                    </li>
                </ul>
                <div class="show-more" v-if="showCourseMore" @click="showCourseMore = false">
                    <div class="txt">查看全部</div>
                </div>
                <template v-if="postStatus">
                    <img src="./asset/images/flag.png" class="flag flag-order" />

                    <h4 class="pay-content-title pay-order-title">
                        <div class="add-address" @click="addAddress()" v-if="isBeforeOrder === false && false">新增收货地址</div>
                        收货地址
                        <p class="order-title-tip">为确保能收到配套学习资料，请务必准确填写您的收货地址</p>
                    </h4>
                    <div class="address-list" :class="{ hidden: showMore }">
                        <div class="address-item add" @click="addAddress()" v-if="isBeforeOrder === true">
                            <img src="./asset/images/address.png" />
                            <div class="txt">添加收货地址</div>
                        </div>
                        <div
                            class="address-item show"
                            :class="{ this: selectId === order.orderAddress.recvaddrId }"
                            @click="selectId = order.orderAddress.recvaddrId"
                            v-if="order.orderAddress && order.orderAddress.oaName"
                        >
                            <img src="./asset/images/active.png" class="select" />
                            <div class="phone">
                                <span class="name">{{ order.orderAddress.oaName }}</span>
                                <span class="mobile">{{ order.orderAddress.oaPhone }}</span>
                                <!-- <span class="mask" v-if="item.recvaddrDefstatus === 'Y'">默认</span> -->
                            </div>
                            <div class="address-txt">
                                {{ order.orderAddress.oaProvincename }}{{ order.orderAddress.oaCityname }}{{ order.orderAddress.oaDistrictname
                                }}{{ order.orderAddress.oaAddress }}
                            </div>
                            <div class="edit">
                                <img src="./asset/images/edit.png" @click="addAddress(order.orderAddress)" />
                            </div>
                        </div>
                        <div
                            class="address-item show"
                            :class="{ this: selectId === item.recvaddrId }"
                            @click="selectId = item.recvaddrId"
                            v-for="item in addressList"
                            :key="item.recvaddrId"
                        >
                            <img src="./asset/images/active.png" class="select" />
                            <div class="phone">
                                <span class="name">{{ item.recvaddrName }}</span>
                                <span class="mobile">{{ item.recvaddrPhone }}</span>
                                <span class="mask" v-if="item.recvaddrDefstatus === 'Y'">默认</span>
                            </div>
                            <div class="address-txt">{{ item.provinceName }}{{ item.cityName }}{{ item.regionName }}{{ item.recvaddrAddress }}</div>
                            <div class="edit">
                                <img src="./asset/images/edit.png" @click="addAddress(item)" />
                            </div>
                        </div>
                    </div>
                    <div class="show-more" v-if="showMore" @click="showMore = false">
                        <div class="txt">查看全部</div>
                    </div>
                </template>
                <img src="./asset/images/flag.png" class="flag flag-pay" />
                <h4 class="pay-content-title pay-way-title">支付方式</h4>
                <ul class="way-list">
                    <li
                        class="way-item"
                        :class="{
                            'way-item-active': item.active && isPayDisabled === false,
                        }"
                        v-for="item in wayList"
                        :key="item.code"
                        @click="handleWayClick(item)"
                        :disabled="isPayDisabled"
                    >
                        <img class="icon" :src="item.icon" width="28" height="28" />
                        {{ item.name }}支付
                        <img class="active-status" src="./asset/images/active-disabled.png" width="29" height="25" v-if="isPayDisabled && item.active" />
                        <img class="active-status" src="./asset/images/active.png" width="29" height="25" v-else-if="item.active" />
                    </li>
                </ul>

                <img src="./asset/images/flag.png" class="flag flag-order" />
                <h4 class="pay-content-title pay-order-title">订单信息</h4>
                <template v-if="isBeforeOrder === true">
                    <div class="product-info">
                        <div class="product-info-item">
                            商品数量：
                            <span class="product-info-item-value">{{ order.orderItems.length }}</span>
                        </div>
                        <div class="product-info-item">
                            优惠券：
                            <span class="product-info-item-value">无可用</span>
                        </div>
                        <div class="product-info-item">
                            商品总价：
                            <span class="product-info-item-value product-info-item-value-amount">￥{{ parseFloat(totalPrice / 100) }}</span>
                        </div>
                    </div>
                </template>
                <template v-if="isBeforeOrder === false">
                    <div class="product-info">
                        <div class="product-info-item">
                            商品数量：
                            <span class="product-info-item-value">{{ order.orderItems.length }}</span>
                        </div>
                        <div class="product-info-item">
                            商品总价：
                            <span class="product-info-item-value">￥{{ parseFloat(totalPrice / 100) }}</span>
                        </div>
                        <div class="product-info-item">
                            优惠金额：
                            <span class="product-info-item-value">
                                {{ (order.orderDiscountamount || orderDiscountamount) > 0 ? '- ' : '' }}¥&nbsp;{{
                                    (order.orderDiscountamount || orderDiscountamount) | veMoneyCent
                                }}
                            </span>
                        </div>
                        <div class="product-info-item bt">
                            实付金额：
                            <span class="product-info-item-value product-info-item-value-amount">¥&nbsp;{{ order.orderTotalamount | veMoneyCent }}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="pay-summary">
            <div class="pay-summary-content">
                <div class="pay-summary-label">
                    实付金额：
                    <span class="pay-summary-value">￥{{ parseFloat(order.orderTotalamount / 100) }}</span>
                    <span class="preferential" v-if="orderDiscountamount">
                        优惠
                        <span class="value">￥{{ parseFloat(orderDiscountamount / 100) }}</span>
                    </span>
                </div>
                <!-- handlePay -->
                <button class="pay-summary-pay" :disabled="isPayDisabled" @click="orderApply">{{ orderNo ? '立即支付' : '提交订单' }}</button>
            </div>
        </div>
        <!-- 添加收货地址弹框 -->
        <edit-address ref="editAddress" @saveAddress="saveAddress" @editAddress="editAddress" @change="getAddressList" />
        <!-- 公共底部 -->
        <global-footer />
        <wx-pay-qr-code :show.sync="isShowPayWx" :order-no="orderNo" :amount="order.orderTotalamount" @success="handlePaySuccess" @re-buy="handleReBuyClick" />
        <ali-pay-tip :show.sync="isShowPayAli" :order-no="orderNo" @success="handlePaySuccess" @change="handlePayChange" />
    </div>
</template>
<script>
import editAddress from './components/edit-address/index.vue';
import GlobalHeader from '@/layouts/components/global-header/index.vue';
import GlobalFooter from '@/layouts/components/global-footer/index.vue';
import WxPayQrCode from '@/www/components/userCenter/order/wx-pay-qr-code/index.vue';
import AliPayTip from '@/www/components/userCenter/order/ali-pay-tip/index.vue';
import '@/api/order/api..query-other-order-detail.js';
import '@/api/uc/api.BD3205.query-classids-list';
import '@/api/uc/api.BD1005.bd-recvaddr-list';
import '@/api/etc/api..query-readingAgr-find-man-reading';
import '@/api/uc/api.BD1002.bd-recvaddr-add';
import '@/api/api..query-address-list.js';
import '@/api/uc/api.BD1003.bd-recvaddr-edit';
import '@/api/uc/api.OC2007.apply-pay-order';
import '@/api/uc/api.OC2008.update-address';
import PayMix from '@/www/components/userCenter/order/wx-pay-qr-code/js/mixin.js';
import TimerMix from '@/www/components/userCenter/order/wx-pay-qr-code/js/timer.js';

export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        WxPayQrCode,
        AliPayTip,
        editAddress,
    },
    mixins: [PayMix, TimerMix],
    layout: 'nullLayout',
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            isShowNotice: true,
            showCourseMore: false,
            postStatus: false,
            selectId: '',
            order: {
                orderId: '',
                orderPayamount: '',
                orderPaystatus: '',
                orderSource: '',
                orderStatus: '',
                orderType: '',
                orderNo: '',
                orderTotalamount: 0,
                orderPayamount: 0,
                orderItems: [],
                orderTimeexpire: '',
                orderCreateddate: '',
            },
            showMore: false,
            isBeforeOrder: false, // 订单创建前
            addressList: [],
            wayList: [
                {
                    icon: require('./asset/images/wx.png'),
                    code: 'WX',
                    name: '微信',
                    active: true,
                },
                {
                    icon: require('./asset/images/zfb.png'),
                    code: 'ALIPAY',
                    name: '支付宝',
                    active: false,
                },
            ],

            Config: this.$nuxt.context.env.config,
            userAddress: [],
            dealList: [],

            isShowPayWx: false,
            orderNo: '',
            isShowPayAli: false,
            timerCardType: ['ATI', 'WK', 'CARD', 'TC', 'DRA'],
        };
    },
    /**
     * @returns {object} html header
     */
    head() {
        return this.$head({
            title: '订单确认页',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    computed: {
        /**
         * @returns {number} 优惠金额
         */
        orderDiscountamount() {
            return this.totalPrice - this.order.orderTotalamount;
        },
        /**
         * 是否禁用支付
         *
         * @returns {boolean} 支付
         */
        isPayDisabled() {
            if (this.order.orderStatus !== '' && this.order.orderStatus !== 'CRE') {
                return true;
            } else if (this.order.orderItems.length > 0 && this.timerCardType.includes(this.order.orderItems[0].productType) && this.timerSeconds <= 0) {
                return true;
            }
            return false;
        },
        /**
         * 是否取消
         *
         * @returns {boolean} 是否取消
         */
        isCancel() {
            return this.order.orderStatus === 'CAN';
        },
        /**
         * 是否超时
         *
         * @returns {boolean} 是否超时
         */
        isTimeout() {
            return this.order.orderStatus === 'EXP';
        },
        /**
         * 总价
         *
         * @returns {number} 总价
         */
        totalPrice() {
            return this.order.orderItems.reduceRight((acc, next) => {
                return acc + next.skuAmount;
            }, 0);
        },
    },
    watch: {
        /**
         *
         * @param {boolean} val 微信支付显示状态
         */
        isShowPayWx(val) {
            if (val === false && this.isBeforeOrder === true) {
                this.$PageUtil.replaceUrl(`/uc/manager/order/orderOther/confirm/${this.orderNo}`);
            }
        },
    },
    /**
     * 获取详情
     */
    mounted() {
        const { orderNo } = this.$route.params;
        this.orderNo = orderNo;
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        if (typeof ylPlugin !== 'undefined') {
            ylPlugin.login.getUser().then((userData) => {
                if (userData) {
                    this.getDetail();
                } else {
                    this.$router.push('/');
                }
            });
        } else {
            this.getDetail();
        }
    },
    /**
     * 销毁定时器
     */
    beforeDestroy() {
        clearInterval(this.timerHandler);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },
    methods: {
        /**
         *
         * @param {object} item 地址信息
         */
        addAddress(item = null) {
            if (!item && this.addressList.length >= 30) {
                this.$baseUI.alert('最多只能添加30个收货地址，已达上限喽！');
                return;
            }
            this.$refs.editAddress.open(item);
        },
        /**
         * 显隐回调
         */
        handleVisibilityChange() {
            if (document.visibilityState === 'visible') {
                this.getDetail();
            }
        },
        /**
         * 关闭回调
         */
        handleCloseClick() {
            this.isShowNotice = false;
        },
        /**
         * 获取地址列表
         */
        getAddressList() {
            this.requestWrapper('uc/query-address-list', {}).then((res) => {
                console.log('@@111', this.isBeforeOrder, this.order);
                if (this.isBeforeOrder === true || (this.isBeforeOrder === false && (!this.order.addAddress || !this.order.addAddress.oaName))) {
                    // 下单好的订单过滤地址
                    res.data.forEach((r) => {
                        if (r.recvaddrDefstatus === 'Y') {
                            this.selectId = r.recvaddrId;
                        }
                    });
                    if (!this.selectId) {
                        this.selectId = res.data[0].recvaddrId;
                    }
                }
                this.addressList = res.data;
                // 订单里面已经选择了地址
                let len = 3;
                if (this.order.orderAddress && this.order.orderAddress.oaName) {
                    len = 2;
                }
                if (this.addressList.length > len) {
                    this.showMore = true;
                }
            });
        },
        /**
         * 获取详情
         *
         * @param {Function} cb 回调
         */
        getDetail(cb) {
            if (this.isBeforeOrder === true || !this.orderNo) {
                this.isBeforeOrder = true;
                this.listClassids();
                return;
            }
            this.isBeforeOrder = false;
            this.requestWrapper('order/query-other-order-detail', {
                orderNo: this.orderNo,
            })
                .then((res) => {
                    console.warn(res);
                    if (!res) {
                        return this.$router.push('/');
                    }
                    Object.assign(this.order, res);

                    if (this.order.orderStatus === 'PAI') {
                        this.$router.push({
                            path: this.createRedirectUrl(this.order),
                        });
                    } else if (this.isNeedTimer && this.isTimerEnable) {
                        this.timerSeconds = parseInt((Date.parse(this.order.orderTimeexpire) - Date.now()) / 1000);
                        this.startTimer();
                    }
                    this.showCourseMore = this.order.orderItems.length > 5;
                    let learnCard = false;
                    for (let i = 0; i < res.orderItems.length; i++) {
                        if (res.orderItems[i].productType === 'CARD') {
                            learnCard = true;
                        }
                        if (res.orderItems[i].sendstatus === 'Y' || res.orderItems[i].goodsStatus === 'Y') {
                            this.postStatus = true;

                            // 学习卡订单不显示地址
                            if (learnCard === true) {
                                this.postStatus = false;
                            }
                            console.log('@@111');
                            if (this.postStatus) {
                                this.order.orderAddress = {
                                    ...this.order.orderAddress,
                                    recvaddrId: '',
                                    recvaddrName: this.order.orderAddress.oaName,
                                    recvaddrPhone: this.order.orderAddress.oaPhone,
                                    recvaddrAddress: this.order.orderAddress.oaAddress,
                                    recvaddrRegion: this.order.orderAddress.oaDistrict,
                                    recvaddrCity: this.order.orderAddress.oaCity,
                                    recvaddrProvince: this.order.orderAddress.oaProvince,
                                };
                            }
                            // this.getAddressList(); //有需要邮寄的班级再去查接口
                            break;
                        }
                    }
                    if (cb) {
                        cb();
                    }
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        /**
         * 根据cookie中的班级标识获取班级信息
         */
        async listClassids() {
            const isLogin = await ylPlugin.login.isLogined();
            if (!isLogin) {
                this.$User.toLogin();
                return;
            }
            let User = await this.$User.getUser();
            let classId = this.$cookieUtil.get(User.userId + this.Config.env + 'orderClasscom.niceloo3.0.h5');
            this.postStatus = false;
            if (!classId) {
                return;
            }

            this.$niceloo.api.call('uc/query-classids-list', {
                classId,
                onsuccess: (data) => {
                    this.classList = data.classes || [];
                    if (this.classList.length > 0) {
                        //只要一个班级有协议，订单就展示协议
                        for (let i = 0; i < this.classList.length; i++) {
                            if (
                                this.classList[i].classAtype == 'E' &&
                                (this.classList[i].classAsertype == 'R' ||
                                    this.classList[i].classAsertype == 'F' ||
                                    this.classList[i].classAsertype == 'N' ||
                                    this.classList[i].classAsertype == 'U' ||
                                    this.classList[i].classAsertype == 'K')
                            ) {
                                this.hasAgreement = true;
                            }
                        }
                        for (let i = 0; i < this.classList.length; i++) {
                            if (this.classList[i].postStatus) {
                                this.postStatus = true;
                                this.getAddressList(); //有需要邮寄的班级再去查接口
                                break;
                            }
                        }
                    }
                    this.order.orderItems = [];
                    let tmp = [];
                    let orderDiscountamount = 0;
                    let totalAmount = 0;
                    this.classList.forEach((item) => {
                        tmp.push({
                            ...item,
                            skuName: item.className,
                            skuAmount: item.classStdprice,
                            productType: '',
                            companyCode: item.companyCode,
                        });
                        totalAmount += item.classStdprice;
                        if (item.hasDiscount && item.classPrice) {
                            orderDiscountamount += item.classStdprice - item.classPrice;
                        }
                    });

                    this.$set(this.order, 'orderItems', tmp);
                    this.$set(this.order, 'orderStatus', '');
                    this.$set(this.order, 'orderTotalamount', totalAmount - orderDiscountamount);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },

        /**
         *
         * @param {object} data 班级后的订单地址
         * @param {Function} fn 回调方法
         */
        editAddressOrder(data, fn) {
            this.$niceloo.api.call('uc/update-address', {
                orderNo: this.orderNo,
                orderAddress: {
                    oaName: data.recvaddrName,
                    oaPhone: data.recvaddrPhone,
                    oaProvince: data.recvaddrProvince,
                    oaCity: data.recvaddrCity,
                    oaDistrict: data.recvaddrRegion,
                    oaAddress: data.recvaddrAddress,
                },
                onsuccess: () => {
                    fn && fn();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 添加的收货地址
         *
         * @param {object} data 地址信息
         */
        saveAddress(data) {
            this.$niceloo.api.call('bd/bd-recvaddr-add', {
                ...data,
                onsuccess: () => {
                    this.$refs.editAddress.close();
                    this.getAddressList();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 编辑地址信息
         *
         * @param {object} data 编辑地址信息
         */
        editAddress(data) {
            //修改地址
            if (data.oaName) {
                //订单系统系统地址
                this.editAddressOrder(data, () => {
                    this.$refs.editAddress.close();
                    this.getDetail();
                });
            } else {
                this.$niceloo.api.call('bd/bd-recvaddr-edit', {
                    ...data,
                    onsuccess: () => {
                        this.$refs.editAddress.close();
                        this.getAddressList();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
        /**
         * 判断是否有强制阅读协议
         *
         * @param {Array} classLists 班级列表
         */
        judgeDeal(classLists) {
            let aptReadingFindDtoList = [];
            let effectClass = [];
            //直接添加到购物车购买
            if (!this.orderNo) {
                classLists.forEach((item) => {
                    //判断订单是否有效 是否是转出订单 电子协议且有协议
                    if (
                        item.orderValidstatus !== 'N' &&
                        item.orderitemOperation !== 'CHAO' &&
                        item.classAtype == 'E' &&
                        (item.classAsertype == 'R' ||
                            item.classAsertype == 'F' ||
                            item.classAsertype == 'U' ||
                            item.classAsertype == 'N' ||
                            item.classAsertype == 'K')
                    ) {
                        let obj = {
                            classId: item.classId,
                            isOrderCenterPay: 0,
                        };
                        aptReadingFindDtoList.push(obj);
                        effectClass.push(item);
                    }
                });
            } else {
                //待付款 通过订单号
                classLists.forEach((item) => {
                    //判断订单是否有效 是否是转出订单 订单类型不属于退费 协议类型为电子协议 订单项服务类型编码不为无协议
                    if (
                        item.orderValidstatus !== 'N' &&
                        item.orderitemOperation !== 'CHAO' &&
                        this.paidDetails.orderSubtype != 'REP' &&
                        item.orderitemService.orderitemAgreementtype == 'E' &&
                        item.orderitemService.orderitemServicetype != 'B'
                    ) {
                        let obj = {
                            classId: item.skuId,
                            isOrderCenterPay: 0,
                        };
                        aptReadingFindDtoList.push(obj);
                        effectClass.push(item);
                    }
                });
            }

            this.$callApi('xieyiqueren/query-readingAgr-find-man-reading', {
                aptReadingFindDtoList,
                onsuccess: (res) => {
                    // this.dealList = res.bdFindManReadingResponses.filter((classItem) => {
                    //     return classLists.some((i) => (i.classId === classItem.classId || i.skuId === classItem.classId) && classItem.isAptReading === '1');
                    // });
                    //判断订单中是否有一个订单满足强制弹出协议 有的话全展示有效班级的协议
                    let flag = res.bdFindManReadingResponses.some((i) => i.isAptReading === '1');
                    if (flag) {
                        this.dealList = effectClass;
                    } else {
                        effectClass = [];
                    }
                    if (this.dealList.length) {
                        //将班级id存入session
                        let arr = [];
                        this.dealList.forEach((item) => {
                            arr.push(item.classId);
                        });
                        this.setSession(arr);
                        //是否有强制知弹出协议
                        this.showFooter = true;
                        this.hasAgreement = true;
                        this.isShow = true;
                        let seconds = Number(res.mandatoryReadingTime);
                        let isPullDown = res.downBottomReading === '1';
                        this.$refs.agreementPurchase.setUp({ seconds, isPullDown });
                        this.$nextTick(() => {
                            this.$refs.agreementPurchase.open(classLists[0]);
                        });
                    }
                },
            });
        },

        /**
         *
         * @param {Array} arr 班级信息
         */
        setSession(arr) {
            let sessionArr = JSON.parse(sessionStorage.getItem('classIds')) || [];
            if (sessionArr.length) {
                let arrAry = new Set([...sessionArr, ...arr]);
                sessionStorage.setItem('classIds', JSON.stringify(Array.from(arrAry)));
            } else {
                sessionStorage.setItem('classIds', JSON.stringify(arr));
            }
        },
        /**
         * 获取班级信息
         *
         * @returns {Array} 班级ID列表
         */
        getSession() {
            return JSON.parse(sessionStorage.getItem('classIds')) || [];
        },
        /**
         * 获取收货地址列表
         */
        getUserAddress() {
            this.$niceloo.api.call('bd/bd-recvaddr-list', {
                onsuccess: (result) => {
                    let midAddress = {};
                    if (this.userAddress.length > 0) {
                        this.userAddress.forEach((val) => {
                            if (val.active) {
                                midAddress = val;
                            }
                        });
                    }
                    this.userAddress = result.data || [];
                    if (this.userAddress.length > 0) {
                        this.userAddress.forEach((val) => {
                            this.$set(val, 'active', false);
                        });
                        if (!this.orderNo) {
                            this.userAddress[0].active = true;
                        } else if (!this.paidDetails.orderAddress.oaName) {
                            this.userAddress[0].active = true;
                        }
                        this.userAddress.forEach((val) => {
                            if (val.recvaddrSourceid == midAddress.recvaddrSourceid) {
                                this.choseAddress(val);
                                // val.active = true;
                            }
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 点击支付方式
         *
         * @param {object} item 支付方式
         */
        handleWayClick(item) {
            if (this.isPayDisabled) {
                return;
            }
            this.wayList.forEach((itm) => (itm.active = itm === item));
        },
        /**
         * 支付
         */
        handlePay() {
            const p = this.wayList.find(({ active }) => active);
            if (!p) {
                return;
            }
            this.isShowPayAli = false;
            this.isShowPayWx = false;

            let courseName = [];
            this.order.orderItems.forEach((item) => {
                courseName.push(item.skuName);
            });
            this.$yiguan.track('youlu_wk_pay', {
                course_name: '-',
                class_name: courseName.join(','),
                project_id: '-',
                subject_id: '-',
                course_type: '-',
                order_type: '流量订单',
                payable_price: this.order.orderTotalamount / 100 + '',
                pay_type: p.code === 'WX' ? '微信' : '支付宝',
                page_type: '-',
                page_name: '-',
            });
            if (p.code === 'WX') {
                this.isShowPayWx = true;
            } else if (p.code === 'ALIPAY') {
                this.orderingReceiptsPayprecreate(this.createRedirectUrl(this.order, location.origin))
                    .then(() => {
                        return this.pcTradePay('ALIPAY');
                    })
                    .then(() => {
                        this.isShowPayAli = true;
                    });
            }
        },
        /**
         * 支付成功
         */
        handlePaySuccess() {
            this.$router.push({
                path: this.createRedirectUrl(this.order),
            });
        },
        /**
         * 更换支付方式
         */
        handlePayChange() {
            this.wayList.forEach((itm) => (itm.active = itm.code === 'WX'));
            this.getDetail(() => {
                if (this.isPayDisabled) {
                    this.$Message.error('该订单已失效');
                } else {
                    this.handlePay();
                }
            });
        },
        /**
         * 从新下单
         *
         * @param {string} orderNo 订单号码
         */
        handleReBuyClick(orderNo) {
            this.orderNo = orderNo;
            const url = location.href.replace(/[\d\w]+$/, orderNo);
            history.replaceState(null, null, url);
            this.getDetail();
        },
        /**
         * 定时器结束回调
         */
        timerStopCb() {
            console.warn('定时器结束回调');
            this.getDetail();
        },
        /**
         * 确认订单
         */
        async orderApply() {
            if (this.orderNo) {
                if (this.postStatus && this.selectId) {
                    let orderAddress = {};
                    this.addressList.forEach((val) => {
                        if (val.recvaddrId === this.selectId) {
                            orderAddress = val;
                        }
                    });
                    if (!orderAddress.recvaddrPhone) {
                        this.$baseUI.alert('请设置您的收货地址');
                        return;
                    }
                    this.editAddressOrder(orderAddress, () => {
                        this.handlePay();
                    });
                } else {
                    this.handlePay();
                }
            } else {
                let user = await this.$User.getUser();
                // 判断支付主体
                let companyCode = '';
                for (let index = 0; index < this.order.orderItems.length; index++) {
                    if (companyCode && this.order.orderItems[index].companyCode != companyCode) {
                        this.zhutiWindow = true;
                        return;
                    } else {
                        companyCode = this.order.orderItems[index].companyCode;
                    }
                }

                //组合班级列表
                let orderItems = [];
                this.order.orderItems.forEach((val) => {
                    let obj = {
                        skuId: val.classId,
                        productType: val.classtypeType === 'PEC' ? 'ECLASS' : 'CLASS',
                        // oiAmount:val.classStdprice,
                        oiQuantity: 1,
                        giftItems: [],
                    };
                    if (val.giveClasses && val.giveClasses.length > 0) {
                        val.giveClasses.forEach((v) => {
                            obj.giftItems.push({
                                skuId: v.classId,
                                productType: 'CLASS',
                                // oiAmount:val.classStdprice,
                                oiQuantity: 1,
                                giftType: 'B', ////B:标准赠课;Y:营销赠课;K:跨项目赠课
                            });
                        });
                    }
                    orderItems.push(obj);
                });

                //拼接收货地址
                let orderAddress = {};
                if (this.postStatus) {
                    this.addressList.forEach((val) => {
                        if (val.recvaddrId === this.selectId) {
                            orderAddress = {
                                oaName: val.recvaddrName,
                                oaPhone: val.recvaddrPhone,
                                oaProvince: val.recvaddrProvince,
                                oaCity: val.recvaddrCity,
                                oaDistrict: val.recvaddrRegion,
                                oaAddress: val.recvaddrAddress,
                            };
                        }
                    });
                    if (!orderAddress.oaName) {
                        this.$baseUI.alert('请选择填写收货地址！');
                        return;
                    }
                }

                const isTrial = this.order.orderItems.some(({ classtypeType }) => classtypeType === 'PEC');

                const params = {
                    brandId: 'YOULU',
                    userId: user.userId,
                    approvalAction: isTrial ? 'ORDCRE' : 'SUB', //审批动作	String	是				SUB:网站和app下单适用;OLO:电商下单适用
                    orderInfo: {
                        orderSource: 'YP',
                        orderEntryterminal: 'PC',
                        orderBusinesstype: 'I',
                        coupons: [],
                        orderPlatformappcode: 'PORTAL.WEB',
                    }, //订单信息	Map	是				"orderInfo":{ "orderSource":"",//OP:运营平台;OA:运营App;YP:优路平台;YA:优路App;TM:天猫;JD:京东;DA:分销联盟 "orderEntryterminal":"string",//订单表订单录入终端(Android:Android;IOS:IOS;PC:PC) "orderBusinesstype":"订单业务类型",//O:组织/企业;M:组织成员;I:个人; "orderMemo":"订单备注", "orderRelatedorderno":"关联订单标识",//关联订单标识：如子订单关联的主订单标识 }
                    orderItems, //商品信息	List	是
                    orderAddress, //地址	Map	否
                };
                if (isTrial) {
                    params.applyForm = JSON.stringify({ coType: 'ECLASS' });
                }

                let courseName = [];
                this.order.orderItems.forEach((item) => {
                    courseName.push(item.className);
                });
                // this.$yiguan.track('youlu_submit_order', {
                //     course_name: '-',
                //     class_name: courseName.join(','),
                //     project_id: '-',
                //     subject_id: '-',
                //     course_type: '-',
                //     order_type: '-',
                //     order_price: this.totalPrice + '',
                //     payable_price: this.order.orderTotalamount / 100,
                //     pay_type: p.code === 'WX' ? '微信' : '支付宝',
                //     page_type: '流量订单',
                //     page_name: '-',
                // });

                this.$niceloo.api.call('uc/apply-pay-order', {
                    ...params,
                    onsuccess: (res) => {
                        if (res) {
                            //有订单号就下单
                            this.orderNo = res;
                            this.handlePay();
                            // this.$PageUtil.replaceUrl(`/uc/manager/order/orderOther/confirm/${res}`);
                        }
                    },
                    onerror: (data) => {
                        let msg = data.getDescription();
                        if (data.getCode().split('-')[1] == '3001' && msg === '主班级必须是同一项目的') {
                            this.isShowPop = true;
                        } else if (data.getCode().split('-')[1] == '3001' && msg.indexOf('已提交订单') > -1) {
                            this.$baseUI
                                .confirm({
                                    title: '提示',
                                    content: msg.split('已提交订单')[0].replace('班级', '您选中的班级') + '已购买，无需重复购买，去学习吧！',
                                    showCancel: true,
                                    cancelText: '取消',
                                    confirmText: '去学习',
                                })
                                .then(() => {
                                    this.$router.push('/learningCenter/index');
                                });
                        } else {
                            this.$baseUI.alert(msg);
                        }
                    },
                });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.add-address {
    float: right;
    color: #3a3d4b;
    font-size: 15px;
    line-height: 21px;
    background-image: url(./asset/images/plus.png);
    background-repeat: no-repeat;
    background-size: 17px 17px;
    background-position: left center;
    padding-left: 26px;
    cursor: pointer;
}
.address-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;

    &.hidden {
        overflow: hidden;
        height: 116px;
    }
    .address-item {
        width: 330px;
        height: 116px;
        background: #ffffff;
        border: 1px solid #d6dce5;
        border-radius: 6px;
        margin-right: 22px;
        margin-bottom: 10px;
        box-sizing: border-box;
        position: relative;
        .select {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            width: 32px;
            height: 32px;
        }
        &.this {
            border-color: #f8323c;

            .select {
                display: block;
            }
        }

        .mask {
            color: #f8323c;
            width: 40px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            display: inline-block;
            background: #fff3f3;
            border-radius: 2px;
        }

        &:nth-child(3n) {
            margin-right: 0;
        }

        &.show {
            padding: 12px 16px;
            .phone {
                font-size: 16px;
                .name {
                    font-weight: bold;
                }
                .mobile {
                    font-weight: bold;
                }
            }

            .edit {
                padding-top: 6px;
                text-align: right;
                height: 16px;
                cursor: pointer;

                img {
                    height: 100%;
                }
            }

            .address-txt {
                padding-top: 12px;
                max-height: 50px;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 2;
                font-size: 14px;
                color: #53586c;
            }
        }

        &.add {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-style: dashed;
            cursor: pointer;

            img {
                width: 44px;
                height: 44px;
            }
            .txt {
                font-size: 16px;
                color: #53586c;
                line-height: 22px;
            }
        }
    }
}
.show-more {
    padding-top: 20px;
    .txt {
        width: 56px;
        padding-right: 16px;
        font-size: 14px;
        color: #8d90aa;
        line-height: 16px;
        margin: 0 auto;
        background-image: url('./asset/images/up.png');
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 9px 5px;
        cursor: pointer;
    }
}
.notice-wrapper {
    background: #fff3f3;
    height: 40px;

    .notice-content {
        width: 1100px;
        color: #f8323c;
        font-size: 15px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 40px;
        position: relative;
        .icon {
            margin-right: 10px;
        }
        .close {
            background-image: url(./asset/images/close.png);
            background-size: 20px 20px;
            outline: none;
            border: none;
            cursor: pointer;
            position: absolute;
            width: 20px;
            height: 20px;
            right: 0;
            top: 10px;
        }
    }
}

.pay-content {
    padding: 36px 32px 40px;
}

.order-pay-wrapper {
    width: 1100px;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 43px;
    background-color: white;
    .pay-title {
        height: 40px;
        background: #f0f1f6;
        border-radius: 4px;
        padding-left: 32px;
        padding-right: 32px;
        font-size: 14px;
        display: flex;
        align-items: center;
        .pay-title-item {
            color: #77798d;
        }

        .pay-title-value {
            color: #99a1af;
            margin-left: 6px;
        }

        .pay-title-item-date {
            margin-left: 64px;
        }

        .stench {
            flex: 1;
        }

        .pay-title-timer {
            color: #666666;
            line-height: 19px;
            margin-right: 14px;
        }

        .pay-title-timer-value {
            background: #fff3f3;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            line-height: 1;
            padding: 4px;
            display: inline-block;
        }
        .pay-title-timer-value-wrapper {
            color: #f8323c;
        }
    }

    .pay-content {
        .pay-content-title {
            font-weight: bold;
            font-size: 16px;
            color: #3a3d4b;
            line-height: 21px;
        }
        .course-list {
            margin-top: 20px;
            font-size: 14px;
            color: #3a3d4b;
            .course-item {
                height: 50px;
                background: #f9f9f9;
                border-radius: 6px;
                padding-left: 24px;
                padding-right: 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .course-price {
                    font-size: 12px;
                    color: #9698a2;
                }
            }

            .course-item:nth-child(n + 2) {
                margin-top: 16px;
            }
        }
        .pay-way-title {
            margin-top: 40px;
        }
        .way-list {
            margin-top: 20px;
            border-radius: 6px;
            padding: 24px 30px;
            display: flex;
            .way-item {
                width: 200px;
                height: 52px;
                background: #ffffff;
                border: 1px solid #dddddd;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                position: relative;
                cursor: pointer;
                .icon {
                    margin-right: 10px;
                }
                .active-status {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }

            .way-item-active {
                border: 1px solid #f8323c;
            }

            .way-item:nth-child(n + 2) {
                margin-left: 20px;
            }

            .way-item[disabled] {
                cursor: not-allowed;
            }
        }

        .pay-order-title {
            margin-top: 16px;

            .order-title-tip {
                display: inline-block;
                line-height: 24px;
                color: #f8323c;
                font-size: 12px;
            }
        }

        .product-info {
            margin-top: 20px;
            background: #f9f9f9;
            border-radius: 6px;
            padding: 21px 32px 20px 24px;
            .product-info-item {
                font-size: 14px;
                color: #77798d;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &.bt {
                    border-top: 0.5px solid #ddd;
                    padding-top: 16px;
                    margin: 0 -32px 0 -24px;
                    padding-left: 24px;
                    padding-right: 32px;
                }
                .product-info-item-value {
                    font-size: 16px;
                    color: #3a3d4b;
                    line-height: 21px;
                }
                .product-info-item-value-amount {
                    color: #f8323c;
                }
            }
            .product-info-item:nth-child(n + 2) {
                margin-top: 16px;
            }
        }

        .flag {
            width: 4px;
            height: 19px;
            float: left;
            margin-left: -32px;
        }

        .flag-pay {
            margin-top: 40px;
        }

        .flag-order {
            margin-top: 16px;
        }
    }
}

.pay-summary {
    height: 80px;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    .pay-summary-content {
        width: 1100px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: space-between;
        .pay-summary-label {
            font-size: 18px;
            font-weight: 700;
            color: #333333;
            line-height: 24px;

            .preferential {
                color: #3a3d4b;
                font-size: 14px;
                margin-left: 25px;

                .value {
                    color: #f8323c;
                    font-size: 16px;
                }
            }
        }
        .pay-summary-value {
            font-size: 24px;
            font-weight: 700;
            color: #f8323c;
            line-height: 31px;
        }
        .pay-summary-pay {
            cursor: pointer;
            border: none;
            outline: none;
            border-radius: 4px;
            font-size: 18px;
            font-weight: 700;
            color: white;
            line-height: 27px;
            background-image: url(./asset/images/bg.png);
            width: 140px;
            height: 46px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .pay-summary-pay[disabled] {
            cursor: not-allowed;
            background-image: none;
            background-color: lightgray;
        }
    }
}
</style>
