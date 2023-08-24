<template>
    <div>
        <div class="light-class" v-if="onLine">
            <light-class-top></light-class-top>
            <same-kind-good-class></same-kind-good-class>
        </div>
        <no-net v-else></no-net>
    </div>
</template>
<script>
import lightClassTop from './components/lightClassTop/index.vue';
import sameKindGoodClass from './components/sameKindGoodClass/sameKindGoodClass/index.vue';
import NoNet from '@/www/components/microClassUser/components/NoNet/index.vue';

export default {
    name: 'lightClassModel',
    components: {
        lightClassTop,
        sameKindGoodClass,
        NoNet,
    },
    data() {
        return {
            onLine: true,
            tab: 1,
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.online = navigator.onLine;
        // 网络由异常到正常时触发
        window.addEventListener('online', this.updateOnlineStatus);
        // 网络由正常常到异常时触发
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
        },
        changeTab(val) {
            this.tab = val;
        },
    },
};
</script>
<style lang="less" scoped>
.light-- {
    width: 1200px;
    margin: 0 auto;
}
</style>
