<template>
    <div class="list-box">
        <div class="list-item flex ai-center" v-for="item in courseList" :key="item.goodsId" @click="toDetail(item)">
            <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" class="item-left" :onerror="errorimg" />
            <div class="item-right flex jc-between column">
                <div class="item-title text-overflow-2">{{ item.goodsName }}</div>
                <div class="item-class-num">共{{ item.coursewareCount }}节</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mcpTrialWebSimilar } from '../../apis/index.js';

export default {
    name: 'listBoxModel',
    data() {
        return {
            courseList: [],
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            return mcpTrialWebSimilar(this, {
                clientType: 'W', // 客户端类型 [枚举]W:Web;S:Applet
            })
                .then((res) => {
                    this.courseList = res.filter((item, index) => index < 8);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        toDetail(item) {
            window.open(`/agile-course/course/${item.goodsId}`, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.list-box {
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
            .item-class-num {
                font-size: 12px;
                line-height: 16px;
                color: #9698a2;
            }
        }
    }
}
</style>
