<template>
    <div class="content-right">
        <div class="right-top flex ai-center">
            <img src="./asset/images/sameClass.png" alt="" />
        </div>
        <div class="list-box">
            <div class="list-item flex ai-center" v-for="item in liveList" :key="item.goodsId" @click="toDetail(item)">
                <image-view class="item-left" :src="$urlUtils.getViewUrl(item.goodsCover)"></image-view>
                <div class="item-right flex jc-between column">
                    <div class="item-title text-overflow-2">{{ item.goodsName }}</div>
                    <div class="item-class-num">
                        直播时间:
                        <span class="spilt"></span>
                        {{ item.courseStartTime | dayFormat }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mapActions } from 'vuex';
import '@/api/mcp/api..query-liveCourse-web-liveCalendarList.js';
export default {
    name: 'listBoxModel',
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY.MM.DD HH:mm');
        },
    },
    data() {
        return {
            liveList: [],
            projectIdsArry: [],
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getRecommendProjectList().then((list) => {
            list.forEach((item) => {
                this.projectIdsArry.push(item.projectId);
            });
            this.getLiveList();
        });
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        getLiveList() {
            this.$callApi('mcp/query-liveCourse-web-liveCalendarList', {
                // projectIds: this.projectIdsArry.join(','),
                projectIds: '',
                findCount: 8,
                showClient: 'W',
                onsuccess: (res) => {
                    this.liveList = res.splice(0, 8);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        toDetail(item) {
            window.open(`/free-course/detail/${item.goodsId}`, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.content-right {
    width: 324px;
    margin-left: 16px;

    .right-top {
        background-color: #fff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 60px;
        padding-left: 20px;
        img {
            width: auto;
            height: 17px;
        }
    }
}
.list-box {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #fff;
    margin-top: -5px;
    padding-top: 10px;
    .list-item {
        padding: 10px 20px;
        cursor: pointer;
        .item-left {
            display: block;
            width: 128px;
            height: 80px;
            margin-right: 12px;
            border-radius: 6px;
            overflow: hidden;
        }
        .item-right {
            width: calc(100% - 140px);
            height: 80px;
            padding-bottom: 6px;
            color: #333333;
            .item-title {
                width: 100%;
                font-size: 14px;
                line-height: 19px;
            }
            .item-class-num {
                font-size: 11px;
                line-height: 16px;
                color: #9698a2;
                transform: scale(0.91);
                margin-left: -6px;
                margin-right: -2px;

                .spilt {
                    width: 2px;
                }
            }
        }
        &:hover {
            .item-right {
                color: #ff2e30;
            }
        }
    }
}
</style>
