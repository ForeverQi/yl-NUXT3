<template>
    <div v-if="currentList.length > 0">
        <div class="live-calendar-title">
            <div class="calendar-title_left">
                <img src="./asset/images/liveroomLogo.png" />
                <span class="live-calendar-title-text">公开课</span>
                <span class="live-calendar-more" @click="toOpenList">更多</span>
            </div>
            <div class="calendar-title_right" v-if="pageData.pageCount > 1">
                <span class="paging">
                    <span class="arrow-left" @click="prePage" :class="pageData.pageIndex > 1 ? 'arrow-left-check' : ''"></span>
                    <span class="page-num">
                        <span class="active">{{ pageData.pageIndex }}</span>
                        <span class="line">/</span>
                        {{ pageData.pageCount }}
                    </span>
                    <span class="arrow-right" :class="pageData.pageIndex < pageData.pageCount ? 'arrow-right-check' : ''" @click="nextPage"></span>
                </span>
            </div>
        </div>
        <ul class="calendar-list">
            <li v-for="item in currentList" :key="item.goodsId">
                <div class="horizontal-line"></div>
                <div class="calendar-date">
                    <div class="content">
                        <span class="live-status-ongoing" v-if="item.courseStatus === 2"></span>
                        <span class="live-status-notstart" v-if="item.courseStatus === 1"></span>
                        <span>{{ item.liveTimeWeek === '今天' ? item.liveTimeWeek : item.liveTimeDate }}</span>
                        <span :class="item.liveTimeWeek === '今天' ? '' : 'no-today-time'">{{ item.liveTimeTime }}</span>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="operate-btn_parent">
            <template v-if="pageData.pageCount > 1">
                <div
                    class="pre-btn operate-btn"
                    :class="{ checkSwiperBtn: pageData.pageIndex > 1 }"
                    @mouseover="leftCheck = pageData.pageIndex > 1 ? 2 : 1"
                    @mouseleave="leftCheck = 1"
                    @click="prePage"
                >
                    <img v-if="leftCheck === 1" src="./asset/images/notLiveroomLeft.png" />
                    <img v-else-if="leftCheck === 2" src="./asset/images/liveroomLeft.png" />
                </div>
                <div
                    class="next-btn operate-btn"
                    :class="{ checkSwiperBtn: pageData.pageIndex < pageData.pageCount }"
                    @mouseover="rightCheck = pageData.pageIndex < pageData.pageCount ? 2 : 1"
                    @mouseleave="rightCheck = 1"
                    @click="nextPage"
                >
                    <img v-if="rightCheck === 1" src="./asset/images/notLiveroomRight.png" />
                    <img v-else-if="rightCheck === 2" src="./asset/images/liveroomRight.png" />
                </div>
            </template>
            <live-calendar-item v-for="(item, index) in currentList" :key="index" :item="item"></live-calendar-item>
        </ul>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import LiveCalendarItem from './components/live-calendar-index-item/index.vue';
import '@/api/mcp/api..query-liveCourse-web-liveCalendarList.js';

