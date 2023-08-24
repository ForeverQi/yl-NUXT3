<template>
    <div class="courseContent">
        <div class="body">
            <div class="topNav">
                <div class="anvContent">
                    <span>当前位置：</span>
                    <span v-for="(item, index) in items" :key="index">
                        <a :href="item.href ? item.href : 'javascript:void(0)'" :class="index == items.length - 1 ? 'textColor' : ''">{{ item.name }}</a>
                        <span v-show="index < items.length - 1">&nbsp;>&nbsp;</span>
                    </span>
                    <a href="javascript:void(0);" v-show="options.changer" @click="changeProject()" class="changeExam">
                        {{ options.value || '切换考试' }}&gt;&gt;
                    </a>
                </div>
                <div class="topTime">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VbBreadcrumb',
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        changeProject() {
            this.$emit('changeProject');
        },
    },
};
</script>

<style lang="less">
p {
    margin: 0;
}

.courseContent {
    width: 100%;
    margin: 0 auto;

    /* background-color: #f9f7f7; */
    .body {
        width: 1200px;
        margin: 0 auto;
    }

    a {
        color: #999;
    }
    .topNav {
        padding: 20px 0;
        // margin: 15px 0;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        overflow: hidden;

        .anvContent {
            float: left;
            span {
                vertical-align: middle;
                a {
                    max-width: 120px;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                    box-sizing: border-box;
                }
            }
        }

        .topTime {
            float: right;
        }

        .textColor {
            color: #d52e26;
        }
    }
    .changeExam {
        width: 110px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        background: #d52e26;
        display: inline-block;
        text-align: center;
        margin-left: 15px;
        border-radius: 13px;
    }
}
</style>
