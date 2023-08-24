/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-my-completeinfo-list";

        var apiDefinition = {
            api: "dc/doc/my/list",
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
                    "title": "查询我的资料列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "catalogId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "catalogId",
                            "@name": "catalogId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectIds",
                            "@name": "subjectIds"
                        },

                        "collegeId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        },

                        "ptagId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "ptagId",
                            "@name": "ptagId"
                        },

                        "docPackstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPackstatus",
                            "@name": "docPackstatus"
                        }
                    },

                    "required": ["pageIndex", "pageSize", "docPackstatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询我的资料列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
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
                                    "docTag",
                                    "docPromotiontype",
                                    "docPrice",
                                    "docPromotionprice",
                                    "docTopstatus",
                                    "docAccess",
                                    "docCreateddate",
                                    "docPagenum",
                                    "docPreviewnum",
                                    "docSize",
                                    "docDowncount",
                                    "docPackstatus",
                                    "docPacknum",
                                    "isOwned",
                                    "docPromotionstarttime",
                                    "docPromotionendtime",
                                    "docAvlstatus",
                                    "docCode"
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

                                    "docTag": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docTag",
                                        "@name": "docTag"
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

                                    "docPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPrice",
                                        "@name": "docPrice"
                                    },

                                    "docPromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionprice",
                                        "@name": "docPromotionprice"
                                    },

                                    "docTopstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docTopstatus",
                                        "@name": "docTopstatus",

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

                                    "docPackstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPackstatus",
                                        "@name": "docPackstatus",

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

                                    "docPacknum": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPacknum",
                                        "@name": "docPacknum"
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
                                    },

                                    "docCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docCode",
                                        "@name": "docCode"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        }
                    },

                    "required": ["count", "list"]
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
    var pluginName = "nl:dc/query-my-completeinfo-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2007.query-my-completeinfo-list.options.js"
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
            "nl:dc/query-my-completeinfo-list$options=./api.DC2007.query-my-completeinfo-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();