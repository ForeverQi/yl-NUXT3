/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-catalogs";

        var apiDefinition = {
            api: "cc/user/class/info/catalogs",
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
                    "title": "班级课件页面-科目模块课程篇章列表",
                    "description": "获取课程下的篇章",
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

                        "courseModulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseModulId",
                            "@name": "courseModulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "courseElectiveStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseElectiveStatus",
                            "@name": "courseElectiveStatus"
                        }
                    },

                    "required": [
                        "classId",
                        "classTypeId",
                        "ctapId",
                        "subjectId",
                        "electiveShowStatus",
                        "modulId",
                        "courseModulId",
                        "courseId",
                        "courseElectiveStatus"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "班级课件页面-科目模块课程篇章列表",
                    "description": "获取课程下的篇章",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["catalogId", "catalogName", "catalogElectiveStatus", "studyStatus"],

                        "properties": {
                            "catalogId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogId",
                                "@name": "catalogId"
                            },

                            "catalogName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogName",
                                "@name": "catalogName"
                            },

                            "catalogElectiveStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogElectiveStatus",
                                "@name": "catalogElectiveStatus"
                            },

                            "studyStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "studyStatus",
                                "@name": "studyStatus"
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
    var pluginName = "nl:cc/query-class-catalogs";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-catalogs.options.js"
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
            "nl:cc/query-class-catalogs$options=./api..query-class-catalogs.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
