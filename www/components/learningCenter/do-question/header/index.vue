<template>
    <div class="header-wrap">
        <div class="do-question-header" :class="{ fixed: isFixed }">
            <div class="flex-box">
                <span class="name" v-if="doType !== 'SJ'">{{ paperName }}</span>
                <div class="title" v-else>
                    <template v-if="questionBankStatus === 'special' || solvingMode">
                        <p class="name specialName">{{ paperName }}</p>
                    </template>
                    <template v-else>
                        <p class="name">{{ paperName }}</p>
                        <p class="sub-title">为了达到更好的学习效率，建议您做完题之后统一提交查看解析</p>
                    </template>
                </div>
                <div class="header-right">
                    <p>
                        第
                        <span class="current-num">{{ current }}</span>
                        题，共{{ total }}题
                    </p>
                    <div class="back-btn" @click="goToList">
                        <img class="arrow-left" src="./asset/images/arrow-left.png" />
                        {{ btnName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    props: {
        doType: {
            type: String,
            default: '',
        },
        //当前第几题
        current: {
            type: Number,
            default: 1,
        },
        //共几题
        total: {
            type: Number,
            default: 0,
        },
        //标题
        paperName: {
            type: String,
            default: '',
        },
        //按钮名称
        btnName: {
            type: String,
            default: '',
        },
        needFixed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFixed: false, // 是否需要置顶
            offsetTop: 166,
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            return this.$route.query.solvingMode;
        },
    },
    mounted() {
        if (this.needFixed) {
            window.addEventListener('scroll', this.handleScroll);
        }
    },
    destroyed() {
        if (this.needFixed) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    },
    methods: {
        goToList() {
            if (this.questionBankStatus === 'special') {
                this.$emit('handleSave', 'submit', 'internal');
            } else {
                this.$emit('back');
            }
        },
        handleScroll() {
            var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.isFixed = s > this.offsetTop;
        },
        submit(type) {
            this.$emit('handleSave', type);
        },
    },
};
</script>
<style lang="less" scoped>
.header-wrap {
    width: 100%;
    height: 95px;

    .do-question-header {
        position: relative;
        width: 100%;
        height: 95px;
        background: #ffffff;
        border-radius: 6px;
        z-index: 1;

        &.fixed {
            position: fixed;
            top: 0;
            left: 0;
            height: 80px;
            z-index: 101;
            box-shadow: 0px 4px 10px 0px rgb(68 68 68 / 5%);

            .flex-box {
                height: 80px;
            }
        }

        .flex-box {
            width: 1200px;
            height: 95px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
    }
}

.flex-box {
    .title {
        text-align: center;
        flex: auto;
        overflow: hidden;
        padding: 0 350px 0 100px;
    }
    .name {
        font-weight: 700;
        color: #3a3d4b;
    }
    .specialName {
        font-size: 20px;
        // max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sub-title {
        font-size: 12px;
        font-weight: 400;
        color: #8d90aa;
        line-height: 18px;
        margin-top: 12px;
    }
    .header-right {
        position: absolute;
        // width: 330px;
        height: 54px;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 6px;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .back-btn {
        margin-left: 64px;
        // width: 124px;
        padding: 0 20px;
        height: 36px;
        background: #f4f5f9;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            color: #ff2e30;
        }
        .arrow-left {
            width: 12px;
            height: 12px;
            margin-right: 6px;
        }
    }
    .current-num {
        color: #ff2e30;
    }
}
</style>
