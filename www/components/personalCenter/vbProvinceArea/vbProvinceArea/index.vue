<template>
    <!-- 省市区 -->
    <div class="areaWrap">
        <select @change="getRegion('city', provinceCode)" v-model="provinceCode">
            <option value="0">请选择</option>
            <option v-for="item in provinceList" :value="item.areaCode" :key="item.areaName">{{ item.areaName }}</option>
        </select>
        <span v-show="lineShow">-</span>
        <select @change="getRegion('area', cityCode)" v-model="cityCode" :disabled="cityList.length == 0">
            <option value="0">请选择</option>
            <option v-for="item in cityList" :value="item.areaCode" :key="item.areaName">{{ item.areaName }}</option>
        </select>
        <span v-show="areaShow && lineShow">-</span>
        <select v-model="areaCode" v-show="areaShow" :disabled="areaList.length == 0">
            <option value="0">请选择</option>
            <option v-for="item in areaList" :value="item.areaCode" :key="item.areaName">{{ item.areaName }}</option>
        </select>
    </div>
</template>

<script>
import '@/api/uc/api.UC0208.uc-dict-area-tree.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'vbProvinceArea',
    props: {
        defaultArea: {
            type: Object,
            default() {
                return {
                    provinceCode: '0',
                    cityCode: '0',
                    areaCode: '0',
                };
            },
        },
        lineShow: {
            type: Boolean,
            default: true,
        },
        areaShow: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            provinceCode: '0',
            provinceName: '',
            cityCode: '0',
            cityName: '',
            areaCode: '0',
            areaName: '',
        };
    },
    mounted() {
        this.getRegion('province');
        let _this = this;
        ['defaultArea'].forEach(
            (val) => {
                _this.$watch(val, () => {
                    this.provinceList = [];
                    this.cityList = [];
                    this.areaList = [];
                    this.provinceCode = '0';
                    this.cityCode = '0';
                    this.areaCode = '0';
                    this.getRegion('province');
                    let _this = this;
                    if (this.defaultArea.provinceCode && this.defaultArea.provinceCode != '0') {
                        this.provinceCode = this.defaultArea.provinceCode;
                        this.getRegion('city', this.provinceCode, () => {
                            _this.cityCode = _this.defaultArea.cityCode;
                            if (_this.defaultArea.cityCode && _this.defaultArea.cityCode != '0') {
                                _this.getRegion('area', _this.defaultArea.cityCode, () => {
                                    _this.areaCode = _this.defaultArea.areaCode;
                                });
                            }
                        });
                    }
                });
            },
            {
                deep: true,
                immediate: true,
            }
        );
        ['provinceCode', 'cityCode', 'areaCode'].forEach(
            (val) => {
                _this.$watch(val, () => {
                    _this.findName();
                    _this.$emit('areaChange', {
                        provinceCode: _this.provinceCode,
                        provinceName: _this.provinceName,
                        cityCode: _this.cityCode,
                        cityName: _this.cityName,
                        areaCode: _this.areaCode,
                        areaName: _this.areaName,
                    });
                });
            },
            {
                deep: true,
            }
        );
    },
    methods: {
        findName() {
            this.provinceName = '';
            this.cityName = '';
            this.areaName = '';
            if (this.provinceCode && this.provinceCode != '0' && this.provinceList.length > 0) {
                //省名字
                for (let i = 0; i < this.provinceList.length; i++) {
                    if (this.provinceList[i].areaCode == this.provinceCode) {
                        this.provinceName = this.provinceList[i].areaName;
                        break;
                    }
                }
            }
            if (this.cityCode && this.cityCode != '0' && this.cityList.length > 0) {
                //市名字
                for (let i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].areaCode == this.cityCode) {
                        this.cityName = this.cityList[i].areaName;
                        break;
                    }
                }
            }
            if (this.areaCode && this.areaCode != '0' && this.areaList.length > 0) {
                //区名字
                for (let i = 0; i < this.areaList.length; i++) {
                    if (this.areaList[i].areaCode == this.areaCode) {
                        this.areaName = this.areaList[i].areaName;
                        break;
                    }
                }
            }
        },
        getRegion(type, areaCode, success) {
            //获取省市区

            if (areaCode == '0') {
                return;
            }
            let _this = this;
            if (type == 'province') {
                if (sessionStorage.getItem('provinceList')) {
                    let data = JSON.parse(sessionStorage.getItem('provinceList'));
                    _this.provinceCode = _this.defaultArea.provinceCode || '0';
                    _this.provinceList = data.data || [];
                    _this.findName();
                    _this.$emit('areaChange', {
                        provinceCode: _this.provinceCode,
                        provinceName: _this.provinceName,
                        cityCode: _this.cityCode,
                        cityName: _this.cityName,
                        areaCode: _this.areaCode,
                        areaName: _this.areaName,
                    });
                    success && success();
                } else {
                    _handleAreaTree();
                }
            }
            if (type !== 'province') {
                _handleAreaTree();
            }
            function _handleAreaTree() {
                niceloo.api.call('uc/uc-dict-area-tree', {
                    areaCode,
                    onsuccess: (data) => {
                        if (type == 'province') {
                            sessionStorage.setItem('provinceList', JSON.stringify(data));
                            _this.provinceCode = _this.defaultArea.provinceCode || '0';
                            _this.provinceList = data.data || [];
                        }
                        if (type == 'city') {
                            _this.cityList = data.data || [];
                            _this.cityCode = '0';
                            _this.areaCode = '0';
                            _this.areaList = [];
                        }
                        if (type == 'area') {
                            _this.areaCode = '0';
                            _this.areaList = data.data || [];
                            for (let i = 0; i < _this.areaList.length; i++) {
                                if (_this.areaList[i].areaCode == _this.defaultArea.areaCode) {
                                    _this.areaCode = _this.defaultArea.areaCode;
                                    break;
                                }
                            }
                        }
                        _this.findName();
                        _this.$emit('areaChange', {
                            provinceCode: _this.provinceCode,
                            provinceName: _this.provinceName,
                            cityCode: _this.cityCode,
                            cityName: _this.cityName,
                            areaCode: _this.areaCode,
                            areaName: _this.areaName,
                        });
                        success && success();
                    },

                    onerror: _this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.areaWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    select {
        width: 105px;
        line-height: 32px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 2px;
        outline: none;
    }
}
</style>
