<template>
    <div class="tips-wrap">
        <p class="tips-text">
            仅展示最近的做题记录，您可以
            <span>
                按日期查询
                <el-date-picker
                    v-model="value"
                    class="datePicker"
                    type="date"
                    :clearable="false"
                    :editable="false"
                    :default-value="defaultValue"
                    @change="onDateChange"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </span>
            更多记录，也可以
            <span @click="handlebackrecord">返回最近记录</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            defaultValue: new Date().getTime() - 3600 * 1000 * 24 * 90,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > new Date().getTime() - 3600 * 1000 * 24 * 90;
                },
            },
        };
    },
    methods: {
        handlebackrecord() {
            this.value = '';
            this.$emit('handlebackrecord');
        },
        onDateChange(val) {
            this.$emit('ondatechange', this.$DateUtil.dateFmt('YYYY-MM-DD', val));
        },
    },
};
</script>

<style lang="less" scoped>
.tips-wrap {
    text-align: center;
    font-size: 14px;
    margin-top: 16px;
    p.tips-text {
        line-height: 22px;
    }
    span {
        color: #ff0000;
        cursor: pointer;
        position: relative;
    }
    .datePicker {
        position: absolute;
        width: 74px;
        height: 30px;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
        /deep/.el-input__inner {
            height: 20px;
            cursor: pointer;
        }
    }
}
</style>

<style>
.el-date-table td.current:not(.disabled) span {
    background-color: #ff0000;
}
.el-date-table .available:hover span,
.el-year-table .available:hover .cell,
.el-month-table td:hover .cell,
.el-year-table td.current:not(.disabled) .cell,
.el-month-table td.current:not(.disabled) .cell,
.el-date-table td.today span,
.el-year-table td.today .cell,
.el-icon-arrow-left:hover,
.el-icon-arrow-right:hover,
.el-icon-d-arrow-left:hover,
.el-icon-d-arrow-right:hover,
.el-date-picker__header-label:hover {
    color: #ff0000;
}
</style>
