<template>
    <a :href="item.bookUrl" target="_blank" @click="handleClickBook">
        <span class="books-cover-picture">
            <img class="img" :src="$urlUtils.getViewUrl(item.bookPicpath)" alt="" />
            <img class="tag" v-if="item.recommendStatus === 'Y'" src="./asset/images/tag-recommend.png" alt="" />
        </span>
        <!--<div class="books-cover-picture"></div>-->
        <!--<image-view class="img" :src="$urlUtils.getViewUrl(item.goodsCover)"></image-view>-->
        <p class="books-title">{{ item.bookName }}</p>
        <ul>
            <li :class="'num-0' + (index + 1)" v-for="(light, index) in item.bookLights" :key="index">{{ light.content }}</li>
        </ul>
        <span class="look-detail">查看详情</span>
    </a>
</template>

<script>
import track from '@/www/components/course/free-course/js/track.js';
export default {
    name: 'index',
    mixins: [track],
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
        college: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    methods: {
        handleClickBook() {
            this.trackWebYouluClickBook({
                course_name: this.item.bookName,
                project_id: this.item.projectId,
            });
        },
    },
};
</script>

<style scoped lang="less">
a {
    width: 100%;
    height: 100%;
    display: inline-block;
}
.books-cover-picture {
    display: inline-block;
    position: relative;
    float: left;
    margin-left: 32px;
    margin-right: 40px;
    width: 143px;
    height: 193px;
    .img {
        width: 100%;
        height: 100%;
        transition: 0.5s ease-in-out;
        margin-top: -16px;
    }
    .tag {
        width: 66px;
        height: 66px;
        position: absolute;
        right: -12px;
        bottom: 4px;
        z-index: 5;
    }
}

/*.books-cover-picture {
    width: 143px;
    height: 193px;
    display: block;
    overflow: hidden;
    margin-left: 32px;
    margin-right: 40px;
}*/
.books-title {
    width: 335px;
    height: 60px;
    font-size: 17px;
    font-weight: bold;
    color: #3a3d4b;
    line-height: 30px;
    display: inline-block;
    margin-top: 24px;
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    float: left;
}
ul,
li {
    margin: 0;
    padding: 0;
}
ul {
    display: inline-block;
    width: 340px;
    li {
        width: 100%;
        font-size: 14px;
        color: #77798d;
        line-height: 16px;
        /*background: url('./asset/images/num-01.png') no-repeat;
        background-size: 10px 10px;*/
        padding-left: 16px;
        margin-bottom: 4px;
        background-size: 10px 10px;
        background-position-y: center;
        background-repeat: no-repeat;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .num-01 {
        background-image: url('./asset/images/num-01.png');
    }

    .num-02 {
        background-image: url('./asset/images/num-02.png');
    }

    .num-03 {
        background-image: url('./asset/images/num-03.png');
    }
}
.look-detail {
    width: 104px;
    height: 38px;
    display: inline-block;
    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
    border-radius: 19px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    line-height: 38px;
    position: absolute;
    right: 24px;
    bottom: 18px;
    z-index: 1;
}
</style>
