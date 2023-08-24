/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "apply-invoice";

        var apiDefinition = {
            api: "fd/invoice/apply",
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
                    "title": "电子发票申请",
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

                        "invoiceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "invoiceType",
                            "@name": "invoiceType"
                        },

                        "invoiceTitle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "invoiceTitle",
                            "@name": "invoiceTitle"
                        },

                        "invoiceTin": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "invoiceTin",
                            "@name": "invoiceTin"
                        },

                        "invoiceEmail": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "invoiceEmail",
                            "@name": "invoiceEmail"
                        }
                    },

                    "required": ["orderNo", "invoiceType", "invoiceTitle", "invoiceTin", "invoiceEmail"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "电子发票申请",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "applyStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "applyStatus",
                            "@name": "applyStatus"
                        },

                        "applyMessage": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "applyMessage",
                            "@name": "applyMessage"
                        }
                    },

                    "required": ["applyStatus", "applyMessage"]
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

    var pluginName = "nl:uc/apply-invoice";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.FD0009.apply-invoice.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/apply-invoice$options=./api.FD0009.apply-invoice.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();