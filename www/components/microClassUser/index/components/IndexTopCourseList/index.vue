<template>
    <div class="courselist">
        <div class="course-wrap">
            <div class="item this">
                <div class="tag">第1节</div>
                2021年上半年教资《小学综合素质》真题解析直播（6.14）
            </div>
            <div class="item" v-for="i in 10" :key="i">
                <div class="tag">第1节</div>
                2021年上半年教资《小学综合素质》真题解析直播（6.14）
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.courselist {
    position: absolute;
    width: 358px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    bottom: 86px;
    left: 800px;

    .course-wrap {
        padding: 20px;
        max-height: 325px;
        overflow-y: auto;

        .item {
            width: 100%;
            font-size: 14px;
            color: #ececec;
            line-height: 20px;
            margin-bottom: 20px;

            &.this {
                color: #7ab1ff;
            }

            .tag {
                display: inline-block;
                height: 18px;
                line-height: 18px;
                padding: 0 8px;
                font-size: 12px;
                color: #fff;
                background: linear-gradient(90deg, #9ec2ff, #5895ff);
                border-radius: 2px;
            }
        }
    }
}
</style>
