/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "query-eduordering-detail";

        var apiDefinition = {
            api: "eduordering/student/orderdetail/get",
            method: "GET",
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
                    "title": "学历订单详情",
                    "description": "学历订单详情",
                    "type": "object",

                    "properties": {
                        "orderId": {
                            "type": "string",
                            "required": false,
                            "@alias": "orderId",
                            "@name": "orderId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学历订单详情",
                    "description": "学历订单详情",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "object",

                            "required": [
                                "amount",
                                "className",
                                "transferState",
                                "transferStateName",
                                "transferInAmount",
                                "transferDetail",
                                "credConfirmTime",
                                "approvalStatus",
                                "approvalNode",
                                "uploadUrl",
                                "showStatus",
                                "confirmAllowStatus",
                                "exemptionThreeVerify",
                                "isThreeVerify",
                                "isNameChecked",
                                "isMobileChecked"
                            ],

                            "properties": {
                                "title": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "title",
                                    "@name": "title"
                                },

                                "orderNumber": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderNumber",
                                    "@name": "orderNumber"
                                },

                                "orderType": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderType",
                                    "@name": "orderType"
                                },

                                "orderTypeName": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderTypeName",
                                    "@name": "orderTypeName"
                                },

                                "creationTime": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "creationTime",
                                    "@name": "creationTime"
                                },

                                "materialList": {
                                    "type": "array",
                                    "required": false,
                                    "items": {},
                                    "@alias": "materialList",
                                    "@name": "materialList"
                                },

                                "orderAllAmount": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderAllAmount",
                                    "@name": "orderAllAmount"
                                },

                                "factualAmount": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "factualAmount",
                                    "@name": "factualAmount"
                                },

                                "eduYears": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "eduYears",
                                    "@name": "eduYears"
                                },

                                "payModeName": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "payModeName",
                                    "@name": "payModeName"
                                },

                                "examCity": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "examCity",
                                    "@name": "examCity"
                                },

                                "receiptList": {
                                    "type": "array",
                                    "required": false,

                                    "items": {
                                        "type": "object",

                                        "required": [
                                            "receiptNumber",
                                            "receiptAmount",
                                            "receiptTime",
                                            "serialNumber",
                                            "isConfirmed",
                                            "id",
                                            "approvalStatus"
                                        ],

                                        "properties": {
                                            "receiptNumber": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "receiptNumber",
                                                "@name": "receiptNumber"
                                            },

                                            "receiptAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "receiptAmount",
                                                "@name": "receiptAmount"
                                            },

                                            "receiptTime": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "receiptTime",
                                                "@name": "receiptTime"
                                            },

                                            "serialNumber": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "serialNumber",
                                                "@name": "serialNumber"
                                            },

                                            "isConfirmed": {
                                                "type": "boolean",
                                                "required": true,
                                                "default": "",
                                                "@alias": "isConfirmed",
                                                "@name": "isConfirmed"
                                            },

                                            "id": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "id",
                                                "@name": "id"
                                            },

                                            "approvalStatus": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "approvalStatus",
                                                "@name": "approvalStatus"
                                            }
                                        }
                                    },

                                    "@alias": "receiptList",
                                    "@name": "receiptList"
                                },

                                "amount": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "amount",
                                    "@name": "amount"
                                },

                                "className": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "className",
                                    "@name": "className"
                                },

                                "transferState": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "transferState",
                                    "@name": "transferState"
                                },

                                "transferStateName": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "transferStateName",
                                    "@name": "transferStateName"
                                },

                                "transferInAmount": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "transferInAmount",
                                    "@name": "transferInAmount"
                                },

                                "transferDetail": {
                                    "type": "array",
                                    "required": true,
                                    "default": "",

                                    "items": {
                                        "type": "object",

                                        "required": [
                                            "title",
                                            "materialList",
                                            "eduYears",
                                            "payModeName",
                                            "classNameList",
                                            "examCity",
                                            "amount"
                                        ],

                                        "properties": {
                                            "title": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "title",
                                                "@name": "title"
                                            },

                                            "materialList": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",
                                                "items": {},
                                                "@alias": "materialList",
                                                "@name": "materialList"
                                            },

                                            "eduYears": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "eduYears",
                                                "@name": "eduYears"
                                            },

                                            "payModeName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "payModeName",
                                                "@name": "payModeName"
                                            },

                                            "classNameList": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",
                                                "items": {},
                                                "@alias": "classNameList",
                                                "@name": "classNameList"
                                            },

                                            "examCity": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "examCity",
                                                "@name": "examCity"
                                            },

                                            "amount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "amount",
                                                "@name": "amount"
                                            }
                                        }
                                    },

                                    "@alias": "transferDetail",
                                    "@name": "transferDetail"
                                },

                                "credConfirmTime": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "credConfirmTime",
                                    "@name": "credConfirmTime"
                                },

                                "approvalStatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "approvalStatus",
                                    "@name": "approvalStatus"
                                },

                                "approvalNode": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "approvalNode",
                                    "@name": "approvalNode"
                                },

                                "uploadUrl": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "uploadUrl",
                                    "@name": "uploadUrl"
                                },

                                "showStatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "showStatus",
                                    "@name": "showStatus"
                                },

                                "confirmAllowStatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "confirmAllowStatus",
                                    "@name": "confirmAllowStatus"
                                },

                                "exemptionThreeVerify": {
                                    "type": "boolean",
                                    "required": true,
                                    "default": "",
                                    "@alias": "exemptionThreeVerify",
                                    "@name": "exemptionThreeVerify"
                                },

                                "isThreeVerify": {
                                    "type": "boolean",
                                    "required": true,
                                    "default": "",
                                    "@alias": "isThreeVerify",
                                    "@name": "isThreeVerify"
                                },

                                "isNameChecked": {
                                    "type": "boolean",
                                    "required": true,
                                    "default": "",
                                    "@alias": "isNameChecked",
                                    "@name": "isNameChecked"
                                },

                                "isMobileChecked": {
                                    "type": "boolean",
                                    "required": true,
                                    "default": "",
                                    "@alias": "isMobileChecked",
                                    "@name": "isMobileChecked"
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
    var pluginName = "nl:edu/query-eduordering-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-eduordering-detail.options.js"
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
            "nl:edu/query-eduordering-detail$options=./api..query-eduordering-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();