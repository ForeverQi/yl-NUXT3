import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/public/api.UC1608.query-statistics-key.js';

import storage from '../common/inject/storage.js';

function getBDkey(config) {
    return new Promise((resolve, reject) => {
        const st = storage(config);
        if (st.get('KEYS_BAIDU')) {
            return resolve(st.get('KEYS_BAIDU'));
        }
        niceloo.api.call('public/query-statistics-key', {
            configType: 'BAIDU',
            configCode: 'bdtongji',
            queryType: '',
            returnType: '',
            configScopetype: 'G',
            onsuccess: (res) => {
                console.log('@@#', res);
                let key = res.BAIDU.bdtongji;
                st.set('KEYS_BAIDU', key);
                resolve(key);
            },
            onerror: (err) => {
                reject(err);
            },
            oncomplete: () => {},
        });
    });
}

function init(config) {
    if (process.client) {
        getBDkey(config).then((key) => {
            let script = document.createElement('script');
            script.innerHTML = `var _hmt = _hmt || [];
                (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${key}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
                })();`;
            document.body.appendChild(script);
        });
    }
}

export default (config) => {
    init(config);
    return {};
};
