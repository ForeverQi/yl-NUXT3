const k = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];
const ret = {
    /**
     * 移除字符串两侧的空白字符
     * @param x
     * @returns {*}
     */
    trim(x) {
        x = x || '';
        return x.replace(/^\s+|\s+$/gm, '');
    },
    /**
     * 是否为空
     * @param arg1
     * @returns {boolean}
     */
    isEmpty(arg1) {
        return !ret.hasLength(arg1);
    },
    /**
     * 是否有长度
     * @param arg1
     * @returns {boolean}
     */
    hasLength(arg1) {
        if (typeof arg1 === 'string' || Array.isArray(arg1)) {
            return arg1.length > 0;
        } else if (typeof arg1 === 'number') {
            return true;
        }
        return false;
    },
    /**
     * 字符串首字母大写
     * @param str 字符串
     * @returns {string}
     */
    toUpperFirst(str) {
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    },
    /**
     * 转换为驼峰格式
     * @param str
     * @returns {string}
     */
    toCamelCase(str) {
        let s =
            str &&
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
                .join('');
        return s.slice(0, 1).toLowerCase() + s.slice(1);
    },
    /**
     * 填充字符串中的占位符："{abc}",{abc:123}=>123
     * @param str
     * @param params
     * @returns {*}
     */
    fillPlaceholders(str, params) {
        var re = /{(.*?)}/g;
        var string = str;
        var temp;
        while ((temp = re.exec(str))) {
            string = string.replace(temp[0], params[temp[1]]);
        }
        return string;
    },
    /**
     * @description 图片string链接地址及样式修正,题库模块使用
     * @param {String}
     * @return {String}
     */
    imgTextTrim(text) {
        if (text.match(/<img(.*?)>/g)) {
            let imgList = text.match(/<img(.*?)>/g);
            imgList.forEach((item) => {
                let imgInfo = `${item.split('/>')[0]} style='width: 100px;' />`;
                if (imgInfo.indexOf(UrlUtil.filedownUrl) === -1) {
                    let itemPart = imgInfo.split('src=');
                    let srcSymbol = itemPart[1].substr(0, 1);
                    itemPart = [itemPart[0], itemPart[1].subsrt(1)];
                    imgInfo = `${itemPart[0]}src=${srcSymbol + UrlUtil.filedownUrl + itemPart[1]}`;
                }
                text = text.replace(item, imgInfo);
            });
        }
        return text;
    },
    /**
     * @description 字符串转base64
     */
    toBase64(text) {
        return btoa(text);
    },
    /**
     * @description 解析base64
     */
    parseBase64(text) {
        return atob(text);
    },
    toShort(values) {
        values = /(\d{10})(\d+)/.exec(values);
        var values1 = +values[1];
        var values2 = +values[2];
        function short(value, i = 0, j = 0) {
            var result = '';
            if (value == 0) {
                return '0';
            }
            if ((value = /\d+/.exec(value)[0])) {
                if (i == 0) {
                    while (true) {
                        if (Math.pow(k.length, i) > value) {
                            i--;
                            break;
                        }
                        i++;
                    }
                }
                while (true) {
                    if (Math.pow(k.length, i) * j > value) {
                        j--;
                        break;
                    }
                    j++;
                }
                if (i > 0) {
                    result += k[j] + short(value - Math.pow(k.length, i) * j, i - 1);
                } else {
                    result += k[value];
                }
            }
            return result;
        }
        var r1 = short(values1);
        var r2 = short(values2);
        return r1 + r2;
    },
    toLong(values) {
        values = /(.{6})(.*)/.exec(values);
        var values1 = [...values[1]].join('');
        var values2 = [...values[2]].join('');

        function long(value = '') {
            var result = 0;
            value = value.split('').reverse();
            value.forEach((item, index, arr) => {
                result += Math.pow(k.length, index) * k.indexOf(item);
            });
            return `${result}`.padStart(10, '0');
        }
        return long(values1) + long(values2);
    },
};
export default ret;
