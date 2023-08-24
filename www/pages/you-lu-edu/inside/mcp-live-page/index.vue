<template>
    <div>
        <iframe :src="coursewareLivepath" allowfullscreen="true" frameborder="0" scrolling="auto" class="liveiframe"></iframe>
    </div>
</template>

<script>
import '@/api/mcu/api.MCU0008.video-web-livepath.js';
export default {
    name: 'mcpLivePage',
    layout: 'nullLayout',
    data() {
        return {
            coursewareId: this.$route.query.coursewareId,
            goodsId: this.$route.query.goodsId,
            coursewareLivepath: '',
        };
    },
    mounted() {
        this.getLivePath();
    },
    methods: {
        getLivePath() {
            Config.ctype = 'OP.WKWEB';
            this.$callApi('cc/video-web-livepath', {
                coursewareId: this.coursewareId, //	课件ID
                goodsId: this.goodsId, //	班级ID
                onsuccess: (res) => {
                    if (res && res.authStatus) {
                        this.coursewareLivepath = res.coursewareLivepath;
                    } else {
                        this.$baseUI.alert(res.msg).then(() => {
                            this.$router.go(-1);
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.liveiframe {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100%);
    // width：calc(100% - 10px);
}
</style>
