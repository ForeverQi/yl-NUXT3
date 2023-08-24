<template>
    <div>
        <transition name="fade">
            <bmask v-show="scope.mask || scope.loading" :background="!scope.loading && scope.mask ? '#000' : '#FFF'"></bmask>
        </transition>
        <loading v-show="scope.loading"></loading>
    </div>
</template>

<script>
import bmask from '../bmask/index.vue';
import loading from '../loading/index.vue';
export default {
    name: 'maskLoading',
    serverCacheKey(props) {
        return 0;
    },
    components: {
        bmask,
        loading,
    },
    props: {
        scope: {
            type: Object,
            default: () => ({}),
        },
    },
    created() {
        // this.scope=
        this.$emit('update:scope', {
            mask: false,
            loading: false,
        });
    },
};
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-leave,
.fade-enter-to {
    opacity: 0.2;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
</style>
