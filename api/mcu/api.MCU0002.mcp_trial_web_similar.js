/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "experience", apiAlias = "mcp_trial_web_similar";

        var apiDefinition = {
            api: "mcp/trial/web/similar",
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
                    "title": "同类好课列表",
                    "description": "同类好课列表",
                    "type": "object",

                    "properties": {
                        "categoryId": {
                            "type": "string",
                            "required": false,
                            "@alias": "categoryId",
                            "@name": "categoryId"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "@alias": "clientType",
                            "@name": "clientType",

                            "@enums": [{
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "courseOpenstatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "courseOpenstatus",
                            "@name": "courseOpenstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "2",
                                "value": "2"
                            }, {
                                "type": "string",
                                "name": "3",
                                "value": "3"
                            }]
                        },

                        "coursePromotiontype": {
                            "type": "string",
                            "required": false,
                            "@alias": "coursePromotiontype",
                            "@name": "coursePromotiontype",

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

                        "operateCategoryId": {
                            "type": "string",
                            "required": false,
                            "@alias": "operateCategoryId",
                            "@name": "operateCategoryId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "isWebSimilar": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "isWebSimilar",
                            "@name": "isWebSimilar"
                        },

                        "goodsId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "goodsId",
                            "@name": "goodsId"
                        }
                    },

                    "required": ["clientType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "同类好课列表",
                    "description": "同类好课列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "courseName",
                            "coursePicpath",
                            "coursePrice",
                            "coursePromotionendtime",
                            "coursePromotionprice",
                            "coursePromotiontype",
                            "coursewareCount",
                            "goodsId",
                            "projectShortname",
                            "saleTagName",
                            "goodsCover",
                            "goodsName"
                        ],

                        "properties": {
                            "courseName": {
                                "type": "string",
                                "required": true,
                                "@alias": "courseName",
                                "@name": "courseName"
                            },

                            "coursePicpath": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePicpath",
                                "@name": "coursePicpath"
                            },

                            "coursePrice": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursePrice",
                                "@name": "coursePrice"
                            },

                            "coursePromotionendtime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionendtime",
                                "@name": "coursePromotionendtime"
                            },

                            "coursePromotionprice": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionprice",
                                "@name": "coursePromotionprice"
                            },

                            "coursePromotiontype": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotiontype",
                                "@name": "coursePromotiontype"
                            },

                            "coursewareCount": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareCount",
                                "@name": "coursewareCount"
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

                            "saleTagName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "saleTagName",
                                "@name": "saleTagName"
                            },

                            "goodsCover": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsCover",
                                "@name": "goodsCover"
                            },

                            "goodsName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsName",
                                "@name": "goodsName"
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
    var pluginName = "nl:experience/mcp_trial_web_similar";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MCU0002.mcp_trial_web_similar.options.js"
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
            "nl:experience/mcp_trial_web_similar$options=./api.MCU0002.mcp_trial_web_similar.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();