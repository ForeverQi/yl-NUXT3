/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-catalog-extends";

        var apiDefinition = {
            api: "cc/user/class/info/extend/catalog",
            method: "POST",
            apiAlias: apiAlias,
            apiModuleName: moduleName,

            requestHeadersNameAndEnumMapMethod: function(api, headers) {
                return apiNameAndEnumConvert2(headers, undefined);
            },

            requestQueriesNameAndEnumMapMethod: function(api, queries) {
                return apiNameAndEnumConvert2(queries, undefined);
            },

            requestParamsNameAndEnumMapMethod: function(api, params) {
                return apiNameAndEnumConvert2(params, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "[班级详情-4.0] 班级篇章列表-扩展接口",
                    "description": "篇章扩展接口",
                    "type": "object",

                    "properties": {
                        "classTypeId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classTypeId",
                            "@name": "classTypeId"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": false,
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "electiveShowStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "electiveShowStatus",
                            "@name": "electiveShowStatus"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "@alias": "moduleId",
                            "@name": "modulId"
                        },

                        "courseModulId": {
                            "type": "string",
                            "required": true,
                            "@alias": "courseModulId",
                            "@name": "courseModulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "@alias": "courseId",
                            "@name": "courseId"
                        }
                    },

                    "required": [
                        "classTypeId",
                        "pypId",
                        "classId",
                        "subjectId",
                        "electiveShowStatus",
                        "modulId",
                        "courseModulId",
                        "courseId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "[班级详情-4.0] 班级篇章列表-扩展接口",
                    "description": "篇章扩展接口",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "catalogId",
                            "totalCoursewareCount",
                            "learnedCoursewareCount",
                            "learnedTime"
                        ],

                        "properties": {
                            "catalogId": {
                                "type": "string",
                                "required": true,
                                "@alias": "catalogId",
                                "@name": "catalogId"
                            },

                            "totalCoursewareCount": {
                                "type": "number",
                                "required": true,
                                "@alias": "totalCoursewareCount",
                                "@name": "totalCoursewareCount"
                            },

                            "learnedCoursewareCount": {
                                "type": "number",
                                "required": true,
                                "@alias": "learnedCoursewareCount",
                                "@name": "learnedCoursewareCount"
                            },

                            "learnedTime": {
                                "type": "number",
                                "required": true,
                                "@alias": "learnedTime",
                                "@name": "learnedTime"
                            }
                        }
                    }
                }, {
                    "redundancy": true
                });
            }
        };

        if (null != apiOptions) {
            for (var p in apiOptions) {
                apiDefinition[p] = apiOptions[p];
            }

            api.defineApi(apiDefinition);
        }

        return function(ops) {
            APIModule.ofName(moduleName).callApi(apiAlias, ops);
        };
    };

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:cc/query-class-catalog-extends";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-catalog-extends.options.js"
        ], function() {
            if (typeof defineModule === "function") {
                return defineModule.wrap4amdjs(pluginName, arguments, factory);
            } else {
                return factory(Array.prototype.map.call(arguments, function(r) {
                    return function() {
                        return r;
                    };
                }));
            }
        });
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-class-catalog-extends$options=./api..query-class-catalog-extends.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
