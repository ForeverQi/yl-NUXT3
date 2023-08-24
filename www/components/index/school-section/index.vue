<script lang="jsx">
import '@/api/cp/api.CP0024.query-school-list.js';
export default {
    name: 'SchoolSection',
    data() {
        return {
            schoolList: [],
        };
    },
    fetch() {
        return this.getSchool();
    },
    methods: {
        getSchool() {
            let params = {
                url: 'cp/query-school-list',
                params: {},
                isCustom: false,
            };
            return this.httpClient(params)
                .then((data) => {
                    this.schoolList = data.map((i) => ({
                        ...i,
                        provinceName: i.provinceName.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/, ''),
                    }));
                })
                .catch((err) => {
                    console.log(err, 'newWeb');
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
            <div class="school-wrap">
                <div class="bg"></div>
                <div class="content">
                    <div class="name">
                        <div class="one">优路教育,</div>
                        <div class="one">点亮职业人生！</div>
                    </div>
                    <div class="city-wrap">
                        <div class="txt">全国分校：</div>
                        <div class="city-list">
                            {this.schoolList.map((r) => {
                                return (
                                    <a
                                        href={`/school-detail/${r.provinceId}`}
                                        class="city"
                                        onClick={() => {
                                            // 项目频道页易观埋点使用
                                            this.$emit('click-yi-guan', {
                                                module_type: '企业介绍-全国分校',
                                                course_name: r.provinceName,
                                            });
                                        }}
                                    >
                                        {r.provinceName}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.school-wrap {
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: rgba(215, 223, 236, 1);

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url(./asset/images/bg2.png) 100% 100% no-repeat;
        backdrop-filter: blur(6px);
    }

    .content {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        display: flex;
        z-index: 1;
        .name {
            flex-shrink: 0;
            padding-top: 94px;
            padding-right: 10px;

            &::before {
                content: '';
                display: block;
                width: 32px;
                height: 4px;
                margin-bottom: 16px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 3px;
            }
            .one {
                font-size: 24px;
                font-weight: 700;
                text-align: left;
                color: #3a3d4b;
                line-height: 31px;
                margin-bottom: 10px;
            }
        }

        .city-wrap {
            padding-top: 94px;
            overflow: hidden;

            .txt {
                color: #3a3d4b;
                font-size: 16px;
                padding-left: 20px;
            }

            .city-list {
                display: flex;
                flex-wrap: wrap;
                padding-top: 15px;
                display: block \9;
                width: 1002px \9;

                .city {
                    width: 68px;
                    height: 44px;
                    text-align: center;
                    font-size: 14px;
                    color: #3a3d4b;
                    display: inline-block;

                    &:hover {
                        color: #ff2e30;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}
</style>
