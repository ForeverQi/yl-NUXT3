/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-information-catalog-list";

        var apiDefinition = {
            api: "dc/catalog/selectlist",
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
                    "title": "资料分类列表",
                    "description": "查询资料分类列表",
                    "type": "object",

                    "properties": {
                        "catalogAvlstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogAvlstatus",
                            "@name": "catalogAvlstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "Y",
                                "value": "Y"
                            }]
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["catalogAvlstatus", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资料分类列表",
                    "description": "查询资料分类列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "catalogId",
                            "catalogName",
                            "catalogDisplayorder",
                            "catalogCode",
                            "catalogAvlstatus"
                        ],

                        "properties": {
                            "catalogId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogId",
                                "@name": "catalogId"
                            },

                            "catalogName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogName",
                                "@name": "catalogName"
                            },

                            "catalogDisplayorder": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogDisplayorder",
                                "@name": "catalogDisplayorder"
                            },

                            "catalogCode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogCode",
                                "@name": "catalogCode"
                            },

                            "catalogAvlstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "catalogAvlstatus",
                                "@name": "catalogAvlstatus",

                                "@enums": [{
                                    "type": "string",
                                    "name": "Y",
                                    "value": "Y"
                                }, {
                                    "type": "string",
                                    "name": "N",
                                    "value": "N"
                                }]
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
    var pluginName = "nl:dc/query-information-catalog-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2019.query-information-catalog-list.options.js"
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
            "nl:dc/query-information-catalog-list$options=./api.DC2019.query-information-catalog-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();