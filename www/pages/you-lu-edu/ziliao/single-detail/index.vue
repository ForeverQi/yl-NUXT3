<template>
    <!-- 资料包详情 -->
    <div class="information-single-page">
        <!-- 资料包信息 -->
        <div class="information-single-header" v-if="file.docAvlstatus !== 'N'">
            <div class="w-1200">
                <bread-crumb :bread-list="navList"></bread-crumb>
                <detail-header :file="file" @update-login="updateLogin" />
            </div>
        </div>
        <!-- 资料列表 -->
        <div class="information-single-content preview-content w-1200">
            <!-- 列表 -->
            <div class="information-list preview-top" :class="{ empty: notLookType }">
                <!-- 资料不允许预览或者资料转换失败 -->
                <information-empty v-if="notLookType" :list-type="notLookType" />
                <!-- 资料不允许预览或者资料转换失败且从属资料包 上一篇下一篇 -->
                <detail-up-down v-if="notLookType && file.docIdPack === 'Y'" :file="file"></detail-up-down>
                <!-- 预览资料 -->
                <doc-preview
                    :doc-list.sync="docList"
                    :file="file"
                    :praise-status="praiseStatus"
                    v-if="file.docAvlstatus !== 'N' && file.docPreviewstatus === 'Y' && file.docConvertstatus === 'S'"
                    @load-preview-info="getDocDetail"
                    @doc-praise="updatePraise"
                ></doc-preview>
            </div>
            <!-- 推荐广告 -->
            <div class="information-side preview-right" :style="contentRightStyle">
                <div class="recommended-app" v-if="file.projectId" v-show="false">
                    <ad-section ad-code="YLWEB_ZLTD" :project-id="file.projectId" @item-click="handleItemClick" />
                </div>
                <div class="hot-course-box" v-if="isInit">
                    <hot-courses-list :project-id="file.projectId || ''" search-all />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Mixin from '@/www/components/ziliao/mixin/index';

import '@/api/dc/api.DC2004.query-doc-preview'; //资料预览
import '@/api/dc/api.DC2003.query-praise-status'; //查询点赞状态
import '@/api/cp/api..get-project-tree'; //查询项目树
import '@/api/ctc/api..query-project-detail'; // 查询项目详情

import ChooseType from '@/www/components/ziliao/choose-type/index.vue'; //选择类型
import DocPreview from '@/www/components/ziliao/doc-preview/index.vue'; //预览
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue'; //热推好课
import AdSection from '@/www/components/components/ad-section/index.vue'; // 广告
import DetailHeader from '@/www/components/ziliao/detail-header/index.vue'; //头部模块
import InformationEmpty from '@/www/components/ziliao/empty/index.vue'; //资料不能预览/资料转换失败
import BreadCrumb from '@/www/components/ziliao/bread-crumb/index.vue'; //面包屑
import DetailUpDown from '@/www/components/ziliao/doc-preview/components/detail-up-down.vue'; //下一篇

