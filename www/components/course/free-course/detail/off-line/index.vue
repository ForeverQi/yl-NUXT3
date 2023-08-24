<template>
    <div class="class-top-box">
        <img src="./asset/images/liveroomDetail_01.png" alt="" class="left-img" />
        <img src="./asset/images/liveroomDetail_02.png" alt="" class="right-img" />
        <div class="play-live-content">
            <!--已下架-->
            <div class="play-live-offline">
                <img src="./asset/images/offline.png" alt="" />
                <div>该直播课已下线，去看看其他课程吧</div>
                <button class="back-open" @click="toBackOpen">返回公开课</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'OffLine',
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('open', ['projectSeoCode']),
    },
    methods: {
        toBackOpen() {
            this.$router.push(`/free-course/all/${this.projectSeoCode}`);
        },
    },
};
</script>

<style scoped lang="less">
.class-top-box {
    height: 610px;
    background-color: #0f0f1e;
    position: relative;
    .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 413px;
        height: 292px;
        z-index: 2;
    }

    .right-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 459px;
        height: 354px;
        z-index: 2;
    }

    .play-live-content {
        width: 1200px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 2;
        /*已下架*/
        .play-live-offline {
            background: #1c1d30;
            height: 610px;
            text-align: center;
            img {
                width: 260px;
                height: 180px;
                margin: 120px auto 10px;
            }
            div {
                font-size: 14px;
                color: #ffffff;
            }
            .back-open {
                width: 136px;
                height: 38px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 29px;
                font-size: 14px;
                text-align: center;
                color: #ffffff;
                line-height: 38px;
                margin-top: 40px;
                cursor: pointer;
            }
        }
    }
}
</style>
