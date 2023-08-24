<template>
    <div class="qb-online">
        <div v-if="list.length">
            <div
                v-for="(item, index) in list"
                :key="index"
                class="exam-item"
                :class="{ 'none-border': index === list.length - 1 }"
                @click="hadnleClickExamProject(item)"
            >
                <div class="item-left">
                    <img class="img" src="./asset/img/img.png" alt="" />
                    <p class="project-name">{{ item.projectName }}</p>
                </div>
                <img class="icon" src="./asset/img/right.png" alt="" />
            </div>
            <img class="exam-img" src="./asset/img/exam.png" alt="" @click="toPath" />
        </div>
        <div v-else class="empty">
            <div class="empty-c">
                <img class="img" src="./asset/img/empty.png" alt="" />
                <p class="title">暂无题库，敬请期待</p>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @prop {Array: 项目Object} list 枚举
 * @example {
                projectName: '一级建造师题库',
                projectCode: 'YIJIAN',
                ptagId: '子项目id'
            }
 */
export default {
    data() {
        return {
            list: [],
        };
    },
    fetch() {
        return this.init();
    },
    methods: {
        init() {
            return this.getData();
        },
        getData() {
            const data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.$nuxt.context.env.config.indexColumnId,
                    // 模块编码
                    moduleCode: 'TK',
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: 7,
                },
                isCustom: true,
            };
            return this.httpClient(data).then((res) => {
                this.list = res.content;
            });
        },
        hadnleClickExamProject(item) {
            // console.log(item);
            this.trackData(item);
            this.$storage.set('examProject', item);
            this.$PageUtil.openNewPage(`/exam/index/list/${item.projectCode}/${item.ptagId ? item.ptagId : item.projectCode}/ZJLX`);
        },
        toPath() {
            this.$PageUtil.openNewPage(`/exam/index`);
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
        /**
         * 在线题库模块埋点
         */
        trackData(item) {
            const track = {
                module_name: '在线题库', // 模块名称
                course_name: item.projectName, // 资源名称
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
    },
};
</script>

<style lang="less" scoped>
.qb-online {
    padding: 24px 15px 12px;
    box-sizing: border-box;
    width: 335px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    .exam-item {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.5px solid rgba(221, 221, 221, 0.5);
        cursor: pointer;
        &.none-border {
            border-bottom: none;
        }
        .item-left {
            display: flex;
            align-items: center;
            .img {
                margin-right: 8px;
                width: 22px;
                height: 22px;
            }
            .project-name {
                font-size: 16px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 21px;
            }
        }
        .icon {
            width: 12px;
            height: 12px;
        }
        &:hover {
            .project-name {
                color: #ff2e30;
            }
        }
    }
    .exam-img {
        margin: 0 auto;
        margin-top: 3px;
        display: block;
        width: 295px;
        height: 77px;
        cursor: pointer;
    }
    .empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .img {
            display: block;
            margin: 0 auto;
            width: 260px;
            height: 180px;
        }
        .title {
            margin-top: 14.5px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #3a3d4b;
            line-height: 19px;
        }
    }
}
</style>
