<template>
    <div class="loader"></div>
</template>

<script>
/*页面遮罩*/
export default {
    name: 'loader',
};
</script>

<style scoped>
.loader {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('./asset/images/loading.gif') 50% 50% no-repeat;
}
</style>
