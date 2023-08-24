/* eslint-disable no-empty */
<template>
    <vb-mask :show="show">
        <div class="contentWrap">
            <slot></slot>
            <div class="classTitle">基本信息</div>
            <div class="infoItem">
                <div class="itemTop">
                    <div class="itemName">考试名称</div>
                    <div class="itemCont">{{ info.projectName }}</div>
                    <div class="itemName">考试科目</div>
                    <div class="itemCont">{{ info.subjectInfo }}</div>
                </div>
                <div class="itemBot">
                    <div class="itemName">服务期限</div>
                    <div class="itemCont">{{ serverTerm }}</div>
                    <div class="itemName">附加服务</div>
                    <div class="itemCont">{{ serverInfo }}</div>
                </div>
            </div>
            <div class="classTitle">服务信息</div>
            <div class="infoItem">
                <div class="itemTop">
                    <div class="itemName">课程资料</div>
                    <div class="itemCont">提供课程配套讲义资料下载</div>
                    <div class="itemName">答疑服务</div>
                    <div class="itemCont">答疑服务</div>
                </div>
                <div class="itemBot">
                    <div class="itemName">题库</div>
                    <div class="itemCont">提供在线题库，做题练习服务</div>
                    <div class="itemName">班主任服务</div>
                    <div class="itemCont">包含</div>
                </div>
            </div>
            <vb-treaty :html="html" v-show="isShowTreaty"></vb-treaty>
        </div>
    </vb-mask>
</template>

<script>
import vbMask from '@/www/components/vbMask/index.vue';
import vbTreaty from '@/www/components/vbTreaty/index.vue';
import '@/api/uc/api.OC2002.query-order-detail';

