/* eslint-disable */

(function () {
    var factory = function (getters) {
        var api = getters[0](),
            APIModule = getters[1](),
            apiNameAndEnumConvert2 = getters[2](),
            apiOptions = getters[3]();
        var moduleName = 'cc',
            apiAlias = 'query-attachment-real-path';

        var apiDefinition = {
            api: 'cc/user/download/courseware/log/save',
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
                    title: '获取附件真实下载路径-添加下载记录',
                    description: '获取附件的真是下载路径',
                    type: 'object',

                    properties: {
                        modulId: {
                            type: 'string',
                            required: true,
                            '@alias': 'modulId',
                            '@name': 'modulId',
                        },

                        courseId: {
                            type: 'string',
                            required: true,
                            '@alias': 'courseId',
                            '@name': 'courseId',
                        },

                        catalogId: {
                            type: 'string',
                            required: true,
                            '@alias': 'catalogId',
                            '@name': 'catalogId',
                        },

                        coursewareId: {
                            type: 'string',
                            required: true,
                            '@alias': 'coursewareId',
                            '@name': 'coursewareId',
                        },

                        classId: {
                            type: 'string',
                            required: true,
                            '@alias': 'classId',
                            '@name': 'classId',
                        },

                        downloadIp: {
                            type: 'string',
                            required: false,
                            '@alias': 'downloadIp',
                            '@name': 'downloadIp',
                        },

                        downloadDevice: {
                            type: 'string',
                            required: false,
                            '@alias': 'downloadDevice',
                            '@name': 'downloadDevice',
                        },

                        downloadDeviceName: {
                            type: 'string',
                            required: false,
                            '@alias': 'downloadDeviceName',
                            '@name': 'downloadDeviceName',
                        },

                        downloadDeviceSystem: {
                            type: 'string',
                            required: false,
                            '@alias': 'downloadDeviceSystem',
                            '@name': 'downloadDeviceSystem',
                        },

                        downloadDeviceVersion: {
                            type: 'string',
                            required: false,
                            '@alias': 'downloadDeviceVersion',
                            '@name': 'downloadDeviceVersion',
                        },

                        cowresourceId: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'cowresourceId',
                            '@name': 'cowresourceId',
                        },
                    },

                    required: ['modulId', 'courseId', 'catalogId', 'coursewareId', 'classId', 'cowresourceId'],
                });
            },

            responseDataNameAndEnumMapMethod: function (api, data) {
                return apiNameAndEnumConvert2(
                    data,
                    {
                        id: 'http://json-schema.org/draft-04/schema#',
                        $schema: 'http://json-schema.org/draft-04/schema#',
                        title: '获取附件真实下载路径-添加下载记录',
                        description: '获取附件的真是下载路径',
                        type: 'object',

                        properties: {
                            coursewareDownloadUrl: {
                                type: 'string',
                                required: false,
                                '@alias': 'coursewareDownloadUrl',
                                '@name': 'coursewareDownloadUrl',
                            },
                        },

                        required: [],
                    },
                    {
                        redundancy: true,
                    }
                );
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
    var pluginName = 'nl:cc/query-attachment-real-path';

    if (typeof define === 'function') {
        define([
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js',
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js',
            '@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js',
            './api..query-attachment-real-path.options.js',
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
                'nl:cc/query-attachment-real-path$options=./api..query-attachment-real-path.options.js',
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
