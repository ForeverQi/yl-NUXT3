<template>
    <div class="exam-type-list">
        <template v-for="(item, index) in examTypeList">
            <div
                v-if="item.showStatus !== 'H'"
                :key="index"
                class="exam-type-item"
                :class="{ active: papertypeCode === item.code }"
                @click="clickExamType(item.code)"
            >
                <img v-if="item.vip" class="vip-img" src="../../../assets/img/vip.png" alt="" />
                <span class="exam-type-name">{{ item.name }}</span>
                <div class="border" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        papertypeCode: {
            type: String,
            default: '',
        },
        settingList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            classUniquecode: '',
            showDQZL: false, // 是否展示地区专练
            // 类型枚举(S:显示，H:隐藏)
            examTypeList: [
                {
                    name: '章节刷题',
                    vip: true,
                    code: 'ZJLX',
                    showStatus: 'S',
                },
                {
                    name: '历年真题',
                    code: 'LNZT',
                    showStatus: 'S',
                },
                {
                    name: '模拟试卷',
                    code: 'MNST',
                    showStatus: 'S',
                },
                {
                    name: '智能练习',
                    vip: true,
                    code: 'ZNLX',
                    showStatus: 'S',
                },
                {
                    name: '地区专练',
                    vip: true,
                    code: 'DQZL',
                    showStatus: 'H',
                },
                {
                    name: '模拟考试',
                    code: 'MKDS',
                    showStatus: 'H',
                },
                {
                    name: '专项刷题',
                    code: 'ZXTK',
                    showStatus: 'H',
                },
            ],
        };
    },
    watch: {
        settingList(newV) {
            this.examTypeList.forEach((item) => {
                const itm = newV.find(({ code }) => code === item.code);
                if (itm) {
                    item.showStatus = itm.showStatus;
                }
            });

            const itm = this.examTypeList.find(({ showStatus, code }) => code === this.papertypeCode && showStatus !== 'H');
            if (!itm) {
                const itm = this.examTypeList.find(({ showStatus }) => showStatus !== 'H');
                if (itm) {
                    this.clickExamType(itm.code);
                }
            }
        },
    },
    mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
    },
    methods: {
        // 选择类型事件
        clickExamType(papertypeCode) {
            if (papertypeCode === this.papertypeCode) {
                return;
            }
            var subjectId = this.$route.params.subjectId;
            var ptagId = this.$route.params.ptagId;
            this.$router.replace(`/exam/index/list/${this.classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`);
        },
    },
};
</script>

<style lang="less" scoped>
.exam-type-list {
    margin-top: 4px;
    // margin-bottom: 20px;
    padding-bottom: 26px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;
    border-radius: 8px;
}
.exam-type-item {
    position: relative;
    margin-right: 48px;
    cursor: pointer;
    white-space: nowrap;
    .exam-type-name {
        font-size: 16px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 21px;
    }
    .vip-img {
        position: absolute;
        top: -8px;
        right: -16px;
        width: 24px;
        height: 14px;
    }
    .border {
        display: none;
        position: absolute;
        left: 35%;
        bottom: -10px;
        width: 20px;
        height: 4px;
        background: #ff2e30;
        border-radius: 2px;
    }
    &.active {
        .exam-type-name {
            color: #ff2e30;
        }
        .border {
            display: block;
        }
    }
}
</style>
