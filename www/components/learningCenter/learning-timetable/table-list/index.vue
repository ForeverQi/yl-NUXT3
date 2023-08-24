<template>
    <div class="subjectList">
        <ul>
            <template v-for="key in monthDaysList" :itemData="listData[key] || []">
                <template v-if="getList(listData[key]).length === 0">
                    <li class="item" :key="key" :id="`${key}_0`"></li>
                </template>
                <template v-for="(item, index) in getList(listData[key])" :itemData="listData[key] || []">
                    <timetable-item :item-data="item || []" :key="`${key}_${index}`" :ids="`${key}_${index}`" @confirmFn="confirmFn" />
                </template>
            </template>
        </ul>
    </div>
</template>
<script>
import TimetableItem from './TimetableItem/index.vue';
export default {
    components: {
        TimetableItem,
    },
    props: {
        listData: {
            type: Object,
            default() {
                return {};
            },
        },
        monthDaysList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        getList(data) {
            return Array.isArray(data) ? data : [];
        },
        confirmFn(data, cb) {
            this.$emit('confirmFn', data, cb);
        },
    },
};
</script>
<style lang="less" scoped>
.subjectList {
    > ul {
        position: relative;
        &::after {
            content: '';
            width: 2px;
            background: #e7e7e7;
            position: absolute;
            top: 35px;
            bottom: 0;
            left: 32px;
            z-index: 1;
        }

        li.item:first-child {
            .data::after {
                top: 55px;
            }
        }
    }
}
</style>
