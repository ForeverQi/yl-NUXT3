<template>
    <!-- 微信支付二维码 -->
    <img :src="url" alt="" />
</template>

<script>
import QRCode from 'qrcode';
export default {
    name: 'vbJrcode',
    props: {
        option: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            defaultOption: {
                text: '',
                width: 256,
                foreground: '#000',
                background: '#FFF',
            },
            url: '',
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        option: {
            deep: true,
            immediate: true,
            handler(newVal) {
                console.log(newVal, 62);
                Object.keys(newVal).length > 0 && this.render();
            },
        },
    },
    methods: {
        render() {
            let _option = {
                ...this.defaultOption,
                ...this.option,
            };
            QRCode.toDataURL(_option.text, {
                width: _option.width,
                height: _option.width,
                margin: 0,
            })
                .then((url) => {
                    console.log(url);
                    this.url = url;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>
