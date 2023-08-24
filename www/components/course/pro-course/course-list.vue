<template>
    <div>
        <div v-if="isError" class="empty-state">
            <img src="./asset/images/error.png" alt="暂无数据" />
            <p class="hint-txt">您的网络开小差了，刷新页面再试一次～</p>
            <button class="reload-btn" @click="$emit('click-reload')">刷新试试</button>
        </div>
        <div v-else-if="data.length" class="list-wrap">
            <a
                v-for="item in data"
                :key="item.classtypeId"
                :href="`/pro-course/detail/${item.classtypeId}`"
                @click="handleClick(item)"
                target="_blank"
                class="course-item"
            >
                <div v-if="item.classtypeHotstatus === 'Y'" class="hot-tag">热卖</div>
                <div class="img-box">
                    <image-view :src="item.classtypeAppcoverimgurl" class="img" />
                    <!-- 地区标签 -->
                    <div v-if="item.currentAreaStatus === 'Y'" class="img-wrap_label">{{ areaName }}</div>
                </div>
                <div class="list-label_content">
                    <div class="title-box">
                        <span class="tag-txt">{{ item.ctapName }}</span>
                        {{ item.classtypeName }}
                    </div>
                    <div class="tags-box">
                        <template v-for="(item2, index2) in item.classtypeHighlights">
                            <span
                                :key="index2"
                                v-if="index2 < 2 && item2"
                                class="tag-txt_name c-gray"
                                :class="item.classtypeHighlights.length > 1 ? 'tags-more' : ''"
                            >
                                {{ item2 }}
                            </span>
                        </template>
                    </div>
                    <!-- 价格 -->
                    <div class="money-box">
                        <span class="symbol">¥</span>
                        <span>{{ item | filterPrice }}</span>
                        <div v-if="item.auditionStatus === 'Y'" class="listen-btn" @click.prevent="clickListen(item)">
                            <img src="./asset/images/sound-ico2.png" />
                            试听
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div v-else class="empty-state">
            <div v-show="!isLoading">
                <img src="./asset/images/empty.png" alt="暂无数据" />
                <p class="hint-txt">暂无课程，去看看其他考试的课程吧</p>
            </div>
        </div>
    </div>
</template>

