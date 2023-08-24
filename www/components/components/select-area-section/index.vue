<template>
    <div class="select-area-section">
        <img class="area-img" src="./asset/img/arae_icon.png" />
        <p class="area">{{ seleceArea }}</p>
        <img src="./asset/img/bottom.png" />
        <div class="area-list" :style="{ left: left + 'px' }">
            <div class="triangle-div" :style="{ left: 45 - left + 'px' }"></div>
            <div
                v-for="(item, index) in provinceList"
                class="city-name"
                :class="seleceArea === item.areaName ? 'active' : ''"
                :key="index"
                @click="clickCity(item, $event)"
            >
                {{ item.areaName }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        // 向左的定位值
        left: {
            type: Number,
            default: 0,
        },
        seleceArea: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            provinceList: [], // 地区列表
        };
    },
    mounted() {
        this.getCity().then((res) => {
            this.provinceList = res;
        });
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        // 选择城市
        clickCity(cityData, e) {
            this.areaCode = cityData.areaCode;
            this.$emit('handle-click-city', cityData, e);
        },
    },
};
</script>

<style lang="less" scoped>
.select-area-section {
    position: relative;
    width: 120px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover .area-list {
        display: flex;
    }
}
.area-img {
    width: 20px;
    height: 20px;
}
.area {
    margin: 0 12px 0 4px;
    font-size: 16px;
    font-weight: 700;
    color: #3a3d4b;
    line-height: 20px;
    letter-spacing: 0.67px;
}
.area-list {
    display: none;
    width: 532px;
    padding: 26px 15px 14px 26px;
    box-sizing: border-box;
    margin-top: 7px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 6px 16px 0px rgba(233, 233, 233, 0.5);
    position: absolute;
    top: 100%;
    z-index: 11;
    flex-wrap: wrap;

    &::after {
        content: '';
        width: 100%;
        height: 8px;
        background-color: transparent;
        position: absolute;
        left: 0;
        top: -8px;
    }

    .triangle-div {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #fff;
        transform: rotateZ(45deg);
        position: absolute;
        top: -3px;
    }
    .city-name {
        margin-bottom: 12px;
        margin-right: 8px;
        padding: 0 16px;
        width: 40px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #53586c;
        cursor: pointer;
        white-space: nowrap;
        font-size: 14px;
        border-radius: 4px;

        &.active,
        &:hover {
            color: #ff2e30;
        }

        &.active {
            background-color: #ffece8;
        }
    }
}
</style>
