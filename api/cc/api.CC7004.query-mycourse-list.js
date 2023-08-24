/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-mycourse-list";

        var apiDefinition = {
            api: "cc/my/class/newList",
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
                    "title": "我的班级列表-正常",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "classType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classType",
                            "@name": "classType"
                        },

                        "isShow": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isShow",
                            "@name": "isShow",

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

                    "required": ["pageSize", "pageIndex", "clientType", "classType", "isShow"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的班级列表-正常",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "total": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "total"
                        },

                        "classIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classIds",
                            "@name": "classIds"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "projectId",
                                    "projectName",
                                    "classId",
                                    "className",
                                    "classCoverpic",
                                    "studentclassGift",
                                    "studentclassExpiredate",
                                    "studentclassCreateddate",
                                    "paperId",
                                    "coursewareId",
                                    "coursewareName",
                                    "coursewareType",
                                    "coursewareLiveurl",
                                    "coursewareOnlineurl",
                                    "keepStudystatus",
                                    "ucarCwcount",
                                    "ucarLearnedcount",
                                    "ucarDurationcount",
                                    "ucarRate",
                                    "studentclassCertificationstatus",
                                    "coursewareVideoprividers",
                                    "classtypeId",
                                    "ctapId",
                                    "ctapName",
                                    "classtypePypcount",
                                    "pypSeq"
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

                                    "classId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classId",
                                        "@name": "classId"
                                    },

                                    "className": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "className",
                                        "@name": "className"
                                    },

                                    "classCoverpic": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCoverpic",
                                        "@name": "classCoverpic"
                                    },

                                    "studentclassGift": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassGift",
                                        "@name": "studentclassGift"
                                    },

                                    "studentclassExpiredate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassExpiredate",
                                        "@name": "studentclassExpiredate"
                                    },

                                    "studentclassCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassCreateddate",
                                        "@name": "studentclassCreateddate"
                                    },

                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "coursewareId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareId",
                                        "@name": "coursewareId"
                                    },

                                    "coursewareName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareName",
                                        "@name": "coursewareName"
                                    },

                                    "coursewareType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareType",
                                        "@name": "coursewareType"
                                    },

                                    "coursewareLiveurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareLiveurl",
                                        "@name": "coursewareLiveurl"
                                    },

                                    "coursewareOnlineurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareOnlineurl",
                                        "@name": "coursewareOnlineurl"
                                    },

                                    "keepStudystatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "keepStudystatus",
                                        "@name": "keepStudystatus"
                                    },

                                    "ucarCwcount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ucarCwcount",
                                        "@name": "ucarCwcount"
                                    },

                                    "ucarLearnedcount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ucarLearnedcount",
                                        "@name": "ucarLearnedcount"
                                    },

                                    "ucarDurationcount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ucarDurationcount",
                                        "@name": "ucarDurationcount"
                                    },

                                    "ucarRate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ucarRate",
                                        "@name": "ucarRate"
                                    },

                                    "studentclassCertificationstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassCertificationstatus",
                                        "@name": "studentclassCertificationstatus"
                                    },

                                    "coursewareVideoprividers": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareVideoprividers",
                                        "@name": "coursewareVideoprividers"
                                    },

                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "ctapId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapId",
                                        "@name": "ctapId"
                                    },

                                    "ctapName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapName",
                                        "@name": "ctapName"
                                    },

                                    "classtypePypcount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypePypcount",
                                        "@name": "classtypePypcount"
                                    },

                                    "pypSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "pypSeq",
                                        "@name": "pypSeq"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        },

                        "classExistStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classExistStatus",
                            "@name": "classExistStatus",

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

                    "required": ["total", "classIds", "list", "classExistStatus"]
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
    var pluginName = "nl:cc/query-mycourse-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC7004.query-mycourse-list.options.js"
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
            "nl:cc/query-mycourse-list$options=./api.CC7004.query-mycourse-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();