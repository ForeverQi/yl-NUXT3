/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-project-channel-config";

        var apiDefinition = {
            api: "module/config/user/info",
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
                    "title": "查询频道页模块配置(用户端)",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        }
                    },

                    "required": ["columnId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询频道页模块配置(用户端)",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "advisoryData": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "customerModuleName",
                                    "enableStatus",
                                    "enableTemplateCode",
                                    "moduleCode",
                                    "moduleId",
                                    "moduleName",
                                    "moduleType",
                                    "sort"
                                ],

                                "properties": {
                                    "customerModuleName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "customerModuleName",
                                        "@name": "customerModuleName"
                                    },

                                    "enableStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "enableStatus",
                                        "@name": "enableStatus"
                                    },

                                    "enableTemplateCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "enableTemplateCode",
                                        "@name": "enableTemplateCode",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "T1",
                                            "value": "mould1"
                                        }, {
                                            "type": "string",
                                            "name": "T2",
                                            "value": "mould2"
                                        }]
                                    },

                                    "moduleCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleCode",
                                        "@name": "moduleCode",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "TYK",
                                            "value": "trial"
                                        }, {
                                            "type": "string",
                                            "name": "XTK",
                                            "value": "pro"
                                        }, {
                                            "type": "string",
                                            "name": "SZZS",
                                            "value": "teacher"
                                        }, {
                                            "type": "string",
                                            "name": "ZX",
                                            "value": "article"
                                        }, {
                                            "type": "string",
                                            "name": "TK",
                                            "value": "exam"
                                        }, {
                                            "type": "string",
                                            "name": "ZL",
                                            "value": "information"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG1",
                                            "value": "ad1"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG2",
                                            "value": "ad2"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG3",
                                            "value": "ad3"
                                        }, {
                                            "type": "string",
                                            "name": "GSJS",
                                            "value": "introduce"
                                        }, {
                                            "type": "string",
                                            "name": "TS",
                                            "value": "book"
                                        }]
                                    },

                                    "moduleId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleId",
                                        "@name": "moduleId"
                                    },

                                    "moduleName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleName",
                                        "@name": "moduleName"
                                    },

                                    "moduleType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleType",
                                        "@name": "moduleType"
                                    },

                                    "sort": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "sort",
                                        "@name": "sort"
                                    }
                                }
                            },

                            "@alias": "advisoryData",
                            "@name": "advisoryData"
                        },

                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "noneAdvisoryData": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "customerModuleName",
                                    "enableStatus",
                                    "enableTemplateCode",
                                    "moduleCode",
                                    "moduleId",
                                    "moduleName",
                                    "moduleType",
                                    "sort"
                                ],

                                "properties": {
                                    "customerModuleName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "customerModuleName",
                                        "@name": "customerModuleName"
                                    },

                                    "enableStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "enableStatus",
                                        "@name": "enableStatus"
                                    },

                                    "enableTemplateCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "enableTemplateCode",
                                        "@name": "enableTemplateCode",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "T1",
                                            "value": "mould1"
                                        }, {
                                            "type": "string",
                                            "name": "T2",
                                            "value": "mould2"
                                        }]
                                    },

                                    "moduleCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleCode",
                                        "@name": "moduleCode",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "TYK",
                                            "value": "trial"
                                        }, {
                                            "type": "string",
                                            "name": "XTK",
                                            "value": "pro"
                                        }, {
                                            "type": "string",
                                            "name": "SZZS",
                                            "value": "teacher"
                                        }, {
                                            "type": "string",
                                            "name": "ZX",
                                            "value": "article"
                                        }, {
                                            "type": "string",
                                            "name": "TK",
                                            "value": "exam"
                                        }, {
                                            "type": "string",
                                            "name": "ZL",
                                            "value": "information"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG1",
                                            "value": "ad1"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG2",
                                            "value": "ad2"
                                        }, {
                                            "type": "string",
                                            "name": "ZDYGG3",
                                            "value": "ad3"
                                        }, {
                                            "type": "string",
                                            "name": "GSJS",
                                            "value": "introduce"
                                        }, {
                                            "type": "string",
                                            "name": "TJTS",
                                            "value": "book"
                                        }]
                                    },

                                    "moduleId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleId",
                                        "@name": "moduleId"
                                    },

                                    "moduleName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleName",
                                        "@name": "moduleName"
                                    },

                                    "moduleType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleType",
                                        "@name": "moduleType"
                                    },

                                    "sort": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "sort",
                                        "@name": "sort"
                                    }
                                }
                            },

                            "@alias": "noneAdvisoryData",
                            "@name": "noneAdvisoryData"
                        },

                        "styleType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "styleType",
                            "@name": "styleType",

                            "@enums": [{
                                "type": "string",
                                "name": "W",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "Z",
                                "value": "Y"
                            }]
                        }
                    },

                    "required": ["advisoryData", "columnId", "noneAdvisoryData", "styleType"]
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
    var pluginName = "nl:channel/query-project-channel-config";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-project-channel-config.options.js"
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
            "nl:channel/query-project-channel-config$options=./api..query-project-channel-config.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();