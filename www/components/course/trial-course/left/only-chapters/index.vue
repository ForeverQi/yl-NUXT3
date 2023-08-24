<template>
    <div>
        <ul class="only-chapter-list">
            <li v-for="(item, index) in coursewareList" :key="index" class="mb16 bg-fff pl16 br8" @click="handlePlay(item)">
                <chapter-item :item="item"></chapter-item>
            </li>
        </ul>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import chapterItem from '../chapters-item';
import payModel from '../../pay-model';
import mixin from '../../js/mixin.js';

export default {
    name: 'onlyChaptersModel',
    components: {
        chapterItem,
        payModel,
    },
    mixins: [mixin],
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        coursewareList() {
            return this.experienceClass.catalogList.length <= 0 ? [] : this.experienceClass.catalogList[0].coursewareList;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
    },
    methods: {
        ...mapMutations('trial-course/course', { updateCourseWare: 'updateCourseWare' }),
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
            console.warn('onlyChapters', item);
            let sts = true;
            if (item.coursewareAuditionstatus === 'N') {
                // return;
                this.listenCluePush();
            } else if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                // return;
            } else {
                sts = false;
            }

            this.coursewareList.forEach((litem) => {
                this.updateCourseWare({
                    coursewareId: litem.coursewareId,
                    isPlaying: item === litem,
                });
            });

            // 课程目录-直播课，【登录后，且已领取时】交互效果：
            // 1、点击【直播中、即将开始】的课程目录时
            //    1）若当前状态为<头图>状态，则点击后，新开页进入直播间，同时当前页停留至顶部头图状态；
            //    2）若当前状态为<播放器>状态，则点击后，新开页进入直播间，同时当前页停留至播放器状态，并播放器为选中、停留至当前选中的课程目录处；

            // 1、课程目录-直播课，【登录后，且已领取时】交互效果：
            // 点击【直播中、即将开始】的课程目录时
            // 1）若当前状态为<头图>状态，则点击后，新开页进入直播间，同时当前页停留至顶部头图状态；
            // 2）若当前状态为<播放器>状态，则点击后，新开页进入直播间，同时当前页停留至播放器状态，并播放器为选中、停留至当前选中的课程目录处；

            // 2、需求优化：
            // 之前——点击直播已结束的目录，定位至页面顶部，不跳转
            // 优化后——点击直播已结束目录，依然定位至顶部该目录状态，同时新开页跳转至第三方直播间

            // 3、需求优化：
            // 之前——体验课直播已结束后，点击目录 不允许跳转至第三方直播课，点击后以轻提示方式告知用户
            // 变更后——
            // 1）左侧播放器上遮罩文案变更为：回放上传中，请等候...
            // 2）右侧播放器目录，点击后新开页跳转至第三方直播间

            // 4、课程目录处，增加鼠标悬停选中效果

            const bannerWrapper = document.querySelector('.experience-class-box .banner-box');
            if (this.experienceClass.drawStatus === 1 && item.coursewareType === '2' && item.coursewareEndtime) {
                if (bannerWrapper && !item.coursewareOnlineplaypath) {
                    window.open(`/inside/user/mcpLivePage?goodsId=${this.experienceClass.goodsId}&coursewareId=${item.coursewareId}`, '_blank');
                    scroll({
                        top: 0,
                        behavior: 'smooth',
                    });
                } else {
                    return this.playVideo(
                        item,
                        {
                            playOverLive: true,
                        },
                        '加锁目录(课程介绍-课程目录)触发领取'
                    ).catch((err) => {
                        console.error('onlyChapters-handlePlay', err);
                    });
                }
            } else {
                return this.playVideo(
                    item,
                    {
                        getCourseAfterLogin: true,
                        notSwitchVideoBeforeDraw: sts,
                        notSwitchVideoBeforeLogin: sts,
                        notSwitchVideoAfterDraw: Boolean(bannerWrapper) === true,
                        openLiveAfterDraw: sts,
                    },
                    '加锁目录(课程介绍-课程目录)触发领取'
                ).catch((err) => {
                    console.error('onlyChapters-handlePlay', err);
                });
            }
        },
        handleFreePopupShow(val) {
            console.info('handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('handlePayPopupShow', val);
            this.$emit('payPopupShow', val);
        },
    },
};
</script>
<style lang="less" scoped>
.only-chapter-list {
    // background-color: white;
    // border-radius: 16px;
    // padding: 48px 32px;
    .mb16 + .mb16 {
        margin-top: 16px;
    }
    .bg-fff {
        background-color: #f6f7f9;
    }

    .bg-fff:hover {
        background-color: #eeeff6;
        /deep/ .chapters-name {
            color: #ff2e30;
        }
    }

    .pl16 {
        padding-left: 16px;
    }
    .br8 {
        border-radius: 8px;
    }
}
</style>
