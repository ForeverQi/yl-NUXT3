<template>
    <div class="questionnaire-item">
        <div class="left">
            <div class="title">
                <img class="img" src="./asset/images/evaluate.png" />
                <div>
                    <p class="txt">{{ itemData.title }}</p>
                    <div class="line" v-if="itemData.respondentName">评价对象：{{ itemData.respondentName }}</div>
                    <div class="line" v-if="itemData.evaluateStatus === 'Y'">评价日期：{{ itemData.evaluateDate }}</div>
                    <div class="line" v-else>截止日期：{{ itemData.endDate }}</div>
                </div>
            </div>
        </div>
        <nuxt-link class="btn use" v-if="itemData.evaluateStatus === 'Y'" :to="`/uc/manager/cmt/answerInfo/${itemData.id}`">查看</nuxt-link>
        <nuxt-link class="btn use1" v-if="itemData.evaluateStatus === 'N' && itemData.expireStatus === 'N'" :to="`/uc/manager/cmt/answerCmt/${itemData.id}`">
            评价
        </nuxt-link>
        <div class="btn disabled" v-if="itemData.evaluateStatus === 'N' && itemData.expireStatus === 'Y'">已过期</div>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>
<style lang="less" scoped>
.questionnaire-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px 24px 24px;
    border: 1px solid #ecedf6;
    border-radius: 8px;

    .left {
        margin-right: 56px;
        .title {
            display: flex;
            .img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                flex-shrink: 0;
                margin-top: 5px;
            }

            .txt {
                font-size: 16px;
                color: #333333;
                font-weight: 700;
                margin-bottom: 10px;
            }
        }

        .line {
            font-size: 14px;
            color: #999999;
        }
    }

    .btn {
        // width: 54px;
        // height: 26px;
        // font-size: 13px;
        // text-align: center;
        // line-height: 26px;
        // border-radius: 18px;
        // flex-shrink: 0;

        &.use {
            color: #ffffff;
            cursor: pointer;
            // background: linear-gradient(90deg, #f07963 0%, #e73928 100%);
            background: linear-gradient(90deg, #ff6870, #f8323c);
            // box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
            width: 72px;
            height: 40px;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
        }

        &.use1 {
            color: #ff2e30;
            cursor: pointer;
            // background: linear-gradient(90deg, #f07963 0%, #e73928 100%);
            // background: linear-gradient(90deg, #ff6870, #f8323c);
            // box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
            width: 72px;
            height: 40px;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            border: 1px solid #ff2e30;
        }

        &.disabled {
            width: 86px;
            height: 40px;
            color: #8d90aa;
            font-size: 14px;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            background-color: #f5f6fa;
            border-radius: 8px;
        }
    }
}

.questionnaire-item + .questionnaire-item {
    margin-top: 16px;
}
</style>
