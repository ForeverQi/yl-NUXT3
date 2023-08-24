<template>
    <div>
        <a :href="item.bookUrl" target="_blank" class="item" @click="clickYiGuan(item)"></a>
        <div class="img-wrap">
            <img class="img" :src="$urlUtils.getViewUrl(item.bookPicpath)" alt="" />
        </div>
        <div class="book-content">
            <div>
                <div class="title ie">{{ item.bookName }}</div>
                <div class="tip">
                    <div v-for="(light, idx) in item.bookLights" :key="idx" :class="['line', `icon${idx + 1}`]">{{ light.content }}</div>
                </div>
            </div>
            <div class="watch-info-button">查看详情</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    fetch() {
        return Promise.resolve();
    },
    methods: {
        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            this.$emit('click-yi-guan', {
                module_type: '图书',
                course_name: item.bookName,
                project_position: item.projectId,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.have-information-book-item {
    padding: 20px 19px 20px 22px;
    box-sizing: border-box;
    margin-bottom: 30px;
    margin-right: 21px;
    width: 410px;
    height: 200px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.5s;
    cursor: pointer;
    position: relative;
    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

        .img {
            transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
        }
    }
}

.no-information-book-item {
    position: relative;
    background-color: #fff;
    padding: 20px 14px 20px 22px;
    box-sizing: border-box;
    margin-right: 20px;
    width: 387px;
    height: 200px;
    display: flex;
    border-radius: 8px;
    margin-bottom: 30px;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

        .img {
            transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
        }
    }
}
.no-margin-book {
    margin-right: 0px;
}

.item {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*display: flex;
    width: 100%;
    height: 100%;*/
}
.img-wrap {
    width: 103px;
    height: 140px;
    /*overflow: hidden;*/

    .img {
        width: 103px;
        height: 110px;
        vertical-align: top;
        /*width: 100%;*/
        max-height: 100%;
        transition: all 0.5s;
    }
}

.book-content {
    padding-left: 19px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
    width: 0;
    > div {
        width: 100%;

        .title {
            width: 100%;
            height: 44px;
            font-size: 14px;
            line-height: 22px;
            font-weight: 700;
            text-align: left;
            color: #3a3d4b;
            white-space: normal;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            /* 行数 */
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .tip {
            width: 100%;
            .line {
                font-size: 12px;
                color: #77798d;
                line-height: 16px;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                padding-left: 20px;
                box-sizing: border-box;

                &.icon1 {
                    background: url(./asset/images/1.png) no-repeat;
                    background-size: 10px 10px;
                    background-position: left center;
                }
                &.icon2 {
                    background: url(./asset/images/2.png) no-repeat;
                    background-size: 10px 10px;
                    background-position: left center;
                }
                &.icon3 {
                    background: url(./asset/images/3.png) no-repeat;
                    background-size: 10px 10px;
                    background-position: left center;
                }
            }
        }
    }

    .watch-info-button {
        margin-right: 10px;
        width: 104px;
        height: 32px;
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
        border-radius: 19px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
    }
}
</style>
