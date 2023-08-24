<template>
    <div class="page">
        <index-top-section :project-org-id="projectId" ref="indexTopSection" />
        <index-project-section ref="navList" @initLevel="getLevelInfo" :project-id="projectId" />
        <template v-if="navItem.navType === 'C' && navItem.linkUrl">
            <template v-for="item in levelData">
                <index-ad-section v-if="item.componentCode === 'picAdv_big_small'" :item-data="item" :key="item.data.componentId" />
                <index-level-section v-if="item.componentCode === 'online_slider'" :item-data="item" :key="item.data.componentId" />
            </template>
        </template>
        <template v-if="navItem.navType === 'P' && !isProjectEmpty">
            <index-project-ad-section :project-id="navItem.projectId" @empty-handle="doEmpty" />
            <live-calendar :project-id="navItem.projectId" :is-index="true" @empty-handle="doEmpty" />
            <index-hot-section :project-id="navItem.projectId" @empty-handle="doEmpty" />
            <index-good-section :project-id="navItem.projectId" @empty-handle="doEmpty" />
        </template>
        <template v-if="(navItem.navType === 'C' && !navItem.linkUrl) || isProjectEmpty">
            <empty-index />
        </template>
        <fixed-right>
            <div class="ad-enter" v-if="showAd && adPic.adPicture" @click="toAdDetail">
                <div class="close" @click.stop="showAd = false">
                    <img src="../assets/images/closead.png" />
                </div>
                <img :src="$urlUtils.getViewUrl(adPic.adPicture)" />
            </div>
        </fixed-right>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import EmptyIndex from '../components/Empty/Index.vue';
import IndexTopSection from '../components/IndexTopSection/index.vue';
import IndexProjectSection from '../components/IndexProjectSection/index.vue';
import IndexAdSection from '../components/IndexAdSection/index.vue';
import IndexLevelSection from '../components/IndexLevelSection/index.vue';
import IndexHotSection from '../components/IndexHotSection/index.vue';
import IndexGoodSection from '../components/IndexGoodSection/index.vue';
import IndexProjectAdSection from '../components/IndexProjectAdSection/Index.vue';
import fixedRight from '@/www/components/microClassUser/components/fixedRight/index.vue';
import LiveCalendar from '@/www/components/microClassUser/components/LiveCalendar/index.vue';
import '@/api/mcu/api.mcu03.home-level-info.js'; // 直播列表
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
export default {
    components: {
        IndexTopSection,
        IndexProjectSection,
        IndexAdSection,
        IndexLevelSection,
        IndexHotSection,
        IndexGoodSection,
        fixedRight,
        EmptyIndex,
        IndexProjectAdSection,
        LiveCalendar,
    },
    data() {
        return {
            showAd: true,

            /******** 微页面数据 *******/
            navItem: {
                navType: '',
                projectId: '',
            },
            levelData: [],
            adPic: {
                adLink: '',
            },
            projectId: '',

            projectEmptyObj: {
                liveList: false,
                adList: false,
                lightCourse: false,
                hotGoodCourse: false,
            },
        };
    },
    computed: {
        isProjectEmpty() {
            return this.projectEmptyObj.liveList && this.projectEmptyObj.adList && this.projectEmptyObj.lightCourse && this.projectEmptyObj.hotGoodCourse;
        },
    },
    mounted() {
        this.projectId = this.$route.params.projectId;
        this.setProjectId(this.projectId);
        this.setPageName('优路微课-首页');
        this.init();
    },
    methods: {
        ...mapMutations('mcuStore', ['setProjectId', 'setPageName', 'setRemark', 'setProjectName']),
        init() {
            this.getAdPic();
            this.setRemark('优路微课-注册/登录');
        },
        getLevelInfo(item) {
            this.navItem = item;
            // 判断 如果是项目页面请求单独的接口
            if (item.navType === 'P' || !item.linkUrl) {
                if (item.navType === 'P') {
                    this.projectEmptyObj = {
                        liveList: false,
                        adList: false,
                        lightCourse: false,
                        hotGoodCourse: false,
                    };
                    this.projectId = item.projectId;
                    this.setProjectId(this.projectId);
                    this.setProjectName(item.projectName);
                    history.pushState({ key: Date.now().toFixed(3) }, '', `/agile-course/${item.projectId}`);
                    return;
                }
                return;
            } else {
                this.projectId = '';
                this.setProjectId('');
                history.pushState({ key: Date.now().toFixed(3) }, '', `/agile-course`);
            }
            let data = {
                url: 'home/home-level-info',
                params: {
                    customizePageId: item.linkUrl,
                },
                isCustom: false,
            };
            this.httpClient(data)
                .then((res) => {
                    let rs = JSON.parse(res.pageContent);
                    this.levelData = rs;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAdPic() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: 'YLWKWEB_SYD01',
                },
                isCustom: false,
            };
            this.httpClient(data)
                .then((res) => {
                    if (Array.isArray(res) && res.length > 0) {
                        this.adPic = res[0];
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        toAdDetail() {
            if (!this.adPic.adLink) {
                return;
            }
            this.$PageUtil.openNewPage(this.adPic.adLink);
        },
        doEmpty(type) {
            this.projectEmptyObj[type] = true;
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
    },
};
</script>
<style lang="less" scoped>
.page {
    background: #f6f7f9;
}
.ad-enter {
    position: relative;
    width: 150px;
    height: 115px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}
</style>
