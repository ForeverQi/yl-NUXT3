<template>
    <!-- 已付款正常订单详情 -->
    <div class="ucIndex">
        <div class="indexCont clearfix">
            <!--<div class="navigationWrap">
                <vb-navigation action="我的订单"></vb-navigation>
            </div>-->
            <div class="contentWrap">
                <order-details-title :order-type-text="'正常订单'" :paid-details="paidDetails" />
                <div class="detailsWrap">
                    <div class="lassLists">
                        <div v-for="item in paidDetails.orderItems" :key="item.a" class="listWrap">
                            <div class="classNames">
                                <div class="leftW">
                                    <div class="classImg">
                                        <img
                                            :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg"
                                            @error="onImgError"
                                        />
                                    </div>
                                    <div class="classCont">
                                        <div class="className">{{ item.skuName }}</div>
                                        <div class="classPrice">
                                            <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                            <span class="price">
                                                实付：
                                                <span class="red">¥{{ item.oiAmount | veMoneyCent }}</span>
                                            </span>
                                            <span class="price" v-if="paidDetails.orderSubtype === 'TRA'">
                                                转入：
                                                <span class="red">¥{{ item.intoAmount | veMoneyCent }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="contRight">
                                    <div class="payAgreementW">
                                        <span class="payAgreement" @click="argumentsOpen(item)" v-show="item.isShowPurchaseAgreement">《产品购买协议》</span>
                                    </div>
                                    <div>
                                        <div
                                            class="payType"
                                            v-if="item.isShowItemStatus"
                                            :class="{
                                                zhuanban: item.orderitemStatus == 'CHAD',
                                                yanqi: item.orderitemStatus == 'DEFC' || item.orderitemStatus == 'DEFO',
                                                zhuanrang: item.orderitemStatus == 'TRAD' || item.orderitemStatus == 'REPD',
                                            }"
                                        >
                                            {{ item.orderItemStatusAlias }}
                                        </div>
                                        <div class="zhuanrang" v-else-if="item.isShowZhuanRang">
                                            {{ item.orderitemService.orderitemAfterserviceappliedinfo }}
                                        </div>
                                        <orderPaidDetailsServe
                                            v-else-if="item.isShowPaidDetailsServe"
                                            :server-list="item.orderitemService.orderitemAfterservices"
                                            :paid-details="item"
                                        ></orderPaidDetailsServe>
                                    </div>
                                </div>
                            </div>
                            <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                <li class="addTit">赠送：</li>
                                <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 新需求  隐藏收货信息 -->
                <div class="addressWrap" v-if="postStatus && false">
                    <div class="receiveTitle">收货信息</div>
                    <div class="receiveInformation">
                        <span class="infoName">{{ paidDetails.orderAddress.oaName }}</span>
                        <span class="infoName">{{ paidDetails.orderAddress.oaPhone }}</span>
                        <span class="infoName">
                            {{
                                paidDetails.orderAddress.oaProvincename +
                                paidDetails.orderAddress.oaCityname +
                                paidDetails.orderAddress.oaDistrictname +
                                paidDetails.orderAddress.oaAddress
                            }}
                        </span>
                    </div>
                </div>

                <div class="addressWrap">
                    <div class="receiveTitle">支付信息</div>
                    <div class="receiveInformation receiveInformationPay">
                        <span class="infoName">原价：¥{{ paidDetails.orderTotalamount | veMoneyCent }}</span>
                        <span class="infoName">优惠金额：¥{{ paidDetails.orderDiscountamount | veMoneyCent }}</span>
                        <span class="infoName" v-if="paidDetails.orderSubtype === 'TRA'">
                            转入金额：
                            <span class="red">¥{{ paidDetails.coIntoamount | veMoneyCent }}</span>
                        </span>
                        <span class="infoName">
                            实付金额：
                            <span class="red">¥{{ paidDetails.orderPayamount | veMoneyCent }}</span>
                        </span>
                        <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                    </div>
                </div>
                <!-- <div class="invoce" :class="{ selfLearn: hasInvoice || isInvoiced }" v-show="showSelfLearn" @click="doApplySelfLearn()">自助续学</div> -->
                <div class="invoce" v-show="hasInvoice" @click="applyInvoice()">申请电子发票</div>
                <div class="invoceDone" v-show="isInvoiced">已申请电子发票</div>
            </div>
        </div>
        <!-- 购买协议 -->
        <agreement-purchase
            ref="agreementPurchase"
            :is-show-footer="false"
            :show="isShow"
            :deal-lists="dealLists"
            @close-fn="closeFn"
            @confirm-fn="confirmFn"
        />
        <!-- 分批自助续学选择班级 -->
        <template v-if="showSelectClass">
            <apply-select-class :title="`请选择办理续学的班级`" :order-course-list="propListClass" @do-close="doNext" :show="true" />
        </template>
        <!-- 自助续学办理须知 -->
        <template v-if="showApplyIntro">
            <apply-intro :setting-id="settingId" @do-close="doStartApplySelfLearn" :show="true" />
        </template>
        <!-- 错误弹窗 -->
        <template v-if="showAlert">
            <apply-alert :show="true" @do-close="closeAlert">
                <div class="msg-content">抱歉！该订单/班级暂不支持自助申请续学，请联系服务老师进行人工办理。</div>
            </apply-alert>
        </template>
    </div>
