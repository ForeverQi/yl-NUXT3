<template>
    <div class="related-box">
        <div class="related-top">
            <div class="line"></div>
            <div class="related-title">相关课程</div>
        </div>
        <ul class="relate-class-list">
            <li class="class-item" v-for="(item, index) in dataList" :key="index" @click="handleItemClick(item)">
                <img :src="item.goodsCover" alt="" class="item-img" />
                <div class="item-info">
                    <p class="item-title text-overflow-2">
                        {{ item.goodsName }}
                    </p>
                    <div class="item-price">{{ item.coursePrice | price }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mcpTrialWebRelated } from '../../../apis/index.js';

export default {
    name: 'relatedClass',
    filters: {
        price(val) {
            if (Boolean(val) <= 0) {
                return '免费';
            }
            return `￥${val}`;
        },
    },
    inject: ['experienceClass'],
    data() {
        return {
            clientType: 'W',
            dataList: [],
        };
    },
    watch: {
        experienceClass: {
            handler() {
                this.mcpTrialWebRelated();
            },
            deep: true,
        },
    },
    created() {
        this.mcpTrialWebRelated();
    },
    methods: {
        mcpTrialWebRelated() {
            return mcpTrialWebRelated(this, {
                clientType: this.clientType,
                projectId: this.experienceClass.projectId,
                subjectId: this.experienceClass.subjectId,
            })
                .then((res) => {
                    res.forEach((item) => {
                        item.goodsCover = this.$urlUtils.getViewUrl(item.goodsCover);
                    });
                    this.dataList.splice(0, this.dataList.length, ...res);
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
.related-box {
    .related-top {
        padding-left: 16px;
        display: flex;
        align-items: center;
        height: 44px;
        .line {
            width: 3px;
            height: 16px;
            margin-right: 9px;
            background-color: #025eff;
            border-radius: 1px;
        }
        .related-title {
            line-height: 21px;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
        }
    }
    .relate-class-list {
        .class-item {
            display: flex;
            align-items: center;
            padding: 9px 16px 9px 15px;
            height: 80px;
            cursor: pointer;
            .item-img {
                width: 128px;
                height: 100%;
                display: block;
                margin-right: 12px;
                cursor: pointer;
                border-radius: 3px;
            }
            .item-info {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                .item-title {
                    font-size: 14px;
                    line-height: 19px;
                    color: #fff;
                    word-break: break-all;
                }
                .item-price {
                    font-size: 14px;
                    line-height: 16px;
                    color: #f8323c;
                }
            }
        }
        .class-item:hover {
            background-color: #282943;
        }
    }
}
</style>
