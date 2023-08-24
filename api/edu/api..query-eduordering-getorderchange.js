/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "query-eduordering-getorderchange";

        var apiDefinition = {
            api: "eduordering/student/getorderchange/post",
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
                    "title": "订单是否更改",
                    "description": "订单是否更改",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        },

                        "productSpecId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "productSpecId",
                            "@name": "productSpecId"
                        },

                        "receivableAmount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "receivableAmount",
                            "@name": "receivableAmount"
                        }
                    },

                    "required": ["orderNo", "productSpecId", "receivableAmount"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "订单是否更改",
                    "description": "订单是否更改",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "data",
                            "@name": "data"
                        },

                        "operateFlag": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "operateFlag",
                            "@name": "operateFlag"
                        },

                        "operateMsg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "operateMsg",
                            "@name": "operateMsg"
                        }
                    },

                    "required": ["data", "operateFlag", "operateMsg"]
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
    var pluginName = "nl:edu/query-eduordering-getorderchange";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-eduordering-getorderchange.options.js"
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
            "nl:edu/query-eduordering-getorderchange$options=./api..query-eduordering-getorderchange.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();