</template>
<script>
import ApplyAlert from '@/www/components/order/components/applyAlert'; // 弹窗
import orderDetailsTitle from '@/www/components/uc/manager/order/orderDetailsTitle';
import agreementPurchase from '@/www/components/uc/manager/order/agreementPurchase'; // 购买协议
import orderPaidDetailsServe from '@/www/components/uc/manager/order/orderPaidDetailsServe'; // 售后服务
import ApplySelectClass from '@/www/components/order/components/applySelectClass'; // 分批办理选择班级
import ApplyIntro from '@/www/components/order/components/applyIntro'; // 办理须知

import '@/api/selfLearn/api.self-learn-001.check-order-self-learn-status.js';

import '@/api/uc/api.OC2002.query-order-detail';
import '@/api/selfLearn/api..query-project-area.js';
import '@/api/selfLearn/api..query-next-class.js';
/**
 * 自助续学
 * 1、判断是否展示自助学习按钮   ---- 1
 * 点击自助续学按钮
 * 0、没有续学的班级 直接提示不能办理   ---1
 * 1、是否同批次办理
 * 1.1 分批办理条件  ---
 *  1、服务期次不同
 *  2、项目周期不同
 *  3、班级状态不同
 *  4、承诺类型不同
 * 1.2同批次办理
 *  除了1.1的情况其他都可以同批次办理
 */
