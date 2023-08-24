<template>
    <div class="learnProgress-box" v-if="classStatistics.ucarCwcount">
        <div class="learnProgress">
            <div class="clmrt_bk">
                <div class="cumr_jdtbox">
                    <span class="cumr_sp">学习进度：</span>
                    <div class="cumr_outjdt">
                        <div class="cumr_injdt" :style="'width: ' + classStatistics.ucarRate"></div>
                    </div>
                    <div class="cumr_num">
                        <span>{{ classStatistics.ucarLearnedcount }}</span>
                        /{{ classStatistics.ucarCwcount }}
                    </div>
                    <div class="cumr_rule">
                        <img src="./asset/images/a_img3.png" />
                        <p>统计数据排除班级下的讲义和面授课</p>
                    </div>
                    <a class="cumr_perjdt" @click="goReport" href="javascript:void(0);">学习报告</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        ctapId: {
            type: String,
            default: '',
        },
        classId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            classStatistics: {},
        };
    },
    methods: {
        getData() {
            // 获取统计数据
            let data = {
                classIds: this.classId,
            };
            return this.$callRawApi({
                api: 'cc/my/class/stat',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        this.classStatistics = res.data[0];
                    }
                    return res.data;
                });
        },
        //跳转至学习报告
        goReport() {
            this.$router.push(`/learningCenter/classLearningReport/${this.classId}?ctapId=${this.ctapId}`);
        },
    },
};
</script>
<style lang="less" scoped>
.learnProgress-box {
    background: #fff;

    .learnProgress {
        margin: 0 15px 14px;
        padding: 0 15px;
        background: #fff;
        position: relative;
    }

    .clmrt_bk .cumr_jdtbox {
        position: relative;
        height: 60px;
        line-height: 60px;
    }

    .clmrt_bk .cumr_sp {
        font-size: 14px;
        color: #666666;
    }

    .clmrt_bk .cumr_outjdt {
        position: absolute;
        height: 10px;
        left: 70px;
        top: 27px;
        right: 165px;
        background: #ebebeb;
        border-radius: 5px;
    }

    .clmrt_bk .cumr_injdt {
        position: absolute;
        left: 0;
        top: 0;
        height: 10px;
        background: linear-gradient(90deg, rgba(240, 121, 99, 1) 0%, rgba(231, 57, 40, 1) 100%);
        border-radius: 10px;
    }

    .clmrt_bk .cumr_num {
        position: absolute;
        right: 105px;
        top: 0px;
        color: #999;
        font-size: 12px;
    }

    .clmrt_bk .cumr_num span {
        color: #e74030;
    }

    .clmrt_bk .cumr_rule {
        position: absolute;
        right: 70px;
        top: 0px;
        width: 20px;
        text-align: center;
        cursor: pointer;
    }

    .clmrt_bk .cumr_rule p {
        position: absolute;
        right: -20px;
        left: -112px;
        line-height: 18px;
        font-size: 12px;
        text-align: left;
        background: #fff;
        top: 44px;
        display: none;
        color: #666;
        padding: 10px;
        box-shadow: 0px 1px 4px 2px rgba(0, 0, 0, 0.08);
    }

    .clmrt_bk .cumr_rule p::before {
        content: '';
        height: 0;
        border-style: solid;
        border-width: 7px;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        right: 22px;
        top: -14px;
        width: 0;
    }

    .clmrt_bk .cumr_rule:hover p {
        display: block;
    }

    .clmrt_bk .cumr_perjdt {
        position: absolute;
        right: 0px;
        top: 0px;
        display: inline-block;
        font-size: 14px;
        color: #28a6ff;
        cursor: pointer;
    }
}
</style>
