<template>
    <a :href="link" target="_blank" @click="clickHandle(item)" class="item-lik">
        <div class="item-wrapper">
            <div class="publicity-wrapper">
                <image-view class="publicity" :src="item.coursePicpath"></image-view>
                <span v-if="isShowTimeNotice" class="promotion-endTime">距活动结束&ensp;{{ promotionTime }}</span>
            </div>
            <div class="content-wrapper">
                <p class="goods-name-wrapper">
                    <b class="sale-tag" v-if="item.saleTagName">{{ item.saleTagName }}</b>
                    <strong class="goods-name">{{ item.goodsName }}</strong>
                </p>
                <p class="bright">{{ courseBright }}</p>
                <div class="price">
                    <span class="price-yuan">{{ yuan }}</span>
                    <span class="price-fen">{{ fen }}</span>
                    <span v-show="promotion" class="promotion">{{ promotion }}</span>
                </div>
            </div>
        </div>
    </a>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        saleTagId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            dataList: [],
            day: 0,
            hour: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    fetch() {
        this.$platform.isClient() && this.handleTimer();
        return Promise.resolve();
    },
    computed: {
        price() {
            if (this.promotion === '免费') {
                return 0;
            } else if (this.promotion === '限时免费') {
                return 0;
            } else if (this.promotion === '限时特价') {
                return this.item.coursePromotionprice / 100;
            } else if (this.promotion === '特价') {
                return this.item.coursePromotionprice / 100;
            }
            return this.item.coursePrice / 100;
        },
        yuan() {
            return parseInt(this.price);
        },
        fen() {
            const reg = /\.[0-9]*$/.exec(this.price);
            return reg && reg[0];
        },
        promotion() {
            if (
                this.item.coursePromotiontype === 'F' &&
                Date.now() < Date.parse(this.item.coursePromotionendtime) &&
                Date.now() > Date.parse(this.item.coursePromotionstarttime)
            ) {
                return '限时免费';
            } else if (
                this.item.coursePromotiontype === 'L' &&
                Date.now() < Date.parse(this.item.coursePromotionendtime) &&
                Date.now() > Date.parse(this.item.coursePromotionstarttime)
            ) {
                return '限时特价';
            } else if (this.item.coursePromotiontype === 'S') {
                return '特价';
            }
            return '';
        },
        link() {
            return `/trial-course/detail/${this.item.goodsId}`;
        },
        isShowTimeNotice() {
            if (this.item.coursePromotiontype === 'N') {
                return false;
            } else if (this.item.coursePromotiontype === 'S') {
                return false;
            }

            if (Date.now() < Date.parse(this.item.coursePromotionstarttime)) {
                return false;
            } else if (Date.now() > Date.parse(this.item.coursePromotionendtime)) {
                return false;
            }
            return true;
        },
        promotionTime() {
            let s = '';
            if (this.day > 0) {
                s += `${this.day}天`;
            }
            s += ` ${this.hour.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
            return s;
        },
        courseBright() {
            if (!this.item.courseBright) {
                return '';
            }
            const item = this.item.courseBright.find((element) => {
                return element.type === '3';
            });
            return item?.content ?? '';
        },
    },
    methods: {
        clickHandle(item) {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: item.goodsName,
                project_id: item.projectId,
                subject_id: item.subjectId ? item.subjectId : '-',
                course_type: '体验课',
                page_type: '资源列表页',
                page_name: document.title,
                sort_name: this.saleTagId ? this.saleTagId : '-',
                channel_name: '-',
            });
        },
        handleTimer() {
            if (this.isShowTimeNotice === false) {
                return;
            }
            this.timer = this.$countDown.runTime(Date.parse(this.item.coursePromotionendtime), Date.now(), (obj) => {
                if (!obj) {
                    return clearTimeout(this.timer);
                }
                this.day = obj.day;
                this.hour = obj.hour;
                this.minutes = obj.minutes;
                this.seconds = obj.seconds;
            });
        },
    },
};
</script>
<style scoped lang="less">
strong {
    border: 0;
    font-weight: normal;
}
.item-lik {
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
}
.item-wrapper {
    width: 280px;
    height: 326px;
    background-color: white;
    border-radius: 8px;
    color: #3a3d4b;
}
.publicity-wrapper {
    height: 175px;
    width: 280px;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.publicity {
    height: 175px;
    width: 280px;
    transition: 0.5s ease-in-out;
}

.publicity:hover {
    will-change: transform;
    transform: scale(1.08) translateZ(0);
}

.content-wrapper {
    padding: 12px 5px 20px 16px;
}
.goods-name-wrapper {
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 22px;
    min-height: 46px;
}
.sale-tag {
    font-size: 12px;
    background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
    border-radius: 0px 6px 0px 6px;
    color: white;
    padding: 1px 10px;
}
.goods-name {
    font-size: 14px;
    font-weight: bold;
}
.bright {
    font-size: 12px;
    color: #53586c;
    margin-top: 8px;
    height: 45px;
    overflow: hidden;
}
.price {
    color: #ff2e30;
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
    letter-spacing: -3px;
}
.price-yuan {
    font-weight: bold;
    letter-spacing: normal;
}

.price-yuan::before {
    content: '￥';
    font-size: 12px;
}
.price-fen {
    font-size: 13px;
    font-weight: bold;
    letter-spacing: normal;
}
.promotion {
    font-size: 12px;
    color: #a96b00;
    background: linear-gradient(228deg, #f0c862 9%, #ffe7a4);
    border-radius: 11px 10px 10px 0px;
    padding: 1px 10px;
    letter-spacing: normal;
    margin-left: 5px;
    vertical-align: 2px;
}
.promotion-endTime {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 12px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 6px 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
}
</style>
