<template>
    <div class="header-wrap">
        <div class="report-header" :class="{ fixed: isFixed }">
            <div class="flex-box">
                <div class="decorate-line" />
                <div class="title text-overflow-2">{{ title }}</div>
                <div class="button-box">
                    <div class="button" v-if="showAgainBtn" @click="doExamAgain">再做一次</div>
                    <div class="button back-btn" @click="goBack">
                        <img class="back" src="./asset/images/back-icon.png" />
                        <span>{{ btnName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'report-header',
    props: {
        title: {
            type: String,
            default: '',
        }, // 标题
        showAgainBtn: {
            type: Boolean,
            default: true,
        }, // 是否展示再做一次按钮
        btnName: {
            type: String,
            default: '返回课程列表',
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
        doExamAgain() {
            this.$emit('doAgain');
        },
        goBack() {
            this.$emit('goBack');
        },
        handleScroll() {
            var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.isFixed = s > this.offsetTop;
        },
    },
};
</script>

<style lang="less" scoped>
.header-wrap {
    width: 100%;
    height: 62px;

    .report-header {
        position: relative;
        width: 100%;
        height: 62px;
        background: #ffffff;
        border-radius: 4px;
        z-index: 1;

        &.fixed {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 101;
            box-shadow: 0px 4px 10px 0px rgb(68 68 68 / 5%);
        }

        .flex-box {
            width: 1200px;
            height: 62px;
            margin: 0 auto;
            display: flex;
            align-items: center;
        }
    }
}

.flex-box {
    .decorate-line {
        width: 3px;
        height: 20px;
        background: #f8323c;
        border-radius: 2px;
        margin: 0 25px 0 12px;
    }

    .title {
        flex: 1;
        font-size: 20px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 24px;
    }

    .button-box {
        display: flex;
        margin: 0 30px;

        .button {
            width: 124px;
            height: 36px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 36px;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            border-radius: 18px;
            cursor: pointer;

            &.back-btn {
                width: 124px;
                height: 36px;
                color: #333333;
                font-size: 14px;
                background: #f4f5f9;
                border-radius: 18px;
                margin-left: 32px;

                &:hover {
                    color: #f8323c;
                }

                .back {
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
}
</style>
