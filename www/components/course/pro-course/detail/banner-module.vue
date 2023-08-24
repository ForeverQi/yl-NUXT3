<template>
    <div>
        <div class="banner-module">
            <image-view v-if="isLoading || data.headImg" :src="data.headImg" type="banner" placeholder-width="30%" class="banner-img" />
            <img v-else src="./asset/images/class-top-bg.jpg" :alt="data.classtypeName" class="banner-img" />
            <div class="content">
                <div class="crumbs-box">
                    <nuxt-link to="/">优路首页</nuxt-link>
                    &gt;
                    <nuxt-link :to="`/pro-course/all/${projectSeoCode}`">系统课</nuxt-link>
                    &gt;
                    <span>{{ data.classtypeName }}</span>
                </div>
                <div v-if="!isLoading && !data.headImg" class="empty-title-box">
                    <div class="project-name">{{ data.projectName }}</div>
                    <div class="class-name">{{ data.classtypeName }}</div>
                </div>
            </div>
        </div>
        <div class="base-msg">
            <div class="tag-box">
                <template v-for="(item, index) in data.highlightJson">
                    <template v-if="index < 4">
                        <div :key="'a' + index" v-if="index !== 0" class="border-separate"></div>
                        <div :key="index" class="tag-item">
                            <p class="main-txt">{{ item.classtypeHighlight }}</p>
                            <p class="other-txt">{{ item.classtypeHighlightDesc }}</p>
                        </div>
                    </template>
                </template>
            </div>
            <div class="price-box">
                <span class="price-num" v-if="isMinPriceEqMaxPrice">
                    <span class="price-ico">¥</span>
                    <!-- 有促销价展示促销价，没有促销价展示原价 -->
                    <template v-if="data.minPrice > 0">{{ data.minPrice | veMoneyCent }}</template>
                    <template v-else>{{ data.stdminPrice | veMoneyCent }}</template>
                    <!-- 价格展示优化，如果最低价格和最高价格是一样的时候仅展示一个价格即可 （涉及列表和详情页面） -->
                </span>
                <span class="price-num" v-else>
                    <span class="price-ico">¥</span>
                    <!-- 有促销价展示促销价，没有促销价展示原价 -->
                    <span>{{ data | filterPrice }}</span>
                </span>
                <span class="audition" v-if="data.auditionStatus === 'Y'" @click="toAudition">免费试听</span>
                <div class="buy-btn" @click="$emit('click-buy')">立即购买</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        // 课件的详情信息
        data: {
            type: Object,
            default: () => {},
        },
        projectSeoCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        isMinPriceEqMaxPrice() {
            return (
                (this.data.minPrice > 0 ? this.data.minPrice : this.data.stdminPrice) === (this.data.maxPrice > 0 ? this.data.maxPrice : this.data.stdmaxPrice)
            );
        },
    },
    methods: {
        toAudition() {
            ylPlugin.login.isLogined().then((check) => {
                this.yiguanTrack(this.data, check);
                if (check === true) {
                    this.toDetail();
                } else {
                    this.doLogin();
                }
            });
        },
        toDetail() {
            window.open(`/pro-course-tryout/${this.data.classtypeId}`);
        },
        doLogin() {
            this.$Promotion.setCLueInfo({
                url: location.href,
                pageName: this.data.classtypeName,
                projectId: this.data.projectId,
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            });
            const regExtension = this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'yindao',
                originCode: 'xitongke',
                pageName: this.data.classtypeName,
            });
            regExtension.clueFormdata = [
                {
                    key: 'clueRemarks',
                    value: '进入官网',
                    desc: '该用户通过【系统课试听】',
                },
            ];
            this.$ylPlugin.showLoginModal(
                { clue: { regExtension, clueExtension: regExtension } },
                {
                    pageName: document.title,
                    entranceResource: '系统课-免费试听',
                    courseType: '系统课',
                    pageType: '资源详情页',
                }
            );
        },
        yiguanTrack(courseData, isLoginIn) {
            const track = {
                course_name: courseData.classtypeName, // 课程名称
                project_id: courseData.projectId, // 项目名称
                page_type: '课程详情页', // 页面类型
                page_name: document.title, // 页面名称
                channel_name: this.collegeName, // 频道页名称
                entrance_resource: '课程详情页-免费试听按钮', // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
    },
};
</script>

<style lang="less" scoped>
.banner-module {
    height: 440px;
    position: relative;
    overflow: hidden;
}

.banner-img {
    display: block;
    height: 440px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}

.content {
    width: 1200px;
    margin: 0 auto;
    position: relative;
}

.crumbs-box {
    padding-top: 19px;
    font-size: 14px;
    color: #ffffff;
    line-height: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
        color: #ffffff;
    }
}

.base-msg {
    box-sizing: border-box;
    width: 1200px;
    padding: 0 40px 0 12px;
    height: 128px;
    background: url('./asset/images/bg1.png') no-repeat 400px 0 #fff;
    border-radius: 16px;
    box-shadow: 0px 24px 40px 0px #f6f6f7;
    position: absolute;
    left: 50%;
    top: 376px;
    margin-left: -600px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tag-box {
    display: flex;
    align-items: center;
}
.tag-item {
    box-sizing: border-box;
    padding: 0 32px;
    height: 80px;
    padding-top: 14px;
}

.main-txt {
    font-size: 22px;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.other-txt {
    margin-top: 12px;
    font-size: 14px;
    color: #999999;
    line-height: 16px;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.border-separate {
    width: 1px;
    height: 40px;
    background: #dddddd;
}

.price-box {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}

.audition {
    width: 128px;
    height: 46px;
    background: #ffece8;
    border-radius: 23px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #ff2e30;
    line-height: 46px;
    margin-right: 16px;
    cursor: pointer;
}

.price-num {
    font-size: 24px;
    font-weight: bold;
    color: #f8323c;
    margin-right: 24px;

    span {
        font-weight: bold;
    }
}

.price-ico {
    font-weight: bold;
    font-size: 14px;
}
.buy-btn {
    display: block;
    height: 46px;
    line-height: 46px;
    padding: 0 32px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 23px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
}
.empty-title-box {
    width: 750px;
    position: absolute;
    top: 130px;

    .project-name {
        height: 42px;
        line-height: 42px;
        padding-left: 10px;
        background: linear-gradient(90deg, rgba(5, 24, 62, 0.23) 0%, rgba(135, 177, 255, 0) 300px);
        font-size: 18px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .class-name {
        height: 135px;
        margin-top: 20px;
        font-size: 34px;
        font-weight: bold;
        color: #333333;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>
