<template>
    <div class="list-box">
        <div class="list-item flex ai-center" v-for="item in liveList" :key="item.goodsId" @click="toDetail(item)">
            <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" class="item-left" :onerror="errorimg" />
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
</template>
<script>
import dayjs from 'dayjs';
import { liveCourseWebList } from '../../../apis/index.js';

export default {
    name: 'listBoxModel',
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY.MM.DD HH:mm');
        },
    },
    data() {
        return {
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            liveList: [],
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getLiveList();
    },
    methods: {
        getLiveList() {
            return liveCourseWebList(this, {
                showClient: 'W',
                pageIndex: 1,
                pageSize: 8,
            })
                .then((res) => {
                    console.error(res);
                    this.liveList = res.data;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        toDetail(item) {
            if (item.avlStatus === 'Y') {
                window.open(`/agile-course/live-broadcast/${item.goodsId}`, '_blank');
            }
        },
    },
};
</script>
<style lang="less" scoped>
.list-box {
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
        }
        .item-right {
            width: calc(100% - 140px);
            height: 80px;
            padding-bottom: 6px;
            .item-title {
                width: 100%;
                font-size: 14px;
                line-height: 19px;
                color: #333333;
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
    }
}
</style>
