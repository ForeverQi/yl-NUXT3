<template>
    <div v-loading="isLoading" class="best-wrap">
        <!-- 所属模块 -->
        <div class="nav-box">
            <div
                v-for="item in moduleList"
                :key="item.modulId"
                class="nav-item"
                :class="{ active: moduleId === item.modulId }"
                @click="moduleId = item.modulId"
            >
                {{ item.modulName }}
            </div>
        </div>
        <!-- 面授模块 -->
        <div v-if="checkedModule.planShowStatus === 'Y'" class="face-module" v-html="checkedModule.planContent"></div>

        <!-- 课程列表 -->
        <template v-if="courseList.length">
            <div v-for="(item1, index1) in courseList" :key="index1" class="first-tree">
                <div class="first-bar" :class="{ extend: item1.isExtend }" @click="toggleExtend(item1, 1)">
                    <div class="title">{{ item1.courseName }}</div>
                    <div class="right-wrap">
                        <div v-if="item1.courseUpdateTimeDesc" class="time-hint">更新时间：{{ item1.courseUpdateTimeDesc }}</div>
                        <img class="ico-img" src="./asset/images/down-arrow.png" alt="方向标识" />
                    </div>
                </div>
                <div v-for="(item2, index2) in item1.catalogList" :key="index2" v-show="item1.isExtend">
                    <div class="second-title" :class="{ extend: item2.isExtend }" @click="toggleExtend(item2, 2)">
                        <div class="title">{{ item2.catalogName }}</div>
                        <img class="ico-img" src="./asset/images/down-arrow.png" alt="方向标识" />
                    </div>
                    <div v-for="(item3, index3) in item2.coursewareList" :key="index3" v-show="item2.isExtend" class="third-tree" @click="clickListen(item3)">
                        <div class="third-title">{{ item3.coursewareName }}</div>
                        <div v-if="item3.coursewareStar" class="third-star">
                            重要程度：
                            <img v-for="item4 in item3.coursewareStar" :key="item4" class="ico-star" src="./asset/images/star-ico.png" alt="方向标识" />
                        </div>
                        <!-- 课件的描述信息 -->
                        <div class="third-msg">
                            <!-- 可以试听展示试听按钮 -->
                            <span v-if="item3.ctwAuditionstatus === 'Y'" class="audition-tag tag-txt">可试听</span>
                            <!-- 课件类型是试卷 -->
                            <span v-else-if="item3.coursewareType === 'paper'" class="question-total">共{{ item3.paperQuestionTotal }}道</span>
                            <!-- 课件类型是直播 -->
                            <template v-else-if="item3.coursewareType === 'live'">
                                <!-- 有直播开始时间展示开始时间，没有展示课件名 -->
                                <span v-if="item3.coursewareStarttime" class="start-time">{{ item3.coursewareStarttime }}</span>
                            </template>
                            <!-- 课件类型是视频 -->
                            <template v-else-if="item3.coursewareType === 'video'">
                                <!-- 课件时长 -->
                                <span v-if="item3.coursewareDuration" class="tag-time">{{ item3.coursewareDuration | formatSecond }}</span>
                            </template>
                            <span v-if="item3.ctwAuditionstatus === 'Y'" class="tag-tips">开始试听</span>
                            <span v-else-if="item3.ctwAuditionstatus !== 'Y'" class="tag-tips">购买后，即可学习</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="no-data" v-else-if="checkedModule.planShowStatus !== 'Y'">
            <template v-if="!isLoading">
                <img src="../asset/images/empty.png" />
                <p>小编正在努力上传，请耐心等待哦</p>
            </template>
        </div>
    </div>
</template>

<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/cc/api..query-class-module-list.js';
import '@/api/cc/api..query-course-catalog-courseware-tree.js';
import '@/api/cl/api..user-audition-log-add.js';
import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
import loginApi from '@/api/login.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import track from '@/www/components/course/free-course/js/track.js';

