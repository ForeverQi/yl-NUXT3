<template>
    <index-view />
</template>
<script>
import IndexView from '@/www/components/microClassUser/index/Index';
export default {
    components: {
        IndexView,
    },
    layout: 'McuLayout',
    head() {
        return {
            title: '微课首页',
            meta: [
                { hid: 'keywords', name: 'keywords', content: '优路微课首页,热门好课,在线备考充电' },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路微课首页|热门好课,在线备考充电',
                },
            ],
        };
    },
    methods: {},
};
</script>
<style lang="less" scoped></style>
