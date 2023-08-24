<!--
 * @Author       : zhouqi
 * @description  : 刷题统计
 * @Date         : 2023-07-06 14:49:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-12 10:26:21
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\components\brush-question-statistics.vue
-->
<template>
    <div class="brush-question-statistics">
        <div class="statistics-box" v-if="brushObject">
            <div class="statistics-title">
                <span>刷题统计</span>
                <span>正确率仅统计客观题</span>
            </div>
            <div class="statistics-content">
                <div class="statistics-content_child">
                    <div class="statistics-num">
                        <span class="statistics-num_val">{{ brushObject.total }}</span>
                        <span class="statistics-num_text">试题总数</span>
                    </div>
                    <div class="statistics-num statistics-bottom">
                        <div class="statistics-accuracy_canvas">
                            <ProjectBarHalf :options="options" />
                            <div class="statistics-accuracy">
                                <div class="statistics-accuracy_num">
                                    {{ brushObject.rightRate }}
                                    <span>%</span>
                                </div>
                            </div>
                        </div>
                        <span class="statistics-num_text">正确率</span>
                    </div>
                </div>
                <div class="statistics-content_child">
                    <div class="statistics-num">
                        <span class="statistics-num_val">{{ brushObject.answerTotal }}</span>
                        <span class="statistics-num_text">已做题数</span>
                    </div>
                    <div class="statistics-num">
                        <span class="statistics-num_val successClass">{{ brushObject.rightTotal }}</span>
                        <span class="statistics-num_text">正确题数</span>
                    </div>
                </div>
                <div class="statistics-content_child">
                    <div class="statistics-num">
                        <span class="statistics-num_val">{{ brushObject.collectTotal }}</span>
                        <span class="statistics-num_text">收藏题数</span>
                    </div>
                    <div class="statistics-num">
                        <span class="statistics-num_val failClass">{{ brushObject.errorTotal }}</span>
                        <span class="statistics-num_text">错误题数</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectBarHalf from './progress-bar-half.vue';

export default {
    components: {
        ProjectBarHalf,
    },
    props: {
        brushData: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            brushObject: null,
            // 圆环参数
            options: {
                width: 90, // canvas 宽度
                height: 90, // canvas 高度度
                lineWidth: 9, //外环弧线宽度
                lineWidth2: 9, //内环弧线宽度
                percent: 0.2, //占比
                radius: 36, //圆角
                shadowBlur: 0, // 阴影-模糊度
                shadowColor: 'rgba(231,57,40,0.30)', // 阴影-颜色
            },
        };
    },
    watch: {
        brushData: {
            /**
             *
             * @param {object} newValue 新值
             */
            handler(newValue) {
                if (newValue) {
                    this.brushObject = newValue;
                    // 正确率(小数)
                    let rightRate = this.brushObject.rightRate / 100;
                    rightRate = rightRate < 1 ? rightRate : 1;
                    this.options.percent = rightRate;
                }
            },
            deep: true,
            immediate: true,
        },
    },
    /**
     * mounted 生命周期
     */
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.brush-question-statistics {
    width: 324px;
    padding: 24px 0 34px;
    min-height: 274px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8px;
    .statistics-title {
        padding: 0 24px;
        span {
            &:first-child {
                color: #3a3d4b;
                font-weight: 700;
                font-size: 16px;
            }
            &:last-child {
                color: #99a1af;
                font-size: 14px;
            }
        }
        margin-bottom: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .statistics-content {
        display: flex;
        padding: 0 18px;
        .statistics-content_child {
            flex: 1;
        }
        .statistics-num {
            display: flex;
            flex-direction: column;
            align-items: center;
            &:first-child {
                margin-bottom: 38px;
            }
            .statistics-num_val {
                color: #3a3d4b;
                font-weight: 700;
                font-size: 24px;
                margin-bottom: 6px;
                max-width: 88px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .statistics-num_text {
                color: #99a1af;
                font-size: 12px;
            }
        }
        .statistics-bottom {
            transform: translateY(-20px);
            position: relative;
        }
    }
    .successClass {
        color: #2374ff !important;
    }
    .failClass {
        color: #ff2e30 !important;
    }
    .statistics-accuracy_canvas {
        width: 86px;
        height: 56px;
        overflow: hidden;
    }
    .statistics-accuracy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .statistics-accuracy_num {
            color: #f8323c;
            font-size: 20px;
            font-weight: 700;
            display: flex;
            align-items: flex-end;
            transform: translateX(2px);
            span {
                font-size: 12px;
                font-weight: 600;
                margin-left: 1px;
                transform: translateY(-3px);
            }
        }
    }
}
</style>
