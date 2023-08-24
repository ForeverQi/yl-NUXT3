<template>
    <div class="advertisement-content" v-if="adSectionList.length">
        <div class="advertisement-item" v-for="(item, index) in adSectionList" :key="index" @click="handleAdItemClick(item)">
            <a :href="item.eventPath" target="_blank" v-if="item.eventPath">
                <image-view type="banner" class="img" :placeholder-width="'60%'" :src="item.imgUrl"></image-view>
            </a>
            <image-view v-else class="img" type="banner" :placeholder-width="'60%'" :src="item.imgUrl"></image-view>
        </div>
        <div class="error-advertisement-box" v-for="(item, index) in errorAdLength" :key="6 + index">
            <div class="error-advertisement-item">
                <image-view type="banner" class="img" :placeholder-width="'60%'"></image-view>
            </div>
        </div>
    </div>
</template>
<script>
import AdSection from '@/www/components/components/ad-section/index.vue';
import '@/api/channel/api..query-config-model-info.js';
export default {
    components: {
        AdSection,
    },
    props: {
        columnId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            adSectionList: [],
        };
    },
    fetch() {
        return this.queryAdList();
    },
    computed: {
        errorAdLength() {
            return 5 - this.adSectionList.length >= 0 ? 5 - this.adSectionList.length : 0;
        },
    },
    methods: {
        handleAdItemClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.advertName,
                jump_type: item.eventPath ? 'URL链接' : '无跳转',
                ad_url: item.eventPath,
                ad_position_name: `活动位管理`,
                page_name: document.title,
            });
        },
        queryAdList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: 'HDW',
                    // 启用状态筛选
                    enableStatus: 'Y',
                    // 教师姓名模糊搜索
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: 5,
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    this.adSectionList = res.content;
                })
                .catch(() => {
                    this.isError = true;
                });
        },

        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            this.$emit('click-yi-guan', {
                module_type: '活动位',
                ad_number: item.sort,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.advertisement-content {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 32px 0px 0px;
    .advertisement-item {
        border-radius: 8px;
        cursor: pointer;
        width: 224px;
        height: 120px;
        overflow: hidden;
        img {
            width: 224px;
            height: 120px;
            border-radius: 8px;
        }
    }
    .advertisement-item:hover {
        width: 224px;
        height: 120px;
        overflow: hidden;
        .img {
            position: absolute;
            margin-left: -36px;
            margin-top: -20px;
            width: 299px;
            height: 160px;
            border-radius: 8px;
            z-index: 11;
        }
    }
    .error-advertisement-item {
        border-radius: 8px;
        cursor: pointer;
        width: 224px;
        height: 120px;
        background-color: #ededee;
        overflow: hidden;
        .img {
            width: 224px;
            height: 120px;
            border-radius: 8px;
        }
    }
    .error-advertisement-box {
        border-radius: 8px;
        cursor: pointer;
        width: 224px;
        height: 120px;
        background-color: #ededee;
        overflow: hidden;
    }
}
</style>
