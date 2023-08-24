<template>
    <a :href="link" target="_blank" class="item-lik" @click="clickYiGuan">
        <div class="item-wrapper" :style="{ width: `${width}`, height: `${height}` }">
            <div class="publicity-wrapper" :style="{ height: `${imgHeght}` }">
                <image-view class="publicity" :placeholder-height="`${imgHeght}`" :src="courseData && courseData.coursePicpath"></image-view>
                <div v-if="isShowType" class="course-type">体验课</div>
                <div class="bottom-status">
                    <div v-if="courseData.extraData === 'Y'" class="course-recommend">推荐</div>
                    <div v-else></div>
                    <span v-if="isShowTimeNotice" class="promotion-endTime">距活动结束&ensp;{{ promotionTime }}</span>
                </div>
            </div>
            <div class="content-wrapper">
                <p class="goods-name-wrapper" :class="[isOneLineTitle ? 'one-line' : '']">
                    <b class="sale-tag" v-if="courseData.saleTagName">{{ courseData.saleTagName }}</b>
                    <strong class="goods-name">{{ courseData.goodsName }}</strong>
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
        courseData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        isShowType: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '280px',
        },
        height: {
            type: String,
            default: '313px',
        },
        imgHeght: {
            type: String,
            default: '175px',
        },
        isOneLineTitle: {
            type: Boolean,
            default: false,
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
        return Promise.resolve();
    },
    computed: {
        price() {
            if (this.promotion === '免费') {
                return 0;
            } else if (this.promotion === '限时免费') {
                return 0;
            } else if (this.promotion === '限时特价') {
                return this.courseData.coursePromotionprice / 100;
            } else if (this.promotion === '特价') {
                return this.courseData.coursePromotionprice / 100;
            }
            return this.courseData.coursePrice / 100;
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
                this.courseData.coursePromotiontype === 'F' &&
                Date.now() < Date.parse(this.courseData.coursePromotionendtime) &&
                Date.now() > Date.parse(this.courseData.coursePromotionstarttime)
            ) {
                return '限时免费';
            } else if (
                this.courseData.coursePromotiontype === 'L' &&
                Date.now() < Date.parse(this.courseData.coursePromotionendtime) &&
                Date.now() > Date.parse(this.courseData.coursePromotionstarttime)
            ) {
                return '限时特价';
            } else if (this.courseData.coursePromotiontype === 'S') {
                return '特价';
            }
            return '';
        },
        link() {
            return `/trial-course/detail/${this.courseData.goodsId}`;
        },
        isShowTimeNotice() {
            if (this.courseData.coursePromotiontype === 'N') {
                return false;
            } else if (this.courseData.coursePromotiontype === 'S') {
                return false;
            }

            if (Date.now() < Date.parse(this.courseData.coursePromotionstarttime)) {
                return false;
            } else if (Date.now() > Date.parse(this.courseData.coursePromotionendtime)) {
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
            if (!this.courseData.courseBright) {
                return '';
            }
            const item = this.courseData.courseBright.find((element) => {
                return element.type === '3';
            });
            return item?.content ?? '';
        },
    },
    watch: {
        courseData: {
            handler() {
                this.handleTimer();
            },
            deep: true,
        },
    },
    mounted() {
        this.handleTimer();
    },
    methods: {
        handleTimer() {
            if (this.isShowTimeNotice === false) {
                return;
            }
            this.timer = this.$countDown.runTime(Date.parse(this.courseData.coursePromotionendtime), Date.now(), (obj) => {
                if (!obj) {
                    return clearTimeout(this.timer);
                }
                this.day = obj.day;
                this.hour = obj.hour;
                this.minutes = obj.minutes;
                this.seconds = obj.seconds;
            });
        },

        // 点击获取易观所需要的信息
        clickYiGuan() {
            this.$emit('click-yi-guan', {
                module_type: '体验课',
                course_name: this.courseData.goodsName || '',
                project_position: this.courseData.projectId,
            });
            this.$yiguan.track('youlu_click_list_course', {
                course_name: this.courseData.goodsName,
                project_id: this.courseData.projectId,
                subject_id: this.courseData.subjectId ? this.courseData.subjectId : '-',
                course_type: '体验课',
                page_type: '课程集合页',
                page_name: document.title,
                sort_name: '-',
                channel_name: '-',
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
.item-lik {
    transition: all 0.2s linear;
    overflow: hidden;
    position: relative;
    float: left;
}
.item-wrapper {
    background-color: white;
    border-radius: 8px;
    color: #3a3d4b;
    clear: both;
}
.publicity-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    img {
        width: 100%;
        height: 100%;
    }
}
.publicity {
    width: 100%;
    transition: 0.5s ease-in-out;
}

.item-lik:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 0 10px 0 rgba(58, 61, 75, 0.1);
    /deep/.publicity {
        will-change: transform;
        transform: scale(1.08) translateZ(0);
    }
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
    height: 46px;
}
.one-line {
    -webkit-line-clamp: 1;
    height: 22px;
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
    overflow: hidden;
}
.price {
    color: #ff2e30;
    font-size: 18px;
    font-weight: bold;
    margin-top: 0;
    letter-spacing: -3px;
    position: absolute;
    bottom: 20px;
}
.price-yuan {
    font-weight: bold;
    letter-spacing: normal;
}

.price-yuan::before {
    content: '￥';
    font-size: 14px;
}
.price-fen {
    font-size: 13px;
    font-weight: bold;
    letter-spacing: normal;
}
.course-type {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 6px 5px;
    height: 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
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
.bottom-status {
    padding-left: 8px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.promotion-endTime {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 12px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 6px 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
}

.course-recommend {
    width: 38px;
    height: 18px;
    box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 7px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
}
</style>
