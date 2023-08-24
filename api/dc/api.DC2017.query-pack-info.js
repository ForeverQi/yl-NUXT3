/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-pack-info";

        var apiDefinition = {
            api: "dc/doc/user/pack/info",
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
                    "title": "资料包详情",
                    "description": "资料包详情",
                    "type": "object",

                    "properties": {
                        "packId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packId",
                            "@name": "packId"
                        }
                    },

                    "required": ["packId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资料包详情",
                    "description": "资料包详情",
                    "type": "object",

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
                            "@name": "docPromotiontype"
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

                        "docShareunlock": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docShareunlock",
                            "@name": "docShareunlock",

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

                        "docTag": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docTag",
                            "@name": "docTag"
                        },

                        "docConverimgurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docConverimgurl",
                            "@name": "docConverimgurl"
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

                        "docTopstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docTopstatus",
                            "@name": "docTopstatus"
                        },

                        "docTopexpireddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docTopexpireddate",
                            "@name": "docTopexpireddate"
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

                        "docType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docType",
                            "@name": "docType"
                        },

                        "docAvlstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docAvlstatus",
                            "@name": "docAvlstatus",

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

                        "docPacknum": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPacknum",
                            "@name": "docPacknum"
                        }
                    },

                    "required": [
                        "docId",
                        "docName",
                        "docAccess",
                        "docPrice",
                        "docSize",
                        "docDowncount",
                        "docLikecount",
                        "docPromotiontype",
                        "docPromotionstarttime",
                        "docPromotionendtime",
                        "docPromotionprice",
                        "docShareunlock",
                        "docTag",
                        "docConverimgurl",
                        "docCreateddate",
                        "docPagenum",
                        "docTopstatus",
                        "docTopexpireddate",
                        "isOwned",
                        "docType",
                        "docAvlstatus",
                        "docPacknum"
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
    var pluginName = "nl:dc/query-pack-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2017.query-pack-info.options.js"
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
            "nl:dc/query-pack-info$options=./api.DC2017.query-pack-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();