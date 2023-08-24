/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "igt", apiAlias = "feedback-save";

        var apiDefinition = {
            api: "igt/feedback/save",
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
                    "title": "意见反馈接口",
                    "description": "意见反馈接口（点赞，取消点赞）,用于页面学习报告，测评报告",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

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

                        "feedbackType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "feedbackType",
                            "@name": "feedbackType"
                        },

                        "feedbackStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "feedbackStatus",
                            "@name": "feedbackStatus"
                        },

                        "feedbackLabel": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "feedbackLabel",
                            "@name": "feedbackLabel"
                        },

                        "feedbackMemo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "feedbackMemo",
                            "@name": "feedbackMemo"
                        },

                        "picUrls": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "picUrls",
                            "@name": "picUrls"
                        }
                    },

                    "required": ["projectId", "classId", "className", "feedbackType", "feedbackStatus"]
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
    var pluginName = "nl:igt/feedback-save";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..feedback-save.options.js"
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
            "nl:igt/feedback-save$options=./api..feedback-save.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();