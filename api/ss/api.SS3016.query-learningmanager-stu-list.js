/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ss", apiAlias = "query-learningmanager-stu-list";

        var apiDefinition = {
            api: "ss/learningmanager/stu/list",
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
                    "title": "学生学管师列表",
                    "description": "2011-学员服务-SS",
                    "type": "object",

                    "properties": {
                        "appid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appid",
                            "@name": "appid"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["appid"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学生学管师列表",
                    "description": "2011-学员服务-SS",
                    "type": "object",

                    "properties": {
                        "openClassstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "openClassstatus",
                            "@name": "openClassstatus"
                        },

                        "count": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "learningManagers": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "projectId",
                                    "projectName",
                                    "id",
                                    "nickname",
                                    "no",
                                    "desc",
                                    "mobile",
                                    "wechat",
                                    "wechatQr",
                                    "eeUserid",
                                    "weComOConfigOpenStatus",
                                    "alias",
                                    "name",
                                    "qr_code",
                                    "thumb_avatar",
                                    "eeUserName",
                                    "eeWorkstatus"
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

                                    "id": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "id",
                                        "@name": "id"
                                    },

                                    "nickname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "nickname",
                                        "@name": "nickname"
                                    },

                                    "no": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "no",
                                        "@name": "no"
                                    },

                                    "desc": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "desc",
                                        "@name": "desc"
                                    },

                                    "mobile": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mobile",
                                        "@name": "mobile"
                                    },

                                    "wechat": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "wechat",
                                        "@name": "wechat"
                                    },

                                    "wechatQr": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "wechatQr",
                                        "@name": "wechatQr"
                                    },

                                    "eeUserid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "eeUserid",
                                        "@name": "eeUserid"
                                    },

                                    "weComOConfigOpenStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "weComOConfigOpenStatus",
                                        "@name": "weComOConfigOpenStatus"
                                    },

                                    "alias": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "alias",
                                        "@name": "alias"
                                    },

                                    "name": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "name",
                                        "@name": "name"
                                    },

                                    "qr_code": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "qr_code",
                                        "@name": "qr_code"
                                    },

                                    "thumb_avatar": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "thumb_avatar",
                                        "@name": "thumb_avatar"
                                    },

                                    "eeUserName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "eeUserName",
                                        "@name": "eeUserName"
                                    },

                                    "eeWorkstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "eeWorkstatus",
                                        "@name": "eeWorkstatus"
                                    }
                                }
                            },

                            "@alias": "learningManagers",
                            "@name": "learningManagers"
                        }
                    },

                    "required": ["openClassstatus", "count", "learningManagers"]
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
    var pluginName = "nl:ss/query-learningmanager-stu-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.SS3016.query-learningmanager-stu-list.options.js"
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
            "nl:ss/query-learningmanager-stu-list$options=./api.SS3016.query-learningmanager-stu-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();