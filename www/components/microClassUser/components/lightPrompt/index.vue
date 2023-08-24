<template>
    <span class="light-prompt-order" v-if="show">{{ tiptext }}</span>
</template>

<script>
export default {
    name: 'index',
    props: {
        tiptext: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less" scoped>
.light-prompt-order {
    width: 144px;
    height: 40px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    position: fixed;
    left: 50%;
    margin-left: -72px;
    top: 50%;
    margin-top: -20px;
    z-index: 1000;
}
</style>
