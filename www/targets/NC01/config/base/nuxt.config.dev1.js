import prependProtocol from './_prepend-protocol';

export default {
    vue: {
        config: {
            devtools: true,
        },
    },
    env: {
        config: {
            sourceType: 'YOULU',
            learningCenterSourceType: 'YOULU.STUDY',
            indexColumnId: 'COLUMN20220000000000000000', // 首页频道
            appid: '1000141', // 企业微信ID
            env: 'dev', //环境
            umsuApiUrl: prependProtocol('umsudev1.niceloo.com/api', 'http'), //浏览器渲染api接口地址
            ufileApiUrl: prependProtocol('ufiledev1.niceloo.com/api', 'http'), //文件服务的api接口地址
            FILE_LIVE_UPLOAD: prependProtocol('fileservice-dev.kube.com/fileservice/api/file/upload', 'http'), // 直播文件服务的api接口地址
            tradeclientCode: 'YOULUWS', // pc官网支付接入端编码
            isEncryption: false, // 是否启用加密
            companyName: '北京环球优路教育科技股份有限公司',
            MCU_WX_APPID: 'wx70b6754806b582e5',
            MCU_APPLET_APPID: '',
            WX_APPID: 'wx3870b2e8eb95841d', //https://www.niceloo.com/
            YOULU_WX_APPID: 'wx48e86bad6458e24b', //https://www.youlu.com
            MINI_PROGRAM_APPID: 'wx04176a95a4cac8ae',
            articleModuleProjectID: 'PROJECT20211113260000000002',
            friendlyLinkId: 'CC20211208000000000001',
            HomeEducationProjectID: [],
            help_center_web_column_id: '', // 帮助中心-法律声明隐私政策-栏目id
            help_center_web_legal_declaration: '', // 帮助中心-法律声明文章id
            help_center_web_privacy_policy: '', // 帮助中心-隐私政策文章id
            corporate_news_column_id: 'CC20211119000000000007', // 企业新闻栏目id
            new_web_project_id: 'PROJECT20200210880000000001',
            enterprise_qualification_id: 'CC20220616010000000002', // 企业资质
            wxAppId: 'wx911a0e83b7d38717',
            'project.key': 'com.niceloo3.0.h5',
            INVOKE_MP_URL: 'https://www.youlu.com/zt4ird/@qdyfb/@qd-xcx/h5/weike-test/index.html#/app/h5/weike/pages/open-applet/open-applet?path=',
            INFORM_MP_URL: 'http://hybriddev1.niceloo.com',
            goods_list_coupon_url: 'http://mdev1.youlu.com/app/modules/coupon/pages/goods-list', // 优惠券可用商品列表
            goods_coupon_url: 'http://mdev1.youlu.com/app/official/pages/course/systematic-detail/systematic-detail', // 优惠券使用商品详情页
        },
    },
};
