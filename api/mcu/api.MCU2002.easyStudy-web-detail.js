/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "lightClass", apiAlias = "easyStudy-web-detail";

        var apiDefinition = {
            api: "mcp/easyStudy/web/detail",
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
                    "title": "轻学课-详情(web)",
                    "description": "轻学课-详情(web)",
                    "type": "object",

                    "properties": {
                        "goodsId": {
                            "type": "string",
                            "required": true,
                            "@alias": "goodsId",
                            "@name": "goodsId"
                        },

                        "optId": {
                            "type": "string",
                            "required": true,
                            "@alias": "optId",
                            "@name": "optId"
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
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        }
                    },

                    "required": ["goodsId", "optId", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "轻学课-详情(web)",
                    "description": "轻学课-详情(web)",
                    "type": "object",

                    "properties": {
                        "categoryId": {
                            "type": "string",
                            "required": true,
                            "@alias": "categoryId",
                            "@name": "categoryId"
                        },

                        "categoryName": {
                            "type": "string",
                            "required": true,
                            "@alias": "categoryName",
                            "@name": "categoryName"
                        },

                        "coursePath": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursePath",
                            "@name": "coursePath"
                        },

                        "goodsCover": {
                            "type": "string",
                            "required": true,
                            "@alias": "goodsCover",
                            "@name": "goodsCover"
                        },

                        "duration": {
                            "type": "number",
                            "required": true,
                            "@alias": "duration",
                            "@name": "duration"
                        },

                        "expiredTime": {
                            "type": "string",
                            "required": true,
                            "@alias": "expiredTime",
                            "@name": "expiredTime"
                        },

                        "flowDiaLog": {
                            "type": "object",

                            "required": [
                                "courseQrcode",
                                "enableEndTime",
                                "enableStartTime",
                                "enableWay",
                                "guideLanguage",
                                "optStatus"
                            ],

                            "properties": {
                                "courseQrcode": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.courseQrcode",
                                    "@name": "courseQrcode"
                                },

                                "enableEndTime": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.enableEndTime",
                                    "@name": "enableEndTime"
                                },

                                "enableStartTime": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.enableStartTime",
                                    "@name": "enableStartTime"
                                },

                                "enableWay": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.enableWay",
                                    "@name": "enableWay"
                                },

                                "guideLanguage": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.guideLanguage",
                                    "@name": "guideLanguage"
                                },

                                "optStatus": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "flowDiaLog.optStatus",
                                    "@name": "optStatus"
                                }
                            },

                            "@alias": "flowDiaLog",
                            "@name": "flowDiaLog"
                        },

                        "goodsName": {
                            "type": "string",
                            "required": true,
                            "@alias": "goodsName",
                            "@name": "goodsName"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "resourceId": {
                            "type": "string",
                            "required": true,
                            "@alias": "resourceId",
                            "@name": "resourceId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "tags": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "tags",
                            "@name": "tags"
                        }
                    },

                    "required": [
                        "categoryId",
                        "categoryName",
                        "coursePath",
                        "goodsCover",
                        "duration",
                        "expiredTime",
                        "flowDiaLog",
                        "goodsName",
                        "projectId",
                        "projectName",
                        "resourceId",
                        "subjectId",
                        "subjectName",
                        "tags"
                    ]
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

    var pluginName = "nl:lightClass/easyStudy-web-detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU2002.easyStudy-web-detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:lightClass/easyStudy-web-detail$options=./api.MCU2002.easyStudy-web-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();