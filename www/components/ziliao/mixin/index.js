import '@/api/dc/api.DC2015.query-download-information-path.js';
import '@/api/pc/api.FO2001.fo-order-create.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; //线索推送
import loginApi from '@/api/login.js';
import track from '@/www/components/course/trial-course/js/track.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';

export default {
    mixins: [track],
    data() {
        return {
            clueWaycode: 'yindao',
            originCode: 'ziliaoxiazai',
        };
    },
    methods: {
        ...loginRegisterTrack,

        //处理字节转换为其他单位
        changeDocSize(val) {
            if (val) {
                var num = 1024.0; //b
                if (val < num) return val + 'B'; //b
                if (val < Math.pow(num, 2)) return (val / num).toFixed(2) + 'K'; //K
                if (val < Math.pow(num, 3)) return (val / Math.pow(num, 2)).toFixed(2) + 'M'; //M
                if (val < Math.pow(num, 4)) return (val / Math.pow(num, 3)).toFixed(2) + 'G'; //G
                if (val >= Math.pow(num, 4)) return (val / Math.pow(num, 4)).toFixed(2) + 'T'; //T
            }
        },
        //下载文件
        downloadDoc(item, from = '') {
            const isPackDoc = item.docPackstatus === 'N' && item.packdocId;
            let docDetail = {
                downLoadType: isPackDoc ? 'packdoc' : 'doc', //doc 下载资料 不从属，pack 下载资料包， packdoc 下载资料 从属
                docId: item.docId, //资料id
                packId: isPackDoc ? item.packdocId : '', //资料包id
                name: item.docName, //下载（资料/资料包）名称
                access: item.docAccess, //资料下载权限
                own: item.isOwned, //（资料/资料包）是否已购买
                promotiontype: isPackDoc ? 'N' : item.docPromotiontype, //促销状态   N 无促销
            };
            this.mixinsDocDownLoad(docDetail, item, from);
        },
        replaceHtmlTag(name) {
            let docName = name.replaceAll('</em>', '');
            while (true) {
                const s = docName.indexOf('<em');
                const e = docName.indexOf('>');
                if (s < 0 || e < 0) {
                    break;
                }
                docName = docName.slice(0, s) + docName.slice(e - docName.length + 1);
            }
            return docName;
        },
        async mixinsDocDownLoad(detail, item, from) {
            // 处理html标签
            // 处理html标签
            const extension = await this.$PromotionUtil.getOptExtension_new({
                originCode: 'ziliaoxiazai',
                clueWaycode: 'yindao',
                project: { projectId: item.projectId, projectSeocode: item.projectSeocode || item.projectSeoCode || '' },
                pageName: this.replaceHtmlTag(item.docName),
            });
            let params = {
                extension,
            };
            if (detail.downLoadType === 'doc') {
                params.docId = detail.docId;
                if (detail.packId) {
                    params.packId = detail.packId;
                }
            } else if (detail.downLoadType === 'packdoc') {
                // 资料包详情 单条资料下载
                params.docId = detail.docId;
                params.packId = detail.packId;
            }

            const isLogin = await this.userLogin();
            if (!isLogin) {
                // 判断是否登录
                this.loginAndClue(
                    {
                        pageName: this.replaceHtmlTag(item.docName),
                    },
                    '资料-下载'
                )
                    .then(() => {
                        return this.userLogin();
                    })
                    .then((isLogin) => {
                        this.$emit('update-login', isLogin);
                    });
            } else if (detail.access === 'F') {
                this.queryDownloadInformationPath(params, item, from);
            } else if (detail.access === 'C') {
                if (
                    detail.own === 'Y' ||
                    (detail.promotiontype === 'F' && this.nowIsInStartToEnd(item.docPromotionstarttime, item.systemTime, item.docPromotionendtime))
                ) {
                    this.queryDownloadInformationPath(params, item, from);
                } else {
                    // 支付
                    let skipUrl = window.location.href;
                    let data = {
                        type: detail.downLoadType,
                        docId: params.docId,
                        packId: params.packId ? params.packId : '',
                        skipUrl,
                    };
                    this.docPay(data);
                }
            }
        },
        loginAndClue(opts = {}, entranceResource = '') {
            return Promise.all([
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.clueWaycode,
                        originCode: this.originCode,
                        ...opts,
                    },
                    'reg'
                ),
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.clueWaycode,
                        originCode: this.originCode,
                        ...opts,
                    },
                    'login'
                ),
            ]).then(([regExtension, extension]) => {
                // let params = {
                //     clue: { regExtension, clueExtension: extension },
                //     onstatechange: (state) => {
                //         if (state.isQRCodeScanned) {
                //             console.log(state);
                //             trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                //         }
                //     },
                // };
                return this.$ylPlugin.showLoginModal(
                    { clue: { clueExtension: extension } },
                    {
                        pageName: document.title,
                        entranceResource,
                        courseType: this.pageData.docPackstatus === 'N' ? '资料' : '资料包',
                        pageType: this.pageType === 'list' ? '资源列表' : '资源详情页',
                    }
                );
                // return new Promise((resolve) => {
                //     ylPlugin.login.showLogin_verifyByWx3(params).then(resolve, (error) => {
                //         console.log(error);
                //         // 易观上报
                //         this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '资料详情', '购买或者下载资料', '登录弹窗');
                //     });
                // }).then((res) => {
                //     // 登陆方式为微信需要推送线索参数
                //     console.warn('登录成功', res);
                //     if (['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                //         // return this.$Promotion
                //         //     .getClueExtensionInfo({
                //         //         clueWaycode: this.clueWaycode,
                //         //         originCode: this.originCode,
                //         //     })
                //         //     .then((clueExtension) => {
                //         //         return this.pushWxClue(clueExtension);
                //         //     });
                //     }
                //     // 易观上报
                //     this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '资料详情', '购买或者下载资料', '登录弹窗');
                // });
            });
        },
        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
        /**
         * 资料下载
         * @param success 成功回调
         */
        queryDownloadInformationPath(params, item, from) {
            this.$callApi('dc/query-download-information-path', {
                ...params,
                onsuccess: (data) => {
                    let url = this.$urlUtils.getDownloadUrl(data.docPath, data.downloadToken);
                    item.web_is_download = true;
                    //埋点
                    this.pushAnalysysMinx(item, from, true);
                    window.open(url);
                },
                onerror: (err) => {
                    this.pushAnalysysMinx(item, from, false, err.getDescription ? err.getDescription() : '-');
                    this.$niceloo.api.handleFailure(err);
                },
                oncomplete: () => {},
            });
        },
        //下载埋点
        pushAnalysysMinx(file, from = '', isSuccess = false, reason = '-') {
            console.warn('pushAnalysysMinx', file);
            this.trackWebYouluDownload({
                course_name: this.replaceHtmlTag(file.docName),
                project_id: file.projectId,
                subject_id: Array.isArray(file.subjectId) ? file.subjectId.join() : file.subjectId || '',
                materials_type: file.docPackstatus === 'Y' ? '资料包' : '资料',
                materials_classify: Array.isArray(file.catalogId) ? file.catalogId.join() : file.catalogId || '',
                down_type: file.docAccess === 'F' ? '免费下载' : '付费下载',
                is_pay: file.docAccess === 'C',
                entrance_resource: from,
                page_name: document.title,
            });
        },
        async docPay({ type, docId, packId, skipUrl }) {
            let clueExtension = await this.$PromotionUtil.getOptExtension_new({
                originCode: 'ziliaoxiazai',
                clueWaycode: 'yindao',
                project: { projectId: this.file.projectId, projectSeocode: this.file.projectSeocode || this.file.projectSeoCode || '' },
                pageName: this.replaceHtmlTag(this.file.docName),
            });
            // 支付逻辑 Todo
            let pl = JSON.parse(clueExtension);
            let productList = [
                {
                    skuId: docId,
                    skuType: type === 'pack' ? 'DCP' : 'DC',
                    skuNum: 1,
                },
            ];
            if (type === 'packdoc') productList[0].productId = packId;
            // scene:  电脑浏览器=PC，  手机浏览器=WAP  微信为MP  其它接口上送WAP；

            this.toDocPay({
                orderAvltime: 300, // 单位秒
                extension: JSON.stringify(pl),
                productList: JSON.stringify(productList),
                brandId: 'YOULU', //品牌标识
                orderBelongto: 'DC', //订单所属
                tradeclientCode: 'YL_WK_PC', //交易端 Config.tradeclientCode
                scene: 'PC', //应用场景"
                skipUrl, //支付成功跳转页面
                clientType: 'P',
            });
        },
        /**
         * 资料 支付
         * @param success 成功回调
         */
        toDocPay(params) {
            this.$callApi('pc/fo-order-create', {
                ...params,
                onsuccess: ({ orderNo, cashUrl, payAmount }) => {
                    // const doc = this.file || this.packageInfo;

                    // this.$yiguan.track('youlu_submit_order', {
                    //     course_name: doc?.docName ?? '-',
                    //     class_name: doc?.docName ?? '-',
                    //     project_id: doc?.projectId ?? '-',
                    //     subject_id: Array.isArray(doc.subjectId) ? doc.subjectId.join() : doc.subjectId || '-',
                    //     course_type: '资料',
                    //     order_type: '资料订单',
                    //     order_price: parseFloat((doc.docPrice / 100).toFixed(2)),
                    //     payable_price: (payAmount / 100).toFixed(2),
                    // });
                    // this.trackWebYouluSubmitOrder({
                    //     course_name: doc?.docName ?? '',
                    //     project_position: doc?.projectId ?? '',
                    //     subject_name: Array.isArray(doc.subjectId) ? doc.subjectId.join() : doc.subjectId || '',
                    //     course_type: '资料',
                    //     order_number: orderNo,
                    //     order_type: '资料订单',
                    //     order_price: parseFloat((doc.docPrice / 100).toFixed(2)),
                    //     payable_price: (payAmount / 100).toFixed(2),
                    // });
                    //跳转支付订单页面
                    setTimeout(() => {
                        window.location.href = cashUrl;
                    }, 0x64);
                },
                onerror: (result) => {
                    const description = result.getDescription();
                    const code = result.getCode();
                    if (code == '2003') {
                        this.$baseUI.alert('资料已购买，请点击确认刷新页面', '提示', {
                            success: () => {
                                this.$PageUtil.reflush();
                            },
                        });
                    } else {
                        const content = description || '请求失败';
                        this.$baseUI.alert(content, '提示', {
                            success: () => {
                                this.$PageUtil.reflush();
                            },
                        });
                    }
                },
                oncomplete: () => {},
            });
        },
        //判断用户是否登录
        userLogin() {
            return ylPlugin.login.isLogined().then(
                (isLogined) => {
                    return !!isLogined;
                },
                (isLogined) => {
                    return false;
                }
            );
        },
        ifNotPcToMobole() {
            if (!this.$platform.isPC) {
                let pathName = window.location.pathname;
                console.log(pathName);
                location.href = this.getMOrigin() + pathName;
            }
        },
        getMOrigin() {
            //根据当前环境获取文件服务地址
            let res = '';
            switch (this.$nuxt.context.env.config.env) {
                case 'local':
                case 'dev':
                case 'dev1':
                    res = 'http://mdev1';
                    break;
                case 'test':
                    res = 'http://mtest';
                    break;
                case 'uat':
                    res = 'https://muat';
                    break;
                default:
                    res = 'https://m';
            }
            var RESURI = `${res}.niceloo.com`;
            return RESURI;
        },
        /**
         * 当前时间 是否在start end 之间
         *
         */
        nowIsInStartToEnd(start, now, end) {
            if (start && now && end) {
                let startTime = new Date(start.replace(/-/g, '/')).getTime();
                let nowTime = new Date(now.replace(/-/g, '/')).getTime();
                let endTime = new Date(end.replace(/-/g, '/')).getTime();
                if (nowTime < startTime || nowTime > endTime) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        zlSetClueInfo(opts = {}) {
            const { pageTitle } = opts;
            const info = {
                pageName: pageTitle,
            };
            console.warn('zl-eaSetClueInfo', opts, info);
            this.$Promotion.setCLueInfo(info);
        },
        cluePush() {
            return this.$Promotion
                .getClueExtensionInfo({
                    clueWaycode: this.clueWaycode,
                    originCode: this.originCode,
                })
                .then((ce) => {
                    return this.requestWrapper('public/public-extensioncenter-receive', ce);
                });
        },
    },
};
