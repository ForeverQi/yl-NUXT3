<template>
    <experience-class></experience-class>
</template>
<script>
import { mapState } from 'vuex';
import experienceClass from '@/www/components/microClassUser/experienceClass';
export default {
    name: 'experienceClassPage',
    components: { experienceClass },
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
                { hid: 'keywords', name: 'keywords', content: '优路微课,体验课详情,' + pageName },
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
};
</script>
<style lang="less" scoped></style>
