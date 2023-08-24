<template>
    <vb-mask :show="show">
        <div class="kkce">
            <span class="toptitle">
                <template v-if="lcgClasslimit == 0">您的学习卡可以开通以下课程！</template>
                <template v-else>
                    您的学习卡可以开通其中
                    <span class="color-F8323C">{{ lcgClasslimit }}</span>
                    个课程！
                </template>
                <span class="close_kkce" @click="cancel"></span>
            </span>
            <div class="gradelist">
                <ul>
                    <li v-for="item in lcgContentArry" :key="item.a">
                        <span class="project_name">{{ item.projectName }}</span>
                        <div v-for="item1 in item.content" :key="item1.classId">
                            <template v-if="lcgClasslimit !== 0">
                                <span class="class_disabled" v-if="item1.disabled"></span>
                                <span :class="item1.active ? 'class_check' : 'class_uncheck'" v-else @click="checkClasses(item1)"></span>
                            </template>
                            <span class="class_name">{{ item1.className }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="buttombtn">
                <input type="button" @click="cancel()" value="取消使用" class="btnCancel" />
                <input type="button" :disabled="openIsDisabled" @click="confirm()" value="确定使用" class="btnUse" />
                <!-- :disabled="lcgClasslimit == 0 ? false : openIsDisabled"-->
            </div>
        </div>
    </vb-mask>
</template>

<script>
import vbMask from '@/www/components/vbMask/index.vue';
export default {
    name: 'index',
    components: {
        vbMask,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        lcgContentArry: {
            type: Array,
            default: () => [],
        },
        lcgClasslimit: {
            type: Number,
            default: -1,
        },
    },
    data() {
        return {
            openIsDisabled: false, //确认开卡
            selectattr: [],
        };
    },
    watch: {
        show: {
            handler(newVal) {
                if (newVal) {
                    this.selectattr = [];
                    this.openIsDisabled = false;
                }
            },
        },
    },
    methods: {
        checkClasses(item1) {
            //验证开卡的数量
            this.selectattr = [];
            this.lcgContentArry.forEach((item) => {
                item.content.forEach((val) => {
                    if (val.classId === item1.classId) {
                        val.active = !val.active;
                    }
                    val.active && this.selectattr.push(val.classId);
                });
            });
            if (this.lcgClasslimit != 0 && this.selectattr.length == this.lcgClasslimit) {
                this.lcgContentArry.forEach((item) => {
                    item.content.forEach((val) => {
                        if (!val.active) {
                            val.disabled = true;
                        }
                    });
                });
            } else {
                this.lcgContentArry.forEach((item) => {
                    item.content.forEach((val) => {
                        if (!val.active) {
                            val.disabled = false;
                        }
                    });
                });
            }
        },
        confirm() {
            if (this.lcgClasslimit == 0 || (this.lcgClasslimit != 0 && this.selectattr.length > 0 && this.selectattr.length < this.lcgClasslimit + 1)) {
                console.log(1);
            } else {
                this.$Message.warning('请至少选择一个');
                return;
            }
            this.openIsDisabled = true;
            if (this.lcgClasslimit == 0) {
                this.selectattr = [];
                this.lcgContentArry.forEach((item) => {
                    item.content.forEach((val) => {
                        this.selectattr.push(val.classId);
                    });
                });
            }
            this.$emit('confirm', this.selectattr);
        },
        cancel() {
            this.$emit('cancel');
        },
    },
};
</script>

<style scoped lang="less">
.kkce {
    width: 650px;
    height: 563px;
    min-height: 290px;
    background: #fff;
    border: 0;
    overflow: auto;
    border-radius: 8px;
    box-shadow: 0px 2px 32px 0px rgba(0, 0, 0, 0.15);
}
.toptitle {
    height: 52px;
    line-height: 52px;
    display: block;
    padding-left: 10px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #333333;
    position: relative;
    .color-F8323C {
        color: #f8323c;
        font-weight: bold;
    }
    .close_kkce {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('./asset/images/close_kkce.png') no-repeat;
        background-size: 100%;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
.gradelist ul {
    height: 427px;
    overflow-y: auto;
}
.gradelist ul li {
    line-height: 35px;
    list-style: none;
    padding: 0 99px 0 68px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-top: 32px;
    div {
        display: flex;
        margin-top: 8px;
    }
    .project_name {
        font-size: 16px;
        font-weight: 500;
        color: #f8323c;
        line-height: 32px;
        height: 32px;
        background: #fff6f6;
        border-radius: 2px;
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;
        margin-bottom: 4px;
    }
    .class_name {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        flex: 1;
    }
}
.class_check,
.class_uncheck,
.class_disabled {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('./asset/images/check_class.png') no-repeat;
    background-size: 100%;
    cursor: pointer;
    margin-right: 8px;
    position: relative;
    top: 2px;
}
.class_uncheck {
    background: url('./asset/images/class_uncheck.png') no-repeat;
    background-size: 100%;
}
.class_disabled {
    background: url('./asset/images/class_disabled.png') no-repeat;
    background-size: 100%;
}

.buttombtn {
    text-align: center;
    padding: 18px 0 31px 0;
    .btnUse,
    .btnCancel {
        line-height: 32px;
        color: #fff;
        width: 120px;
        height: 32px;
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
    .btnCancel {
        border: 1px solid #d6d6d6;
        color: #666666;
        margin-right: 40px;
        background: #ffffff;
    }
}
</style>
