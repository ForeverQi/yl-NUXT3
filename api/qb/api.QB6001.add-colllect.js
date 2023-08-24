/* eslint-disable */

(function () {
    var factory = function (getters) {
        var api = getters[0](),
            APIModule = getters[1](),
            apiNameAndEnumConvert2 = getters[2](),
            apiOptions = getters[3]();
        var moduleName = 'qb',
            apiAlias = 'add-colllect';

        var apiDefinition = {
            api: 'qb/collect/add',
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
                    title: '用户收藏',
                    description: '',
                    type: 'object',

                    properties: {
                        collectContenttype: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'collectContenttype',
                            '@name': 'collectContenttype',

                            '@enums': [
                                {
                                    type: 'string',
                                    name: 'paper',
                                    value: 'P',
                                },
                                {
                                    type: 'string',
                                    name: 'question',
                                    value: 'Q',
                                },
                            ],
                        },

                        collectContent: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'collectContent',
                            '@name': 'collectContent',
                        },

                        subjectId: {
                            type: 'string',
                            required: false,
                            default: '',
                            '@alias': 'subjectId',
                            '@name': 'subjectId',
                        },

                        classUniquecode: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'classUniqueCode',
                            '@name': 'classUniquecode',
                        },

                        sourceType: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'sourceType',
                            '@name': 'sourceType',
                        },

                        collectRemark: {
                            type: 'string',
                            required: true,
                            default: '',
                            '@alias': 'collectRemark',
                            '@name': 'collectRemark',
                        },
                    },

                    required: ['collectContenttype', 'collectContent', 'classUniquecode', 'sourceType', 'collectRemark'],
                });
            },

            responseDataNameAndEnumMapMethod: function (api, data) {
                return apiNameAndEnumConvert2(
                    data,
                    {
                        id: 'http://json-schema.org/draft-04/schema#',
                        $schema: 'http://json-schema.org/draft-04/schema#',
                        title: '用户收藏',
                        description: '',
                        type: 'object',

                        properties: {
                            collectId: {
                                type: 'string',
                                required: true,
                                default: '',
                                '@alias': 'collectId',
                                '@name': 'collectId',
                            },
                        },

                        required: ['collectId'],
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
    var pluginName = 'nl:qb/add-colllect';

    if (typeof define === 'function') {
        define([
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js',
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js',
            '@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js',
            './api.QB6001.add-colllect.options.js',
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
                'nl:qb/add-colllect$options=./api.QB6001.add-colllect.options.js',
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