dayjs.extend(dayjsDuration);
export default {
    filters: {
        formatSecond(second) {
            return dayjs.duration(second, 'seconds').format('HH:mm:ss');
        },
    },
    mixins: [track],
    props: {
        selectIndex: {
            type: Number,
            default: 1,
        },
        classtypeId: {
            type: String,
            default: '',
        },
        // 课件的详情信息
        classData: {
            type: Object,
            default: () => {},
        },
        // 课件的所属信息
        project: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isLoading: false,
            courseList: [],
            moduleList: [],
            orgCourseList: [],
            orgModuleList: [],
            moduleId: '', // 当前选中的模块id
            areaCode: '',
        };
    },
    fetch() {
        return this.queryModuleList();
    },
    computed: {
        // 当前选中的教学模块
        checkedModule() {
            const findItem = this.moduleList.find((i) => i.modulId === this.moduleId);
            if (findItem) {
                const re = /<img (.*?)src=['"](.*?)['"]/gi;
                let string = findItem.planContent;
                let temp;
                while ((temp = re.exec(findItem.planContent))) {
                    let reStr = temp[0];
                    let src = temp[2];
                    string = string.replace(reStr, reStr.replace(src, src.startsWith('data:image') ? src : this.$urlUtils.getViewUrl(src)));
                }
                findItem.planContent = string;
                return findItem;
            }
            return {};
        },
    },
    watch: {
        classtypeId: {
            handler(val) {
                val && this.queryModuleList();
            },
            immediate: true,
        },
        moduleId(val) {
            if (val) {
                this.queryCourseTree();
            } else {
                this.courseList = [];
            }
        },
        selectIndex(val) {
            let orgCourseList = JSON.parse(JSON.stringify(this.orgCourseList));
            let orgModuleList = JSON.parse(JSON.stringify(this.orgModuleList));
            this.moduleDataHandle(orgModuleList);
            this.courseDataHandle(orgCourseList, val);
        },
    },
    methods: {
        ...loginRegisterTrack,
        // 查询模块列表
        queryModuleList() {
            return new Promise((resolve, reject) => {
                if (!this.classtypeId) {
                    return resolve();
                }
                this.$callApi('cc/query-class-module-list', {
                    classtypeId: this.classtypeId,
                    onsuccess: (data) => {
                        this.orgModuleList = data;
                        this.moduleDataHandle(data);
                        this.$emit('module-ready', this.moduleList);
                        resolve();
                    },
                    onerror: (err) => {
                        niceloo.api.handleFailure(err);
                        reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        },
        // 查询课程列表
        queryCourseTree() {
            this.isLoading = true;
            this.$callApi('cc/query-course-catalog-courseware-tree', {
                // 班型标识
                classtypeId: this.classtypeId,
                // 模块标识
                modulId: this.moduleId,
                onsuccess: ({ courseList }) => {
                    this.orgCourseList = courseList;
                    this.courseDataHandle(courseList);
                    this.$emit('update-course-list', this.courseList);
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        // 模块数据处理
        moduleDataHandle(orgModuleList) {
            if (this.selectIndex === 2) {
                orgModuleList = orgModuleList.filter((r) => {
                    return r.modulAuditionStatus === 'Y';
                });
            }

            this.moduleList = orgModuleList;
            // 默认选中第一个
            if (this.moduleList.length) {
                this.moduleId = this.moduleList[0].modulId;
            }
        },
        // 课程数据处理
        courseDataHandle(orgCourseList) {
            if (this.selectIndex === 2) {
                let tmpCourseList = [];
                orgCourseList.forEach((item) => {
                    let catalogList = [];
                    item.catalogList.forEach((item2) => {
                        let coursewareList = item2.coursewareList.filter((item3) => {
                            return item3.ctwAuditionstatus === 'Y';
                        });

                        if (coursewareList.length > 0) {
                            catalogList.push({
                                catalogId: item2.catalogId,
                                catalogName: item2.catalogName,
                                coursewareList,
                            });
                        }
                    });

                    if (catalogList.length > 0) {
                        tmpCourseList.push({
                            courseId: item.courseId,
                            courseName: item.courseName,
                            courseUpdateTimeDesc: item.courseUpdateTimeDesc,
                            catalogList,
                        });
                    }
                });
                orgCourseList = tmpCourseList;
            }

            this.courseList = orgCourseList.map((item1, index1) => ({
                ...item1,
                isExtend: index1 === 0,
                catalogList: item1.catalogList.map((item2, index2) => ({
                    ...item2,
                    isExtend: index1 === 0 && index2 === 0,
                })),
            }));
        },
        // 切换展开状态
        toggleExtend(item, level) {
            // 如果是收起第一级，则把第二级也收起来
            if (level === 1 && item.isExtend) {
                item.catalogList.forEach((item2) => {
                    item2.isExtend = false;
                });
            }
            item.isExtend = !item.isExtend;
            // 点击切换一级目录时，默认打开第一个二级目录及二级目录下的3节课件目录
            if (item.isExtend && level === 1) {
                for (const catalog of item.catalogList) {
                    this.toggleExtend(catalog, 2);
                    if (catalog) {
                        break;
                    }
                }
            }
            // 点击切换一级目录时，默认打开第一个二级目录及二级目录下的3节课件目录
        },
        // 点击试听
        async clickListen(item) {
            // this.clickListenTrack();
            if (item.ctwAuditionstatus !== 'Y') {
                return;
            }
            const fun = () => {
                this.$emit('click-listen', item);
            };
            const isLogin = await ylPlugin.login.isLogined();
            this.yiguanTrack(this.classData, isLogin);
            if (!isLogin) {
                // 没登录，调起登录组件
                let clueExtension = await this.$Promotion.getClueExtensionInfo({ clueWaycode: 'yindao', originCode: 'xitongke' });
                // ylPlugin.login
                //     .showLogin_verifyByWx3({
                //         clue: { clueExtension },
                //         onstatechange: (state) => {
                //             if (state.isQRCodeScanned) {
                //                 this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                //             }
                //         },
                //     })
                this.$ylPlugin
                    .showLoginModal(
                        { clue: { clueExtension } },
                        { pageName: document.title, entranceResource: '系统课-试听目录', courseType: '系统课', pageType: '资源详情页' }
                    )
                    .then((res) => {
                        if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                            // 登陆方式为微信需要推送线索参数
                            /*this.pushWxClue(clueExtension);*/
                        }

                        fun();
                        this.addLog();
                    });
                return;
            }

            fun();
            this.addLog();
        },
        yiguanTrack(courseData, isLoginIn) {
            const track = {
                course_name: courseData.classtypeName, // 课程名称
                project_id: courseData.projectId, // 项目名称
                page_type: '课程详情页', // 页面类型
                page_name: document.title, // 页面名称
                channel_name: this.collegeName, // 频道页名称
                entrance_resource: '课程详情页-试听课件', // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
        addLog() {
            ylPlugin.login.getUser().then((user) => {
                console.warn(user);
                return this.$callApi('cl/user-audition-log-add', {
                    classId: this.classtypeId,
                    userId: user ? user.userId : '',
                });
            });
        },
        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
        clickListenTrack() {
            this.trackWebYouluClickListen({
                course_name: this.classData.classtypeName,
                project_id: this.classData.projectId,
                page_type: '课程详情页',
                page_name: document.title,
                channel_name: this.collegeName,
                entrance_resource: '【系统课详情页-试听目录】',
            });
        },
    },
};
</script>

<style lang="less" scoped src="./css/catalogue-page.less"></style>
