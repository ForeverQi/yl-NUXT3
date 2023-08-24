<template>
    <div>
        <nav-header v-show="!isFixedContent" :is-fixed="isFixedContent" :z-index="zIndex" @height-change="navHeightChange" />
        <module-header :is-fixed="isFixedContent" :z-index="zIndex" :top="isFixedContent ? 0 : navHeight" />
    </div>
</template>
<script>
import NavHeader from './nav-header.vue';
import ModuleHeader from './module-header.vue';
export default {
    name: 'global-header',
    components: { NavHeader, ModuleHeader },
    props: {
        // 布局是否要求相对页面定位(浮动在顶部)
        isFixed: {
            type: Boolean,
            default: true,
        },
        // 定位的层级
        zIndex: {
            type: Number,
            default: 50,
        },
    },
    data() {
        return {
            isFixedContent: false,
            navHeight: 28,
        };
    },
    mounted() {
        if (this.isFixed) {
            window.addEventListener('scroll', this.scrollChange);
        }
    },
    destroyed() {
        // 离开该页面需要移除这个监听的事件，不然会报错
        if (this.isFixed) {
            window.removeEventListener('scroll', this.scrollChange);
        }
    },
    methods: {
        navHeightChange(h) {
            this.navHeight = h;
        },
        scrollChange() {
            const scrollSize = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            this.isFixedContent = scrollSize > this.navHeight;
        },
    },
};
</script>
