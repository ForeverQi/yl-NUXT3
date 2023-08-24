<script>
export default {
    name: 'EmptyView',
    props: {
        type: {
            type: String,
            default: 'empty',
        },
        txt: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '100%',
        },
    },
    render() {
        return (
            <div class="empty" style={{ height: this.height }}>
                {this.type === 'empty' && <img src={require('./asset/images/no-data.png')} class="img" />}
                {this.type === 'error' && <img src={require('./asset/images/error.png')} class="img" />}
                {this.type === 'auth' && <img src={require('./asset/images/no-power.png')} class="img" />}
                <div class="status-txt">{this.txt}</div>
                {this.type === 'error' && (
                    <div
                        class="btn"
                        onClick={() => {
                            this.$emit('init');
                        }}
                    >
                        刷新试试
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.empty {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img {
        width: 260px;
        height: 180px;
    }
    .status-txt {
        padding-top: 16px;
        color: #3a3d4b;
        font-size: 14px;
        line-height: 20px;
    }
    .btn {
        margin-top: 40px;
        width: 136px;
        height: 38px;
        color: #fff;
        text-align: center;
        line-height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        cursor: pointer;
        user-select: none;
    }
}
</style>
