<template>
    <div class="more-chapter-list">
        <div v-for="(item, index) in catalogList" :key="index" class="more-chapter-item">
            <div class="flex jc-between ai-center more-chapter-item-title" @click="handleShowMoreChapter(item)">
                <div class="flex ai-center">
                    <img src="./asset/images/more-chapter.png" alt="" class="more-chapter-img" />
                    <h4 class="catalog-name">{{ item.catalogName }}</h4>
                </div>
                <img src="./asset/images/up.png" alt="" class="chapter-up-down" v-if="item.isExpand" />
                <img src="./asset/images/down.png" alt="" class="chapter-up-down" v-else />
            </div>
            <ul v-if="item.isExpand">
                <li class="pl40" v-for="(child, eq) in item.coursewareList" :key="eq" @click="handlePlay(child)">
                    <chapter-item :item="child"></chapter-item>
                </li>
            </ul>
        </div>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import chapterItem from '../chapters-item';
import payModel from '../../pay-model';
import mixin from '../../js/mixin.js';

export default {
    name: 'moreChaptersModel',
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
        catalogList() {
            return this.experienceClass.catalogList;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
    },
    methods: {
        ...mapMutations('trial-course/course', { updateCatalog: 'updateCatalog', updateCourseWare: 'updateCourseWare' }),
        handleShowMoreChapter(item) {
            item.isExpand = !item.isExpand;
        },
        handlePlay(item) {
            console.log('moreChapters', item);
            let sts = true;
            if (item.coursewareAuditionstatus === 'N') {
                // return;
                this.listenCluePush();
            } else if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                // return;
            } else {
                sts = false;
            }
            this.catalogList.forEach((litem) => {
                litem.coursewareList.forEach((sitem) => {
                    this.updateCourseWare({
                        coursewareId: sitem.coursewareId,
                        isPlaying: item === sitem,
                    });
                });
                this.updateCatalog({
                    catalogId: litem.catalogId,
                    isVideoExpand: litem.coursewareList.some((sitem) => sitem.isPlaying),
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
                    console.error('moreChapters-handlePlay', err);
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
        isEnd(item) {
            return Date.parse(item.coursewareEndtime) < Date.now();
        },
    },
};
</script>
<style lang="less" scoped>
.more-chapter-list {
    // background-color: white;
    // border-radius: 16px;
    // padding: 48px 32px;
    h4 {
        border: 0;
        font-weight: normal;
    }
    .more-chapter-item {
        width: 100%;

        .more-chapter-item-title {
            height: 58px;
            cursor: pointer;
            background-color: #f6f7f9;
            padding: 0 21px 0 17px;
            border-radius: 8px;
            .catalog-name {
                font-weight: bold;
            }
        }
    }
    .more-chapter-item + .more-chapter-item {
        margin-top: 16px;
    }
    .chapter-up-down {
        display: block;
        width: 16px;
        height: 16px;
    }
    .more-chapter-img {
        display: block;
        width: 22px;
        height: 22px;
        margin-right: 17px;
    }
    .pl40 {
        padding-left: 40px;
    }

    .pl40:hover {
        background-color: #eeeff6;
        border-radius: 8px;
        /deep/ .chapters-name {
            color: #ff2e30;
        }
    }
}
</style>
