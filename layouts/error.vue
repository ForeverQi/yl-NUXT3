<template>
    <div class="error">
        <template v-if="error.statusCode === 404">
            <div></div>
        </template>
        <template v-else>
            {{ JSON.stringify(error) }}
            <img src="./asset/images/500_03.png" width="672" height="346" />
            <p class="error_reason">服务器内部错误，不能执行该请求。</p>
            <p>
                <span class="btn_fhsy">
                    <a href="javascript:void(0)" @click="$PageUtil.goHome()">返回首页</a>
                </span>
            </p>
        </template>
    </div>
</template>

<script>
export default {
    layout: 'nullLayout',
    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    mounted() {
        if (this.error.statusCode === 404) {
            this.init();
        }
    },
    methods: {
        init() {
            if (process.client) {
                window.location.href = '/error-404';
            }
        },
    },
};
</script>

<style scoped>
/***************************错误页面404/505样式***********************/
.error {
    /* position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -550px;
    margin-top: -310px; */
    margin: 50px auto;
    width: 1200px;
    height: 620px;
    text-align: center;
}

.error p {
    text-align: center;
    line-height: 1.8em;
    margin-top: 35px;
}

.error_reason {
    font-size: 30px;
}

.error_r2 span {
    display: block;
    text-align: left;
    width: 200px;
    font-size: 16px;
    color: #8b8b8b;
    line-height: 2em;
    margin: 0 auto;
}

.btn_fhsy {
    display: block;
    margin: 0 auto;
}

.btn_fhsy a {
    display: block;
    width: 170px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    color: #fff;
    font-size: 20px;
    background: #e3453d;
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 30px;
}

.btn_fhsy a:hover {
    color: #fce259;
}
</style>
