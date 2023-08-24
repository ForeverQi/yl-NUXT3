/**
 * 数值精度计算工具
 */
const ret = {
    /**
     * 格式化百分率 0.23=》23%
     * @param num 数字
     * @returns {string}
     */
    rate(num = 0) {
        return ret.mul(ret.toFixed(num, 4), 100) + '%';
    },
    /**
     * 精确到小数点后2位
     * @param num 数字
     * @returns {number}
     */
    fix2(num) {
        return Number(ret.toFixed(num, 2));
    },
    /**
     * 自定义精确到小数点后几位
     * @param num 数字
     * @param length 小数点后位数
     * @returns {number}
     */
    toFixed(num = 0, length) {
        return Number(num).toFixed(length);
    },
    /**
     * 返回两个指定的数中较大的值
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    max(a, b) {
        return Math.max(a, b);
    },
    /**
     * 返回指定的数字中最低值
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    min(a, b) {
        return Math.min(a, b);
    },
    /**
     * 加法
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    add(a, b) {
        var c, d, e;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        // eslint-disable-next-line no-sequences
        return (e = Math.pow(10, Math.max(c, d))), (ret.mul(a, e) + ret.mul(b, e)) / e;
    },
    /**
     * 减法
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    sub(a, b) {
        var c, d, e;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        // eslint-disable-next-line no-sequences
        return (e = Math.pow(10, Math.max(c, d))), (ret.mul(a, e) - ret.mul(b, e)) / e;
    },
    /**
     * 乘法
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    mul(a, b) {
        var c = 0;
        var d = a.toString();
        var e = b.toString();
        try {
            c += d.split('.')[1].length;
        } catch (f) {}
        try {
            c += e.split('.')[1].length;
        } catch (f) {}
        return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
    },
    /**
     * 除法保留2位小数
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    divFix2(a, b) {
        return ret.fix2(ret.div(a, b));
    },
    /**
     * 除法
     * @param a 数字
     * @param b 数字
     * @returns {number}
     */
    div(a, b) {
        var c;
        var d;
        var e = 0;
        var f = 0;
        try {
            e = a.toString().split('.')[1].length;
        } catch (g) {}
        try {
            f = b.toString().split('.')[1].length;
        } catch (g) {}
        // eslint-disable-next-line no-sequences
        return (c = Number(a.toString().replace('.', ''))), (d = Number(b.toString().replace('.', ''))), ret.mul(c / d, Math.pow(10, f - e));
    },
};
export default ret;
