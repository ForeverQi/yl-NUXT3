<template>
    <div class="list-wrap">
        <div v-loading="loading">
            <ul class="title">
                <li class="tit-chapter">章节</li>
                <li class="tit-rate">正确率</li>
                <li class="tit-progress">掌握程度</li>
            </ul>
            <template v-if="!loading">
                <ul class="list-content" v-if="sectionTree.length">
                    <li
                        class="chapter"
                        v-for="(item, index) in sectionTree"
                        :key="item.sectionId"
                        :style="{ height: item.isFold && item.children.length ? 44 * item.children.length + 65 + 9 + 'px' : '65px' }"
                    >
                        <div class="father-box" @click.stop="toggleFold(index)">
                            <img
                                class="fold-icon"
                                src="./asset/images/unfold.png"
                                :class="item.isFold ? '' : 'fold-icon-up'"
                                :style="{ opacity: item.children.length ? '1' : '0' }"
                            />
                            <div class="name text-overflow-2">{{ item.sectionName }}</div>
                            <div class="chapter-detail">
                                <div>共&nbsp;{{ item.questionTotal }}&nbsp;道</div>
                                <i class="line" />
                                <div>
                                    答对&nbsp;
                                    <span class="red">{{ item.answerRightTotal }}</span>
                                    &nbsp;道
                                </div>
                                <i class="line" />
                                <div>
                                    正确率&nbsp;
                                    <span class="red">{{ Math.round(item.answerRightRate) }}%</span>
                                </div>
                            </div>
                            <div class="progress">
                                <span class="mastery-degree">
                                    <span class="true-mastery-degree" :style="{ width: (item.answerRightRate / 100) * 90 + 'px' }"></span>
                                </span>
                                {{ Math.round(item.answerRightRate) }}%
                            </div>
                        </div>
                        <div class="children-box" v-if="item.children.length">
                            <div class="point-line">
                                <point-line :size="item.children.length" />
                            </div>
                            <ul class="chapter-children">
                                <li v-for="item2 in item.children" :key="item2.sectionId">
                                    <div class="name text-overflow-2">{{ item2.sectionName }}</div>
                                    <div class="chapter-detail">
                                        <div>共&nbsp;{{ item2.questionTotal }}&nbsp;道</div>
                                        <i class="line" />
                                        <div>
                                            答对&nbsp;
                                            <span>{{ item2.answerRightTotal }}</span>
                                            &nbsp;道
                                        </div>
                                        <i class="line" />
                                        <div>
                                            正确率&nbsp;
                                            <span>{{ Math.round(item2.answerRightRate) }}%</span>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <span class="mastery-degree">
                                            <span class="true-mastery-degree" :style="{ width: (item2.answerRightRate / 100) * 90 + 'px' }"></span>
                                        </span>
                                        {{ Math.round(item2.answerRightRate) }}%
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div class="list-content no-data" v-else>暂无数据</div>
            </template>
        </div>
        <!-- 反馈相关 -->
        <report-bottom :project-id="projectId" />
        <div class="bottom-btn" @click="toPredominate">查看考点掌握情况</div>
    </div>
</template>

<script>
import '@/api/qb/api..answer-sheet-section.js'; // 评测报告-答卷章节统计
import ReportBottom from '@/www/components/learningCenter/evaluation-report/report-bottom/index.vue'; // 底部点赞、反馈组件
import PointLine from '@/www/components/learningCenter/evaluation-report/point-line/index.vue'; // 点线小组件

export default {
    name: 'report-list',
    components: {
        ReportBottom,
        PointLine,
    },
    props: {
        answersheetId: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
        projectName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            sectionTree: [], // 章节树
            loading: true, // 加载中
        };
    },
    mounted() {
        this.answersheetId && this.queryAnswersheetSection();
    },
    methods: {
        // 查询章节树
        queryAnswersheetSection() {
            this.$callApi('qb/answer-sheet-section', {
                answersheetId: this.answersheetId,

                onsuccess: (res) => {
                    // 如第一项有children则自动展开
                    this.sectionTree = res.sectionTree.map((item, index) => {
                        if (index === 0 && item.children.length) {
                            item.isFold = true;
                        } else {
                            item.isFold = false;
                        }
                        return item;
                    });
                },

                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        // 切换章节展开效果
        toggleFold(index) {
            this.sectionTree[index].isFold = !this.sectionTree[index].isFold;
        },
        // 跳转学习报告（点击“查看考点掌握情况”按钮）
        toPredominate() {
            this.$yiguan.learningCenter('web_learning_center_learning_report', {
                page_name: '学习中心试卷查看解析页面',
                project_name: this.projectName,
                college_name: '',
            });
            this.$PageUtil.openNewPage(
                `/learningCenter/classLearningReport/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId ? this.$route.query.ctapId : ''}`
            );
        },
    },
};
</script>

<style lang="less" scoped>
.list-wrap {
    margin-top: 16px;
    width: 820px;

    .title {
        display: flex;
        width: 100%;
        height: 52px;
        background: #f3f4f9;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 52px;

        .tit-chapter {
            width: 364px;
            text-indent: 40px;
        }

        .tit-rate {
            flex: 1;
        }

        .tit-progress {
            width: 169px;
        }
    }

    .list-content {
        background: rgb(251, 251, 252);
        cursor: default;

        &.no-data {
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        > .chapter {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 21px;
            height: 64px;
            border-bottom: 1px solid #eaecf2;
            overflow: hidden;
            transition: height 0.3s;

            &:last-child {
                border-bottom: none;
            }

            > div {
                padding: 0 16px;
            }

            .father-box {
                height: 65px;
                display: flex;
                align-items: center;

                .fold-icon {
                    width: 10px;
                    height: 10px;
                    padding: 0 18px;
                    transform: rotate(180deg);
                    transition: transform 0.3s;
                }

                .fold-icon-up {
                    transform: rotate(0deg);
                }

                .name {
                    width: 272px;
                    margin-right: 30px;
                }
            }
        }
    }
}

.chapter-detail {
    display: flex;
    align-items: center;
    flex: 1;

    > div {
        display: flex;
    }
    .line {
        display: block;
        width: 1px;
        height: 8px;
        background: #d8d8d8;
        border-radius: 1px;
        margin: 0 8px;
    }

    .red {
        color: #ff2e30;
    }
}

.progress {
    width: 153px;
    display: flex;
    align-items: center;

    .mastery-degree {
        width: 90px;
        height: 4px;
        background: #ebedf0;
        border-radius: 4px;
        display: inline-block;
        position: relative;
        margin-right: 5px;
        .true-mastery-degree {
            width: 55px;
            height: 4px;
            background: #ff2e30;
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            left: 0;
            top: 0;
        }
    }
}

.children-box {
    display: flex;

    .point-line {
        margin: 0 10px 9px 47px;
        width: 10px;
    }

    .chapter-children {
        flex: 1;
        color: #8d90aa;

        > li {
            display: flex;
            align-items: center;
            height: 44px;

            &:last-child {
                margin-bottom: 9px;
            }

            .name {
                width: 250px;
                margin-right: 30px;
            }
        }
    }
}

.bottom-btn {
    width: 188px;
    height: 42px;
    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
    border-radius: 21px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 42px;
    margin: 24px auto 28px;
    cursor: pointer;
}
</style>
