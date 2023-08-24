<template>
    <div class="same-class-box" v-show="isShow">
        <div class="box-title">
            <img src="./asset/images/icon.png" alt="" class="top-icon" />
            <img src="./asset/images/same-class.png" alt="" class="top-img" />
        </div>
        <ul class="list-box">
            <li class="list-item flex ai-center" v-for="(item, index) in dataList" :key="index" @click="handleItemClick(item)">
                <!-- <img :src="item.goodsCover" alt="" class="item-left icon" /> -->
                <image-view :src="item.goodsCover" class="item-left icon" />
                <div class="item-right flex jc-between column">
                    <p class="item-title text-overflow-2">{{ item.goodsName }}</p>
                    <span class="item-class-num">共{{ item.coursewareCount }}节</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import '@/api/mcu/api.MCU0002.mcp_trial_web_similar.js';
import '@/api/mcp/api..query-index-trial-list.js';

export default {
    name: 'listBoxModel',
    props: {
        params: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return { dataList: [], isShow: true };
    },
    fetch() {
        return this.mcpTrialWebSimilar();
    },
    watch: {
        params: {
            handler() {
                console.warn('this.paramsthis.paramsthis.params', this.params, this.params.projectId);
                this.params.projectId ? this.mcpTrialWebSimilar() : this.getTrialList();
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        mcpTrialWebSimilar() {
            return this.$callApi('experience/mcp_trial_web_similar', {
                ...this.params,
            })
                .then((res) => res.getData())
                .then((res) => {
                    res.forEach((item) => {
                        item.goodsCover = this.$urlUtils.getViewUrl(item.goodsCover);
                    });
                    this.dataList.splice(0, this.dataList.length, ...res.splice(0, 8));
                })
                .catch((err) => {
                    console.error(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        getTrialList() {
            this.getRecommendProjectList()
                .then(() => {
                    return this.$callApi('mcp/query-index-trial-list', {
                        findCount: 8,
                        showClient: 'W',
                        projectIds: '',
                    }).then((res) => res.getData());
                })
                .then((res) => {
                    res.forEach((item) => {
                        item.goodsCover = this.$urlUtils.getViewUrl(item.coursePicPath);
                    });
                    this.dataList.splice(0, this.dataList.length, ...res.splice(0, 8));
                })
                .catch((err) => {
                    console.error(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        handleItemClick(item) {
            window.open(`/trial-course/detail/${item.goodsId}`, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.same-class-box {
    width: 324px;
    background-color: white;
    padding-bottom: 24px;
    border-radius: 8px;
    margin-bottom: 30px;
    .box-title {
        background-image: url('./asset/images/title-bg.png');
        background-size: contain;
        height: 60px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        background-color: #f8fbff;
        .top-img {
            width: auto;
            height: 20px;
            display: block;
        }
        .top-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }
    }

    .list-box {
        padding-top: 10px;
        .list-item {
            padding: 10px 20px;
            cursor: pointer;
            position: relative;
            .icon {
                border-radius: 3px;
            }

            .item-left {
                display: block;
                width: 128px;
                height: 80px;
                margin-right: 12px;
            }
            .item-right {
                width: calc(100% - 140px);
                height: 80px;
                padding-bottom: 6px;
                .item-title {
                    width: 100%;
                    font-size: 14px;
                    line-height: 19px;
                    color: #333333;
                }
                .item-title:hover {
                    color: #ff2e30;
                }
                .item-class-num {
                    font-size: 12px;
                    line-height: 16px;
                    color: #9698a2;
                }
            }
        }
        .list-item:not(:last-child)::after {
            content: '';
            display: block;
            background-color: aquamarine;
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 0;
        }
    }
}
</style>
