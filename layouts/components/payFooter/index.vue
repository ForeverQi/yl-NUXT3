<template>
    <div class="The_total zb_bottom pyFooterWX">
        <div class="The_total1100">
            <p>总部地址：北京市海淀中关村南大街甲27号中扬大厦二层</p>
            <p>
                <span>邮编：100081</span>
                <span>全国统一咨询热线：400-861-8800</span>
                <span>全国统一客服热线：0371-53609200</span>
            </p>
            <p>
                Copyright © 2005-{{ nowYear }} niceloo.com 版权所有 北京环球优路教育科技股份有限公司 京ICP备05058880号-3 京公网安备 11010802017987号
                京ICP证150934号
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pyFooterWX',
    data() {
        return {
            nowYear: '2021',
        };
    },
    props: [],
    created() {
        this.nowYear = new Date().getFullYear();
    },
    mounted() {},
    methods: {},
};
</script>
<style scoped lang="less">
.pyFooterWX.zb_bottom {
    background: #e4e4e4;
    text-align: center;
    .The_total1100 {
        background: #e4e4e4;
        padding: 20px 0;
    }
    p {
        color: #444;
        line-height: 30px;
        font-size: 14px;
        span {
            margin-right: 40px;
        }
    }
}
</style>
