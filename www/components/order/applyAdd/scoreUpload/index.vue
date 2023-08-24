<template>
    <div class="wrap">
        <apply-input-content :form-data="formData" :setting-info="settingInfo" :type="type" ref="input" />
        <div class="foot">
            <div class="left">
                续学服务费合计：
                <span class="price">&#65509;{{ (sumPrice / 100).toFixed(2) }}</span>
                <span class="tip" v-if="isPaid">({{ sumPrice == 0 ? '无需支付' : '已支付' }})</span>
                <span class="tip" v-if="orderStatus === 'wait'">(待支付)</span>
            </div>
            <div class="btn-wrap">
                <div class="btn prev" v-if="showPrev" @click="doPrev">上一步</div>
                <div class="btn" @click="doSubmit">{{ sumPrice > 0 && !isPaid ? '去支付' : '提交申请' }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import ApplyInputContent from '../../components/applyInputContent/index.vue';
export default {
    components: {
        ApplyInputContent,
    },
    props: {
        isPaid: {
            type: Boolean,
            default: false,
        },
        orderStatus: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'edit',
        },
        showPrev: {
            type: Boolean,
            default: false,
        },
        sumPrice: {
            type: Number,
            default: 0,
        },
        settingInfo: {
            type: Object,
            default() {
                return {
                    accountShow: '',
                    accountType: '',
                    pwdShow: '',
                    pwdType: '',
                };
            },
        },
        defaultFormData: {
            type: Object,
            default() {
                return {
                    scoreImageUrl: '',
                    scoreQueryAccount: '',
                    scoreQueryPwd: '',
                };
            },
        },
    },
    data() {
        return {
            formData: {
                scoreImageUrl: '',
                scoreQueryAccount: '',
                scoreQueryPwd: '',
            },
        };
    },
    watch: {
        [`defaultFormData.scoreImageUrl`](val) {
            this.formData.scoreImageUrl = val;
        },
        [`defaultFormData.scoreQueryAccount`](val) {
            this.formData.scoreQueryAccount = val;
        },
        [`defaultFormData.scoreQueryPwd`](val) {
            this.formData.scoreQueryPwd = val;
        },
    },
    mounted() {
        if (this.$route.params.formData) {
            this.formData = {
                ...this.formData,
                ...this.$route.params.formData,
            };
        }
    },
    methods: {
        doSubmit() {
            this.$emit('doSubmit', this.$refs.input.getFormData());
        },
        doPrev() {
            this.$router.push({
                name: 'selfLearnSelectSubject',
                params: {
                    ...this.$route.params.originData,
                    formData: this.$refs.input.getFormData(),
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.wrap {
    padding: 0 30px;
    background-color: #fff;

    .btn.prev {
        margin-right: 10px;
        background: #fff;
        border: 1px solid #ccc;
        color: #333;
    }
}
.btn-wrap {
    display: flex;
}
.foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 70px;
    padding-bottom: 38px;

    .left {
        color: #333333;
        font-size: 16px;
        .price {
            color: #e73928;
            font-size: 28px;
        }
        .tip {
            color: #999999;
            font-size: 16px;
        }
    }

    .btn {
        width: 140px;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        cursor: pointer;
        background: linear-gradient(90deg, #f07963, #e73928);
        border-radius: 4px;
    }
}
</style>
