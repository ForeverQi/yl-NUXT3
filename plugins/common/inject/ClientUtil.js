let isLoad = null;
function loadPcClientJs() {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = '/_nuxt/js/protocolcheck.js';
        document.body.append(script);
        script.addEventListener('load', () => {
            resolve();
        });
        script.addEventListener('error', (e) => {
            console.error('PcClientUtil的需要的js加载失败！');
            reject(res);
        });
    });
}
let openPcClient = function (newhref) {
    if (isLoad == null) {
        isLoad = loadPcClientJs();
    }
    isLoad
        .then(() => {
            let NicelooClientDownUrl = 'https://client.niceloo.com/PcClient/NicelooClient.exe';
            window.protocolCheck(newhref, function () {
                global.__implXlib_alert__('请安装PC客户端').then(function () {
                    window.location.href = NicelooClientDownUrl;
                });
            });
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
        })
        .catch(() => {});
};

export default {
    openPcClient,
};
