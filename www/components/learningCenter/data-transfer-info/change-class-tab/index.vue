<template>
    <div class="swiper-section" v-swiper:mySwiper="swiperOption">
        <ul class="swiper-wrapper">
            <li
                v-for="(item, index) in classList"
                :key="index"
                class="swiper-slide"
                :class="item.sourceClassId === currentSourceClassId ? 'active' : ''"
                @click="handleChangeClass(item)"
            >
                {{ item.sourceClassName }}
            </li>
        </ul>
        <span class="to-left swiper-button-prev"><img src="./asset/images/to-next.png" alt="" /></span>
        <span class="to-right swiper-button-next">
            <img src="./asset/images/to-next.png" alt="" />
        </span>
    </div>
</template>

<script>
import '@/api/cc/api..query-class-transfer-list.js'; //【接口-转班听课率平移】 班级列表
export default {
    name: 'index',
    data() {
        return {
            swiperOption: {
                centeredSlides: false,
                slidesPerView: 'auto',
                freeMode: true,
                navigation: {
                    nextEl: '.to-right',
                    prevEl: '.to-left',
                },
            },
            currentSourceClassId: '',
            classList: [],
        };
    },
    watch: {
        currentSourceClassId(newval) {
            this.$emit('tab-switch', newval);
        },
    },
    mounted() {
        this.getClassList();
    },
    methods: {
        handleChangeClass(val) {
            this.currentSourceClassId = val.sourceClassId;
        },
        //cc/user/class/transfer/class/list
        getClassList() {
            this.$callApi('cc/query-class-transfer-list', {
                classId: this.$route.params.classId,
                onsuccess: (res) => {
                    this.classList.splice(0, this.classList.length, ...res);
                    this.currentSourceClassId = res[0].sourceClassId;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.swiper-section {
    background: #ffffff;
}
.tab {
}
ul {
    /*width: 1200px;*/
    height: 60px;
    /*background: #ffffff;*/
    /*display: block;*/
    margin-top: 20px;
    li {
        line-height: 60px;
        padding-left: 32px;
        padding-right: 32px;
        float: left;
        cursor: pointer;
    }
    .active {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        position: relative;
        &:after {
            content: '';
            width: 34px;
            height: 4px;
            background: #e73928;
            border-radius: 2px;
            position: absolute;
            text-align: center;
            left: 50%;
            margin-left: -17px;
            bottom: 0;
        }
    }
}
.to-right,
.to-left {
    position: absolute;
    right: 0;
    top: 22px;
    bottom: 0;
    width: 90px;
    height: 60px;
    background: linear-gradient(90deg, rgba(250, 250, 253, 0) 14%, #ffffff 50%);

    img {
        width: 16px;
        height: 16px;
        margin-left: 56px;
        margin-top: 21px;
    }
}
.to-left {
    left: 0;
    background: linear-gradient(-90deg, rgba(250, 250, 253, 0) 14%, #ffffff 50%);
    img {
        transform: rotate(180deg);
        margin-left: 16px;
        margin-top: 21px;
    }
}
/deep/.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
    opacity: 0;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: auto !important;
}
</style>
