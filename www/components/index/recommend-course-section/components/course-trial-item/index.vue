<script lang="jsx">
export default {
    name: 'CourseTrialItem',
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            day: 0,
            hour: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    computed: {
        courseBright() {
            if (!this.itemData.courseBright) {
                return '';
            }
            return this.itemData?.courseBright ?? '';
        },
        promotionTime() {
            let s = '';
            if (this.day > 0) {
                s += `${this.day}天`;
            }
            s += ` ${this.hour.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
            return s;
        },
        isShowTimeNotice() {
            if (this.itemData.coursePromotiontype === 'N' || this.itemData.coursePromotiontype === 'S') {
                return false;
            }
            let coursePromotionstarttime = this.itemData.coursePromotionstarttime;
            if (coursePromotionstarttime) {
                coursePromotionstarttime = coursePromotionstarttime.replaceAll('-', '/');
            }
            let coursePromotionendtime = this.itemData.coursePromotionendtime;
            if (coursePromotionendtime) {
                coursePromotionendtime = coursePromotionendtime.replaceAll('-', '/');
            }
            if (Date.now() < Date.parse(coursePromotionstarttime)) {
                return false;
            } else if (Date.now() > Date.parse(coursePromotionendtime)) {
                return false;
            }
            return true;
        },
        promotion() {
            let coursePromotionstarttime = this.itemData.coursePromotionstarttime;
            if (coursePromotionstarttime) {
                coursePromotionstarttime = coursePromotionstarttime.replaceAll('-', '/');
            }
            let coursePromotionendtime = this.itemData.coursePromotionendtime;
            if (coursePromotionendtime) {
                coursePromotionendtime = coursePromotionendtime.replaceAll('-', '/');
            }
            if (
                this.itemData.coursePromotiontype === 'F' &&
                Date.now() < Date.parse(coursePromotionendtime) &&
                Date.now() > Date.parse(coursePromotionstarttime)
            ) {
                return '限时免费';
            } else if (
                this.itemData.coursePromotiontype === 'L' &&
                Date.now() < Date.parse(coursePromotionendtime) &&
                Date.now() > Date.parse(coursePromotionstarttime)
            ) {
                return '限时特价';
            } else if (this.itemData.coursePromotiontype === 'S') {
                return '特价';
            }
            return '';
        },
        price() {
            let price = 0;
            if (this.promotion === '免费') {
                price = 0;
            } else if (this.promotion === '限时免费') {
                price = 0;
            } else if (this.promotion === '限时特价') {
                price = this.itemData.coursePromotionprice / 100;
            } else if (this.promotion === '特价') {
                price = this.itemData.coursePromotionprice / 100;
            }
            price = this.itemData.coursePrice / 100;
            price = price.toFixed(2);
            let arr = price.split('.');
            if (arr.length == 2 && arr[1] === '00') {
                return arr[0];
            }
            return parseFloat(price);
        },
    },
    mounted() {
        this.handleTimer();
    },
    methods: {
        track() {
            const projectInfo = this.$storage.get('indexSelectProject') || {};
            const data = {
                course_name: this.itemData.goodsName,
                college_name: '-', // 学院名称
                project_id: projectInfo.projectId ?? '-', // 用户已选项目ID
                course_type: '公开课', //
                subject_id: '-',
            };
            this.$yiguan.track('youlu_click_the_recommended_course_for_you', data);
        },
    },
    methods: {
        handleTimer() {
            if (this.isShowTimeNotice === false) {
                return;
            }
            let coursePromotionendtime = this.itemData.coursePromotionendtime;
            if (coursePromotionendtime) {
                coursePromotionendtime = coursePromotionendtime.replaceAll('-', '/');
            }
            this.timer = this.$countDown.runTime(Date.parse(coursePromotionendtime), Date.now(), (obj) => {
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
    render() {
        return (
            <a
                href={`/trial-course/detail/${this.itemData.goodsId}`}
                onClick={() => {
                    this.track();
                }}
                target="_blank"
                class="course-open"
            >
                <div class="type">体验课</div>
                <div class="pic">
                    <image-view src={this.itemData.coursePicpath} class="img" />
                    {this.isShowTimeNotice && (
                        <div class="time-str">
                            {/* 距活动结束2天 <span class="time">07:56:34</span> */}
                            {this.promotionTime}
                        </div>
                    )}
                </div>
                <div class="name">{this.itemData.goodsName}</div>
                <div class="time">{this.courseBright}</div>
                <div class="price">
                    <span class="mark">&#65509;</span>
                    <span class="num">{this.price}</span>
                    {this.promotion && <div class="tag">{this.promotion}</div>}
                </div>
            </a>
        );
    },
};
</script>
<style lang="less" scoped>
.course-open {
    position: relative;
    display: block;
    width: 224px;
    height: 280px;
    padding: 0 16px;
    padding-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        .pic {
            .img {
                transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
            }
        }
    }
    .pic {
        position: relative;
        margin: 0 -16px;
        height: 140px;
        overflow: hidden;

        .img {
            width: 100%;
            height: 100%;
            transition: all 0.5s;
        }

        .time-str {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 6px 10px;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 21px 0px 0px 21px;

            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
            line-height: 16px;

            .time {
                font-size: 12px;
                font-weight: 400;
                height: 16px;
                color: #ffffff;
                line-height: 16px;
                letter-spacing: 0.7px;
            }
        }
    }
    .name {
        padding-top: 13px;
        font-size: 14px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .time {
        height: 13px;
        padding-top: 8px;
        font-size: 12px;
        font-weight: 400;
        color: #53586c;
        line-height: 13px;
    }

    .price {
        padding-top: 35px;
        display: flex;
        height: 20px;
        align-items: flex-end;

        .mark {
            font-size: 14px;
            font-weight: 700;
            color: #ff2e30;
            line-height: 14px;
        }
        .num {
            font-size: 18px;
            font-weight: 700;
            color: #ff2e30;
            line-height: 14px;
        }
        .tag {
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            padding: 0 6px;
            vertical-align: top;
            margin-top: 2px;
            margin-left: 6px;
            color: #a96b00;
            box-sizing: border-box;
            display: inline-block;
            background-image: url(./asset/images/tag.png);
            background-size: 100% 100%;
        }
    }
    .type {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 46px;
        height: 24px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        z-index: 10;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 24px;
    }
}
</style>
