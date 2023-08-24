<script lang="jsx">
import { mapState } from 'vuex';
import '@/api/ss/api.SS3002.query-studentproject-branchinformation-info.js';
import '@/api/bd/api.BD4922.query-examdate-school.js';
export default {
    name: 'ExamCountdownView',
    data() {
        return {
            examDays: '',
        };
    },
    computed: {
        ...mapState('class-info/info', {
            projectId: 'projectId', // 班级ID
            pypId: 'pypId',
        }),
        splitNum() {
            let arr = this.examDays.split('');
            if (arr.length == 0) {
                for (let i = 0; i < 3; i++) {
                    arr.unshift('-');
                }
            }

            if (arr.length < 3) {
                for (let i = 0; i <= 3 - arr.length; i++) {
                    arr.unshift('0');
                }
            }

            return arr;
        },
    },
    watch: {
        projectId: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.init();
                }
            },
        },
        pypId: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.init();
                }
            },
        },
    },
    methods: {
        init() {
            if (this.pypId && this.projectId) {
                this.getData();
            }
        },
        getData() {
            const data = {
                url: 'ss/query-studentproject-branchinformation-info',
                params: {
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                const params = {
                    pypId: this.pypId,
                    schoolId: res.schoolId,
                };
                let isFirst = 1;
                if (!res.schoolId) {
                    isFirst = 2;
                }
                this.getData2(params, isFirst);
            });
        },
        getData2(params, isFirst) {
            const data = {
                url: 'bd/query-examdate-school',
                params,
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                if (res && Array.isArray(res.data) && res.data[0] && (res.data[0].examDays || res.data[0].examDays === 0)) {
                    this.examDays = res.data[0].examDays + '';
                } else if (isFirst == 1) {
                    let sendParams = {
                        pypId: this.pypId,
                    };
                    this.getData2(sendParams, 2);
                } else {
                    this.examDays = '';
                }
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        return (
            <div class="exam-countdown-view" style={{ display: this.examDays ? '' : 'none' }}>
                <div class="info">
                    距离考试还有
                    <div class="num-wrap">
                        {this.splitNum.map((r) => {
                            return <span class="num">{r}</span>;
                        })}
                    </div>
                    天哦~
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.exam-countdown-view {
    height: 62px;
    background-image: url(./asset/images/bg.png);
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 25px;
    padding-left: 20px;
    margin-bottom: 16px;
    border-radius: 8px;

    .tip {
        line-height: 1;
        font-size: 16px;
        color: #513614;
        font-weight: bold;
    }

    .info {
        // padding-top: 12px;
        color: #5d3f19;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        .num-wrap {
            display: inline-block;
            padding: 0 4px;

            .num {
                display: inline-block;
                height: 16px;
                line-height: 16px;
                background: #7a5c36;
                border-radius: 2px;
                font-size: 12px;
                color: #fff;
                padding: 0 4px;
                font-weight: 400;
                text-align: center;
                line-height: 16px;
                margin-right: 2px;
            }
        }
    }
}
</style>
