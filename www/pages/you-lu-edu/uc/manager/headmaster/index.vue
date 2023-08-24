<template>
    <!-- 我的收据 -->
    <div class="outContent">
        <div class="ucIndex">
            <div class="indexCont clearfix">
                <div class="navigationWrap"></div>
                <div class="contentWrap">
                    <h3 class="detailsTitle">我的学管师</h3>
                    <div class="tabDetails">
                        <orderNull v-show="chargeteacherList.length == 0" words="您当前暂无专属学管师~" style="width: auto"></orderNull>
                        <div v-show="chargeteacherList.length > 0" class="payContent">
                            <div class="contentBg"></div>
                            <div class="teacherInfo">
                                <div v-if="flagleft" class="infoLeft swiper-button-prev">
                                    <span class="leftImg"></span>
                                </div>
                                <div v-swiper:mySwiper="swiperOption" class="swiper-no-swiping">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="(item, key) in chargeteacherList" :key="key">
                                            <!--v-if="item.eeUserid"-->
                                            <div class="headProject">
                                                <span class="leftIntroduction" v-if="item.isShowLearningManager">
                                                    <!--<template v-if="item.eeUserid">
                                                        <span class="introductionCh">学管师简介</span>
                                                        <span class="introductionEn">brief introduction</span>
                                                    </template>-->
                                                </span>
                                                <p class="rightProject">{{ item.projectName }}</p>
                                            </div>
                                            <!--eeUserid有学管师-->
                                            <!--name 一般拿不到这个就是说明员工不存在 离职-->
                                            <!--{{ item.weComOConfigOpenStatus }}
                                            {{ item.eeUserid }}
                                            {{ item.name }}
                                            {{ item.weComOConfigOpenStatus === 'Y' }}-->
                                            <div class="infoContent" v-if="item.isShowLearningManager">
                                                <div class="introductionName">
                                                    <div class="introductPhoto">
                                                        <div class="introductionInfo">
                                                            <div class="infoHeadLeft">
                                                                <img class="photoImg" src="./asset/images/headPhoto@2x.png" />
                                                                <span class="nickname">{{ item.nickname || '优路学管师' }}</span>
                                                                <span class="infoRepair">工号：{{ item.no }}</span>
                                                            </div>
                                                            <div class="right">
                                                                <div class="evaluatTeacher" @click="evaluatTeacher(item)">
                                                                    <img src="./asset/images/comment.png" />
                                                                    <span>评价</span>
                                                                </div>
                                                                <nuxt-link class="record" :to="`/uc/manager/headmaster/evaluate/${item.eeUserid}`">
                                                                    评价记录
                                                                </nuxt-link>
                                                            </div>
                                                        </div>
                                                        <p class="introduction">{{ item.desc }}</p>
                                                    </div>
                                                </div>
                                                <span class="contactTeacher">
                                                    <!--联系学管师
                                                    <span>contact</span>-->
                                                </span>
                                                <div class="contactInfo">
                                                    <div class="contactWay">
                                                        <div class="contactWechat" v-show="item.eeUserid && item.weComOConfigOpenStatus === 'Y' && item.name">
                                                            <!--<span class="weChatImg"></span>-->
                                                            <span class="weChatName">微信:</span>
                                                            <!--@mouseenter="isShowEr(item)" @mouseleave="isHideEr"-->
                                                            <span class="weChatNumber">
                                                                <span class="name">{{ item.alias || item.name }}</span>
                                                                <span class="youlu">@优路教育</span>
                                                            </span>
                                                            <span class="weChatBtn" @click="copyWeChat(item)">联系我</span>
                                                        </div>

                                                        <div class="contactPhone" v-show="item.mobile">
                                                            <!--<span class="phoneImg"></span>-->
                                                            <span class="phoneName">电话:</span>
                                                            <span class="phoneNumber">{{ item.mobile }}</span>
                                                            <span class="phoneBtn" @click="copyMobile(item)">复制</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="no-student-manager" v-else>
                                                <img src="./asset/images/empty.png" alt="" />
                                                <div class="empty">学管师正在分配中，请耐心等待～</div>
                                                <div class="customer-service">
                                                    如有疑问，请联系您的课程顾问或致电全国客服电话
                                                    <span>400-861-8800</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="flagleft" class="infoRight swiper-button-next">
                                    <span class="rightImg"></span>
                                </div>
                            </div>
                            <!-- <div class="customerService" v-if="false">
                                没有班主任，可打客服电话：
                                <span>{{ serverMobile }}</span>
                            </div> -->
                            <!--<div v-show="isShow" class="weChatEr">
                                <img :src="$urlUtils.getViewUrl(wechatQr)" />
                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="bottomTip" v-show="msgView1.show">{{ msgView1.title }}</div>
            </div>
        </div>
        <comment-model
            v-show="ifPJshow === true"
            ref="commentModel"
            @closeCmtPop="closeCmtPop"
            @submitComment="submit"
            :lable-type="labelType"
            :comment-info="commentInfo"
            :is-show-toast="cmtSuccess"
            :key="keys"
        />
        <!-- <StudentManagerView v-if="isShow" :is-show="isShow" :project-id="projectId" @updateshow="isShow = false"></StudentManagerView> -->
    </div>
