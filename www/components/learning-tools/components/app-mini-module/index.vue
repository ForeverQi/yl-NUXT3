<template>
    <div class="app-item">
        <image-view class="bg-img" :src="$urlUtils.getViewUrl(info.publicityPhotoUrl)" :type="'toolBg'"></image-view>
        <!--展示类型：'R'二维码  'L'引导二维码，引导按钮-->
        <div class="content">
            <image-view
                class="qrcode-img"
                :placeholder-width="'112px'"
                :placeholder-height="'112px'"
                :src="$urlUtils.getViewUrl(info.content.imgUrl)"
                :type="'toolErCode'"
            />
            <div class="app-title-desc">
                <div class="title">{{ info.learnToolName }}</div>
                <div class="desc">{{ info.slogan }}</div>
                <a v-if="info.jumpLinkUrl" :href="info.jumpLinkUrl" class="jump-href" target="_blank"></a>
                <a class="guide-href" v-if="info.showType === 'L'" :href="info.content.linkUrl" target="_blank">
                    <div class="btn">{{ info.content.btnDesc }}</div>
                </a>
                <a class="down-href" v-if="info.showType === 'D'" :href="info.content.linkUrl" target="_blank">
                    <div class="btn">{{ info.content.btnDesc }}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-mini-module',
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
.app-item {
    position: relative;
    width: 482px;
    height: 429px;
    background: #f5f6f9;
    border-radius: 10px;
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
        padding: 0 50px;
        z-index: 2;
        border-radius: 0px 0px 10px 10px;
        display: flex;
        align-items: center;

        .qrcode-img {
            width: 112px;
            height: 112px;
            border-radius: 6px;
            overflow: hidden;
            margin-top: 2px;
        }

        .app-title-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            margin-left: 45px;
            flex: 1;
        }

        .title {
            width: 225px;
            font-size: 16px;
            font-weight: 500;
            color: #333333;
            line-height: 22px;
            text-align: left;
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
            margin-top: 12px;
            text-align: left;
            display: -webkit-box;
            white-break: break-all;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .guide-href {
            display: block;
            cursor: pointer;
            margin-top: 5px;
            width: 104px;
            height: 32px;
            border: 1px solid #ff2e30;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            color: #ff2e30;
            line-height: 32px;
            position: relative;
            z-index: 5;
        }
        .down-href {
            display: block;
            margin-top: 5px;
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
