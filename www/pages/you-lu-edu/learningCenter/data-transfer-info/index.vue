<template>
    <div class="data-transfer-info">
        <ChangeClassTab @tab-switch="tabSwitch"></ChangeClassTab>
        <ClassTabDetail v-if="currentSourceClassId" :source-class-id="currentSourceClassId"></ClassTabDetail>
    </div>
</template>

<script>
import ChangeClassTab from '@/www/components/learningCenter/data-transfer-info/change-class-tab';
import ClassTabDetail from '@/www/components/learningCenter/data-transfer-info/class-detail';
export default {
    name: 'index',
    components: { ChangeClassTab, ClassTabDetail },
    layout: 'new-default',
    data() {
        return {
            currentSourceClassId: '',
        };
    },
    methods: {
        tabSwitch(val) {
            this.currentSourceClassId = val;
        },
    },
};
</script>

<style scoped lang="less">
.data-transfer-info {
    margin: 0 auto 30px;
    width: 1200px;
}
</style>
