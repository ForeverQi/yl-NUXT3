<template>
    <div class="project-list">
        <div class="section" :class="{ 'show-less': !openMore }" ref="projectList">
            <div class="item" v-for="(item, index) in listNav" :key="item.navId" :class="{ this: selectIndex === index }" @click="switchItem(index)">
                {{ item.navName }}
            </div>
            <div class="more" v-if="showMore" @click="handleClickMoreBtn">
                <div>{{ openMore ? '收起' : '展开' }}</div>
                <img src="./assets/images/showMore.png" alt="" class="img" v-if="openMore" />
                <img src="./assets/images/hideMore.png" alt="" class="img" v-else />
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/api.mcu02.home-nav.js'; // 直播列表
export default {
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selectIndex: -1,
            listNav: [],

            showMore: false,
            openMore: true,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getNavList();
        },
        handleClickMoreBtn() {
            this.openMore = !this.openMore;
        },
        getNavList() {
            // 获取菜单列表
            let data = {
                url: 'home/home-nav',
                params: {},
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.listNav = res.data;
                if (!this.projectId) {
                    this.switchItem(0);
                } else {
                    res.data.forEach((r, index) => {
                        if (r.projectId === this.projectId && r.navType === 'P') {
                            this.selectIndex = index;
                        }
                    });
                    if (this.selectIndex < 0) {
                        this.switchItem(0);
                    } else {
                        this.switchItem(this.selectIndex);
                    }
                }
                this.$nextTick(() => {
                    let iH = this.$refs.projectList && this.$refs.projectList.offsetHeight;
                    if (iH > 108) {
                        this.showMore = true;
                        this.openMore = false;
                    }
                });
                return res;
            });
        },
        switchItem(index) {
            let item = this.listNav[index];
            if (item.navType === 'L') {
                // 链接的情况不会被选中
                this.$PageUtil.openNewPage(item.linkUrl);
                return;
            }
            this.selectIndex = index;
            this.$emit('initLevel', this.listNav[index]);
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
    },
};
</script>
<style lang="less" scoped>
.more {
    position: absolute;
    top: 15px;
    right: 0;
    font-size: 14px;
    color: #828496;
    cursor: pointer;
    display: flex;
    align-items: center;

    .img {
        margin-left: 4px;
        width: 14px;
        height: 14px;
    }
}
.project-list {
    padding: 14px 0;
    margin-bottom: 20px;
    background-color: #fff;

    .section {
        padding-right: 40px;
        position: relative;
        width: 1200px;
        margin: 0 auto;

        &.show-less {
            height: 108px;
            overflow: hidden;
        }
    }

    .item {
        display: inline-block;
        margin: 8px 0;
        color: #53586c;
        font-weight: 400;
        font-size: 15px;
        height: 38px;
        line-height: 38px;
        background: #f6f7f9;
        border-radius: 21px;
        padding: 0 30px;
        margin-right: 20px;
        cursor: pointer;

        &.this {
            color: #025eff;
            font-weight: 400;
            font-weight: bold;
            background-color: rgba(126, 149, 255, 0.16);
        }
    }
}
</style>
