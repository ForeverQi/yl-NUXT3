<template>
    <div class="chapters-item flex ai-center">
        <!--课件类型(1:录播;2:直播;4:资料)-->
        <div v-if="item.coursewareType === '1' || isLiveendAndVideo" class="chapters-item-wrapper">
            <div class="flex ai-center mb12">
                <img src="./asset/images/living.png" alt="" class="living-img" />
                <p class="chapters-name">{{ item.coursewareName }}</p>
                <div class="shiting-box" v-if="auditionAble">
                    <img src="./asset/images/shiting.png" alt="" class="shiting-img" />
                    <span class="font-bold">可试听</span>
                </div>
            </div>
            <div class="chapters-time flex">
                总时长：{{ item.diffDateMinute | timeFormat }}
                <span class="tag">{{ buyTag }}</span>
            </div>
        </div>
        <div v-else-if="item.coursewareType === '2'" class="chapters-item-wrapper">
            <div class="flex ai-center mb12">
                <img src="./asset/images/living.png" alt="" class="living-img" />
                <p class="chapters-name">{{ item.coursewareName }}</p>
            </div>
            <div class="chapters-time flex">
                直播时间：{{ item.coursewareStarttime }}
                <span class="tag">{{ buyTag }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'chaptersItemModel',
    filters: {
        timeFormat: (val) => {
            // diffDateMinute 按秒来解析
            return `${Math.floor(val / 0xe10)
                .toString()
                .padStart(2, '0')}:${Math.floor((val % 0xe10) / 0x3c)
                .toString()
                .padStart(2, '0')}:${((val % 0xe10) % 0x3c).toString().padStart(2, '0')}`;
        },
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isLogin: false,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        isFree() {
            if (this.experienceClass.courseOpenstatus === '2') {
                return true;
            } else if (this.experienceClass.coursePromotiontype === 'F') {
                // N:无促销;F:限时免费;L:限时特价;S特价
                return (
                    Date.parse(this.experienceClass.coursePromotionendtime) > Date.now() &&
                    Date.parse(this.experienceClass.coursePromotionstarttime) < Date.now()
                );
            }
            return false;
        },
        auditionAble() {
            if (this.item.coursewareType === '2' && Date.now() < Date.parse(this.item.coursewareEndtime)) {
                return false;
            }
            return this.item.coursewareAuditionstatus !== 'N';
        },
        isLiveendAndVideo() {
            // 直播结束并且上传回放
            // 有回放没时间
            if (this.item.coursewareType === '2') {
                if (Date.now() > Date.parse(this.item.coursewareEndtime) && this.item.coursewareOnlineplaypath) {
                    return true;
                } else if ((!this.item.coursewareStarttime || !this.item.coursewareEndtime) && this.item.coursewareOnlineplaypath) {
                    return true;
                }
            }
            return false;
        },
        buyTag() {
            // 免费且未登录/未领取时，文案为：领取后，即可学习
            // 付费且未登录/未领取时，文案为：购买后，即可学习
            // 已领取/已购买时，文案为：点击目录，开始学习
            if (this.auditionAble) {
                return '点击目录，可试听';
            }
            // 收费的展示：购买后即可学习，免费的展示：领取后即可学习
            if (this.isBuy) {
                return '开始学习';
            }
            return this.isFree ? '领取后，即可学习' : '购买后，即可学习';
        },
        isBuy() {
            return this.experienceClass.drawStatus === 1;
        },
    },
};
</script>
<style lang="less" scoped>
.chapters-item {
    width: 100%;
    height: 83px;
    cursor: pointer;
    .chapters-item-wrapper {
        flex: 1;
    }
    .living-img {
        width: 22px;
        height: 22px;
        margin-right: 16px;
        display: block;
    }
    .shiting-img {
        width: 12px;
        height: 12px;
        margin-right: 4px;
    }
    .chapters-name {
        font-size: 16px;
        line-height: 16px;
        color: #333333;
        font-weight: bold;
    }
    .chapters-time {
        font-size: 14px;
        line-height: 14px;
        color: #666;
        padding-left: 38px;
        padding-right: 30px;
        justify-content: space-between;
        .tag {
            color: #ff5f00;
            display: none;
        }
    }
    .mb12 {
        margin-bottom: 12px;
    }
    .shiting-box {
        padding: 4px 8px;
        border-radius: 4px;
        color: #f8323c;
        background-color: rgba(248, 50, 60, 0.1);
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-left: 14px;
    }
    .font-bold {
        font-weight: bold;
    }
    &:hover {
        .chapters-time {
            .tag {
                display: inline;
            }
        }
    }
}
</style>
