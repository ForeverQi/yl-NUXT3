/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-project-hot-trial-list";

        var apiDefinition = {
            api: "mcp/trialWeb/web/hotLive",
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
                    "title": "项目热推体验课列表",
                    "description": "项目下热推好课列表",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "findCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "findCount",
                            "@name": "findCount"
                        },

                        "showClient": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient",

                            "@enums": [{
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }]
                        }
                    },

                    "required": ["findCount", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "项目热推体验课列表",
                    "description": "项目下热推好课列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "goodsName",
                            "saleTagName",
                            "coursePromotionType",
                            "coursePromotionEndTime",
                            "coursePromotionStartTime",
                            "coursePicPath",
                            "coursePromotionPrice",
                            "coursewareCount",
                            "coursePrice",
                            "goodsId",
                            "projectShortName",
                            "realTimePromotionType",
                            "currentTime",
                            "courseBright"
                        ],

                        "properties": {
                            "goodsName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsName",
                                "@name": "goodsName"
                            },

                            "saleTagName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "saleTagName",
                                "@name": "saleTagName"
                            },

                            "coursePromotionType": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotiontype",
                                "@name": "coursePromotionType",

                                "@enums": [{
                                    "type": "string",
                                    "name": "N",
                                    "value": "N"
                                }, {
                                    "type": "string",
                                    "name": "F",
                                    "value": "F"
                                }, {
                                    "type": "string",
                                    "name": "L",
                                    "value": "L"
                                }, {
                                    "type": "string",
                                    "name": "S",
                                    "value": "S"
                                }]
                            },

                            "coursePromotionEndTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionendtime",
                                "@name": "coursePromotionEndTime"
                            },

                            "coursePromotionStartTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionstarttime",
                                "@name": "coursePromotionStartTime"
                            },

                            "coursePicPath": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePicpath",
                                "@name": "coursePicPath"
                            },

                            "coursePromotionPrice": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionprice",
                                "@name": "coursePromotionPrice"
                            },

                            "coursewareCount": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareCount",
                                "@name": "coursewareCount"
                            },

                            "coursePrice": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePrice",
                                "@name": "coursePrice"
                            },

                            "goodsId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsId",
                                "@name": "goodsId"
                            },

                            "projectShortName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectShortname",
                                "@name": "projectShortName"
                            },

                            "realTimePromotionType": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "realTimePromotionType",
                                "@name": "realTimePromotionType"
                            },

                            "currentTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "currentTime",
                                "@name": "currentTime"
                            },

                            "courseBright": {
                                "type": "array",
                                "required": true,
                                "default": "",
                                "items": {},
                                "@alias": "courseBright",
                                "@name": "courseBright"
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
    var pluginName = "nl:mcp/query-project-hot-trial-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-project-hot-trial-list.options.js"
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
            "nl:mcp/query-project-hot-trial-list$options=./api..query-project-hot-trial-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();