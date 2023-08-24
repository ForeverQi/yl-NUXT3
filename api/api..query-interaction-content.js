/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-interaction-content";

        var apiDefinition = {
            api: "igt/user/interaction/answersheet/list",
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
                    "title": "用户互动内容",
                    "description": "查询ai互动内容",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        }
                    },

                    "required": ["classId", "coursewareId", "answersheetId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "用户互动内容",
                    "description": "查询ai互动内容",
                    "type": "object",

                    "properties": {
                        "content": {
                            "type": "string",
                            "required": false,
                            "@alias": "content",
                            "@name": "content"
                        },

                        "appContent": {
                            "type": "string",
                            "required": false,
                            "@alias": "appContent",
                            "@name": "appContent"
                        },

                        "interactionId": {
                            "type": "string",
                            "required": false,
                            "@alias": "interactionId",
                            "@name": "interactionId"
                        },

                        "type": {
                            "type": "string",
                            "required": false,
                            "@alias": "type",
                            "@name": "type"
                        },

                        "role": {
                            "type": "string",
                            "required": false,
                            "@alias": "role",
                            "@name": "role"
                        },

                        "roleName": {
                            "type": "string",
                            "required": false,
                            "@alias": "roleName",
                            "@name": "roleName"
                        },

                        "filePath": {
                            "type": "string",
                            "required": false,
                            "@alias": "filePath",
                            "@name": "filePath"
                        },

                        "questionId": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionId",
                            "@name": "questionId"
                        },

                        "mediaDuration": {
                            "type": "number",
                            "required": false,
                            "@alias": "mediaDuration",
                            "@name": "mediaDuration"
                        },

                        "questionContent": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionContent",
                            "@name": "questionContent"
                        },

                        "pcQuestionContent": {
                            "type": "string",
                            "required": false,
                            "@alias": "pcQuestionContent",
                            "@name": "pcQuestionContent"
                        },

                        "questionType": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionType",
                            "@name": "questionType"
                        }
                    },

                    "required": []
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
    var pluginName = "nl:cc/query-interaction-content";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-interaction-content.options.js"
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
            "nl:cc/query-interaction-content$options=./api..query-interaction-content.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();