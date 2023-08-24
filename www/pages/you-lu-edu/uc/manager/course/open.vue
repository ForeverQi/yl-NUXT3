<template>
    <div>
        <VbOpenTable :tab-item-list="tabItemList" />
        <nuxt-child />
    </div>
</template>

<script>
import VbOpenTable from '@/www/components/uc/manager/course/open/vbOpenTable';
export default {
    components: {
        VbOpenTable,
    },
    middleware({ route, redirect }) {
        if (route.path == '/uc/manager/course/open' || route.path == '/uc/manager/course') {
            return redirect('/uc/manager/course/open/purchased');
        }
    },
    data() {
        return {
            tabItemList: [
                { value: '购买的公开课', router: 'purchased', isShowEditBtn: false },
                { value: '收藏的公开课', router: 'collection', isShowEditBtn: true },
            ],
        };
    },
};
</script>
