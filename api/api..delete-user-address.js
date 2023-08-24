/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "uc", apiAlias = "delete-user-address";

      var apiDefinition = {
          api: "uc/recvaddr/delete",
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
                  "title": "地址删除",
                  "description": "用户地址删除",
                  "type": "object",

                  "properties": {
                      "recvaddrId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "recvaddrId",
                          "@name": "recvaddrId"
                      }
                  },

                  "required": ["recvaddrId"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, undefined, {
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
  var pluginName = "nl:uc/delete-user-address";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..delete-user-address.options.js"
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
          "nl:uc/delete-user-address$options=./api..delete-user-address.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();