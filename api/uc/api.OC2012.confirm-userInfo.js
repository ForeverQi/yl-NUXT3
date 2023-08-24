/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "confirm-userInfo";

        var apiDefinition = {
            api: "ordering/order/userinfoconfirm",
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
                    "title": "学员个人信息确认",
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

                        "userinfoConfirmstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userinfoConfirmstatus",
                            "@name": "userinfoConfirmstatus"
                        },

                        "confirmedOrderitemids": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "confirmedOrderitemids",
                            "@name": "confirmedOrderitemids"
                        },

                        "brandId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "orderPayer": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderPayer",
                            "@name": "orderPayer"
                        },

                        "payerRelationship": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "payerRelationship",
                            "@name": "payerRelationship"
                        }
                    },

                    "required": ["orderNo", "userinfoConfirmstatus"]
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

    var pluginName = "nl:uc/confirm-userInfo";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2012.confirm-userInfo.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/confirm-userInfo$options=./api.OC2012.confirm-userInfo.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();