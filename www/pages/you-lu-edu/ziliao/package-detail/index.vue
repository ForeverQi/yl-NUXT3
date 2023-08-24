<template>
    <!-- 资料包详情 -->
    <div class="information-package-page">
        <!-- 资料包信息 -->
        <div class="information-package-header" v-if="packageInfo.docAvlstatus !== 'N'">
            <div class="w-1200">
                <bread-crumb :bread-list="navList"></bread-crumb>
                <detail-header :file="packageInfo" @update-login="updateLogin" />
            </div>
        </div>
        <!-- 资料列表 -->
        <div class="information-package-content w-1200">
            <!-- 列表 -->
            <div class="information-list" v-loading="!isFinished">
                <template v-if="packageInfo.docAvlstatus !== 'N'">
                    <card
                        v-for="information in informationList"
                        :show-money="false"
                        :package-info="packageInfo"
                        :file="information"
                        :key="information.id"
                        @update-login="updateLogin"
                        :location="'【资料包详情页-下载资料按钮】'"
                    />
                </template>
                <!-- 资料包没有数据或被禁用 -->
                <information-empty v-if="notLookType" :list-type="notLookType" />
                <div class="paging" v-if="page.pageCount > page.pageSize">
                    <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="pageChange" :current-page="page.pageIndex" />
                </div>
            </div>
            <!-- 推荐广告 -->
            <div class="information-side">
                <div class="recommended-app" v-if="packageInfo.projectId" v-show="false">
                    <ad-section ad-code="YLWEB_ZLTD" :project-id="packageInfo.projectId" @item-click="handleItemClick" />
                </div>
                <div class="hot-course-box" v-if="isFinished">
                    <hot-courses-list :project-id="packageInfo.projectId || ''" search-all />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from '@/www/components/ziliao/card/index.vue'; //资料卡片
import DetailHeader from '@/www/components/ziliao/detail-header/index.vue'; //头部模块
import BreadCrumb from '@/www/components/ziliao/bread-crumb/index.vue'; //面包屑
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue'; //热推好课
import Pagination from '@/www/components/components/pagination/index.vue'; // 分页
import AdSection from '@/www/components/components/ad-section/index.vue'; // 广告
import InformationEmpty from '@/www/components/ziliao/empty/index.vue'; //资料为空
import Mixin from '@/www/components/ziliao/mixin/index';

