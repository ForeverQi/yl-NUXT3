<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-03-18 15:20:10
 * @Description: 
-->
<template>
    <div class="chapters-item flex ai-center">
        <!--课件类型(1:录播;2:直播;4:资料)-->
        <div v-if="item.coursewareType === '1' || isLiveendAndVideo">
            <div class="flex ai-center mb12">
                <img src="./asset/images/living.png" alt="" class="living-img" />
                <p class="chapters-name">{{ item.coursewareName }}</p>
                <div class="shiting-box" v-if="auditionAble">
                    <img src="./asset/images/shiting.png" alt="" class="shiting-img" />
                    <span class="font-bold">可试听</span>
                </div>
            </div>
            <div class="chapters-time">总时长：{{ item.diffDateMinute | timeFormat }}</div>
        </div>
        <div v-else-if="item.coursewareType === '2'">
            <div class="flex ai-center mb12">
                <img src="./asset/images/living.png" alt="" class="living-img" />
                <p class="chapters-name">{{ item.coursewareName }}</p>
            </div>
            <div class="chapters-time">直播时间：{{ item.coursewareStarttime }}</div>
        </div>
    </div>
</template>
<script>
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
    computed: {
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
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.chapters-item {
    width: 100%;
    height: 83px;
    cursor: pointer;
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
}
</style>
