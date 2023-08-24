<template>
    <div class="appraise-teacher">
        <div class="img">
            <img src="./asset/images/evaluate.png" />
        </div>
        <div class="wrap">
            <div class="title">{{ itemData.title }}</div>
            <div class="name" v-if="itemData.respondentName">评价对象：{{ itemData.respondentName }}</div>
        </div>
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
.appraise-teacher {
    display: flex;
    padding: 16px 0;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .img {
        width: 30px;
        height: 30px;
        margin-right: 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .wrap {
        .title {
            font-size: 16px;
            font-weight: 700;
            color: #333333;
            line-height: 22px;
        }
        .name {
            font-size: 14px;
            color: #999999;
            font-weight: 400;
            line-height: 20px;
            margin-top: 8px;
        }
    }
}
</style>
