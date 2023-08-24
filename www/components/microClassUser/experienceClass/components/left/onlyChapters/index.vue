<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-04 18:27:57
 * @Description: 
-->
<template>
    <div>
        <ul class="only-chapter-list">
            <li v-for="(item, index) in coursewareList" :key="index" class="mb16 bg-fff pl16 br8" @click="handlePlay(item)">
                <chapter-item :item="item"></chapter-item>
            </li>
        </ul>
        <pay-model ref="payModel"></pay-model>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import chapterItem from '../chaptersItem/index.vue';
import payModel from '../../payModel/index.vue';
import mixin from '../../js/mixin.js';

export default {
    name: 'onlyChaptersModel',
    components: {
        chapterItem,
        payModel,
    },
    mixins: [mixin],
    inject: ['experienceClass'],
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        coursewareList() {
            return this.experienceClass.catalogList.length <= 0 ? [] : this.experienceClass.catalogList[0].coursewareList;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
    },
    methods: {
        // 1.未登录
        // 2.体验课下设置试听课件

        // 1.进入体验课详情页
        // 2.点击免费试听
        // 3.点击目录上试听课件

        // 1.进入体验课播放页面，播放区域显示试听内容，左下角显示试听文案：免费观看N分钟，领取后观看完整视频 和去领取按钮点击去领取，弹出微信扫码登录页面。
        // 2.试听播放结束之后，播放区域左下角显示文案试看已结束，领取后观看完整视频和去领取按钮点击去领取，弹出微信扫码登录页面
        // 3.点击不可试听课件弹出微信扫码登录页面
        // 4.登录后，目录还是显示试听标签，点击试听课件，按照试听时间试听，试听文案同未登录前，点击去领取，进入支付页面
        // 5.点击不可试听课件，提示 购买课程后，可学习全部课程，并显示取消和立即领取按钮，点击取消，弹框消失，页面不变，点击立即领取进入支付页面
        // 6.支付成功后，点击课件，播放全部内容，试听课件只试听标签，没有其他试听规则

        // 1.未登录
        // 2.体验课下设置试听课件
        // 3.该体验课设置私域引流

        // 1.进入体验课详情页
        // 2.点击试听
        // 3.点击目录上试听课件

        // 1.进入体验课播放页面，播放区域显示试听内容，左下角显示试听文案：免费观看N分钟，领取后观看完整视频 和去领取按钮点击去领取，弹出微信扫码登录页面。
        // 2.试听播放结束之后，播放区域左下角显示文案试看已结束，领取后观看完整视频和去领取按钮点击去领取，弹出微信扫码登录页面
        // 3.点击不可试听课件弹出微信扫码登录页面
        // 4.登录未领取，试听同未登录，点击不可试听课件，提示领取课程后，可学习全部课程，显示取消和立即领取按钮，点击取消，弹框消失，页面不变，点击立即领取，显示私域引流配置的文案和页面，并提示领取成功
        // 5.登录已领取，试听课件只显示 试听标签，没有其他试听规则，所有课件可播放全部内容

        handlePlay(item) {
            console.log('onlyChapters', item);
            if (item.coursewareAuditionstatus === 'N') {
                return;
            } else if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                return;
            }

            this.coursewareList.forEach((litem) => {
                litem.isPlaying = item === litem;
            });
            return this.playVideo(item).catch((err) => {
                console.error('onlyChapters-handlePlay', err);
            });
        },
    },
};
</script>
<style lang="less" scoped>
.only-chapter-list {
    .mb16 {
        margin-bottom: 16px;
    }
    .bg-fff {
        background-color: white;
    }
    .pl16 {
        padding-left: 16px;
    }
    .br8 {
        border-radius: 8px;
    }
}
</style>