<script>
import track from '@/www/components/course/free-course/js/track.js';
export default {
    mixins: [track],
    props: {
        // 当前地区
        areaName: {
            type: String,
            default: '',
        },
        // 学院名称
        collegeName: {
            type: String,
            default: '-',
        },
        // 学院ID
        collegeId: {
            type: String,
            default: '-',
        },
        // 是否为加载状态
        isLoading: {
            type: Boolean,
            default: false,
        },
        // 是否展示错误页
        isError: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: () => [],
        },
    },
    fetch() {
        return Promise.resolve();
    },
    methods: {
        handleClick(item) {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: item.classtypeName,
                project_id: item.projectId,
                subject_id: '-',
                course_type: '系统课',
                page_type: '资源列表页',
                page_name: document.title,
                sort_name: '-',
                channel_name: '-',
            });
        },
        clickListen(val) {
            // this.clickListenTrack(val);
            ylPlugin.login.isLogined().then((check) => {
                this.yiguanTrack(val, check);
                if (check === true) {
                    this.toDetail(val.classtypeId);
                } else {
                    this.doLogin(val);
                }
            });
        },
        doLogin(courseData) {
            this.$Promotion.setCLueInfo({
                url: location.href,
                pageName: courseData.classtypeName,
                projectId: courseData.projectId,
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            });
            const regExtension = this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'yindao',
                originCode: 'xitongke',
                pageName: courseData.classtypeName,
            });
            regExtension.clueFormdata = [
                {
                    key: 'clueRemarks',
                    value: '进入官网',
                    desc: '该用户通过【系统课试听】',
                },
            ];
            this.$ylPlugin.showLoginModal(
                { clue: { regExtension, clueExtension: regExtension } },
                { pageName: document.title, entranceResource: '系统课-免费试听', courseType: '系统课', pageType: '资源列表页' }
            );
        },
        toDetail(classtypeId) {
            window.open(`/pro-course-tryout/${classtypeId}`);
        },
        yiguanTrack(courseData, isLoginIn) {
            const track = {
                course_name: courseData.classtypeName, // 课程名称
                project_id: courseData.projectId, // 项目名称
                page_type: '系统课列表页', // 页面类型
                page_name: document.title, // 页面名称
                channel_name: this.collegeName, // 频道页名称
                entrance_resource: '系统课列表页-试听按钮', // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
        clickListenTrack(val) {
            this.trackWebYouluClickListen({
                course_name: val.classtypeName,
                project_id: val.projectId,
                page_type: '系统课列表页',
                page_name: document.title,
                channel_name: this.collegeName,
                entrance_resource: '【系统课列表页-试听按钮】',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.empty-state {
    box-sizing: border-box;
    padding-top: 50px;
    height: 500px;
    text-align: center;

    .hint-txt {
        margin-top: 16px;
        font-size: 14px;
        color: #3a3d4b;
    }

    .reload-btn {
        display: block;
        width: 136px;
        height: 38px;
        margin: 40px auto 0;
        line-height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        font-size: 14px;
        color: #ffffff;
        line-height: 14px;
        cursor: pointer;
    }
}

.list-wrap {
    width: 1250px;
    margin-left: -26px;
    display: flex;
    flex-wrap: wrap;
}

.course-item {
    width: 280px;
    height: 340px;
    box-sizing: border-box;
    padding: 14px 14px 20px;
    margin-bottom: 32px;
    margin-left: 26px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    transition: all 0.2s linear;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

        .img {
            transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
        }
    }
}

.list-label_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: auto;
}

.img-box {
    width: 100%;
    height: 157px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    flex: none;

    .img {
        width: 100%;
        height: 100%;
        transition: all 0.5s;
    }
}

.hot-tag {
    box-sizing: border-box;
    width: 65px;
    height: 26px;
    line-height: 26px;
    color: #df1a1c;
    font-size: 12px;
    background-image: url('./asset/images/hot-tag.png');
    background-size: 65px 26px;
    padding-left: 32px;
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: 2;
}

.title-box {
    margin: 20px 0 10px;
    height: 44px;
    line-height: 22px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    font-weight: bold;
    color: #3a3d4b;
    flex: none;
}

.tag-txt {
    float: left;
    line-height: 20px;
    padding: 0 7px;
    font-size: 12px;
    color: #99a1af;
    background-color: #eff1f9;
    border-radius: 2px;
    margin-right: 8px;

    // &.c-yellow {
    //     color: #fa6400;
    //     background-color: rgba(251, 135, 21, 0.1);
    // }

    // &.c-gray {
    //     color: #53586c;
    //     background-color: #eeeff6;
    // }
}

.tags-box {
    overflow: hidden;
    // margin-bottom: 28px;
    flex: auto;

    .tag-txt_name {
        display: inline-block;
        height: 22px;
        background: linear-gradient(135deg, #fdf0d8, #eed1a5);
        border-radius: 4px;
        padding: 0 10px;
        font-size: 12px;
        line-height: 22px;
        color: #925709;
    }

    .tags-more.tag-txt_name {
        &:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &:nth-child(n + 2) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            background: #fff5e1;
            color: #c87805;
        }
    }
}

.msg-box {
    height: 46px;
    display: flex;
    justify-content: space-between;

    .msg-desc {
        width: 170px;
        display: flex;
        align-items: flex-start;
    }

    .promise-msg {
        padding: 0 8px;
        font-size: 12px;
        line-height: 26px;
        color: #99a1af;
        position: relative;

        &::after {
            content: '';
            width: 1px;
            height: 7px;
            background-color: #e4e5eb;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        &:nth-child(1) {
            padding-left: 0;

            &::after {
                display: none;
            }
        }
    }
}

.listen-btn {
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    font-size: 14px;
    color: #fff;
    padding: 0 11px 0 7px;
    border-radius: 100px 100px 100px 1px;
    transform: translateY(-4px);
    margin-left: 6px;

    img {
        width: 13px;
        height: 11px;
    }
}

.money-box {
    display: flex;
    font-size: 18px;
    color: #ff2e30;
    line-height: 20px;
    align-items: baseline;
    letter-spacing: -0.16px;
    flex: none;

    span {
        font-weight: bold;
        line-height: 1;
    }

    .symbol {
        font-size: 14px;
        letter-spacing: -0.13px;
    }
}

.img-wrap_label {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 20px;
    line-height: 20px;
    padding: 0 7px;
    background-color: rgba(0, 0, 0, 0.5);
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 12px;
    color: #fff;
    max-width: 230px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
