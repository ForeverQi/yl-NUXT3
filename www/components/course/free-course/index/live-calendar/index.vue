<template>
    <div v-if="currentList.length > 0">
        <div class="live-calendar-title">
            <span class="live-calendar-title-text">直播日历</span>
            <span class="paging" v-if="page.pageCount > 1">
                <span class="arrow-left" @click="prePage" :class="page.pageIndex > 1 ? 'arrow-left-check' : ''"></span>
                <span class="page-num">
                    <span class="active">{{ page.pageIndex }}</span>
                    <span class="line">/</span>
                    {{ page.pageCount }}
                </span>
                <span class="arrow-right" :class="page.pageIndex < page.pageCount ? 'arrow-right-check' : ''" @click="nextPage"></span>
            </span>
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
        <ul>
            <open-list-item v-for="(item, index) in currentList" :key="index" :item="item"></open-list-item>
        </ul>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import OpenListItem from '../../components/open-list-item/index.vue';
import '@/api/mcp/api..query-liveCourse-web-liveCalendarList.js';
export default {
    name: 'LiveCalendar',
    components: {
        OpenListItem,
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 4,
                pageCount: 2,
            },
            liveList: [],
            currentList: [],
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
                    findCount: 20,
                    showClient: 'W',
                    onsuccess: (res) => {
                        this.liveList = res.splice(0, 20);
                        this.liveList.forEach((item) => {
                            item.liveTimeDate = dayjs(item.courseStartTime).format('MM月DD号');
                            item.liveTimeTime = dayjs(item.courseStartTime).format('HH:mm');
                            if (dayjs(item.courseStartTime).format('MM月DD日') === dayjs(new Date()).format('MM月DD日')) {
                                item.liveTimeWeek = '今天';
                            }
                        });
                        this.page.pageCount = Math.max(1, Math.ceil(this.liveList.length / this.page.pageSize));
                        this.updateList();
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },
        prePage() {
            if (this.page.pageIndex > 1) {
                this.page.pageIndex = this.page.pageIndex - 1;
                this.updateList();
            }
        },
        nextPage() {
            if (this.page.pageIndex < this.page.pageCount) {
                this.page.pageIndex = this.page.pageIndex + 1;
                this.updateList();
            }
        },
        updateList() {
            this.currentList = this.liveList.slice((this.page.pageIndex - 1) * this.page.pageSize, this.page.pageIndex * this.page.pageSize);
        },
    },
};
</script>

<style scoped lang="less">
.live-calendar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .live-calendar-title-text {
        font-size: 20px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 62px;
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
}

.calendar-list {
    text-align: center;
    display: flex;
    margin-top: 20px;
    margin-bottom: 28px;
    li {
        width: 25%;
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
            background: url('./asset/images/live-status-01.gif');
            background-size: 100%;
            margin-right: 4px;
        }
        .live-status-notstart {
            width: 18px;
            height: 18px;
            background: url('./asset/images/live-status-02.png');
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
</style>
