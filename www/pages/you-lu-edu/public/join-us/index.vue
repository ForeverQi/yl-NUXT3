<template>
    <div class="join-us-container" v-loading="isLoading">
        <div class="adveristor-box" v-show="false">
            <ad-section :ad-code="'YLWEB_PD01'"></ad-section>
        </div>
        <div class="content-container">
            <div class="title">员工故事</div>

            <div class="swiper-box">
                <div class="swiper-left-btn" v-if="articleList.length > 2"></div>
                <div v-swiper:mySwiper="swiperOption" class="story-swiper" v-if="articleList.length > 0">
                    <div class="swiper-wrapper">
                        <a
                            class="swiper-slide"
                            v-for="(item, index) in articleList"
                            :key="index"
                            target="_blank"
                            :href="item.caType === 'T' ? item.caUrl : `/article-detail/${item.id}`"
                        >
                            <image-view class="story-img" type="banner" placeholder-width="70%" :src="$urlUtils.getViewUrl(item.imgSrc)"></image-view>
                            <div class="story-content">
                                <div class="story-title">{{ item.title }}</div>
                                <div class="story-intro">
                                    {{ item.intro }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="swiper-right-btn" v-if="articleList.length > 2"></div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/cp/api.CMP2016.query-article-list.js';
import AdSection from '@/www/components/components/ad-section';
export default {
    components: {
        AdSection,
    },
    data() {
        return {
            columnId: '', // 栏目id
            page: {
                pageIndex: 1,
                pageSize: 8,
                count: 0,
            }, // 分页
            articleList: [], // 章节列表
            swiperOption: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                loopAdditionalSlides: 100,
                navigation: {
                    nextEl: '.swiper-right-btn',
                    prevEl: '.swiper-left-btn',
                },
            }, // swiper
            isLoading: false, // 是否加载中
        };
    },
    head() {
        return this.$head({
            title: '加入我们_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '品牌,企业文化,社会责任,企业新闻,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    mounted() {
        this.columnId = this.$route.params.columnId;
        this.queryArticleList();
    },
    methods: {
        // 查询章节列表
        queryArticleList() {
            this.isLoading = true;
            this.$callApi('cp/query-article-list', {
                columnId: this.columnId,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                onsuccess: (data) => {
                    this.articleList = data.list;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.join-us-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    display: block !important;
    min-height: 700px;
    .adveristor-box {
        width: 100%;
        height: auto;
    }
    .content-container {
        margin: 48px auto;
        width: 1440px;
        min-height: 700px;
        .title {
            margin: 0 auto;
            width: 1200px;
            font-size: 28px;
            font-weight: 700;
            text-align: left;
            color: #333333;
            line-height: 37px;
        }
    }
}
.swiper-box {
    margin: 48px auto 120px;
    width: 1440px;
    display: flex;
    justify-content: center;
    align-items: center;
    .story-swiper {
        width: 1200px;
        margin: 0px;
        .swiper-wrapper {
            width: 1200px;
            display: flex;
            .swiper-slide {
                width: 580px !important;
                height: 510px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                .story-content {
                    width: 580px;
                    height: 210px;
                    padding: 0px 16px 42px;
                    box-sizing: border-box;
                }
                .story-img {
                    width: 580px;
                    height: 300px;
                    border-radius: 20px;
                }
                .story-title {
                    box-sizing: border-box;
                    margin: 32px 0px 26px;
                    width: 548px;
                    font-size: 20px;
                    font-weight: 700;
                    text-align: left;
                    color: #333333;
                    line-height: 26px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .story-intro {
                    width: 548px;
                    height: 84px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: left;
                    color: #77798d;
                    line-height: 28px;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    word-break: break-all;
                    overflow: hidden;
                }
            }
        }
    }
    .swiper-left-btn,
    .swiper-right-btn {
        width: 72px;
        height: 72px;
        border-radius: 36px;
        cursor: pointer;
        background-size: 72px 72px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .swiper-left-btn:hover,
    .swiper-right-btn:hover {
        box-shadow: 0px -8px 12px 0px #e9eaee;
        backdrop-filter: blur(6px);
    }
    .swiper-left-btn {
        margin-right: 40px;
        background-image: url('./asset/images/left-btn.png');
    }
    .swiper-right-btn {
        margin-left: 40px;
        background-image: url('./asset/images/right-btn.png');
    }
}
</style>
