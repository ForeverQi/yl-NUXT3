/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qa", apiAlias = "add-question";

        var apiDefinition = {
            api: "qa/web/question/add",
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
                    "title": "提交一个问题",
                    "description": "提交一个问题",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "questionTypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionTypeId",
                            "@name": "questionTypeId"
                        },

                        "description": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "description",
                            "@name": "description"
                        },

                        "images": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "images",
                            "@name": "images"
                        },

                        "qaDeviceInfoDto": {
                            "type": "object",
                            "required": ["deviceType", "ip", "systemVersion", "brand", "phoneModel", "version"],
                            "default": "",

                            "properties": {
                                "deviceType": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "deviceType",
                                    "@name": "deviceType"
                                },

                                "ip": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "ip",
                                    "@name": "ip"
                                },

                                "systemVersion": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "systemVersion",
                                    "@name": "systemVersion"
                                },

                                "brand": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "brand",
                                    "@name": "brand"
                                },

                                "phoneModel": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "phoneModel",
                                    "@name": "phoneModel"
                                },

                                "version": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "version",
                                    "@name": "version"
                                }
                            },

                            "@alias": "qaDeviceInfoDto",
                            "@name": "qaDeviceInfoDto"
                        },

                        "questionSourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionSourceType",
                            "@name": "questionSourceType",

                            "@enums": [{
                                "type": "string",
                                "name": "C",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "L",
                                "value": "L"
                            }, {
                                "type": "string",
                                "name": "F",
                                "value": "F"
                            }, {
                                "type": "string",
                                "name": "Q",
                                "value": "Q"
                            }]
                        },

                        "qaQcPostVo": {
                            "type": "object",
                            "required": ["classId", "courseId", "courseWareId"],
                            "default": "",

                            "properties": {
                                "classId": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "classId",
                                    "@name": "classId"
                                },

                                "courseId": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "courseId",
                                    "@name": "courseId"
                                },

                                "courseWareId": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "courseWareId",
                                    "@name": "courseWareId"
                                }
                            },

                            "@alias": "qaQcPostVo",
                            "@name": "qaQcPostVo"
                        }
                    },

                    "required": [
                        "projectId",
                        "subjectId",
                        "questionTypeId",
                        "description",
                        "images",
                        "qaDeviceInfoDto",
                        "questionSourceType",
                        "qaQcPostVo"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "提交一个问题",
                    "description": "提交一个问题",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionId",
                            "@name": "questionId"
                        }
                    },

                    "required": ["questionId"]
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
    var pluginName = "nl:qa/add-question";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0004.add-question.options.js"
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
            "nl:qa/add-question$options=./api.QA0004.add-question.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();