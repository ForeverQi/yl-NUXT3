<template>
    <index-view></index-view>
</template>

<script>
import { mapState } from 'vuex';
import indexView from '@/www/components/microClassUser/liveroomDetail/Index';
export default {
    name: 'liveroomDetail',
    components: {
        indexView,
    },
    layout: 'McuLayout',
    head() {
        console.error('如果使用ssr模式该地要更换调整');
        let arr = this.pageName.split(']');
        let pageName = this.pageName;
        if (arr.length === 2) {
            pageName = arr[1];
        }
        return {
            title: pageName,
            meta: [
                { hid: 'keywords', name: 'keywords', content: '优路微课,直播详情,' + pageName },
                {
                    hid: 'description',
                    name: 'description',
                    content: typeof location === 'undefined' ? pageName : location.href,
                },
            ],
        };
    },
    computed: {
        ...mapState('mcuStore', ['pageName']),
    },
};
</script>

<style scoped></style>
