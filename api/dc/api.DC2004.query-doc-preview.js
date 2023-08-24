/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-doc-preview";

        var apiDefinition = {
            api: "dc/doc/preview",
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
                    "title": "资料详情接口",
                    "description": "获取资料详情",
                    "type": "object",

                    "properties": {
                        "packId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packId",
                            "@name": "packId"
                        },

                        "docId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docId",
                            "@name": "docId"
                        },

                        "previewIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "previewIndex",
                            "@name": "previewIndex"
                        },

                        "previewSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "previewSize",
                            "@name": "previewSize"
                        },

                        "extension": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "docCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docCode",
                            "@name": "docCode"
                        }
                    },

                    "required": ["packId", "docId", "previewIndex", "previewSize", "extension", "docCode"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资料详情接口",
                    "description": "获取资料详情",
                    "type": "object",

                    "properties": {
                        "docId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docId",
                            "@name": "docId"
                        },

                        "docCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docCode",
                            "@name": "docCode"
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
                            "@name": "docType"
                        },

                        "docAccess": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docAccess",
                            "@name": "docAccess"
                        },

                        "docPrice": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPrice",
                            "@name": "docPrice"
                        },

                        "docPreviewstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPreviewstatus",
                            "@name": "docPreviewstatus"
                        },

                        "docPreviewnum": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPreviewnum",
                            "@name": "docPreviewnum"
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
                            "@name": "docShareunlock"
                        },

                        "packdocId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocId",
                            "@name": "packdocId"
                        },

                        "packdocName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocName",
                            "@name": "packdocName"
                        },

                        "packdocAccess": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocAccess",
                            "@name": "packdocAccess"
                        },

                        "packdocPrice": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocPrice",
                            "@name": "packdocPrice"
                        },

                        "packdocPromotiontype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocPromotiontype",
                            "@name": "packdocPromotiontype"
                        },

                        "packdocPromotionstarttime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocPromotionstarttime",
                            "@name": "packdocPromotionstarttime"
                        },

                        "packdocPromotionendtime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocPromotionendtime",
                            "@name": "packdocPromotionendtime"
                        },

                        "packdocPromotionprice": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packdocPromotionprice",
                            "@name": "packdocPromotionprice"
                        },

                        "previewInfo": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "previewInfo",
                            "@name": "previewInfo"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
                        },

                        "docTopstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docTopstatus",
                            "@name": "docTopstatus"
                        },

                        "docCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docCreateddate",
                            "@name": "docCreateddate"
                        },

                        "isOwned": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isOwned",
                            "@name": "isOwned"
                        },

                        "lastId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lastId",
                            "@name": "lastId"
                        },

                        "nextId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "nextId",
                            "@name": "nextId"
                        },

                        "docExtension": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docExtension",
                            "@name": "docExtension"
                        },

                        "docAvlstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docAvlstatus",
                            "@name": "docAvlstatus"
                        },

                        "docDelstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docDelstatus",
                            "@name": "docDelstatus"
                        },

                        "docConvertstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docConvertstatus",
                            "@name": "docConvertstatus"
                        },

                        "packisOwned": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packisOwned",
                            "@name": "packisOwned"
                        },

                        "docPagenum": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPagenum",
                            "@name": "docPagenum"
                        },

                        "docTopexpireddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docTopexpireddate",
                            "@name": "docTopexpireddate"
                        }
                    },

                    "required": [
                        "docId",
                        "docCode",
                        "docName",
                        "docType",
                        "docAccess",
                        "docPrice",
                        "docPreviewstatus",
                        "docPreviewnum",
                        "docSize",
                        "docDowncount",
                        "docLikecount",
                        "docPromotiontype",
                        "docPromotionstarttime",
                        "docPromotionendtime",
                        "docPromotionprice",
                        "docShareunlock",
                        "packdocId",
                        "packdocName",
                        "packdocAccess",
                        "packdocPrice",
                        "packdocPromotiontype",
                        "packdocPromotionstarttime",
                        "packdocPromotionendtime",
                        "packdocPromotionprice",
                        "previewInfo",
                        "projectId",
                        "projectName",
                        "systemTime",
                        "docTopstatus",
                        "docCreateddate",
                        "isOwned",
                        "lastId",
                        "nextId",
                        "docExtension",
                        "docAvlstatus",
                        "docDelstatus",
                        "docConvertstatus",
                        "packisOwned",
                        "docPagenum",
                        "docTopexpireddate"
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
    var pluginName = "nl:dc/query-doc-preview";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2004.query-doc-preview.options.js"
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
            "nl:dc/query-doc-preview$options=./api.DC2004.query-doc-preview.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();