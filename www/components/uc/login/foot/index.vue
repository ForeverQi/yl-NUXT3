<template>
    <!-- 底部版权信息 -->
    <div class="cpy">
        <div class="w1100">
            <p>总部地址：北京市海淀中关村南大街甲27号中扬大厦二层</p>
            <p>邮编：100081&nbsp;&nbsp;全国统一咨询热线: 400-861-8800&nbsp;&nbsp;课件应急处理: 010—53291377&nbsp;&nbsp;全国统一客服热线: 0371-53609200</p>
            <!-- <p>Copyright © 2005-2018 www.niceloo.com 版权所有 北京环球优路教育科技股份有限公司 京ICP备05058880号 京公网安备 11010802017987号
                京ICP证150934号</p> -->
            <p class="copyright-text">
                Copyright&nbsp;©&nbsp;2005-{{ nowYear }}&nbsp;niceloo.com&nbsp;版权所有&nbsp;北京环球优路教育科技股份有限公司&nbsp;
                <a href="https://beian.miit.gov.cn" target="_blank" class="beian">京ICP备05058880号-3</a>
                &nbsp;京公网安备&nbsp;11010802017987号 &nbsp;京ICP证150934号
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footer',
    data() {
        return {
            nowYear: '2021',
        };
    },
    mounted() {
        this.nowYear = new Date().getFullYear();
    },
    methods: {},
};
</script>

<style scoped>
/*底部版权信息*/
.cpy {
    width: 100%;
    line-height: 32px;
    text-align: center;
    clear: both;
    min-width: 1200px;
}

.cpy p {
    text-align: center;
    font-size: 14px;
    color: #fff;
}

.cpy p a {
    color: #fff;
}
</style>
