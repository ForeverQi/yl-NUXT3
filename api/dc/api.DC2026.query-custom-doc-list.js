/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-custom-doc-list";

        var apiDefinition = {
            api: "dc/doc/list/custom/project",
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
                    "title": "查询干货资料列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "cout",
                            "@name": "pageSize"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType"
                        }
                    },

                    "required": ["clientType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询干货资料列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["docId", "docName", "docTagStringList", "docConverimgUrl", "docPackStatus"],

                        "properties": {
                            "docId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docId",
                                "@name": "docId"
                            },

                            "docName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docName",
                                "@name": "docName"
                            },

                            "docTagStringList": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docTag",
                                "@name": "docTagStringList"
                            },

                            "docConverimgUrl": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docConverimgurl",
                                "@name": "docConverimgUrl"
                            },

                            "docPackStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docPackstatus",
                                "@name": "docPackStatus",

                                "@enums": [{
                                    "type": "string",
                                    "name": "Y",
                                    "value": "yes"
                                }, {
                                    "type": "string",
                                    "name": "N",
                                    "value": "no"
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
    var pluginName = "nl:dc/query-custom-doc-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2026.query-custom-doc-list.options.js"
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
            "nl:dc/query-custom-doc-list$options=./api.DC2026.query-custom-doc-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();