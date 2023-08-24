<template>
    <div class="level-section">
        <div class="level-title">
            {{ itemData.data.title }}
            <div class="pages" v-if="itemData.data.total > 4">
                <img src="./asset/images/page-left1.png" v-if="curPage === 1" class="left" />
                <img src="./asset/images/page-left2.png" v-else class="left" @click="prev" />
                <span class="name">
                    <span class="cur_num">{{ curPage }}</span>
                    /
                    <span class="total_num">{{ pageNum }}</span>
                </span>
                <img src="./asset/images/page-right2.png" class="right" v-if="curPage === pageNum" />
                <img src="./asset/images/page-right1.png" class="right" v-else @click="next" />
            </div>
        </div>
        <div class="content-list">
            <item :item-data="item" v-for="item in lists" :key="item.id" />
        </div>
    </div>
</template>
<script>
import '@/api/mcu/api.mcu-08.home-level-page.js';
import dayjs from 'dayjs';
import Item from './components/Item.vue';
export default {
    components: {
        Item,
    },
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    data: {
                        items: [],
                        title: '',
                        total: 0,
                    },
                };
            },
        },
    },
    data() {
        return {
            typeMap: {
                N: '无促销',
                F: '限时免费',
                L: '限时特价',
                S: '特价',
            },
            curPage: 1,
            showNum: 4,
            lists: [],
        };
    },
    computed: {
        pageNum() {
            return Math.ceil(this.itemData.data.total / 4);
        },
    },
    mounted() {
        this.lists = this.itemData.data.items;
    },
    methods: {
        showTime(item) {
            if (!item.coursePromotionendtime) {
                this.$set(item, 'timeStr', '');
                return false;
            }
            let endTime = dayjs(item.coursePromotionendtime).unix();
            let curTime = dayjs().unix();
            this.$countDown.runTime(endTime, curTime, (obj) => {
                if (typeof obj === 'undefined') {
                    this.$set(item, 'timeStr', '');
                    return '';
                } else {
                    let str = '';
                    if (obj.day) {
                        str += obj.day + '天 ';
                    }
                    str += `${obj.hour}:${obj.minutes}:${obj.seconds}`;
                    this.$set(item, 'timeStr', str);
                }
            });
            return this.checkDate(item) && item.coursePromotiontype !== 'S' && item.coursePromotiontype !== 'N';
        },
        checkDate(item) {
            if (!item.coursePromotionendtime) {
                return false;
            }
            let endDate = dayjs(item.coursePromotionendtime);
            let currentDate = dayjs();
            // 优惠未结束
            return endDate.diff(currentDate) > 0;
        },
        getList() {
            let data = {
                url: 'home/home-level-page',
                params: {
                    componentId: this.itemData.data.componentId,
                    pageIndex: this.curPage,
                    pageSize: this.showNum,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.lists = res;
            });
        },
        prev() {
            if (this.curPage === 1) {
                return;
            }
            this.curPage -= 1;
            this.getList();
        },
        next() {
            if (this.curPage === this.pageNum) {
                return;
            }
            this.curPage += 1;
            this.getList();
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.level-section {
    // padding-top: 20px;
    padding-bottom: 10px;
    width: 1200px;
    margin: 0 auto;

    .level-title {
        font-size: 20px;
        font-weight: 700;
        height: 62px;
        line-height: 62px;
        display: flex;
        justify-content: space-between;

        .pages {
            font-size: 16px;
            .right,
            .left {
                width: 15px;
                height: 15px;
                cursor: pointer;
            }

            .name {
                .cur_num {
                    color: #025eff;
                }
                .total_num {
                    color: #414452;
                }
            }
        }
    }

    .content-list {
        padding: 12px 0;
        display: flex;
        margin: 0 -13px;
        overflow: hidden;
        flex-wrap: wrap;
    }
}
</style>
