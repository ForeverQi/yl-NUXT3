<template>
    <a :href="detailUrl" :disabled="file.docAvlstatus === 'N'" @click="handlerClick(file)" target="_blank" class="card-file-wrapper">
        <div class="card-file-box" :class="{ lapse: file.docAvlstatus === 'N' }">
            <div class="card-file">
                <div class="card-left">
                    <img v-if="file.docPackstatus === 'Y'" src="./asset/images/package.png" alt="" />
                    <img v-if="file.docPackstatus === 'N'" src="./asset/images/single.png" alt="" />
                    <div class="card-left-txt">
                        <p class="name" v-html="file.docName"></p>
                        <p class="num" v-if="file.docPackstatus === 'N'">共{{ file.docPagenum }}页｜{{ changeDocSize(file.docSize) }}</p>
                        <p class="num" v-if="file.docPackstatus === 'Y'">共{{ file.docPacknum }}条资料 ｜{{ changeDocSize(file.docSize) }}</p>
                    </div>
                </div>
                <div class="card-right">
                    <!-- 资料购买权限  F:免费;C:收费 -->
                    <!-- 资料促销类型(N:无促销;F:限时免费;L:限时特价;S特价) -->
                    <!-- 我的资料不显示已购文字 -->
                    <template v-if="file.docAvlstatus === 'Y' && !myCard">
                        <template v-if="file.isOwned == 'Y'">
                            <!-- 已购买 -->
                            <p class="price" v-if="file.isOwned == 'Y'">已购</p>
                        </template>
                        <template v-else>
                            <!-- 免费 -->
                            <p class="price" v-if="file.docAccess == 'F'">免费</p>
                            <!-- 收费  无促销-->
                            <p class="price" v-if="isTimeLimit === 'N' || (file.docAccess == 'C' && file.docPromotiontype == 'N' && file.isOwned == 'N')">
                                <span class="money">{{ file.docPrice | veMoneyCent }}</span>
                            </p>
                            <!-- 限时免费 -->
                            <p class="price" v-if="isTimeLimit === 'Y' && file.docAccess == 'C' && file.docPromotiontype == 'F' && file.isOwned == 'N'">
                                <span class="cuxiao">限时免费</span>
                                <span class="money">0</span>
                            </p>
                            <!-- 特价 -->
                            <p class="price" v-if="file.docAccess == 'C' && file.docPromotiontype == 'S' && file.isOwned == 'N'">
                                <span class="cuxiao">特价</span>
                                <span class="money">{{ file.docPromotionprice | veMoneyCent }}</span>
                            </p>
                            <!-- 限时特价 -->
                            <p class="price" v-if="isTimeLimit === 'Y' && file.docAccess == 'C' && file.docPromotiontype == 'L' && file.isOwned == 'N'">
                                <span class="cuxiao">限时特价</span>
                                <span class="money">{{ file.docPromotionprice | veMoneyCent }}</span>
                            </p>
                        </template>
                    </template>
                    <p class="down" v-if="file.docAvlstatus === 'Y'" @click.stop="downloadDoc(file, location)">
                        下载资料{{ file.docPackstatus === 'Y' ? '包' : '' }}
                    </p>
                </div>
            </div>
            <p class="lapse-img" v-if="file.docAvlstatus === 'N'">
                <img src="./asset/images/lapse.png" alt="" />
            </p>
        </div>
    </a>
</template>
<script>
import MixIn from '../mixin/index.js';
import CountDown from '../mixin/countDown.js';
import vbParse from '@/www/components/vbParse/index.vue';

export default {
    name: 'information-card',
    components: { vbParse },
    mixins: [MixIn, CountDown],
    props: {
        catalogId: {
            type: String,
            default: '',
        },
        //资料数据
        file: {
            type: Object,
            required: true,
        },
        packageInfo: {
            type: Object,
            default: () => {},
        },
        //是不是我的资料列表
        myCard: {
            type: Boolean,
            default: false,
        },
        location: {
            type: String,
            default: '【资料列表页-下载资料按钮】',
        },
    },
    data() {
        return {
            pageType: 'list',
            pageData: this.file,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        detailUrl() {
            if (!this.file || !this.file.docAvlstatus || this.file.docAvlstatus === 'N') {
                return;
            }
            const pickId = this.packageInfo ? this.packageInfo.docCode : '';
            if (this.file.docPackstatus === 'Y') {
                //资料包
                return `/ziliao/detail/pack-${this.file.docCode}`;
            } else if (pickId) {
                //从属资料包-资料详情
                return `/ziliao/detail/pack-${pickId}/doc-${this.file.docCode}`;
            }
            return `/ziliao/detail/doc-${this.file.docCode}`;
        },
    },
    watch: {
        file: {
            immediate: true,
            deep: true,
            handler() {
                if (this.$platform.isClient()) {
                    this.initDown();
                }
            },
        },
    },
    methods: {
        handlerClick(item) {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: item.docName,
                project_id: item.projectId,
                subject_id: item.subjectId.join(','),
                course_type: item.docPackstatus === 'Y' ? '资料包' : '资料',
                page_type: '资源列表页',
                page_name: document.title,
                sort_name: item.catalogId.join(','),
                channel_name: '-',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.card-file-wrapper {
    display: block;
}
.card-file-box {
    position: relative;
    box-sizing: border-box;
    padding: 0 35px 0 45px;
    background-color: #fff;
    cursor: pointer;
    &.lapse {
        background: #f6f7f9;
        cursor: auto;
        .card-file {
            background: #f6f7f9;
        }
    }
    &:not(.lapse):hover {
        .name {
            color: #ff2e30;
        }
    }
}
.card-file {
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}
.card-left {
    display: flex;
    align-items: center;
    img {
        flex-shrink: 0;
        width: 85px;
        height: 100px;
        margin-right: 22px;
    }
}
.card-left-txt {
    box-sizing: border-box;
    padding: 10px 0;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
        max-width: 378px;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        height: 48px;
        text-align: left;
        color: #3a3d4b;
        letter-spacing: 0.71px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .num {
        font-size: 14px;
        color: #99a1af;
        line-height: 20px;
    }
}
.card-right {
    position: absolute;
    right: 35px;
    top: 47px;
    display: flex;
    align-items: center;
    .price {
        font-size: 16px;
        color: #ff2e30;
        margin-right: 12px;
        font-weight: 700;
    }
    .cuxiao {
        font-size: 12px;
        margin-right: 6px;
        font-weight: 700;
    }
    .money {
        padding: 0;
        margin: 0;
        font-weight: 700;
        &::before {
            content: '¥';
            font-size: 12px;
        }
    }
    .down {
        width: 96px;
        height: 39px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        line-height: 39px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #3a3d4b;
        &:hover {
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            color: #fff;
            border-color: #ff737a;
        }
    }
}
.lapse-img {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    & > img {
        width: 63px;
        height: 58px;
    }
}
</style>
