<template>
    <div class="recommend-course-item">
        <div class="course-left" @click="jumpUrl">
            <image-view :src="imgUrl" class="img" />
            <!-- 标签 -->
            <div class="course-label" v-if="labelName">{{ labelName }}</div>
            <!-- 体验课的倒计时 -->
            <div v-if="itemData.resourceType === 'TY' && isShowTimeNotice" class="course-countdown">
                <span>距活动结束 {{ promotionTime }}</span>
            </div>
        </div>
        <div class="course-right">
            <div class="course-right_title" @click="jumpUrl">
                <!-- 公开课-直播中的gif图片 -->
                <img v-if="itemData.resourceType === 'ZB' && itemData.courseStatus === '2'" class="living-img" src="../../asset/images/start.gif" />
                <span>{{ titleName }}</span>
            </div>
            <div class="course-right_content">
                <!-- 公开课 -->
                <p v-if="itemData.resourceType === 'ZB'">{{ liveTime }}</p>
                <!-- 体验课 -->
                <p v-else-if="itemData.resourceType === 'TY'">{{ courseBright }}</p>
                <!-- 系统课 -->
                <div v-else-if="itemData.resourceType === 'XT'" class="system-course">
                    <div class="course-area">{{ cityInfo.cityName }}</div>
                    <div class="content-label" :class="{ 'more-label': classtypeHighlights.length > 1 }">
                        <span v-for="(item2, index) in classtypeHighlights" :key="index">{{ item2 }}</span>
                    </div>
                </div>
            </div>
            <!-- 价格 -->
            <div class="course-right_price">
                <!-- 公开课 -->
                <div v-if="itemData.resourceType === 'ZB'" class="price-zb">免费</div>
                <!-- 体验课 -->
                <div v-else-if="itemData.resourceType === 'TY'" class="price-ty">
                    <span class="price-symbol">&#65509;</span>
                    <div class="price-num" :class="{ 'price-num_time': promotion === '限时免费' }">
                        <span class="price-left">{{ price.left }}</span>
                        <span v-if="price.right !== '00'" class="price-right">.{{ price.right }}</span>
                    </div>
                </div>
                <!-- 系统课 -->
                <div v-else-if="itemData.resourceType === 'XT'">
                    <div class="price-num" v-if="minPrice.left === maxPrice.left && minPrice.right === maxPrice.right">
                        <span class="price-symbol">&#65509;</span>
                        <span class="price-left">{{ minPrice.left }}</span>
                        <span v-if="minPrice.right !== '00'" class="price-right">.{{ minPrice.right }}</span>
                    </div>
                    <div class="price-num" v-else>
                        <span class="price-symbol">&#65509;</span>
                        <!-- 价格范围 -->
                        <div class="price-content">
                            <!-- 起始价格 -->
                            <span class="price-left">{{ minPrice.left }}</span>
                            <span v-if="minPrice.right !== '00'" class="price-right">.{{ minPrice.right }}</span>
                            <!-- 横线 -->
                            <span class="price-content_connect">-</span>
                            <!-- 最大价格 -->
                            <span class="price-left">{{ maxPrice.left }}</span>
                            <span v-if="maxPrice.right !== '00'" class="price-right">.{{ maxPrice.right }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    props: {
        /**
         * item 数据
         */
        item: {
            type: Object,
            /**
             * 默认值
             *
             * @returns { object } default
             */
            default() {
                return {};
            },
        },
        cityInfo: {
            type: Object,
            /**
             * 默认值
             *
             * @returns { object } default
             */
            default() {
                return {
                    cityCode: '',
                    cityName: '',
                };
            },
        },
    },
    /**
     * @returns { object} 数据模型
     */
    data() {
        return {
            imgUrl: '',
            labelName: '',
            titleName: '',
            day: 0,
            hour: 0,
            minutes: 0,
            seconds: 0,
            goodsId: '',
            itemData: {},
        };
    },
    computed: {
        /**
         * @returns {string} 直播时间
         */
        liveTime() {
            let courseStartTime = this.itemData.courseStartTime;
            if (courseStartTime) {
                courseStartTime = courseStartTime.replace('-', '/');
            }
            return `直播时间：${dayjs(courseStartTime).format('YYYY-MM-DD HH:mm')}`;
        },
        /**
         * @returns {string} 标签
         */
        courseBright() {
            if (!this.itemData.courseBright) {
                return '';
            }
            return this.itemData?.courseBright ?? '';
        },
        /**
         * @returns {string} 距离活动结束时间
         */
        promotionTime() {
            let s = '';
            if (this.day > 0) {
                s += `${this.day}天`;
            }
            s += ` ${this.hour.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
            return s;
        },
        /**
         * 是否展示距离活动结束时间
         *
         * @returns {boolean} true | false
         */
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
        /**
         * @returns {string} 价格标签
         */
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
        /**
         * @returns {string} price标签
         */
        price() {
            let price = 0;
            if (this.promotion === '免费') {
                price = 0;
            } else if (this.promotion === '限时特价') {
                price = this.itemData.coursePromotionprice / 100;
            } else if (this.promotion === '特价') {
                price = this.itemData.coursePromotionprice / 100;
            }
            price = this.itemData.coursePrice / 100;
            price = price.toFixed(2);
            let arr = price.split('.');
            // if (arr.length == 2 && arr[1] === '00') {
            //     return arr[0];
            // }
            if (this.promotion === '限时免费') {
                return '限免';
            }
            const obj = {
                left: arr[0],
                right: arr[1],
            };
            return obj;
        },
        /**
         * @returns {string} 系统课亮点标签
         */
        classtypeHighlights() {
            let classtypeHighlights = this.itemData.classtypeHighlights || '';
            if (classtypeHighlights === '') {
                return [];
            }
            return classtypeHighlights.split(',').slice(0, 2);
        },
        /**
         * @returns {string} 系统课最小价格
         */
        minPrice() {
            let price = (this.itemData.minPrice / 100).toFixed(2);
            let arr = price.split('.');
            const obj = {
                left: arr[0],
                right: arr[1],
            };
            return obj;
        },
        /**
         * @returns {string} 系统课最大价格
         */
        maxPrice() {
            let price = (this.itemData.maxPrice / 100).toFixed(2);
            let arr = price.split('.');
            const obj = {
                left: arr[0],
                right: arr[1],
            };
            return obj;
        },
    },
    /**
     * watch 监听
     */
    watch: {
        /**
         * 监听数据来源的变化
         */
        item: {
            /**
             *
             * @param {object} newValue 新值
             */
            handler(newValue) {
                this.itemData = newValue;
                this.init();
            },
            deep: true,
            immediate: true,
        },
    },
    /**
     * mounted生命周期函数
     */
    mounted() {
        this.init();
    },
    methods: {
        /**
         * 数据初始化
         */
        init() {
            switch (this.itemData.resourceType) {
                // 公开课
                case 'ZB':
                    this.imgUrl = this.itemData.goodsCover;
                    this.labelName = '公开课';
                    this.titleName = this.itemData.goodsName;
                    this.goodsId = this.itemData.goodsId;
                    break;
                // 体验课
                case 'TY':
                    this.imgUrl = this.itemData.coursePicpath;
                    this.labelName = '体验课';
                    this.titleName = this.itemData.goodsName;
                    this.goodsId = this.itemData.goodsId;
                    break;
                // 系统课
                case 'XT':
                    this.imgUrl = this.itemData.classtypeAppcoverimgurl;
                    this.labelName = '系统课';
                    this.titleName = this.itemData.classtypeName;
                    this.goodsId = this.itemData.classtypeId;
                    break;
            }
        },
        /**
         * 体验课倒计时
         */
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
        /**
         * 配置信息
         */
        track() {
            console.log(this.itemData);
            const projectInfo = this.$storage.get('indexSelectProject') || {};
            const data = {
                course_name: this.itemData.goodsName || this.itemData.classtypeName,
                college_name: '-', // 学院名称
                project_id: projectInfo.projectId ?? '-', // 用户已选项目ID
                course_type: this.labelName, //
                subject_id: '-',
            };
            this.$yiguan.track('youlu_click_the_recommended_course_for_you', data);
        },
        /**
         * 跳转课程详情
         */
        jumpUrl() {
            this.track();
            if (this.item.resourceType === 'XT') {
                this.$PageUtil.openNewPage(`/pro-course/detail/${this.goodsId}`, '_blank');
            } else if (this.item.resourceType === 'TY') {
                this.$PageUtil.openNewPage(`/trial-course/detail/${this.goodsId}`, '_blank');
            } else {
                this.$PageUtil.openNewPage(`/free-course/detail/${this.goodsId}`, '_blank');
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../asset/css/course-item.less';
</style>
