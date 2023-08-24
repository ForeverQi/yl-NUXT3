import Vue from 'vue';

let filters = {
    /**
     * 格式化金额(元)
     * @param val
     * @returns {*|string|never}
     */
    veMoney(val = 0, dev = 1) {
        //自定义过滤器 格式化金额（保留两位小数）
        val = Number(val);
        val = _div(val, dev);
        val = val.toString().replace(/\$|,/g, '');
        if (isNaN(val)) {
            val = '0';
        }
        let sign = val == (val = Math.abs(val));
        val = Math.floor(val * 100 + 0.50000000001);
        let cents = val % 100;
        val = Math.floor(val / 100).toString();
        if (cents < 10) {
            cents = '0' + cents;
        }
        for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + val.substring(val.length - (4 * i + 3));
            // val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
        }
        function _div(a, b) {
            let c;
            let d;
            let e = 0;
            let f = 0;
            try {
                e = a.toString().split('.')[1].length;
            } catch (g) {}
            try {
                f = b.toString().split('.')[1].length;
            } catch (g) {}
            c = Number(a.toString().replace('.', ''));
            d = Number(b.toString().replace('.', ''));
            return _mul(c / d, Math.pow(10, f - e));
        }
        function _mul(a, b) {
            let c = 0;
            let d = a.toString();
            let e = b.toString();
            try {
                c += d.split('.')[1].length;
            } catch (f) {}
            try {
                c += e.split('.')[1].length;
            } catch (f) {}
            return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
        }

        return (sign ? '' : '-') + val + '.' + cents;
    },
    //格式化金额(分)
    veMoneyCent(val) {
        let num = filters.veMoney(Math.abs(val), 100);
        return filters.removeExcess(num);
    },
    //去除多余的小数，最多保留两位
    removeExcess(val) {
        if (val.indexOf('.') > -1) {
            let arr = val.split('.');
            arr[1] = arr[1].match(/^\d*[1-9]{1}/);
            if (arr[1]) {
                return arr.join('.');
            } else {
                return arr[0];
            }
        } else {
            return val;
        }
    },
    //去掉格式为xx-xx-xx hh:mm:ss后面的时分秒
    dayTime(val) {
        if (val) {
            return val.replace(/\s.*/, '');
        }
    },
    // 获取最大最小价格
    filterPrice(courseData) {
        // 先规范一下数据  转为number
        courseData.minPrice = Number(courseData.minPrice);
        courseData.maxPrice = Number(courseData.maxPrice);
        courseData.minStdPrice = Number(courseData.minStdPrice);
        courseData.maxStdPrice = Number(courseData.maxStdPrice);
        let filterMinPrice = ''; //  过滤的最小价格
        let filterMaxPrice = ''; //  过滤的最大价格
        let realMinPromoteSales = courseData.minPrice; // 最小现实促销价
        let realMaxPromoteSales = courseData.maxPrice; // 最大现实促销价
        let realMinSales = courseData.minStdPrice || courseData.stdminPrice; // 最小真实价
        let realMaxSales = courseData.maxStdPrice || courseData.stdmaxPrice; // 最大真实价
        filterMinPrice = realMinPromoteSales > 0 ? realMinPromoteSales : realMinSales;
        filterMaxPrice = realMaxPromoteSales > 0 ? realMaxPromoteSales : realMaxSales;
        // 如果过滤的最小价格和最大价格一样  只返回一个
        if (filterMinPrice === filterMaxPrice) {
            return filters.veMoneyCent(filterMinPrice);
        } else {
            return `${filters.veMoneyCent(filterMinPrice)}-${filters.veMoneyCent(filterMaxPrice)}`;
        }
    },
};

for (var k in filters) {
    Vue.filter(k, filters[k]);
}
