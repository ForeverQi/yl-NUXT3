/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "question-update";

        var apiDefinition = {
            api: "qa/web/question/update",
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
                    "title": "修改一个问题（学习答疑）",
                    "description": "修改一个问题（学习答疑）",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionId",
                            "@name": "questionId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
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
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "images",
                            "@name": "images"
                        },

                        "qaDeviceInfoDto": {
                            "type": "object",
                            "required": [],
                            "default": "",

                            "properties": {
                                "deviceType": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "deviceType",
                                    "@name": "deviceType"
                                },

                                "version": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "version",
                                    "@name": "version"
                                },

                                "systemVersion": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "systemVersion",
                                    "@name": "systemVersion"
                                },

                                "brand": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "brand",
                                    "@name": "brand"
                                },

                                "phoneModel": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "phoneModel",
                                    "@name": "phoneModel"
                                }
                            },

                            "@alias": "qaDeviceInfoDto",
                            "@name": "qaDeviceInfoDto"
                        }
                    },

                    "required": ["questionId", "subjectId", "description"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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
    var pluginName = "nl:cc/question-update";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0005.question-update.options.js"
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
            "nl:cc/question-update$options=./api.QA0005.question-update.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();