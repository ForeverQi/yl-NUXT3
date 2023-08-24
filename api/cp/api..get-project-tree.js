/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "get-project-tree";

        var apiDefinition = {
            api: "ctc/project/web/tree/noptag",
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
                    "title": "获取项目科目列表父子集合",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectAvlstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectAvlstatus",
                            "@name": "projectAvlstatus"
                        },

                        "brandId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "projectShowstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectShowstatus",
                            "@name": "projectShowstatus"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取项目科目列表父子集合",
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
                                    "projectName",
                                    "projectId",
                                    "projectLevelcode",
                                    "projectSeq",
                                    "children",
                                    "projectSourceid",
                                    "projectLogourl",
                                    "projectDescriptionurl",
                                    "projectAppimgurl",
                                    "projectWebimgurl",
                                    "projectCode",
                                    "projectShortname",
                                    "projectHotstatus",
                                    "projectSummarypicture",
                                    "kxId",
                                    "projectUseplate",
                                    "projectHotmodifieddate",
                                    "projectSeocode"
                                ],

                                "properties": {
                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "projectLevelcode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectLevelcode",
                                        "@name": "projectLevelcode"
                                    },

                                    "projectSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSeq",
                                        "@name": "projectSeq"
                                    },

                                    "children": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "children",
                                        "@name": "children"
                                    },

                                    "projectSourceid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSourceid",
                                        "@name": "projectSourceid"
                                    },

                                    "projectLogourl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectLogourl",
                                        "@name": "projectLogourl"
                                    },

                                    "projectDescriptionurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectDescriptionurl",
                                        "@name": "projectDescriptionurl"
                                    },

                                    "projectAppimgurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectAppimgurl",
                                        "@name": "projectAppimgurl"
                                    },

                                    "projectWebimgurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectWebimgurl",
                                        "@name": "projectWebimgurl"
                                    },

                                    "projectCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectCode",
                                        "@name": "projectCode"
                                    },

                                    "projectShortname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectShortname",
                                        "@name": "projectShortname"
                                    },

                                    "projectHotstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectHotstatus",
                                        "@name": "projectHotstatus"
                                    },

                                    "projectSummarypicture": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSummarypicture",
                                        "@name": "projectSummarypicture"
                                    },

                                    "kxId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "kxId",
                                        "@name": "kxId"
                                    },

                                    "projectUseplate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectUseplate",
                                        "@name": "projectUseplate"
                                    },

                                    "projectHotmodifieddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectHotmodifieddate",
                                        "@name": "projectHotmodifieddate"
                                    },

                                    "projectSeocode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSeocode",
                                        "@name": "projectSeocode"
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
    var pluginName = "nl:cp/get-project-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..get-project-tree.options.js"
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
            "nl:cp/get-project-tree$options=./api..get-project-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();