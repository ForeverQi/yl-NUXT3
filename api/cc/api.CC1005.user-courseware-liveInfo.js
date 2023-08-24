/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "user-courseware-liveInfo";

        var apiDefinition = {
            api: "cc/user/courseware/liveInfo",
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
                    "title": "获取直播课件详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "referer": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "referer",
                            "@name": "referer"
                        },

                        "playrdDevicename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "playrdDevicename",
                            "@name": "playrdDevicename"
                        },

                        "playrdDeviceos": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "playrdDeviceos",
                            "@name": "playrdDeviceos"
                        },

                        "playrdDeviceversion": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "playrdDeviceversion",
                            "@name": "playrdDeviceversion"
                        }
                    },

                    "required": [
                        "coursewareId",
                        "classId",
                        "referer",
                        "playrdDevicename",
                        "playrdDeviceos",
                        "playrdDeviceversion"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取直播课件详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "title": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "title",
                            "@name": "title"
                        },

                        "coursewareLiveurl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursewareLiveurl",
                            "@name": "coursewareLiveurl"
                        },

                        "coursewareType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursewareType",
                            "@name": "coursewareType",

                            "@enums": [{
                                "type": "string",
                                "name": "S",
                                "value": "S"
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
                                "name": "E",
                                "value": "E"
                            }, {
                                "type": "string",
                                "name": "H",
                                "value": "H"
                            }, {
                                "type": "string",
                                "name": "F",
                                "value": "F"
                            }, {
                                "type": "string",
                                "name": "O",
                                "value": "O"
                            }]
                        },

                        "playrdMcc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "playrdMcc",
                            "@name": "playrdMcc"
                        },

                        "coursewareBeginstate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareBeginstate",
                            "@name": "coursewareBeginstate"
                        },

                        "source": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "source",
                            "@name": "source"
                        },

                        "scheduleId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "scheduleId",
                            "@name": "scheduleId"
                        },

                        "coursewareVideoprividers": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareVideoprividers",
                            "@name": "coursewareVideoprividers",

                            "@enums": [{
                                "type": "string",
                                "name": "SP",
                                "value": "SP"
                            }, {
                                "type": "string",
                                "name": "LV",
                                "value": "LV"
                            }, {
                                "type": "string",
                                "name": "SC",
                                "value": "SC"
                            }, {
                                "type": "string",
                                "name": "LC",
                                "value": "LC"
                            }]
                        }
                    },

                    "required": [
                        "title",
                        "playrdMcc",
                        "coursewareBeginstate",
                        "source",
                        "scheduleId",
                        "coursewareVideoprividers"
                    ]
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
    var pluginName = "nl:cc/user-courseware-liveInfo";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC1005.user-courseware-liveInfo.options.js"
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
            "nl:cc/user-courseware-liveInfo$options=./api.CC1005.user-courseware-liveInfo.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();