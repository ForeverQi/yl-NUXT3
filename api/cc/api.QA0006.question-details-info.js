/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "question-details-info";

        var apiDefinition = {
            api: "qa/web/question/details/info",
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
                    "title": "获取一个问题详情（只包括问题）",
                    "description": "获取一个问题详情（只包括问题）",
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
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取一个问题详情（只包括问题）",
                    "description": "获取一个问题详情（只包括问题）",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "questionTypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionTypeId",
                            "@name": "questionTypeId"
                        },

                        "questionTypeName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionTypeName",
                            "@name": "questionTypeName"
                        },

                        "questionTypeDescription": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionTypeDescription",
                            "@name": "questionTypeDescription"
                        },

                        "questionCreatedDate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionCreatedDate",
                            "@name": "questionCreatedDate"
                        },

                        "questionContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionContent",
                            "@name": "questionContent"
                        },

                        "questionFilePath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionFilePath",
                            "@name": "questionFilePath"
                        }
                    },

                    "required": [
                        "projectId",
                        "projectName",
                        "subjectId",
                        "subjectName",
                        "questionTypeId",
                        "questionTypeName",
                        "questionTypeDescription",
                        "questionCreatedDate",
                        "questionContent",
                        "questionFilePath"
                    ]
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
    var pluginName = "nl:cc/question-details-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0006.question-details-info.options.js"
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
            "nl:cc/question-details-info$options=./api.QA0006.question-details-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();