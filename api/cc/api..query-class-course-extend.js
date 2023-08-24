/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-course-extend";

        var apiDefinition = {
            api: "cc/user/class/info/extend/course",
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
                    "title": "科目模块课程扩展列表",
                    "description": "科目模块课程扩展列表",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "classTypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classTypeId",
                            "@name": "classTypeId"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "electiveShowStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "electiveShowStatus",
                            "@name": "electiveShowStatus"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleId",
                            "@name": "modulId"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pypId",
                            "@name": "pypId"
                        }
                    },

                    "required": [
                        "classId",
                        "classTypeId",
                        "ctapId",
                        "subjectId",
                        "electiveShowStatus",
                        "modulId",
                        "pypId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "科目模块课程扩展列表",
                    "description": "科目模块课程扩展列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "courseId",
                            "learnedCoursewareCount",
                            "totalCoursewareCount",
                            "learnedTime"
                        ],

                        "properties": {
                            "courseId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "courseId",
                                "@name": "courseId"
                            },

                            "learnedCoursewareCount": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "learnedCoursewareCount",
                                "@name": "learnedCoursewareCount"
                            },

                            "totalCoursewareCount": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "totalCoursewareCount",
                                "@name": "totalCoursewareCount"
                            },

                            "learnedTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
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
    var pluginName = "nl:cc/query-class-course-extend";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-course-extend.options.js"
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
            "nl:cc/query-class-course-extend$options=./api..query-class-course-extend.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
