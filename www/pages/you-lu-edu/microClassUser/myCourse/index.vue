<template>
    <index-view></index-view>
</template>

<script>
import indexView from '@/www/components/microClassUser/myMicroClass/myCourse';
export default {
    name: 'myCourse',
    components: {
        indexView,
    },
    layout: 'McuLayout',
    head() {
        console.error('如果使用ssr模式该地要更换调整');
        return {
            title: '我的微课',
            meta: [
                { hid: 'keywords', name: 'keywords', content: '优路微课,我的微课' },
                {
                    hid: 'description',
                    name: 'description',
                    content: '我的课程,我的预约,我的收藏,都在这里！',
                },
            ],
        };
    },
};
</script>

<style scoped></style>
