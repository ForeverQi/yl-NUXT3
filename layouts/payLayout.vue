<template>
    <div>
        <pay-header />
        <nuxt />
        <pay-footer />
        <change-env />
    </div>
</template>
<script>
import '@/api/cp/api.CP0005.get-location.js';
import payHeader from './components/payHeader/index.vue';
import payFooter from './components/payFooter/index.vue';
import ChangeEnv from '@/www/components/components/change-env/index.vue';
export default {
    name: 'pyLayout',
    components: {
        ChangeEnv,
        payHeader,
        payFooter,
    },
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
    background: #f5f6f9;
    font-size: 16px;
}
</style>
