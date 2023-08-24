/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "eduordering-student-createprepay";

        var apiDefinition = {
            api: "eduordering/student/createprepay/post",
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
                    "title": "支付预创建",
                    "description": "支付预创建",
                    "type": "object",

                    "properties": {
                        "tradeRecordFrontUrl": {
                            "type": "string",
                            "required": false,
                            "@alias": "tradeRecordFrontUrl",
                            "@name": "tradeRecordFrontUrl"
                        },

                        "tradeClientCode": {
                            "type": "string",
                            "required": false,
                            "@alias": "tradeClientCode",
                            "@name": "tradeClientCode"
                        },

                        "sceneCode": {
                            "type": "string",
                            "required": false,
                            "@alias": "sceneCode",
                            "@name": "sceneCode"
                        },

                        "orderNumber": {
                            "type": "string",
                            "required": false,
                            "@alias": "orderNumber",
                            "@name": "orderNumber"
                        },

                        "receiptNumber": {
                            "type": "string",
                            "required": false,
                            "@alias": "receiptNumber",
                            "@name": "receiptNumber"
                        },

                        "amount": {
                            "type": "string",
                            "required": false,
                            "@alias": "amount",
                            "@name": "amount"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "支付预创建",
                    "description": "支付预创建",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "object",
                            "required": [],

                            "properties": {
                                "traderecordId": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "traderecordId",
                                    "@name": "traderecordId"
                                },

                                "cashUrl": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "cashUrl",
                                    "@name": "cashUrl"
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
    var pluginName = "nl:edu/eduordering-student-createprepay";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..eduordering-student-createprepay.options.js"
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
            "nl:edu/eduordering-student-createprepay$options=./api..eduordering-student-createprepay.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();