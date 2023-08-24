/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "do-play-batch-add";

        var apiDefinition = {
            api: "cc/user/class/play/batch/add",
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
                    "title": "[播放器] 学员看课-批量添加听课记录",
                    "description": "听课记录上报",
                    "type": "object",

                    "properties": {
                        "playRds": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",

                                "required": [
                                    "playRds[n].classId",
                                    "playRds[n].playRdIP",
                                    "playRds[n].playRdStartTime",
                                    "playRds[n].playRdEndTime",
                                    "playRds[n].playRdDevice",
                                    "playRds[n].playRdDeviceName",
                                    "playRds[n].playRdDeviceOS",
                                    "playRds[n].playRdDeviceVersion",
                                    "playRds[n].playRdOffLineStatus"
                                ],

                                "properties": {
                                    "playRds[n].classId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].classId",
                                        "@name": "playRds[n].classId"
                                    },

                                    "playRds[n].courseId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "playRds[n].courseId",
                                        "@name": "playRds[n].courseId"
                                    },

                                    "playRds[n].catalogId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "playRds[n].catalogId",
                                        "@name": "playRds[n].catalogId"
                                    },

                                    "playRds[n].coursewareId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "playRds[n].coursewareId",
                                        "@name": "playRds[n].coursewareId"
                                    },

                                    "playRds[n].playRdMcc": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "playRds[n].playRdMcc",
                                        "@name": "playRds[n].playRdMcc"
                                    },

                                    "playRds[n].playRdIP": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdIP",
                                        "@name": "playRds[n].playRdIP"
                                    },

                                    "playRds[n].playRdStartTime": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdStartTime",
                                        "@name": "playRds[n].playRdStartTime"
                                    },

                                    "playRds[n].playRdEndTime": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdEndTime",
                                        "@name": "playRds[n].playRdEndTime"
                                    },

                                    "playRds[n].playRdDevice": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdDevice",
                                        "@name": "playRds[n].playRdDevice"
                                    },

                                    "playRds[n].playRdDeviceName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdDeviceName",
                                        "@name": "playRds[n].playRdDeviceName"
                                    },

                                    "playRds[n].playRdDeviceOS": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdDeviceOS",
                                        "@name": "playRds[n].playRdDeviceOS"
                                    },

                                    "playRds[n].playRdDeviceVersion": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdDeviceVersion",
                                        "@name": "playRds[n].playRdDeviceVersion"
                                    },

                                    "playRds[n].playRdDuration": {
                                        "type": "number",
                                        "required": false,
                                        "@alias": "playRds[n].playRdDuration",
                                        "@name": "playRds[n].playRdDuration"
                                    },

                                    "playRds[n].playRdOffLineStatus": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "playRds[n].playRdOffLineStatus",
                                        "@name": "playRds[n].playRdOffLineStatus"
                                    }
                                }
                            },

                            "@alias": "playRds",
                            "@name": "playRds"
                        }
                    },

                    "required": ["playRds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "[播放器] 学员看课-批量添加听课记录",
                    "description": "听课记录上报",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "number",
                            "required": true,
                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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
    var pluginName = "nl:cc/do-play-batch-add";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..do-play-batch-add.options.js"
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
            "nl:cc/do-play-batch-add$options=./api..do-play-batch-add.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();