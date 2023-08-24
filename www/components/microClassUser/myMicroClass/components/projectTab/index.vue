<template>
    <div>
        <div class="flex peoject-tabs" ref="typeItemBox" :style="openMore ? heightStringAll : heightString72">
            <div class="flex wrap">
                <div
                    :class="['project-btn', currentProject.projectId == item.projectId ? 'active' : '']"
                    v-for="item in projectList"
                    :key="item.projectId"
                    @click="handleChangeProject(item)"
                >
                    {{ item.projectName }}
                </div>
            </div>
            <div class="flex moreBtn ai-end jc-center" v-if="showMoreBtn" @click="handleClickMoreBtn">
                <div>{{ openMore ? '收起' : '展开' }}</div>
                <img src="./asset/images/showMore.png" alt="" v-if="openMore" />
                <img src="./asset/images/hideMore.png" alt="" v-else />
            </div>
        </div>
        <div class="line" v-if="projectList.length > 0"></div>
    </div>
</template>
<script>
import { mcpProjectList } from '../../apis/index.js';

export default {
    name: 'projectModel',
    components: {},
    props: {
        projectType: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showMoreBtn: false,
            openMore: false,
            heightString72: 'max-height: 72px;',
            heightStringAll: 'max-height: 72px;',
            projectList: [],
            currentProject: {},
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getProjectList();
    },
    methods: {
        init() {
            this.$nextTick(() => {
                let height = this.$refs.typeItemBox.scrollHeight;
                this.heightStringAll = 'max-height: ' + height + 'px;';
                if (height > 72) {
                    this.showMoreBtn = true;
                    this.openMore = false;
                }
            });
        },
        handleClickMoreBtn() {
            this.openMore = !this.openMore;
        },
        handleChangeProject(val) {
            this.currentProject = val;
            this.$emit('changeProject', val);
        },
        getProjectList() {
            return mcpProjectList(this, {
                projectType: this.projectType,
            })
                .then((res) => {
                    this.projectList = res;
                    this.init();
                    this.handleChangeProject(this.projectList.length === 0 ? undefined : this.projectList[0]);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>
<style lang="less" scoped>
.peoject-tabs {
    padding: 0 18px;
    overflow: hidden;
    .project-btn {
        height: 30px;
        line-height: 30px;
        padding: 0 6px;
        margin-bottom: 6px;
        margin-right: 14px;
        font-size: 14px;
        color: #3a3d4b;
        cursor: pointer;
        position: relative;
    }
    .active {
        color: #025eff;
        font-weight: bold;
    }
    .active::after {
        content: '';
        width: 22px;
        height: 4px;
        /*box-sizing: border-box;
        border: 2px solid #025eff;*/
        background-color: #025eff;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
    }
    .moreBtn {
        font-size: 12px;
        color: #828496;
        white-space: nowrap;
        margin-bottom: 7px;
        cursor: pointer;
        img {
            display: block;
            width: 12px;
            height: 12px;
        }
    }
}
.line {
    width: 100%;
    height: 13px;
    box-shadow: 0px -0.5px 0px 0px rgba(0, 0, 0, 0.1);
    margin-top: 7px;
}
</style>
