/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "courseware-video-auth";

        var apiDefinition = {
            api: "cc/courseware/video/auth",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "圆点直播视频鉴权",
                    "description": "圆点直播视频鉴权",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "playrdNeed": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "playrdNeed",
                            "@name": "playrdNeed"
                        },

                        "coursewareOnlineurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareOnlineurl",
                            "@name": "coursewareOnlineurl"
                        }
                    },

                    "required": ["coursewareId", "playrdNeed", "coursewareOnlineurl"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "圆点直播视频鉴权",
                    "description": "圆点直播视频鉴权",
                    "type": "object",

                    "properties": {
                        "videoAddress": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "videoAddress",
                            "@name": "videoAddress"
                        }
                    },

                    "required": ["videoAddress"]
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

    var pluginName = "nl:cc/courseware-video-auth";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CC3105.courseware-video-auth.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/courseware-video-auth$options=./api.CC3105.courseware-video-auth.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
