/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-config-model-info";

        var apiDefinition = {
            api: "module/resource/user/query",
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
                    "title": "查询页面模块下的数据信息(用户端)",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "moduleCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleCode",
                            "@name": "moduleCode"
                        },

                        "enableStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "enableStatus",
                            "@name": "enableStatus"
                        },

                        "teacherName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "teacherName",
                            "@name": "teacherName"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": [
                        "columnId",
                        "moduleCode",
                        "enableStatus",
                        "teacherName",
                        "subjectName",
                        "projectId",
                        "pageIndex",
                        "pageSize"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询页面模块下的数据信息(用户端)",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "moduleCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleCode",
                            "@name": "moduleCode"
                        },

                        "showType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showType",
                            "@name": "showType"
                        },

                        "content": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "content",
                            "@name": "content"
                        },

                        "count": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        }
                    },

                    "required": ["columnId", "moduleCode", "showType", "content", "count"]
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
    var pluginName = "nl:channel/query-config-model-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-config-model-info.options.js"
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
            "nl:channel/query-config-model-info$options=./api..query-config-model-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();