<template>
    <div class="btn-item" @click="handleClick">
        <img v-if="data.collectId" class="img" src="./asset/img/collection.png" alt="" />
        <img v-else class="img" src="./asset/img/uncollection.png" alt="" />
        <p class="text">{{ data.collectId ? '取消收藏' : '收藏本小题' }}</p>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        // 收藏/取消收藏按钮
        handleClick() {
            var isCollection = !!this.data.collectId;
            this.$emit('click-collection', {
                isCollection,
                collectId: this.data.collectId,
                questionId: this.data.questionId,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.btn-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    .img {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        pointer-events: none;
    }
    .text {
        font-size: 14px;
        font-weight: 400;
        color: #99a1af;
        line-height: 20px;
    }
}
</style>
