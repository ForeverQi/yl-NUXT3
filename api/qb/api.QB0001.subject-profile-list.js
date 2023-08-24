/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "subject-profile-list";

        var apiDefinition = {
            api: "qb/subject/profile/list",
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
                    "title": "科目列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectMajorstype": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectMajorstype",
                            "@name": "subjectMajorstype"
                        },

                        "subjectShowstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectShowstatus",
                            "@name": "subjectShowstatus"
                        },

                        "subjectAvlstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectAvlstatus",
                            "@name": "subjectAvlstatus"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "科目列表",
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

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "subjectId",
                                    "subjectName",
                                    "subjectLevelcode",
                                    "subjectSeq",
                                    "subjectMemo",
                                    "subjectCreateddate",
                                    "subjectMajorstype"
                                ],

                                "properties": {
                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "subjectLevelcode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectLevelcode",
                                        "@name": "subjectLevelcode"
                                    },

                                    "subjectSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectSeq",
                                        "@name": "subjectSeq"
                                    },

                                    "subjectMemo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectMemo",
                                        "@name": "subjectMemo"
                                    },

                                    "subjectCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectCreateddate",
                                        "@name": "subjectCreateddate"
                                    },

                                    "subjectMajorstype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectMajorstype",
                                        "@name": "subjectMajorstype"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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
    var pluginName = "nl:qb/subject-profile-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0001.subject-profile-list.options.js"
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
            "nl:qb/subject-profile-list$options=./api.QB0001.subject-profile-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();