<template>
    <div class="teacher-section_box">
        <div class="teacher-section" v-if="list.length">
            <div class="section-title">深耕职教，打造口碑师资团队</div>
            <div class="teacher-section_content">
                <!-- 教师数据 -->
                <div class="section-content_label">
                    <div class="content-left">
                        <div class="teacher-name">
                            <!-- <img src="./asset/images/teacher-icon1.png" /> -->
                            <span>{{ selectInfo.teacherName }}</span>
                            <!-- <img src="./asset/images/teacher-icon2.png" /> -->
                        </div>
                        <div class="teacher-label">
                            <div class="teacher-label_child" v-for="(item, index) in selectInfo.newProjectList" :key="index">
                                <img src="./asset/images/teacher-medal.png" />
                                <span>{{ item.projectName }}</span>
                            </div>
                        </div>
                        <span class="teacher-desc" id="textContainerId" ref="textContainer">
                            {{ selectInfo.teacherBrief }}
                        </span>
                    </div>
                    <div class="content-right" v-if="selectInfo.newTeacherImg">
                        <img :src="selectInfo.newTeacherImg" />
                    </div>
                </div>
                <!-- swiper轮播 -->
                <div class="section-content_swiper">
                    <div class="swiper-content_box" v-swiper:mySwiper="swiperOption" @slideChangeTransitionEnd="slideChangeTransitionEnd">
                        <div class="swiper-wrapper" ref="swiperWrapper">
                            <div class="swiper-slide" v-for="(item, index) in list" :key="index" @click="changeSwiper(index)">
                                <img :src="item.newTeacherImg" />
                            </div>
                        </div>
                        <div class="swiper-button-prev swiper-button-banner swiper-button-prev-banner" @click="prevOperate">
                            <img class="swiper-button-banner-icon swiper-button-banner-icon-prev" src="./asset/images/swiper-left.png" />
                        </div>
                        <div class="swiper-button-next swiper-button-banner swiper-button-next-banner" @click="nextOperate">
                            <img class="swiper-button-banner-icon swiper-button-banner-icon-prev" src="./asset/images/swiper-right.png" />
                        </div>
                        <!-- 阴影 -->
                        <div class="shadow-left"></div>
                        <div class="shadow-right"></div>
                        <!-- 不可点击图层 -->
                        <div class="no-click_left"></div>
                        <div class="no-click_right"></div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="!list.length && !loading">
            <div class="empty">
                <Empty />
            </div>
        </template>
    </div>
</template>

<script>
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/channel/api..query-config-model-info.js';
export default {
    name: 'TeacherSection',
    components: { Empty },
    data() {
        return {
            leave: false,
            show: true,
            in: false,
            out: false,
            currentIndex: 0,
            list: [],
            loading: true, // 加载状态

            swiperOption: {
                loop: true, // 无限循环
                speed: 600, // 设置切换动画的速度，单位为毫秒
                slidesPerView: 'auto',
                // slidesPerView: 9,
                spaceBetween: 24,
                centeredSlides: true, // 选中的轮播图片居中显示
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slideToClickedSlide: true, // 轮播图是否可点击
                noSwiping: false,
            },
            swiper: {},
            selectInfo: {},
            selectIndex: 0,
        };
    },
    fetch() {
        return this.init();
    },
    methods: {
        init() {
            return this.getData();
        },
        getData() {
            this.loading = true;
            const data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.$nuxt.context.env.config.indexColumnId,
                    // 模块编码
                    moduleCode: 'SZZS',
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: 12,
                },
                isCustom: true,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.loading = false;
                    const content = res.content;
                    if (content.length) {
                        content.forEach((item) => {
                            let imageUrl = item.teacherImage;
                            // 教师图片的处理
                            if (imageUrl) {
                                imageUrl = this.$urlUtils.getViewUrl(item.teacherImage);
                            } else {
                                imageUrl = require('./asset/images/default-image.png');
                            }
                            item.newTeacherImg = imageUrl;
                            // 如果有“前端展示-推荐项目”，显示该内容（后台"推荐师资"配置）
                            if (item.clientProjectName) {
                                const arr = [
                                    {
                                        projectName: item.clientProjectName,
                                    },
                                ];

                                item.newProjectList = arr;
                            } else {
                                // 取前两个标签
                                item.newProjectList = item.projectList?.length > 2 ? item.projectList.slice(0, 2) : item.projectList;
                            }
                        });
                        this.list = content;
                        this.$nextTick(() => {
                            this.selectIndex = this.mySwiper?.realIndex ?? 0;
                            this.selectInfo = content[this.selectIndex];
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
        },
        /**
         * 点击轮播图切换
         * @param {number} index  索引值
         */
        changeSwiper(index) {
            this.selectIndex = index;
            this.selectInfo = this.list[index];
        },
        /**
         * 拖动离开事件
         */
        slideChangeTransitionEnd() {
            this.selectIndex = this.mySwiper.realIndex;
            this.selectInfo = this.list[this.selectIndex];
        },
        /**
         * 上一个
         */
        prevOperate() {
            this.selectIndex--;
            if (this.selectIndex === -1) {
                this.selectIndex = this.list.length - 1;
            }
            this.selectInfo = this.list[this.selectIndex];
        },
        /**
         * 下一个
         */
        nextOperate() {
            this.selectIndex++;
            if (this.selectIndex >= this.list.length - 1) {
                this.selectIndex = 0;
            }
            this.selectInfo = this.list[this.selectIndex];
            this.checkTextOverflow();
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
        /**
         * 检查文本是否超过四行
         */
        checkTextOverflow() {
            const container = this.$refs.textContainer;
            const lineHeight = parseFloat(window.getComputedStyle(container).lineHeight);
            // const maxHeight = parseFloat(window.getComputedStyle(container).maxHeight);

            // 计算元素的行数
            const lineCount = Math.round(container.clientHeight / lineHeight);

            // 判断是否超过 4 行
            if (lineCount > 4) {
                console.log('文本超过 4 行');
                // 在此处可以添加相应的处理逻辑
            } else {
                console.log('文本未超过 4 行');
                // 在此处可以添加相应的处理逻辑
            }
        },
    },
};
</script>
<style lang="less" scoped>
@import './asset/css/index.less';
</style>
