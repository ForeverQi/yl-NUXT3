<template>
    <div class="dict-box" v-if="dictBoxShow">
        <!-- 头部 -->
        <dict-header ref="dictHeader" :isbox="true" @close-dict="closeDict" @go-back="goBack"></dict-header>

        <!-- 主内容 -->
        <div class="main">
            <!-- 搜索框 -->
            <dict-search
                v-if="dictBoxShow"
                ref="dictSearch"
                @handle-select="handleSelect"
                @handle-search="handleSearch"
                @join-dict="joinDict"
                :is-accurate="isAccurate"
                :is-show-dict-list="isShowDictList"
                :project-id="projectId"
            ></dict-search>

            <div class="dict-box-content" ref="dictBoxContent" v-loading="loading" @scroll="scrollEvent">
                <!-- 用户未进行搜索-初始状态 -->
                <div class="default-search" v-if="!isSearched">
                    <div class="img"></div>
                    <div>专业名词 一网打尽</div>
                </div>

                <!-- 搜索结果: 列表 -->
                <dict-list ref="dictList" v-show="isShowDictList && dictList.length > 0" :list="dictList" @tap-active="tapActive" />

                <!-- 搜索结果: 详情 -->
                <template v-if="!isShowDictList && dictDetailList.length > 0">
                    <dict-detail
                        ref="dictDetail"
                        :list="dictDetailList"
                        :subject-id="subjectId"
                        @set-currentSubject="setCurrentSubject"
                        @pause-video="$emit('pause-video')"
                    />
                    <dict-evaluate @scroll-bottom="scrollBottom" :current-subject="currentSubject"></dict-evaluate>
                </template>

                <!-- 未获取到搜索结果 -->
                <div class="no-data" v-if="isShowNoDataTip">
                    <div class="img"></div>
                    <p>没有找到 “{{ searchText }}” 名词</p>
                    <span>可以换个关键词重试~</span>
                </div>

                <!--我是有底线的-->
                <div class="bottom-line" v-if="isShowDictList && dictList.length > 0">
                    <div class="content">我是有底线的</div>
                </div>
            </div>
        </div>
        <!-- 轻提示 -->
        <div v-if="isShowToast" class="toast">啊哦，没搜到，老师后续会添加该名词的~</div>
    </div>
</template>
<script>
import DictDetail from '../DictDetail/index.vue';
import DictEvaluate from '../DictEvaluate/index.vue';
import DictHeader from '../DictHeader/index.vue';
import DictSearch from '../DictSearch/index.vue';
import DictList from '../DictList/index.vue';

