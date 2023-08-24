/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "pc", apiAlias = "fo-order-create";

        var apiDefinition = {
            api: "fo/order/create",
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
                    "title": "创建订单",
                    "description": "资料创建订单",
                    "type": "object",

                    "properties": {
                        "productList": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "productList",
                            "@name": "productList"
                        },

                        "brandId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "orderBelongto": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderBelongto",
                            "@name": "orderBelongto",

                            "@enums": [{
                                "type": "string",
                                "name": "AT",
                                "value": "AT"
                            }, {
                                "type": "string",
                                "name": "OS",
                                "value": "OS"
                            }, {
                                "type": "string",
                                "name": "DC",
                                "value": "DC"
                            }, {
                                "type": "string",
                                "name": "MP",
                                "value": "MP"
                            }]
                        },

                        "orderSource": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderSource",
                            "@name": "orderSource",

                            "@enums": [{
                                "type": "string",
                                "name": "OP",
                                "value": "OP"
                            }, {
                                "type": "string",
                                "name": "OA",
                                "value": "OA"
                            }, {
                                "type": "string",
                                "name": "YP",
                                "value": "YP"
                            }, {
                                "type": "string",
                                "name": "YA",
                                "value": "YA"
                            }, {
                                "type": "string",
                                "name": "TM",
                                "value": "TM"
                            }, {
                                "type": "string",
                                "name": "JD",
                                "value": "JD"
                            }, {
                                "type": "string",
                                "name": "DA",
                                "value": "DA"
                            }]
                        },

                        "oaId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "oaId",
                            "@name": "oaId"
                        },

                        "orderMemo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderMemo",
                            "@name": "orderMemo"
                        },

                        "tradeclientCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeclientCode",
                            "@name": "tradeclientCode"
                        },

                        "scene": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "scene",
                            "@name": "scene"
                        },

                        "skipUrl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "skipUrl",
                            "@name": "skipUrl"
                        },

                        "adressAfterpay": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "adressAfterpay",
                            "@name": "adressAfterpay"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "I",
                                "value": "I"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "C",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "H",
                                "value": "H"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "orderAvltime": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "orderAvltime",
                            "@name": "orderAvltime"
                        },

                        "extension": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "newExtension": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "newExtension",
                            "@name": "newExtension"
                        }
                    },

                    "required": [
                        "productList",
                        "brandId",
                        "orderBelongto",
                        "tradeclientCode",
                        "scene",
                        "clientType"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "创建订单",
                    "description": "资料创建订单",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        },

                        "traderecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordId",
                            "@name": "traderecordId"
                        },

                        "cashUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "cashUrl",
                            "@name": "cashUrl"
                        },

                        "payAmount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "payAmount",
                            "@name": "payAmount"
                        },

                        "orderTitle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderTitle",
                            "@name": "orderTitle"
                        },

                        "userName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userName",
                            "@name": "userName"
                        }
                    },

                    "required": [
                        "orderNo",
                        "traderecordId",
                        "cashUrl",
                        "payAmount",
                        "orderTitle",
                        "userName"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:pc/fo-order-create";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.FO2001.fo-order-create.options.js"
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
            "nl:pc/fo-order-create$options=./api.FO2001.fo-order-create.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();