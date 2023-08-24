/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "add-shipping-address";

        var apiDefinition = {
            api: "uc/recvaddr/add",
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
                    "title": "添加收货地址",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "recvaddrName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrName",
                            "@name": "recvaddrName"
                        },

                        "recvaddrPhone": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrPhone",
                            "@name": "recvaddrPhone"
                        },

                        "recvaddrProvince": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrProvince",
                            "@name": "recvaddrProvince"
                        },

                        "recvaddrCity": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrCity",
                            "@name": "recvaddrCity"
                        },

                        "recvaddrRegion": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrRegion",
                            "@name": "recvaddrRegion"
                        },

                        "recvaddrAddress": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrAddress",
                            "@name": "recvaddrAddress"
                        },

                        "recvaddrDefstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrDefstatus",
                            "@name": "recvaddrDefstatus"
                        }
                    },

                    "required": [
                        "recvaddrName",
                        "recvaddrPhone",
                        "recvaddrProvince",
                        "recvaddrCity",
                        "recvaddrRegion",
                        "recvaddrAddress",
                        "recvaddrDefstatus"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "添加收货地址",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "recvaddrId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "recvaddrId",
                            "@name": "recvaddrId"
                        },

                        "recvaddrSourceid": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "recvaddrSourceid",
                            "@name": "recvaddrSourceid"
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

    var pluginName = "nl:uc/add-shipping-address";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.UC0028.add-shipping-address.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/add-shipping-address$options=./api.UC0028.add-shipping-address.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();