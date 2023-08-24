/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "query-column-by-project-id";

        var apiDefinition = {
            api: "cp/info/column/list",
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
                    "title": "根据项目id获取栏目列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "ccProjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ccProjectId",
                            "@name": "ccProjectId"
                        }
                    },

                    "required": ["ccProjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据项目id获取栏目列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["ccName", "ccId", "ccAreaStatus", "subCmsColumns"],

                        "properties": {
                            "ccName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "ccName",
                                "@name": "ccName"
                            },

                            "ccId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "ccId",
                                "@name": "ccId"
                            },

                            "ccAreaStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "ccAreaStatus",
                                "@name": "ccAreaStatus"
                            },

                            "subCmsColumns": {
                                "type": "array",
                                "required": true,
                                "default": "",

                                "items": {
                                    "type": "object",
                                    "required": ["subCcName", "subCcId"],

                                    "properties": {
                                        "subCcName": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "subCcName",
                                            "@name": "subCcName"
                                        },

                                        "subCcId": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "subCcId",
                                            "@name": "subCcId"
                                        }
                                    }
                                },

                                "@alias": "subCmsColumns",
                                "@name": "subCmsColumns"
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
    var pluginName = "nl:cp/query-column-by-project-id";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-column-by-project-id.options.js"
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
            "nl:cp/query-column-by-project-id$options=./api..query-column-by-project-id.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();