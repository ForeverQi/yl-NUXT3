<template>
    <!-- 课程介绍 -->
    <div class="yljyLetter" v-if="propsData != undefined">
        <!-- 写给优路教育的学员们 -->
        <div class="le_content">
            <p class="le_head">{{ propsData.title }}</p>
            <div class="le_body">
                <p>{{ propsData.desc }}</p>
            </div>
            <div class="le_foot">
                <p>{{ propsData.footer }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'yljyLetter',
    components: {},
    filters: {
        filterN(val) {
            let value = val.replace(/↵/g, '<br/>');
            return value;
        },
    },
    propsData: {
        type: Object,
        default: () => {},
    },
    data() {
        return {};
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
        },
    },
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.yljyLetter {
    padding: 30px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .le_content {
        width: 1040px;
        height: 412px;
        background: url('./asset/images/yujy_letter.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        left: -29px;
        text-align: left;
        .le_head {
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-style: italic;
            color: #333333;
            line-height: 80px;
            text-indent: 2em;
        }
        .le_body {
            white-space: pre-wrap;
            p {
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #666666;
                line-height: 38px;
                margin: 0 74px;
                word-break: break-all;
            }
        }
        .le_foot {
            white-space: pre-wrap;
            float: right;
            text-align: center;
            margin-right: 27px;
            margin-top: 16px;
            p {
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: #333;
                word-break: break-all;
            }
            p:nth-child(3) {
                color: #666;
            }
        }
    }
    .intro_footer {
        margin-top: 30px;
        width: 1040px;
        height: 250px;
        background: url('./asset/images/intro_footer.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        left: -29px;
        border-top: 1px solid transparent;
        .text {
            margin-top: 60px;
            margin-left: 190px;
            p:nth-child(1) {
                font-size: 30px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #333333;
                line-height: 39px;
                margin-bottom: 30px;
                span {
                    color: #626feb;
                    font-size: 36px;
                    font-family: SourceHanSansCN-Bold;
                    font-weight: bold;
                }
            }
            p {
                font-size: 24px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 32px;
            }
        }
    }
}
</style>
