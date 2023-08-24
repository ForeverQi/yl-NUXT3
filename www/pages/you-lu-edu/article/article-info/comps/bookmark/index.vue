<template>
    <div class="bread-crumb">
        <span v-for="(item, index) in breadCrumbList" :key="index">
            <a
                :href="
                    item.type === 'column' ? `/article-list/${$route.params.channelCode}/${projectCode}/${columnId}` : `/channel/${$route.params.channelCode}`
                "
                v-if="index !== breadCrumbList.length - 1"
            >
                <span>
                    <span class="bread-name">{{ item.name }}</span>
                    <img src="../../asset/images/right-icon.png" class="right-icon" alt="" />
                </span>
            </a>
            <span v-if="index === breadCrumbList.length - 1" class="last-bread-name">{{ item.name }}</span>
        </span>
    </div>
</template>
<script>
import '@/api/cp/api..query-column-by-project-id.js';
/**
 * 页面标签组件
 */
export default {
    name: 'UlAdminLayoutBookmark',
    props: {
        columnName: {
            type: String,
            default: '',
        },
        columnId: {
            type: String,
            default: '',
        },
        projectCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            breadCrumbList: [],
            projectChannelName: '',
        };
    },
    fetch() {
        return this.queryProjectChannelInfo();
    },
    watch: {
        columnName(val, old) {
            if (val !== old) {
                this.createBookMark();
            }
        },
    },
    methods: {
        // 查询项目频道页信息
        queryProjectChannelInfo() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-info-by-seoCode', {
                    // 频道编码
                    columnSeoNo: this.$route.params.channelCode,
                    onsuccess: (data) => {
                        if (data) {
                            this.projectChannelName = data.columnTitle || data.columnName;
                            this.createBookMark();
                        }
                        resolve();
                    },
                    onerror: () => {
                        this.isLoading = false;
                        this.isError = true;
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
        createBookMark() {
            if (this.columnName) {
                this.breadCrumbList = [{ name: this.columnName, type: 'column' }, { name: '正文' }];
            } else {
                this.breadCrumbList = [{ name: '正文' }];
            }
            if (this.projectChannelName) {
                this.breadCrumbList.unshift({ name: this.projectChannelName, type: 'channel' });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.bread-crumb {
    width: 1200px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .bread-name {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #99a1af;
        line-height: 19px;
        cursor: pointer;
    }
    .right-icon {
        width: 6px;
        height: 11px;
        margin-right: 10px;
    }
    .last-bread-name {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #53586c;
        line-height: 19px;
    }
}
</style>
