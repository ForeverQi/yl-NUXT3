export default (config) => {
    const ret = {
        set(name, value, seconds = 0) {
            // name += config['project.key'];
            localStorage.setItem(name, JSON.stringify(value));
            if (seconds > 0) {
                localStorage.setItem(`${name}_cache_duration`, seconds.toString());
                localStorage.setItem(`${name}_cache_start`, Date.now().toString());
            }
        },
        get(name) {
            // name += config['project.key'];
            const cacheStart = localStorage.getItem(`${name}_cache_start`);
            const cacheDuration = localStorage.getItem(`${name}_cache_duration`);
            if (cacheStart && cacheDuration && parseInt(cacheStart) + parseInt(cacheDuration) * 1000 < Date.now()) {
                localStorage.removeItem(name);
                localStorage.removeItem(`${name}_cache_start`);
                localStorage.removeItem(`${name}_cache_duration`);
                return;
            }
            if (localStorage.getItem(name)) {
                let obj = null;
                try {
                    obj = JSON.parse(localStorage.getItem(name));
                } catch (e) {
                    obj = null;
                }
                return obj;
            } else {
                return '';
            }
        },
        getUserInfo() {
            return this.get('loginStatus');
        },
        delete(name) {
            localStorage.removeItem(name);
        },
    };

    return ret;
};
