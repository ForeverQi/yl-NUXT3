/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-project-channel-trial-course-list";

        var apiDefinition = {
            api: "mcp/trialWeb/web/column/list",
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
                    "title": "频道页-体验课列表",
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

                        "findCount": {
                            "type": "string",
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
                            "@name": "showClient"
                        }
                    },

                    "required": ["columnId", "findCount", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "频道页-体验课列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "firstProjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "firstProjectId",
                            "@name": "firstProjectId"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "goodsName",
                                    "saleTagName",
                                    "coursePromotiontype",
                                    "coursePromotionendtime",
                                    "coursePromotionstarttime",
                                    "coursePromotionstarttime",
                                    "coursePicpath",
                                    "coursePromotionprice",
                                    "coursewareCount",
                                    "coursePrice",
                                    "goodsId",
                                    "projectShortname",
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

                                    "coursePromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotiontype",
                                        "@name": "coursePromotiontype"
                                    },

                                    "coursePromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionendtime",
                                        "@name": "coursePromotionendtime"
                                    },

                                    "coursePromotionstarttime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionendtime",
                                        "@name": "coursePromotionstarttime"
                                    },

                                    "coursePicpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePicpath",
                                        "@name": "coursePicpath"
                                    },

                                    "coursePromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionprice",
                                        "@name": "coursePromotionprice"
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

                                    "projectShortname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectShortname",
                                        "@name": "projectShortname"
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

                                        "items": {
                                            "type": "object",
                                            "required": ["title", "content", "type"],

                                            "properties": {
                                                "title": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "title",
                                                    "@name": "title"
                                                },

                                                "content": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "content",
                                                    "@name": "content"
                                                },

                                                "type": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "type",
                                                    "@name": "type"
                                                }
                                            }
                                        },

                                        "@alias": "courseBright",
                                        "@name": "courseBright"
                                    }
                                }
                            },

                            "@alias": "list",
                            "@name": "list"
                        }
                    },

                    "required": ["firstProjectId", "list"]
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
    var pluginName = "nl:channel/query-project-channel-trial-course-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-project-channel-trial-course-list.options.js"
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
            "nl:channel/query-project-channel-trial-course-list$options=./api..query-project-channel-trial-course-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();