/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-class-index-list";

        var apiDefinition = {
            api: "ctc/classtype/web/index/list",
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
                    "title": "官网首页-推荐系统课",
                    "description": "系统科首页推荐列表",
                    "type": "object",

                    "properties": {
                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "projectIds": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        },

                        "areacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "areaCode",
                            "@name": "areacode"
                        },

                        "classtypeShowitem": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeShowitem",
                            "@name": "classtypeShowitem"
                        }
                    },

                    "required": ["projectIds", "areacode", "classtypeShowitem"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "官网首页-推荐系统课",
                    "description": "系统科首页推荐列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "id",
                            "name",
                            "imagePath",
                            "projectId",
                            "classtypeHighlights",
                            "classtypeHotstatus"
                        ],

                        "properties": {
                            "id": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "classtypeId",
                                "@name": "id"
                            },

                            "name": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "classtypeName",
                                "@name": "name"
                            },

                            "imagePath": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "classtypeAppcoverimgurl",
                                "@name": "imagePath"
                            },

                            "projectId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectId",
                                "@name": "projectId"
                            },

                            "classtypeHighlights": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "classtypeHighlights",
                                "@name": "classtypeHighlights"
                            },

                            "classtypeHotstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "classtypeHotstatus",
                                "@name": "classtypeHotstatus"
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
    var pluginName = "nl:mcp/query-class-index-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-index-list.options.js"
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
            "nl:mcp/query-class-index-list$options=./api..query-class-index-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
