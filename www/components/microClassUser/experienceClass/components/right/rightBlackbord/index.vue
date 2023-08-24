<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-03-12 17:38:05
 * @Description: 
-->
<template>
    <div class="blockbord-box">
        <div class="blockbord-top">
            <img src="./asset/images/blockbord.png" alt="" class="blockbord-img" />
        </div>
        <ul>
            <li class="line-box" v-for="(item, index) in lights" :key="index">
                <p class="line-title">{{ item.title }}</p>
                <p class="line-text">{{ item.content }}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'contentRightBlockbord',
    inject: ['experienceClass'],
    computed: {
        lights() {
            return this.experienceClass.lights.filter((item) => item.type === '2');
        },
    },
};
</script>
<style lang="less" scoped>
.blockbord-box {
    background-color: #fff;
    padding-bottom: 16px;
    margin-bottom: 24px;
    border-radius: 8px;
    .blockbord-top {
        width: 100%;
        height: 60px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        background-color: #f8fbff;
        .blockbord-img {
            width: auto;
            height: 20px;
            display: block;
        }
    }
    .line-box {
        padding: 16px 16px 8px;
        .line-title {
            width: 96px;
            height: 30px;
            padding-left: 6px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background-image: url('./asset/images/line-title.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-bottom: 10px;
        }
        .line-text {
            font-size: 14px;
            color: #3a3d4b;
            line-height: 14px;
        }
    }
}
</style>
