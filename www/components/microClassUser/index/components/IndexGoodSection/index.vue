<template>
    <div class="good-section" v-if="typeList.length > 0">
        <div class="good-title">
            轻学小知识
            <div class="wrap">
                <div class="menu">
                    <div class="item" :class="{ this: opId === item.optId }" v-for="item in typeList" :key="item.optId" @click="changeId(item)">
                        {{ item.optName }}
                    </div>
                </div>
                <div class="pages" v-if="total > 10">
                    <img src="./asset/images/page-left1.png" v-if="currentPage === 1" class="left" />
                    <img src="./asset/images/page-left2.png" v-else class="left" @click="prev" />
                    <span class="name">
                        <span class="cur_num">{{ currentPage }}</span>
                        /
                        <span class="total_num">{{ pageNum }}</span>
                    </span>
                    <img src="./asset/images/page-right2.png" class="right" v-if="currentPage === pageNum" />
                    <img src="./asset/images/page-right1.png" class="right" v-else @click="next" />
                </div>
            </div>
        </div>
        <div class="content-list">
            <div class="item" v-for="item in courseList" :key="item.goodsId" @click="toDetail(item)">
                <div class="top-img">
                    <img :src="$urlUtils.getViewUrl(item.goodsCover)" />
                    <div class="time" v-if="item.duration">{{ timeForm(item.duration) }}</div>
                </div>
                <div class="name">{{ item.goodsName }}</div>
                <div class="tags">
                    <span class="tag" v-for="(v, index) in item.tags" :key="index">{{ v }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/mcu/api.mcu-06.home-easy-course.js'; // 获取首页轻学课列表
export default {
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            typeList: [],
            opId: '',
            courseList: [],
            total: 0,
            pageSize: 10,
            currentPage: 1,
        };
    },
    computed: {
        pageNum() {
            return Math.ceil(this.total / 10);
        },
        lists() {
            let startIndex = (this.curPage - 1) * this.showNum;
            return this.itemData.data.items.slice(startIndex, this.showNum);
        },
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.init();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.opId = '';
            this.currentPage = 1;
            this.getCategory().then(() => {
                if (this.typeList.length === 0) {
                    return;
                }
                this.getCourseList();
            });
        },
        timeForm(v) {
            if (!v) {
                return '';
            }
            let getM = () => {
                let m = Math.floor(v / 60);
                return m > 9 ? m : `0${m}`;
            };
            let getS = () => {
                let s = v % 60;
                return s > 9 ? s : `0${s}`;
            };
            return `${getM()}:${getS()}`;
        },
        toDetail(item) {
            this.$PageUtil.openNewPage(`/agile-course/knowledge/${item.goodsId}?projectId=${this.projectId}&optId=${this.opId}`);
        },
        getCourseList() {
            // 获取课程列表
            let data = {
                url: 'home/home-easy-course',
                params: {
                    optId: this.opId,
                    projectId: this.projectId,
                    showClient: 'W',
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.total = res.count;
                this.courseList = res.data;
            });
        },
        getCategory() {
            let data = {
                url: 'home/home-type',
                params: {
                    projectId: this.projectId,
                    optType: 'E',
                    showClient: 'W',
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.typeList = res.data;
                if (Array.isArray(res.data) && res.data.length > 0) {
                    this.opId = res.data[0].optId;
                }
                if (res.count == 0) {
                    this.$emit('empty-handle', 'lightCourse');
                }
            });
        },
        prev() {
            if (this.currentPage === 1) {
                return;
            }
            this.currentPage -= 1;
            this.getCourseList();
        },
        next() {
            if (this.currentPage === this.pageNum) {
                return;
            }
            this.currentPage += 1;
            this.getCourseList();
        },
        changeId({ optId, optName }) {
            this.opId = optId;
            this.currentPage = 1;
            this.getCourseList();
            this.trackQxkColumn({
                web_belong_column: optName,
            });
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
        trackQxkColumn(track = {}) {
            this.$yiguan.mcuTrack('wk_qxk_column', {
                web_belong_column: '',
                ...track,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.good-section {
    position: relative;
    width: 1200px;
    margin: 0 auto;

    .good-title {
        font-size: 20px;
        font-weight: 700;
        // height: 62px;
        // line-height: 62px;
        line-height: 1;
        display: flex;
        align-items: center;
        display: flex;
        .wrap {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
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
        .menu {
            display: flex;
            padding-left: 24px;
            .item {
                position: relative;
                padding: 0 24px;
                color: #53586c;
                line-height: 14px;
                font-size: 14px;
                cursor: pointer;

                &.this {
                    color: #025eff;
                }

                &:last-child {
                    &::after {
                        display: none;
                    }
                }

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 10px;
                    width: 1px;
                    right: 0;
                    top: 50%;
                    margin-top: -5px;
                    background-color: #d5d9d9;
                }
            }
        }
    }

    .content-list {
        display: flex;
        margin: 0 -10px;
        overflow: hidden;
        flex-wrap: wrap;
        padding-top: 30px;

        .item {
            width: 224px;
            height: 258px;
            background: #ffffff;
            border: 1px solid #ededf2;
            border-radius: 8px;
            margin: 0 10px;
            margin-bottom: 32px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.2s linear;

            &:hover {
                transform: translate3d(0, -5px, 0);
                box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
            }

            .top-img {
                position: relative;
                height: 140px;

                img {
                    width: 100%;
                    height: 100%;
                }

                .time {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    left: 0;
                    color: #ffffff;
                    font-size: 12px;
                    padding-left: 8px;
                    background: linear-gradient(85deg, rgba(0, 0, 0, 0.6) 4%, rgba(0, 0, 0, 0) 97%);
                    border: 1px solid;
                    border-image: linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1%, rgba(255, 255, 255, 0) 100%) 1 1;
                    box-sizing: content-box;
                }
            }

            .name {
                font-size: 14px;
                color: #3a3d4b;
                line-height: 22px;
                font-weight: bold;
                padding: 0 16px;
                padding-top: 12px;
                height: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
            .status {
                color: #f8323c;
                line-height: 24px;
                font-weight: bold;
                font-size: 18px;
                text-align: right;
                padding-right: 16px;
            }

            .price {
                text-align: right;
                color: #f8323c;
                font-size: 14px;
                font-weight: 700;
                padding-right: 16px;
                letter-spacing: -0.13px;
                text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

                .money {
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: -0.13px;
                    text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
                }
            }
        }
    }
}
.tags {
    padding: 0 16px;
    padding-top: 6px;
    .tag {
        line-height: 12px;
        padding: 5px 7px;
        font-size: 12px;
        color: #ff793c;
        background: rgba(255, 80, 0, 0.08);
        border-radius: 2px;
        margin-right: 4px;
    }
}
</style>
