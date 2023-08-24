/* eslint-disable */

(function () {
    var factory = function (getters) {
        var api = getters[0](),
            APIModule = getters[1](),
            apiNameAndEnumConvert2 = getters[2](),
            apiOptions = getters[3]();
        var moduleName = 'cc',
            apiAlias = 'query-video-info';

        var apiDefinition = {
            api: 'cc/user/polyv/video/size',
            method: 'POST',
            apiAlias: apiAlias,
            apiModuleName: moduleName,

            requestHeadersNameAndEnumMapMethod: function (api, headers) {
                return apiNameAndEnumConvert2(headers, undefined);
            },

            requestQueriesNameAndEnumMapMethod: function (api, queries) {
                return apiNameAndEnumConvert2(queries, undefined);
            },

            requestParamsNameAndEnumMapMethod: function (api, params) {
                return apiNameAndEnumConvert2(params, {
                    id: 'http://json-schema.org/draft-04/schema#',
                    $schema: 'http://json-schema.org/draft-04/schema#',
                    title: '获取保利威视视频尺寸信息',
                    description: '获取视频尺寸信息',
                    type: 'object',

                    properties: {
                        videoId: {
                            type: 'string',
                            required: true,
                            '@alias': 'videoId',
                            '@name': 'videoId',
                        },
                    },

                    required: ['videoId'],
                });
            },

            responseDataNameAndEnumMapMethod: function (api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
                    redundancy: true,
                });
            },
        };

        if (null != apiOptions) {
            for (var p in apiOptions) {
                apiDefinition[p] = apiOptions[p];
            }

            api.defineApi(apiDefinition);
        }

        return function (ops) {
            APIModule.ofName(moduleName).callApi(apiAlias, ops);
        };
    };

    var defineModule = new Function('return this')().defineModule;
    var pluginName = 'nl:cc/query-video-info';

    if (typeof define === 'function') {
        define([
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js',
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js',
            '@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js',
            './api..query-video-info.options.js',
        ], function () {
            if (typeof defineModule === 'function') {
                return defineModule.wrap4amdjs(pluginName, arguments, factory);
            } else {
                return factory(
                    Array.prototype.map.call(arguments, function (r) {
                        return function () {
                            return r;
                        };
                    })
                );
            }
        });
    } else if (typeof defineModule === 'function') {
        defineModule(
            pluginName,
            [
                'nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js',
                'nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js',
                'apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js',
                'nl:cc/query-video-info$options=./api..query-video-info.options.js',
            ],
            factory,
            defineModule.isEnvNode()
                ? {
                      module: module,
                  }
                : null
        );
    }
})();