export default {
    name: 'dict-box',
    components: {
        DictSearch,
        DictDetail,
        DictEvaluate,
        DictHeader,
        DictList,
    },
    props: {
        dictBoxShow: {
            type: Boolean,
            default: false,
        },

        projectId: {
            type: String,
            default: '',
        },

        // 页面类型
        pageType: {
            type: String,
            default: '',
        },

        // 页面名称
        pageName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSearched: false, // 用户是否进行了搜索
            searchText: '', // 输入框内容的值
            dictList: [], // 词点列表
            dictDetailList: [], // 词点详情列表
            isShowDictList: true, // 是否显示词点列表
            isShowNoDataTip: false, // 是否显示未搜索到相关信息的提示语
            currentSubject: {}, // 当前选中的词点详情数据
            isAccurate: true, // 是否精确匹配
            subjectId: '', // 科目ID
            loading: false, // loading加载
            isShowToast: false, // 是否显示轻提示
            scrollTop: 0, // 当展示为词点列表时记录滚动的位置
            projectName: '', // 项目名称
        };
    },
    computed: {
        // 埋点基本属性信息
        yskOption() {
            return {
                project_position: this.projectName,
                page_type: this.pageType,
                page_name: this.pageName,
            };
        },
    },
    created() {
        if (this.projectId && this.dictBoxShow) {
            this.getProjectName();
        }
    },
    methods: {
        // 监听内容区域滚动
        scrollEvent() {
            if (this.isShowDictList && this.scrollTop >= 0) {
                this.scrollTop = this.$refs.dictBoxContent.scrollTop;
            }
        },

        // 获取项目名称
        getProjectName() {
            let params = {
                projectId: this.projectId,
            };
            this.$callRawApi({
                api: 'bd/project/info',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let data = _reponse.getData();
                    this.projectName = data.projectName;
                });
        },

        /**
         * 下拉选择中的数据
         * @param {Object} option 选中的数据
         * @param {String} option.searchText 搜索框内容
         * @param {Object} option.dictDetail 选中的数据
         */
        handleSelect(option) {
            let name = option.dictDetail.names;

            if (name.length >= 50) {
                name = name.substr(0, 50);
            }

            this.isSearched = true;
            this.isShowDictList = false;
            this.isShowNoDataTip = false;
            this.$refs.dictHeader.isShowBack = false;
            this.searchText = name;
            this.subjectId = '';
            this.$bus.$emit('dict-pause-video');
            this.queryDictDetail(option.dictDetail.names);
        },

        /**
         * 获取搜索框内容
         * @param {String} searchText 搜索框内容
         * @param {boolean} isRepetition 输入框内容是否重复
         */
        handleSearch(searchText, isRepetition) {
            if (isRepetition) {
                this.searchText = searchText;
                this.goBack();
                return;
            }

            this.isSearched = true;
            this.isShowDictList = true;
            this.isShowNoDataTip = false;
            this.searchText = searchText;
            this.$refs.dictList.activeIndex = null;
            this.$refs.dictHeader.isShowBack = false;
            this.subjectId = '';
            this.scrollTop = 0;

            this.$bus.$emit('dict-pause-video');
            this.queryNounByEsList();
        },

        // 查询词点快查列表接口
        queryNounByEsList() {
            this.dictList = [];
            this.loading = true;

            let params = {
                pageIndex: 0,
                pageSize: 20,
                searchContent: this.searchText,
                searchProjectId: this.projectId,
            };
            this.$callRawApi({
                api: 'cbn/noun/es/list/v2',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let data = _reponse.getData();
                    let nounArray = [];
                    let isNotArray = !(data && data.nounList && data.nounList.length > 0);
                    if (!isNotArray) {
                        this.dictList = data.nounList;

                        this.dictList.forEach((item) => {
                            nounArray.push(item.pureNames);
                        });

                        this.isAccurate = data.accurate;
                    } else {
                        this.isShowNoDataTip = true;
                        this.isAccurate = true;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 查询词点详情接口
        queryDictDetail(name) {
            this.dictDetailList = [];
            this.loading = true;

            let params = {
                names: name,
                projectId: this.projectId,
            };
            this.$callRawApi({
                api: 'cbn/noun/user/search/v2',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let data = _reponse.getData();
                    if (data.length === 0) {
                        this.isShowNoDataTip = true;
                    }

                    this.dictDetailList = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 点击提建议 内容区域滚动到底部
        scrollBottom() {
            setTimeout(() => {
                this.$nextTick(() => {
                    let dictBoxContentObj = this.$refs.dictBoxContent;
                    dictBoxContentObj.scrollTop = dictBoxContentObj.scrollHeight;
                });
            }, 100);
        },

        // 关闭词点快查弹框
        closeDict() {
            this.$nextTick(() => {
                if (this.$refs.dictDetail) {
                    this.$refs.dictDetail.closeVideo();
                }
            });

            this.$emit('close-dict');
        },

        setCurrentSubject(v) {
            this.currentSubject = v || {};
        },

        // 点击词点列表选中的数据
        tapActive(item) {
            let pureNames = item.pureNames;
            if (pureNames && pureNames.length >= 50) {
                pureNames = pureNames.substr(0, 50);
            }

            this.isSearched = true;
            this.isShowDictList = false;
            this.isShowNoDataTip = false;
            this.subjectId = item.subjectId;

            this.searchText = pureNames;
            this.$refs.dictSearch.searchText = pureNames;
            this.$refs.dictHeader.isShowBack = true;
            this.queryDictDetail(item.pureNames);
        },

        // 点击返回按钮
        goBack() {
            this.isSearched = true;
            this.isShowDictList = true;
            this.isShowNoDataTip = !(this.dictList.length > 0);
            this.$refs.dictHeader.isShowBack = false;
            this.$refs.dictSearch.searchText = this.$refs.dictSearch.lastSearchText;
            this.subjectId = '';
            this.currentSubject = {};

            // 滚动到指定位置
            this.$nextTick(() => {
                this.$refs.dictBoxContent.scrollTop = this.scrollTop;
            });
        },

        /**
         * 添加入库操作
         * @param {String} searchText 用户输入内容
         */
        joinDict(searchText) {
            let params = {
                name: searchText,
                projectId: this.projectId,
            };
            this.$callRawApi({
                api: 'cbn/noun/confirm',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    this.isShowToast = true;
                    setTimeout(() => {
                        this.isShowToast = false;
                    }, 2500);
                });
        },
    },
};
</script>

<style lang="less">
.dict-box-wrapper {
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: #fff;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: #fff;
        -webkit-border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        background-color: rgba(50, 50, 50, 0.3);
        -webkit-border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        width: 5px;
        -webkit-border-radius: 6px;
    }
}
</style>

<style lang="less" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.dict-box-wrapper {
    width: 100%;
    position: relative;
}
.dict-box {
    position: fixed;
    right: 100px;
    height: 92vh;
    width: 580px;
    bottom: 5px;
    border-radius: 4px;
    box-shadow: 0 2px 10px 0;
    display: block;
    // border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    z-index: 999;
    text-align: left;
    .main {
        height: calc(100% - 60px);
        width: 100%;
        padding: 33px 20px 0;
        z-index: 2901;
        display: flex;
        flex-direction: column;
    }

    .dict-box-content {
        flex: 1;
        width: 100%;
        overflow-y: auto;
    }

    .default-search {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: calc(100% - 20px);
        .img {
            background: url('./asset/images/default.png') no-repeat center center;
            width: 411px;
            height: 181px;
            background-size: 411px 181px;
            margin-bottom: 20px;
        }
        p {
            font-size: 14px;
            font-weight: bolder;
            text-align: center;
            color: #53586c;
            line-height: 21px;
        }
    }

    .bottom-line {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0 32px;
        font-size: 14px;
        color: #ababb6;
        .content {
            display: flex;
            align-items: center;
            justify-content: center;

            &:before,
            &:after {
                content: '';
                width: 76px;
                height: 1px;
                background: #e4e5ee;
                margin: 0 16px;
            }
        }
    }

    .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 20px);
        .img {
            background: url('./asset/images/no-data.png') no-repeat center center;
            width: 222px;
            height: 156px;
            background-size: 222px 156px;
        }
        p {
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            color: #333333;
            line-height: 20px;
            margin-top: 15px;
            margin-bottom: 5px;
        }
        span {
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #999999;
            line-height: 20px;
        }
    }
}

.toast {
    padding: 10px 20px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    border-radius: 10px;
    text-align: center;
    line-height: 1.5em;
}
</style>
