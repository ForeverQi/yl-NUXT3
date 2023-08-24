<template>
    <table class="table">
        <tr>
            <th class="table__class-name">班级名称</th>
            <th class="table__select-subject">
                <span class="must">*</span>
                申请续学的科目
            </th>
            <th class="table__desc">备注</th>
        </tr>
        <tr v-for="item in dataList" :key="item.oriClassId">
            <td class="table__class-name">
                <div class="table-wrap">
                    <div class="name">{{ item.className }}</div>
                    <div class="txt">协议：{{ item.oriServContent }}</div>
                </div>
            </td>
            <td class="table__select-subject">
                <div class="table-wrap">
                    <div class="checkobx-line" v-for="it in item.subjectList" :key="it.subjectId">
                        {{ it.subjectName }}
                    </div>
                </div>
            </td>
            <td class="table__desc">
                <div class="table-wrap">
                    <template v-if="item.mustGooodsStatus === false">
                        <div class="intro">
                            <span class="must">*</span>
                            该班级有配套的纸质资料，您已选择不需要纸质资料。
                        </div>
                    </template>
                    <template v-if="item.mustGooodsStatus === true && checkSubjectStatus(item.subjectList)">
                        <div class="intro">
                            <span class="must">*</span>
                            该班级有配套的纸质资料，您已选择需要以下科目资料：
                        </div>
                        <div class="box-section">
                            <div class="checkobx-line" v-for="it in goodsSubjectList(item.subjectList)" :key="it.subjectId">
                                <div class="checkbox yes"></div>
                                {{ it.subjectName }}
                            </div>
                        </div>
                    </template>
                </div>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        dataList: {
            type: Array,
            default() {
                return [
                    {
                        pypYear: '2022',
                        pypSeq: 1,
                        className: '',
                        oriServContent: '电子协议-续学-续学下一期，续学资料费1元每科',
                        gooodsStatus: 'N', // 是否有资料
                        mustGooodsStatus: false, // 是否需要资料，false: 不需要，true: 需要
                        subjectList: [
                            {
                                subjectId: '111',
                                subjectName: '市政实务',
                                gooodsStatus: 'N', // N: 不需要资料
                            },
                            {
                                subjectId: '111',
                                subjectName: '市政实务',
                                gooodsStatus: 'Y', // Y 需要资料
                            },
                        ],
                    },
                ];
            },
        },
    },
    methods: {
        goodsSubjectList(item) {
            return item.filter((r) => r.gooodsStatus === 'Y' && r.subjectGooodsStatus === 'Y');
        },
        checkSubjectStatus(list) {
            let check = false;
            list.forEach((r) => {
                if (r.gooodsStatus === 'Y' && r.subjectGooodsStatus === 'Y') {
                    check = true;
                }
            });

            return check;
        },
    },
};
</script>
<style lang="less" scoped>
table,
tbody,
thead,
th,
td {
    font-weight: normal;
}
.table-wrap {
    width: 100%;
    height: 100%;
    // position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
}
.table {
    width: 100%;
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
    &__class-name,
    &__desc,
    &__select-subject {
        .table-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            word-break: break-all;
            justify-content: center;
        }
    }
    &__desc {
        width: 364px;

        .table-wrap {
            padding: 24px 16px;
        }
        .intro {
            font-size: 14px;
            .must {
                color: red;
            }
        }

        .radio-list {
            display: flex;
            padding-top: 20px;
            .radio-block {
                display: flex;
                color: #666666;
                font-size: 14px;
                align-items: center;
                margin-right: 50px;
                .radio {
                    width: 14px;
                    height: 14px;
                    margin-right: 8px;
                    background-image: url(./asset/images/no_select.png);
                    background-size: 100% 100%;
                }
            }
        }

        .box-section {
            display: flex;
            flex-wrap: wrap;
            width: 332px;
            min-height: 63px;
            padding: 16px 24px;
            margin-top: 17px;
            // background: #f9f9f9;
            box-sizing: border-box;

            .checkobx-line {
                width: 142px;
                flex-shrink: 0;
            }
        }
    }
    &__class-name {
        width: 271px;

        .table-wrap {
            width: 271px;
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
        }

        .name {
            line-height: 24px;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 3px;
            width: 100%;
        }

        .txt {
            font-size: 12px;
            color: #999999;
            line-height: 16px;
            width: 100%;
        }
    }

    &__select-subject {
        width: 169px;
        .table-wrap {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 10px;
        }

        .must {
            color: red;
        }
    }
}
.checkobx-line {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .checkbox {
        width: 14px;
        height: 14px;
        border-radius: 2px;
        background-size: 100% 100%;
        margin-right: 8px;
        flex-shrink: 0;
        &.no {
            background-image: url(./asset/images/no_checkbox.png);
        }
        &.yes {
            background-image: url(./asset/images/yes_checkbox.png);
        }
    }
}
</style>
