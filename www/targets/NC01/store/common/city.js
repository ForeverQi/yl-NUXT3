import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/uc/api.UC0208.query-dict-area-tree.js';
import '@/api/cp/api.CP0005.get-location2.js';

let link = null;
export const state = () => ({
    city: [],
});

export const mutations = {
    setCity(state, data) {
        state.city = data;
    },
};

export const actions = {
    getCity({ state, commit }) {
        if (link === null) {
            link = new Promise((resolve, reject) => {
                niceloo.api.call('uc/query-dict-area-tree', {
                    onsuccess: (res) => {
                        res.data.forEach((item, i) => {
                            const pattern = /省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/;
                            item.areaName = item.areaName.replace(pattern, '');
                        });
                        resolve(res);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        }
        return link.then((res) => {
            commit('setCity', res.data);
            return state.city;
        });
    },
    getArea({ state, dispatch }) {
        return new Promise((resolve, reject) => {
            niceloo.api.call('cp/get-location2', {
                onsuccess: (res) => {
                    resolve(res);
                },
                onerror: (err) => {
                    reject(err);
                },
            });
        }).then((res) => {
            let cityName = '';
            let cityCode = '110000';
            try {
                cityName = res.data.content.address_detail.province;
            } catch (err) {
                cityName = '北京';
            }

            return dispatch('getCity').then((list) => {
                list.some((r) => {
                    if (cityName.includes(r.areaName)) {
                        cityCode = r.areaCode;
                        cityName = r.areaName;
                        return true;
                    }
                    return false;
                });
                return {
                    cityCode,
                    cityName,
                };
            });
        });
    },
};
