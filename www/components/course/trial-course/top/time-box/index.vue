<!--
 * @Author: Li
 * @Date: 2022-03-11 17:36:52
 * @LastEditors: Li
 * @LastEditTime: 2022-03-31 18:00:55
 * @Description: 
-->
<template>
    <div class="time-box">
        <span class="font-bold" v-if="day > 0">{{ day | formate }}</span>
        <span v-if="day > 0">天</span>
        <span :class="['font-bold', bgColor ? 'font-bold-bg' : '']">{{ hour | formate }}</span>
        <span>:</span>
        <span :class="['font-bold', bgColor ? 'font-bold-bg' : '']">{{ min | formate }}</span>
        <span>:</span>
        <span :class="['font-bold', bgColor ? 'font-bold-bg' : '']">{{ sec | formate }}</span>
    </div>
</template>
<script>
export default {
    name: 'timeBoxModel',
    filters: {
        formate(value) {
            return value.toString().padStart(2, '0');
        },
    },
    props: {
        bgColor: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            day: 0,
            hour: 0,
            min: 0,
            sec: 0,
        };
    },
    destroyed() {
        if (this.timerID) clearInterval(this.timerID);
    },
    methods: {
        lastTime(sysTime, endTime) {
            // 单位： 秒
            if (this.timerID) clearInterval(this.timerID);
            this.timerID = setInterval(() => {
                const lastTime = endTime - sysTime;
                ++sysTime;
                if (lastTime > 0) {
                    this.day = parseInt(lastTime / (60 * 60 * 24));
                    this.hour = parseInt((lastTime / (60 * 60)) % 24);
                    this.min = parseInt((lastTime / 60) % 60);
                    this.sec = parseInt(lastTime % 60);
                } else {
                    this.day = 0;
                    this.hour = 0;
                    this.min = 0;
                    this.sec = 0;
                    clearInterval(this.timerID);
                    this.timerID = 0;
                }
            }, 1e3);
        },
    },
};
</script>
<style lang="less" scoped>
.time-box {
    font-size: 14px;
    color: #333;
    span {
        // width: 18px;
    }
}
.font-bold {
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
    padding-left: 2.5px;
    padding-right: 2.5px;
}

.font-bold-bg {
    background-color: rgba(244, 244, 244, 1);
}
</style>
