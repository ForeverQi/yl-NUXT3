<template>
    <div class="article-empty">
        <div class="img">
            <img src="./asset/images/empty.png" />
        </div>
        <div class="txt">内容正在建设中…</div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.article-empty {
    .img {
        width: 224px;
        height: 157px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .txt {
        padding-top: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
    }
}
</style>
