<template>
    <div v-loading="loading" loading-background="#fff" class="special-region-practice-box">
        <SelectCity v-if="list.length" class="city-select" :selece-area="seleceArea" @handle-click-city="clickCity" />
        <div v-if="list.length" class="list">
            <div v-for="(item, index) in list" :key="index" class="item">
                <div class="item-left">
                    <img class="bg" src="../../../assets/img/dqzl_bg.png" alt="" />
                    <div>
                        <p class="item-title" @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`)">
                            {{ item.paperName }}
                        </p>
                        <div class="item-info">
                            <span class="info-text">{{ `已做：${item.answerCount} 次` }}</span>
                            <span class="info-text">{{ `上次得分：${item.previousAnswerScore} 分` }}</span>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <div
                        v-if="item.answersheetStatus === 'U'"
                        class="btn start-btn"
                        @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`)"
                    >
                        开始做题
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'A'"
                        @click="openPage(`/exam/ks/donegy/${classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`)"
                        class="btn analysis-btn"
                    >
                        查看解析
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'A'"
                        @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`)"
                        class="btn doing-btn"
                    >
                        重新做题
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'G'"
                        @click="openPage(`/exam/ks/goon/${classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`)"
                        class="btn doing-btn"
                    >
                        继续做题
                    </div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty v-if="!list.length && isLoagin && !showVip" />
        <VipMask v-if="showVip" :channel="'地区专练'" :is-loagin="isLoagin" :text="isLoagin ? '本项目系统课学员可学习该模块哦' : '请在登录后再开始练习'" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Empty from '../empty';
import VipMask from '../vip-mask';
import SelectCity from '@/www/components/components/select-area-section';
import Pagination from '@/www/components/components/pagination';
import '@/api/qb/api..query-business-class-convert.js';
import '@/api/qb/api..query-business-common-author.js';
import '@/api/qb/api..query-business-paper-training_list.js';
import '@/api/ss/api.SS5105.query-examserv-userExamAreacode.js';
import '@/api/cp/api.CP0005.get-location.js';

export default {
    components: {
        Empty,
        VipMask,
        SelectCity,
        Pagination,
    },
    data() {
        return {
            projectId: '',
            classUniquecode: '', // 项目编码
            papertypeCode: '',
            subjectId: '', // 科目id
            userYoulunum: '', // 优路号
            seleceArea: '', // 选择地区
            areaCode: '', // 地区code
            year: '', // 当前年份
            showVip: false, // 是否打开 vip 遮罩
            isLoagin: false, // 是否登录
            loading: false,
            provinceList: [],
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
            list: [],
            test: [],
        };
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.subjectId = this.$route.params.subjectId;
                this.page = this.$options.data().page;
                this.getData();
            });
        },
        '$store.state.common.userLogin.popUpLogin'() {
            this.loginSuccess();
        },
    },
    async mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
        this.subjectId = this.$route.params.subjectId;
        this.loading = true;
        var date = new Date();
        this.year = date.getFullYear();
        await this.getCity().then((res) => {
            this.provinceList = res;
        });
        this.getLoaginStatus();
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        // 分页器事件
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.getData();
        },
        // 按钮事件
        openPage(path) {
            this.$PageUtil.href(path);
        },
        // 弹窗登录成功回调
        loginSuccess() {
            this.isLoagin = true;
            this.getLoaginInfo();
            this.classUniqueCodeConvertProjcetId();
        },
        // 选择城市回调
        clickCity(cityData) {
            console.log(cityData);
            this.seleceArea = cityData.areaName;
            this.areaCode = cityData.areaCode;
            this.$storage.set(this.userYoulunum + '_' + this.classUniquecode + '_DQZL_city', {
                areaName: cityData.areaName,
                areaCode: cityData.areaCode,
            });
            this.getData();
        },
        getData() {
            this.list = [];
            this.loading = true;
            niceloo.api.call('qb/query-business-paper-training_list', {
                paperType: 'DQZL', // 试卷类型
                classUniqueCode: this.classUniquecode, // 项目唯一编码
                subjectId: this.subjectId,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                ctype: 'web', // 客户端类型 (2022/03/17，这个参数架构组还未确定，但是为必传项，因此这里开发者自定义一个 web 入参，后续架构组确定后更改)
                sourceType: $nuxt.context.env.config.sourceType,
                paperAreaCode: this.areaCode, // 试卷地区编码
                onsuccess: (res) => {
                    console.log(res);
                    this.page.total = res.count;
                    this.list = res.data;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        // 获取登录状态
        getLoaginStatus() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                async (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.isLoagin = true;
                        await this.getLoaginInfo();
                        await this.classUniqueCodeConvertProjcetId();
                    } else {
                        this.showVip = true;
                        this.isLoagin = false;
                        this.loading = false;
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 获取登录信息
        getLoaginInfo() {
            var promise = ylPlugin.login.getUser();
            promise.then(
                (user) => {
                    this.userYoulunum = user.userYoulunum;
                    console.log('====>', user); /* {userName: 'xx', userNickname: 'xx', userYoulunum: 'EX00001', userIdcardstatus: 'S', ...} */
                },
                (err) => {
                    /* 获取登录信息的过程中有失败 */
                    console.error(err);
                }
            );
        },
        /**
         * 如果多开标签页，使用 loacl 缓存的话，会出现前一个标签页使用后一个 classUniquecode 问题
         * 和后台老师沟通后，采用 $router.params.classUniquecode 兑换 projectId
         */
        // 当前项目转换(用 classUniquecode 兑换 projcetId)
        classUniqueCodeConvertProjcetId() {
            niceloo.api.call('qb/query-business-class-convert', {
                uniqueCode: this.classUniquecode,
                onsuccess: (res) => {
                    console.log(res);
                    this.projectId = res.projectId;
                    this.getAuthor();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 用户是否有做题专练权限
        getAuthor() {
            niceloo.api.call('qb/query-business-common-author', {
                projectId: this.projectId,
                onsuccess: (res) => {
                    console.log(res);
                    this.showVip = false;
                },
                onerror: () => {
                    this.showVip = true;
                },
                oncomplete: () => {
                    let storageCity = this.$storage.get(this.userYoulunum + '_' + this.classUniquecode + '_DQZL_city');
                    if (storageCity) {
                        this.seleceArea = storageCity.areaName;
                        this.areaCode = storageCity.areaCode;
                        this.getData();
                        return;
                    }
                    this.getUserCity();
                },
            });
        },
        // 获取地区专练下学员报考地区
        getUserCity() {
            niceloo.api.call('ss/query-examserv-userExamAreacode', {
                projectId: this.projectId, // 项目标识
                pypYear: this.year, // 报考年份
                onsuccess: (res) => {
                    console.log(res);
                    if (!res) {
                        this.getLocationByIp();
                        return;
                    }
                    this.provinceList.forEach((item, val) => {
                        if (res.examservProvareacode == item.areaCode) {
                            this.areaCode = item.areaCode;
                            this.seleceArea = item.areaName;
                        }
                    });
                    this.getData();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 根据IP获取位置
        getLocationByIp() {
            niceloo.api.call('cp/get-location', {
                onsuccess: (res) => {
                    try {
                        let province = res.data.content.address_detail.province;
                        let pattern = /省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/;
                        this.seleceArea = province.replace(pattern, '');
                        this.provinceList.forEach((item, val) => {
                            if (this.seleceArea == item.areaName) {
                                this.areaCode = item.areaCode;
                            }
                        });
                    } catch (e) {
                        this.seleceArea = '北京';
                        this.provinceList.forEach((item, val) => {
                            if (this.seleceArea == item.areaName.trim()) {
                                this.areaCode = item.areaCode;
                            }
                        });
                    }
                    this.getData();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.special-region-practice-box {
    position: relative;
    min-height: 500px;
    .city-select {
        padding: 12px 24px;
    }
    .list {
        .item {
            margin-top: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item-left {
                display: flex;
                align-items: center;
                .bg {
                    margin-right: 16px;
                    width: 64px;
                    height: 64px;
                }
                .item-title {
                    max-width: 540px;
                    font-size: 17px;
                    font-weight: 700;
                    color: #3a3d4b;
                    line-height: 24px;
                    letter-spacing: 0.71px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover {
                        color: #ff2e30;
                    }
                }
                .item-info {
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    .info-text {
                        margin-right: 24px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #99a1af;
                        line-height: 20px;
                        letter-spacing: 0.58px;
                    }
                }
            }
            .btn-box {
                display: flex;
                align-items: center;
                .btn {
                    width: 96px;
                    height: 39px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    line-height: 39px;
                    border-radius: 20px;
                    cursor: pointer;
                }
                .start-btn {
                    color: #ffffff;
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                    &:hover {
                        background: #d4151e;
                    }
                }
                .analysis-btn {
                    margin-right: 20px;
                    color: #3a3d4b;
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.12);
                }
                .doing-btn {
                    color: #ff2e30;
                    background: #fff2f0;
                }
            }
        }
        .pagination {
            margin-top: 64px;
        }
    }
}
</style>
