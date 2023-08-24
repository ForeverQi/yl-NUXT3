<template>
    <div class="wrap">
        <tab-list :tabs="tabs" :active-index="activeIndex" />
        <div class="content">
            <select-subject />
        </div>
    </div>
</template>
<script>
import TabList from '@/www/components/order/components/tabList';
import SelectSubject from '@/www/components/order/selectSubject';
export default {
    components: {
        TabList,
        SelectSubject,
    },
    data() {
        return {
            tabs: [
                {
                    name: '续学申请',
                },
            ],
            activeIndex: 0,
        };
    },
};
</script>
<style lang="less" scoped>
.content {
    padding-top: 16px;
}
</style>
