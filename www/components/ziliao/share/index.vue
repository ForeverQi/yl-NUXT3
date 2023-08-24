<template>
    <div class="share">
        <div class="text">分享</div>
        <div class="img-box weixin" @click="onClickWeiXin"></div>
        <div class="img-box qq" @click="onClickShare('qq')"></div>
        <div class="img-box kongjian" @click="onClickShare('kongjian')"></div>
        <div class="img-box weibo" @click="onClickShare('weibo')"></div>
        <we-code :show.sync="showWeXin" :option="option" :type="file.htmlIsPack === 'Y' ? 'pack' : 'doc'"></we-code>
    </div>
</template>
<script>
import MixIn from '../mixin/index.js';
import WeCode from '../we-code/index.vue';
import '@/api/ctc/api..query-ctc-project-tree'; //查询项目树
export default {
    name: 'information-share',
    components: {
        WeCode,
    },
    mixins: [MixIn],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        //资料数据
        file: {
            type: Object,
            required: true,
        },
        //pack 资料列表 /doc单个资料
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            shareType: '', //qq/空间/微博
            shareUrl: '', //分享地址
            showWeXin: false,
            option: {
                width: 181,
                text: '',
            }, //微信
        };
    },
    fetch() {
        return Promise.resolve();
    },
    methods: {
        // 点击微信分享
        onClickWeiXin() {
            this.getOptionText();
            this.showWeXin = true;
        },
        getOptionText() {
            const projectSeoCode = this.$route.params.projectSeoCode || 'all';
            const subjectSeocode = this.$route.params.subjectSeocode || 'all';
            const docId = this.$route.params.docId;
            const packId = this.$route.params.packId;
            if (this.type === 'pack') {
                this.option.text = `${this.getMOrigin()}/${projectSeoCode}/ziliao_${subjectSeocode}_all/pack_${packId}/doc_${docId}`;
                this.shareUrl = `${origin}/${projectSeoCode}/ziliao_${subjectSeocode}_all/pack_${packId}/doc_${docId}`;
            } else {
                this.option.text = `${this.getMOrigin()}/${projectSeoCode}/ziliao_${subjectSeocode}_all/${docId}`;
                this.shareUrl = `${origin}/${projectSeoCode}/ziliao_${subjectSeocode}_all/${docId}`;
            }
        },
        //点击分享
        async onClickShare(type) {
            this.shareType = type;
            const isLogin = await this.userLogin();
            this.$callApi('ctc/query-ctc-project-tree', {
                onsuccess: (res) => {
                    let collage = this.getCollegeNameByProjectId(res.treeData, this.file.projectId);
                    //埋点
                    this.$yiguan.track('web_openClass_share_button', {
                        college_name: collage.collegeName,
                        project_position: this.file.projectName,
                        platform_type: '优路教育web网站',
                        web_share_category: '资料',
                        web_openClass_ID: this.file.docId,
                        web_openClass_name: this.file.docName,
                        web_is_login: isLogin,
                    });
                    this.getOptionText();
                    this.handleShare();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //根据项目获取学院名称
        getCollegeNameByProjectId(collegelist, projectId) {
            let item = {};
            for (let i = 0; i < collegelist.length; i++) {
                let arr = collegelist[i].children.filter((item) => item.projectId === projectId);
                if (arr.length) {
                    item = collegelist[i];
                }
            }
            return item;
        },
        //执行分享
        handleShare() {
            let type = this.shareType; //qq 、kongjian： qq空间 、 weibo： 微博
            if (type == 'qq') {
                this.onMenuShareQQ();
            } else if (type == 'kongjian') {
                this.onMenuShareQzone();
            } else {
                this.onMenuShareWeibo();
            }
        },
        // 微博分享
        onMenuShareWeibo() {
            // count=表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
            // &url=将页面地址转成短域名，并显示在内容文字后面。(可选，允许为空)
            // &appkey=用于发布微博的来源显示，为空则分享的内容来源会显示来自互联网。(可选，允许为空)
            // &title=分享时所示的文字内容，为空则自动抓取分享页面的title值(可选，允许为空)
            // &pic=自定义图片地址，作为微博配图(可选，允许为空)
            // &ralateUid=转发时会@相关的微博账号(可选，允许为空)
            // &language=语言设置(zh_cn|zh_tw)(可选)
            console.log('this.file.docName', this.file.docName);
            let imgSrc = window.location.origin + '/pch5static/images/ziliao/logo.png'; //test环境地址
            let url =
                'https://service.weibo.com/share/share.php?pic=' +
                encodeURIComponent(imgSrc) +
                '&url=' +
                this.shareUrl +
                '%230-tsina-1-32009-397232819ff9a47a7b7e80a40613cfe1&title=【' +
                this.file.docName +
                '】(分享来自@优路教育)';
            if (this.file.docTag) {
                url = url + this.file.docTag;
            }
            window.open(url + '&appkey=&searchPic=true#_loginLayer_1606211528644', '_blank');
        },
        // qq分享
        onMenuShareQQ() {
            console.log('this.file.docName', this.file.docName);
            let url =
                'https://connect.qq.com/widget/shareqq/index.html?url=' +
                this.option.text +
                '%230-sqq-1-10190-9737f6f9e09dfaf5d3fd14d775bfee85&title=【' +
                this.file.docName +
                '】(分享来自@优路教育)';
            if (this.file.docTag) {
                url = url + this.file.docTag;
            }
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
        // qq空间分享
        onMenuShareQzone() {
            console.log('this.file.docName', this.file.docName);
            let url =
                'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
                this.shareUrl +
                '%230-qzone-1-50071-d020d2d2a4e8d1a374a433f596ad1440&title=【' +
                this.file.docName +
                '】(分享来自@优路教育)';
            if (this.file.docTag) {
                url = url + this.file.docTag;
            }
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.share {
    width: 228px;
    display: flex;
    height: 32px;
    align-items: center;
    & > * {
        margin-right: 16px;
    }
}
.img-box {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    cursor: pointer;
}
.text {
    font-size: 14px;
    color: #99a1af;
    margin-right: 8px;
    flex-shrink: 0;
}
.weixin {
    background-image: url('./asset/images/weixin.png');
}
.weixin:hover {
    background-image: url('./asset/images/weixin-hover.png');
}

.qq {
    background-image: url('./asset/images/qq.png');
}
.qq:hover {
    background-image: url('./asset/images/qq-hover.png');
}

.kongjian {
    background-image: url('./asset/images/kongjian.png');
}
.kongjian:hover {
    background-image: url('./asset/images/kongjian-hover.png');
}

.weibo {
    background-image: url('./asset/images/weibo.png');
}
.weibo:hover {
    background-image: url('./asset/images/weibo-hover.png');
}
</style>
