<template>
    <div class="content-right">
        <div class="right-top flex ai-center">
            <img src="./asset/images/sameClass.png" />
        </div>
        <div class="list-box">
            <template v-for="(item, index) in courseList">
                <div class="list-item flex ai-center" :key="index">
                    <template v-if="item.polymerizeCourseType === 'XT'">
                        <a :href="`/pro-course/detail/${item.classtypeId}`" target="_blank"></a>
                        <image-view class="item-left" :src="$urlUtils.getViewUrl(item.classtypeAppcoverimgurl)"></image-view>
                        <div class="course-type">系统课</div>
                        <div class="item-right flex jc-between column">
                            <div class="item-title text-overflow-2">{{ item.classtypeName }}</div>
                            <div class="tags-box">
                                <span class="tag-txt c-yellow" v-if="item.currentAreaStatus === 'Y'">{{ areaName }}</span>
                                <span class="tag-txt c-gray" v-if="item.classtypeHighlights">{{ item.classtypeHighlights[0] }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="item.polymerizeCourseType === 'TY'">
                        <a :href="`/trial-course/detail/${item.goodsId}`" target="_blank"></a>
                        <image-view class="item-left" :src="$urlUtils.getViewUrl(item.coursePicpath)"></image-view>
                        <div class="course-type">体验课</div>
                        <div class="item-right flex jc-between column">
                            <div class="item-title text-overflow-2">{{ item.goodsName }}</div>
                            <div class="item-class-num">共{{ item.coursewareCount }}节</div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
/*import '@/api/mcp/api..query-index-trial-list.js'; // 固定首页10个体验课列表*/
import '@/api/mcp/api..query-intelligent-recommend.js';

import { mapActions } from 'vuex';
export default {
    name: 'listBoxModel',
    data() {
        return {
            areaCode: '',
            areaName: '',
            courseList: [],
            projectIdsArry: [],
        };
    },
    watch: {},
    created() {},
    async mounted() {
        await this.getProjectList();
        await this.getAreaMsg();
        this.getList();
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        getProjectList() {
            return new Promise((resolve) => {
                this.getRecommendProjectList().then((list) => {
                    list.forEach((item) => {
                        this.projectIdsArry.push(item.projectId);
                    });
                    resolve();
                    console.log('同类好课');
                });
            });
        },
        getAreaMsg() {
            return new Promise((resolve, reject) => {
                this.getArea()
                    .then((res) => {
                        this.areaCode = res.cityCode;
                        this.areaName = res.cityName;
                        resolve();
                    })
                    .catch((err) => {
                        reject();
                        console.log(err);
                        /*this.isError = true;
                    this.isLoading = false;*/
                    });
            });
        },
        getList() {
            console.log(this.projectIdsArry.join(','));
            this.$callApi('cc/query-intelligent-recommend', {
                pageSize: 8, // 每页数量
                projectIds: this.projectIdsArry.join(','), // 项目标识
                showClient: 'W', // 客户端类型 [枚举]W:Web;S:Applet
                areacode: this.areaCode, // 地区编码
                onsuccess: (res) => {
                    res.length &&
                        res.forEach((item) => {
                            if (item.classtypeHighlights) {
                                item.classtypeHighlights = item.classtypeHighlights.split(',');
                            }
                        });
                    this.courseList = res;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.content-right {
    width: 324px;
    margin-left: 16px;
    .right-top {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #fff;
        height: 60px;
        padding-left: 20px;
        img {
            width: auto;
            height: 18px;
        }
    }
}
.list-box {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #fff;
    margin-top: -5px;
    padding-top: 10px;
    .list-item {
        padding: 10px 20px;
        cursor: pointer;
        position: relative;
        .item-left {
            display: block;
            width: 128px;
            height: 80px;
            margin-right: 12px;
            border-radius: 6px;
            overflow: hidden;
        }
        .course-type {
            position: absolute;
            top: 18px;
            left: 99px; //靠右
            width: 44px;
            height: 20px;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 12px;
        }

        .item-right {
            width: calc(100% - 140px);
            height: 80px;
            padding-bottom: 6px;
            color: #333333;
            .item-title {
                width: 100%;
                font-size: 14px;
                line-height: 19px;
            }
            .item-class-num {
                font-size: 12px;
                line-height: 16px;
                color: #9698a2;
            }
            .tag-txt {
                float: left;
                margin-right: 6px;
                line-height: 22px;
                padding: 0 7px;
                font-size: 12px;
                color: #f8323c;
                background-color: #ffeff0;
                border-radius: 2px;
            }
            .c-gray {
                color: #53586c;
                background-color: #eeeff6;
            }
            .c-yellow {
                color: #fa6400;
                background-color: rgba(251, 135, 21, 0.1);
            }
        }
        &:hover {
            .item-right {
                color: #ff2e30;
            }
        }
        a {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2;
        }
    }
}
</style>
