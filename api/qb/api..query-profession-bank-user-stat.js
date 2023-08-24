/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-profession-bank-user-stat";

        var apiDefinition = {
            api: "qb/business/profession-bank/user/stat",
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
                    "title": "专项题库用户统计",
                    "description": "专项题库用户统计。 共几题、答几题、收藏几题、正确几题、错误几题、正确率",
                    "type": "object",

                    "properties": {
                        "professionBankId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "professionBankId",
                            "@name": "professionBankId"
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

                    "required": ["professionBankId", "sourceType", "sourceId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "专项题库用户统计",
                    "description": "专项题库用户统计。 共几题、答几题、收藏几题、正确几题、错误几题、正确率",
                    "type": "object",

                    "properties": {
                        "professionBankId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "professionBankId",
                            "@name": "professionBankId"
                        },

                        "total": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "total",
                            "@name": "total"
                        },

                        "answerTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerTotal",
                            "@name": "answerTotal"
                        },

                        "collectTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "collectTotal",
                            "@name": "collectTotal"
                        },

                        "errorTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "errorTotal",
                            "@name": "errorTotal"
                        },

                        "rightTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "rightTotal",
                            "@name": "rightTotal"
                        },

                        "rightRate": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "rightRate",
                            "@name": "rightRate"
                        }
                    },

                    "required": [
                        "professionBankId",
                        "total",
                        "answerTotal",
                        "collectTotal",
                        "errorTotal",
                        "rightTotal",
                        "rightRate"
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
    var pluginName = "nl:qb/query-profession-bank-user-stat";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-profession-bank-user-stat.options.js"
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
            "nl:qb/query-profession-bank-user-stat$options=./api..query-profession-bank-user-stat.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();