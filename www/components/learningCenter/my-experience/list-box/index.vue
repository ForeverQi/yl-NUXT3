<template>
    <div class="content-right">
        <div class="right-top flex ai-center">
            <img src="./asset/images/sameClass.png" />
        </div>
        <div class="list-box">
            <div class="list-item flex ai-center" v-for="item in courseList" :key="item.goodsId" @click="toDetail(item)">
                <image-view class="item-left" :src="$urlUtils.getViewUrl(item.coursePicPath)"></image-view>

                <div class="item-right flex jc-between column">
                    <div class="item-title text-overflow-2">{{ item.goodsName }}</div>
                    <div class="item-class-num">共{{ item.coursewareCount }}节</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/mcp/api..query-index-trial-list.js'; // 固定首页10个体验课列表
import { mapActions } from 'vuex';
export default {
    name: 'listBoxModel',
    data() {
        return {
            courseList: [],
            projectIdsArry: [],
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getRecommendProjectList().then((list) => {
            list.forEach((item) => {
                this.projectIdsArry.push(item.projectId);
            });
            this.getList();
            console.log('同类好课');
        });
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        getList() {
            console.log(this.projectIdsArry.join(','));
            this.$callApi('mcp/query-index-trial-list', {
                // projectIds: this.projectIdsArry.join(','),
                projectIds: '',
                findCount: 8,
                showClient: 'W', // 客户端类型 [枚举]W:Web;S:Applet
                onsuccess: (res) => {
                    this.courseList = res.splice(0, 8);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        toDetail(item) {
            window.open(`/trial-course/detail/${item.goodsId}`, '_blank');
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
            height: 17px;
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
        .item-left {
            display: block;
            width: 128px;
            height: 80px;
            margin-right: 12px;
            border-radius: 6px;
            overflow: hidden;
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
        }
        &:hover {
            .item-right {
                color: #ff2e30;
            }
        }
    }
}
</style>
