/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "cc", apiAlias = "query-quest-play-token";

      var apiDefinition = {
          api: "rc/web/polyv/child/token/get",
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
                  "title": "获取保利威视频播放凭证(子账号)",
                  "description": "获取学习中心试题解析中的视频播放token",
                  "type": "object",

                  "properties": {
                      "vid": {
                          "type": "string",
                          "required": true,
                          "@alias": "vid",
                          "@name": "vid"
                      },

                      "iswxa": {
                          "type": "string",
                          "required": false,
                          "@alias": "iswxa",
                          "@name": "iswxa"
                      },

                      "ts": {
                          "type": "string",
                          "required": true,
                          "@alias": "ts",
                          "@name": "ts"
                      },

                      "sign": {
                          "type": "string",
                          "required": true,
                          "@alias": "sign",
                          "@name": "sign"
                      },

                      "userYouLuNum": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "userYouLuNum",
                          "@name": "userYouLuNum"
                      },

                      "userId": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "userId",
                          "@name": "userId"
                      }
                  },

                  "required": ["vid", "ts", "sign"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "获取保利威视频播放凭证(子账号)",
                  "description": "获取学习中心试题解析中的视频播放token",
                  "type": "object",

                  "properties": {
                      "token": {
                          "type": "string",
                          "required": true,
                          "@alias": "token",
                          "@name": "token"
                      },

                      "sign": {
                          "type": "string",
                          "required": true,
                          "@alias": "sign",
                          "@name": "sign"
                      },

                      "ts": {
                          "type": "string",
                          "required": true,
                          "@alias": "ts",
                          "@name": "ts"
                      }
                  },

                  "required": ["token", "sign", "ts"]
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
  var pluginName = "nl:cc/query-quest-play-token";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-quest-play-token.options.js"
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
          "nl:cc/query-quest-play-token$options=./api..query-quest-play-token.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();