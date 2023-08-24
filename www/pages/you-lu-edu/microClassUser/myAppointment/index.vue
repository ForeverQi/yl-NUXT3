<template>
    <index-view></index-view>
</template>

<script>
import indexView from '@/www/components/microClassUser/myMicroClass/myAppointment';
export default {
    name: 'myAppointment',
    components: {
        indexView,
    },
    layout: 'McuLayout',
    head() {
        console.error('如果使用ssr模式该地要更换调整');
        return {
            title: '我的预约',
            meta: [
                { hid: 'keywords', name: 'keywords', content: '优路微课,我的预约' },
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
