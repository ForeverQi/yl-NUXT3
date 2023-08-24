<template>
    <dialog-view :title="title" :show.sync="dialogShow" @do-close="doClose" width="1024px">
        <div class="wrap">
            <div class="tip">温馨提示：同一个订单下的不同考期、服务期次不同的班级不能同时办理续学</div>
            <div class="table-section">
                <table class="table">
                    <tr>
                        <th class="table__select">请选择</th>
                        <th class="table__qici">考期</th>
                        <th class="table__class-name">班级名称</th>
                        <th class="table__server-num">服务期次</th>
                        <th>剩余服务期次</th>
                    </tr>
                    <tbody v-for="it in orderCourseList" :key="`${it.classId}_0`">
                        <tr v-for="(item, index) in it.classList" :key="item.classId">
                            <td class="table__select" v-if="index === 0" :rowspan="it.classList.length">
                                <div class="table-wrap">
                                    <div
                                        class="select no"
                                        :class="{ no: selectCourse.classId !== it.classId, yes: selectCourse.classId === it.classId }"
                                        @click="changeStatus(it)"
                                    ></div>
                                </div>
                            </td>
                            <td class="table__qici" v-if="index === 0" :rowspan="it.classList.length">
                                <div class="table-wrap">
                                    <div class="txt">
                                        {{ item.examservYear }}年第{{ numMap[item.examservSeq] ? numMap[item.examservSeq] : item.nextClass.examservSeq }}期
                                    </div>
                                </div>
                            </td>
                            <td class="table__class-name">
                                <div class="table-wrap">
                                    <div class="name">{{ item.nextClass.oriClassName }}</div>
                                    <div class="xieyi">{{ item.nextClass.oriServContent }}</div>
                                </div>
                            </td>
                            <td class="table__server-num">
                                <div class="table-wrap">
                                    <div class="txt">{{ item.serviceCount }}</div>
                                </div>
                            </td>
                            <td class="table__server-surplus-num">
                                <div class="table-wrap">
                                    <div class="txt">{{ item.remainServiceCount }}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <template #foot>
            <div class="btn" :class="{ disabled: selectCourse.oriClassId === '' }" @click="doClose(true)">下一步</div>
        </template>
        <template v-if="showAlert">
            <apply-alert :show="true" @do-close="closeAlert">
                <div class="msg-content">抱歉！该订单/班级暂不支持自助申请续学，请联系服务老师进行人工办理。</div>
            </apply-alert>
        </template>
    </dialog-view>
</template>
<script>
import '@/api/selfLearn/api.self-learn-002.query-class-info.js';
import '@/api/selfLearn/api..query-project-area.js';
import '@/api/selfLearn/api..query-next-class.js';
import DialogView from '../dialog';
import ApplyAlert from '../applyAlert/index.vue';
export default {
    components: {
        DialogView,
        ApplyAlert,
    },
    props: {
        title: {
            type: String,
            default: '请选择办理续学的班级',
        },
        content: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
        orderCourseList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            dialogShow: false,
            list: [],
            // 选择要续学的班级
            selectCourse: {
                oriClassId: '',
                classId: '',
                projectId: '',
                classList: [],
            },
            // 区域信息
            areaInfo: {
                dptId: '',
            },
            showAlert: false,
            mapList: {},
            numMap: {
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六',
                7: '七',
                8: '八',
                9: '九',
                10: '十',
                11: '十一',
                12: '十二',
            },
        };
    },
    watch: {
        show(val, oldVal) {
            if (val !== oldVal) {
                this.dialogShow = this.show;
            }
        },
    },
    mounted() {
        this.areaInfo = {
            dptId: '',
        };
        this.selectCourse = {
            oriClassId: '',
            classId: '',
            projectId: '',
            classList: [],
        };
        this.dialogShow = this.show;
        this.init();
    },
    methods: {
        init() {
            this.classIds = [];
            this.orderCourseList.forEach((r) => {
                this.classIds.push(r.classId);
                this.mapList[r.classId] = r;
            });
            this.getClassInfo();
        },
        getClassInfo() {
            // 获取课程详情
            let params = {
                classIds: this.classIds.toString(),
            };
            this.$callApi('selfLearn/query-class-info', {
                ...params,
                onsuccess: (res) => {
                    this.list = res.map((r) => {
                        r.isCheck = false;
                        r.serviceCount = this.mapList[r.oriClassId].serviceCount;
                        r.remainServiceCount = this.mapList[r.oriClassId].remainServiceCount;
                        r.projectId = this.mapList[r.oriClassId].projectId;
                        return r;
                    });
                },
            });
        },
        changeStatus(item) {
            this.selectCourse = item;
        },
        closeAlert(check) {
            // 关闭弹窗
            console.log(check);
            this.showAlert = false;
        },
        doClose(init = false) {
            // 选出被选中的列表
            if (init === true && !this.selectCourse.classId) {
                return;
            }
            let ret = [];
            if (init) {
                this.dialogShow = false;
                this.$emit('do-close', this.selectCourse.classList);
            } else {
                this.dialogShow = false;
                this.$emit('do-close', ret);
            }
        },
    },
};
</script>
<style lang="less" scoped>
table,
tbody,
th,
td {
    border: 0;
    font-weight: normal;
}
.msg-content {
    font-size: 14px;
    color: #333333;
    margin: 0 -14px;
}
.wrap {
    width: 100%;
    // padding: 0 56px;
    margin-top: -10px;
    box-sizing: border-box;
    .tip {
        font-size: 14px;
        color: #f02e00;
        padding-bottom: 10px;
    }
}
.table-section {
    max-height: 410px;
    overflow-y: auto;
}
.table-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.table {
    width: 903px;
    border: 1px solid #f1f1f1;
    border-collapse: collapse;
    border-spacing: 0;
    tr,
    th,
    td {
        position: relative;
        border: 1px solid #f1f1f1;
    }
    th {
        font-weight: bold;
        text-align: center;
        color: #333333;
        font-size: 16px;
        line-height: 44px;
        background: #f8f8f8;
    }
    &__select,
    &__qici,
    &__class-name,
    &__server-num,
    &__server-surplus-num {
        .table-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    &__server-surplus-num {
        width: 145px;
    }
    &__server-num {
        width: 112px;
    }
    &__class-name {
        width: 415px;

        .table-wrap {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            padding: 12px 24px;
            box-sizing: border-box;
        }

        .name {
            line-height: 24px;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 3px;
        }

        .xieyi {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 16px;
            text-align: left;
        }
    }
    &__select {
        width: 80px;
    }
    &__qici {
        width: 149px;
    }
    .txt {
        font-size: 16px;
        color: #333333;
    }
    .select {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;

        &.no {
            background-image: url(./assets/images/no_select.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        &.yes {
            background-image: url(./assets/images/yes_select.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
}
.btn {
    width: 140px;
    height: 40px;
    margin: auto;
    background: #f02e00;
    border-radius: 4px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;

    &.disabled {
        background-color: #cccccc;
        cursor: default;
    }
}
</style>
