<template>
    <div class="teacher-wrap">
        <div class="content" v-if="list.length">
            <div class="teacher-content">
                <div
                    :class="[
                        'teacher-pic',
                        leave ? 'fadeOutLeft' : '',
                        show ? 'fadeInLeft' : '',
                        isHaveInformation ? 'have-information-height' : 'no-information-height',
                    ]"
                    @transitionend="doTransitionend"
                >
                    <img
                        v-if="selectTeacherData.teacherImage"
                        class="img"
                        :class="[isHaveInformation ? 'have-information-img' : 'no-information-img']"
                        :src="$urlUtils.getViewUrl(selectTeacherData.teacherImage)"
                    />
                </div>
                <div class="techer-intro" :class="[isHaveInformation ? 'min-techer-intro' : 'max-techer-intro']">
                    <div class="name">{{ `${selectTeacherData.teacherName}老师` }}</div>
                    <div class="specialty">{{ selectTeacherData.newProjectName }}</div>
                    <div class="intro">{{ selectTeacherData.teacherBrief }}</div>
                </div>
                <div class="teacher-list" :class="[isHaveInformation ? 'min-techer-list' : 'max-techer-list']">
                    <div
                        class="teacher-img"
                        @mouseenter="handleMouseenter(index)"
                        @mouseleave="handleMoseleave"
                        v-for="(item, index) in list"
                        :key="index"
                        :class="[(index + 1) % showCloumnNumber === 0 ? 'teacher-img-no-margin' : '']"
                    >
                        <div class="bg" v-if="isEnter && currentIndex !== index"></div>
                        <img v-if="item.teacherImage" :src="$urlUtils.getViewUrl(item.teacherImage)" class="img" />
                        <img v-else src="./asset/images/default-img.png" class="img" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="teacher-empty-box" :class="[isHaveInformation ? 'h-300' : 'h-360']">
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
    </div>
</template>
<script>
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/channel/api..query-config-model-info.js';
export default {
    components: {
        Empty,
    },
    props: {
        isHaveInformation: {
            type: Boolean,
            default: false,
        },
        columnId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            leave: false,
            show: true,
            isEnter: false,
            out: false,
            isError: false,
            currentIndex: 0,
            list: [],
            timer: null,
            selectTeacherData: {},
        };
    },
    fetch() {
        return this.queryTeacherList();
    },
    computed: {
        showCloumnNumber() {
            return this.isHaveInformation ? 2 : 3;
        },
    },
    methods: {
        queryTeacherList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: 'SZZS',
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: 6,
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    this.list = res.content;
                    if (this.list?.length) {
                        this.list.forEach((item) => {
                            // 如果配置了<前台展示-推荐项目>的内容，则显示该内容
                            if (item.clientProjectName) {
                                item.newProjectName = item.clientProjectName;
                            } else {
                                item.newProjectName = item.projectName;
                            }
                        });
                    }
                    this.handleMouseenter(0);
                })
                .catch(() => {
                    this.isError = true;
                });
        },
        handleMouseenter(index) {
            clearTimeout(this.timer);
            this.isEnter = true;
            this.currentIndex = index;
            this.selectTeacherData = this.list[index];
            this.showItem();
        },
        handleMoseleave() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isEnter = false;
            }, 300);
        },
        showItem() {
            this.leave = true;
            this.show = false;
            setTimeout(() => {
                this.leave = false;
                this.show = true;
            }, 300);
        },
        doTransitionend() {
            this.leave = false;
            this.show = true;
        },
    },
};
</script>
<style lang="less" scoped>
@keyframes fadeOutLeft {
    0% {
        opacity: 1;
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(-60px, 0, 0);
        transform: translate3d(-60px, 0, 0);
    }
}
@keyframes fadeInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(-60px, 0, 0);
        transform: translate3d(-60px, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
}
.teacher-wrap {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    height: 100%;
    .content {
        display: flex;
        height: 100%;
        background-image: url(./asset/images/bg.jpg);
        background-size: auto 100%;
        border-radius: 16px;

        .teacher-content {
            padding-right: 32px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            .teacher-pic {
                width: 340px;
                height: 340px;

                &.fadeInLeft {
                    animation-name: fadeInLeft;
                    -webkit-animation-duration: 0.2s;
                    animation-duration: 0.2s;
                }
                &.fadeOutLeft {
                    opacity: 0;
                    -webkit-animation-name: fadeOutLeft;
                    animation-name: fadeOutLeft;
                    -webkit-animation-duration: 0.2s;
                    animation-duration: 0.2s;
                }

                .img {
                    width: 100%;
                    height: 100%;
                }
                .no-information-img {
                    width: 340px;
                    height: 340px;
                }
            }
            .have-information-height {
                width: 300px;
                height: 300px;
            }
            .no-information-height {
                padding-top: 20px;
                box-sizing: border-box;
                height: 360px;
            }

            .techer-intro {
                .name {
                    font-size: 24px;
                    color: #242f3e;
                    line-height: 31px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }

                .specialty {
                    font-size: 14px;
                    color: #3a3d4b;
                    line-height: 25px;
                    font-weight: bold;
                    // padding-bottom: 40px;
                    height: 70px;
                }

                .intro {
                    font-size: 14px;
                    color: #77798d;
                    line-height: 22px;
                    text-align: justify;
                    height: 116px;
                    word-wrap: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 5;

                    &::before {
                        content: '';
                        display: block;
                        width: 32px;
                        height: 4px;
                        background: linear-gradient(90deg, #ff6870, #f8323c);
                        border-radius: 3px;
                        margin-bottom: 7px;
                    }
                }
            }
            .min-techer-intro {
                margin-right: 39px;
                width: 300px;
            }
            .max-techer-intro {
                margin-right: 55px;
                width: 510px;
            }
        }

        .teacher-list {
            display: flex;
            justify-content: flex-start;
            justify-items: center;
            align-items: center;
            align-content: flex-start;
            flex-wrap: wrap;
            .teacher-img {
                position: relative;
                display: inline-block;
                width: 78px;
                height: 78px;
                margin-right: 12px;
                margin-bottom: 10px;
                border-radius: 4px;
                background: #f3f4f8;

                .img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }

                .bg {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(255, 255, 255, 0.6);
                }
            }
            .teacher-img-no-margin {
                margin-right: 0px;
            }
        }
        .min-techer-list {
            width: 168px;
        }
        .max-techer-list {
            width: 258px;
        }
    }
}

.teacher-empty-box {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
}
.h-300 {
    height: 300px;
}
.h-360 {
    height: 360px;
}
</style>
