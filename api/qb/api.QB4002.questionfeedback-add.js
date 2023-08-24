/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "questionfeedback-add";

        var apiDefinition = {
            api: "qb/questionfeedback/add",
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
                    "title": "错题反馈添加",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionId",
                            "@name": "questionId"
                        },

                        "questionfeedbackType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionfeedbackType",
                            "@name": "questionfeedbackType"
                        },

                        "questionfeedbackMemo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionfeedbackMemo",
                            "@name": "questionfeedbackMemo"
                        },

                        "papertypeCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "papertypeCode",
                            "@name": "papertypeCode"
                        },

                        "paperId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "paperName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperName",
                            "@name": "paperName"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["questionId", "questionfeedbackType", "questionfeedbackMemo", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "错题反馈添加",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "questionfeedbackId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionfeedbackId",
                            "@name": "questionfeedbackId"
                        }
                    },

                    "required": ["questionfeedbackId"]
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
    var pluginName = "nl:qb/questionfeedback-add";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB4002.questionfeedback-add.options.js"
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
            "nl:qb/questionfeedback-add$options=./api.QB4002.questionfeedback-add.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();