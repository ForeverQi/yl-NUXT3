<template>
    <div class="openClassPopBg" :style="{ background }"></div>
</template>

<script>
/*页面遮罩*/
export default {
    name: 'bmask',
    props: {
        background: {
            type: String,
            default: '#000',
        },
    },
};
</script>

<style scoped>
.openClassPopBg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    /*background: #000;*/
    filter: alpha(opacity=70);
    opacity: 0.3;
}
</style>
