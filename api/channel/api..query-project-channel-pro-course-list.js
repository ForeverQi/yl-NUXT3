/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-project-channel-pro-course-list";

        var apiDefinition = {
            api: "ctc/classtype/web/column/list",
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
                    "title": "查询项目频道页系统课列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "areacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "areacode",
                            "@name": "areacode"
                        },

                        "classtypeShowitem": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeShowitem",
                            "@name": "classtypeShowitem"
                        },

                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["areacode", "classtypeShowitem", "columnId", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询项目频道页系统课列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "skipProjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "skipProjectId",
                            "@name": "skipProjectId"
                        },

                        "classTypeList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "classtypeId",
                                    "classtypeName",
                                    "projectId",
                                    "classtypeAppcoverimgurl",
                                    "classtypeHighlights",
                                    "classtypeHotstatus",
                                    "asertype",
                                    "asertypeName",
                                    "ctapName",
                                    "auditionStatus",
                                    "currentAreaStatus",
                                    "classtypeRecommendstatus"
                                ],

                                "properties": {
                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "classtypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeName",
                                        "@name": "classtypeName"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "classtypeAppcoverimgurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeAppcoverimgurl",
                                        "@name": "classtypeAppcoverimgurl"
                                    },

                                    "classtypeHighlights": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHighlights",
                                        "@name": "classtypeHighlights"
                                    },

                                    "classtypeHotstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHotstatus",
                                        "@name": "classtypeHotstatus",

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

                                    "asertype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "asertype",
                                        "@name": "asertype",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "R",
                                            "value": "R"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }, {
                                            "type": "string",
                                            "name": "B",
                                            "value": "B"
                                        }, {
                                            "type": "string",
                                            "name": "EG",
                                            "value": "EG"
                                        }, {
                                            "type": "string",
                                            "name": "DG",
                                            "value": "DG"
                                        }, {
                                            "type": "string",
                                            "name": "V1",
                                            "value": "V1"
                                        }]
                                    },

                                    "asertypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "asertypeName",
                                        "@name": "asertypeName"
                                    },

                                    "ctapName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapName",
                                        "@name": "ctapName"
                                    },

                                    "auditionStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "auditionStatus",
                                        "@name": "auditionStatus"
                                    },

                                    "currentAreaStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "currentAreaStatus",
                                        "@name": "currentAreaStatus",

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

                                    "classtypeRecommendstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeRecommendstatus",
                                        "@name": "classtypeRecommendstatus",

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

                            "@alias": "classTypeList",
                            "@name": "classTypeList"
                        }
                    },

                    "required": ["skipProjectId", "classTypeList"]
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
    var pluginName = "nl:channel/query-project-channel-pro-course-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-project-channel-pro-course-list.options.js"
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
            "nl:channel/query-project-channel-pro-course-list$options=./api..query-project-channel-pro-course-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();