export default {
    name: 'buyreceiptsnapshot',
    components: {
        vbMask,
        vbTreaty,
    },
    props: {
        classId: {
            type: String,
            default: null,
        },
        orderId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            info: {
                orderitemService: {
                    orderitemAgreementtype: '',
                    orderitemServicetype: '',
                },
            },
            html: '',
            copyClassId: '',
            copyOrderId: '',
            orderInfo: {},
            show: false,
        };
    },
    computed: {
        isShowTreaty() {
            return (
                this.info.orderitemService &&
                this.info.orderitemService.orderitemAgreementtype === 'E' &&
                (this.info.orderitemService.orderitemServicetype === 'F' || this.info.orderitemService.orderitemServicetype === 'R')
            );
        },
        serverTerm() {
            let tim = '';
            // PROJECT:项目;
            // TECHMETHOD:授课方式;
            // SENDSTATUS:邮寄状态;
            // GOODSSTATUS:包含资料状态;
            // OPENDATE:班级服务开始时间;
            // EXPIREDATE:班级服务结束时间)
            if (this.info.specs) {
                this.info.specs.forEach((val) => {
                    if (val.specType === 'EXPIREDATE') {
                        // 班级服务结束时间
                        tim = val.specValue;
                    }
                });
            }
            if (tim) {
                //2020-09-21 00:00:00 去掉后面半段
                tim = tim.replace(/\s.*/, '');
            }
            return tim;
        },
        serverInfo() {
            const classRepeatdate = this.info.orderitemService && this.info.orderitemService.orderitemRepeatyear;
            // 6:重读下一期;
            // 5:终身重读;
            // XXXX:具体年份

            if (this.info.orderitemService && this.info.orderitemService.orderitemServicetype == 'R') {
                //服务类型(R:重读;F:退费;N:不退费不重读;B:无协议;D:可重读可退费)

                //重读
                if (classRepeatdate == 6) {
                    return `重读下一期，重读资料费${this.info.orderitemService.orderitemRepeatbookamount / 100}元/科`;
                } else if (classRepeatdate == 5) {
                    return `终身重读，重读资料费${this.info.orderitemService.orderitemRepeatbookamount / 100}元/科`;
                } else if (classRepeatdate != 0) {
                    return `重读${classRepeatdate}年，重读资料费${this.info.orderitemService.orderitemRepeatbookamount / 100}元/科`;
                }
                return '无';
            } else if (this.info.orderitemService && this.info.orderitemService.orderitemServicetype == 'F') {
                return '退费';
            }
            return '无';
        },
    },
    watch: {
        classId: {
            immediate: true,
            handler() {
                this.initData();
            },
        },
        copyClassId: {
            immediate: true,
            handler() {
                if (this.copyClassId) {
                    this.getData();
                }
            },
        },
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.copyClassId = this.classId || this.$route.query.classId;
            this.copyOrderId = this.orderId || this.$route.query.orderId;

            const TOKEN = this.$route.query.TOKEN;
            if (TOKEN) {
                this.$User.setToken(TOKEN);
            }
        },
        getData() {
            this.show = false;
            this.$callApi('uc/query-order-detail', {
                orderNo: this.copyOrderId,
                onsuccess: (data) => {
                    Object.assign(this.orderInfo, data);
                    if (this.orderInfo.orderItems) {
                        for (const item of this.orderInfo.orderItems) {
                            if (this.copyClassId === item.skuId) {
                                if (this.orderInfo.orderSubtype == 'DEF' && item.orderitemOperation == 'DEFO') {
                                    // 顺延后
                                    Object.assign(this.info, item);
                                    break;
                                } else if (this.orderInfo.orderSubtype == 'CHA' && item.orderitemOperation == 'CHAI') {
                                    // 转入
                                    Object.assign(this.info, item);
                                    break;
                                }
                                Object.assign(this.info, item);
                            }
                        }
                    }
                    if (this.info.orderitemService.orderitemAgreementtemplateid) {
                        // 如果有模版，直接拿模版
                        this.protocolTemplateUrl = this.$urlUtil.getViewUrl(this.info.orderitemService.orderitemAgreementurl);
                    }
                    if (this.info.orderitemService.orderitemServicetype === 'R') {
                        // R:重读;
                        // F:退费;
                        // N:不退费不重读;
                        // B:无协议;
                        // D:可重读可退费
                        this.$treatyUtil.getChongduPromotion(this.info.orderitemService.orderitemAgreementversion || 3).then((result) => {
                            console.log('101', result);
                            this.html = result;
                        });
                    } else if (this.info.orderitemService.orderitemServicetype === 'F') {
                        this.$treatyUtil.getTuifeiPromotion(this.info.orderitemService.orderitemAgreementversion || 3).then((result) => {
                            console.log('102', result);
                            this.html = result;
                        });
                    } else {
                        this.$treatyUtil.getPromotion(this.info.orderitemService.orderitemAgreementversion || 3).then((result) => {
                            console.log('103', result);
                            this.html = result;
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.show = true;
                },
            });
        },
    },
};
</script>

<style scoped lang="less">
.contentWrap {
    height: 80vh;
    overflow: auto;
    padding: 30px;
    width: 960px;
    background: #fff;
}
.close {
    width: 28px;
    height: 28px;
    background: url(./asset/images/close2.png) no-repeat center center;
    position: absolute;
    top: -15px;
    right: -13px;
    cursor: pointer;
}
.classTitle {
    line-height: 70px;
    color: #222222;
    font-size: 18px;
}
.infoItem {
    border: 2px solid #dddddd;
}
.itemTop {
    border-bottom: 2px solid #dddddd;
}
.itemTop,
.itemBot {
    display: flex;
}
.itemName {
    background: #f2f2f2;
    line-height: 60px;
    color: #333;
    font-size: 16px;
    width: 130px;
    text-align: center;
}
.itemCont {
    line-height: 60px;
    color: #333;
    font-size: 16px;
    padding-left: 10px;
    width: 290px;
}
.content {
    margin-top: 20px;
    color: #666;
    line-height: 28px;
    font-size: 16px;
}
</style>
