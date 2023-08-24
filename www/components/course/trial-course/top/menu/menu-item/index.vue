<template>
    <div class="menu-item">
        <p class="item-title text-overflow-2">{{ item.coursewareName }}</p>
        <!--课件类型(1:录播;2:直播;4:资料)  -->
        <div v-if="item.coursewareType === '1' || isLiveendAndVideo" class="flex jc-between ai-center">
            <p class="item-time">总时长：{{ item.diffDateMinute | timeFormat }}</p>
            <!-- 允许试听 -->
            <div class="item-status" v-if="auditionAble">
                <p class="audition">试听</p>
            </div>
            <!-- 禁止试听 -->
            <div class="item-status" v-else></div>
        </div>
        <div v-else-if="item.coursewareType === '2'" class="flex jc-between ai-center">
            <p class="item-time">直播时间：{{ item.coursewareStarttime | livetimeFormat }}</p>
            <!--直播中  -->
            <div class="item-status" v-if="isLiving && isToday && isDraw">
                <img src="./asset/images/living.gif" alt="" class="status-img" />
                <span class="living-test">直播中</span>
            </div>
            <!-- 即将开始 -->
            <div class="item-status" v-else-if="isLivingSoon && isToday && isDraw">
                <img src="./asset/images/begining.png" alt="" class="status-img" />
                <span class="begining-test">即将开始</span>
            </div>
        </div>
        <!-- 锁图标 -->
        <img v-if="isLock" src="./asset/images/lock.png" alt="" class="status-lock" />
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';

export default {
    name: 'menuItemModel',
    filters: {
        timeFormat: (val) => {
            // diffDateMinute 按秒来解析
            return `${Math.floor(val / 0xe10)
                .toString()
                .padStart(2, '0')}:${Math.floor((val % 0xe10) / 0x3c)
                .toString()
                .padStart(2, '0')}:${((val % 0xe10) % 0x3c).toString().padStart(2, '0')}`;
        },
        livetimeFormat: (val) => {
            const arr = val.split(':');
            return arr.length > 2 ? (arr.pop(), arr.join(':')) : val;
        },
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        isLiving() {
            return Date.parse(this.item.coursewareStarttime) < Date.now() && Date.parse(this.item.coursewareEndtime) > Date.now();
        },
        isLivingSoon() {
            return Date.parse(this.item.coursewareStarttime) > Date.now();
        },
        auditionAble() {
            // 是否允许试听
            if (this.item.coursewareType === '2' && (this.isLiving || this.isLivingSoon)) {
                return false;
            }
            return this.item.coursewareAuditionstatus === 'L' || this.item.coursewareAuditionstatus === 'F';
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
        isToday() {
            return (
                this.item.coursewareEndtime.substring(0, 10) === dayjs().format('YYYY-MM-DD') ||
                this.item.coursewareStarttime.substring(0, 10) === dayjs().format('YYYY-MM-DD')
            );
        },
        isEnd() {
            return Date.parse(this.item.coursewareEndtime) < Date.now();
        },
        isDraw() {
            return this.experienceClass.drawStatus === 1;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
        isLock() {
            // 视频类型 [枚举]M:录播;N:直播
            return this.auditionAble === false && this.drawStatus === 0;
        },
    },
    methods: {
        handleAudition() {},
    },
};
</script>
<style lang="less" scoped>
.menu-item {
    padding: 14px;
    background-color: #282943;
    border-radius: 2px;
    margin-bottom: 16px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .item-title {
        line-height: 18px;
        color: #fff;
        font-size: 14px;
        margin-bottom: 18px;
    }
    .item-time {
        font-size: 13px;
        line-height: 13px;
        color: #9698a2;
    }
    .item-status {
        display: flex;
        align-items: center;
        .shiting-type {
            width: 44px;
            height: 16px;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            line-height: 16px;
            border-radius: 2px;
            background-color: #ff2e30;
        }
        .status-img {
            width: 12px;
            height: 12px;
            display: block;
            margin-right: 6px;
        }
        .living-test {
            font-size: 13px;
            line-height: 13px;
            color: #f8323c;
        }
        .begining-test {
            font-size: 13px;
            line-height: 13px;
            color: #f8893b;
        }
        .audition {
            background-color: #ff2e30;
            color: white;
            font-size: 12px;
            padding: 1px 10px;
            border-radius: 2px;
        }
    }
    .item-status-end {
        color: #9698a2;
    }
    .status-lock {
        width: 55px;
        height: 55px;
        position: absolute;
        right: -0;
        bottom: -0;
    }
}
</style>
