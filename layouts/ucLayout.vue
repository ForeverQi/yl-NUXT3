<template>
    <div>
        <global-header />
        <nuxt />
        <global-footer />
        <change-env />
    </div>
</template>
<script>
import '@/api/cp/api.CP0005.get-location.js';
import '@/www/components/package/index';
import GlobalHeader from './components/global-header/index.vue';
import GlobalFooter from './components/global-footer/index.vue';
import ChangeEnv from '@/www/components/components/change-env/index.vue';
export default {
    components: { GlobalHeader, GlobalFooter, ChangeEnv },
};
</script>
<style lang="less">
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
    min-width: 1200px;
    background: #f5f5f5;
    font-size: 16px;
}
</style>
