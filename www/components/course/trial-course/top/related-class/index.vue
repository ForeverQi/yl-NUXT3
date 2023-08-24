<template>
    <div class="related-box">
        <div class="related-top">
            <div class="line"></div>
            <div class="related-title">相关课程</div>
        </div>
        <ul class="relate-class-list">
            <li class="class-item" v-for="(item, index) in dataList" :key="index" @click="handleItemClick(item)">
                <!-- <img :src="item.goodsCover" alt="" class="item-img" /> -->
                <image-view :src="item.goodsCover" class="item-img" />
                <div class="item-info">
                    <p class="item-title text-overflow-2">
                        {{ item.goodsName }}
                    </p>
                    <div class="item-price">{{ price(promotion(item), item) }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'relatedClass',
    data() {
        return {
            clientType: 'W',
            dataList: [],
        };
    },
    watch: {
        experienceClass: {
            handler() {
                this.mcpTrialWebRelated();
            },
            deep: true,
        },
    },
    created() {
        this.mcpTrialWebRelated();
    },
    methods: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        mcpTrialWebRelated() {
            return this.$callRawApi({
                api: 'mcp/trial/web/related',
                params: {
                    clientType: this.clientType,
                    projectId: this.experienceClass.projectId,
                    subjectId: this.experienceClass.subjectId,
                },
            })
                .then((response) => {
                    const res = response.getData();
                    res.forEach((item) => {
                        item.goodsCover = this.$urlUtils.getViewUrl(item.goodsCover);
                    });
                    this.dataList.splice(0, this.dataList.length, ...res);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleItemClick(item) {
            window.open(`/trial-course/detail/${item.goodsId}`, '_blank');
        },
        promotion(item) {
            // 观看权限 2:免费;3:付费
            if (item.courseOpenstatus === '2') {
                return '免费';
            } else if (
                item.coursePromotiontype === 'F' &&
                Date.now() < Date.parse(item.coursePromotionendtime) &&
                Date.now() > Date.parse(item.coursePromotionstarttime)
            ) {
                return '限时免费';
            } else if (
                item.coursePromotiontype === 'L' &&
                Date.now() < Date.parse(item.coursePromotionendtime) &&
                Date.now() > Date.parse(item.coursePromotionstarttime)
            ) {
                return '限时特价';
            } else if (item.coursePromotiontype === 'S') {
                return '特价';
            }
            return '';
        },
        price(promotion, item) {
            if (promotion === '限时免费') {
                return '￥' + 0;
            } else if (promotion === '限时特价') {
                return '￥' + item.coursePromotionprice / 100;
            } else if (promotion === '特价') {
                return '￥' + item.coursePromotionprice / 100;
            } else if (promotion === '免费') {
                return '免费';
            }
            return '￥' + item.coursePrice / 100;
        },
    },
};
</script>
<style lang="less" scoped>
.related-box {
    .related-top {
        padding-left: 16px;
        display: flex;
        align-items: center;
        height: 44px;
        .line {
            width: 3px;
            height: 16px;
            margin-right: 9px;
            background-color: #ff2e30;
            border-radius: 1px;
        }
        .related-title {
            line-height: 21px;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
        }
    }
    .relate-class-list {
        .class-item {
            display: flex;
            align-items: center;
            padding: 9px 16px 9px 15px;
            height: 80px;
            cursor: pointer;
            .item-img {
                width: 128px;
                height: 100%;
                display: block;
                margin-right: 12px;
                cursor: pointer;
                border-radius: 3px;
            }
            .item-info {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                .item-title {
                    font-size: 14px;
                    line-height: 19px;
                    color: #fff;
                    word-break: break-all;
                }
                .item-price {
                    font-size: 14px;
                    line-height: 16px;
                    color: #f8323c;
                }
            }
        }
        .class-item:hover {
            background-color: #282943;
        }
    }
}
</style>
