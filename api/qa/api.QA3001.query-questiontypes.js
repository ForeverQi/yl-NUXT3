/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qa", apiAlias = "query-questiontypes";

        var apiDefinition = {
            api: "qa/web/questiontypes",
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
                return apiNameAndEnumConvert2(params, undefined);
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取问题类型列表",
                    "description": "获取问题类型列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "questionTypeId",
                            "questionTypeName",
                            "questionTypeDescription",
                            "questionTypeSourceId"
                        ],

                        "properties": {
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

                            "questionTypeSourceId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "questionTypeSourceId",
                                "@name": "questionTypeSourceId"
                            }
                        }
                    }
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
    var pluginName = "nl:qa/query-questiontypes";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA3001.query-questiontypes.options.js"
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
            "nl:qa/query-questiontypes$options=./api.QA3001.query-questiontypes.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();