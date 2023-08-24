import path from 'path';
import webpack from 'webpack';
import initRoute from '../../routes/index.js';
let dayjs = require('dayjs');

export default {
    loading: {
        color: '#ff4436',
    },
    head: {
        pubDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        title: '优路教育-点亮职业人生',
        meta: [
            { charset: 'utf-8', name: 'google', content: 'notranslate' },
            {
                version: JSON.stringify({
                    buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    jenkinsId: process.env.npm_config_jenkins_build_id || '',
                    version: process.env.npm_config_jenkins_build_version || '',
                    dataOriginEnv: process.env.npm_config_env,
                    jenkinsBuildBranch: process.env.npm_config_jenkins_build_branch || '',
                    jenkinsBuildBranchDescription: process.env.npm_config_jenkins_build_branch_description || '',
                    jenkinsBuilder: process.env.npm_config_jenkins_builder || '',
                    jenkinsBuildTargetId: process.env.npm_config_id || '',
                }),
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: '优路,优路教育,优路教育网,建筑工程考试,国家职业资格考试,在线教育,在线培训,素质提升,技能提升,四六级,大学生,公务员',
            },
            {
                hid: 'description',
                name: 'description',
                content: '优路教育|职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
            },
        ],
        script: [{ src: '/_nuxt/domain.js' }, { src: '/_nuxt/jquery.3.6.0.js' }, { src: '/_nuxt/Browser.js' }, { src: '/_nuxt/wxLogin.js' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/_nuxt/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['swiper/dist/css/swiper.css', 'element-ui/lib/theme-chalk/index.css', '~/assets/css/reset.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        path.resolve(__dirname, '../', 'api/initHttp.js'),
        {
            src: '~plugins/common/utils/ElementUI',
            ssr: true,
        },
        '~/plugins/common/inject/index.js',
        '~/plugins/common/utils/baseUI.js',
        '~/plugins/message/index.js',
        '~/plugins/cupertinoMessageBox/index.js',
        '~/plugins/filters/index.js',
        { src: '~plugins/common/utils/vue-swiper', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    //   components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],
    router: {
        /**
         * 重写路由
         *
         * @param {Array} routes 系统生成路由列表
         * @param {Function} resolve path的resolve方法
         */
        extendRoutes(routes, resolve) {
            routes.unshift(...initRoute);
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            compact: false,
            plugins: [
                ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                [
                    'component',
                    {
                        libraryName: 'element-ui',
                        styleLibraryName: 'theme-chalk',
                    },
                ],
            ],
        },
        postcss: null,
        plugins: [
            new webpack.DefinePlugin({
                env: JSON.stringify(process.env.npm_config_env),
            }),
            new webpack.IgnorePlugin({
                resourceRegExp: /canvas/,
                contextRegExp: /pdfjs-dist/,
            }),
        ],
        transpile: ['@youlu/niceloo', 'qrcode', 'vue', 'pdfjs-dist'],
        vendor: ['element-ui'],
        terser: {
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        /**
         *
         * @param {object} config - webpack 配置
         * @param {object} root0 - webpack 配置
         * @param {string} root0.isClient - 是否是spa渲染
         */
        extend(config, { isClient }) {
            if (isClient && config.mode === 'production') {
                config.devtool = 'hidden-module-source-map';
                config.output.sourceMapFilename = '../../../sourcemap/[file].map';
            }
        },
        extractCSS: process.env.npm_config_env === 'prod',
    },
    loadingIndicator: '~/layouts/loading.html',
    watch: ['../routes/**'],
    generate: {
        crawler: false,
    },
    appTemplatePath: 'www/targets/NC01/app.html',
    dir: {
        store: 'www/targets/NC01/store',
        static: 'www/targets/NC01/static',
    },
};
