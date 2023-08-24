<template>
    <div class="empty-content">
        <img class="img" src="./assets/images/empty.png" />
        <div class="empty-txt">课程正在上传中，请耐心等待~</div>
    </div>
</template>
<script>
export default {
    name: 'EmptyIndex',
};
</script>
<style lang="less" scoped>
.empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 130px;
    padding-bottom: 130px;

    .img {
        width: 260px;
        height: 180px;
    }

    .empty-txt {
        font-size: 14px;
        color: #3a3d4b;
        line-height: 19px;
        padding-top: 17px;
    }
}
</style>
