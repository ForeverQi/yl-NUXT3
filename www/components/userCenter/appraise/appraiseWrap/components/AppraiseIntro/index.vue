<template>
    <div class="appraise-intro">
        <div class="title">尊敬的学员：</div>
        <div class="txt">
            {{ itemData.brief }}
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
.appraise-intro {
    padding: 28px 39px;
    background-image: url(./asset/images/form_bg.png);
    background-size: 100% 100%;
    margin: 0 -19px;
    .title {
        font-size: 14px;
        color: #333333;
        font-weight: 700;
    }

    .txt {
        text-align: justify;
        margin-top: 10px;
        text-indent: 1em;
        font-size: 14px;
        color: #333333;
        line-height: 32px;
    }
}
</style>
