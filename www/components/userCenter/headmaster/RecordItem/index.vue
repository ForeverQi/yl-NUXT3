<template>
    <div class="record-item">
        <div class="top">
            <el-rate :value="itemData.commentLevel" disabled :max="5" :icon-classes="iconClasses" void-icon-class="icon-rate-face-off"></el-rate>
            <div class="time">{{ itemData.commentCreatedDate }}</div>
        </div>
        <div class="tags" v-if="itemData.commentLabels && itemData.commentLabels.length > 0">
            <div class="tag" :class="{ fist: index === 0 }" v-for="(item, index) in itemData.commentLabels" :key="index">{{ item }}</div>
        </div>
        <div class="content">
            {{ itemData.commentContent }}
        </div>
        <div class="imglist" v-if="commentImages && commentImages.length > 0">
            <div class="img" v-for="(pic, index) in commentImages" :key="index">
                <!-- <img :src="$urlUtils.getViewUrl(pic)" /> -->
                <el-image style="width: 100%; height: 100%" :src="pic" :preview-src-list="commentImages"></el-image>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    commentLevel: 0,
                };
            },
        },
    },
    data() {
        return {
            commentImages: [],
            star: 1,
            iconClasses: ['icon-rate-face', 'icon-rate-face', 'icon-rate-face', 'icon-rate-face', 'icon-rate-face'],
        };
    },
    mounted() {
        let commentImages = this.itemData.commentImages;
        if (!commentImages) {
            commentImages = [];
        }
        commentImages = commentImages.map((pic) => {
            return this.$urlUtils.getViewUrl(pic);
        });

        this.commentImages = commentImages;
    },
};
</script>
<style lang="less" scoped>
.record-item {
    background: #ffffff;
    border-radius: 6px;
    padding: 14px 20px;
    box-sizing: border-box;
    margin-bottom: 16px;
    box-shadow: 0px 2px 12px 2px rgba(11, 42, 113, 0.05);

    .top {
        display: flex;
        justify-content: space-between;
        /deep/ .icon-rate-face-off {
            width: 20px;
            height: 20px;
            display: block;
            background-image: url(./asset/images/noselect.png);
            background-size: 100%;
        }

        /deep/ .icon-rate-face {
            width: 20px;
            height: 20px;
            display: block;
            background-image: url(./asset/images/select.png);
            background-size: 100%;
        }

        .time {
            color: #99a1af;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
        }
    }

    .tags {
        padding-top: 10px;
        .tag {
            display: inline-block;
            height: 22px;
            padding: 0 14px;
            color: #53586c;
            font-size: 12px;
            line-height: 22px;
            background: #f5f6f9;
            border-radius: 12px;
            margin-left: 14px;

            &.fist {
                margin: 0;
            }
        }
    }

    .content {
        padding-top: 8px;
        color: #3a3d4b;
        line-height: 22px;
        font-weight: 400;
        text-align: justify;
        font-size: 14px;
        word-break: break-all;
    }

    .imglist {
        display: flex;
        padding-top: 8px;
        .img {
            width: 62px;
            height: 62px;
            border-radius: 4px;
            overflow: hidden;
            margin-right: 12px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
