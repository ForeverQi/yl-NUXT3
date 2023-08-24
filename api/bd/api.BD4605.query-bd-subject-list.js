/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "bd", apiAlias = "query-bd-subject-list";

        var apiDefinition = {
            api: "bd/subject/list",
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
                    "title": "查询科目列表",
                    "description": "根据入参查询基础数据科目列表",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "orderKey": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderKey",
                            "@name": "orderKey"
                        },

                        "orderVal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderVal",
                            "@name": "orderVal",

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

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "subjectNature": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectNature",
                            "@name": "subjectNature",

                            "@enums": [{
                                "type": "string",
                                "name": "all",
                                "value": "M"
                            }, {
                                "type": "string",
                                "name": "single",
                                "value": "S"
                            }]
                        },

                        "subjectType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectType",
                            "@name": "subjectType",

                            "@enums": [{
                                "type": "string",
                                "name": "public",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "specialized",
                                "value": "M"
                            }]
                        },

                        "subjectSeq": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "subjectSeq",
                            "@name": "subjectSeq"
                        },

                        "subjectSeocode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectSeoCode",
                            "@name": "subjectSeocode"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询科目列表",
                    "description": "根据入参查询基础数据科目列表",
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
                                    "subjectId",
                                    "projectId",
                                    "subjectName",
                                    "subjectNature",
                                    "subjectType",
                                    "subjectSeq",
                                    "subjectCreater",
                                    "subjectCreatedDate",
                                    "subjectModifier",
                                    "subjectModifiedDate",
                                    "subjectAvlStatus",
                                    "subjectDelStatus",
                                    "subjectSourceid"
                                ],

                                "properties": {
                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "subjectNature": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectNature",
                                        "@name": "subjectNature",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "M",
                                            "value": "all"
                                        }, {
                                            "type": "string",
                                            "name": "S",
                                            "value": "single"
                                        }]
                                    },

                                    "subjectType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectType",
                                        "@name": "subjectType",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "P",
                                            "value": "public"
                                        }, {
                                            "type": "string",
                                            "name": "M",
                                            "value": "specialized"
                                        }]
                                    },

                                    "subjectSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectSeq",
                                        "@name": "subjectSeq"
                                    },

                                    "subjectCreater": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectCreater",
                                        "@name": "subjectCreater"
                                    },

                                    "subjectCreatedDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectCreateddate",
                                        "@name": "subjectCreatedDate"
                                    },

                                    "subjectModifier": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectModifier",
                                        "@name": "subjectModifier"
                                    },

                                    "subjectModifiedDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectModifieddate",
                                        "@name": "subjectModifiedDate"
                                    },

                                    "subjectAvlStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectAvlstatus",
                                        "@name": "subjectAvlStatus",

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

                                    "subjectDelStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectDelstatus",
                                        "@name": "subjectDelStatus",

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

                                    "subjectSourceid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectSourceid",
                                        "@name": "subjectSourceid"
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
    var pluginName = "nl:bd/query-bd-subject-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.BD4605.query-bd-subject-list.options.js"
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
            "nl:bd/query-bd-subject-list$options=./api.BD4605.query-bd-subject-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();