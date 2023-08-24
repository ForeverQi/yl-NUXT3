<template>
    <div class="answer-cmt">
        <div class="top">
            <div class="title">评价</div>
            <div class="back" @click="back">返回</div>
        </div>
        <div class="line"></div>
        <appraise-wrap type="show" :appraise-id="appraiseId" />
    </div>
</template>
<script>
import AppraiseWrap from '@/www/components/userCenter/appraise/appraiseWrap/Index';
export default {
    components: {
        AppraiseWrap,
    },
    data() {
        return {
            appraiseId: this.$route.params.id,
        };
    },
    methods: {
        back() {
            this.$router.replace('/uc/manager/cmt/allCmt');
        },
    },
};
</script>
<style lang="less" scoped>
.answer-cmt {
    padding-bottom: 138px;
    background-color: #fff;
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 0 30px;
        background-color: #fff;

        .title {
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }

        .back {
            width: 57px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 14px;
            color: #666666;
            cursor: pointer;
            background: #f5f5f5;
            border-radius: 4px;
        }
    }

    .line {
        height: 10px;
        background-color: #f5f5f5;
    }
    .appraise-wrap {
        padding: 14px 30px;
    }

    .submit {
        margin: 0 auto;
        width: 242px;
        height: 40px;
        font-size: 16px;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
        margin-top: 56px;
        background: linear-gradient(90deg, #f07963 0%, #e73928 100%);
        border-radius: 18px;
        box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
    }
}
</style>
