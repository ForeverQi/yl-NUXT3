<template>
    <div class="list-box" id="box">
        <div class="list-item flex ai-center" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
            <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" class="item-img" :onerror="errorimg" />
            <div class="item-info">
                <div class="item-title text-overflow-2">
                    {{ item.goodsName }}
                </div>
                <div class="flex">
                    <!--是否免费 courseOpenstatus2:免费;3:付费-->
                    <template v-if="item.courseOpenstatus === '2'">
                        <span class="item-price">免费</span>
                    </template>
                    <template v-if="item.courseOpenstatus === '3'">
                        <!--在促销时间内显示限免-->
                        <!--促销类型-N:无促销;F:限时免费;L:限时特价;S特价-->
                        <span class="item-price" v-if="item.coursePromotiontype === 'N'">¥{{ (item.coursePrice / 100).toFixed(2) }}</span>
                        <span class="item-price" v-else-if="item.coursePromotiontype === 'F' && checkDate(item)">{{ typeMap[item.coursePromotiontype] }}</span>
                        <span class="item-price" v-else-if="item.coursePromotiontype === 'L' && checkDate(item)">
                            {{ typeMap[item.coursePromotiontype] }}¥{{ (item.coursePromotionprice / 100).toFixed(2) }}
                        </span>
                        <span class="item-price" v-else-if="item.coursePromotiontype === 'S'">
                            {{ typeMap[item.coursePromotiontype] }}¥{{ (item.coursePromotionprice / 100).toFixed(2) }}
                        </span>
                        <span class="item-price" v-else>¥{{ (item.coursePrice / 100).toFixed(2) }}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mcpTrialWebSimilar } from '../../../../../experienceClass/apis';
export default {
    name: 'classRightListModel',
    components: {},
    data() {
        return {
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            typeMap: {
                F: '限免',
                L: '限时特价',
                S: '特价',
            },
            list: [],
        };
    },
    created() {},
    mounted() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            mcpTrialWebSimilar(this, {
                categoryId: '',
                clientType: 'W',
                projectId: this.$route.query.projectId,
            })
                .then((res) => {
                    this.list = res.slice(0, 6);
                })
                .catch((err) => {
                    console.error(4444, err);
                });
        },
        checkDate(item) {
            let endDate = dayjs(item.coursePromotionendtime);
            let startDate = dayjs(item.coursePromotionstarttime);
            if (endDate.diff(item.currentTime) > 0 && startDate.diff(item.currentTime) < 0) {
                return true;
            } else {
                return false;
            }
        },
        toDetail(item) {
            this.$PageUtil.openNewPage(`/agile-course/course/${item.goodsId}`);
        },
    },
};
</script>
<style lang="less" scoped>
.list-box {
    .list-item {
        margin: 18px 0 0;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
        .item-img {
            display: block;
            width: 128px;
            height: 80px;
            margin-right: 12px;
            border-radius: 6px;
        }
        .item-info {
            width: calc(100% - 140px);
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-title {
                font-size: 14px;
                line-height: 19px;
                color: #eee;
            }

            .item-price {
                font-size: 14px;
                color: #f8323c;
                font-weight: bold;
            }
        }
    }
}
</style>
