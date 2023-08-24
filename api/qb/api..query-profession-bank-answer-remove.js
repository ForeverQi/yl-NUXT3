/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-profession-bank-answer-remove";

        var apiDefinition = {
            api: "qb/compute/profession-bank/answer/remove",
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
                    "title": "专项题库清空答题记录",
                    "description": "专项题库清空答题记录",
                    "type": "object",

                    "properties": {
                        "professionBankId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "professionBankId",
                            "@name": "professionBankId"
                        },

                        "answerType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answerType",
                            "@name": "answerType",

                            "@enums": [{
                                "type": "string",
                                "name": "all",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "sections",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "random",
                                "value": "R"
                            }]
                        },

                        "sectionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sectionId",
                            "@name": "sectionId"
                        },

                        "questionIds": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "questionIds",
                            "@name": "questionIds"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "sourceId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceId",
                            "@name": "sourceId"
                        }
                    },

                    "required": [
                        "professionBankId",
                        "answerType",
                        "sectionId",
                        "questionIds",
                        "sourceType",
                        "sourceId"
                    ]
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
    var pluginName = "nl:qb/query-profession-bank-answer-remove";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-profession-bank-answer-remove.options.js"
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
            "nl:qb/query-profession-bank-answer-remove$options=./api..query-profession-bank-answer-remove.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();