<template>
    <!-- 购买协议 -->
    <div></div>
</template>

<script>
import getAgreement from './js/getAgreement.js';
export default {
    name: 'agreementPurchase',
    components: {},
    props: {
        downloadShow: {
            type: Boolean,
            default: true,
        },
        show: {
            type: Boolean,
            default: false,
        },
        dealLists: {
            type: Array,
            default: () => [],
        },
        isShowFooter: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            choseItem: {},
            orderId: '',
            userSign: '',
            disabled: true,
            seconds: 0,
            isPullDown: false,
            btnType: 0,
            isCountDown: true,
            isShow: this.show,
            dealList: [],
            activeName: '',
            leftFlag: false,
            rightFlag: false,
            showIndex: 0,
            isAnalysis: false, //是否已经加载过合同
            isSwitch: false, //切换合同
            timer: null,
        };
    },
    watch: {
        show(val) {
            this.isShow = val;
        },
        dealLists: {
            handler(val) {
                this.dealList = val;
                if (val.length) {
                    this.activeName = val[0].productId;
                }
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {},
    methods: {
        open(item, orderId, userSign) {
            this.orderId = orderId;
            this.userSign = userSign;
            this.choseItem = item || {};
            const obj = getAgreement.init({
                orderId,
                context: this,
            });
            this.$baseUI.loading();
            Promise.all(
                this.dealLists.map((it) => {
                    let classId = it.classId || it.skuId;
                    let className = it.skuName || it.productName || it.className;
                    return obj.getAgreementInfo(classId, className);
                })
            )
                .then((list) => {
                    this.showAgreement(list);
                })
                .catch((e) => {
                    console.log(e, '@@');
                })
                .finally(() => {
                    this.$baseUI.loading.closeAll();
                });
        },
        showAgreement(agreementNameAndContents) {
            ylPlugin.agreement.openDialogue({
                agreementNameAndContents,
                zIndex: 1000,
                ifShowConfirmButton: this.isShowFooter,
                forceReading: {
                    duration: this.seconds,
                    requireBottomReached: this.isPullDown,
                },
                onConfirm: () => {
                    this.btnType = NaN;
                    this.seconds = 0;
                    this.isPullDown = false;
                    this.$emit('confirm-fn');
                },
                onClose: () => {
                    this.btnType = NaN;
                    this.seconds = 0;
                    this.isPullDown = false;
                    this.$emit('close-fn');
                },
            });
        },
        setUp({ seconds = 0, isPullDown = false }) {
            this.btnType = NaN;
            this.seconds = seconds;
            this.isPullDown = isPullDown;
            //“阅读时间”为空，强制下拉到底为“是”
            if (!this.seconds && this.isPullDown) {
                this.btnType = 1;
                this.disabled = true;
            } else if (this.seconds && !this.isPullDown) {
                //“阅读时间”不为空，强制下拉到底为“否”
                this.btnType = 2;
            } else if (this.seconds && this.isPullDown) {
                //“阅读时间”不为空，强制下拉到底为“是”
                this.btnType = 3;
                this.disabled = true;
            } else {
                this.btnType = 0;
            }
        },
    },
};
</script>
