/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "cc", apiAlias = "query-study-tool";

      var apiDefinition = {
          api: "cc/class/extra/study-tool",
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
                  "title": "班级详情页-学习工具",
                  "description": "学习工具",
                  "type": "object",

                  "properties": {
                      "classId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "classId",
                          "@name": "classId"
                      }
                  },

                  "required": ["classId"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "班级详情页-学习工具",
                  "description": "学习工具",
                  "type": "object",

                  "properties": {
                      "classId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "classId",
                          "@name": "classId"
                      },

                      "answerQuestion": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "answerQuestion",
                          "@name": "answerQuestion"
                      },

                      "examSite": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "examSite",
                          "@name": "examSite"
                      },

                      "phraseLookup": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "phraseLookup",
                          "@name": "phraseLookup"
                      },

                      "memoryFlash": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "memoryFlash",
                          "@name": "memoryFlash"
                      },

                      "examSystem": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "examSystem",
                          "@name": "examSystem"
                      },

                      "questionBook": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "questionBook",
                          "@name": "questionBook"
                      },

                      "favorites": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "favorites",
                          "@name": "favorites"
                      },

                      "xiaoYouInspector": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "xiaoYouInspector",
                          "@name": "xiaoYouInspector"
                      },

                      "trainingPlatform": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "trainingPlatform",
                          "@name": "trainingPlatform"
                      }
                  },

                  "required": [
                      "classId",
                      "answerQuestion",
                      "examSite",
                      "phraseLookup",
                      "memoryFlash",
                      "examSystem",
                      "questionBook",
                      "favorites",
                      "xiaoYouInspector",
                      "trainingPlatform"
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
  var pluginName = "nl:cc/query-study-tool";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-study-tool.options.js"
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
          "nl:cc/query-study-tool$options=./api..query-study-tool.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();