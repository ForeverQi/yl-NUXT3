/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "update-address";

        var apiDefinition = {
            api: "ordering/order/address",
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
                    "title": "更新地址",
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

                        "orderAddress": {
                            "type": "object",
                            "required": ["oaName", "oaPhone", "oaProvince", "oaCity", "oaDistrict", "oaAddress"],
                            "default": "",

                            "properties": {
                                "oaName": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaName",
                                    "@name": "oaName"
                                },

                                "oaPhone": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaPhone",
                                    "@name": "oaPhone"
                                },

                                "oaProvince": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaProvince",
                                    "@name": "oaProvince"
                                },

                                "oaCity": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaCity",
                                    "@name": "oaCity"
                                },

                                "oaDistrict": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaDistrict",
                                    "@name": "oaDistrict"
                                },

                                "oaAddress": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaAddress",
                                    "@name": "oaAddress"
                                }
                            },

                            "@alias": "orderAddress",
                            "@name": "orderAddress"
                        },

                        "userId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": ["orderNo", "orderAddress"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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

    var pluginName = "nl:uc/update-address";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2008.update-address.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/update-address$options=./api.OC2008.update-address.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();