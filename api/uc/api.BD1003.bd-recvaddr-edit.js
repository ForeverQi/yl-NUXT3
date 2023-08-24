/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "bd", apiAlias = "bd-recvaddr-edit";

        var apiDefinition = {
            api: "bd/recvaddr/edit",
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
                    "title": "修改收货地址",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "recvaddrId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrId",
                            "@name": "recvaddrId"
                        },

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
                            "required": false,
                            "default": "",
                            "@alias": "recvaddrDefstatus",
                            "@name": "recvaddrDefstatus"
                        }
                    },

                    "required": [
                        "recvaddrId",
                        "recvaddrName",
                        "recvaddrPhone",
                        "recvaddrProvince",
                        "recvaddrCity",
                        "recvaddrRegion",
                        "recvaddrAddress"
                    ]
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

    var pluginName = "nl:bd/bd-recvaddr-edit";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.BD1003.bd-recvaddr-edit.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:bd/bd-recvaddr-edit$options=./api.BD1003.bd-recvaddr-edit.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
