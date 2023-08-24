/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "query-eduordering-unpayorders-list";

        var apiDefinition = {
            api: "eduordering/student/unpayorders/post",
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
                    "title": "学历未支付订单",
                    "description": "学历未支付订单",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "string",
                            "required": false,
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": false,
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "userId": {
                            "type": "string",
                            "required": false,
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "brandId": {
                            "type": "string",
                            "required": false,
                            "@alias": "brandId",
                            "@name": "brandId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学历未支付订单",
                    "description": "学历未支付订单",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "object",
                            "required": [],

                            "properties": {
                                "totalCount": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "totalCount",
                                    "@name": "totalCount"
                                },

                                "items": {
                                    "type": "array",
                                    "required": false,

                                    "items": {
                                        "type": "object",

                                        "required": [
                                            "orderId",
                                            "productPrice",
                                            "factualAmount",
                                            "amountInArrears",
                                            "receivableAmount",
                                            "eduLevelTypeName",
                                            "eduModeName",
                                            "eduMode",
                                            "majorName",
                                            "majorId",
                                            "creationTime",
                                            "orderNumber",
                                            "id",
                                            "aboutClasss",
                                            "exemptionThreeVerify"
                                        ],

                                        "properties": {
                                            "orderId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderId",
                                                "@name": "orderId"
                                            },

                                            "productPrice": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "productPrice",
                                                "@name": "productPrice"
                                            },

                                            "factualAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "factualAmount",
                                                "@name": "factualAmount"
                                            },

                                            "amountInArrears": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "amountInArrears",
                                                "@name": "amountInArrears"
                                            },

                                            "receivableAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "receivableAmount",
                                                "@name": "receivableAmount"
                                            },

                                            "eduLevelTypeName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "eduLevelTypeName",
                                                "@name": "eduLevelTypeName"
                                            },

                                            "eduModeName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "eduModeName",
                                                "@name": "eduModeName"
                                            },

                                            "eduMode": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "eduMode",
                                                "@name": "eduMode"
                                            },

                                            "majorName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "majorName",
                                                "@name": "majorName"
                                            },

                                            "majorId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "majorId",
                                                "@name": "majorId"
                                            },

                                            "creationTime": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "creationTime",
                                                "@name": "creationTime"
                                            },

                                            "orderNumber": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderNumber",
                                                "@name": "orderNumber"
                                            },

                                            "id": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "id",
                                                "@name": "id"
                                            },

                                            "aboutClasss": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",

                                                "items": {
                                                    "type": "object",
                                                    "required": ["classId", "skuName"],

                                                    "properties": {
                                                        "classId": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "classId",
                                                            "@name": "classId"
                                                        },

                                                        "skuName": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@name": "skuName"
                                                        }
                                                    }
                                                },

                                                "@alias": "aboutClasss",
                                                "@name": "aboutClasss"
                                            },

                                            "exemptionThreeVerify": {
                                                "type": "boolean",
                                                "required": true,
                                                "default": "",
                                                "@alias": "exemptionThreeVerify",
                                                "@name": "exemptionThreeVerify"
                                            }
                                        }
                                    },

                                    "@alias": "items",
                                    "@name": "items"
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "timestamp": {
                            "type": "string",
                            "required": false,
                            "@alias": "timestamp",
                            "@name": "timestamp"
                        },

                        "code": {
                            "type": "string",
                            "required": false,
                            "@alias": "code",
                            "@name": "code"
                        },

                        "msg": {
                            "type": "string",
                            "required": false,
                            "@alias": "msg",
                            "@name": "msg"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:edu/query-eduordering-unpayorders-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-eduordering-unpayorders-list.options.js"
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
            "nl:edu/query-eduordering-unpayorders-list$options=./api..query-eduordering-unpayorders-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();