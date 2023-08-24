<template>
    <div class="no-net">
        <div class="no-net-content">
            <img src="./asset/images/liveroomDetail_21.png" alt="" />
            <div>您的网络开小差了，唤醒网络再试一次~</div>
            <span class="refresh" @click="refresh">刷新试试</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoNet',
    methods: {
        refresh() {
            location.reload();
        },
    },
};
</script>

<style lang="less" scoped>
/*无网状态*/
.no-net {
    background-color: #f6f7f9;
}
.no-net-content {
    width: 1200px;
    height: 860px;
    background: #ffffff;
    text-align: center;
    margin: 16px auto 144px;
    img {
        width: 260px;
        height: 180px;
        margin: 163px auto 16px;
    }
    div {
        font-size: 14px;
        color: #3a3d4b;
    }
    .refresh {
        width: 136px;
        height: 38px;
        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
        border-radius: 29px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 38px;
        display: inline-block;
        margin-top: 57px;
        cursor: pointer;
    }
}
</style>
