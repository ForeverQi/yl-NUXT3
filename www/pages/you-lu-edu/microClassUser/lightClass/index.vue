<template>
    <light-class></light-class>
</template>
<script>
import { mapState } from 'vuex';
import lightClass from '@/www/components/microClassUser/lightClass';
export default {
    name: 'myMicroClassPage',
    components: {
        lightClass,
    },
    layout: 'McuLayout',
    data() {
        return {};
    },
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
                { hid: 'keywords', name: 'keywords', content: '优路微课,轻学课,' + pageName },
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
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped></style>
