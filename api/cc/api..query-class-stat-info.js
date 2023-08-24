/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-stat-info";

        var apiDefinition = {
            api: "cc/my/class/stat/info",
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
                    "title": "我的班级统计详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        }
                    },

                    "required": ["classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的班级统计详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "className": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "className",
                            "@name": "className"
                        },

                        "moduls": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["modulId", "modulName", "modulCount", "modulLearnedCount", "courses"],

                                "properties": {
                                    "modulId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modulId",
                                        "@name": "modulId"
                                    },

                                    "modulName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modulName",
                                        "@name": "modulName"
                                    },

                                    "modulCount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modulCount",
                                        "@name": "modulCount"
                                    },

                                    "modulLearnedCount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modulLearnedCount",
                                        "@name": "modulLearnedCount"
                                    },

                                    "courses": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["courseId", "courseName", "courseCount", "courseLearnedCount"],

                                            "properties": {
                                                "courseId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseId",
                                                    "@name": "courseId"
                                                },

                                                "courseName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseName",
                                                    "@name": "courseName"
                                                },

                                                "courseCount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseCount",
                                                    "@name": "courseCount"
                                                },

                                                "courseLearnedCount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseLearnedCount",
                                                    "@name": "courseLearnedCount"
                                                }
                                            }
                                        },

                                        "@alias": "courses",
                                        "@name": "courses"
                                    }
                                }
                            },

                            "@alias": "moduls",
                            "@name": "moduls"
                        }
                    },

                    "required": ["classId", "className", "moduls"]
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
    var pluginName = "nl:cc/query-class-stat-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-stat-info.options.js"
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
            "nl:cc/query-class-stat-info$options=./api..query-class-stat-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();