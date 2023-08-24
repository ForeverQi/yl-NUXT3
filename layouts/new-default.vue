<template>
    <div>
        <global-header />
        <template v-if="$nuxt.isOnline === true">
            <nuxt />
        </template>
        <template v-else>
            <div class="no-network">
                <img :src="noNetworkImg" class="img" />
                <div class="txt">您的网络开小差了，唤醒网络再试一次~</div>
                <input type="button" class="refresh" value="刷新试试" @click="handleRefreshClick" />
            </div>
        </template>
        <global-footer />
        <side-fixed-section />
        <change-env />
    </div>
</template>
<script>
import '@/api/cp/api.CP0005.get-location.js';
import defaultNetwork from './asset/images/no-network.js';
import '@/www/components/package/index';
import GlobalHeader from './components/global-header/index.vue';
import GlobalFooter from './components/global-footer/index.vue';
import SideFixedSection from '@/www/components/components/side-fixed-section/index.vue';
import ChangeEnv from '@/www/components/components/change-env/index.vue';
export default {
    components: { ChangeEnv, GlobalHeader, GlobalFooter, SideFixedSection },
    data() {
        return {
            noNetworkImg: defaultNetwork.str,
        };
    },
    methods: {
        handleRefreshClick() {
            location.reload();
        },
    },
};
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style: none;
}
a {
    text-decoration: none;
}
body {
    min-width: 1200px;
    background: #f5f6f9;
    font-size: 16px;
}
.no-network {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 600px;
    .img {
        width: 260px;
        height: 180px;
    }
    .txt {
        margin-top: 16px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #3a3d4b;
    }
    .refresh {
        width: 136px;
        height: 38px;
        border-radius: 29px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        line-height: 38px;
        display: inline-block;
        margin-top: 57px;
        cursor: pointer;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        outline: none;
        border: none;
    }
}
</style>
