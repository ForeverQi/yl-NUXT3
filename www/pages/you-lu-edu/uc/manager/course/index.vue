<template>
    <div class="course-wrapper">
        <tabs :tabs="tabs" :active-index="activeIndex" />
        <nuxt-child />
    </div>
</template>

<script>
import Tabs from '@/www/components/uc/manager/course/tabs';

export default {
    components: {
        Tabs,
    },
    middleware({ route, redirect }) {
        if (route.path == '/uc/manager/course') {
            return redirect('/uc/manager/course/open');
        }
    },
    data() {
        return {
            tabs: [
                {
                    name: '我的公开课',
                },
                {
                    name: '我的课单',
                },
            ],
            activeIndex: 0,
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的公开课/课单_点亮职业人生_优路教育',
            meta: [],
        });
    },
};
</script>

<style scoped>
.course-wrapper {
    width: 100%;
}
</style>
