/* eslint-disable */

(function () {
    var factory = function (getters) {
        var api = getters[0](),
            APIModule = getters[1](),
            apiNameAndEnumConvert2 = getters[2](),
            apiOptions = getters[3]();
        var moduleName = 'cc',
            apiAlias = 'query-learn-course-info';

        var apiDefinition = {
            api: 'cc/user/class/info/play',
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
                    title: '[班级详情-4.0] 根据班级上次学习课件获取视频播放页信息',
                    description: '获取课程信息',
                    type: 'object',

                    properties: {
                        classId: {
                            type: 'string',
                            required: true,
                            '@alias': 'classId',
                            '@name': 'classId',
                        },

                        ctapId: {
                            type: 'string',
                            required: false,
                            '@alias': 'ctapId',
                            '@name': 'ctapId',
                        },

                        coursewareId: {
                            type: 'string',
                            required: true,
                            '@alias': 'coursewareId',
                            '@name': 'coursewareId',
                        },
                    },

                    required: ['classId', 'coursewareId'],
                });
            },

            responseDataNameAndEnumMapMethod: function (api, data) {
                return apiNameAndEnumConvert2(
                    data,
                    {
                        id: 'http://json-schema.org/draft-04/schema#',
                        $schema: 'http://json-schema.org/draft-04/schema#',
                        title: '[班级详情-4.0] 根据班级上次学习课件获取视频播放页信息',
                        description: '获取课程信息',
                        type: 'object',

                        properties: {
                            classTypeId: {
                                type: 'string',
                                required: true,
                                '@alias': 'classTypeId',
                                '@name': 'classTypeId',
                            },

                            classId: {
                                type: 'string',
                                required: true,
                                '@alias': 'classId',
                                '@name': 'classId',
                            },

                            projectId: {
                                type: 'string',
                                required: true,
                                '@alias': 'projectId',
                                '@name': 'projectId',
                            },

                            pypId: {
                                type: 'string',
                                required: true,
                                '@alias': 'pypId',
                                '@name': 'pypId',
                            },

                            subjectId: {
                                type: 'string',
                                required: true,
                                '@alias': 'subjectId',
                                '@name': 'subjectId',
                            },

                            subjectName: {
                                type: 'string',
                                required: true,
                                '@alias': 'subjectName',
                                '@name': 'subjectName',
                            },

                            electiveShowStatus: {
                                type: 'string',
                                required: true,
                                '@alias': 'electiveShowStatus',
                                '@name': 'electiveShowStatus',
                            },

                            courseModulId: {
                                type: 'string',
                                required: true,
                                '@alias': 'courseModulId',
                                '@name': 'courseModulId',
                            },

                            modulId: {
                                type: 'string',
                                required: true,
                                '@alias': 'modulId',
                                '@name': 'modulId',
                            },

                            modulName: {
                                type: 'string',
                                required: true,
                                '@alias': 'modulName',
                                '@name': 'modulName',
                            },

                            courseId: {
                                type: 'string',
                                required: true,
                                '@alias': 'courseId',
                                '@name': 'courseId',
                            },

                            courseName: {
                                type: 'string',
                                required: true,
                                '@alias': 'courseName',
                                '@name': 'courseName',
                            },

                            catalogShowStatus: {
                                type: 'string',
                                required: true,
                                '@alias': 'catalogShowStatus',
                                '@name': 'catalogShowStatus',
                            },

                            courseScheduleStatus: {
                                type: 'string',
                                required: true,
                                '@alias': 'courseScheduleStatus',
                                '@name': 'courseScheduleStatus',
                            },

                            courseElectiveStatus: {
                                type: 'string',
                                required: true,
                                '@alias': 'courseElectiveStatus',
                                '@name': 'courseElectiveStatus',
                            },

                            className: {
                                type: 'string',
                                required: true,
                                default: '',
                                '@alias': 'className',
                                '@name': 'className',
                            },
                        },

                        required: [
                            'classTypeId',
                            'classId',
                            'projectId',
                            'pypId',
                            'subjectId',
                            'subjectName',
                            'electiveShowStatus',
                            'courseModulId',
                            'modulId',
                            'modulName',
                            'courseId',
                            'courseName',
                            'catalogShowStatus',
                            'courseScheduleStatus',
                            'courseElectiveStatus',
                            'className',
                        ],
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
    var pluginName = 'nl:cc/query-learn-course-info';

    if (typeof define === 'function') {
        define([
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js',
            '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js',
            '@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js',
            './api..query-learn-course-info.options.js',
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
                'nl:cc/query-learn-course-info$options=./api..query-learn-course-info.options.js',
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
