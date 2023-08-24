/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "learntool", apiAlias = "learnTool-columnRecommondList";

        var apiDefinition = {
            api: "learnTool/user/columnRecommondList",
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
                    "title": "频道页首推主推学习工具",
                    "description": "网站通用导航栏、频道页主推区域",
                    "type": "object",

                    "properties": {
                        "columnCategoryId": {
                            "type": "string",
                            "required": false,
                            "@alias": "columnCategoryId",
                            "@name": "columnCategoryId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "频道页首推主推学习工具",
                    "description": "网站通用导航栏、频道页主推区域",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": [],

                        "properties": {
                            "learnToolTypeId": {
                                "type": "string",
                                "required": false,
                                "@alias": "learnToolTypeId",
                                "@name": "learnToolTypeId"
                            },

                            "typeName": {
                                "type": "string",
                                "required": false,
                                "@alias": "typeName",
                                "@name": "typeName"
                            },

                            "sort": {
                                "type": "string",
                                "required": false,
                                "@alias": "sort",
                                "@name": "sort"
                            },

                            "content": {
                                "type": "string",
                                "required": false,
                                "@alias": "content",
                                "@name": "content"
                            },

                            "learnToolName": {
                                "type": "string",
                                "required": false,
                                "@alias": "learnToolName",
                                "@name": "learnToolName"
                            },

                            "slogan": {
                                "type": "string",
                                "required": false,
                                "@alias": "slogan",
                                "@name": "slogan"
                            },

                            "learnTypeContent": {
                                "type": "string",
                                "required": false,
                                "@alias": "learnTypeContent",
                                "@name": "learnTypeContent"
                            },

                            "jumpLinkUrl": {
                                "type": "string",
                                "required": false,
                                "@alias": "jumpLinkUrl",
                                "@name": "jumpLinkUrl"
                            },

                            "publicityPhotoUrl": {
                                "type": "string",
                                "required": false,
                                "@alias": "publicityPhotoUrl",
                                "@name": "publicityPhotoUrl"
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
    var pluginName = "nl:learntool/learnTool-columnRecommondList";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..learnTool-columnRecommondList.options.js"
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
            "nl:learntool/learnTool-columnRecommondList$options=./api..learnTool-columnRecommondList.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();