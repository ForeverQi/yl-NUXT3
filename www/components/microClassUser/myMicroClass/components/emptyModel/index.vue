<template>
    <div class="empty-box flex jc-center ai-center column">
        <img src="./asset/images/empty-mycourse.png" v-if="tab === 1" alt="" />
        <img src="./asset/images/empty-myAppointment.png" v-if="tab === 2" alt="" />
        <img src="./asset/images/empty-collection.png" v-if="tab === 3" alt="" />
        <img src="./asset/images/empty-myorder.png" v-if="tab === 4" alt="" />
        <p>{{ emptyText }}</p>
    </div>
</template>
<script>
export default {
    name: 'emptyBox',
    components: {},
    props: {
        emptyText: {
            type: String,
            default: '',
        },
        tab: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {};
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.empty-box {
    width: 100%;
    height: 400px;
    img {
        display: block;
        width: 260px;
        height: 180px;
    }
    p {
        font-size: 14px;
        color: #3a3d4b;
        height: 20px;
        line-height: 20px;
        margin-top: 16px;
        text-align: center;
    }
}
</style>
