<template>
    <div class="download-wrap">
        <div class="module" v-for="(item, index) in list" :key="index" :data-id="item.learnToolTypeId">
            <div class="title-wrap">
                <img class="title-img-left" src="./asset/images/title-bg-left.png" alt="app" />
                <span class="title-wrap-text">{{ item.typeName }}</span>
                <img class="title-img-right" src="./asset/images/title-bg-left.png" alt="app" />
            </div>
            <div class="container">
                <!--里层：showType 'R'二维码   'D'下载  'L'引导-->
                <!--外层：是否展示宣传图：showType  S展示D隐藏-->
                <div class="container-item" v-for="(info, _index) in item.childList" :key="_index" :class="{ qrcode: info.showResult === 'D' }">
                    <app-mini-module
                        v-if="item.showType === 'S' && (info.showType === 'R' || info.showType === 'L' || (info.showType === 'D' && info.content.imgUrl))"
                        :info="info"
                    />
                    <pc-client-module v-if="item.showType === 'S' && info.showType === 'D' && !info.content.imgUrl" :info="info" />
                    <qrcode-module v-if="item.showType === 'D'" :info="info" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appMiniModule from './components/app-mini-module/index.vue';
import pcClientModule from './components/pc-client-module/index.vue';
import qrcodeModule from './components/qrcode-module/index.vue';
import '@/api/learntool/api..learnTool-list.js';
export default {
    components: {
        appMiniModule,
        pcClientModule,
        qrcodeModule,
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped lang="less">
.download-wrap {
    margin: 12px auto 64px;
    width: 1200px;
    background-color: #fff;
    padding: 5px 80px 180px;
    box-sizing: border-box;

    .title-wrap {
        margin: 37px 0 48px;
        text-align: center;
        height: 83px;
        background: url('./asset/images/title-bg.png') no-repeat;
        background-size: 305px 42px;
        background-position: center 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 45px;
        box-sizing: border-box;
        .title-wrap-text {
            font-size: 26px;
            font-weight: 600;
            color: #f62f2f;
            margin-left: 18px;
            margin-right: 18px;
        }

        .title-img-left,
        .title-img-right {
            width: 31px;
            height: 4px;
        }
        .title-img-right {
            transform: rotate(180deg);
        }
    }

    .module {
        &:first-child {
            .title-wrap {
                margin-top: 0;
            }
        }
    }

    .container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .container-item {
            &:hover {
                transition: all 0.5s;
                transform: translate(5px, -5px);
            }
        }

        .container-item:nth-child(2n) {
            margin-bottom: 30px;

            &:hover {
                transition: all 0.5s;
                transform: translate(-5px, -5px);
            }

            &.qrcode {
                margin-bottom: 30px;
            }
        }

        .container-item,
        .container-item.qrcode {
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
