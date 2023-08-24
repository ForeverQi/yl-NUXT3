<template>
    <div class="detail-up-down-box flex jc-center ai-center" v-if="file.nextId || file.lastId">
        <a :href="`/ziliao/detail/pack-${$route.params.packId}/doc-${file.lastId}`" class="detail-down-btn color-666 mr32" v-if="file.lastId">上一篇</a>
        <a :href="`/ziliao/detail/pack-${$route.params.packId}/doc-${file.nextId}`" class="detail-down-btn color-666" v-if="file.nextId">下一篇</a>
    </div>
</template>
<script>
export default {
    name: 'detail-up-down',
    props: {
        file: {
            type: Object,
            default: () => {},
        },
    },
    fetch() {
        return Promise.resolve();
    },
};
</script>
<style lang="less" scoped>
.detail-up-down-box {
    width: 852px;
    height: 60px;
    margin-bottom: 10px;
    background-color: #fff;
    .detail-down-btn {
        width: 189px;
        height: 35px;
        border: 1px solid #888888;
        border-radius: 4px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
    }
    .mr32 {
        margin-right: 32px;
    }
}
</style>
