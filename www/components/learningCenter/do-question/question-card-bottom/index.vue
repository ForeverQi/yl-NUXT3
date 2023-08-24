<template>
    <div class="question-card-bottom" id="questionCardBottom" :class="{ close: !answerCardOpen }">
        <div class="question-card-box" id="questionCard" :class="{ fixed: isFixed, open: answerCardOpen, close: !answerCardOpen }">
            <div class="card-title-box">
                <div class="card-title" @click="answerCardOpen = !answerCardOpen">
                    <span>答题卡</span>
                    <img src="./asset/images/arrow-top.png" alt="" />
                </div>
            </div>
            <div class="card-list">
                <question-card :list="list" :paper-type="paperType" @item-click="clickAnswersheet" @ready="getCardHeight" />
            </div>
        </div>
    </div>
</template>
<script>
import QuestionCard from '@/www/components/components/question/question-card.vue';
export default {
    components: {
        QuestionCard,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        paperType: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            answerCardOpen: true,
            bottom: 510,
            isFixed: true,
            timer: null,
        };
    },
    mounted() {
        // setTimeout(() => {
        //     this.getCardHeight();
        // }, 1000);
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
        clearTimeout(this.timer);
    },
    methods: {
        getCardHeight() {
            this.$nextTick(() => {
                let questionCardBottom = document.getElementById('questionCardBottom');
                let questionCard = document.getElementById('questionCard');
                questionCardBottom.style.height = questionCard.clientHeight + 50 + 'px';
                // 默认折叠-不可直接设置data种answerCardOpen为false,会造成位置有问题
                this.answerCardOpen = false;
            });
        },
        scrollPage() {
            this.debounce(this.handleScroll, 0);
        },
        //函数防抖
        debounce(func, wait = 0) {
            if (!this.timer) {
                func.apply(this);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.timer = null;
                }, wait);
            }
        },
        //点击答题卡上-试题
        clickAnswersheet(question) {
            this.$emit('item-click', question);
        },
        handleScroll() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollBottom = scrollHeight - windowHeight - scrollTop; //滚动条距离底部高度
            this.isFixed = scrollBottom >= 470;
        },
    },
};
</script>
<style scoped lang="less">
.question-card-bottom {
    position: relative;
    background-color: #fff;
    &.close {
        height: 80px !important;
    }
}
.question-card-box {
    background-size: 100% auto;
    background-position: left top;
    padding-bottom: 24px;
    box-sizing: border-box;
    width: 1200px;
    position: absolute;
    background: #fff;
    bottom: 0;
    z-index: 15;
    box-shadow: 0 -6px 18px 0 rgb(60 70 79 / 7%);
    &.fixed {
        position: fixed;
        box-sizing: border-box;
        width: 1200px;
        bottom: 0;
        z-index: 101;
    }
    &.open {
        .card-title > img {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            transition: transform 0.5s;
        }
    }
    &.close {
        padding-bottom: 0;
        .card-title-box {
            height: 30px;
            top: -30px;
        }
        .card-list {
            height: 0;
            overflow: hidden;
        }
    }
    .card-title-box {
        position: absolute;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -40px;
        left: 0;
        width: 130px;
        height: 40px;
        z-index: 10;
        box-shadow: 0 -6px 10px 0 rgb(60 70 79 / 7%);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: none !important;
        background-color: #fff;
        .card-title {
            color: #77798d;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img {
                width: 10px;
                height: 10px;
                margin-left: 6px;
            }
        }
    }
    .card-list {
        background: #fff;
        padding: 18px 28px 0;
        box-sizing: border-box;
        max-height: 270px;
        overflow-y: auto;
    }
}
</style>
