<template>
    <div class="pc-soft">
        <image-view class="bg-img" :src="$urlUtils.getViewUrl(info.publicityPhotoUrl)" :type="'toolBg'" />
        <!--展示类型：下载按钮， 'D'下载  样式居中显示-->
        <div class="content">
            <div class="title">{{ info.learnToolName }}</div>
            <div class="desc">{{ info.slogan }}</div>
            <a v-if="info.jumpLinkUrl" :href="info.jumpLinkUrl" class="jump-href" target="_blank"></a>
            <a class="down-href" :href="info.content.linkUrl" target="_blank">
                <div class="btn">{{ info.content.btnDesc }}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pc-client-module',
    props: {
        // 详细信息
        info: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>

<style scoped lang="less">
.pc-soft {
    position: relative;
    width: 482px;
    height: 429px;
    background: #f5f6f9;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;

    .bg-img {
        width: 100%;
        height: 284px;
        overflow: hidden;
    }

    .content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 482px;
        height: 145px;
        box-sizing: border-box;
        z-index: 2;
        text-align: center;
        padding-left: 24px;
        padding-right: 24px;

        .title {
            width: 100%;
            margin-top: 16px;
            font-size: 16px;
            font-weight: 500;
            color: #333333;
            line-height: 22px;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .desc {
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            margin-top: 6px;
            display: -webkit-box;
            white-break: break-all;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .down-href {
            display: block;
            margin: 10px auto 20px;
            cursor: pointer;
            width: 140px;
            height: 38px;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            border-radius: 22px;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            line-height: 38px;
            position: relative;
            z-index: 5;
        }
        .jump-href {
            position: absolute;
            left: 0;
            top: -285px;
            width: 100%;
            height: 429px;
        }
    }
}
</style>
