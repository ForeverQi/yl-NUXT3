/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "public", apiAlias = "query-resource-web-content";

        var apiDefinition = {
            api: "module/resource/web/content",
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
                    "title": "获取模块资源的内容",
                    "description": "1、首页获取导航logo中使用 2、频道页题库一中获取广告图片中使用",
                    "type": "object",

                    "properties": {
                        "moduleCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleCode",
                            "@name": "moduleCode"
                        },

                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        }
                    },

                    "required": ["moduleCode", "columnId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取模块资源的内容",
                    "description": "1、首页获取导航logo中使用 2、频道页题库一中获取广告图片中使用",
                    "type": "object",

                    "properties": {
                        "logoName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "logoName",
                            "@name": "logoName"
                        },

                        "logoPath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "logoPath",
                            "@name": "logoPath"
                        },

                        "jumpLinkUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "jumpLinkUrl",
                            "@name": "jumpLinkUrl"
                        },

                        "imgUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "imgUrl",
                            "@name": "imgUrl"
                        }
                    },

                    "required": ["logoName", "logoPath", "jumpLinkUrl", "imgUrl"]
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
    var pluginName = "nl:public/query-resource-web-content";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-resource-web-content.options.js"
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
            "nl:public/query-resource-web-content$options=./api..query-resource-web-content.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();