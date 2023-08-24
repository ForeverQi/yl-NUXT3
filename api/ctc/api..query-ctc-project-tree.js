/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ctc", apiAlias = "query-ctc-project-tree";

        var apiDefinition = {
            api: "ctc/project/tree",
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
                    "title": "获取学院以及项目树列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectShowStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectShowStatus",
                            "@name": "projectShowStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "yes",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no",
                                "value": "N"
                            }]
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取学院以及项目树列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "treeData": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["collegeId", "collegeName", "collegeCode", "children"],

                                "properties": {
                                    "collegeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "collegeId",
                                        "@name": "collegeId"
                                    },

                                    "collegeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "collegeName",
                                        "@name": "collegeName"
                                    },

                                    "collegeCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "collegeCode",
                                        "@name": "collegeCode"
                                    },

                                    "children": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "projectId",
                                                "projectName",
                                                "projectType",
                                                "ptagId",
                                                "ptagName",
                                                "projectCode",
                                                "projectSeoCode"
                                            ],

                                            "properties": {
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

                                                "projectType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "projectType",
                                                    "@name": "projectType",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "X",
                                                        "value": "parent"
                                                    }, {
                                                        "type": "string",
                                                        "name": "Z",
                                                        "value": "child"
                                                    }]
                                                },

                                                "ptagId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "ptagId",
                                                    "@name": "ptagId"
                                                },

                                                "ptagName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "ptagName",
                                                    "@name": "ptagName"
                                                },

                                                "projectCode": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "projectCode",
                                                    "@name": "projectCode"
                                                },

                                                "projectSeoCode": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "projectSeoCode",
                                                    "@name": "projectSeoCode"
                                                }
                                            }
                                        },

                                        "@alias": "projects",
                                        "@name": "children"
                                    }
                                }
                            },

                            "@alias": "treeData",
                            "@name": "treeData"
                        }
                    },

                    "required": ["treeData"]
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
    var pluginName = "nl:ctc/query-ctc-project-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-ctc-project-tree.options.js"
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
            "nl:ctc/query-ctc-project-tree$options=./api..query-ctc-project-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();