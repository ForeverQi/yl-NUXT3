/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-packdoc-list";

        var apiDefinition = {
            api: "dc/doc/packdoc/list",
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
                    "title": "资料包下资料列表",
                    "description": "资料包下资料列表",
                    "type": "object",

                    "properties": {
                        "packId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packId",
                            "@name": "packId"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["packId", "pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资料包下资料列表",
                    "description": "资料包下资料列表",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "docId",
                                    "docName",
                                    "docType",
                                    "docAccess",
                                    "docPrice",
                                    "docTag",
                                    "docSize",
                                    "docDowncount",
                                    "docLikecount",
                                    "docPromotiontype",
                                    "docPromotionstarttime",
                                    "docPromotionendtime",
                                    "docPromotionprice",
                                    "docCreateddate",
                                    "docPagenum",
                                    "isOwned",
                                    "docExtension",
                                    "docCode",
                                    "docPageviewcount",
                                    "docAvlstatus"
                                ],

                                "properties": {
                                    "docId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docId",
                                        "@name": "docId"
                                    },

                                    "docName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docName",
                                        "@name": "docName"
                                    },

                                    "docType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docType",
                                        "@name": "docType",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Z",
                                            "value": "Z"
                                        }, {
                                            "type": "string",
                                            "name": "W",
                                            "value": "W"
                                        }, {
                                            "type": "string",
                                            "name": "T",
                                            "value": "T"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }, {
                                            "type": "string",
                                            "name": "J",
                                            "value": "J"
                                        }, {
                                            "type": "string",
                                            "name": "P",
                                            "value": "P"
                                        }, {
                                            "type": "string",
                                            "name": "G",
                                            "value": "G"
                                        }]
                                    },

                                    "docAccess": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docAccess",
                                        "@name": "docAccess",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }, {
                                            "type": "string",
                                            "name": "C",
                                            "value": "C"
                                        }]
                                    },

                                    "docPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPrice",
                                        "@name": "docPrice"
                                    },

                                    "docTag": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docTag",
                                        "@name": "docTag"
                                    },

                                    "docSize": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docSize",
                                        "@name": "docSize"
                                    },

                                    "docDowncount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docDowncount",
                                        "@name": "docDowncount"
                                    },

                                    "docLikecount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docLikecount",
                                        "@name": "docLikecount"
                                    },

                                    "docPromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotiontype",
                                        "@name": "docPromotiontype",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }, {
                                            "type": "string",
                                            "name": "L",
                                            "value": "L"
                                        }, {
                                            "type": "string",
                                            "name": "S",
                                            "value": "S"
                                        }]
                                    },

                                    "docPromotionstarttime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionstarttime",
                                        "@name": "docPromotionstarttime"
                                    },

                                    "docPromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionendtime",
                                        "@name": "docPromotionendtime"
                                    },

                                    "docPromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionprice",
                                        "@name": "docPromotionprice"
                                    },

                                    "docCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docCreateddate",
                                        "@name": "docCreateddate"
                                    },

                                    "docPagenum": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPagenum",
                                        "@name": "docPagenum"
                                    },

                                    "isOwned": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "isOwned",
                                        "@name": "isOwned",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "Y"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }]
                                    },

                                    "docExtension": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docExtension",
                                        "@name": "docExtension"
                                    },

                                    "docCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docCode",
                                        "@name": "docCode"
                                    },

                                    "docPageviewcount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPageviewcount",
                                        "@name": "docPageviewcount"
                                    },

                                    "docAvlstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docAvlstatus",
                                        "@name": "docAvlstatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "Y"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }]
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        },

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
                        }
                    },

                    "required": ["count", "list", "systemTime"]
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
    var pluginName = "nl:dc/query-packdoc-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2018.query-packdoc-list.options.js"
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
            "nl:dc/query-packdoc-list$options=./api.DC2018.query-packdoc-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();