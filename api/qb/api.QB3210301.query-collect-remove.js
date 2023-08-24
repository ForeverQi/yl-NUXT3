/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-collect-remove";

        var apiDefinition = {
            api: "qb/collect/remove",
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
                    "title": "用户清空收藏夹记录",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classUniquecode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "subjectIds": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "subjectIds",
                            "@name": "subjectIds"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["classUniquecode", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "用户清空收藏夹记录",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "operationStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "operationStatus",
                            "@name": "operationStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "yes"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "no"
                            }]
                        },

                        "operationStatusDesc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "operationStatusDesc",
                            "@name": "operationStatusDesc"
                        }
                    },

                    "required": ["operationStatus", "operationStatusDesc"]
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
    var pluginName = "nl:qb/query-collect-remove";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB3210301.query-collect-remove.options.js"
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
            "nl:qb/query-collect-remove$options=./api.QB3210301.query-collect-remove.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();