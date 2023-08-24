<template>
    <div class="steps-wrap">
        <ul class="steps">
            <li
                :class="['step', { active: currentIndex - 1 >= index }]"
                v-for="(item, index) in stepsData"
                :key="index"
                :style="{ width: 100 / stepsData.length + '%' }"
            >
                <div class="step-head">
                    <div class="step-line">
                        <p class="left-line line"></p>
                        <div class="fillet">
                            <p><span></span></p>
                            <p><span></span></p>
                            <p><span></span></p>
                        </div>
                        <p class="right-line line"></p>
                    </div>
                    <div :class="['step-num', { active: currentIndex - 1 === index }]">{{ index + 1 }}</div>
                </div>
                <div class="step-main">
                    <p>{{ item.title }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        stepsData: {
            type: Array,
            default: () => [],
        },
        // 该字段表示步骤条高亮哪一步， 第一步为1，第二步为2... 如果全部完成则需要传大于步骤条步数的数字，比如步骤条为3步，则需要传4
        currentIndex: {
            type: Number,
            default: NaN,
        },
    },
};
</script>

<style lang="less" scoped>
.steps-wrap {
    width: 100%;
    overflow: hidden;
    .steps {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .step {
            float: left;
            text-align: center;
            &:first-of-type {
                .step-line {
                    display: none;
                }
            }
            &.active {
                .step-head {
                    .step-line {
                        height: 3px;
                        position: absolute;
                        top: 11px;
                        left: -50%;
                        right: 50%;
                        background-color: transparent;
                        overflow: hidden;
                        .line {
                            display: block;
                            width: 45%;
                            height: 3px;
                            background: linear-gradient(90deg, #ff957a 0%, #ff2e30);
                            border-radius: 4px;
                        }
                        .left-line {
                            float: left;
                        }
                        .right-line {
                            float: right;
                        }
                        .fillet {
                            display: block;
                            width: 10%;
                            height: 3px;
                            overflow: hidden;
                            float: left;
                            p {
                                width: 33.33%;
                                height: 3px;
                                float: left;
                                span {
                                    width: 3px;
                                    height: 3px;
                                    background: linear-gradient(90deg, #ff957a 0%, #ff2e30);
                                    display: block;
                                    border-radius: 50%;
                                    margin: 0 auto;
                                }
                                &:first-of-type {
                                    span {
                                        margin: 0 3px;
                                    }
                                }
                                &:last-of-type {
                                    span {
                                        margin: 0 1px;
                                    }
                                }
                            }
                        }
                    }
                    .step-num {
                        border: none;
                        color: #fff;
                        background: linear-gradient(90deg, #ff957a 0%, #ff2e30);
                        &.active {
                            border: 1px solid #ff2e2e;
                            color: #ff2e2e;
                            background: #fff;
                        }
                    }
                }
                .step-main {
                    color: #ff2e2e;
                }
            }
            .step-head {
                position: relative;
                .step-line {
                    height: 3px;
                    position: absolute;
                    top: 11px;
                    left: -50%;
                    right: 50%;
                    background-color: #e5e5e5;
                    .left-line {
                        display: none;
                    }
                    .right-line {
                        display: none;
                    }
                    .fillet {
                        display: none;
                    }
                }
                .step-num {
                    position: relative;
                    z-index: 1;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    // background: linear-gradient(90deg, #ff957a 0%, #ff2e30);
                    border: 1px solid #ccc;
                    display: inline-block;
                    font-size: 14px;
                    line-height: 24px;
                    color: #333;
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
            .step-main {
                margin-top: 10px;
                color: #666;
                font-size: 14px;
            }
        }
        // .step(@counter) when (@counter<=3) {
        //     .step(@counter+1);
        //     .step:nth-of-type(@{counter}) {
        //         .step-head {
        //             .step-num {
        //                 background: linear-gradient(90deg, #ff957a 0%, #ff2e30);
        //                 color: #fff;
        //                 border: none;
        //             }
        //         }
        //     }
        // }
        // .step(0);
    }
}
</style>
