/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-modul-modulinstpaper-status";

        var apiDefinition = {
            api: "cc/modul/modulinstpaper/status",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "查询班级模块下科目测评信息",
                    "description": "查询班级模块下科目测评信息",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulId",
                            "@name": "modulId"
                        }
                    },

                    "required": ["classId", "modulId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询班级模块下科目测评信息",
                    "description": "查询班级模块下科目测评信息",
                    "type": "object",

                    "properties": {
                        "modulinstEnableStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulinstEnableStatus",
                            "@name": "modulinstEnableStatus"
                        },

                        "existPaperStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "existPaperStatus",
                            "@name": "existPaperStatus"
                        },

                        "existAnswersheetStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "existAnswersheetStatus",
                            "@name": "existAnswersheetStatus"
                        }
                    },

                    "required": ["modulinstEnableStatus", "existPaperStatus", "existAnswersheetStatus"]
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

    var pluginName = "nl:cc/query-modul-modulinstpaper-status";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CC8009.query-modul-modulinstpaper-status.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-modul-modulinstpaper-status$options=./api.CC8009.query-modul-modulinstpaper-status.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
