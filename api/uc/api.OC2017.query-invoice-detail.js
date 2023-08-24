/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "query-invoice-detail";

        var apiDefinition = {
            api: "ordering/order/einvoice/detail",
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
                    "title": "电子发票订单详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        }
                    },

                    "required": ["orderNo"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "电子发票订单详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        },

                        "orderPayamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "orderPayamount",
                            "@name": "orderPayamount"
                        },

                        "orderInvoiceapplystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderInvoiceapplystatus",
                            "@name": "orderInvoiceapplystatus"
                        },

                        "eInvoicepromptinfo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "eInvoicepromptinfo",
                            "@name": "eInvoicepromptinfo"
                        },

                        "coOwnerschoolid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coOwnerschoolid",
                            "@name": "coOwnerschoolid"
                        }
                    },

                    "required": [
                        "orderNo",
                        "orderPayamount",
                        "orderInvoiceapplystatus",
                        "eInvoicepromptinfo",
                        "coOwnerschoolid"
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

    var pluginName = "nl:uc/query-invoice-detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2017.query-invoice-detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/query-invoice-detail$options=./api.OC2017.query-invoice-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();