</template>
<script>
import '@/api/ss/api.SS3016.query-learningmanager-stu-list.js';
import '@/api/cmt/api.CMT1004.cmt-comment-exist.js';
import '@/api/cmt/api.CMT1002.cmt-comment-detail.js';
import '@/api/cmt/api.CMT1001.cmt-comment-add.js';
// import User from '@/utils/user';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';
import commentModel from '@/www/components/learningCenter/commentModel/index.vue';
import StudentManagerView from '@/www/components/components/student-manager-view/index.vue';
export default {
    name: 'headmaster',
    components: {
        orderNull,
        commentModel,
        StudentManagerView,
    },
    provide() {
        return {
            showDialog: this.showDialog,
            projectId: '',
        };
    },
    data() {
        return {
            labelType: 'HT',
            keys: 0,
            cmtSuccess: false,
            commentInfo: {},
            lableLevel: 0,
            ifPJshow: false,
            msgView1: {
                //显示导出提示
                show: false,
                title: '',
            },
            setTime: '',
            swiperOption: {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 12, //每个滑块距右边的距离
                loopAdditionalSlides: 100,
                navigation: {
                    nextEl: '.infoRight',
                    prevEl: '.infoLeft',
                },
            },
            wechatQr: '',
            isShow: false,
            flagleft: true,
            serverMobile: '400-861-8800',
            chargeteacherList: [],
            evaluatTeacherDataBox: {},
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的学管师_点亮职业人生_优路教育',
            meta: [],
        });
    },
    watch: {
        ifPJshow(val) {
            this.$nextTick(() => {
                if (val === false) {
                    this.keys += 1;
                } else {
                    this.keys += 1;
                }
            });
        },
    },
    mounted() {
        this.getchargeteacherList();
    },
    methods: {
        submit(data) {
            let params = {
                commentContent: data.commentContent,
                commentBiztype: 'HT',
                commentBizid: this.evaluatTeacherDataBox.id,
                commentBizname: this.evaluatTeacherDataBox.desc,
                commentLevel: data.commentLevel,
                commentimageSrc: data.commentimageSrc,
                projectId: this.evaluatTeacherDataBox.projectId,
                serveruserId: this.evaluatTeacherDataBox.eeUserid,
                lableId: data.lableId,
            };
            this.$niceloo.api.call('cmt/cmt-comment-add', {
                ...params,
                onsuccess: () => {
                    this.ifPJshow = false;
                    this.cmtSuccess = true;
                    clearTimeout(this.setTime);
                    this.msgView1.show = true;
                    this.msgView1.title = '已提交成功，感谢您的评价';
                    this.setTime = setTimeout(() => {
                        this.msgView1.show = false;
                    }, 2000);
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //关闭评价弹窗
        closeCmtPop() {
            this.ifPJshow = false;
        },
        //评价按钮
        evaluatTeacher(e) {
            this.evaluatTeacherDataBox = e;
            this.ifPJshow = true;
        },
        //获取学管师列表
        getchargeteacherList() {
            this.$niceloo.api.call('ss/query-learningmanager-stu-list', {
                appid: '1000141',
                onsuccess: ({ learningManagers = [] }) => {
                    learningManagers.forEach((item) => {
                        // 开启企业微信，并且在职
                        // (item.eeUserid && item.name) || (item.weComOConfigOpenStatus === 'N' && item.eeUserid && !item.name)
                        if (',O,W,I,'.includes(item.eeWorkstatus) === false) {
                            item.isShowLearningManager = false;
                        } else if (!item.eeUserid) {
                            item.isShowLearningManager = false;
                        } else {
                            item.isShowLearningManager = true;
                        }
                    });
                    this.chargeteacherList = learningManagers;
                    this.flagleft = this.chargeteacherList.length > 1;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //复制手机号
        copyMobile(item) {
            clearTimeout(this.setTime);
            this.msgView1.title = '手机号已复制';
            this.msgView1.show = true;
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', item.mobile);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
            }
            document.body.removeChild(input);
            this.setTime = setTimeout(() => {
                this.msgView1.show = false;
            }, 2000);
        },
        //复制微信号
        copyWeChat(item) {
            this.projectId = item.projectId;
            this.isShow = true;
            const data = {
                url: 'ss/query-learningmanager-stu-list',
                params: {
                    appid: $nuxt.context.env.config.appid,
                    projectId: item.projectId,
                },
            };
            this.$baseUI.loading();
            this.$httpClient(data)
                .then((res) => {
                    let learningManager = null;
                    this.$baseUI.loading.closeAll();
                    if (res.count) {
                        learningManager = res.learningManagers[0];
                    }
                    this.$baseUI
                        .createModel(
                            {
                                modalContent: StudentManagerView,
                            },
                            {
                                learningManager,
                            },
                            {
                                showHead: false,
                                padding: '0',
                                isTransparent: true,
                                width: '480px',
                            }
                        )
                        .then(({ type }) => {
                            if (type === 'close') {
                                this.isShow = false;
                            }
                        });
                })
                .catch(() => {
                    this.$baseUI.loading.closeAll();
                });
        },
        /*isShowEr(item) {
            this.wechatQr = item.wechatQr;
            this.isShow = true;
        },
        isHideEr() {
            this.isShow = false;
        },*/
        showDialog(message) {},
    },
};
</script>

<style scoped lang="less">
@import './css/headmaster.less';
</style>
