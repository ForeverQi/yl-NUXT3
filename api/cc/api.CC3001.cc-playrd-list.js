/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "cc", apiAlias = "cc-playrd-list";

      var apiDefinition = {
          api: "cc/user/playrd/class/list",
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
                  "title": "听课记录列表",
                  "description": "听课记录列表",
                  "type": "object",

                  "properties": {
                      "pageIndex": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "pageIndex",
                          "@name": "pageIndex"
                      },

                      "pageSize": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "pageSize",
                          "@name": "pageSize"
                      },

                      "classId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "classId",
                          "@name": "classId"
                      }
                  },

                  "required": ["pageIndex", "pageSize", "classId"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "听课记录列表",
                  "description": "听课记录列表",
                  "type": "object",

                  "properties": {
                      "count": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "count",
                          "@name": "count"
                      },

                      "studyrdStatus": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "studyrdStatus",
                          "@name": "studyrdStatus"
                      },

                      "data": {
                          "type": "array",
                          "required": true,
                          "default": "",

                          "items": {
                              "type": "object",

                              "required": [
                                  "coursewareName",
                                  "playrdMcc",
                                  "palyrdDuration",
                                  "playrdStarttime",
                                  "coursewareId",
                                  "coursewareOnlineurl",
                                  "classId",
                                  "playrdDevice",
                                  "coursewareVideoprividers"
                              ],

                              "properties": {
                                  "coursewareName": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "coursewareName",
                                      "@name": "coursewareName"
                                  },

                                  "playrdMcc": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "playrdMcc",
                                      "@name": "playrdMcc"
                                  },

                                  "palyrdDuration": {
                                      "type": "number",
                                      "required": true,
                                      "default": "",
                                      "@alias": "palyrdDuration",
                                      "@name": "palyrdDuration"
                                  },

                                  "playrdStarttime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "playrdStarttime",
                                      "@name": "playrdStarttime"
                                  },

                                  "coursewareId": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "coursewareId",
                                      "@name": "coursewareId"
                                  },

                                  "coursewareOnlineurl": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "coursewareOnlineurl",
                                      "@name": "coursewareOnlineurl"
                                  },

                                  "classId": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "classId",
                                      "@name": "classId"
                                  },

                                  "playrdDevice": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "playrdDevice",
                                      "@name": "playrdDevice"
                                  },

                                  "coursewareVideoprividers": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "coursewareVideoprividers",
                                      "@name": "coursewareVideoprividers"
                                  }
                              }
                          },

                          "@alias": "data",
                          "@name": "data"
                      }
                  },

                  "required": ["count", "studyrdStatus", "data"]
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
  var pluginName = "nl:cc/cc-playrd-list";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api.CC3001.cc-playrd-list.options.js"
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
          "nl:cc/cc-playrd-list$options=./api.CC3001.cc-playrd-list.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();