export default {
    name: 'information-single',
    components: {
        ChooseType,
        HotCoursesList,
        BreadCrumb,
        AdSection,
        DetailHeader,
        DocPreview,
        InformationEmpty,
        DetailUpDown,
    },
    mixins: [Mixin],
    layout: 'new-default',
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 5,
                pageCount: 100,
            },
            navList: [], //面包屑
            file: { docAvlstatus: '', docIdPack: '', projectName: '', docName: '', docPreviewstatus: '', docConvertstatus: '' },
            docId: '', //资料标识
            packId: '', //从属资料包标识
            hasMore: true,
            previewPageIndex: 1,
            hasGetDocDetail: false,
            docList: [],
            praiseStatus: 'N', //是否点赞
            isFixedRight: false,
            contentRightStyle: null,
            isFinished: false,
            isInit: false,
            projectInfo: null,
        };
    },
    fetch() {
        const { docId, packId } = this.$route.params;
        this.docId = docId;
        this.packId = packId;
        return this.getDocDetail();
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.file ? this.file.projectName + ',' : ''}${
                        this.projectInfo ? this.projectInfo.projectShortname + ',' : ''
                    }资料,备考资料,下载资料,真题,真题解析,知识点,记忆口诀,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    computed: {
        notLookType() {
            if (this.file.docAvlstatus === 'N') {
                //资料禁用
                return 'single-status-n';
            }
            if (this.file.docConvertstatus === 'F') {
                //资料转换失败
                return 'single-change-fail';
            }
            if (this.file.docPreviewstatus === 'N' && this.file.docConvertstatus === 'S') {
                //资料不允许预览
                return 'single-no-preview';
            }
            return '';
        },
        pageTitle() {
            return this.file.docName ? this.file.docName + '_优路教育' : '优路教育';
        },
    },
    mounted() {
        if (this.$platform.isClient()) {
            document.addEventListener('scroll', this.scrollLoad);
            this.ziliaoSetClueInfo();
        }
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
        async getDocDetail() {
            const params = {
                docId: this.docId,
                packId: this.packId || '',
                previewIndex: this.previewPageIndex,
                previewSize: this.previewPageIndex + 1,
                extension: '',
            };
            const isLogin = this.$platform.isClient() ? await this.userLogin() : false;
            if (!this.hasMore) {
                return Promise.resolve();
            }
            if (this.hasGetDocDetail) {
                return Promise.resolve();
            }
            this.hasGetDocDetail = true;
            this.isFinished = false;
            return this.requestWrapper('dc/query-doc-preview', params)
                .then((res) => {
                    this.file = res;
                    this.file.docIdPack = this.packId ? 'Y' : 'N'; //是否从属资料包
                    this.file.docPackstatus = 'N'; //是否从属资料包
                    this.previewPageIndex += 2;
                    // 修改可预览页码
                    const previewCond1 = res.docAccess === 'F'; //免费
                    const previewCond2 = res.isOwned === 'Y'; //已购
                    const previewCond3 =
                        res.docPromotiontype === 'F' && this.nowIsInStartToEnd(res.docPromotionstarttime, res.systemTime, res.docPromotionendtime); //收费但是促销且在促销时间内
                    if ((previewCond1 || previewCond2 || previewCond3) && isLogin) {
                        this.file.docPreviewnum = this.file.docPagenum;
                    }
                    this.hasMore = this.previewPageIndex <= this.file.docPreviewnum;
                    this.hasGetDocDetail = false;
                    const navList = [
                        { name: '优路首页', href: '/', isRedirect: true },
                        { name: '资料', href: '/ziliao', isRedirect: true },
                        { name: this.file.docName },
                    ];
                    this.navList = navList;
                    if (params.previewIndex === 1) {
                        this.docList = res.previewInfo;
                    } else {
                        this.docList = this.docList.concat(res.previewInfo);
                    }
                    if (isLogin) {
                        this.ifHasPraised(); //验证点赞
                    }
                    return this.getProjectInfo();
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    this.isFinished = true;
                    this.isInit = true;
                    if (this.$platform.isClient()) {
                        // 防止dom未加载出来
                        this.$nextTick(() => {
                            this.scrollLoad();
                        });
                    }
                });
        },
        /**
         * 用户登录后，查询用户对当前资料的点赞状态
         */
        ifHasPraised() {
            let params = {
                docId: this.file.docId,
            };
            this.$callApi('dc/query-praise-status', {
                ...params,
                onsuccess: (res) => {
                    this.praiseStatus = res || 'N';
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //更新点赞信息
        async updatePraise() {
            const isLogin = await this.userLogin();
            this.$callApi('cp/get-project-tree', {
                onsuccess: (res) => {
                    console.log(res);
                    let collage = this.getCollegeNameByProjectId(res.data, this.file.projectId);
                    //埋点
                    this.$yiguan.track('web_data_praise_button', {
                        college_name: collage.projectName,
                        project_position: this.file.projectName,
                        platform_type: '优路教育web网站',
                        web_data_ID: this.file.docId,
                        web_data_name: this.file.docName,
                        web_belong_subject: this.file.projectName,
                        web_data_classify: '',
                        web_is_login: isLogin,
                        web_is_praise: true,
                    });
                    this.file.docLikecount = Number(this.file.docLikecount) + 1;
                    this.praiseStatus = 'Y';
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //根据项目获取学院名称
        getCollegeNameByProjectId(collegelist, projectId) {
            let item = {};
            for (let i = 0; i < collegelist.length; i++) {
                let arr = collegelist[i].children.filter((item) => item.projectId === projectId);
                if (arr.length) {
                    item = collegelist[i];
                }
            }
            return item;
        },
        //计算右侧固定
        scrollLoad() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollBottom = scrollHeight - windowHeight - scrollTop; //滚动条距离底部高度
            //获取顶部高度
            const doms = document.getElementsByClassName('information-single-content');
            let domTopHeight = doms && doms.length > 0 ? doms[0].offsetTop : 0;
            if (scrollTop >= domTopHeight && scrollBottom > 510) {
                let domTopHeight = $('.nav-bg').height();
                let headerBoxHeight = $('.header-box').height();
                let contentRight = $('.information-single-content').css('marginRight');
                this.contentRightStyle = {
                    position: 'fixed',
                    top: domTopHeight + headerBoxHeight + 'px',
                    right: contentRight,
                };
            } else {
                this.contentRightStyle = null;
            }
        },
        updateLogin() {
            this.$PageUtil.reflush();
        },
        getProjectInfo() {
            return this.requestWrapper('ctc/query-project-detail', {
                projectId: this.file.projectId,
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
                course_type: '资料',
                sort_name: '-',
                channel_name: '-',
                project_id: this.file.projectId ?? '-',
                subject_id: '-',
            });
        },
        handleItemClick(item) {
            this.trackWebYouluAdSpace({
                ad_type: '单张广告',
                ad_position_name: '项目资料详情页_右侧通用',
                page_position: '资料详情页',
                ad_number: 0,
                ad_name: item.adName,
                ad_url: item.adLink,
                jump_type: item.adLink ? 'URL链接' : '无跳转',
                page_name: this.pageTitle,
                project_position: this.projectInfo?.projectId ?? '',
            });
        },
    },
};
</script>
<style lang="less" scoped src="./css/index.less"></style>
