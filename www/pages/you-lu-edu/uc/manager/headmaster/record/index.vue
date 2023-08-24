<template>
    <div class="record" ref="record">
        <div class="top-section" :class="{ fixed: isFixed }" :style="{ left: leftPx }">
            <div class="detailsTitle"><span class="tit">我的学管师</span></div>
            <div class="block">
                评价时间：
                <el-date-picker
                    class="datapicker"
                    value-format="yyyy-MM"
                    v-model="thisMonth"
                    :clearable="false"
                    type="month"
                    placeholder="选择月"
                ></el-date-picker>
            </div>
        </div>

        <record-list v-if="thisMonth" :select-mouth="thisMonth" :teacher-id="teacherId" @onScroll="onScroll" />
    </div>
</template>
<script>
import RecordList from '@/www/components/userCenter/headmaster/RecordList';
export default {
    components: {
        RecordList,
    },
    data() {
        return {
            thisMonth: '',
            isFixed: false,
            leftPx: 0,
            teacherId: '',

            offsetTop: 0,
        };
    },
    mounted() {
        let oDate = new Date();
        let year = oDate.getFullYear();
        let month = oDate.getMonth() + 1;
        month = month > 9 ? month : `0${month}`;
        this.thisMonth = `${year}-${month}`;
        this.teacherId = this.$route.params.teacherId;
        this.$nextTick(() => {
            this.offsetTop = this.$refs.record.offsetTop;
        });
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
    },
    methods: {
        onScroll(ev) {
            let ele = this.$refs.record;
            let top = document.documentElement.scrollTop + document.body.scrollTop;
            if (this.offsetTop <= top) {
                this.leftPx = ele.offsetLeft + 'px';
                this.isFixed = true;
            } else {
                this.leftPx = '0px';
                this.isFixed = false;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.record {
    position: relative;
    background-color: #fff;
    min-height: 100%;
    box-sizing: border-box;
    padding-top: 120px;
    overflow: hidden;

    .top-section {
        position: absolute;
        top: 0;
        height: 120px;
        width: 866px;
        z-index: 2;
        background-color: #fff;

        &.fixed {
            position: fixed;
            top: 0;
        }
    }
    .detailsTitle {
        line-height: 60px;
        background: #fff;
        padding: 0 30px;
        margin-bottom: 16px;
        font-size: 16px;
        color: #333;
        border-radius: 4px;
        box-shadow: 0px 4px 8px 0px rgba(115, 30, 30, 0.04);
        .tit {
            display: inline-block;
            line-height: 60px;
            position: relative;
            font-weight: bold;
            &:after {
                content: '';
                position: absolute;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
                border-radius: 2px;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
            }
        }
    }

    .block {
        padding: 0 18px;
        color: #3a3d4b;

        .datapicker {
            height: 30px;
            /deep/ .el-input__inner {
                height: 30px;
            }
            /deep/ .el-input__icon {
                line-height: 30px;
            }
        }
    }

    .list-wrap {
        height: 100%;
    }
}
</style>
