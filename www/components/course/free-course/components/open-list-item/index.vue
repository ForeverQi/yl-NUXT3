<template>
    <li>
        <a :href="`/free-course/detail/${item.goodsId}`" @click="clickHandle(item)" target="_blank">
            <div class="live-cover-picture">
                <image-view class="img" :src="$urlUtils.getViewUrl(item.goodsCover)"></image-view>
            </div>
            <span class="live-going" v-if="item.courseStatus === 2">
                <img class="live-going-img" src="./asset/images/live_going.gif" alt="" />
                直播中
            </span>
            <div class="live-title">{{ item.goodsName }}</div>
            <div class="live-time">直播时间：{{ dayFormat }}</div>
            <div class="live-bottom">
                <template v-if="item.teacherList">
                    <img class="teacher-head" :src="$urlUtils.getViewUrl(item.teacherList[0].teacherImage)" :onerror="errorTeacherAvatar" alt="" />
                    <span class="teacher-name">{{ item.teacherList[0].teacherNickname || item.teacherList[0].userName }}</span>
                </template>
                <button class="enter-live">免费学习</button>
            </div>
        </a>
    </li>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'OpenListItem',
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
        saleTag: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            errorGoodsCover: 'this.src="' + require('./asset/images/error_goods_cover.png') + '"',
            errorTeacherAvatar: 'this.src="' + require('./asset/images/error_teacher_avatar.png') + '"',
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        dayFormat() {
            return dayjs(this.item.courseStartTime).format('YYYY-MM-DD HH:mm');
        },
    },
    methods: {
        clickHandle(item) {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: item.goodsName,
                project_id: item.projectId,
                subject_id: item.subjectId,
                course_type: '公开课',
                page_type: '资源列表页',
                page_name: document.title,
                sort_name: this.saleTag.optName ? this.saleTag.optName : '-',
                channel_name: '-',
            });
        },
    },
};
</script>

<style scoped lang="less">
li {
    width: 280px;
    height: 348px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    margin-right: 26px;
    margin-bottom: 32px;
    float: left;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s;

    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        .img {
            will-change: transform;
            transform: scale(1.08) translateZ(0);
        }
    }
    a {
        height: 100%;
        backface-visibility: visible;
        display: block;
    }

    .live-cover-picture {
        width: 280px;
        height: 175px;
        display: block;
        overflow: hidden;
        .img {
            width: 100%;
            height: 100%;
            transition: 0.5s ease-in-out;
        }
    }
    .live-going {
        height: 20px;
        opacity: 0.7;
        background: #0e0f0f;
        border-radius: 16px;
        font-size: 12px;
        color: #ffffff;
        line-height: 20px;
        position: absolute;
        top: 12px;
        left: 16px;
        display: flex;
        align-items: center;
        padding: 0 6px;
        .live-going-img {
            width: 12px;
            height: 12px;
            margin-right: 4px;
            position: relative;
            top: -1px;
        }
    }
    .live-title {
        font-size: 14px;
        font-weight: 700;
        text-align: justify;
        color: #3a3d4b;
        line-height: 22px;
        height: 45px;
        margin-top: 12px;
        margin-bottom: 11px;
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
    }
    .live-time {
        font-size: 12px;
        color: #53586c;
        margin-left: 18px;
        padding-bottom: 20px;
        display: flex;
    }
    .live-bottom {
        margin-left: 18px;
        margin-right: 18px;
        border-top: 1px solid #e9ebf4;
        padding-top: 15px;
        display: flex;
    }
    .teacher-head {
        width: 38px;
        height: 38px;
        margin-right: 12px;
        border-radius: 20px;
        background: #f3f4f8;
    }
    .teacher-name {
        font-size: 14px;
        color: #53586c;
        flex: 1;
        line-height: 38px;
    }
    .enter-live {
        width: 80px;
        height: 32px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 19px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        cursor: pointer;
    }
    &:nth-child(4n + 4) {
        margin-right: 0;
    }
}
</style>
