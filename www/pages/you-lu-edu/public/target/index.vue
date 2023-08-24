<template>
    <div class="redirectMiddle">
        <div class="logo">
            <a href="/">
                <img src="./asset/images/logo.png" />
            </a>
        </div>
        <div class="wrapper">
            <div class="content">
                <h1>即将离开优路教育</h1>
                <p class="info warning">你访问的网站有安全风险，切勿在该网站输入优路教育的帐号和密码。</p>
                <p class="info warning">如需访问，请手动复制链接访问。</p>
                <p class="link">
                    {{ url }}
                </p>
            </div>
            <div class="actions">
                <button class="link-button js-show-tip" @click="unsafeTip = true">为什么有安全风险？</button>
                <div class="tip" v-show="unsafeTip">
                    你访问的网站包含未知的安全风险，可能诱导你填写优路教育的帐号密码、密保等信息，甚至存在木马病毒，建议你不要访问。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'nullLayout',
    data() {
        return {
            url: '',
            unsafeTip: false,
        };
    },
    mounted() {
        this.url = this.$route.query.url;
    },
};
</script>
<style lang="less">
.redirectMiddle {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    body,
    h1,
    p {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    button {
        padding: 0;
        font-family: inherit;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    html {
        width: 100%;
        height: 100%;
        background-color: #eff2f5;
    }

    body {
        padding-top: 100px;
        color: #222;
        font-size: 13px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.5;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    @media (max-width: 620px) {
        body {
            font-size: 15px;
        }
    }

    .button {
        display: inline-block;
        padding: 10px 16px;
        color: #fff;
        font-size: 14px;
        line-height: 1;
        background-color: #0077d9;
        border-radius: 3px;
    }

    @media (max-width: 620px) {
        .button {
            font-size: 16px;
        }
    }

    .button:hover {
        background-color: #0070cd;
    }

    .button:active {
        background-color: #0077d9;
    }

    .link-button {
        color: #105cb6;
        font-size: 13px;
    }

    @media (max-width: 620px) {
        .link-button {
            font-size: 15px;
        }
    }

    .logo {
        margin: auto;
        padding-right: 30px;
        max-width: 540px;
        a img {
            width: 170px;
        }
    }

    .wrapper {
        margin: auto;
        padding-left: 30px;
        padding-right: 30px;
        max-width: 540px;
        padding-top: 25px;
        padding-bottom: 25px;
        background-color: #f7f7f7;
        border: 1px solid #babbbc;
        border-radius: 5px;
    }

    @media (max-width: 620px) {
        .logo,
        .wrapper {
            margin: 0 10px;
        }
    }

    h1 {
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 700;
        line-height: 1;
    }

    @media (max-width: 620px) {
        h1 {
            font-size: 18px;
        }
    }

    .warning {
        color: #c33;
    }

    .link {
        margin-top: 12px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        color: #222;
    }

    .link.is-expanded {
        word-wrap: break-word;
        white-space: normal;
    }

    .actions {
        margin-top: 15px;
        padding-top: 30px;
        text-align: right;
        border-top: 1px solid #d8d8d8;
    }

    .actions .link-button + .link-button {
        margin-left: 30px;
    }

    .tip {
        position: relative;
        margin-top: 30px;
        padding-top: 18px;
        color: #999;
        text-align: left;
        background: #f7f7f7;
        border-top: 1px solid #d8d8d8;
    }

    .tip.is-visible {
        opacity: 1;
    }

    .tip:after,
    .tip:before {
        position: absolute;
        bottom: 100%;
        right: 5em;
        content: ' ';
        height: 0;
        width: 0;
        border: solid transparent;
        pointer-events: none;
    }

    .tip:after {
        margin-right: -6px;
        border-color: rgba(247, 247, 247, 0);
        border-bottom-color: #f7f7f7;
        border-width: 6px;
    }

    .tip:before {
        margin-right: -7px;
        border-color: rgba(216, 216, 216, 0);
        border-bottom-color: #d2d2d2;
        border-width: 7px;
    }
}
</style>
