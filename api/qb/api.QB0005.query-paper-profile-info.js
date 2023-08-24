/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-profile-info";

        var apiDefinition = {
            api: "qb/paper/profile/info",
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
                    "title": "试卷信息详细",
                    "description": "试卷信息详细",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        }
                    },

                    "required": ["paperId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷信息详细",
                    "description": "试卷信息详细",
                    "type": "object",

                    "properties": {
                        "className": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "className",
                            "@name": "className"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "paperName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperName",
                            "@name": "paperName"
                        },

                        "paperMemo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperMemo",
                            "@name": "paperMemo"
                        },

                        "paperAuth": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperAuth",
                            "@name": "paperAuth",

                            "@enums": [{
                                "type": "string",
                                "name": "T",
                                "value": "T"
                            }, {
                                "type": "string",
                                "name": "M",
                                "value": "M"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "paperYear": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperYear",
                            "@name": "paperYear"
                        },

                        "paperSummary": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperSummary",
                            "@name": "paperSummary"
                        },

                        "papertypeCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "papertypeCode",
                            "@name": "papertypeCode",

                            "@enums": [{
                                "type": "string",
                                "name": "MRYL",
                                "value": "MRYL"
                            }, {
                                "type": "string",
                                "name": "ZJLX",
                                "value": "ZJLX"
                            }, {
                                "type": "string",
                                "name": "MNST",
                                "value": "MNST"
                            }, {
                                "type": "string",
                                "name": "MKDS",
                                "value": "MKDS"
                            }, {
                                "type": "string",
                                "name": "YFSJ",
                                "value": "YFSJ"
                            }, {
                                "type": "string",
                                "name": "ZZY",
                                "value": "ZZY"
                            }, {
                                "type": "string",
                                "name": "YK",
                                "value": "YK"
                            }, {
                                "type": "string",
                                "name": "SCLX",
                                "value": "SCLX"
                            }, {
                                "type": "string",
                                "name": "SJLX",
                                "value": "SJLX"
                            }, {
                                "type": "string",
                                "name": "CTB",
                                "value": "CTB"
                            }, {
                                "type": "string",
                                "name": "HDYQT",
                                "value": "HDYQT"
                            }]
                        },

                        "paperScoretotal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperScoretotal",
                            "@name": "paperScoretotal"
                        },

                        "paperCreateddate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperCreateddate",
                            "@name": "paperCreateddate"
                        },

                        "paperIsneedestimate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperIsneedestimate",
                            "@name": "paperIsneedestimate",

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

                        "paperUnLockstate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperUnLockstate",
                            "@name": "paperUnLockstate",

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

                        "questionTotal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "questionTotal",
                            "@name": "questionTotal"
                        },

                        "examDuration": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "examDuration",
                            "@name": "examDuration"
                        },

                        "participateAmount": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "participateAmount",
                            "@name": "participateAmount"
                        },

                        "paperLockstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperLockstatus",
                            "@name": "paperLockstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "G"
                            }]
                        },

                        "paperAvlstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperAvlstatus",
                            "@name": "paperAvlstatus",

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

                        "paperDelstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperDelstatus",
                            "@name": "paperDelstatus",

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

                        "paperPublicstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperPublicstatus",
                            "@name": "paperPublicstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "H",
                                "value": "H"
                            }]
                        },

                        "paperOpenAuthStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperOpenAuthStatus",
                            "@name": "paperOpenAuthStatus"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "paperDblockstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperDblockstatus",
                            "@name": "paperDblockstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "G"
                            }]
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "checkStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "checkStatus",
                            "@name": "checkStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "C",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "O",
                                "value": "O"
                            }, {
                                "type": "string",
                                "name": "U",
                                "value": "U"
                            }, {
                                "type": "string",
                                "name": "E",
                                "value": "E"
                            }, {
                                "type": "string",
                                "name": "L",
                                "value": "L"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "O",
                                "value": "O"
                            }, {
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }]
                        },

                        "examExpirationdate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "examExpirationdate",
                            "@name": "examExpirationdate"
                        },

                        "examActivitytype": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "examActivitytype",
                            "@name": "examActivitytype",

                            "@enums": [{
                                "type": "string",
                                "name": "L",
                                "value": "L"
                            }, {
                                "type": "string",
                                "name": "Q",
                                "value": "Q"
                            }]
                        },

                        "examActivityaddress": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "examActivityaddress",
                            "@name": "examActivityaddress"
                        },

                        "examEffectivebegindate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "examEffectivebegindate",
                            "@name": "examEffectivebegindate"
                        },

                        "useClassStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "useClassStatus",
                            "@name": "useClassStatus",

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

                        "allClassesDelStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "allClassesDelStatus",
                            "@name": "allClassesDelStatus",

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

                        "allClassesAlvStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "allClassesAlvStatus",
                            "@name": "allClassesAlvStatus",

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
    var pluginName = "nl:qb/query-paper-profile-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0005.query-paper-profile-info.options.js"
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
            "nl:qb/query-paper-profile-info$options=./api.QB0005.query-paper-profile-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();