/* eslint-disable */


(function() {
    var factory = function(getters) {
        return {
            ifSimulateRequest: false,
            ifSimulateSuccessfulResponse: 'randomly',
            simulateRequestValidator: {},
            simulateResponseData: {
                liveId: 1,
                livePath: 'https://s1.videocc.net/live-only-video/polyv-live-video.html?uid=82daea5726&vid=2867336',
                name: '49题秒懂',
                liveStatus: 3,
                appointmentStatus: 'Y',
                liveStartTime: '2022-03-23 12:33',
                liveEndTime: '2022-04-03 12:33',
                wareDtoList: [
                    {
                        auditionDuration: 10,
                        auditionStatus: 'F',
                        coursewareName: '第一节',
                        coursewarePath: '',
                        coursewareId: '1',
                    }
                ]
            }
        };
    };

    var pluginName = "nl:topLive/mcp-home-top-live-info$options";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js"], function(defineModule) {
            return defineModule.wrap4amdjs(pluginName, arguments, factory);
        });
    } else if (typeof defineModule === "function") defineModule(pluginName, [], factory, defineModule.isEnvNode() ? {
        module: module
    } : null);
})();