export default {
    name: 'orderPaidDetails',
    components: {
        agreementPurchase,
        orderPaidDetailsServe,
        orderDetailsTitle,
        ApplySelectClass, // 分批办理选择班级
        ApplyIntro, // 办理须知
        ApplyAlert,
    },
    data() {
        return {
            paidDetails: {
                orderId: '',
                orderNo: '',
                orderCreateddate: '',
            },
            postStatus: false,
            hasInvoice: true,
            isInvoiced: false,
            // (ORIG:原班级;
            // GEND:常规;
            // REPD:已重读;
            // CHAD:已转班;
            // TRAD:已转让;
            // DEFO:已顺开;
            // DEFC:已顺关;
            // CREF:已退费;
            // OREF:已开退)
            orderItemStatus: {
                CHAD: '已转班',
                REPD: '已续学',
                TRAD: '已转班',
                CREF: '已退费',
                DEFC: '已休学',
                DEFO: '已休学',
            },
            defaultImg: require('./asset/images/default-course-pic.png'),
            isShow: false,
            dealLists: [],

            showSelfLearn: false, // 是否展示续学安纳
            showApplyIntro: false, // 展示续学须知
            showSelectClass: false, // 显示选班弹窗
            showSelectSubject: false, // 显示选择科目弹窗
            showAlert: false, // 弹窗内容
            classList: [], // 办理续学班级的列表
            curClassInfo: {}, // 当前办理续学班级
            areaMap: {}, // 大区信息
            nextClassList: [], // 下期续学班级
            settingId: '', // 配置ID

            newClassList: [],
            propListClass: [], // 分批办理数据
        };
    },
    mounted() {
        this.getOrderPaidDetails();
    },
    methods: {
        doNext(list = []) {
            this.showSelectClass = false;
            if (list.length > 0) {
                this.settingId = list[0].settingId;
                this.showApplyIntro = true;
                this.newClassList = list;
            }
        },
        // 申请电子发票
        applyInvoice() {
            this.$router.push({
                path: '/invoiceExplain',
                query: {
                    orderId: this.paidDetails.orderNo,
                    TOKEN: this.$User.getToken(),
                },
            });
        },
        // 获取订单详情信息
        getOrderPaidDetails() {
            this.$niceloo.api.call('uc/query-order-detail', {
                orderNo: this.$route.query.orderNo,
                onsuccess: (data) => {
                    const arr = Object.keys(this.orderItemStatus);
                    for (const item of data.orderItems) {
                        item.isShowDetail = !item.orderitemService.orderitemAgreementtemplateid && item.orderitemService.orderitemServicetype !== 'B';
                        item.isShowPurchaseAgreement = item.orderitemService && item.orderitemService.showClassAserStatus === 'Y';
                        item.orderItemStatusAlias = this.orderItemStatus[item.orderitemStatus];
                        item.isShowZhuanRang =
                            data.orderValidstatus == 'Y' &&
                            item.orderitemService.orderitemAfterservices &&
                            item.orderitemService.orderitemAfterservices.length == 0 &&
                            item.orderitemService.orderitemAfterserviceappliedinfo;
                        item.isShowItemStatus = arr.includes(item.orderitemStatus);
                        item.isShowPaidDetailsServe =
                            data.orderValidstatus == 'Y' &&
                            item.orderitemService.orderitemAfterservices &&
                            item.orderitemService.orderitemAfterservices.length > 0;

                        item.orderitemPictureurl = this.$urlUtils.getViewUrl(item.orderitemPictureurl);
                    }

                    this.paidDetails = Object.assign({}, data);
                    this.hasInvoice =
                        this.paidDetails.orderValidstatus === 'Y' &&
                        this.paidDetails.orderInvoicecouldapplystatus === 'Y' &&
                        this.paidDetails.orderInvoiceapplystatus === 'N';
                    this.isInvoiced =
                        this.paidDetails.orderValidstatus === 'Y' &&
                        this.paidDetails.orderInvoicecouldapplystatus === 'N' &&
                        this.paidDetails.orderInvoiceapplystatus === 'Y';
                    if (this.paidDetails.orderAddressneedcompletestatus === 'Y') {
                        this.postStatus = true;
                    }

                    // 获取是否展示续学按钮
                    // this.$User.getUser().then((user) => {
                    //     this.querySelfLearnBtn(user, data);
                    // });
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        querySelfLearnBtn(user, orderInfo) {
            let classIds = [];
            let mapClassId = {};
            orderInfo.orderItems.forEach((r) => {
                if (r.orderitemStatus === 'GEND') {
                    classIds.push(r.skuId);
                    mapClassId[r.skuId] = r;
                }
            });
            let s = [
                {
                    studentclassOrderno: orderInfo.orderNo,
                    userId: user.userId,
                    classIds: classIds.toString(),
                },
            ];
            let params = {
                selfLearnApplyCheckVo: JSON.stringify(s),
            };
            this.$callApi('selfLearn/check-order-self-learn-status', {
                ...params,
                onsuccess: (res) => {
                    if (Array.isArray(res) && res.length > 0) {
                        this.classList = res[0].classList.map((r) => {
                            let item = mapClassId[r.classId];
                            // r.projectId = item.projectId;
                            // r.projectName = item.projectName;
                            r.orderitemStatus = item.orderitemStatus;
                            return r;
                        });

                        this.showSelfLearn = res[0][orderInfo.orderNo] === 'Y';
                    } else {
                        this.showSelfLearn = false;
                    }
                },
            });
        },
        getNextClassInfo(areaInfo, classList) {
            // 获取当前班级是否又下期班级
            // 获取大区
            let classIds = [];
            classList.forEach((r) => {
                classIds.push(r.classId);
            });
            let params = {
                classDptId: areaInfo.dptId,
                classIds: classIds.toString(),
            };
            return this.$callApi('selfLearn/query-next-class', {
                ...params,
            })
                .then((res) => {
                    let ret = res.getData();
                    return ret;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getArea(param) {
            // 获取大区
            let params = {
                userProjects: JSON.stringify(param),
            };
            return this.$callApi('selfLearn/query-project-area', {
                ...params,
            }).then((res) => {
                let ret = res.getData();
                if (Array.isArray(ret.list) && ret.list.length > 0) {
                    this.areaMap[param[0].projectId] = ret.list[0];
                } else {
                    return null;
                }
            });
        },
        doApplySelfLearn() {
            let map = {};
            this.$User
                .getUser()
                .then((user) => {
                    let s = [];
                    this.classList.forEach((r) => {
                        if (map[r.projectId]) {
                            map[r.projectId].classList.push(r);
                            return;
                        }
                        map[r.projectId] = {
                            classList: [r],
                        };
                        s.push({
                            userId: user.userId,
                            projectId: r.projectId,
                        });
                    });

                    return s;
                })
                .then((res) => {
                    return Promise.all(
                        res.map((r) => {
                            return this.getArea([r]);
                        })
                    );
                })
                .then(() => {
                    return Promise.all(
                        Object.keys(this.areaMap).map((r) => {
                            return this.getNextClassInfo(this.areaMap[r], map[r].classList).then((res) => {
                                let nextClassMap = {};
                                res.forEach((rs) => {
                                    nextClassMap[rs.oriClassId] = rs;
                                });
                                map[r].classList.forEach((r) => {
                                    this.$set(r, 'hasNextClass', !!nextClassMap[r.classId] && nextClassMap[r.classId].nextProuctStatus); // 是否有下一期的班级
                                    if (nextClassMap[r.classId] && nextClassMap[r.classId].nextProuctStatus) {
                                        // 存储下一期班级
                                        this.$set(r, 'nextClass', nextClassMap[r.classId]); // 是否有下一期的班级
                                    } else {
                                        this.$set(r, 'nextClass', null); // 是否又下一期的班级
                                    }
                                });
                            });
                        })
                    );
                })
                .then(() => {
                    // 判断是否需要分批
                    if (this.classList.length === 1) {
                        // 只有一个班级的并且又下期续学班级的走正常办理
                        let curClassInfo = this.classList[0];
                        if (curClassInfo.hasNextClass === false) {
                            // 不能存在下期续学班级
                            this.showAlert = true;
                        } else {
                            // 存在时
                            this.settingId = this.classList[0].settingId;
                            this.showApplyIntro = true;
                        }
                    } else {
                        // 多个班级的时候
                        /**
                         * 1、服务期次不同
                         * 2、项目周期不同
                         * 3、承诺类型不同
                         */
                        let map = {};
                        this.classList.forEach((r) => {
                            if (r.hasNextClass === false) {
                                // 没有下期班级不处理
                                return;
                            }
                            // let k = r.serviceCount + '' + r.nextClass.pypYear + r.nextClass.pypSeq + r.nextClass.classAsertype + r.orderitemStatus;
                            let k = r.serviceCount + '' + r.examservYear + r.examservSeq + r.nextClass.classAserschemo;
                            if (map[k]) {
                                map[k].classList.push(r);
                            } else {
                                map[k] = {
                                    ...r,
                                    classList: [r],
                                };
                            }
                        });
                        let keys = Object.keys(map);
                        if (keys.length === 1) {
                            // 存在时
                            this.settingId = map[keys[0]].settingId;
                            this.newClassList = map[keys[0]].classList;
                            this.showApplyIntro = true;
                        } else if (keys.length === 0) {
                            // 所有班级都没有关联续学班级
                            this.showAlert = true;
                        } else {
                            this.showSelectClass = true;
                            let list = [];
                            keys.forEach((r) => {
                                list.push(map[r]);
                            });
                            this.propListClass = list;
                        }
                    }
                });
        },
        doStartApplySelfLearn(check, info) {
            // 开始填写学习内容
            this.showApplyIntro = false;
            if (check === true) {
                // 点击底部按钮关闭
                let areaInfo = {
                    dptId: '',
                };
                let curClassInfo = {};
                let applyType = 'N'; // 正常申请:N;分批次申请:B;
                let classList = [];
                if (this.classList.length === 1) {
                    curClassInfo = this.classList[0];
                    classList = this.classList;
                    areaInfo = this.areaMap[curClassInfo.projectId];
                } else {
                    curClassInfo = this.newClassList[0];
                    classList = this.newClassList;
                    areaInfo = this.areaMap[curClassInfo.projectId];
                }

                this.$router.push({
                    name: 'selfLearnSelectSubject',
                    query: {
                        orderId: this.$route.query.orderId,
                    },
                    params: {
                        courseList: classList,
                        classDptId: areaInfo.dptId,

                        settingId: this.settingId,
                        projectId: curClassInfo.projectId,
                        projectName: curClassInfo.projectName,
                        examAreacode: curClassInfo.examAreacode,
                        applySource: 'C',
                        applyType,
                        orderInfo: {
                            oriOrderType: this.paidDetails.orderSubtype, // orderSubtype //orderType
                            oriOrderNo: this.paidDetails.orderNo,
                            oriOrderId: this.paidDetails.orderId,
                        },

                        settingInfo: info,
                    },
                });
            }
        },
        closeAlert(check) {
            // 关闭弹窗
            this.showAlert = false;
        },
        argumentsOpen(item) {
            this.isShow = true;
            this.dealLists.push(item);
            this.$refs.agreementPurchase.open(item, this.$route.query.orderNo);
        },
        onImgError(e) {
            e.target.src = this.defaultImg;
        },
        closeFn() {
            this.isShow = false;
            this.dealLists = [];
        },
        confirmFn() {
            this.isShow = false;
            this.dealLists = [];
        },
    },
};
</script>

<style scoped lang="less">
.msg-content {
    font-size: 14px;
    color: #333333;
    margin: 0 -14px;
}
.ucIndex {
    background: #f5f5f5;
    .indexCont {
        margin: 0 auto;
        // width: 1200px;
        position: relative;
    }
}
.navigationWrap {
    float: left;
}
.contentWrap {
    // width: 866px;
    // box-shadow: 0px 1px 8px 4px rgba(0, 0, 0, 0.06);
    background: #fff;
    padding-bottom: 150px;
    position: relative;
}
.detailsWrap {
    background: #fff;
    border: 1px solid rgba(241, 241, 241, 1);
    border-radius: 2px;
    margin: 24px;
    .listWrap {
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        padding: 0 20px;
        &:last-child {
            border-bottom: none;
        }
    }
    .contTable {
        border: 2px solid #f2f2f2;
        border-radius: 2px;
        .tableTitle,
        .receiveTitle {
            line-height: 58px;
            text-align: center;
            background: #f8f8f8;
            border-bottom: 2px solid #f2f2f2;
        }
    }
    .classNames {
        margin: 20px 0;
        line-height: 22px;
        min-height: 70px;
        display: flex;
        justify-content: space-between;
        .leftW {
            display: flex;
        }
        .classImg {
            height: 70px;
            width: 112px;
            background: #ccc;
            margin-right: 20px;
            border-radius: 4px;
            overflow: hidden;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .classCont {
            width: 350px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            color: #333;
            .classPrice {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
            }
            .price {
                margin-right: 20px;
            }
        }

        .showDetailsWrap {
            width: 136px;
            text-align: right;
        }
        .showDetails {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
            cursor: pointer;
        }
        .payAgreementW {
            flex-grow: 1;
        }
        .payAgreement {
            cursor: pointer;
        }
        .contRight {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 40px;
            align-items: flex-end;
            min-width: 112px;
        }
        .payType {
            width: 60px;
            height: 20px;
            background: rgba(245, 245, 245, 1);
            border-radius: 2px;
            color: #999;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            &.zhuanban {
                background: #fff3f0;
                color: #e73928;
            }
            &.yanqi {
                background: rgba(250, 100, 0, 0.08);
                color: #fa9100;
            }
            &.zhunarang {
                background: rgba(71, 106, 255, 0.08);
                color: #476aff;
            }
        }
    }
    .addGoods {
        padding: 20px 0;
        border-top: 1px solid #eee;
        .addTit {
            height: 18px;
            width: 42px;
            background: linear-gradient(137deg, rgba(240, 121, 99, 1) 0%, rgba(231, 57, 40, 1) 100%);
            border-radius: 2px;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #fff;
        }
        .addLi {
            font-size: 14px;
            color: #666;
            line-height: 24px;
        }
    }
}
.addressWrap {
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    margin: 24px;
    .receiveTitle {
        line-height: 35px;
        background: rgba(248, 248, 248, 1);
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        padding-left: 28px;
        font-weight: bold;
    }
    .receiveInformation {
        display: flex;
        flex-wrap: wrap;
        padding: 15px 28px;
    }
    .receiveInformationPay {
        justify-content: space-between;
    }
    .infoName {
        font-size: 14px;
        color: #666;
        line-height: 24px;
        margin-right: 40px;
    }
    .infoName:first-child {
        white-space: nowrap;
    }
    .infoName:last-child {
        margin-right: 0;
    }
}
.invoce {
    font-size: 16px;
    color: #666;
    position: absolute;
    bottom: 30px;
    right: 24px;
    padding-right: 24px;
    cursor: pointer;
    background: url('asset/images/invoce-point.png') no-repeat;
    background-size: 16px 16px;
    background-position: right center;
    &:hover {
        opacity: 0.8;
    }

    &.selfLearn {
        right: 160px;
    }
}
.invoceDone {
    font-size: 16px;
    color: #666;
    position: absolute;
    bottom: 30px;
    right: 24px;
}
.red {
    color: rgba(231, 57, 40, 1);
}
</style>
