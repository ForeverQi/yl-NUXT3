(function () {
    var userString = localStorage.getItem('loginStatus') || '{}';
    var user = JSON.parse(userString);
    var notLogined = !!user.userYoulunum;
    window.__bl.setConfig({
        /**
         * 用户ID，参阅：https://help.aliyun.com/document_detail/58655.html#sc-uid
         * 1) 对于管理端，如智能运营平台，设置为 员工工号；
         * 2) 对于用户端，如优路 PC 官网，设置为 学员优路号；
         * 3) 如果尚未登录，则赋值为 null。需要在登录后，再次调用 setConfig 方法，更新 uid
         */
        uid: !notLogined ? null : user.userYoulunum,

        // eslint-disable-next-line jsdoc/require-returns
        /**
         * 用户姓名，参阅：https://help.aliyun.com/document_detail/58655.html#sc-setusername
         */
        // eslint-disable-next-line object-shorthand, prettier/prettier
        setUsername: function () {
            // 如果没有登录，需返回 null
            if (!notLogined) return null;

            return user ? user.userNickname || user.userYoulunum || user.userLoginname : '';
        },

        /**
         * 要忽略的错误列表，防止没有价值的错误重复消耗流量成本。根据实际情况进行补充
         * 参阅：https://help.aliyun.com/document_detail/58655.html?#sc-ignore
         */
        ignore: {
            ignoreUrls: [],
            ignoreApis: [],
            ignoreErrors: [
                /* 参阅：https://blog.csdn.net/gudeng007/article/details/125765927 */
                'ResizeObserver loop limit exceeded',
                /* 去除Script error.报错信息 */
                /^Script error\.?$/,
            ],
            ignoreResErrors: [
                function (str) {
                    // 关于易聊相关的资源加载不上报
                    if (str && (str.indexOf('https://webcall-oss.easyliao.com') !== -1 || str.indexOf('https://group-live2.easyliao.com') !== -1)) return true; // 不上报
                    return false; // 上报
                },
                /* 忽略非资源型错误（如：页面访问失败） */
                function (resUrl) {
                    var isAsset = /\.(?:js|json|css|ttf|otf|png|ico|icon|jpg|jpeg|svg|gif|webp|bmp|mp3|mp4|wav|ogg|amr|m4a|flac|aac|pdf|xls|xlsx|doc|docx|wps|pdf|ppt|pptx|zip|rar|7z|map|xml|yml|txt|inf|ini|log|md|manifest)(?:\?.*)?$/i.test(resUrl);
                    return !isAsset;
                }
            ]
        },

        /**
         * 采样率，固定为 2，代表 50%。分值越小，百分比，成本越高
         * 参阅：https://help.aliyun.com/document_detail/58655.html?#sc-sample
         */
        sample: 2,

        /**
         * 页面PV采样率，固定为 2，代表 50%。分值越小，百分比，成本越高
         * 参阅：https://help.aliyun.com/document_detail/58655.html?#section-d6m-p69-jiw
         */
        pvSample: 2,
    });
})();