export default {
    name: 'LiveCalendar',
    components: {
        LiveCalendarItem,
    },
    data() {
        return {
            liveList: [],
            currentList: [],
            pageData: {
                pageIndex: 1,
                pageSize: 5,
                pageCount: 2,
            },
            leftCheck: 1,
            rightCheck: 1,
        };
    },
    fetch() {
        return this.getList();
    },
    methods: {
        getList() {
            return new Promise((resolve, reject) => {
                this.$callApi('mcp/query-liveCourse-web-liveCalendarList', {
                    projectIds: '',
                    findCount: 30,
                    showClient: 'W',
                    onsuccess: (res) => {
                        this.liveList = res;
                        res.forEach((item) => {
                            item.liveTimeDate = dayjs(item.courseStartTime).format('MM月DD号');
                            item.liveTimeTime = dayjs(item.courseStartTime).format('HH:mm');
                            if (dayjs(item.courseStartTime).format('MM月DD日') === dayjs(new Date()).format('MM月DD日')) {
                                item.liveTimeWeek = '今天';
                            } else {
                                switch (dayjs(item.courseStartTime).day()) {
                                    case 0:
                                        item.liveTimeWeek = '周日';
                                        break;
                                    case 1:
                                        item.liveTimeWeek = '周一';
                                        break;
                                    case 2:
                                        item.liveTimeWeek = '周二';
                                        break;
                                    case 3:
                                        item.liveTimeWeek = '周三';
                                        break;
                                    case 4:
                                        item.liveTimeWeek = '周四';
                                        break;
                                    case 5:
                                        item.liveTimeWeek = '周五';
                                        break;
                                    case 6:
                                        item.liveTimeWeek = '周六';
                                        break;
                                }
                            }
                        });
                        if (this.liveList.length === 0) {
                            this.$emit('live-calendar-empty');
                        }
                        this.pageData.pageCount = Math.max(1, Math.ceil(this.liveList.length / this.pageData.pageSize));
                        this.updateList();
                        resolve();
                    },
                    onerror: (error) => {
                        this.$emit('live-calendar-empty');
                        this.$niceloo.api.handleFailure(error);
                    },
                });
            });
        },
        toOpenList() {
            this.$PageUtil.openNewPage('/free-course');
        },
        /**
         * 上一页
         */
        prePage() {
            if (this.pageData.pageIndex > 1) {
                this.pageData.pageIndex = this.pageData.pageIndex - 1;
                if (this.pageData.pageIndex === 1) this.leftCheck = 1;
                this.updateList();
            }
        },
        /**
         * 下一页
         */
        nextPage() {
            if (this.pageData.pageIndex < this.pageData.pageCount) {
                this.pageData.pageIndex = this.pageData.pageIndex + 1;
                if (this.pageData.pageIndex === this.pageData.pageCount) this.rightCheck = 1;
                this.updateList();
            }
        },
        /**
         * 筛选页码对应的数据
         */
        updateList() {
            this.currentList = this.liveList.slice((this.pageData.pageIndex - 1) * this.pageData.pageSize, this.pageData.pageIndex * this.pageData.pageSize);
        },
    },
};
</script>

<style scoped lang="less">
.live-calendar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .calendar-title_left {
        display: flex;
        align-items: center;
        img {
            width: 38px;
            height: 38px;
            margin-right: 10px;
        }
        .live-calendar-title-text {
            font-size: 24px;
            color: #3a3d4b;
            line-height: 62px;
            font-weight: 700;
        }
    }
    .paging {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #414452;
        margin-top: 20px;
        padding-bottom: 18px;
        .page-num {
            padding: 0 14px;
        }
        .line {
            margin: 0 2px;
        }
        .arrow-left,
        .arrow-right {
            width: 18px;
            height: 18px;
            display: inline-block;
            background: url('./asset/images/liveroomDetail_13.png');
            background-size: 100%;
            align-items: center;
            cursor: pointer;
        }
        .arrow-right {
            background: url('./asset/images/liveroomDetail_16.png');
            background-size: 100%;
        }
        .arrow-left-check {
            background: url('./asset/images/liveroomDetail_14.png');
            background-size: 100%;
        }
        .arrow-right-check {
            background: url('./asset/images/liveroomDetail_15.png');
            background-size: 100%;
        }
        .active {
            font-size: 16px;
            color: #ff2e30;
        }
    }
    .live-calendar-more {
        background: url('./asset/images/more.png') no-repeat;
        background-size: 10px 11px;
        background-position-x: right;
        background-position-y: 5px;
        text-align: left;
        width: 40px;
        margin-left: 25px;
        display: inline-block;
        font-size: 14px;
        color: #77798d;
        position: relative;
        cursor: pointer;

        &:hover {
            color: #ff2e30;
        }
    }
}

.calendar-list {
    text-align: center;
    display: flex;
    margin-top: 20px;
    margin-bottom: 38px;
    li {
        width: 20%;
        position: relative;
        box-sizing: border-box;
        float: left;
        .calendar-date {
            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                display: inline-block;
                padding: 0 10px;
                background: #f5f5f5;
            }

            span {
                font-size: 14px;
                color: #3a3d4b;
                font-weight: 700;
            }
            .no-today-time {
                font-weight: normal;
                color: #333333;
                margin-left: 6px;
            }
        }
        .live-status-ongoing,
        .live-status-notstart {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url('./asset/images/live-status-01.gif') no-repeat;
            background-size: 100%;
            margin-right: 4px;
        }
        .live-status-notstart {
            width: 18px;
            height: 18px;
            background: url('./asset/images/live-status-02.png') no-repeat;
            background-size: 100%;
            vertical-align: bottom;
        }
        .horizontal-line {
            height: 2px;
            background: #e6e6e6;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            z-index: -3;
        }
    }
}
ul {
    display: inline-block;
}
.operate-btn_parent {
    position: relative;
    margin-bottom: 64px;
    width: 1200px;
    .operate-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        cursor: pointer;
        border-radius: 50%;
        background: #f8f9fb;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .pre-btn {
        left: -84px;
    }
    .next-btn {
        right: -84px;
    }
}
</style>
