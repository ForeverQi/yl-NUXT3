/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "query-order-rank-dict";

        var apiDefinition = {
            api: "uc/dict/rank",
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
                    "title": "字典层级-课获取订单中心证件类型",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pId",
                            "@name": "pId"
                        },

                        "dictId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dictId",
                            "@name": "dictId"
                        },

                        "rank": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "rank",
                            "@name": "rank"
                        },

                        "isTree": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isTree",
                            "@name": "isTree"
                        },

                        "dicttype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dicttype",
                            "@name": "dicttype",

                            "@enums": [{
                                "type": "string",
                                "name": "idcard",
                                "value": "idcard"
                            }, {
                                "type": "string",
                                "name": "drawee",
                                "value": "drawee"
                            }]
                        }
                    },

                    "required": ["pId", "dictId", "rank", "isTree", "dicttype"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "字典层级-课获取订单中心证件类型",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": []
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

    var pluginName = "nl:uc/query-order-rank-dict";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.UC0206.query-order-rank-dict.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/query-order-rank-dict$options=./api.UC0206.query-order-rank-dict.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();