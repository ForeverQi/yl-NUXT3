<template>
    <div class="appendix-wrap">
        <h2 class="appendix-title">附件：</h2>
        <div class="appendix-box">
            <a class="appendix-item" v-for="(item, index) in appendixData" :key="index" :href="$urlUtils.getDownloadUrl(item.catUrl)" target="_blank">
                <img class="appendix-icon" src="./asset/images/appendix-icon.png" alt="" />
                <div class="appendix-name">{{ item.catName }}</div>
                <div class="download-box"></div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        appendixData: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
.appendix-wrap {
    width: 100%;
    .appendix-title {
        font-size: 14px;
        font-weight: 700;
        color: #333333;
        line-height: 19px;
        margin-bottom: 12px;
    }
}
.appendix-box {
    width: 100%;
    padding: 16px 16px 0;
    background: #fafbfe;
    box-sizing: border-box;
    border: 0.5px solid #d6dbe3;
    border-radius: 4px;
    .appendix-item {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        cursor: pointer;
        .appendix-icon {
            margin-right: 4px;
            width: 30px;
            height: 30px;
        }
        .appendix-name {
            height: 30px;
            font-size: 14px;
            font-weight: 400;
            color: #53586c;
            line-height: 30px;
            max-width: 620px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .download-box {
            margin-left: 12px;
            width: 30px;
            height: 30px;
            background-image: url('./asset/images/download-icon.png');
            background-size: 100% 100%;
            background-position: center;
        }
        .download-box:hover {
            background-image: url('./asset/images/download-active-icon.png');
        }
    }
}
</style>
