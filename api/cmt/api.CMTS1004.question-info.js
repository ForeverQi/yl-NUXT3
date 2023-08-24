/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cmt", apiAlias = "question-info";

        var apiDefinition = {
            api: "qs/push/target/questionnaire/info",
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
                    "title": "用户调查问卷详情",
                    "description": "问卷调查详情",
                    "type": "object",

                    "properties": {
                        "id": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "id",
                            "@name": "id"
                        }
                    },

                    "required": ["id"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "用户调查问卷详情",
                    "description": "问卷调查详情",
                    "type": "object",

                    "properties": {
                        "id": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "id",
                            "@name": "id"
                        },

                        "qnrId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "qnrId",
                            "@name": "qnrId"
                        },

                        "respondentName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "respondentName",
                            "@name": "respondentName"
                        },

                        "title": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "title",
                            "@name": "title"
                        },

                        "brief": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "brief",
                            "@name": "brief"
                        },

                        "expireStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "expireStatus",
                            "@name": "expireStatus"
                        },

                        "questions": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "questions",
                            "@name": "questions"
                        }
                    },

                    "required": [
                        "id",
                        "qnrId",
                        "respondentName",
                        "title",
                        "brief",
                        "expireStatus",
                        "questions"
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
    var pluginName = "nl:cmt/question-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMTS1004.question-info.options.js"
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
            "nl:cmt/question-info$options=./api.CMTS1004.question-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();