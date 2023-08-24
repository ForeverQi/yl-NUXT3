<template>
    <div class="qrcode-item">
        <!--<img :src="info.content.imgUrl" />-->
        <image-view class="tool-ercode" :src="$urlUtils.getViewUrl(info.content.imgUrl)" :type="'toolErCode'" />
        <a class="img-href" v-if="info.jumpLinkUrl" :href="info.jumpLinkUrl" target="_blank"></a>
        <div class="right">
            <div class="title">{{ info.learnToolName }}</div>
            <div class="desc">{{ info.slogan }}</div>
            <a class="guide-href" v-if="info.showType === 'L'" :href="info.content.linkUrl" target="_blank">
                <div class="btn">{{ info.content.btnDesc }}</div>
            </a>
            <a class="down-href" v-if="info.showType === 'D'" :href="info.content.linkUrl" target="_blank">
                <div class="btn">{{ info.content.btnDesc }}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'qrcode-module',
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
.qrcode-item {
    width: 509px;
    height: 160px;
    display: flex;
    align-items: center;
    padding: 0 30px 0 48px;
    box-sizing: border-box;
    background: #f5f6f9;
    border-radius: 10px;
    position: relative;

    .tool-ercode {
        width: 112px;
        height: 112px;
        margin-right: 24px;
        border-radius: 6px;
        overflow: hidden;
    }
    .img-href {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .right {
        width: 294px;
    }
    .title {
        width: 100%;
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
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        margin-top: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-break: break-all;
    }
    .guide-href {
        display: block;
        cursor: pointer;
        width: 104px;
        height: 32px;
        border: 1px solid #ff2e30;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        line-height: 32px;
        margin-top: 14px;
        color: #ff2e30;
        position: relative;
        z-index: 5;
    }
    .down-href {
        display: block;
        margin-top: 10px;
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
}
</style>
