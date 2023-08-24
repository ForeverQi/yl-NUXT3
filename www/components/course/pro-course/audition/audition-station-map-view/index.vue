<script lang="jsx">
export default {
    props: {
        type: {
            type: String,
            default: '',
        },
        btnHandle: {
            type: Object,
            /**
             * @returns {object} 默认值
             */
            default() {
                return {};
            },
        },
    },
    /**
     * @returns {object} 默认值
     */
    data() {
        return {
            map: {
                login: {
                    img: require('./asset/images/login.png'),
                    txt: '',
                    btn: '登录',
                },
                'no-play': {
                    img: require('./asset/images/default.png'),
                    txt: '当前班级暂无法试听课程',
                    btn: '返回课程详情',
                },
                'no-course': {
                    img: require('./asset/images/default.png'),
                    txt: '暂无试听目录',
                    btn: '',
                },
                'loading-play': {
                    img: require('./asset/images/loading.png'),
                    txt: '视频加载中请稍后',
                    btn: '',
                },
                'catalogue-play': {
                    img: require('./asset/images/loading.png'),
                    txt: '加载中',
                    btn: '',
                },
                undercarriage: {
                    img: require('./asset/images/default.png'),
                    txt: '课程已下架',
                    btn: '去看课',
                },
            },
        };
    },
    /**
     * @returns {object} vue 虚拟DOM
     */
    render() {
        return (
            <div class="station-map">
                <div class="content">
                    <div class="img-wrap">
                        <img src={this.map[this.type].img} class="img" />
                    </div>
                    {this.map[this.type].txt && <div class="txt">{this.map[this.type].txt}</div>}
                    {this.map[this.type].btn && (
                        <div
                            class="btn"
                            onClick={() => {
                                this.btnHandle.fn && this.btnHandle.fn();
                            }}
                        >
                            {this.map[this.type].btn}
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.station-map {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img-wrap {
            width: 260px;
            height: 180px;
            margin-bottom: 15px;
            .img {
                width: 100%;
                height: 100%;
            }
        }
        .txt {
            height: 19px;
            font-size: 14px;
            color: #ffffff;
            line-height: 19px;
            text-align: center;
            margin-bottom: 40px;
        }
        .btn {
            width: 136px;
            height: 38px;
            background: linear-gradient(90deg, #ff6870, #f8323c);
            border-radius: 29px;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            line-height: 38px;
            cursor: pointer;
        }
    }
}
</style>
