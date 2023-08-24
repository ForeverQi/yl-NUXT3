<template>
    <div class="module-title">
        <span class="module-header">{{ title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '我的申请',
        },
    },
};
</script>

<style lang="less" scoped>
.module-title {
    line-height: 60px;
    background: #fff;
    padding: 0 30px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
    border-radius: 4px;
    .module-header {
        display: inline-block;
        line-height: 60px;
        position: relative;
        font-weight: bold;
        &:after {
            content: '';
            position: absolute;
            width: 34px;
            height: 4px;
            background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
            border-radius: 2px;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
        }
    }
}
</style>