import '@/api/dc/api.DC2017.query-pack-info';
import '@/api/dc/api.DC2018.query-packdoc-list';
import '@/api/ctc/api..query-project-detail'; // 查询项目详情
export default {
    name: 'information-package',
    components: {
        Card,
        HotCoursesList,
        Pagination,
        BreadCrumb,
        AdSection,
        DetailHeader,
        InformationEmpty,
    },
    mixins: [Mixin],
    layout: 'new-default',
    data() {
        return {
            page: {
                pageIndex: 0,
                pageSize: 10,
                pageCount: 0,
            },
            navList: [], //面包屑
            packageInfo: {
                hasAdCode: true,
                AdCode: 1,
                docName: '',
                docAvlstatus: '',
                projectId: '',
            },
            packId: '', //资料包Id
            informationList: [], //资料包下资料列表
            isFinished: false, //查询是否结束
            fullPath: '',
            projectInfo: { projectShortname: '' },
        };
    },
    fetch() {
        const { packId } = this.$route.params;
        this.packId = packId;
        if (this.$platform.isClient()) {
            this.fullPath = localStorage.getItem('ziliao-fullPath');
            this.ziliaoSetClueInfo();
        }
        return this.getPackageDetail().then(this.getPackageDocList).then(this.getProjectInfo);
    },
    head() {
        return {
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.packageInfo ? this.packageInfo.projectName + ',' : ''}${
                        this.projectInfo ? this.projectInfo.projectShortname + ',' : ''
                    }资料,备考资料,下载资料,真题,真题解析,知识点,记忆口诀,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        };
    },
    computed: {
        notLookType() {
            if (this.packageInfo.docAvlstatus === 'N') {
                //资料禁用
                return 'package-status-n';
            }
            if (this.packageInfo.docAvlstatus === 'Y' && !this.informationList.length) {
                //资料包下没有资料
                return 'package-empty';
            }
            return '';
        },
        pageTitle() {
            return this.packageInfo.docName ? this.packageInfo.docName + '_优路教育' : '优路教育';
        },
    },
    methods: {
        requestWrapper(url, params = {}) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    onsuccess: resolve,
                    onerror: reject,
                });
            });
        },
        //查询资料包列表
        getPackageDetail() {
            this.isLoading = true;
            this.isFinished = false;
            const params = {
                packId: this.packId,
            };
            return this.requestWrapper('dc/query-pack-info', params)
                .then((data) => {
                    this.packageInfo = data;
                    this.packageInfo.docPackstatus = 'Y';
                    this.packageInfo.docCode = this.packId;
                    const navList = [
                        { name: '优路首页', href: '/', isRedirect: true },
                        { name: '资料', href: '/ziliao', isRedirect: true },
                        { name: this.packageInfo.docName },
                    ];
                    this.navList = navList;
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    this.isLoading = false;
                    this.isFinished = true;
                });
        },
        //查询资料包下资料列表
        getPackageDocList() {
            const params = {
                packId: this.packId,
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
            };
            return this.requestWrapper('dc/query-packdoc-list', params)
                .then(({ list = [], count = 0 }) => {
                    this.informationList = list.map((information) => {
                        information.docPackstatus = 'N';
                        information.packdocId = this.packageInfo.docId || '';
                        information.projectId = this.packageInfo.projectId || '';
                        return information;
                    });
                    this.page.pageCount = +count;
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getProjectInfo() {
            return this.requestWrapper('ctc/query-project-detail', {
                projectId: this.packageInfo.projectId,
            })
                .then((data) => {
                    this.projectInfo = data;
                    this.$set(this.navList, 1, {
                        name: '资料',
                        href: data.projectSeoCode ? `/ziliao/xm-${data.projectSeoCode}` : '/ziliao',
                        isRedirect: true,
                    });
                    if (this.$platform.isClient()) {
                        this.ziliaoSetClueInfo();
                        this.trackPages();
                    }
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        updateLogin() {
            this.$PageUtil.reflush();
        },
        pageChange(num) {
            this.page.pageIndex = num;
            this.getPackageDocList();
            this.$nextTick(() => {
                const dm = document.querySelector('.information-package-page');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },
        //跳转到资料或资料包详情
        gotoDetail(information) {
            const url = '/information/single';
            this.$router.push({
                path: url,
            });
        },
        ziliaoSetClueInfo() {
            const { projectId, projectCode, projectSeoCode } =
                (this.projectInfo && this.projectInfo.projectId && this.projectInfo) || this.$storage.get('indexSelectProject') || {};
            this.$Promotion.setCLueInfo({
                projectId: projectCode ? '' : projectId,
                projectCode,
                projectSeocode: projectCode ? '' : projectSeoCode,
                originCode: 'ziliaoxiazai',
                clueWaycode: 'yindao',
            });
        },
        trackPages() {
            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源详情页',
                course_type: '资料包',
                sort_name: '-',
                channel_name: '-',
                project_id: this.packageInfo.projectId ?? '-',
                subject_id: this.packageInfo.subjectId ?? '',
            });
        },
        handleItemClick(item) {
            this.trackWebYouluAdSpace({
                ad_type: '单张广告',
                ad_position_name: '项目资料详情页_右侧通用',
                ad_position: '资料右侧广告banner',
                page_position: '资料详情页',
                ad_number: 0,
                ad_name: item.adName,
                ad_url: item.adLink,
                jump_type: item.adLink ? 'URL链接' : '无跳转',
                page_name: this.pageTitle,
                project_position: this.projectInfo?.projectId ?? '-',
            });
        },
    },
};
</script>
<style lang="less" scoped src="./css/index.less"></style>
