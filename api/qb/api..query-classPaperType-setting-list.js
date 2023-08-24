/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-classPaperType-setting-list";

        var apiDefinition = {
            api: "qb/business/class-paper-type/setting/list",
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
                    "title": "项目下模块设置列表查询",
                    "description": "项目下模块设置列表查询",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "classUniqueCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classUniqueCode",
                            "@name": "classUniqueCode"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["classId", "classUniqueCode", "projectCode", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "项目下模块设置列表查询",
                    "description": "项目下模块设置列表查询",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["code", "id", "name", "showStatus"],

                        "properties": {
                            "code": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "code",
                                "@name": "code"
                            },

                            "id": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "id",
                                "@name": "id"
                            },

                            "name": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "name",
                                "@name": "name"
                            },

                            "showStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "showStatus",
                                "@name": "showStatus"
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
    var pluginName = "nl:qb/query-classPaperType-setting-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-classPaperType-setting-list.options.js"
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
            "nl:qb/query-classPaperType-setting-list$options=./api..query-classPaperType-setting-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();