<template>
    <div class="footer-wrap">
        <div class="footer-content">
            <div class="intro-box">
                <img class="logo-img" src="./asset/images/logo2.png" alt="优路教育" />
                <p class="company-slogan">国内兼具口碑与实力的职业教育机构</p>
                <div class="law-msg">
                    <p>Copyright © 2005-{{ nowYear }} {{ hostName }} 版权所有</p>
                    <p>北京环球优路教育科技股份有限公司</p>
                    <p>
                        <a class="link" href="https://beian.miit.gov.cn" target="_blank">{{ icp }}</a>
                    </p>
                    <p>
                        <a class="link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802042815" target="_blank">
                            京公网安备 11010802042815号
                        </a>
                    </p>
                    <p>京网文【2021】2676-740号</p>
                    <p>京ICP证150934号</p>
                </div>
                <div class="law-imgs">
                    <img class="img" src="./asset/images/footerImg1.png" />
                    <img class="img" src="./asset/images/footerImg2.png" />
                    <img class="img" src="./asset/images/footerImg3.png" />
                    <img class="img" src="./asset/images/footerImg4.png" />
                </div>
            </div>
            <div class="link-box">
                <dl class="about-wrap">
                    <dt class="list-title">关于优路</dt>
                    <dd class="link-item" v-for="(item, index) in linkList" :key="index">
                        <a :href="item.url" target="_blank" class="link-txt" @click="clickYiguan(item)">{{ item.name }}</a>
                    </dd>
                </dl>
                <dl class="connect-wrap">
                    <dt class="list-title call">联系我们</dt>
                    <dd class="tel-item">400-861-8800</dd>
                    <dd class="tel-item">0371-5360-9200</dd>
                    <dd class="tel-item service" @click="openService">联系在线客服</dd>
                </dl>
                <dl class="about-wrap other-wrap">
                    <dt class="list-title">其他</dt>
                    <dd class="link-item" v-for="(item, index) in otherLinkList" :key="index">
                        <a :href="item.url" target="_blank" class="link-txt" @click="clickYiguan(item)">{{ item.name }}</a>
                    </dd>
                </dl>
            </div>
            <div class="qr-code-box">
                <div class="box-title">官方公众号</div>
                <div class="code-wrap">
                    <div class="code-item">
                        <img src="./asset/images/footImg11.jpg" class="code-img" />
                        <p class="img-desc">优路教育订阅号</p>
                    </div>
                    <div class="code-item">
                        <img src="./asset/images/footImg23.jpg" class="code-img" />
                        <p class="img-desc">优路教育服务号</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import track from '../../js/track.js';
import fish from './js/7fish.js';
export default {
    name: 'GlobalFooter',
    mixins: [track],
    data() {
        return {
            nowYear: new Date().getFullYear(),
            hostName: '',
            icp: '',
            qififsh: null,
            linkList: [
                {
                    name: '品牌介绍',
                    url: '/about/youlu',
                },
                {
                    name: '企业新闻',
                    url: `/about/article/${this.$nuxt.context.env.config.corporate_news_column_id}`,
                },
                {
                    name: '企业资质',
                    url: `/about/qualification/${this.$nuxt.context.env.config.enterprise_qualification_id}`,
                },
                {
                    name: '法律声明',
                    url: `/help/${this.$nuxt.context.env.config.help_center_web_column_id}/${this.$nuxt.context.env.config.help_center_web_legal_declaration}`,
                },
                {
                    name: '隐私政策',
                    url: `/help/${this.$nuxt.context.env.config.help_center_web_column_id}/${this.$nuxt.context.env.config.help_center_web_privacy_policy}`,
                },
                {
                    name: '帮助中心',
                    url: '/help',
                },
            ],
            otherLinkList: [
                {
                    name: '员工防伪查询',
                    url: 'https://www.eyoulu.cn/#/fakeQuery',
                },
                {
                    name: '代理商查询',
                    url: '/tgy/qd/agent/dist/',
                },
            ],
        };
    },
    computed: {
        ...mapState('onlineService', {
            projectCode: 'projectToServiceCode',
        }),
    },
    watch: {
        projectCode: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.initOnlineService();
                }
            },
            immediate: true,
        },
    },
    mounted() {
        if (window.location.hostname.indexOf('niceloo.com') === -1) {
            this.hostName = 'youlu.com';
            this.icp = '京ICP备05058880号-9';
        } else {
            this.hostName = 'niceloo.com';
            this.icp = '京ICP备05058880号-3';
        }
        setTimeout(() => {
            if (!this.projectCode) {
                this.setProjectCode('默认');
            }
        }, 2 * 1000);
    },
    methods: {
        ...mapMutations('onlineService', {
            setProjectCode: 'setProjectCode',
        }),
        initOnlineService() {
            // 初始化在线聊天的配置
            this.qififsh = fish.init(this.projectCode);
        },
        openService() {
            this.qififsh &&
                this.qififsh.then(() => {
                    ysf && ysf.open();
                });
        },
        // 易观埋点
        clickYiguan(item) {
            this.trackWebYouluClickBottomColumn({
                bottom_title: item.name,
                page_name: document.title || '-',
                page_belong_type: '网站页面',
            });
        },
    },
};
</script>
<style scoped lang="less" src="./css/index.less"></style>
<style scoped lang="less">
dl,
dd,
dt {
    border: 0;
    font-weight: normal;
}
</style>
