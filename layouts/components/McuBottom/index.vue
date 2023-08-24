<template>
    <div class="footer-wrap">
        <div class="footer-container">
            <div class="footer-module">
                <div class="list-wrap pointe" v-for="item in cateList" :key="item.ccId">
                    <h5>{{ item.ccName }}</h5>
                    <ul>
                        <li v-for="sub in item.arcList" :key="sub.caId">
                            <nuxt-link :to="`/article/detail/${item.ccId}/${sub.caId}`" v-if="sub.caType === 'C'" class="link">
                                {{ sub.caTitle.substr(0, 10) }}
                            </nuxt-link>
                            <a :href="sub.caTurnUrl" target="_blank" v-else-if="sub.caType === 'T'" class="link">
                                {{ sub.caTitle.substr(0, 10) }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="list-wrap">
                    <h5>咨询热线</h5>
                    <ul>
                        <li>400-861-8800</li>
                        <li>0371-5360-9200</li>
                        <li class="special">010-5239-1377</li>
                        <li>
                            <p class="special">(课件应急处理）</p>
                            <button class="customer-service" @click="onlineConsult">联系在线客服</button>
                        </li>
                    </ul>
                </div>
                <div class="list-wrap list-code-wrap">
                    <h5>官方公众号</h5>
                    <div class="code-wrap">
                        <div class="code-item">
                            <img src="./asset/images/footImg1.png" />
                            <p>优路教育订阅号</p>
                        </div>
                        <div class="code-item">
                            <img src="./asset/images/footImg2.png" />
                            <p>优路教育服务号</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="friendlyLinks.length" class="links-wrap">
                <h5>{{ `${friendlyLinkLabel}：` }}</h5>
                <div class="links">
                    <a v-for="item in friendlyLinks" :key="item.caId" :href="item.caTurnUrl" target="_blank">
                        {{ item.caTitle }}
                    </a>
                </div>
            </div>
            <div class="copyright-wrap">
                <p class="copyright-text">
                    Copyright&nbsp;©&nbsp;2005-{{ nowYear }}&nbsp;niceloo.com&nbsp;版权所有&nbsp;北京环球优路教育科技股份有限公司&nbsp;
                    <a href="https://beian.miit.gov.cn" target="_blank" class="beian">京ICP备05058880号-3</a>
                    &nbsp;京公网安备&nbsp;11010802017987号 &nbsp;京ICP证150934号
                </p>
                <div class="copyright-img">
                    <img src="./asset/images/footerImg1.png" />
                    <img src="./asset/images/footerImg2.png" />
                    <img src="./asset/images/footerImg3.png" />
                    <img src="./asset/images/footerImg4.png" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GlobalFooter',
    data() {
        return {
            nowYear: '2021',
            cateList: [],
            friendlyLinkLabel: '', // 友情链接/人社部链接 label
            friendlyLinks: [], // 友情链接
        };
    },
    mounted() {
        this.nowYear = new Date().getFullYear();
        this.init();
    },
    methods: {
        init() {
            this.getData();
            this.getFriendlyLinksData();
        },
        async getFriendlyLinksData() {
            await this.getFriendlyLinks().then((res) => {
                this.friendlyLinks = res.list;
            });
        },
        getFriendlyLinks() {
            console.log(this.$nuxt.context.env.config.friendlyLinkId, '===');
            return this.HTTPClient(
                'cp/info/article/list',
                {
                    ccId: this.$nuxt.context.env.config.friendlyLinkId,
                    pageSize: 40,
                    pageIndex: 0,
                },
                (res) => {
                    return res.list;
                }
            );
        },
        async getData() {
            await this.getCateList().then((res) => {
                this.cateList = res;
                return res;
            });
        },
        async getCateList() {
            let data = {
                ccProjectId: this.$nuxt.context.env.config.articleModuleProjectID,
            };
            let cateList = await this.HTTPClient('cp/info/column/list', data).then((res) => {
                // eslint-disable-next-line array-callback-return
                res.filter((item) => {
                    if (this.$nuxt.context.env.config.friendlyLinkId === item.ccId) {
                        this.friendlyLinkLabel = item.ccName;
                    }
                });
                return res.slice(0, 3);
            });

            return Promise.all(
                cateList.map((item) => {
                    return this.getArticleList(item);
                })
            );
        },
        getArticleList(item) {
            let data = {
                ccId: item.ccId,
                pageSize: 5,
                pageIndex: 0,
            };
            return this.HTTPClient('cp/info/article/list', data).then((res) => {
                let list = res.list && res.list.length > 0 ? res.list : [];
                item.arcList = list;
                return item;
            });
        },
        HTTPClient(url, data) {
            return this.$callRawApi({
                api: url,
                params: data,
            }).then((res) => {
                console.log('通过res.getData()获取数据');
                return res.getData();
            });
        },
        onlineConsult() {
            ysf && ysf.open();
        },
    },
};
</script>
<style scoped>
/*star footer */
/*全国分校*/
.pageWidth {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.schoolTit {
    font-size: 30px;
    height: 60px;
}

.schoolTadHd {
    overflow: hidden;
    border-bottom: 1px solid #ddd;
}

.schoolTadHd a {
    float: left;
    padding: 0px 18px;
    margin-bottom: 15px;
    font-size: 18px;
    height: 32px;
    line-height: 32px;
}

.schoolTadHd a:hover,
.schoolTadHd a.on {
    background: #ff2e30;
    border-radius: 20px;
    color: #fff;
}

.schoolTadBd {
    overflow: hidden;
}

.schoolTadBd .schoolTadListCon {
    display: none;
}

.schoolTadList {
    border-bottom: 1px dashed #ddd;
    padding: 20px;
    width: 510px;
    float: left;
}

.schoolTadList h3 {
    font-size: 18px;
    height: 40px;
}

.schoolTadList p {
    line-height: 24px;
    font-size: 16px;
    color: #666;
    height: 48px;
    overflow: hidden;
}

.tel {
    margin-top: 15px;
}

/* .tel span {
  display: inline-block;
  margin-right: 30px;
  font-size: 16px;
  color: #666;
   background: url("./asset/images/icon10.png") no-repeat;
} */
.tel span.ask {
    background-position: left 5px;
    padding-left: 28px;
}

.tel span.ser {
    background-position: left -59px;
    padding-left: 23px;
}

.tel span.ser i {
    color: #ff2e30;
    font-style: normal;
}

/*友情链接*/
.footerTop {
    min-width: 1200px;
    background: #333;
    padding: 30px 0;
}

.friendLink {
    margin-bottom: 60px;
}

.friendLink h3 {
    font-size: 16px;
    color: #c2c2c2;
    font-weight: normal;
    border-bottom: 2px solid #4b4b4b;
    height: 28px;
    margin-bottom: 10px;
    text-align: left;
}

.friendLink a {
    display: inline-block;
    float: left;
    color: #c2c2c2;
    font-size: 12px;
    margin-right: 10px;
    line-height: 30px;
}

.footerBom {
    padding: 20px 0;
}

.footerBom p {
    text-align: center;
    font-size: 12px;
    color: #666;
}

.footerBom p.text {
    height: 30px;
}

.footerBom img {
    margin: 0 25px;
}

.footList {
    margin-right: 55px;
    float: left;
}

.footList h4 {
    font-size: 18px;
    height: 30px;
    border-bottom: 1px solid #666;
    color: #fff;
    font-weight: normal;
    margin-bottom: 10px;
    text-align: left;
}

.footList li {
    line-height: 34px;
    float: left;
    margin-right: 23px;
}

.footList li a {
    color: #fff;
    font-size: 14px;
}

.aboutUsList {
    width: 137px;
}

.aboutUsList ul {
    width: 160px;
}

.helpList {
    width: 150px;
}

.helpList ul {
    width: 175px;
}

.payList {
    width: 120px;
    margin-right: 0;
}

.QRcode {
    /* margin-right: 170px; */
    margin-right: 82px;
}

.clearself {
    overflow: hidden;
}

.QRcode dl {
    float: left;
    margin-left: 45px;
}

.QRcode dd {
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    margin-bottom: 10px;
}

.QRcode dt {
    text-align: center;
}

.footTel div {
    overflow: hidden;
    margin-bottom: 25px;
}

.footTel img {
    float: left;
    margin-right: 10px;
}

.footTel i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
    display: block;
    text-align: left;
}

.footTel b {
    font-size: 18px;
    color: #fff;
    display: inline-block;
    font-weight: normal;
    float: left;
}

.footTel p {
    color: #999;
    font-size: 14px;
}

.fr {
    float: right;
}

.fl {
    float: left;
}

.beian {
    color: #666;
    cursor: pointer !important;
}

/*end footer */
</style>

<style scoped lang="less">
.footer-wrap {
    width: 100%;
    min-width: 1200px;
    background: #333;
    color: #fff;
    h5 {
        border: 0;
        font-weight: normal;
    }

    .footer-container {
        margin: 0 auto;
        @media screen and (min-width: 1440px) {
            width: 1200px;
        }
        @media screen and (max-width: 1439px) {
            width: 1200px;
        }

        .footer-module {
            overflow: hidden;
            // display: flex;
            padding-bottom: 15px;
            border-bottom: 1px solid #5b5b5b;

            .list-wrap {
                float: left;
                width: 18%;
                text-align: left;

                &.pointe {
                    ul {
                        li {
                            a {
                                cursor: pointer;
                            }
                        }
                    }
                }

                h5 {
                    margin: 32px 0 0px;
                    // padding-bottom: 20px;
                    border-bottom: 1px solid #5b5b5b;
                    font-size: 18px;
                    padding: 0 0 20px 50px;
                }

                .code-wrap {
                    display: flex;
                    padding-left: 50px;

                    .code-item {
                        margin-right: 60px;

                        img {
                            width: 100px;
                            height: 100px;
                            margin: 20px 0 15px;
                        }

                        p {
                            font-size: 14px;
                        }
                    }
                }

                ul {
                    margin: 20px 0 15px;
                    padding-left: 50px;

                    li {
                        margin-bottom: 15px;
                        font-size: 14px;

                        a {
                            font-size: 14px;
                            color: #fff;
                        }

                        .customer-service {
                            width: 100px;
                            height: 30px;
                            background: #333;
                            border: 1px solid #fff;
                            border-radius: 3px;
                            color: #fff;
                            font-size: 12px;
                            margin-top: 10px;

                            &:hover {
                                border: 1px solid #f8323c;
                                background: #f8323c;
                                cursor: pointer;
                            }
                        }
                    }

                    .special {
                        font-size: 14px;
                        color: #9e9e9e;
                    }
                }
            }

            .list-code-wrap {
                width: 28%;
            }
        }

        .links-wrap {
            padding: 20px 0px 5px 50px;
            border-bottom: 1px solid #5b5b5b;

            h5 {
                width: auto;
                font-size: 18px;
                float: left;
            }

            .links {
                display: flex;
                flex-wrap: wrap;
                margin-top: 4px;

                a {
                    margin: 0 18px 15px 0px;
                    font-size: 12px;
                    color: #c2c2c2;
                }
            }
        }

        .copyright-wrap {
            text-align: center;
            padding: 20px 0 34px;

            .copyright-text {
                font-size: 12px;
                margin-bottom: 20px;

                a {
                    color: #fff;
                }
            }

            .copyright-img {
                img {
                    width: 78px;
                    height: 32px;
                    border-radius: 3px;
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>
