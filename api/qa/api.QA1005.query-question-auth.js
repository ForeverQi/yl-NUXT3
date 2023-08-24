/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qa", apiAlias = "query-question-auth";

        var apiDefinition = {
            api: "qa/question/auth",
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
                    "title": "答疑提问鉴权",
                    "description": "答疑提问鉴权",
                    "type": "object",

                    "properties": {
                        "questionType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionType",
                            "@name": "questionType"
                        },

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
                        }
                    },

                    "required": ["questionType", "projectId", "classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "答疑提问鉴权",
                    "description": "答疑提问鉴权",
                    "type": "object",

                    "properties": {
                        "authStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "authStatus",
                            "@name": "authStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }]
                        },

                        "authMsg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "authMsg",
                            "@name": "authMsg"
                        }
                    },

                    "required": ["authStatus", "authMsg"]
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
    var pluginName = "nl:qa/query-question-auth";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA1005.query-question-auth.options.js"
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
            "nl:qa/query-question-auth$options=./api.QA1005.query-question-auth.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();