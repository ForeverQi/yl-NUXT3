<template>
    <index-view></index-view>
</template>

<script>
import indexView from '@/www/components/microClassUser/myMicroClass/myCollection';
export default {
    name: 'index',
    components: {
        indexView,
    },
    layout: 'McuLayout',
    head() {
        console.error('如果使用ssr模式该地要更换调整');
        return {
            title: '我的收藏',
            meta: [
                { hid: 'keywords', name: 'keywords', content: '优路微课,我的收藏' },
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
