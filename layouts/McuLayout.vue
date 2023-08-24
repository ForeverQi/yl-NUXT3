<template>
    <div class="defaultLayout">
        <top />
        <div class="mcu content">
            <nuxt />
        </div>
        <bottom />
    </div>
</template>
<script>
import '@/api/cp/api.CP0005.get-location.js';
import top from './components/McuTop/index.vue';
import bottom from './components/McuBottom/index.vue';

export default {
    components: { bottom, top },
};
</script>

<style lang="less">
@import './asset/css/layout.css';
* {
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style: none;
}
a {
    text-decoration: none;
}
body {
    background: #f5f5f5;
    font-size: 16px;
}
</style>
<style lang="less" scoped>
.defaultLayout {
    -webkit-text-size-adjust: none;
}
.mcu {
    min-width: 1200px;
}
</style>
