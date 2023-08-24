<template>
    <div>
        <div class="class-top-box">
            <img src="./asset/images/left.png" alt="" class="left-img" />
            <img src="./asset/images/right.png" alt="" class="right-img" />
            <div class="class-top-content">
                <!-- 面包屑 -->
                <bread-crumb :list="navList" @click="topage"></bread-crumb>

                <div class="tab-box">
                    <div
                        v-for="(item, index) in tabList"
                        @click="handleChangeTab(item)"
                        :key="index"
                        :class="['tab-item', item.optId === opt.optId ? 'active' : '']"
                    >
                        {{ item.optName }}
                    </div>
                </div>
                <!-- 视频 菜单 -->
                <video-class-box v-if="opt"></video-class-box>
            </div>
        </div>
    </div>
</template>
<script>
import breadCrumb from '../../../components/breadCrumb/breadCrumb/index.vue';
import { operatecategoryUserList } from '../../../lightClass/apis/index.js';
import videoClassBox from './components/videoClassBox/index.vue';
export default {
    name: 'lightClassTopModel',
    components: {
        breadCrumb,
        videoClassBox,
    },
    provide() {
        return {
            copyOpt: () => this.opt, //方法一：提供祖先组件的实例
        };
    },
    data() {
        return {
            navList: [
                { name: '微课首页', url: '/' },
                { name: '轻学小知识', url: '' },
            ],
            tabList: [],
            opt: null,
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getOperatecategUserList();
    },
    methods: {
        handleChangeTab(value) {
            this.opt = value;
            this.trackQxkColumn();
        },
        trackQxkColumn(track = {}) {
            this.$yiguan.mcuTrack('wk_qxk_column', {
                web_belong_column: this.opt.optName,
                ...track,
            });
        },
        getOperatecategUserList() {
            operatecategoryUserList(this, {
                optType: 'E',
                projectId: this.$route.query.projectId,
                showClient: 'W',
            })
                .then((res) => {
                    if (!Array.isArray(res.data)) {
                        this.$baseUI
                            .alert('该项目下无运营分类', '提示', { confirmText: '返回【微课首页】' })
                            .then(() => {
                                this.$router.push(`/agile-course/${this.$route.query.projectId}`);
                            })
                            .catch(() => {
                                this.$router.push(`/agile-course/${this.$route.query.projectId}`);
                                /*this.$PageUtil.reflush();*/
                            });
                        /*return;*/
                    }
                    res.data.forEach((item) => {
                        if (item.optId === this.$route.query.optId) {
                            this.opt = item;
                        }
                    });
                    if (!this.opt) {
                        this.opt = res.data[0];
                    }
                    this.tabList = res.data;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        topage(item) {
            this.navList.indexOf(item) === 0 && this.$router.push('/agile-course');
        },
    },
};
</script>
<style lang="less" scoped>
.class-top-box {
    height: 768px;
    background-color: #0f0f1e;
    position: relative;
    .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 413px;
        height: 292px;
        z-index: 2;
    }
    .right-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 459px;
        height: 354px;
        z-index: 2;
    }
    .class-top-content {
        width: 1200px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 3;
    }
    .tab-box {
        display: flex;
        flex-wrap: wrap;
        .tab-item {
            height: 36px;
            line-height: 36px;
            padding: 0 26px;
            border-radius: 18px;
            color: #eee;
            margin-bottom: 16px;
            cursor: pointer;
            margin-right: 24px;
        }
        .active {
            background-color: #025eff;
            color: #fff;
        }
    }
}
</style>
