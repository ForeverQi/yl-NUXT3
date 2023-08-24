<template>
    <!-- 设定高度，用于浮动元素占位 -->
    <div :style="{ height: allHeight + 'px' }">
        <!-- 浮动层 -->
        <div ref="fixedRef" class="fixed-wrap" :style="{ position: isFixed ? 'fixed' : 'static', 'z-index': zIndex }">
            <!-- 背景色 -->
            <div class="nav-bg">
                <!-- 内容区域 -->
                <div class="nav-bar">
                    <transition name="fade">
                        <div v-show="showStatement" class="statement-txt">
                            <a href="https://www.youlu.com/article-detail/210570" target="_blank" class="txt">
                                声明:优路教育从未授权任何形式的个人代收费行为，举报电话:010-51653988
                            </a>
                            <img src="../../asset/images/close-ico.png" class="close-ico" @click="showStatement = false" />
                        </div>
                    </transition>
                    <div class="nav-item extend" :class="{ active: isShowSchool && isShowSchoolReady }" @click="clickShowSchool('全国分校')">
                        全国分校
                        <img src="../../asset/images/down-arrow.png" class="state-ico" />
                    </div>
                    <div class="nav-item extend" :class="{ active: isShowProject && isShowProjectReady }" @click="clickShowProject('项目简章')">
                        项目简章
                        <img src="../../asset/images/down-arrow.png" alt="ico" class="state-ico" />
                    </div>
                    <!-- <a href="https://www.youlu.com/zt1/brand/2023qynx/?e_id=S-19028" target="_blank" class="nav-item link" @click="clickYiguan('企业团培')">
                        企业团培
                    </a> -->
                    <div class="nav-item extend pr">
                        赛事峰会
                        <img src="../../asset/images/down-arrow.png" class="state-ico" />
                        <div class="list-metting">
                            <div class="wrap-item" v-for="(item, index) in mettingList" :key="index">
                                <a target="_blank" v-for="(linkItem, i2) in item" :key="i2" :href="linkItem.url" class="item" @click="clickMetTing(linkItem)">
                                    {{ linkItem.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <a href="https://yun.youlu.com/" target="_blank" class="nav-item link youyun" @click="clickYiguan('优路云')"></a>
                    <a href="/about/youlu" target="_blank" class="nav-item link" @click="clickYiguan('关于优路')">关于优路</a>
                    <!-- <a href="//www.eyoulu.cn/#/fakeQuery" target="_blank" class="nav-item link">员工防伪查询</a> -->
                    <div class="nav-item">全国客服电话：400-861-8800</div>
                </div>
            </div>
            <!-- 项目简章 -->
            <transition
                name="height"
                @enter="updateHeight1"
                @after-enter="clearTimer1"
                @enter-cancelled="clearTimer1"
                @leave="updateHeight1"
                @after-leave="clearTimer1"
                @leave-cancelled="clearTimer1"
            >
                <div
                    v-show="isShowProject"
                    class="expend-bg"
                    :class="{ transition: isShowProjectReady, relative: projectRelative }"
                    :style="{ 'z-index': zIndex + 1 }"
                    ref="projectWrapRef"
                >
                    <div ref="projectRef">
                        <div class="project-module">
                            <template v-for="item1 in projectList">
                                <div v-if="item1.subCatagorys.length" :key="item1.catagoryId" class="project-box">
                                    <div class="label">{{ item1.catagoryName }}</div>
                                    <div class="item-box" :style="{ width: projectWidth(item1.subCatagorys.length) + 'px' }">
                                        <div v-for="item2 in item1.subCatagorys" :key="item2.catagoryId" class="link-item">
                                            <a
                                                class="link-txt"
                                                :href="item2.url"
                                                :title="item2.catagoryName"
                                                target="_blank"
                                                @click="clickProject(item1.catagoryName, item2.catagoryName)"
                                            >
                                                {{ item2.catagoryName }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 全国分校 -->
            <transition
                name="height"
                @enter="updateHeight2"
                @after-enter="clearTimer2"
                @enter-cancelled="clearTimer2"
                @leave="updateHeight2"
                @after-leave="clearTimer2"
                @leave-cancelled="clearTimer2"
            >
                <div
                    v-show="isShowSchool"
                    class="expend-bg"
                    :class="{ transition: isShowSchoolReady, relative: schoolRelative }"
                    :style="{ 'z-index': zIndex + 1 }"
                    ref="schoolWrapRef"
                >
                    <div ref="schoolRef" class="school-module">
                        <div class="title-box">
                            <span class="hint-txt">你当前选中区域：</span>
                            <span class="province-name">{{ provinceName }}</span>
                            <span class="school-size">共{{ checkedSchool.schools.length }}所分校</span>
                        </div>
                        <div class="province-names">
                            <span
                                v-for="(item, index) in schoolList"
                                :key="index"
                                class="name"
                                :class="{ active: item.provinceName === provinceName }"
                                @click="provinceName = item.provinceName"
                            >
                                {{ item.provinceName }}
                            </span>
                        </div>
                        <div class="card-box">
                            <template v-for="(item, index) in checkedSchool.schools">
                                <div v-if="index < 3" :key="index" class="card-item">
                                    <div class="card-title">{{ item.schoolName }}</div>
                                    <div class="card-txt address">{{ item.address }}</div>
                                    <div class="card-txt tel">
                                        咨询电话：
                                        <strong>{{ item.mobile }}</strong>
                                    </div>
                                    <div class="card-txt tel">
                                        客服热线：
                                        <strong>{{ item.telphone }}</strong>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="more-link">
                            <a :href="`/school-detail/${checkedSchool.provinceId}`" target="_blank" class="link" @click="clickSchoolYiguan">查看全部分校</a>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
/**
 * 描述
 * @events height-change(当前情况下元素所占的高度)
 */
import '@/api/cp/api.CP0005.get-location.js';
import '@/api/cp/api.CP0024.query-school-list.js';
import '@/api/cp/api.CP0020.query-college-list.js';
import '@/api/api..query-meeting-list.js';
import '@/api/api..query-project-brochure.js';

import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import track from '../../js/track.js';

let timer1 = null; // 过渡计时器
let timer2 = null; // 过渡计时器
let timer3 = null; // 切换分校定位元素的计时器
let timer4 = null; // 切换项目定位元素的计时器

export default {
    name: 'nav-header',
    mixins: [track],
    props: {
        // 布局是否要求相对页面定位(浮动在顶部)
        isFixed: {
            type: Boolean,
            default: true,
        },
        // 定位的层级
        zIndex: {
            type: Number,
            default: 50,
        },
        positionTxt: {
            type: String,
            default: '主栏目导航',
        },
    },
    data() {
        return {
            allHeight: 28, // 当前区块占的总高度，因为元素隐藏显示时，高度可能变化
            isShowSchool: true, // 是否展开显示分校,一开始为true，是为了配合css获取元素高度
            isShowProject: true, // 是否展开显示项目,一开始为true，是为了配合css获取元素高度
            isShowSchoolReady: false, // 获取分校展开高度是否完成
            isShowProjectReady: false, // 获取项目展开高度是否完成
            schoolRelative: false, // 全国分校展开内容是否开启相对定位
            projectRelative: false, // 项目展开内容是否开启相对定位
            projectList: [], // 项目列表
            schoolList: [], // 包含省的完整分校树状列表
            provinceName: '', // 当前选中的分校省份
            documentScrollTop: 0, // 当前页面的滚动值
            isHeightChangIng: false, // 记录当前是否为高度动画过渡状态，避免高度变化引起滚动监听器的错误判断
            showStatement: true, // 是否展示公司声明

            mettingList: [],
        };
    },
    computed: {
        projectWidth() {
            return (itemSize) => {
                return (Math.floor(itemSize / 10) + (itemSize % 10 === 0 ? 0 : 1)) * 98;
            };
        },
        checkedSchool() {
            const findItem = this.schoolList.find((i) => i.provinceName === this.provinceName);
            if (findItem) {
                return findItem;
            } else {
                return {
                    provinceName: this.provinceName,
                    schools: [],
                };
            }
        },
    },
    mounted() {
        this.$emit('height-change', this.allHeight);
        this.queryProjectList();
        this.querySchoolList();
        this.queryLocation();

        this.documentScrollTop = this.getDocumentScrollTop();
        window.addEventListener('scroll', this.isScrollDown);
        this.init();
    },
    destroyed() {
        // 离开该页面需要移除这个监听的事件，不然会报错
        window.removeEventListener('scroll', this.isScrollDown);
    },
    methods: {
        init() {
            let _this = this;
            this.$callApi('cp/query-meeting-list', {
                type: 'MEETING',
                hasSubSet: false,
                onsuccess(data) {
                    let list = [];
                    const page = Math.ceil(data.length / 5);
                    for (let i = 0; i < page; i++) {
                        list.push(data.slice(i * 5, i * 5 + 5));
                    }
                    _this.mettingList = list;
                },
                onerror(err) {
                    _this.$niceloo.api.handleFailure(err);
                },
            });
        },
        // 获取当前页面滚动高度
        getDocumentScrollTop() {
            return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        },
        // 判断页面是否是向下滚动,收起展开的分校项目
        isScrollDown() {
            if (!this.isHeightChangIng && this.getDocumentScrollTop() > this.documentScrollTop) {
                this.isShowSchool = false;
                this.isShowProject = false;
            }
            this.documentScrollTop = this.getDocumentScrollTop();
        },
        // 查询项目列表
        queryProjectList() {
            niceloo.api.call('public/query-project-brochure', {
                type: 'RULETYPE',
                hasSubSet: true,
                onsuccess: (data) => {
                    this.projectList = data;
                    this.$nextTick(() => {
                        this.isShowProject = false;
                        if (this.$refs.projectWrapRef) {
                            this.$refs.projectWrapRef.style.height = this.$refs.projectRef.offsetHeight + 'px';
                        }
                    });
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 查询分校列表
        querySchoolList() {
            niceloo.api.call('cp/query-school-list', {
                onsuccess: (data) => {
                    this.schoolList = data.map((i) => ({
                        ...i,
                        provinceName: i.provinceName.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/, ''),
                    }));
                    this.$nextTick(() => {
                        this.isShowSchool = false;
                        if (this.$refs.schoolWrapRef) {
                            this.$refs.schoolWrapRef.style.height = this.$refs.schoolRef.offsetHeight + 'px';
                        }
                    });
                },
            });
        },
        // 获取当前所在地
        queryLocation() {
            niceloo.api.call('cp/get-location', {
                onsuccess: ({ data }) => {
                    if (data && data.content && data.content.address_detail) {
                        this.provinceName = (data.content.address_detail.province || data.content.address_detail.city).replace(
                            /省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/,
                            ''
                        );
                    } else {
                        this.provinceName = '北京';
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        updateHeight() {
            if (!this.$refs.fixedRef) {
                return;
            }
            this.allHeight = this.$refs.fixedRef.offsetHeight || 28;
            this.$emit('height-change', this.allHeight);
        },
        // 发生项目高度动画过渡时更新高度值
        updateHeight1() {
            this.isHeightChangIng = true;
            timer1 = setInterval(this.updateHeight, 10);
        },
        // 用于项目过渡结束清除定时器
        clearTimer1() {
            this.updateHeight();
            this.isHeightChangIng = false;
            clearInterval(timer1);
            // 因为数据和元素高度是动态获取的，而元素默认不显示的话会无法获取大小，所有一定会触发一次高度变化动画，导致页面可能闪动，采取一开始不添加过渡css，第一次加载完后再添加transition属性，来避免此问题
            this.isShowProjectReady = true;
        },
        // 发生分校高度动画过渡时更新高度值
        updateHeight2() {
            this.isHeightChangIng = true;
            timer2 = setInterval(this.updateHeight, 10);
        },
        // 用于分校过渡结束清除定时器
        clearTimer2() {
            this.updateHeight();
            this.isHeightChangIng = false;
            clearInterval(timer2);
            // 因为数据和元素高度是动态获取的，而元素默认不显示的话会无法获取大小，所有一定会触发一次高度变化动画，导致页面可能闪动，采取一开始不添加过渡css，第一次加载完后再添加transition属性，来避免此问题
            this.isShowSchoolReady = true;
        },
        // 点击查看分校
        clickShowSchool(name) {
            this.isShowProject = false;
            this.isShowSchool = !this.isShowSchool;
            if (!this.isShowSchool) {
                timer3 = setTimeout(() => {
                    this.schoolRelative = false;
                }, 500);
            } else {
                clearTimeout(timer3); // 防止快速点击切换时,定位切换错误
                this.schoolRelative = true;
            }

            // 易观埋点
            this.clickYiguan(name);
        },
        // 点击查看项目简章
        clickShowProject(name) {
            this.isShowSchool = false;
            this.isShowProject = !this.isShowProject;
            if (!this.isShowProject) {
                timer4 = setTimeout(() => {
                    this.projectRelative = false;
                }, 500);
            } else {
                clearTimeout(timer4); // 防止快速点击切换时,定位切换错误
                this.projectRelative = true;
            }

            // 易观埋点
            this.clickYiguan(name);
        },

        // 易观埋点
        clickYiguan(name) {
            this.trackWebYouluClickTheHoverButton({
                bottom_title: name,
                navigation_type: this.positionTxt,
                page_name: document.title || '',
            });
        },

        // 点击查看更多分校
        clickSchoolYiguan() {
            this.trackWebYouluClickCampusMore();
        },

        // 点击单个简章
        clickProject(collegeName, projectPosition) {
            this.trackWebYouluClickProjectIntroduction({
                jianzhang_name: projectPosition,
                college_name: collegeName,
            });
        },

        // 点击单个赛事峰会
        clickMetTing(item) {
            this.trackWebYouluClickEventSummit({
                event_summit_name: item.name,
            });
        },
        // 优路云埋点
        doTrackB(name) {
            const userInfo = this.$storage.get('loginStatus') || {};
            this.$yiguan.track('web_youlu_click_bduanlanmu', {
                column_name: name,
                is_login_in: !!userInfo.userId,
                is_student: userInfo.studentDeposittype === 'T',
            });
        },
    },
};
</script>

<style lang="less" scoped src="./css/nav-header.less"></style>
<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
</style>
