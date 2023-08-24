<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-01 15:35:46
 * @Description: 
-->
<template>
    <div class="same-class-box" v-show="isShow">
        <div class="box-title">
            <img src="./asset/images/same-class.png" alt="" class="top-img" />
        </div>
        <ul class="list-box">
            <li class="list-item flex ai-center" v-for="(item, index) in dataList" :key="index" @click="handleItemClick(item)">
                <img :src="item.goodsCover" alt="" class="item-left icon" />
                <div class="item-right flex jc-between column">
                    <p class="item-title text-overflow-2">{{ item.goodsName }}</p>
                    <span class="item-class-num">共{{ item.coursewareCount }}节</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mcpTrialWebSimilar } from '../../../experienceClass/apis/index.js';

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
    watch: {
        params: {
            handler() {
                this.mcpTrialWebSimilar();
            },
            deep: true,
        },
    },
    methods: {
        // {categoryId,clientType,courseOpenstatus,coursePromotiontype,operateCategoryId,projectId,subjectId}
        mcpTrialWebSimilar() {
            mcpTrialWebSimilar(this, this.params)
                .then((res) => {
                    res.forEach((item) => {
                        item.goodsCover = this.$urlUtils.getViewUrl(item.goodsCover);
                    });
                    this.dataList.splice(0, this.dataList.length, ...res.splice(0, 6));
                    this.isShow = this.dataList.length > 0;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleItemClick(item) {
            const page = this.$router.resolve({ name: 'experienceClass', params: { courseId: item.goodsId } });
            window.open(page.href, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.same-class-box {
    width: 324px;
    background-color: #fff;
    padding-bottom: 24px;
    border-radius: 8px;
    // padding: 10px 10px 26px;
    margin-bottom: 30px;
    .box-title {
        width: 100%;
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
    }

    .list-box {
        padding-top: 10px;
        .list-item {
            padding: 10px;
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
                .item-class-num {
                    font-size: 12px;
                    line-height: 16px;
                    color: #9698a2;
                }
            }
        }
        .list-item:hover {
            background-color: whitesmoke;
        }
        .list-item:not(:last-child)::after {
            content: '';
            display: block;
            background-color: aquamarine;
            // border-bottom: solid #f5f5f5 1px;
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 0;
        }
    }
}
</style>
